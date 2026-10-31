export default function handler(_req: { method?: string }, res: { status: (code: number) => any; json: (value: unknown) => void }) {
  return res.status(200).json({ ok: true, service: "worldbite-snap-api", configured: Boolean(process.env.AI_API_URL && process.env.AI_API_KEY && process.env.AI_MODEL) });
}
