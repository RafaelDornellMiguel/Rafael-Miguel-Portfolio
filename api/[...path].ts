import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.url === '/api/ping') {
    return res.status(200).json({ ping: 'ok' });
  }
  res.status(404).json({ error: 'Not found' });
}
