#!/usr/bin/env python3
"""Weekly SV Service App activity digest → posted to #sv-service.

Runs via cron on the Mac Mini every Wednesday at 8:00 AM ET. Queries the
sv_app_inquiries table in the personal agent's emails.db, then posts a
summary to #sv-service tagging @service_team.

Standalone (stdlib only). Reads SLACK_BOT_TOKEN from the personal agent's
.env so we don't duplicate the credential.
"""
from __future__ import annotations

import json
import os
import sqlite3
import sys
import urllib.request
import urllib.error
from datetime import datetime, timedelta
from pathlib import Path

HOME = Path.home()
DB_PATH = HOME / "Projects" / "marks-personal-agent" / "data" / "emails.db"
ENV_PATH = HOME / "Projects" / "marks-personal-agent" / ".env"
CHANNEL_ID = "C8LNJPFV0"  # #sv-service
SERVICE_TEAM_SUBTEAM = "SQW0AUU67"


def load_slack_token() -> str:
    token = os.getenv("SLACK_BOT_TOKEN")
    if token:
        return token
    if not ENV_PATH.exists():
        raise SystemExit(f"Missing env file: {ENV_PATH}")
    for line in ENV_PATH.read_text().splitlines():
        line = line.strip()
        if line.startswith("SLACK_BOT_TOKEN=") and not line.startswith("#"):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("SLACK_BOT_TOKEN not found in personal agent .env")


def fetch_week() -> dict:
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    cur = conn.execute(
        """
        SELECT id, session_id, message, category,
               datetime(created_at, 'localtime') AS local_ts
        FROM sv_app_inquiries
        WHERE created_at >= datetime('now', '-7 days')
        ORDER BY created_at
        """
    )
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()

    sessions: dict[str, list[dict]] = {}
    for r in rows:
        sessions.setdefault(r["session_id"], []).append(r)

    return {"rows": rows, "sessions": sessions}


def format_session(session_id: str, msgs: list[dict]) -> str:
    first = msgs[0]
    last = msgs[-1]
    cats = sorted({m["category"] for m in msgs if m["category"]})
    cat_str = " + ".join(cats) if cats else "uncategorized"
    first_msg = (first["message"] or "").strip().replace("\n", " ")
    if len(first_msg) > 180:
        first_msg = first_msg[:177] + "…"
    session_tail = session_id[-6:]
    span = first["local_ts"]
    if len(msgs) > 1:
        # same-day → show time range; different day → show both
        span = f"{first['local_ts']} → {last['local_ts']}"
    return (
        f"• 🗣️ *{session_tail}* — {span} ET · {len(msgs)} msg · _{cat_str}_\n"
        f"    _{first_msg}_"
    )


def build_message(data: dict) -> str:
    rows = data["rows"]
    sessions = data["sessions"]
    total_msgs = len(rows)
    total_sessions = len(sessions)
    today = datetime.now().strftime("%b %d, %Y")
    window_start = (datetime.now() - timedelta(days=7)).strftime("%b %d")
    window_end = datetime.now().strftime("%b %d")

    header = (
        f"📱 *SoundVision Concierge — Weekly Activity* "
        f"<!subteam^{SERVICE_TEAM_SUBTEAM}|service_team>\n"
        f"_Window: {window_start} – {window_end}, {today}_\n"
    )

    if total_sessions == 0:
        body = (
            "\n😴 *Zero activity this week.*\n"
            "• 0 sessions / 0 messages\n"
            "• The app is live and monitored — just no customer chats came in.\n"
            "• 💡 Consider nudging awareness: invoice footer link, service-call follow-up, email/social."
        )
    else:
        lines = [
            "",
            "📊 *Headline*",
            f"• 🗣️ {total_sessions} session{'s' if total_sessions != 1 else ''}",
            f"• ✉️ {total_msgs} message{'s' if total_msgs != 1 else ''}",
            "",
            "📝 *Sessions*",
        ]
        for sid, msgs in sessions.items():
            lines.append(format_session(sid, msgs))
        body = "\n".join(lines)

    footer = (
        "\n\n🔗 https://service.svavnc.com"
        "\n_Automated post from `sv-service-app/scripts/weekly_activity_post.py` on the Mac Mini._"
    )
    return header + body + footer


def post_to_slack(token: str, channel: str, text: str) -> dict:
    payload = json.dumps({"channel": channel, "text": text}).encode("utf-8")
    req = urllib.request.Request(
        "https://slack.com/api/chat.postMessage",
        data=payload,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json; charset=utf-8",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        body = json.loads(resp.read().decode("utf-8"))
    if not body.get("ok"):
        raise SystemExit(f"Slack API error: {body.get('error')} — full: {body}")
    return body


def main(argv: list[str]) -> int:
    dry_run = "--dry-run" in argv
    token = load_slack_token()
    data = fetch_week()
    message = build_message(data)

    if dry_run:
        print("=== DRY RUN — message that would be posted ===")
        print(message)
        print(f"\n(would send to channel {CHANNEL_ID})")
        return 0

    result = post_to_slack(token, CHANNEL_ID, message)
    print(f"Posted ts={result.get('ts')} channel={result.get('channel')}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
