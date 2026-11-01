type ApiRequest = { method?: string; body?: { image?: string } };
type ApiResponse = { status: (code: number) => ApiResponse; json: (value: unknown) => void };

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST for image analysis.' });
  const endpoint = process.env.JARVIS_SNAP_URL;
  const token = process.env.JARVIS_SNAP_TOKEN;
  if (!endpoint || !token) return res.status(503).json({ error: 'Snap AI is not connected yet. Check the private Jarvis Snap connection in Vercel Environment Variables, then redeploy.' });
  const image = req.body?.image;
  if (typeof image !== 'string' || !/^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(image)) return res.status(400).json({ error: 'Please send a JPG, PNG or WebP food photo.' });
  if (image.length > 4200000) return res.status(413).json({ error: 'The prepared photo is too large. Please choose a smaller image.' });
  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ image }),
      signal: AbortSignal.timeout(28000)
    });
    const responseText = await upstream.text();
    let result;
    try { result = JSON.parse(responseText); } catch { return res.status(502).json({ error: 'Snap AI returned an invalid response. Please try again.' }); }
    if (!upstream.ok) {
      const status = upstream.status === 429 ? 429 : 502;
      return res.status(status).json({ error: typeof result.error === 'string' ? result.error : 'Snap AI could not analyze this photo right now.' });
    }
    if (typeof result.name !== 'string' || typeof result.kcalPer100g !== 'number') return res.status(502).json({ error: 'Snap AI returned incomplete food details. Please try another photo.' });
    return res.status(200).json(result);
  } catch (error) {
    console.error('WorldBite Snap request failed:', error);
    return res.status(502).json({ error: 'Could not reach Snap AI. Please try again shortly.' });
  }
}