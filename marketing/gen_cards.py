#!/usr/bin/env python3
"""Generate Emanet AI branded social cards as standalone HTML (one per format).
Brand pulled verbatim from the live site: emerald/gold/bone, Fraunces/Switzer/
Spline Mono/Amiri, the {8/3} octagram seal, the layered emerald->ink ground."""
import math, os, pathlib

OUT = pathlib.Path("/tmp/claude-1000/-home-tariktopalovic/5b28b605-ce56-4247-bf9f-6499253ba316/scratchpad/emanet-cards")
OUT.mkdir(parents=True, exist_ok=True)

# ---- brand tokens (verbatim from app/globals.css) ----
BONE="#ECEAE0"; EMER="#143A28"; INK="#0B130E"; GOLD="#C6A867"; GOLDS="#D8C290"

# ---- {8/3} octagram seal as inline SVG (matches buildSeal starOrder) ----
def seal(size, stroke=1.3, lit=(0,3), dim_op=0.9):
    cx=cy=size/2.0
    R=size*0.40          # star radius
    Rout=size*0.475      # outer ring
    Rin=size*0.265       # inner ring
    order=[0,3,6,1,4,7,2,5]
    pts=[]
    for i in range(8):
        a=math.radians(-90+45*i)
        pts.append((cx+R*math.cos(a), cy+R*math.sin(a)))
    d="M "+" L ".join(f"{pts[k][0]:.2f},{pts[k][1]:.2f}" for k in order)+" Z"
    pips=[]
    for i in range(8):
        a=math.radians(-90+45*i)
        x=cx+R*math.cos(a); y=cy+R*math.sin(a)
        if i in lit:
            pips.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{size*0.012:.2f}" fill="{GOLD}" filter="url(#glow)"/>')
        else:
            pips.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{size*0.009:.2f}" fill="none" stroke="{GOLD}" stroke-opacity="0.5" stroke-width="1"/>')
    return f'''<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
  <defs>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="{size*0.012:.2f}" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{GOLD}" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="{GOLD}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="{GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="{cx}" cy="{cy}" r="{size*0.46:.2f}" fill="url(#halo)"/>
  <circle cx="{cx}" cy="{cy}" r="{Rout:.2f}" stroke="{GOLD}" stroke-opacity="0.30" stroke-width="1"/>
  <circle cx="{cx}" cy="{cy}" r="{Rout*0.985:.2f}" stroke="{GOLD}" stroke-opacity="0.14" stroke-width="1"/>
  <circle cx="{cx}" cy="{cy}" r="{Rin:.2f}" stroke="{GOLD}" stroke-opacity="0.22" stroke-width="1"/>
  <path d="{d}" stroke="{GOLD}" stroke-opacity="{dim_op}" stroke-width="{stroke}" stroke-linejoin="round" filter="url(#glow)"/>
  {''.join(pips)}
</svg>'''

# inlined fonts (base64) so headless render is fully offline + deterministic
FONTS = pathlib.Path("/tmp/claude-1000/-home-tariktopalovic/5b28b605-ce56-4247-bf9f-6499253ba316/scratchpad/fonts_inline.css").read_text()

# ---- shared CSS ----
def css(w,h):
    return FONTS + f'''
*{{box-sizing:border-box;margin:0;padding:0}}
:root{{--bone:{BONE};--emer:{EMER};--ink:{INK};--gold:{GOLD};--golds:{GOLDS};
--display:"Fraunces",Georgia,serif;--body:"Switzer","Helvetica Neue",Arial,sans-serif;
--mono:"Spline Sans Mono",ui-monospace,monospace;--arabic:"Amiri",serif}}
html,body{{width:{w}px;height:{h}px;overflow:hidden}}
.stage{{position:relative;width:{w}px;height:{h}px;
 background:
  radial-gradient(120% 80% at 80% -8%, rgba(20,58,40,0.55) 0%, rgba(20,58,40,0) 46%),
  radial-gradient(140% 120% at 6% 112%, rgba(16,43,30,0.60) 0%, rgba(16,43,30,0) 50%),
  radial-gradient(120% 92% at 50% 30%, #10201A 0%, var(--ink) 62%, #060B08 100%);
 color:var(--bone);font-family:var(--body);-webkit-font-smoothing:antialiased;
 text-rendering:optimizeLegibility;overflow:hidden}}
/* crafted hairline frame + corner ticks */
.frame{{position:absolute;inset:46px;border:1px solid rgba(198,168,103,0.16);pointer-events:none}}
.tick{{position:absolute;width:20px;height:20px;border:0 solid var(--gold);opacity:0.55}}
.tl{{top:38px;left:38px;border-top-width:1px;border-left-width:1px}}
.tr{{top:38px;right:38px;border-top-width:1px;border-right-width:1px}}
.bl{{bottom:38px;left:38px;border-bottom-width:1px;border-left-width:1px}}
.br{{bottom:38px;right:38px;border-bottom-width:1px;border-right-width:1px}}
/* film grain + vignette */
.grain{{position:absolute;inset:0;opacity:0.05;mix-blend-mode:overlay;pointer-events:none;
 background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}}
.vig{{position:absolute;inset:0;pointer-events:none;
 background:radial-gradient(120% 100% at 50% 42%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.42) 100%)}}
.amana{{position:absolute;font-family:var(--arabic);color:var(--gold);opacity:0.05;
 user-select:none;line-height:1;white-space:nowrap}}
.display{{font-family:var(--display);font-weight:360;font-optical-sizing:auto;
 line-height:1.02;letter-spacing:-0.015em}}
.mono{{font-family:var(--mono);text-transform:uppercase;letter-spacing:0.32em;
 font-weight:400;color:rgba(216,194,144,0.66);font-size:13px}}
.gold{{color:var(--gold)}} .golds{{color:var(--golds)}}
.rule{{height:1px;background:linear-gradient(90deg,rgba(198,168,103,0.55),rgba(198,168,103,0))}}
.wordmark{{font-family:var(--display);font-weight:380;letter-spacing:0.16em;font-size:24px}}
.wordmark .dotai{{color:var(--gold);font-style:italic;font-weight:340}}
.pip{{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--gold);
 box-shadow:0 0 10px 1px rgba(198,168,103,0.6);flex:0 0 auto;margin-top:13px}}
.pip.off{{background:transparent;border:1px solid rgba(198,168,103,0.4);box-shadow:none}}
'''

PAGE='''<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head>
<body><div class="stage">{body}
<div class="frame"></div>
<span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>
<div class="grain"></div><div class="vig"></div></div></body></html>'''

def foot(center=False, pad=88):
    # footer pinned to the bottom of the card — never clipped
    inner=('<div class="wordmark">EMANET <span class="dotai">AI</span></div>'
           '<div class="mono" style="font-size:12px;color:rgba(216,194,144,0.52)">emanet-ai.vercel.app</div>')
    if center:
        return (f'<div style="position:absolute;left:0;right:0;bottom:{pad}px;display:flex;'
                f'flex-direction:column;align-items:center;gap:14px">{inner}</div>')
    return (f'<div style="position:absolute;left:{pad}px;right:{pad}px;bottom:{pad}px;display:flex;'
            f'justify-content:space-between;align-items:flex-end">{inner}</div>')

def write(name,w,h,body):
    (OUT/f"{name}.html").write_text(PAGE.format(css=css(w,h),body=body),encoding="utf-8")
    print("wrote",name,f"{w}x{h}")

# ============ CARD 1 — TRUST (1080x1080) ============
write("01-trust",1080,1080, f'''
<div class="amana" style="font-size:540px;left:50%;top:44%;transform:translate(-50%,-50%)">أمانة</div>
<div style="position:absolute;left:0;right:0;top:0;bottom:150px;display:flex;flex-direction:column;
 align-items:center;justify-content:center;text-align:center;padding:0 120px">
  <div>{seal(300,stroke=1.4,lit=(0,4))}</div>
  <div class="mono" style="margin:34px 0 26px">AI · Software · Data — Studio</div>
  <div class="display" style="font-size:66px;max-width:760px">We hold your<br>technology <span class="gold" style="font-style:italic">in trust.</span></div>
  <div class="rule" style="width:120px;margin:36px auto 0"></div>
</div>
{foot(center=True, pad=84)}
''')

# ============ CARD 2 — SERVICES (1080x1080) ============
nodes=[("AI Automation & Agents","Assistants that handle the repetitive — human oversight built in."),
       ("Web & App Development","Sites and apps in ~3 months, built to outlast us."),
       ("Data Engineering","Scattered data into dashboards and pipelines you can trust."),
       ("Cloud & DevOps","Reliable infrastructure, predictable billing."),
       ("Security & Reliability","Protection and uptime, from day one.")]
rows=""
for i,(t,d) in enumerate(nodes):
    cls="pip" if i in (0,2) else "pip off"
    rows+=f'''<div style="display:flex;gap:22px;padding:22px 0;border-bottom:1px solid rgba(198,168,103,0.10)">
      <span class="{cls}"></span>
      <div><div class="display" style="font-size:33px;font-weight:380">{t}</div>
      <div style="font-size:18px;color:rgba(236,234,224,0.62);margin-top:6px;max-width:600px">{d}</div></div></div>'''
write("02-services",1080,1080, f'''
<div style="position:absolute;left:0;right:0;top:0;bottom:150px;padding:96px 100px 0;display:flex;flex-direction:column">
  <div class="mono">What we hold</div>
  <div class="display" style="font-size:60px;margin:14px 0 24px">Five things, kept well.</div>
  {rows}
</div>
<div style="position:absolute;right:-70px;top:-70px;opacity:0.45">{seal(340,stroke=1,lit=())}</div>
{foot(pad=84)}
''')

# ============ CARD 3 — FIRST CUT / €200 (1080x1080) ============
write("03-firstcut",1080,1080, f'''
<div class="amana" style="font-size:420px;right:-30px;bottom:-70px">أمانة</div>
<div style="position:absolute;left:0;right:0;top:0;bottom:150px;padding:0 110px;display:flex;flex-direction:column;justify-content:center">
  <div class="mono">How we begin</div>
  <div class="display" style="font-size:80px;margin:16px 0 4px">The First Cut</div>
  <div style="display:flex;align-items:baseline;gap:26px;margin:14px 0 6px">
    <div class="display gold" style="font-size:184px;font-weight:340;line-height:0.8">€200</div>
    <div class="mono" style="font-size:13px">fixed<br>one revision</div>
  </div>
  <div class="rule" style="width:200px;margin:24px 0 28px"></div>
  <div style="font-size:26px;color:rgba(236,234,224,0.78);max-width:640px;line-height:1.5">
    A clean, simple website with one revision cycle. No lock-in. If it's good, we scope the full build from there — and <span class="golds">you own every line.</span></div>
</div>
{foot(pad=84)}
''')

# ============ CARD 4 — PRINCIPLES (1080x1080) ============
prin=[("Local-first","What we build runs on machines you control."),
      ("Read the source","Code legible enough to inherit, documented enough to trust."),
      ("Kept, not rented","You own the keys — infrastructure, dependencies, all of it.")]
blocks=""
for i,(t,d) in enumerate(prin):
    blocks+=f'''<div style="padding:34px 0;border-top:1px solid rgba(198,168,103,0.14)">
      <div style="display:flex;align-items:baseline;gap:18px">
        <div class="mono gold" style="font-size:13px">0{i+1}</div>
        <div class="display" style="font-size:46px;font-weight:380">{t}</div></div>
      <div style="font-size:21px;color:rgba(236,234,224,0.64);margin-top:10px;padding-left:46px;max-width:680px">{d}</div></div>'''
write("04-principles",1080,1080, f'''
<div style="position:absolute;left:0;right:0;top:0;bottom:150px;padding:100px 110px 0;display:flex;flex-direction:column">
  <div class="mono">What we stand on</div>
  <div class="display" style="font-size:58px;margin:14px 0 22px">Stewardship,<br>not salesmanship.</div>
  {blocks}
</div>
{foot(pad=84)}
''')

# ============ CARD 5 — WIDE BANNER (1200x630, LinkedIn/OG) ============
write("05-banner",1200,630, f'''
<div class="amana" style="font-size:300px;left:-30px;bottom:-60px">أمانة</div>
<div style="position:absolute;inset:0;display:flex;align-items:center;padding:0 80px;gap:64px">
  <div style="flex:0 0 auto">{seal(300,stroke=1.3,lit=(0,4))}</div>
  <div>
    <div class="mono" style="margin-bottom:18px">AI · Software · Data — Studio</div>
    <div class="display" style="font-size:60px;max-width:620px">We hold your technology <span class="gold" style="font-style:italic">in trust.</span></div>
    <div class="rule" style="width:120px;margin:28px 0 22px"></div>
    <div style="display:flex;align-items:center;gap:24px">
      <div class="wordmark" style="font-size:22px">EMANET <span class="dotai">AI</span></div>
      <div class="mono" style="font-size:12px;color:rgba(216,194,144,0.5)">emanet-ai.vercel.app</div>
    </div>
  </div>
</div>
''')

# ============ CARD 6 — STORY (1080x1920, IG/WhatsApp) ============
mini=""
for t in ["AI Automation & Agents","Web & App Development","Data Engineering","Cloud & DevOps","Security & Reliability"]:
    mini+=f'''<div style="display:flex;gap:16px;align-items:center;padding:15px 0;border-bottom:1px solid rgba(198,168,103,0.10)">
      <span class="pip off" style="margin-top:0"></span><div class="display" style="font-size:30px;font-weight:380">{t}</div></div>'''
write("06-story",1080,1920, f'''
<div class="amana" style="font-size:520px;left:50%;top:30%;transform:translate(-50%,-50%)">أمانة</div>
<div style="position:absolute;inset:0;padding:150px 100px 130px;display:flex;flex-direction:column;align-items:center;text-align:center">
  {seal(330,stroke=1.4,lit=(0,4))}
  <div class="mono" style="margin:34px 0 22px">AI · Software · Data — Studio</div>
  <div class="display" style="font-size:66px;max-width:740px">We hold your technology <span class="gold" style="font-style:italic">in trust.</span></div>
  <div class="rule" style="width:120px;margin:38px auto 40px"></div>
  <div style="width:100%;max-width:660px;text-align:left">{mini}</div>
  <div style="margin-top:auto;display:flex;flex-direction:column;align-items:center;gap:18px">
    <div class="display gold" style="font-size:40px">First cut — €200</div>
    <div class="wordmark">EMANET <span class="dotai">AI</span></div>
    <div class="mono" style="font-size:13px;color:rgba(216,194,144,0.55)">emanet-ai.vercel.app</div>
  </div>
</div>
''')
print("OUT:",OUT)
