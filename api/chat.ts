import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mac Mini backend URL - Tailscale Funnel (publicly accessible from Vercel servers)
const BACKEND_URL = 'https://mac-mini.tailc4d30c.ts.net/api/sv-app/chat';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(502).json({
      response: "I'm having a brief connection issue. Please try again in a moment or call our support line at 704-696-2792.",
      error: true,
    });
  }
}
