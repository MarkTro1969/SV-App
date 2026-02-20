import { Message } from "../types";

/**
 * Handles communication with the SoundVision AI support proxy.
 * Calls our secure backend instead of Anthropic directly —
 * keeps the API key server-side and adds rate limiting.
 */

const PROXY_URL = "https://mac-mini.tailc4d30c.ts.net/api/sv-app/chat";
const FALLBACK_URL = "http://100.110.172.47:8000/api/sv-app/chat";

// Generate a stable session ID for this browser session
const getSessionId = (): string => {
  let sid = sessionStorage.getItem("sv_session_id");
  if (!sid) {
    sid = `sv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("sv_session_id", sid);
  }
  return sid;
};

export const generateSupportResponse = async (
  history: Message[],
  currentMessage: string,
  currentMedia?: { mimeType: string; data: string }
): Promise<string> => {

  const sessionId = getSessionId();

  // Build history (exclude the initial welcome message)
  const historyForApi = history
    .filter(m => m.id !== "1")
    .map(m => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

  const body: Record<string, unknown> = {
    session_id: sessionId,
    message: currentMessage,
    history: historyForApi,
  };

  if (currentMedia) {
    body.image = {
      mimeType: currentMedia.mimeType,
      data: currentMedia.data,
    };
  }

  // Try primary proxy, fall back to Tailscale direct
  const urls = [PROXY_URL, FALLBACK_URL];
  
  for (const url of urls) {
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (resp.status === 429) {
        return "You've reached the request limit for this session. Please call our support line at 704-696-2792 for further assistance.";
      }

      if (!resp.ok) {
        if (url === urls[urls.length - 1]) throw new Error(`HTTP ${resp.status}`);
        continue; // try fallback
      }

      const data = await resp.json();
      return data.response || "I'm having trouble responding. Please call 704-696-2792.";

    } catch (err) {
      if (url === urls[urls.length - 1]) {
        console.error("SV Assistant proxy error:", err);
        return "I'm having a brief connection issue. Please try again in a moment or call our support line at 704-696-2792.";
      }
    }
  }

  return "I'm having a brief connection issue. Please call 704-696-2792.";
};
