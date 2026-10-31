type ApiRequest = { method?: string; body?: { image?: string } };
type ApiResponse = { status: (code: number) => ApiResponse; json: (value: unknown) => void };

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST for image analysis.' });

  const apiUrl = process.env.AI_API_URL;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;

  if (!apiUrl || !apiKey || !model) {
    return res.status(503).json({
      error: 'Snap AI backend is deployed, but its provider is not configured yet. Add AI_API_URL, AI_API_KEY and AI_MODEL as server-side Vercel environment variables.'
    });
  }

  const image = req.body?.image;
  if (typeof image !== 'string' || !/^data:image\/(jpeg|jpg|png|webp);base64,/.test(image)) {
    return res.status(400).json({ error: 'Please send a JPG, PNG or WebP food photo.' });
  }
  if (image.length > 8_500_000) return res.status(413).json({ error: 'Image is too large. Choose a photo under 6 MB.' });

  try {
    const upstream = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 350,
        messages: [
          { role: 'system', content: 'You identify foods from photos and estimate nutrition cautiously. Return only valid JSON with keys name (string), region (one of South Asia, East Asia, Middle East, Europe, Africa, Latin America, North America, Oceania, Everywhere), kcalPer100g (number), portionGrams (number), confidence (low, medium, or high). Give a typical estimate, not false precision. If food is unclear, say name Unknown food and use kcalPer100g 0.' },
          { role: 'user', content: [
            { type: 'text', text: 'Identify the visible dish and estimate calories per 100 g and a typical serving size in grams. Do not assume hidden ingredients. Respond with JSON only.' },
            { type: 'image_url', image_url: { url: image, detail: 'low' } }
          ] }
        ],
        response_format: { type: 'json_object' }
      })
    });

    const payload = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status === 429 ? 429 : 502).json({ error: 'The AI provider could not analyze this image. Please try again later.' });
    }
    const content = payload?.choices?.[0]?.message?.content;
    const parsed = typeof content === 'string' ? JSON.parse(content) : content;
    const kcal = Number(parsed?.kcalPer100g);
    const portion = Number(parsed?.portionGrams);
    if (!parsed?.name || !Number.isFinite(kcal) || kcal < 0 || !Number.isFinite(portion) || portion <= 0) {
      return res.status(502).json({ error: 'The AI provider returned an incomplete food estimate.' });
    }
    return res.status(200).json({
      name: String(parsed.name).slice(0, 90),
      region: String(parsed.region || 'Everywhere').slice(0, 40),
      kcalPer100g: Math.min(900, Math.round(kcal)),
      portionGrams: Math.min(1500, Math.round(portion)),
      confidence: ['low', 'medium', 'high'].includes(parsed.confidence) ? parsed.confidence : 'low'
    });
  } catch {
    return res.status(502).json({ error: 'Snap AI could not reach the provider. Please try again later.' });
  }
}
