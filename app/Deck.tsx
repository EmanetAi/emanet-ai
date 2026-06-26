'use client';
/* Ported verbatim from the single-file source; loose-JS style kept intentionally. */
/* eslint-disable no-var, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
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
      var sampleTable: any[] = [];   /* {L,x,y} samples of the live path, reused per frame */

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
        sampleTable = [];
        if (liveLen > 0 && live.getPointAtLength) {
          /* one bounded sampling pass; the table is then reused every scroll frame so
             updateThread never calls the (synchronous, path-walking) getPointAtLength again. */
          var samples = Math.max(120, Math.min(360, Math.round(liveLen / 14)));
          for (var s = 0; s <= samples; s++) {
            var L = (s / samples) * liveLen;
            var pp = live.getPointAtLength(L);
            sampleTable.push({ L: L, x: pp.x, y: pp.y });
          }
          pts.slice(1, pts.length - 1).forEach(function (wp: any) {
            var best = 0, bestD = Infinity;
            for (var t = 0; t < sampleTable.length; t++) {
              var dx = sampleTable[t].x - wp.x, dy = sampleTable[t].y - wp.y;
              var dd = dx * dx + dy * dy;
              if (dd < bestD) { bestD = dd; best = sampleTable[t].L; }
            }
            anchorLens.push(best);
          });
        }
      }

      /* read a point off the precomputed table (uniform spacing -> direct index + lerp).
         Replaces a per-frame getPointAtLength, which was the scroll-jank source. */
      function sampleAt(L: number) {
        var n = sampleTable.length;
        if (n === 0 || liveLen <= 0) return { x: 0, y: 0 };
        if (n === 1) return sampleTable[0];
        var f = Math.max(0, Math.min(1, L / liveLen)) * (n - 1);
        var i0 = Math.floor(f), i1 = Math.min(n - 1, i0 + 1), t = f - i0;
        var a = sampleTable[i0], b = sampleTable[i1];
        return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      }

      function updateThread() {
        if (REDUCE) return;
        if (liveLen <= 0) return;
        var prog = Math.min(1, Math.max(0, scrollY() / maxScroll()));
        var drawn = liveLen * prog;

        /* draw the live trace from the corner downward */
        live.style.strokeDashoffset = (liveLen - drawn);

        /* carry the token at the drawn tip — read the precomputed table, not
           getPointAtLength (that synchronous path-walk every frame was the jank). */
        if (token && sampleTable.length) {
          var p = sampleAt(Math.min(drawn, liveLen - 0.5));
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
        /* the thread is only laid AFTER entry (it's born from the corner mark and hidden
           behind the gate until then). Guarding here keeps the load/fonts/resize handlers
           from running the path-sampling pass during the opening = the seal draws clean. */
        if (!entered) return;
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

      /* =====================================================
         SERVICE DETAIL — each service card zooms into a
         fullscreen panel via GSAP Flip (shared-element expand).
         Scroll + Lenis are paused while a panel is open.
         ===================================================== */
      var FL: any = Flip;
      if (GS && FL) { try { GS.registerPlugin(FL); } catch (e) { FL = null; } }

      var overlay: any = document.getElementById('detailOverlay');
      var panel: any = document.getElementById('detailPanel');
      var pbody: any = document.getElementById('detailBody');
      var pclose: any = document.getElementById('detailClose');
      var pback: any = document.getElementById('detailBackdrop');
      var currentCard: any = null;
      var detailOpen = false;
      var detailAnimating = false;

      var detailExtra: any = {
        '01': {
          approach: 'We start by finding the few tasks worth automating, not every task we could. Each agent gets the narrowest tools that do the job, a written record of what it did, and a stop it must respect. Your own documents stay where they are — retrieval reads them without copying them somewhere you cannot see.',
          examples: [{ t: 'Parallel-Claude', id: 'work-parallel-claude' }, { t: 'HyperAgent Relay', id: 'work-hyperagent-relay' }]
        },
        '02': {
          approach: 'We ship a small working slice early and grow it in the open, so you are never waiting on a reveal. The code is written to be read by the next person, not just to pass today. We stay honest about what is done, what is rough, and what is still a guess.',
          examples: [{ t: 'MoStay', id: 'work-mostay' }, { t: 'Classroom 2.0', id: 'work-classroom' }]
        },
        '03': {
          approach: 'We treat the numbers as something we will be asked to defend, so lineage and tests come first, not last. Pipelines are built to fail loudly and recover quietly. The same care makes your data safe to query without it leaking where it should not.',
          examples: [{ t: 'Real-time Serverless Pipeline', id: 'work-pipeline' }, { t: 'Data visualization & research', id: 'work-dataviz' }]
        },
        '04': {
          approach: 'Everything that runs is described in code, so an environment can be rebuilt rather than remembered. Deploys are meant to be dull. We size infrastructure to real usage and read the bill with you, line by line.',
          examples: [{ t: 'Intelligent Cloud-Ops Agent', id: 'work-cloud-ops' }, { t: 'Cloud security & IaC labs', id: 'work-iac' }]
        },
        '05': {
          approach: 'Security is a default we set on the first commit, not a review we schedule for the end. Secrets and access are handled with care, backups are tested, and uptime is something you only notice when it is gone. We make what we build safe by default — we do not pose as your security team.',
          examples: [{ t: 'Cloud security & IaC labs', id: 'work-iac' }]
        }
      };

      function dtxt(el: any, sel: string) { var n = el.querySelector(sel); return n ? n.innerHTML : ''; }

      function populateDetail(card: any) {
        if (!pbody) return;
        var numEl = card.querySelector('.num');
        var num = (numEl ? numEl.textContent : '').trim();
        var tag = dtxt(card, '.tag');
        var title = dtxt(card, 'h3');
        var line = dtxt(card, 'p.line');
        var deliver = dtxt(card, '.deliver .dv');
        var stackHtml = '';
        Array.prototype.forEach.call(card.querySelectorAll('.stack span'), function (s: any) { stackHtml += '<span>' + s.innerHTML + '</span>'; });
        var ex = detailExtra[num] || { approach: '', examples: [] };
        var exHtml = (ex.examples || []).map(function (e: any) { return '<a class="detail-ex" href="#' + e.id + '">' + e.t + '</a>'; }).join('');
        pbody.innerHTML =
          '<p class="detail-tag mono">' + tag + '</p>' +
          '<h2 class="detail-title display">' + title + '</h2>' +
          '<p class="detail-line">' + line + '</p>' +
          '<div class="detail-block"><p class="detail-k mono">What you get</p><p class="detail-p">' + deliver + '</p></div>' +
          '<div class="detail-block"><p class="detail-k mono">How we approach it</p><p class="detail-p">' + ex.approach + '</p></div>' +
          '<div class="detail-block"><p class="detail-k mono">Stack</p><div class="stack">' + stackHtml + '</div></div>' +
          (exHtml ? '<div class="detail-block"><p class="detail-k mono">Example from our work</p><div class="detail-ex-row">' + exHtml + '</div></div>' : '');
        Array.prototype.forEach.call(pbody.querySelectorAll('.detail-ex'), function (a: any) {
          a.addEventListener('click', function (ev: Event) {
            ev.preventDefault();
            var id = a.getAttribute('href');
            var target = id ? document.querySelector(id) : null;
            closeDetail(function () {
              if (!target) return;
              if (lenis) { try { lenis.scrollTo(target, { offset: -60 }); } catch (e) { } }
              else { try { target.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth' }); } catch (e) { } }
            });
          });
        });
      }

      function lockScroll() {
        if (lenis) { try { lenis.stop(); } catch (e) { } }
        document.documentElement.classList.add('detail-locked');
      }
      function unlockScroll() {
        document.documentElement.classList.remove('detail-locked');
        if (lenis && entered) { try { lenis.start(); } catch (e) { } }
      }

      function openDetail(card: any) {
        if (!overlay || !panel || detailOpen || detailAnimating) return;
        currentCard = card;
        populateDetail(card);
        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('open');
        if (pbody) pbody.scrollTop = 0;
        detailOpen = true;
        lockScroll();
        if (REDUCE || !GS || !FL) { if (pclose) { try { pclose.focus(); } catch (e) { } } return; }
        detailAnimating = true;
        if (pback) GS.fromTo(pback, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'sine.out' });
        try {
          /* snap the panel onto the card, record it, release to fullscreen, then grow */
          FL.fit(panel, card, { scale: false });
          var state = FL.getState(panel);
          GS.set(panel, { clearProps: 'all' });
          FL.from(state, {
            duration: 0.7, ease: 'power3.inOut', absolute: true,
            onComplete: function () { detailAnimating = false; if (pclose) { try { pclose.focus(); } catch (e) { } } }
          });
        } catch (e) {
          detailAnimating = false;
          try { GS.set(panel, { clearProps: 'all' }); } catch (e2) { }
        }
      }

      function closeDetail(after?: any) {
        if (!overlay || !detailOpen) { if (typeof after === 'function') after(); return; }
        if (detailAnimating) return;
        var done = function () {
          overlay.classList.remove('open');
          overlay.setAttribute('aria-hidden', 'true');
          if (panel && GS) { try { GS.set(panel, { clearProps: 'all' }); } catch (e) { } }
          detailOpen = false;
          detailAnimating = false;
          unlockScroll();
          /* return focus to the card, but not when a follow-up scroll is queued
             (refocusing would scroll the card back into view and fight it) */
          if (currentCard && typeof after !== 'function') { try { currentCard.focus(); } catch (e) { } }
          if (typeof after === 'function') after();
        };
        if (REDUCE || !GS || !FL || !currentCard) { done(); return; }
        detailAnimating = true;
        if (pback) GS.to(pback, { opacity: 0, duration: 0.45, ease: 'sine.out' });
        try {
          var state = FL.getState(panel);
          FL.fit(panel, currentCard, { scale: false });
          FL.from(state, { duration: 0.6, ease: 'power3.inOut', absolute: true, onComplete: done });
        } catch (e) { done(); }
      }

      if (overlay) {
        Array.prototype.forEach.call(document.querySelectorAll('#practice .scene-card'), function (card: any) {
          card.addEventListener('click', function () { openDetail(card); });
          card.addEventListener('keydown', function (e: any) {
            if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') { e.preventDefault(); openDetail(card); }
          });
        });
        if (pclose) pclose.addEventListener('click', function () { closeDetail(); });
        if (pback) pback.addEventListener('click', function () { closeDetail(); });
      }
      function onDetailKey(e: any) { if (e.key === 'Escape' && detailOpen) { e.preventDefault(); closeDetail(); } }
      document.addEventListener('keydown', onDetailKey);

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

        /* The thread is born from the corner mark AFTER entry and sits behind the gate
           until then — so it is NOT built at boot. Building it here ran a path-sampling
           pass (getTotalLength + ~600 getPointAtLength) that blocked the main thread right
           as the seal self-draws, which is why the open janked. afterEnter() lays it once
           the ceremony completes; reduced-motion still routes through buildThread there. */
        requestAnimationFrame(function () { navState(); });

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
        document.removeEventListener('keydown', onDetailKey);
        try { document.documentElement.classList.remove('detail-locked'); } catch (e) { }
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
        {/* no SVG blur filters: a filter on the whole-page path / moving token re-rasters
            every scroll frame = jank. The token glows via its layered halo circle (CSS). */}
        <path id="thread-base" className="thread-path" d="" />
        <path id="thread-live" className="thread-path" d="" />
        <g id="token" opacity="0">
          <circle className="halo" cx="0" cy="0" r="10" />
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
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">01</span><span className="tag">Node 01 · AI automation</span></div>
              <h3 className="display">AI automation &amp; agents</h3>
              <p className="line">Agents that do real work across your systems and your own documents — and know when to stop and ask.</p>
              <p className="deliver"><span className="dk mono">What you get</span><span className="dv">Shipped automations with the hours saved measured, secure retrieval that lets your own data answer questions, and a kill switch you hold.</span></p>
              <div className="flex"><span className="pip"></span><span>Runs on hardware you control — by voice, chat, or API</span></div>
              <div className="stack"><span>Orchestration</span><span>Tool use</span><span>On-device</span><span>RAG</span></div>
            </div>
          </div>

          {/* NODE 02 */}
          <div className="scene left" id="node-2">
            <i className="anchor a-right" data-anchor="3" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">02</span><span className="tag">Node 02 · Software</span></div>
              <h3 className="display">Web &amp; app development</h3>
              <p className="line">Software that ships and keeps working — fast, legible, and honest about its state.</p>
              <p className="deliver"><span className="dk mono">What you get</span><span className="dv">A working product in about ninety days, code documented well enough for the next hands, and an interface that holds up long past launch week.</span></p>
              <div className="stack"><span>TypeScript</span><span>Next.js</span><span>Mobile</span><span>Design systems</span></div>
            </div>
          </div>

          {/* NODE 03 */}
          <div className="scene right" id="node-3">
            <i className="anchor a-left" data-anchor="4" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">03</span><span className="tag">Node 03 · Data engineering</span></div>
              <h3 className="display">Data engineering</h3>
              <p className="line">Pipelines you can trust with the truth — clean lineage, honest numbers, contracts that hold.</p>
              <p className="deliver"><span className="dk mono">What you get</span><span className="dv">Tested pipelines with traceable lineage, and the retrieval foundation that lets your own data answer questions without leaking.</span></p>
              <div className="stack"><span>Pipelines</span><span>Warehouse</span><span>Streaming</span><span>Governance</span></div>
            </div>
          </div>

          {/* NODE 04 */}
          <div className="scene left" id="node-4">
            <i className="anchor a-right" data-anchor="5" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">04</span><span className="tag">Node 04 · Cloud / DevOps</span></div>
              <h3 className="display">Cloud &amp; DevOps</h3>
              <p className="line">Infrastructure run as a discipline — reproducible, dependable, and sized to what you actually use.</p>
              <p className="deliver"><span className="dk mono">What you get</span><span className="dv">Reproducible environments, calm deploys, and a cloud bill you can read line by line with the waste already cut.</span></p>
              <div className="stack"><span>GCP</span><span>Terraform</span><span>CI·CD</span><span>Observability</span></div>
            </div>
          </div>

          {/* NODE 05 */}
          <div className="scene right" id="node-5">
            <i className="anchor a-left" data-anchor="6" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">05</span><span className="tag">Node 05 · Security &amp; reliability</span></div>
              <h3 className="display">Security &amp; reliability</h3>
              <p className="line">Security built into everything we deliver, not bolted on after — sane data handling and dependable uptime.</p>
              <p className="deliver"><span className="dk mono">What you get</span><span className="dv">Sensible defaults from the first commit, secrets and access handled with care, and uptime you only notice when it is gone. We make what we build safe by default — we do not pose as your security team.</span></p>
              <div className="stack"><span>Secure by default</span><span>Secrets &amp; access</span><span>Backups</span><span>Uptime</span></div>
            </div>
          </div>
        </section>

        {/* KEEPERS */}
        <section className="band keepers" id="keepers">
          <i className="anchor a-right" data-anchor="7" data-beat="" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx"><span className="node-pip"></span>The Keepers</span>
            <h2 className="display">Four hands<br />on the same line.</h2>
            <p>A small studio on purpose. Each keeper signs their own node. One named engineer owns your work end to end and answers for it directly — no handoff to people you never met.</p>
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
              <p className="bio">Designs agents that act with restraint — automation that knows its limits and asks before it crosses them.</p>
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

        {/* SELECTED WORK — real builds, no client logos */}
        <section className="band work" id="work">
          <i className="anchor a-right" data-anchor="8" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx"><span className="node-pip"></span>Selected work</span>
            <h2 className="display">Things we have<br />actually shipped.</h2>
            <p>Real builds from the team — not client logos, not case-study theatre. The work, named plainly.</p>
          </div>
          <div className="inner work-grid">
            <article className="wcard reveal d1" id="work-parallel-claude">
              <p className="wk-who mono">Tarik</p>
              <h3 className="wk-title display">Parallel-Claude</h3>
              <p className="wk-line">Decompose a goal into a fleet of AI agents working in parallel, then merge their output into one result.</p>
              <div className="stack"><span>Python</span><span>Multi-agent</span><span>CLI</span></div>
            </article>
            <article className="wcard reveal d2" id="work-hyperagent-relay">
              <p className="wk-who mono">Tarik</p>
              <h3 className="wk-title display">HyperAgent Relay</h3>
              <p className="wk-line">Call an AI agent like a normal function — webhook trigger plus a mailbox relay, zero dependencies.</p>
              <div className="stack"><span>Python</span><span>Webhooks</span></div>
            </article>
            <article className="wcard reveal d3" id="work-mostay">
              <p className="wk-who mono">Tarik</p>
              <h3 className="wk-title display">MoStay</h3>
              <p className="wk-line">Website for a boutique hotel in Mostar — fast static Next.js.</p>
              <div className="stack"><span>Next.js</span><span>Static</span></div>
            </article>
            <article className="wcard reveal d1" id="work-cloud-ops">
              <p className="wk-who mono">Eman</p>
              <h3 className="wk-title display">Intelligent Cloud-Ops Agent</h3>
              <p className="wk-line">A LangChain agent that operates and reasons over Google Cloud infrastructure.</p>
              <div className="stack"><span>LangChain</span><span>GCP</span><span>Python</span></div>
            </article>
            <article className="wcard reveal d2" id="work-pipeline">
              <p className="wk-who mono">Eman</p>
              <h3 className="wk-title display">Real-time Serverless Pipeline</h3>
              <p className="wk-line">A streaming, serverless data pipeline on Google Cloud.</p>
              <div className="stack"><span>GCP</span><span>Streaming</span><span>Serverless</span></div>
            </article>
            <article className="wcard reveal d3" id="work-classroom">
              <p className="wk-who mono">Eman</p>
              <h3 className="wk-title display">Classroom 2.0</h3>
              <p className="wk-line">Native Android app: QR attendance, live quizzes, AI explanations, real-time teaching insight.</p>
              <div className="stack"><span>Kotlin</span><span>Compose</span><span>Firebase</span></div>
            </article>
            <article className="wcard reveal d1" id="work-iac">
              <p className="wk-who mono">Eman</p>
              <h3 className="wk-title display">Cloud security &amp; IaC labs</h3>
              <p className="wk-line">Hardening and infrastructure-as-code across GCP: Cloud Armor, KMS, VPC, GKE.</p>
              <div className="stack"><span>Terraform</span><span>GCP</span><span>Security</span></div>
            </article>
            <article className="wcard reveal d2" id="work-dataviz">
              <p className="wk-who mono">Ajdin</p>
              <h3 className="wk-title display">Data visualization &amp; research</h3>
              <p className="wk-line">Exploratory data analysis and visualization in Python, including a Spotify dataset study.</p>
              <div className="stack"><span>Python</span><span>Pandas</span><span>Notebooks</span></div>
            </article>
          </div>
        </section>

        {/* PRINCIPLE — the one emerald breath, the halal ethos */}
        <section id="principle">
          <i className="anchor a-left" data-anchor="8" data-beat="" aria-hidden="true"></i>
          <div className="pgrid">
            <div className="pwrap">
              <p className="p-eyebrow mono reveal"><span className="node-pip"></span>The line we keep</p>
              <blockquote className="reveal">We keep some trusts by <b>refusing others</b> — no riba, no work that betrays the amanah.</blockquote>
              <p className="p-note reveal d1">It is a matter of care, not austerity. The same instinct that makes us guard your data makes us decline the work we would not want held against us.</p>
            </div>
            <aside className="pmark reveal d1" aria-hidden="true">
              <span className="pmark-ar arabic">أمانة</span>
              <span className="pmark-gloss mono">amānah — the trust we keep, or decline</span>
            </aside>
          </div>
        </section>

        {/* PROOF — understated */}
        <section className="band" id="proof">
          <i className="anchor a-right" data-anchor="9" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx">What we hold to</span>
            <h2 className="display">We&apos;d rather show<br />than tell.</h2>
            <p>No vanity metrics. The proof is in what we are willing to refuse, and what we are willing to be held to.</p>
          </div>
          <div className="inner proof-grid">
            <div className="pcard reveal d1">
              <p className="pt mono">Local-first</p>
              <p className="pk display">Yours to unplug.</p>
              <p className="pv">What we build runs on machines you control. Nothing leaves them that you did not send, and no cloud you cannot switch off.</p>
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

        {/* ENGAGEMENT — how we begin: start small, earn the rest */}
        <section className="band" id="begin">
          <i className="anchor a-right" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx"><span className="node-pip"></span>How we begin</span>
            <h2 className="display">Start small.<br />Earn the rest.</h2>
            <p>Trust is given in steps. We prove the work on something small before you commit to the whole build — no retainer, no lock-in.</p>
          </div>
          <div className="inner begin-grid">
            <div className="bcard reveal d1">
              <p className="bstep mono">Step one · The first cut</p>
              <p className="bname display">A simple site, built for real</p>
              <p className="bprice display">€200<small> fixed · one review cycle</small></p>
              <p className="bdesc">We build the first version of a simple website — designed, coded, and live — then take it through one round of your feedback. You hold finished work in your hands before deciding on anything larger.</p>
              <p className="bnote mono">Live site · one revision · yours to keep</p>
            </div>
            <div className="bcard reveal d2">
              <p className="bstep mono">Step two · The full build</p>
              <p className="bname display">Scoped together, once trust is earned</p>
              <p className="bprice display">Quoted plainly<small> after the first cut</small></p>
              <p className="bdesc">When the first cut has earned it, we scope the rest with you — the full site or product, priced line by line. You own the code and the keys; we hand it back whole.</p>
              <p className="bnote mono">You own everything we build</p>
            </div>
          </div>
          <div className="inner begin-cta reveal d1">
            <a className="cta" href="mailto:salam@emanet.ai?subject=The%20first%20cut%20%E2%80%94%20%E2%82%AC200">
              <span className="ar arabic">أمانة</span>
              <span>Begin with the first cut</span>
            </a>
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

      {/* ===== SERVICE DETAIL OVERLAY (a card zooms into this fullscreen panel) ===== */}
      <div className="detail-overlay" id="detailOverlay" role="dialog" aria-modal="true" aria-label="Service detail" aria-hidden="true">
        <div className="detail-backdrop" id="detailBackdrop"></div>
        <div className="detail-panel" id="detailPanel">
          <button className="detail-close" id="detailClose" type="button" aria-label="Close detail"><span aria-hidden="true">&times;</span></button>
          <div className="detail-body" id="detailBody"></div>
        </div>
      </div>
    </>
  );
}
