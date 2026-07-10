#!/usr/bin/env python3
"""
Emanet AI — STARLESS seal, exploded into Figma-ready parts.

Ports the EXACT geometry the live site renders in app/Deck.tsx buildSeal()
(C=220, R=150, viewBox 440x440). The site dropped the old {8/3} octagram
star ("read as occult iconography") for an 8-fold circuit medallion:
octagon vault rings + concentric circles + radial spokes + 8 node dots.
No star. No hexagram.

Output:
  parts/      one SVG per layer, ALL on the same 440x440 grid so when you
              drop them into Figma they stack perfectly aligned.
  assembled/  the finished seal (transparent + on-ink), and the lockup.

Everything is math (paths from angles/radii), not traced — editable + crisp
at any size in Figma.

Run: python gen_seal_parts.py
"""
import math, pathlib

# ---- brand tokens (hex, so parts render standalone — no CSS vars) ----
INK   = "#0B130E"   # near-black base
EMER  = "#143A28"   # deep emerald surface
GREEN = "#5E9B7A"   # emerald-lit: the seal's green strokes (readable on dark)
GOLD  = "#C6A867"   # accent / gold strokes / node dots
GOLDS = "#D8C290"   # soft gold (faint strokes)
BONE  = "#ECEAE0"   # off-white wordmark

# ---- geometry, identical to Deck.tsx ----
def P(cx, cy, r, deg):
    a = (deg - 90) * math.pi / 180
    return (cx + r * math.cos(a), cy + r * math.sin(a))

def n2(v):
    return round(v * 100) / 100

def ring_pts(cx, cy, rad, offset, count):
    return " ".join(f"{n2(x)},{n2(y)}"
                    for x, y in (P(cx, cy, rad, offset + j * (360 / count))
                                 for j in range(count)))

def seal_layers(cx, cy, R):
    """Return {layer_id: inner_svg} for a seal centred at (cx,cy) radius R.
    Stroke widths scale with R so proportions hold at any size."""
    k = R / 150.0                       # scale factor vs. the site's native R
    sw, fw, gw = 1.4 * k, 1.0 * k, 0.6 * k
    node_r, spoke_out, spoke_in = 5.5 * k, R * 0.72, R * 0.34
    L = {}

    # 1. outer octagon — the vault silhouette (GREEN)
    L["01-outer-octagon"] = (
        f'<polygon points="{ring_pts(cx,cy,R,22.5,8)}" fill="none" '
        f'stroke="{GREEN}" stroke-width="{n2(sw)}" stroke-linejoin="round"/>')

    # 2. breathing circle just inside the rim (gold, faint)
    L["02-breathing-circle"] = (
        f'<circle cx="{cx}" cy="{cy}" r="{n2(R*0.86)}" fill="none" '
        f'stroke="{GOLDS}" stroke-width="{n2(fw)}" opacity="0.45"/>')

    # 3. mid octagon, half-step offset (GOLD)
    L["03-mid-octagon"] = (
        f'<polygon points="{ring_pts(cx,cy,R*0.72,0,8)}" fill="none" '
        f'stroke="{GOLD}" stroke-width="{n2(sw)}" stroke-linejoin="round"/>')

    # 4. eight circuit spokes, inner ring -> mid ring, on the between-axes
    spokes = "".join(
        f'<line x1="{n2(P(cx,cy,spoke_in,22.5+i*45)[0])}" y1="{n2(P(cx,cy,spoke_in,22.5+i*45)[1])}" '
        f'x2="{n2(P(cx,cy,spoke_out,22.5+i*45)[0])}" y2="{n2(P(cx,cy,spoke_out,22.5+i*45)[1])}" '
        f'stroke="{GOLDS}" stroke-width="{n2(fw)}" opacity="0.45"/>'
        for i in range(8))
    L["04-circuit-spokes"] = spokes

    # 5. inner gold ring
    L["05-inner-ring"] = (
        f'<circle cx="{cx}" cy="{cy}" r="{n2(R*0.34)}" fill="none" '
        f'stroke="{GOLD}" stroke-width="{n2(sw)}"/>')

    # 6. green core medallion
    L["06-core"] = (
        f'<circle cx="{cx}" cy="{cy}" r="{n2(R*0.16)}" fill="none" '
        f'stroke="{GREEN}" stroke-width="{n2(sw)}"/>')

    # 7. eight node dots at the outer points (gold, solid)
    nodes = "".join(
        f'<circle cx="{n2(P(cx,cy,R,i*45)[0])}" cy="{n2(P(cx,cy,R,i*45)[1])}" '
        f'r="{n2(node_r)}" fill="{GOLD}"/>'
        for i in range(8))
    L["07-node-dots"] = nodes

    # 8. construction guides (optional — compass & straightedge scaffold)
    guides = (
        f'<circle cx="{cx}" cy="{cy}" r="{n2(R)}" fill="none" stroke="{GOLD}" stroke-width="{n2(gw)}" opacity="0.1"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{n2(R*0.72)}" fill="none" stroke="{GOLD}" stroke-width="{n2(gw)}" opacity="0.1"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{n2(R*0.36)}" fill="none" stroke="{GOLD}" stroke-width="{n2(gw)}" opacity="0.1"/>')
    for i in range(8):
        a = P(cx, cy, R, i * 45); b = P(cx, cy, R, i * 45 + 180)
        guides += (f'<line x1="{n2(a[0])}" y1="{n2(a[1])}" x2="{n2(b[0])}" y2="{n2(b[1])}" '
                   f'stroke="{GOLD}" stroke-width="{n2(gw)}" opacity="0.1"/>')
    L["08-guides"] = guides

    # 9. traces — the 8 leads the thread is born from (hero decoration)
    traces = ""
    for i in range(8):
        p = P(cx, cy, R, i * 45); q = P(cx, cy, R + 30 * k, i * 45)
        traces += (f'<line x1="{n2(p[0])}" y1="{n2(p[1])}" x2="{n2(q[0])}" y2="{n2(q[1])}" '
                   f'stroke="{GOLD}" stroke-width="{n2(1.2*k)}"/>'
                   f'<circle cx="{n2(q[0])}" cy="{n2(q[1])}" r="{n2(4*k)}" fill="{GOLD}"/>')
    L["09-traces"] = traces
    return L

def svg(inner, w=440, h=440, bg=None):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" '
            f'xmlns="http://www.w3.org/2000/svg">{rect}{inner}</svg>')

# ---- build ----
HERE = pathlib.Path(__file__).parent
ELEM = HERE / "elements"
OUTS = [ELEM]                                    # in-repo templates
DIST = pathlib.Path.home() / "Documents/Projects/T.A.R.I.K/Downloads/emanet-seal-parts"
(DIST / "parts").mkdir(parents=True, exist_ok=True)
(DIST / "assembled").mkdir(parents=True, exist_ok=True)

L = seal_layers(220, 220, 150)

# core seal = layers 1-7 (no guides, no traces) — this is what the site shows
CORE_ORDER = ["01-outer-octagon", "02-breathing-circle", "03-mid-octagon",
              "04-circuit-spokes", "05-inner-ring", "06-core", "07-node-dots"]

# ---- 1) individual parts, each wrapped in a named <g> so Figma labels the layer ----
part_titles = {
    "01-outer-octagon": "Outer octagon (green vault rim)",
    "02-breathing-circle": "Breathing circle (gold, faint)",
    "03-mid-octagon": "Mid octagon (gold)",
    "04-circuit-spokes": "Circuit spokes x8 (gold, faint)",
    "05-inner-ring": "Inner ring (gold)",
    "06-core": "Core medallion (green)",
    "07-node-dots": "Node dots x8 (gold)",
    "08-guides": "Construction guides (optional)",
    "09-traces": "Traces + solder pads (optional)",
}
for pid, inner in L.items():
    g = f'<g id="{pid}"><title>{part_titles[pid]}</title>{inner}</g>'
    (DIST / "parts" / f"{pid}.svg").write_text(svg(g))

# ---- 2) assembled seals ----
core_g = "".join(f'<g id="{p}">{L[p]}</g>' for p in CORE_ORDER)
full_g = core_g + f'<g id="09-traces">{L["09-traces"]}</g>'

seal_transparent = svg(core_g)
seal_on_ink      = svg(core_g, bg=INK)
seal_hero        = svg(f'<g id="08-guides">{L["08-guides"]}</g>' + full_g)   # guides+traces

(DIST / "assembled" / "seal.svg").write_text(seal_transparent)
(DIST / "assembled" / "seal-on-ink.svg").write_text(seal_on_ink)
(DIST / "assembled" / "seal-hero.svg").write_text(seal_hero)

# ---- 3) horizontal lockup: seal + Emanet + أمانة (replaces the old starred one) ----
lk = seal_layers(80, 80, 60)
lk_core = "".join(lk[p] for p in CORE_ORDER)
lockup = (
    '<svg width="640" height="160" viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg">'
    f'<g id="seal">{lk_core}</g>'
    f'<text id="wordmark" x="185" y="92" font-family="Fraunces, Georgia, serif" '
    f'font-weight="380" font-size="54" letter-spacing="4" fill="{BONE}">Emanet</text>'
    f'<text id="wordmark-ar" x="187" y="126" font-family="Amiri, serif" font-size="23" '
    f'fill="{GOLD}" opacity="0.78">أمانة</text>'
    '</svg>')
(DIST / "assembled" / "lockup.svg").write_text(lockup)

# wordmarks as their own parts too (editable text)
(DIST / "parts" / "10-wordmark-latin.svg").write_text(
    '<svg width="360" height="90" viewBox="0 0 360 90" xmlns="http://www.w3.org/2000/svg">'
    f'<text x="0" y="64" font-family="Fraunces, Georgia, serif" font-weight="380" '
    f'font-size="64" letter-spacing="4" fill="{BONE}">Emanet</text></svg>')
(DIST / "parts" / "11-wordmark-arabic.svg").write_text(
    '<svg width="180" height="70" viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg">'
    f'<text x="0" y="48" font-family="Amiri, serif" font-size="44" fill="{GOLD}">أمانة</text></svg>')

# ---- 4) overwrite the stale in-repo star templates with the starless seal ----
(ELEM / "logo-mark.svg").write_text(svg(core_g))
(ELEM / "logo-mark-onink.svg").write_text(svg(core_g, bg=INK))
(ELEM / "logo-lockup.svg").write_text(lockup)
(ELEM / "seal-default.svg").write_text(svg(core_g))
(ELEM / "seal-outline.svg").write_text(svg(f'<g id="guides">{L["08-guides"]}</g>' + core_g))
(ELEM / "seal-full-lit.svg").write_text(svg(core_g, bg=INK))
(ELEM / "seal-large.svg").write_text(seal_hero)

print(f"parts:     {len(list((DIST/'parts').glob('*.svg')))} files -> {DIST/'parts'}")
print(f"assembled: {len(list((DIST/'assembled').glob('*.svg')))} files -> {DIST/'assembled'}")
print(f"repo elements refreshed (starless) -> {ELEM}")
