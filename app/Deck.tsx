'use client';
/* Ported verbatim from the single-file source; loose-JS style kept intentionally. */
/* eslint-disable no-var, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function Deck() {
  useEffect(() => {
    var rafId = 0;
    var resizeTimer: ReturnType<typeof setTimeout> | undefined;

    try {
      var REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      var GS: any = gsap;
      var ST: any = ScrollTrigger;
      var LEN: any = Lenis;
      if (GS && ST) { try { GS.registerPlugin(ST); } catch (e) { ST = null; } }

      var destroyed = false;

      /* =====================================================
         GEOMETRY — a single continuous {8/3} octagram (the
         Islamic khatam). From 8 equally-spaced vertices we
         connect every 3rd one in ONE unbroken cycle
         (0→3→6→1→4→7→2→5→0): exactly 8 sharp points, never a
         6-point star and never two overlapping shapes.
         ===================================================== */
      var C = 220, R = 150;
      function P(r: number, deg: number) { var a = (deg - 90) * Math.PI / 180; return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) }; }
      function n2(v: number) { return Math.round(v * 100) / 100; }
      function poly(pts: any[]) { return pts.map(function (p: any) { return n2(p.x) + ',' + n2(p.y); }).join(' '); }

      function buildSeal(opts?: any) {
        opts = opts || {};
        var guides = opts.guides !== false;
        var traces = !!opts.traces;
        var rot = opts.rot || 0;
        var k, i;
        var s = '<svg viewBox="0 0 ' + (2 * C) + ' ' + (2 * C) + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">';
        s += '<g class="rot" transform="rotate(' + rot + ' ' + C + ' ' + C + ')">';

        if (guides) {
          s += '<g class="guides">';
          s += '<circle cx="' + C + '" cy="' + C + '" r="' + R + '"/>';
          s += '<circle cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.70) + '"/>';
          s += '<circle cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.40) + '"/>';
          for (k = 0; k < 8; k++) { var a = P(R, k * 45), b = P(R, k * 45 + 180); s += '<line x1="' + n2(a.x) + '" y1="' + n2(a.y) + '" x2="' + n2(b.x) + '" y2="' + n2(b.y) + '"/>'; }
          for (k = 0; k < 8; k++) { var cpt = P(R * 0.70, k * 45); s += '<circle cx="' + n2(cpt.x) + '" cy="' + n2(cpt.y) + '" r="' + n2(R * 0.40) + '"/>'; }
          s += '</g>';
        }

        /* the single {8/3} star (one polygon, one continuous path) */
        var starOrder = [0, 3, 6, 1, 4, 7, 2, 5];
        var star = []; for (i = 0; i < 8; i++) { star.push(P(R, starOrder[i] * 45)); }
        var oct = []; for (i = 0; i < 8; i++) { oct.push(P(R * 0.40, i * 45)); }

        s += '<circle class="draw fig" cx="' + C + '" cy="' + C + '" r="' + R + '" pathLength="1"/>';
        s += '<polygon class="draw fig" points="' + poly(star) + '" pathLength="1"/>';
        s += '<polygon class="draw fig faint" points="' + poly(oct) + '" pathLength="1"/>';

        if (traces) {
          s += '<g class="traces">';
          [1, 3, 5, 7].forEach(function (kk) {
            var p = P(R, kk * 45), q = P(R + 46, kk * 45);
            s += '<line class="trace" x1="' + n2(p.x) + '" y1="' + n2(p.y) + '" x2="' + n2(q.x) + '" y2="' + n2(q.y) + '" pathLength="1"/>';
            s += '<circle class="trace-pad" cx="' + n2(q.x) + '" cy="' + n2(q.y) + '" r="4"/>';
          });
          s += '</g>';
        }

        /* solder-pad node dots at the 8 vertices */
        for (i = 0; i < 8; i++) { var pt = P(R, i * 45); s += '<circle class="node" data-i="' + i + '" cx="' + n2(pt.x) + '" cy="' + n2(pt.y) + '" r="5.5"/>'; }

        s += '</g></svg>';
        return s;
      }

      /* ---------- inject the geometry ---------- */
      var heroSeal = buildSeal({ guides: true, traces: true });
      var wl: any = document.getElementById('wrapL'), wr: any = document.getElementById('wrapR');
      if (wl) wl.innerHTML = heroSeal;
      if (wr) wr.innerHTML = heroSeal;

      var tm: any = document.getElementById('trustmark');
      if (tm) tm.innerHTML = buildSeal({ guides: false, traces: false });

      var fm: any = document.getElementById('footerMark');
      if (fm) fm.innerHTML = buildSeal({ guides: false, traces: false, rot: 22.5 });

      Array.prototype.forEach.call(document.querySelectorAll('.keeper .av'), function (av: any) {
        var rot = parseFloat(av.getAttribute('data-rot')) || 0;
        av.innerHTML = buildSeal({ guides: false, traces: false, rot: rot });
      });

      /* =====================================================
         ACCRETION — the corner trust-mark gains a lit node per
         section the token reaches. The mark and the carried
         token are ONE system: same trust, handed on.
         ===================================================== */
      var litCount = 0;
      function addNode() {
        if (!tm || litCount >= 8) return;
        var nodes = tm.querySelectorAll('.node');
        if (nodes[litCount]) nodes[litCount].classList.add('lit');
        litCount++;
      }

      var powered = false;
      function powerOn() {
        if (powered) return; powered = true;
        document.body.classList.add('powered');
        if (tm) {
          Array.prototype.forEach.call(tm.querySelectorAll('.node'), function (n: any) { n.classList.add('lit'); });
          tm.classList.add('whole');   /* the mark completes & glows whole at the close */
        }
        litCount = 8;
      }

      /* =====================================================
         LENIS — weighted, reverent scroll (stopped until entry)
         ===================================================== */
      var lenis: any = null;
      if (LEN && !REDUCE) {
        try {
          lenis = new LEN({
            duration: 1.5,
            easing: function (t: number) { return 1 - Math.pow(1 - t, 3.4); },
            lerp: 0.07,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.1
          });
          var raf = function (time: number) { if (destroyed) return; lenis.raf(time); rafId = requestAnimationFrame(raf); };
          rafId = requestAnimationFrame(raf);
          if (ST) { lenis.on('scroll', ST.update); try { GS.ticker.lagSmoothing(0); } catch (e) { } }
          lenis.stop();
        } catch (e) { lenis = null; }
      }

      /* =====================================================
         THE THREAD — single path down the whole page, born from
         the corner trust-mark's lowest node, drawn by scroll,
         carrying the glowing trust-token between nodes.
         (Engine is GSAP-independent so it survives CDN failure.)
         ===================================================== */
      var layer: any = document.getElementById('thread-layer');
      var base: any = document.getElementById('thread-base');
      var live: any = document.getElementById('thread-live');
      var token: any = document.getElementById('token');
      var hint: any = document.getElementById('scrollcue');

      var anchors: any[] = Array.prototype.slice.call(document.querySelectorAll('.anchor'));
      var fired: any[] = [];
      var liveLen = 0;
      var anchorLens: any[] = [];

      function scrollY() { return window.pageYOffset || document.documentElement.scrollTop || 0; }
      function docHeight() {
        return Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight
        );
      }
      function maxScroll() { return Math.max(1, docHeight() - window.innerHeight); }

      function centerOf(node: any) {
        var r = node.getBoundingClientRect();
        return { x: r.left + r.width / 2 + window.pageXOffset, y: r.top + r.height / 2 + window.pageYOffset };
      }

      /* cardinal-spline -> cubic bezier through waypoints */
      function splinePath(pts: any[]) {
        if (pts.length < 2) return "";
        var d = "M " + pts[0].x.toFixed(1) + " " + pts[0].y.toFixed(1);
        for (var i = 0; i < pts.length - 1; i++) {
          var p0 = pts[i - 1] || pts[i];
          var p1 = pts[i];
          var p2 = pts[i + 1];
          var p3 = pts[i + 2] || p2;
          var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
          var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
          d += " C " + c1x.toFixed(1) + " " + c1y.toFixed(1) + ", " +
            c2x.toFixed(1) + " " + c2y.toFixed(1) + ", " +
            p2.x.toFixed(1) + " " + p2.y.toFixed(1);
        }
        return d;
      }

      function fireAnchor(i: number) {
        var a = anchors[i];
        if (!a || fired[i]) return;
        fired[i] = true;
        var sec = a.closest('.scene') || a.closest('section') || a.closest('footer') || a.parentNode;
        if (sec) {
          sec.classList.add('arrived');
          var pip = sec.querySelector('.node-pip');
          if (pip) pip.classList.add('lit');
        }
        if (a.hasAttribute('data-beat')) addNode();   /* a node per section, on the corner mark */
      }

      function buildThread() {
        if (!layer || !base || !live || !tm) return;
        var W = document.documentElement.clientWidth;
        var H = docHeight();

        layer.setAttribute('width', W);
        layer.setAttribute('height', H);
        layer.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        layer.style.height = H + 'px';

        /* origin = the lowest node of the corner trust-mark (fixed; treat as a document-top anchor) */
        var startX, startY;
        var tmNodes = tm.querySelectorAll('.node');
        var lowest: any = null, lowestY = -Infinity;
        Array.prototype.forEach.call(tmNodes, function (n: any) {
          var r = n.getBoundingClientRect();
          var cy = r.top + r.height / 2;
          if (cy > lowestY) { lowestY = cy; lowest = n; }
        });
        if (lowest) {
          var lr = lowest.getBoundingClientRect();
          /* corner mark is position:fixed — convert its viewport point to
             document space so the thread stays born from it after a
             resize that happens while the page is scrolled. */
          startX = lr.left + lr.width / 2 + window.pageXOffset;
          startY = lr.top + lr.height / 2 + window.pageYOffset;
        } else { startX = 70; startY = 80 + window.pageYOffset; }

        var pts: any[] = [{ x: startX, y: startY }];
        anchors.forEach(function (a: any) { pts.push(centerOf(a)); });
        var last = pts[pts.length - 1];
        pts.push({ x: startX, y: Math.min(last.y + 180, H - 40) });   /* close the loop back to the start column */

        var d = splinePath(pts);
        base.setAttribute('d', d);
        live.setAttribute('d', d);

        liveLen = live.getTotalLength ? live.getTotalLength() : 0;
        live.style.strokeDasharray = liveLen;

        if (REDUCE) {
          /* reduced motion: show the final state, skip the heavy travel */
          live.style.strokeDashoffset = 0;
          if (token) token.setAttribute('opacity', '0');
          for (var fi = 0; fi < anchors.length; fi++) { fireAnchor(fi); }
          powerOn();
          return;
        }

        live.style.strokeDashoffset = liveLen;

        /* map path-length at which the token reaches each waypoint */
        anchorLens = [];
        if (liveLen > 0 && live.getPointAtLength) {
          var samples = 600, table: any[] = [];
          for (var s = 0; s <= samples; s++) {
            var L = (s / samples) * liveLen;
            var pp = live.getPointAtLength(L);
            table.push({ L: L, x: pp.x, y: pp.y });
          }
          pts.slice(1, pts.length - 1).forEach(function (wp: any) {
            var best = 0, bestD = Infinity;
            for (var t = 0; t < table.length; t++) {
              var dx = table[t].x - wp.x, dy = table[t].y - wp.y;
              var dd = dx * dx + dy * dy;
              if (dd < bestD) { bestD = dd; best = table[t].L; }
            }
            anchorLens.push(best);
          });
        }
      }

      function updateThread() {
        if (REDUCE) return;
        if (liveLen <= 0) return;
        var prog = Math.min(1, Math.max(0, scrollY() / maxScroll()));
        var drawn = liveLen * prog;

        /* draw the live trace from the corner downward */
        live.style.strokeDashoffset = (liveLen - drawn);

        /* carry the token at the drawn tip */
        if (token && live.getPointAtLength) {
          var p = live.getPointAtLength(Math.min(drawn, liveLen - 0.5));
          token.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ')');
          token.setAttribute('opacity', prog > 0.003 ? '1' : '0');
        }

        /* hand the token to each node as it arrives -> ignite */
        for (var i = 0; i < anchorLens.length; i++) {
          if (drawn >= anchorLens[i] - 4 && !fired[i]) fireAnchor(i);
        }

        /* the board powers on as the loop closes */
        if (prog > 0.985) powerOn();

        /* fade the cue once the line is being followed */
        if (hint) { hint.style.opacity = prog > 0.03 ? '0' : '1'; }
      }

      var ticking = false;
      function onScroll() {
        if (!ticking) { ticking = true; requestAnimationFrame(function () { updateThread(); ticking = false; }); }
      }

      /* =====================================================
         REVEALS — ScrollTrigger when present, else IO, else show
         ===================================================== */
      function setupReveals() {
        var items: any[] = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
        if (REDUCE) { items.forEach(function (n: any) { n.classList.add('in'); }); return; }
        if (ST) {
          items.forEach(function (n: any) { ST.create({ trigger: n, start: 'top 86%', onEnter: function () { n.classList.add('in'); }, once: true }); });
        } else if ('IntersectionObserver' in window) {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
          }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
          items.forEach(function (n: any) { io.observe(n); });
        } else {
          items.forEach(function (n: any) { n.classList.add('in'); });
        }
      }

      /* =====================================================
         HERO INTRO — the seal draws itself (compass & straightedge)
         ===================================================== */
      function introDraw() {
        if (!GS || REDUCE) return;
        GS.set('#sealStage .draw', { strokeDasharray: 1, strokeDashoffset: 1 });
        GS.set('#sealStage .trace', { strokeDasharray: 1, strokeDashoffset: 1 });
        GS.set('#sealStage .node', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
        GS.set('#sealStage .trace-pad', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
        GS.set('#sealStage .guides', { opacity: 0 });
        GS.set('.hero-eyebrow, .hero-arabic, .hero-hint', { opacity: 0, y: 10 });

        var tl = GS.timeline({ delay: 0.35 });
        tl.to('.hero-eyebrow', { opacity: .82, y: 0, duration: 1.0, ease: 'power2.out' });
        tl.to('#sealStage .guides', { opacity: .10, duration: 1.4, ease: 'sine.out' }, '-=0.7');
        tl.to('#sealStage .draw', { strokeDashoffset: 0, duration: 1.25, stagger: 0.22, ease: 'power2.inOut' }, '-=1.1');
        tl.to('#sealStage .node', { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2)' }, '-=0.5');
        tl.to('#sealStage .trace', { strokeDashoffset: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' }, '-=0.5');
        tl.to('#sealStage .trace-pad', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' }, '-=0.4');
        tl.to('.hero-arabic', { opacity: .62, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.5');
        tl.to('.hero-hint', { opacity: .34, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.7');
      }

      /* =====================================================
         THE CEREMONY — press the seal -> vault door parts ->
         pass through -> headline lands -> seal shrinks to the
         corner trust-mark -> the thread is then born from it.
         ===================================================== */
      var entered = false;
      var cursor: any = document.getElementById('cursor');
      var corner: any = document.getElementById('corner');

      function rebuild() {
        buildThread();
        updateThread();
        if (ST) { try { ST.refresh(); } catch (e) { } }
      }
      function afterEnter() { rebuild(); }

      function enter() {
        if (entered) return;
        entered = true;

        document.documentElement.classList.remove('gated');
        document.body.classList.add('entered');
        if (lenis) { try { lenis.start(); } catch (e) { } }
        if (cursor) { cursor.classList.remove('on'); cursor.style.opacity = '0'; }
        if (corner) corner.classList.add('show');   /* the shrunk seal takes the corner */

        var gate: any = document.getElementById('gate');

        if (GS && !REDUCE) {
          var tl = GS.timeline({ onComplete: afterEnter });
          /* 1. precise 22.5° rotation */
          tl.to('#sealStage .svg-wrap', { rotation: 22.5, duration: 0.95, ease: 'power3.inOut', transformOrigin: '50% 50%' });
          /* 2. the seam lights */
          tl.to('.seam', { opacity: 1, duration: 0.4, ease: 'sine.out' }, '-=0.35');
          /* 3. part along the vertical seam like a vault door */
          tl.to('.gate-half.left', { xPercent: -62, duration: 1.05, ease: 'power3.inOut' }, '-=0.05');
          tl.to('.gate-half.right', { xPercent: 62, duration: 1.05, ease: 'power3.inOut' }, '<');
          /* 4. the camera passes THROUGH (scale + fade, no white flash) */
          tl.to('#sealStage', { scale: 2.5, duration: 1.15, ease: 'power2.in' }, '<0.08');
          tl.to('#gate', {
            opacity: 0, duration: 0.85, ease: 'power2.inOut',
            onComplete: function () { if (gate) gate.style.display = 'none'; }
          }, '-=0.7');
          /* 5. the headline lands inside */
          tl.from('.threshold-h .w', { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' }, '-=0.55');
          tl.from('.threshold-sub', { opacity: 0, y: 14, duration: 0.8, ease: 'power2.out' }, '-=0.7');
        } else {
          /* fallback: clean fade, no white flash */
          if (gate) {
            gate.style.transition = 'opacity .7s ease';
            gate.style.opacity = '0';
            setTimeout(function () { gate.style.display = 'none'; afterEnter(); }, 720);
          } else { afterEnter(); }
        }
      }

      /* bind the press */
      var gateEl = document.getElementById('gate');
      if (gateEl) {
        gateEl.addEventListener('click', enter);
        gateEl.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') { e.preventDefault(); enter(); }
        });
        if (!REDUCE && window.matchMedia && window.matchMedia('(pointer:fine)').matches && cursor) {
          gateEl.addEventListener('mousemove', function (e) {
            cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
            if (!entered) cursor.classList.add('on');
          });
          gateEl.addEventListener('mouseleave', function () { cursor.classList.remove('on'); });
        }
      }

      /* ---------- nav solidify ---------- */
      var topbar = document.getElementById('topbar');
      function navState() { if (!topbar) return; if (scrollY() > 40) topbar.classList.add('solid'); else topbar.classList.remove('solid'); }

      /* scroll/resize handlers (named so cleanup can remove them) */
      function onScrollWin() { onScroll(); navState(); }
      function onResize() { clearTimeout(resizeTimer); resizeTimer = setTimeout(rebuild, 180); }

      /* =====================================================
         BOOT
         ===================================================== */
      function boot() {
        setupReveals();
        introDraw();

        /* let fonts/layout settle, then lay the thread */
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            buildThread();
            updateThread();
            navState();
          });
        });

        /* scroll wiring — Lenis if present, else native */
        if (lenis) { lenis.on('scroll', onScrollWin); }
        window.addEventListener('scroll', onScrollWin, { passive: true });

        /* relayout */
        window.addEventListener('resize', onResize);
        if (document.fonts && document.fonts.ready) { document.fonts.ready.then(rebuild); }
        window.addEventListener('load', rebuild);

        /* smooth in-page anchors */
        document.querySelectorAll('a[href^="#"]').forEach(function (a: any) {
          a.addEventListener('click', function (ev: Event) {
            var id = a.getAttribute('href');
            if (id.length < 2) return;
            var t = document.querySelector(id);
            if (!t) return;
            ev.preventDefault();
            if (lenis) { lenis.scrollTo(t, { offset: -60 }); }
            else { t.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth' }); }
          });
        });
      }

      if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); }
      else { boot(); }

      /* ---------- cleanup on unmount ---------- */
      return function cleanup() {
        destroyed = true;
        if (rafId) cancelAnimationFrame(rafId);
        clearTimeout(resizeTimer);
        window.removeEventListener('scroll', onScrollWin);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('load', rebuild);
        try { if (ST && ST.getAll) { ST.getAll().forEach(function (t: any) { t.kill(); }); } } catch (e) { }
        try { if (lenis) lenis.destroy(); } catch (e) { }
      };

    } catch (err) {
      /* never leave the visitor stranded behind the gate */
      try {
        document.documentElement.classList.remove('gated');
        document.body.classList.add('entered');
        var g = document.getElementById('gate');
        if (g) g.style.display = 'none';
        var c = document.getElementById('corner');
        if (c) c.classList.add('show');
        document.querySelectorAll('.reveal').forEach(function (n) { n.classList.add('in'); });
      } catch (e) { }
    }
  }, []);

  return (
    <>
      {/* ===== THREAD LAYER (single unbroken gold line, born from the corner trust-mark) ===== */}
      <svg id="thread-layer" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <filter id="threadGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tokenGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path id="thread-base" className="thread-path" d="" />
        <path id="thread-live" className="thread-path" d="" />
        <g id="token" opacity="0" filter="url(#tokenGlow)">
          <circle className="halo" cx="0" cy="0" r="9" />
          <circle className="core" cx="0" cy="0" r="3.4" />
        </g>
      </svg>

      {/* ===== CORNER TRUST-MARK (the shrunk seal — lights a node per section) ===== */}
      <div className="corner" id="corner">
        <div className="trustmark" id="trustmark" aria-hidden="true"></div>
        <span className="corner-word">
          <span className="cw-name">Emanet</span>
          <span className="cw-ar arabic">أمانة</span>
        </span>
      </div>

      {/* ===== THE GATE / SEAL CEREMONY ===== */}
      <div id="gate" role="button" tabIndex={0} aria-label="Press the seal to be entrusted">
        <div className="gate-inner">
          <p className="hero-eyebrow mono">AMANAH — A TRUST HELD IN SAFEKEEPING</p>
          <div className="seal-stage" id="sealStage">
            <div className="gate-half left"><div className="svg-wrap" id="wrapL"></div></div>
            <div className="gate-half right"><div className="svg-wrap" id="wrapR"></div></div>
            <div className="seam"></div>
          </div>
          <p className="hero-arabic arabic">أمانة</p>
          <p className="hero-hint mono">press the seal to be entrusted</p>
        </div>
        <div className="cursor mono" id="cursor"><span>press to be entrusted</span></div>
      </div>

      {/* ===== INTERIOR (the journey the thread routes through) ===== */}
      <div className="shell">

        <header className="topbar" id="topbar">
          <nav className="topnav">
            <a href="#practice">The Practice</a>
            <a href="#keepers">The Keepers</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* THRESHOLD */}
        <section id="threshold">
          <i className="anchor a-right" data-anchor="1" data-beat="" aria-hidden="true"></i>
          <div className="wrap">
            <div className="threshold-grid">
              <div>
                <p className="threshold-sub mono"><span className="node-pip"></span>NODE 00 · THE AMANAH</p>
                <h1 className="display threshold-h">
                  <span className="ln"><span className="w">We</span> <span className="w">hold</span> <span className="w">your</span></span>
                  <span className="ln"><span className="w">technology</span></span>
                  <span className="ln"><span className="w">in</span> <span className="w">trust.</span></span>
                </h1>
                <p className="threshold-thesis reveal">Amanah (<span className="arabic">أمانة</span>) is a trust placed in your keeping, to be returned whole. We build software the same way — what you hand us, we look after, and hand back intact.</p>
              </div>
              <div className="threshold-side reveal">
                <p>An engineering studio kept like a workshop, not a shop floor. The code, the systems, and the quiet between releases.</p>
              </div>
            </div>
          </div>
          <div className="scrollcue mono" id="scrollcue"><span className="cue-dot"></span><span className="cue-line"></span>follow the line</div>
        </section>

        {/* PRACTICE — five service nodes */}
        <section className="band practice" id="practice">
          <div className="inner section-head reveal">
            <span className="idx">The Practice</span>
            <h2 className="display">Five disciplines,<br />carried on one thread.</h2>
            <p>The trust passes from hand to hand and is never set down. Each node below is a place the line runs through.</p>
          </div>

          {/* NODE 01 */}
          <div className="scene right" id="node-1">
            <i className="anchor a-left" data-anchor="2" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal">
              <div className="nlabel"><span className="node-pip"></span><span className="num">01</span><span className="tag">Node 01 · Automation</span></div>
              <h3 className="display">AI automation &amp; agents</h3>
              <p>Agents that do real work on your machines, on your terms — and that know when to ask. We treat autonomy as something earned and supervised, never a black box you cannot turn off.</p>
              <div className="flex"><span className="pip"></span><span>Flagship · “Jarvis”, a local voice agent</span></div>
              <div className="stack"><span>Orchestration</span><span>Tool use</span><span>On-device</span><span>Private by default</span></div>
            </div>
          </div>

          {/* NODE 02 */}
          <div className="scene left" id="node-2">
            <i className="anchor a-right" data-anchor="3" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal">
              <div className="nlabel"><span className="node-pip"></span><span className="num">02</span><span className="tag">Node 02 · Software</span></div>
              <h3 className="display">Web &amp; app development</h3>
              <p>Interfaces with the manners of good craft — fast, legible, and honest about state. Built to last past launch week, and to be maintained by whoever inherits them next.</p>
              <div className="stack"><span>TypeScript</span><span>Rust</span><span>Edge</span><span>Design systems</span></div>
            </div>
          </div>

          {/* NODE 03 */}
          <div className="scene right" id="node-3">
            <i className="anchor a-left" data-anchor="4" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal">
              <div className="nlabel"><span className="node-pip"></span><span className="num">03</span><span className="tag">Node 03 · Data engineering</span></div>
              <h3 className="display">Data engineering</h3>
              <p>Pipelines you can trust with the truth — clean lineage, honest numbers, contracts that hold. The plumbing nobody notices until it leaks, and we don&apos;t let it leak.</p>
              <div className="stack"><span>Lakehouse</span><span>dbt</span><span>Streaming</span><span>Governance</span></div>
            </div>
          </div>

          {/* NODE 04 */}
          <div className="scene left" id="node-4">
            <i className="anchor a-right" data-anchor="5" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal">
              <div className="nlabel"><span className="node-pip"></span><span className="num">04</span><span className="tag">Node 04 · Cloud / DevOps</span></div>
              <h3 className="display">Cloud &amp; DevOps</h3>
              <p>Infrastructure as a discipline, not a dashboard. Reproducible environments, sane deploys, and the kind of quiet reliability you only notice when it is missing.</p>
              <div className="stack"><span>Kubernetes</span><span>Terraform</span><span>Observability</span></div>
            </div>
          </div>

          {/* NODE 05 */}
          <div className="scene right" id="node-5">
            <i className="anchor a-left" data-anchor="6" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal">
              <div className="nlabel"><span className="node-pip"></span><span className="num">05</span><span className="tag">Node 05 · Systems &amp; Performance</span></div>
              <h3 className="display">Systems &amp; performance</h3>
              <p>Down where every cycle is accounted for — profiling, low-level work, and the unglamorous tuning that makes everything above it feel effortless. The closest the line comes to the metal.</p>
              <div className="stack"><span>Low-level</span><span>Profiling</span><span>Optimization</span><span>Reliability</span></div>
            </div>
          </div>
        </section>

        {/* KEEPERS */}
        <section className="band keepers" id="keepers">
          <i className="anchor a-right" data-anchor="7" data-beat="" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx"><span className="node-pip"></span>The Keepers</span>
            <h2 className="display">Four hands<br />on the same line.</h2>
            <p>A small studio on purpose. Each keeper signs their own node — and answers for it.</p>
          </div>
          <div className="inner grid" id="keeper-grid">
            <div className="keeper reveal d1">
              <div className="av" data-rot="0"></div>
              <h4>Ajdin Salihović</h4>
              <p className="role">Data Engineer</p>
              <p className="bio">Builds the pipelines and contracts the rest of us stand on.</p>
            </div>
            <div className="keeper reveal d2">
              <div className="av" data-rot="22.5"></div>
              <h4>Tarik Topalović</h4>
              <p className="role">AI Automation Engineer</p>
              <p className="bio">Designs agents that act with restraint. Building Jarvis, a local voice agent.</p>
            </div>
            <div className="keeper reveal d3">
              <div className="av" data-rot="33.75"></div>
              <h4>Eman Čičkušić</h4>
              <p className="role">DevOps Engineer</p>
              <p className="bio">Keeps the deploys boring and the lights on.</p>
            </div>
            <div className="keeper reveal d1">
              <div className="av" data-rot="11.25"></div>
              <h4>Aner Atović</h4>
              <p className="role">Full-Stack Engineer</p>
              <p className="bio">From schema to screen — the whole stack, held together.</p>
            </div>
          </div>
        </section>

        {/* PRINCIPLE — the one emerald breath, the halal ethos */}
        <section id="principle">
          <i className="anchor a-left" data-anchor="8" data-beat="" aria-hidden="true"></i>
          <div className="pwrap">
            <p className="p-eyebrow mono reveal"><span className="node-pip"></span>The line we keep</p>
            <blockquote className="reveal">We keep some trusts by <b>refusing others</b> — no riba, no work that betrays the amanah.</blockquote>
            <p className="p-note reveal d1">It is a matter of care, not austerity. The same instinct that makes us guard your data makes us decline the work we would not want held against us.</p>
          </div>
        </section>

        {/* PROOF — understated */}
        <section className="band" id="proof">
          <i className="anchor a-right" data-anchor="9" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx">Quietly, for years</span>
            <h2 className="display">We&apos;d rather show<br />than tell.</h2>
            <p>No vanity metrics. The proof is in what we are willing to refuse, and what we are willing to be held to.</p>
          </div>
          <div className="inner proof-grid">
            <div className="pcard reveal d1">
              <p className="pt mono">Local-first</p>
              <p className="pk display">Yours to unplug.</p>
              <p className="pv">Jarvis runs on your own machine. Nothing leaves it that you didn&apos;t send — no cloud you can&apos;t switch off.</p>
            </div>
            <div className="pcard reveal d2">
              <p className="pt mono">Read the source</p>
              <p className="pk display">Written to be audited.</p>
              <p className="pv">Code legible enough to inherit, documented enough to trust, and handed on intact.</p>
            </div>
            <div className="pcard reveal d3">
              <p className="pt mono">Kept, not rented</p>
              <p className="pk display">You own the keys.</p>
              <p className="pv">Infrastructure you hold and dependencies you can remove. No lock-in dressed up as a feature.</p>
            </div>
          </div>
        </section>

        {/* FOOTER / CONTACT — the loop closes, the board powers on */}
        <footer className="foot" id="contact">
          <i className="anchor a-left" data-anchor="10" style={{ top: '80px' }} aria-hidden="true"></i>
          <div className="footer-mark" id="footerMark" aria-hidden="true"></div>
          <div className="inner">
            <div className="pretitle mono reveal">The line returns · <span className="arabic">أمانة</span></div>
            <h2 className="display reveal">Place a trust<br />in <em>steady hands.</em></h2>
            <a className="cta reveal d1" href="mailto:salam@emanet.ai">
              <span className="ar">أمانة</span>
              <span>Place your trust</span>
            </a>

            <div className="footrow">
              <div className="sig">Held in trust. <span className="ar">أمانة</span></div>
              <div className="legal">Emanet AI · MMXXVI · salam@emanet.ai</div>
            </div>
          </div>
        </footer>

      </div>{/* /shell */}
    </>
  );
}
