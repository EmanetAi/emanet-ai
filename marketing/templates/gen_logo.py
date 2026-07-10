#!/usr/bin/env python3
"""Real emanet-ai.com logo, exported as standalone files.

The site has no separate logo image — the mark is the STARLESS circuit "seal"
(app/Deck.tsx buildSeal()) paired with the "Emanet" wordmark (Fraunces). This
reuses gen_content_cards.seal() (exact same math) instead of redrawing it, and
adds a wordmark lockup + an on-ink square version sized for social profile
pictures.

NOTE: gen_seal_parts.py is now the primary generator (exploded Figma parts +
assembled seal + lockup). This file is kept for the on-ink PNG profile export.

    python3 gen_logo.py
"""
import subprocess, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from gen_content_cards import seal, BONE, EMER, INK, GOLD, GOLDS  # noqa: E402

HERE = pathlib.Path(__file__).parent
OUT = HERE / "elements"
OUT.mkdir(parents=True, exist_ok=True)

# 1) icon mark alone, transparent background — drop onto anything
(OUT / "logo-mark.svg").write_text(seal(512, stroke=2.2, lit=(0, 3)))

# 2) icon on the site's ink background, square — profile-picture ready
mark = seal(512, stroke=2.2, lit=(0, 3, 6))
(OUT / "logo-mark-onink.svg").write_text(
    f'<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">'
    f'<rect width="512" height="512" fill="{INK}"/>'
    f'<g>{mark[mark.index(">")+1:mark.rindex("</svg>")]}</g></svg>'
)

# 3) horizontal lockup — icon + "Emanet" wordmark + "أمانة", transparent bg
icon = seal(120, stroke=1.6, lit=(0, 3))
icon_inner = icon[icon.index(">") + 1: icon.rindex("</svg>")]
LOCKUP_W, LOCKUP_H = 640, 160
lockup = f'''<svg width="{LOCKUP_W}" height="{LOCKUP_H}" viewBox="0 0 {LOCKUP_W} {LOCKUP_H}" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(20,20)">{icon_inner}</g>
  <text x="170" y="88" font-family="Fraunces, Georgia, serif" font-weight="380"
        font-size="52" letter-spacing="4" fill="{BONE}">Emanet</text>
  <text x="172" y="122" font-family="Amiri, serif" font-size="22" fill="{GOLD}" opacity="0.75">أمانة</text>
</svg>'''
(OUT / "logo-lockup.svg").write_text(lockup)

# render the profile-picture PNG (only one that needs a browser — flat colors, no font dependency)
html = OUT / "_logo-mark-onink.html"
html.write_text(f'<!doctype html><html><body style="margin:0">{(OUT / "logo-mark-onink.svg").read_text()}</body></html>')
png = OUT / "logo-mark-onink.png"
subprocess.run([
    "google-chrome-stable", "--headless", "--disable-gpu", "--hide-scrollbars",
    "--window-size=512,512", f"--screenshot={png}", f"file://{html}",
], check=True, capture_output=True)
html.unlink()
print("wrote:", *(p.name for p in OUT.glob("logo-*")), sep="\n  ")
