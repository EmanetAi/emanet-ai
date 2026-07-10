#!/usr/bin/env python3
"""Emanet AI — reusable branded card templates for recurring content.

Same brand system as ../gen_cards.py (which made the 6 one-off LAUNCH cards):
emerald/gold/bone, Fraunces/Switzer/Spline Mono/Amiri, the starless circuit seal.
This script covers the ONGOING post types instead — the ones in ../CONTENT-TEMPLATES.md
that don't have a visual yet: T1 showcase, T3 principle/quote, T5 tip, T6 handover.

How to use: edit the vars in the EXAMPLES block at the bottom (or call a
template function with your own kwargs), run the script. It writes HTML +
renders PNGs via headless Chrome (no extra deps — google-chrome-stable is
already on this machine).

    python3 gen_content_cards.py
"""
import math, pathlib, subprocess

HERE = pathlib.Path(__file__).parent
OUT = HERE / "examples"
OUT.mkdir(parents=True, exist_ok=True)

# ---- brand tokens (verbatim from app/globals.css) ----
BONE = "#ECEAE0"; EMER = "#143A28"; INK = "#0B130E"; GOLD = "#C6A867"; GOLDS = "#D8C290"

# fonts loaded from the live CDNs the site itself uses (app/layout.tsx) —
# simpler than the old inline-base64 approach and needs no local font files.
FONT_LINKS = '''
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..500&family=Spline+Sans+Mono:wght@300..600&family=Amiri:wght@400&display=swap">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap">
'''

# the STARLESS seal — same geometry the live site renders (app/Deck.tsx buildSeal):
# 8-fold circuit medallion, no {8/3} star. GREEN = emerald-lit stroke on the octagon
# rim + core; GOLD everything else. `lit` kept for call-compat but no longer used.
GREEN = "#5E9B7A"
def seal(size, stroke=1.3, lit=(0, 3)):
    cx = cy = size / 2.0
    R = size * 0.42
    def P(r, deg):
        a = math.radians(deg - 90); return (cx + r * math.cos(a), cy + r * math.sin(a))
    def ring(rad, off):
        return " ".join(f"{P(rad, off+j*45)[0]:.2f},{P(rad, off+j*45)[1]:.2f}" for j in range(8))
    spokes = "".join(
        f'<line x1="{P(R*0.34,22.5+i*45)[0]:.2f}" y1="{P(R*0.34,22.5+i*45)[1]:.2f}" '
        f'x2="{P(R*0.72,22.5+i*45)[0]:.2f}" y2="{P(R*0.72,22.5+i*45)[1]:.2f}" '
        f'stroke="{GOLDS}" stroke-width="{stroke*0.7:.2f}" opacity="0.45"/>' for i in range(8))
    nodes = "".join(
        f'<circle cx="{P(R,i*45)[0]:.2f}" cy="{P(R,i*45)[1]:.2f}" r="{size*0.012:.2f}" '
        f'fill="{GOLD}" filter="url(#glow)"/>' for i in range(8))
    return f'''<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
  <defs><filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="{size*0.010:.2f}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <radialGradient id="halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="{GOLD}" stop-opacity="0.14"/>
    <stop offset="60%" stop-color="{GOLD}" stop-opacity="0.04"/><stop offset="100%" stop-color="{GOLD}" stop-opacity="0"/></radialGradient></defs>
  <circle cx="{cx}" cy="{cy}" r="{size*0.46:.2f}" fill="url(#halo)"/>
  <polygon points="{ring(R,22.5)}" stroke="{GREEN}" stroke-width="{stroke:.2f}" stroke-linejoin="round"/>
  <circle cx="{cx}" cy="{cy}" r="{R*0.86:.2f}" stroke="{GOLDS}" stroke-opacity="0.45" stroke-width="{stroke*0.7:.2f}"/>
  <polygon points="{ring(R*0.72,0)}" stroke="{GOLD}" stroke-width="{stroke:.2f}" stroke-linejoin="round"/>
  {spokes}
  <circle cx="{cx}" cy="{cy}" r="{R*0.34:.2f}" stroke="{GOLD}" stroke-width="{stroke:.2f}"/>
  <circle cx="{cx}" cy="{cy}" r="{R*0.16:.2f}" stroke="{GREEN}" stroke-width="{stroke:.2f}"/>
  {nodes}
</svg>'''

def css(w, h):
    return f'''
*{{box-sizing:border-box;margin:0;padding:0}}
:root{{--bone:{BONE};--emer:{EMER};--ink:{INK};--gold:{GOLD};--golds:{GOLDS};
--display:"Fraunces",Georgia,serif;--body:"Switzer","Helvetica Neue",Arial,sans-serif;
--mono:"Spline Sans Mono",ui-monospace,monospace;--arabic:"Amiri",serif}}
html,body{{width:{w}px;height:{h}px;overflow:hidden}}
.stage{{position:relative;width:{w}px;height:{h}px;
 background:radial-gradient(120% 80% at 80% -8%, rgba(20,58,40,0.55) 0%, rgba(20,58,40,0) 46%),
  radial-gradient(140% 120% at 6% 112%, rgba(16,43,30,0.60) 0%, rgba(16,43,30,0) 50%),
  radial-gradient(120% 92% at 50% 30%, #10201A 0%, var(--ink) 62%, #060B08 100%);
 color:var(--bone);font-family:var(--body);-webkit-font-smoothing:antialiased;overflow:hidden}}
.frame{{position:absolute;inset:46px;border:1px solid rgba(198,168,103,0.16);pointer-events:none}}
.tick{{position:absolute;width:20px;height:20px;border:0 solid var(--gold);opacity:0.55}}
.tl{{top:38px;left:38px;border-top-width:1px;border-left-width:1px}}
.tr{{top:38px;right:38px;border-top-width:1px;border-right-width:1px}}
.bl{{bottom:38px;left:38px;border-bottom-width:1px;border-left-width:1px}}
.br{{bottom:38px;right:38px;border-bottom-width:1px;border-right-width:1px}}
.vig{{position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 100% at 50% 42%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.42) 100%)}}
.amana{{position:absolute;font-family:var(--arabic);color:var(--gold);opacity:0.05;user-select:none;line-height:1;white-space:nowrap}}
.display{{font-family:var(--display);font-weight:360;font-optical-sizing:auto;line-height:1.02;letter-spacing:-0.015em}}
.mono{{font-family:var(--mono);text-transform:uppercase;letter-spacing:0.32em;font-weight:400;color:rgba(216,194,144,0.66);font-size:13px}}
.gold{{color:var(--gold)}} .golds{{color:var(--golds)}}
.rule{{height:1px;background:linear-gradient(90deg,rgba(198,168,103,0.55),rgba(198,168,103,0))}}
.wordmark{{font-family:var(--display);font-weight:380;letter-spacing:0.16em;font-size:24px}}
.wordmark .dotai{{color:var(--gold);font-style:italic;font-weight:340}}
.pip{{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px 1px rgba(198,168,103,0.6);flex:0 0 auto;margin-top:6px}}
'''

PAGE = '''<!doctype html><html><head><meta charset="utf-8">{fonts}<style>{css}</style></head>
<body><div class="stage">{body}
<div class="frame"></div>
<span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>
<div class="vig"></div></div></body></html>'''

def foot(pad=84):
    inner = ('<div class="wordmark">EMANET <span class="dotai">AI</span></div>'
             '<div class="mono" style="font-size:12px;color:rgba(216,194,144,0.52)">emanet-ai.com</div>')
    return (f'<div style="position:absolute;left:{pad}px;right:{pad}px;bottom:{pad}px;display:flex;'
            f'justify-content:space-between;align-items:flex-end">{inner}</div>')

def write(name, w, h, body):
    html = PAGE.format(fonts=FONT_LINKS, css=css(w, h), body=body)
    (OUT / f"{name}.html").write_text(html, encoding="utf-8")
    print("wrote", name, f"{w}x{h}")
    return name, w, h


# ============================================================
# TEMPLATE 1 — SHOWCASE (matches CONTENT-TEMPLATES.md · T1)
# ============================================================
def showcase(project_name, one_liner, client_or_context, detail, name="T1-showcase"):
    body = f'''
<div style="position:absolute;left:0;right:0;top:0;bottom:150px;padding:110px 110px 0;display:flex;flex-direction:column;justify-content:center">
  <div class="mono">New work, live</div>
  <div class="display" style="font-size:64px;margin:16px 0 20px;max-width:820px">{project_name}</div>
  <div style="font-size:26px;color:rgba(236,234,224,0.8);max-width:680px;line-height:1.5">{one_liner}</div>
  <div class="rule" style="width:160px;margin:32px 0 24px"></div>
  <div style="font-size:18px;color:rgba(216,194,144,0.75)">Built for {client_or_context} · {detail}</div>
</div>
<div style="position:absolute;right:-60px;top:-60px;opacity:0.4">{seal(300, stroke=1, lit=())}</div>
{foot()}
'''
    return write(name, 1080, 1080, body)


# ============================================================
# TEMPLATE 2 — QUOTE / PRINCIPLE (matches CONTENT-TEMPLATES.md · T3)
# ============================================================
def quote_principle(principle_line, support, practice, name="T3-quote"):
    body = f'''
<div class="amana" style="font-size:480px;left:50%;top:50%;transform:translate(-50%,-50%)">أمانة</div>
<div style="position:absolute;left:0;right:0;top:0;bottom:150px;padding:0 120px;display:flex;flex-direction:column;justify-content:center">
  <div>{seal(200, stroke=1.3, lit=(0, 4))}</div>
  <div class="display gold" style="font-style:italic;font-size:52px;margin:36px 0 22px;max-width:760px">{principle_line}</div>
  <div style="font-size:20px;color:rgba(236,234,224,0.68);max-width:640px;line-height:1.6">{support}</div>
  <div class="rule" style="width:120px;margin:28px 0 22px"></div>
  <div style="font-size:17px;color:rgba(216,194,144,0.7)">{practice}</div>
</div>
{foot()}
'''
    return write(name, 1080, 1080, body)


# ============================================================
# TEMPLATE 3 — TIP / 3-STEP (matches CONTENT-TEMPLATES.md · T5)
# ============================================================
def tip(task, time_estimate, industry, step_one, step_two, step_three, name="T5-tip"):
    steps = [step_one, step_two, step_three]
    rows = ""
    for i, s in enumerate(steps):
        rows += f'''<div style="display:flex;gap:22px;padding:20px 0;border-bottom:1px solid rgba(198,168,103,0.10)">
      <div class="mono gold" style="font-size:20px;flex:0 0 auto">0{i+1}</div>
      <div style="font-size:22px;color:rgba(236,234,224,0.85)">{s}</div></div>'''
    body = f'''
<div style="position:absolute;left:0;right:0;top:0;bottom:150px;padding:100px 110px 0;display:flex;flex-direction:column">
  <div class="mono">Practical fix</div>
  <div class="display" style="font-size:48px;margin:16px 0 30px;max-width:760px">{task} eats {time_estimate} a week in most {industry} businesses.</div>
  {rows}
  <div style="margin-top:28px;font-size:16px;color:rgba(216,194,144,0.7)">No platform subscription needed — this runs on what you already have.</div>
</div>
{foot()}
'''
    return write(name, 1080, 1080, body)


# ============================================================
# TEMPLATE 4 — HANDOVER / WIN (matches CONTENT-TEMPLATES.md · T6)
# ============================================================
def handover(project_name, client, what_they_own, quote="", name="T6-handover"):
    quote_html = (f'<div style="font-size:20px;font-style:italic;color:rgba(236,234,224,0.7);'
                  f'margin-top:26px;max-width:640px;border-left:2px solid rgba(198,168,103,0.4);'
                  f'padding-left:20px">&ldquo;{quote}&rdquo;</div>') if quote else ""
    body = f'''
<div style="position:absolute;left:0;right:0;top:0;bottom:150px;padding:110px 110px 0;display:flex;flex-direction:column;justify-content:center">
  <div class="mono">Handed back</div>
  <div class="display" style="font-size:58px;margin:16px 0 22px;max-width:800px">{project_name}</div>
  <div style="font-size:24px;color:rgba(236,234,224,0.78);max-width:680px;line-height:1.5">{client} now holds {what_they_own} — documented well enough that any developer after us can pick it up.</div>
  {quote_html}
  <div class="rule" style="width:160px;margin:30px 0 20px"></div>
  <div style="font-size:17px;color:rgba(216,194,144,0.72)">Build it. Return it whole.</div>
</div>
{foot()}
'''
    return write(name, 1080, 1080, body)


def render_pngs(cards):
    """Headless-Chrome render, no extra deps (google-chrome-stable is on this box)."""
    for name, w, h in cards:
        html = OUT / f"{name}.html"
        png = OUT / f"{name}.png"
        subprocess.run([
            "google-chrome-stable", "--headless", "--disable-gpu", "--hide-scrollbars",
            f"--window-size={w},{h}", f"--screenshot={png}", f"file://{html}",
        ], check=True, capture_output=True)
        print("rendered", png.name)


if __name__ == "__main__":
    # ---- EDIT HERE for a new post, then just rerun the file ----
    cards = [
        showcase(
            project_name="Cloud-Ops Dashboard",
            one_liner="A live view of infra health, cost, and deploys — no more digging through five tabs.",
            client_or_context="a logistics client",
            detail="Next.js + Grafana, shipped in 3 weeks",
        ),
        quote_principle(
            principle_line="If you can't read the source, you don't own the software.",
            support="Most tools rent you access and call it ownership. We think that's backwards.",
            practice="Every handover ships with the full repo, no obfuscation, no locked seats.",
        ),
        tip(
            task="Manual invoice chasing",
            time_estimate="6 hours",
            industry="services",
            step_one="Track due dates in one shared sheet, not five inboxes",
            step_two="Auto-send a reminder at +3 and +7 days overdue",
            step_three="Flag anything past 14 days for a human call",
        ),
        handover(
            project_name="Servis Turbina — booking system",
            client="Servis Turbina",
            what_they_own="the keys, the source, and the server it runs on",
            quote="They just handed us the whole thing and walked us through it. No black box.",
        ),
    ]
    render_pngs(cards)
    print("OUT:", OUT)
