'use client';
/* Ported verbatim from the single-file source; loose-JS style kept intentionally. */
/* eslint-disable no-var, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';
import { track } from '@vercel/analytics';
import { dict } from './dict';

/* Selected work — rendered twice into the marquee track for a seamless loop. */
const WORKS: { id: string; who: string; title: string; href?: string; i18n: string; line: string; stack: string[] }[] = [
  { id: 'work-parallel-claude', who: 'Tarik', title: 'Parallel-Claude', i18n: 'wl.parallel', line: 'Decompose a goal into a fleet of AI agents working in parallel, then merge their output into one result.', stack: ['Python', 'Multi-agent', 'CLI'] },
  { id: 'work-hyperagent-relay', who: 'Tarik', title: 'HyperAgent Relay', i18n: 'wl.relay', line: 'Call an AI agent like a normal function — webhook trigger plus a mailbox relay, zero dependencies.', stack: ['Python', 'Webhooks'] },
  { id: 'work-mostay', who: 'Tarik', title: 'MoStay', i18n: 'wl.mostay', line: 'Website for a boutique hotel in Mostar — fast static Next.js.', stack: ['Next.js', 'Static'] },
  { id: 'work-servisturbina', who: 'Tarik', title: 'Servis Turbina ↗', href: 'https://servisturbina.ba', i18n: 'wl.servis', line: 'Website, gallery and admin panel for a turbine-repair service — created by Tarik, live in production.', stack: ['Live', 'Admin', 'PHP'] },
  { id: 'work-cloud-ops', who: 'Eman', title: 'Intelligent Cloud-Ops Agent', i18n: 'wl.cloudops', line: 'A LangChain agent that operates and reasons over Google Cloud infrastructure.', stack: ['LangChain', 'GCP', 'Python'] },
  { id: 'work-pipeline', who: 'Eman', title: 'Real-time Serverless Pipeline', i18n: 'wl.pipeline', line: 'A streaming, serverless data pipeline on Google Cloud.', stack: ['GCP', 'Streaming', 'Serverless'] },
  { id: 'work-classroom', who: 'Eman', title: 'Classroom 2.0', i18n: 'wl.classroom', line: 'Native Android app: QR attendance, live quizzes, AI explanations, real-time teaching insight.', stack: ['Kotlin', 'Compose', 'Firebase'] },
  { id: 'work-iac', who: 'Eman', title: 'Cloud security & IaC labs', i18n: 'wl.iac', line: 'Hardening and infrastructure-as-code across GCP: Cloud Armor, KMS, VPC, GKE.', stack: ['Terraform', 'GCP', 'Security'] },
  { id: 'work-dataviz', who: 'Ajdin', title: 'Data visualization & research', i18n: 'wl.dataviz', line: 'Exploratory data analysis and visualization in Python, including a Spotify dataset study.', stack: ['Python', 'Pandas', 'Notebooks'] },
];

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
         i18n — English lives in the JSX (captured at boot); bs/ar come from
         ./dict. Imperative apply matches the rest of this file. On switch we
         re-measure the thread, since text length + dir change the layout the
         path is sampled from. ponytail: capture EN from the DOM instead of
         duplicating it in the dict — English stays the no-JS / SEO fallback.
         ===================================================== */
      var EN_JS: any = {
        'dl.get': 'What you get', 'dl.cost': 'What it costs', 'dl.approach': 'How we approach it',
        'dl.stack': 'Stack', 'dl.example': 'Example from our work',
        'aria.gate': 'Press the seal to be entrusted', 'aria.close': 'Close detail',
        'ft.copy': 'Copy', 'ft.copied': 'Copied ✓',
        'mail.sub.first': 'The first cut — €200',
        'mail.sub.main': 'A trust to place with you',
        'mail.body': 'What we do:\n\nWhat we need first:\n\nRough timing:\n',
      };
      /* one quiet telemetry wrapper — never let analytics break the page */
      function beat(name: string, data?: any) { try { track(name, data); } catch (e) { } }
      var LOCS = ['en', 'bs', 'ar'];
      var curLoc = 'en';
      function T(k: string) {
        if (curLoc !== 'en') {
          var d: any = (dict as any)[curLoc];
          if (d && d.t && d.t[k] != null) return d.t[k];
          /* aria strings live in their own record (unprefixed keys) — without
             this fallback the translated labels were dead data and AT users
             always got English */
          if (d && d.aria && k.indexOf('aria.') === 0 && d.aria[k.slice(5)] != null) return d.aria[k.slice(5)];
        }
        return EN_JS[k];
      }
      function captureOriginals() {
        Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el: any) {
          if (el.__en == null) el.__en = el.innerHTML;
        });
      }
      function applyLocale(loc: string) {
        if (LOCS.indexOf(loc) < 0) loc = 'en';
        curLoc = loc;
        var d: any = loc === 'en' ? null : (dict as any)[loc];
        Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el: any) {
          var k = el.getAttribute('data-i18n');
          var v = loc === 'en' ? el.__en : (d && d.t && d.t[k] != null ? d.t[k] : el.__en);
          if (v != null && el.innerHTML !== v) el.innerHTML = v;
        });
        var html = document.documentElement;
        html.setAttribute('lang', loc);
        html.setAttribute('dir', loc === 'ar' ? 'rtl' : 'ltr');
        var g: any = document.getElementById('gate'); if (g) g.setAttribute('aria-label', T('aria.gate'));
        var c: any = document.getElementById('detailClose'); if (c) c.setAttribute('aria-label', T('aria.close'));
        /* localized subject + a 3-line body template — a blank compose window is
           where mailto conversions die */
        Array.prototype.forEach.call(document.querySelectorAll('a.cta[data-mail]'), function (a: any) {
          var sub = T(a.getAttribute('data-mail') === 'first' ? 'mail.sub.first' : 'mail.sub.main');
          a.setAttribute('href', 'mailto:info@emanet-ai.com?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(T('mail.body')));
        });
        Array.prototype.forEach.call(document.querySelectorAll('.langset .lang'), function (b: any) {
          b.classList.toggle('on', b.getAttribute('data-lang') === loc);
        });
        try { localStorage.setItem('emanet-lang', loc); } catch (e) { }
        /* text + dir changed the layout, so rebuild the thread from the new element
           rects. rebuild() is entry-guarded, so this is a no-op before entry. */
        requestAnimationFrame(function () { try { rebuild(); } catch (e) { } });
      }
      function detailFor(num: string): any {
        var en: any = detailExtra[num] || {};
        if (curLoc !== 'en') {
          var d: any = (dict as any)[curLoc];
          if (d && d.detail && d.detail[num]) {
            return { approach: d.detail[num].approach || en.approach, priceRows: d.detail[num].priceRows || en.priceRows, examples: en.examples };
          }
        }
        return en;
      }
      function detectLoc() {
        var stored: any = null; try { stored = localStorage.getItem('emanet-lang'); } catch (e) { }
        if (stored && LOCS.indexOf(stored) >= 0) return stored;
        var n = (navigator.language || '').toLowerCase();
        if (n.indexOf('ar') === 0) return 'ar';
        if (n.indexOf('bs') === 0) return 'bs';
        return 'en';
      }

      /* =====================================================
         GEOMETRY — an 8-fold circuit medallion in the brand's
         gold. STARLESS BY DESIGN: the earlier khatam weave
         (overlaid squares + sharp {8/3} star) read as occult
         iconography — same complaint as the old {12/5} lattice.
         Now: octagon vault rings + concentric circles + radial
         circuit spokes. The 8 node dots at the outer points
         stay — they drive the corner accretion and are where
         the thread is born, so the count stays at 8.
         ===================================================== */
      var C = 220, R = 150;
      function P(r: number, deg: number) { var a = (deg - 90) * Math.PI / 180; return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) }; }
      function n2(v: number) { return Math.round(v * 100) / 100; }
      function poly(pts: any[]) { return pts.map(function (p: any) { return n2(p.x) + ',' + n2(p.y); }).join(' '); }
      function ringPoly(rad: number, offset: number, count: number) {
        var p = []; for (var j = 0; j < count; j++) { p.push(P(rad, offset + j * (360 / count))); } return poly(p);
      }

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
          s += '<circle cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.72) + '"/>';
          s += '<circle cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.36) + '"/>';
          for (k = 0; k < 8; k++) { var a = P(R, k * 45), b = P(R, k * 45 + 180); s += '<line x1="' + n2(a.x) + '" y1="' + n2(a.y) + '" x2="' + n2(b.x) + '" y2="' + n2(b.y) + '"/>'; }
          s += '</g>';
        }

        /* outer octagon — the vault's silhouette (green) */
        s += '<polygon class="draw fig2" points="' + ringPoly(R, 22.5, 8) + '" pathLength="1"/>';
        /* breathing circle just inside the rim (gold, faint) */
        s += '<circle class="draw fig faint" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.86) + '" pathLength="1"/>';
        /* mid octagon, offset a half-step — petal cells against the rim, no overlap */
        s += '<polygon class="draw fig" points="' + ringPoly(R * 0.72, 0, 8) + '" pathLength="1"/>';
        /* 8 circuit spokes: center ring -> mid ring, on the between-axes */
        for (k = 0; k < 8; k++) {
          var sp = P(R * 0.34, 22.5 + k * 45), ep = P(R * 0.72, 22.5 + k * 45);
          s += '<line class="draw fig faint" x1="' + n2(sp.x) + '" y1="' + n2(sp.y) + '" x2="' + n2(ep.x) + '" y2="' + n2(ep.y) + '" pathLength="1"/>';
        }
        /* kept center: gold ring + green core medallion */
        s += '<circle class="draw fig" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.34) + '" pathLength="1"/>';
        s += '<circle class="draw fig2" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.16) + '" pathLength="1"/>';

        if (traces) {
          s += '<g class="traces">';
          for (k = 0; k < 8; k++) {
            var p = P(R, k * 45), q = P(R + 30, k * 45);
            s += '<line class="trace" x1="' + n2(p.x) + '" y1="' + n2(p.y) + '" x2="' + n2(q.x) + '" y2="' + n2(q.y) + '" pathLength="1"/>';
            s += '<circle class="trace-pad" cx="' + n2(q.x) + '" cy="' + n2(q.y) + '" r="4"/>';
          }
          s += '</g>';
        }

        /* solder-pad node dots at the 8 outer points (drive accretion + thread origin) */
        for (i = 0; i < 8; i++) { var pt = P(R, i * 45); s += '<circle class="node" data-i="' + i + '" cx="' + n2(pt.x) + '" cy="' + n2(pt.y) + '" r="5.5"/>'; }

        s += '</g></svg>';
        return s;
      }

      /* =====================================================
         EMBLEMS — five sibling figures in the seal's vocabulary,
         one per discipline. They fill the empty half of each
         serpentine scene and double as the keepers' marks.
         1 orbits (AI) · 2 frames (web) · 3 lattice (data) ·
         4 compass (cloud) · 5 ward (security)
         ===================================================== */
      function buildEmblem(kind: number) {
        var s = '<svg viewBox="0 0 ' + (2 * C) + ' ' + (2 * C) + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">';
        var i, p;
        if (kind === 1) {          /* orbits — agents circling a kept center */
          s += '<circle class="fig faint" cx="' + C + '" cy="' + C + '" r="' + R + '"/>';
          s += '<circle class="fig2" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.66) + '"/>';
          s += '<circle class="fig" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.35) + '"/>';
          s += '<circle class="node" cx="' + C + '" cy="' + C + '" r="6"/>';
          for (i = 0; i < 8; i++) { p = P(R, i * 45); s += '<circle class="node" cx="' + n2(p.x) + '" cy="' + n2(p.y) + '" r="4"/>'; }
          for (i = 0; i < 4; i++) { p = P(R * 0.66, 45 + i * 90); s += '<circle class="fig2" cx="' + n2(p.x) + '" cy="' + n2(p.y) + '" r="10"/>'; }
        } else if (kind === 2) {   /* frames — telescoping screens */
          s += '<polygon class="fig2" points="' + ringPoly(R, 0, 4) + '"/>';
          s += '<polygon class="fig faint" points="' + ringPoly(R * 0.8, 45, 4) + '"/>';
          s += '<polygon class="fig" points="' + ringPoly(R * 0.62, 0, 4) + '"/>';
          s += '<polygon class="fig2 faint" points="' + ringPoly(R * 0.46, 45, 4) + '"/>';
          s += '<polygon class="fig" points="' + ringPoly(R * 0.3, 0, 4) + '"/>';
          for (i = 0; i < 4; i++) { p = P(R, i * 90); s += '<circle class="node" cx="' + n2(p.x) + '" cy="' + n2(p.y) + '" r="4"/>'; }
        } else if (kind === 3) {   /* lattice — a polar grid: twelve sources, ordered rings.
                                      deliberately starless: the {12/5} star polygon this
                                      replaced read as overlapping triangles (hexagram). */
          s += '<polygon class="fig faint" points="' + ringPoly(R, 15, 12) + '"/>';
          s += '<circle class="fig2" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.62) + '"/>';
          s += '<circle class="fig" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.3) + '"/>';
          for (i = 0; i < 12; i++) {
            var s3 = P(R * 0.3, 15 + i * 30), e3 = P(R, 15 + i * 30);
            s += '<line class="fig faint" x1="' + n2(s3.x) + '" y1="' + n2(s3.y) + '" x2="' + n2(e3.x) + '" y2="' + n2(e3.y) + '"/>';
          }
          for (i = 0; i < 4; i++) {   /* diamond data-cells where the mid ring meets the axes */
            var d3 = P(R * 0.62, 15 + i * 90);
            s += '<rect class="fig2" x="' + n2(d3.x - 7) + '" y="' + n2(d3.y - 7) + '" width="14" height="14" transform="rotate(45 ' + n2(d3.x) + ' ' + n2(d3.y) + ')"/>';
          }
          for (i = 0; i < 12; i++) { p = P(R, 15 + i * 30); s += '<circle class="node" cx="' + n2(p.x) + '" cy="' + n2(p.y) + '" r="3.4"/>'; }
        } else if (kind === 4) {   /* compass — spokes reaching out, pads at the ends */
          s += '<polygon class="fig" points="' + ringPoly(R * 0.85, 22.5, 8) + '"/>';
          s += '<circle class="fig2" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.55) + '"/>';
          s += '<circle class="fig2" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.2) + '"/>';  /* hub — starless */
          for (i = 0; i < 8; i++) {
            var a = P(R * 0.32, i * 45), b = P(R + 18, i * 45);
            s += '<line class="fig faint" x1="' + n2(a.x) + '" y1="' + n2(a.y) + '" x2="' + n2(b.x) + '" y2="' + n2(b.y) + '"/>';
            s += '<circle class="node" cx="' + n2(b.x) + '" cy="' + n2(b.y) + '" r="4"/>';
          }
        } else {                   /* ward — rings of the vault, closed around the core */
          s += '<polygon class="fig2" points="' + ringPoly(R, 22.5, 8) + '"/>';
          s += '<polygon class="fig" points="' + ringPoly(R * 0.8, 0, 8) + '"/>';
          s += '<polygon class="fig2 faint" points="' + ringPoly(R * 0.62, 22.5, 8) + '"/>';
          s += '<polygon class="fig" points="' + ringPoly(R * 0.45, 0, 8) + '"/>';
          s += '<circle class="fig2" cx="' + C + '" cy="' + C + '" r="' + n2(R * 0.24) + '"/>';  /* core — starless */
          for (i = 0; i < 8; i++) { p = P(R, 22.5 + i * 45); s += '<circle class="node" cx="' + n2(p.x) + '" cy="' + n2(p.y) + '" r="4"/>'; }
        }
        s += '</svg>';
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

      /* keepers get role-matched emblems: data→lattice, AI→orbits, devops→compass, full-stack→frames */
      var KEEPER_EMBLEMS = [3, 1, 4, 2];
      Array.prototype.forEach.call(document.querySelectorAll('.keeper .av'), function (av: any, i: number) {
        av.innerHTML = buildEmblem(KEEPER_EMBLEMS[i] || 1);
      });

      /* each scene's empty half carries its discipline's emblem, faint under the thread */
      Array.prototype.forEach.call(document.querySelectorAll('#practice .scene'), function (sc: any, i: number) {
        var em = document.createElement('div');
        em.className = 'scene-emblem' + (i % 2 ? ' ccw' : '');
        em.setAttribute('aria-hidden', 'true');
        em.innerHTML = buildEmblem(i + 1);
        sc.appendChild(em);
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

        /* mobile: the serpentine collapses to a vertical line; the corner node sits
           ~38px in, right over the text. Pin the origin + loop-close to the same thin
           rail the anchors use (8px from the leading edge) so the thread stays in the
           margin, not through the copy. dir-aware so RTL rails on the right. */
        if (W <= 900) { startX = (document.documentElement.getAttribute('dir') === 'rtl') ? (W - 8) : 8; }

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

      /* how much of the line to draw so its tip sits where the READER is. The path's y
         grows along its length, so we find the L whose y matches the viewport — the line
         then follows you down the page (not racing ahead, not lagging). */
      function drawnForViewport() {
        var n = sampleTable.length;
        if (n === 0 || liveLen <= 0) return 0;
        var targetY = scrollY() + window.innerHeight * 0.6;
        if (targetY <= sampleTable[0].y) return 0;
        if (targetY >= sampleTable[n - 1].y) return liveLen;
        for (var i = 1; i < n; i++) {
          if (sampleTable[i].y >= targetY) {
            var a2 = sampleTable[i - 1], b2 = sampleTable[i];
            var t2 = (targetY - a2.y) / Math.max(0.001, b2.y - a2.y);
            return a2.L + (b2.L - a2.L) * t2;
          }
        }
        return liveLen;
      }

      function updateThread() {
        if (REDUCE) return;
        if (liveLen <= 0) return;
        var raw = Math.min(1, Math.max(0, scrollY() / maxScroll()));
        /* draw the line down to where the reader is — the tip tracks the viewport so the
           line follows you. (scroll%→path% was wrong: path length isn't linear with page
           height, so the tip drifted far ahead of / behind the reader.) */
        var drawn = drawnForViewport();

        /* draw the live trace from the corner downward */
        live.style.strokeDashoffset = (liveLen - drawn);

        /* carry the token at the drawn tip — read the precomputed table, not
           getPointAtLength (that synchronous path-walk every frame was the jank). */
        if (token && sampleTable.length) {
          var p = sampleAt(Math.min(drawn, liveLen - 0.5));
          token.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ')');
          token.setAttribute('opacity', raw > 0.004 ? '1' : '0');
        }

        /* hand the token to each node as it arrives -> ignite */
        for (var i = 0; i < anchorLens.length; i++) {
          if (drawn >= anchorLens[i] - 4 && !fired[i]) fireAnchor(i);
        }

        /* the board powers on as the loop closes (real scroll, not the boosted draw) */
        if (raw > 0.97) powerOn();

        /* fade the cue once the line is being followed */
        if (hint) { hint.style.opacity = raw > 0.03 ? '0' : '1'; }
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
        /* Reveal the seal as ONE GPU-composited layer (opacity + scale on #sealStage),
           NOT by animating strokeDashoffset per path. A strokeDashoffset tween re-rasters
           the whole SVG every frame; that's free at DPR 1 (headless looked smooth) but
           fill-rate murder on a real phone/Retina screen, where raster cost scales with
           DPR^2 — THIS was the "laggy on everything" open. A transform/opacity reveal is
           composited, so it's smooth at any DPR (the entry ceremony scales the same way).
           The figure strokes are shown statically and bloom in with the stage. */
        GS.set('#sealStage .draw, #sealStage .trace', { strokeDasharray: 'none', strokeDashoffset: 0, opacity: 1 });
        GS.set('#sealStage .node', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
        GS.set('#sealStage .trace-pad', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
        GS.set('#sealStage .guides', { opacity: 0 });
        GS.set('#sealStage', { opacity: 0, scale: 0.9, transformOrigin: '50% 50%', willChange: 'transform, opacity' });
        GS.set('.hero-eyebrow, .hero-arabic, .hero-hint, .hero-pitch', { opacity: 0, y: 10 });

        var tl = GS.timeline({ delay: 0.3, onComplete: function () { try { GS.set('#sealStage', { clearProps: 'willChange' }); } catch (e) { } } });
        tl.to('.hero-eyebrow', { opacity: .82, y: 0, duration: 1.0, ease: 'power2.out' });
        tl.to('#sealStage', { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }, '-=0.75');
        tl.to('#sealStage .guides', { opacity: .10, duration: 1.2, ease: 'sine.out' }, '-=1.15');
        tl.to('#sealStage .node', { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(2)' }, '-=0.6');
        tl.to('#sealStage .trace-pad', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, '-=0.35');
        tl.to('.hero-arabic', { opacity: .62, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.5');
        tl.to('.hero-hint', { opacity: .34, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.7');
        tl.to('.hero-pitch', { opacity: .6, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.75');
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
        /* remember the ceremony was seen so a reload mid-visit doesn't lock the
           visitor out again (session-scoped: a fresh visit still gets the seal) */
        try { sessionStorage.setItem('emanet-entered', '1'); } catch (e) { }

        document.documentElement.classList.remove('gated');
        document.body.classList.add('entered');
        if (lenis) { try { lenis.start(); } catch (e) { } }
        if (cursor) { cursor.classList.remove('on'); cursor.style.opacity = '0'; }
        if (corner) corner.classList.add('show');   /* the shrunk seal takes the corner */

        var gate: any = document.getElementById('gate');

        beat('gate_enter');

        if (GS && !REDUCE) {
          try { GS.killTweensOf('#sealStage'); } catch (e) { }   /* clear any live press tween */
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

      /* bind the press — and the gestures people actually try first. A locked
         full-screen gate that ignores scrolling reads as a broken page, so the
         instinctive wheel-spin / swipe / keypress opens it too. */
      function gateAdvance() { if (!entered) enter(); }
      function onGateKey(e: any) {
        if (entered) return;
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); enter(); }
      }
      window.addEventListener('wheel', gateAdvance, { passive: true });
      window.addEventListener('touchmove', gateAdvance, { passive: true });
      var gateEl = document.getElementById('gate');
      if (gateEl) {
        gateEl.addEventListener('click', enter);
        gateEl.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') { e.preventDefault(); enter(); }
        });
        /* keys open the gate without focusing it (autofocus painted a permanent
           :focus-visible ring around the first screen) */
        window.addEventListener('keydown', onGateKey);
        /* tactile press: the seal gives slightly under the pointer before opening */
        if (GS && !REDUCE) {
          var pressDown = function () { if (!entered) GS.to('#sealStage', { scale: 0.965, duration: 0.18, ease: 'power2.out' }); };
          var pressUp = function () { if (!entered) GS.to('#sealStage', { scale: 1, duration: 0.35, ease: 'power2.out' }); };
          gateEl.addEventListener('mousedown', pressDown);
          gateEl.addEventListener('touchstart', pressDown, { passive: true });
          gateEl.addEventListener('mouseup', pressUp);
          gateEl.addEventListener('mouseleave', pressUp);
          gateEl.addEventListener('touchend', pressUp);
        }
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
          approach: 'We start by finding the handful of tasks actually worth automating — the repetitive ones eating your team’s time — not everything we could. Each assistant gets only the access it needs, keeps a record of what it did, and a limit it must respect. Your own documents stay where they are; nothing is copied somewhere you cannot see.',
          priceRows: [['First working version', '€200'], ['Full build', 'quoted by tasks & tools'], ['Running & upkeep', 'from €10 / mo']],
          examples: [{ t: 'Parallel-Claude', id: 'work-parallel-claude' }, { t: 'HyperAgent Relay', id: 'work-hyperagent-relay' }]
        },
        '02': {
          approach: 'We get a small working version in front of you early and grow it in the open, so you are never waiting months for a big reveal. We build it cleanly so the next person can pick it up — not just to scrape by today. And we stay honest about what is done, what is rough, and what is still a guess.',
          priceRows: [['First version · 1 review', '€200'], ['Full site / app', 'quoted by polish & features'], ['Hosting & maintenance', 'from €10 / mo']],
          examples: [{ t: 'MoStay', id: 'work-mostay' }, { t: 'Classroom 2.0', id: 'work-classroom' }]
        },
        '03': {
          approach: 'We treat your numbers like something you will have to stand behind, so they are traceable and tested from the start. The plumbing is built to fail loudly and recover quietly. And the same care keeps your data safe to use without it leaking where it should not.',
          priceRows: [['Starter', 'from €200'], ['Full build', 'quoted by data volume & sources'], ['Upkeep & monitoring', 'from €10 / mo']],
          examples: [{ t: 'Real-time Serverless Pipeline', id: 'work-pipeline' }, { t: 'Data visualization & research', id: 'work-dataviz' }]
        },
        '04': {
          approach: 'Everything is written down as code, so your setup can be rebuilt instead of living in one person’s head. Updates are meant to be boring — no drama. We size things to what you actually use and read the bill with you, line by line.',
          priceRows: [['Setup', 'quoted by size'], ['Ongoing management', 'from €10 / mo']],
          examples: [{ t: 'Intelligent Cloud-Ops Agent', id: 'work-cloud-ops' }, { t: 'Cloud security & IaC labs', id: 'work-iac' }]
        },
        '05': {
          approach: 'We build safety in from the very first day, not as a check we schedule for the end. Passwords and access are handled carefully, backups are tested, and staying online is something you only think about when it is gone. We make what we build safe by default — we are not pretending to be your security team.',
          priceRows: [['Security', 'built into the build'], ['Monitoring & backups', 'from €10 / mo']],
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
        var ex = detailFor(num) || { approach: '', examples: [] };
        var exHtml = (ex.examples || []).map(function (e: any) { return '<a class="detail-ex" href="#' + e.id + '">' + e.t + '</a>'; }).join('');
        beat('detail_open', { node: num });
        pbody.innerHTML =
          /* the discipline's emblem watermarks its own deed */
          '<div class="detail-mark" aria-hidden="true">' + buildEmblem(parseInt(num, 10) || 1) + '</div>' +
          '<p class="detail-tag mono">' + tag + '</p>' +
          '<h2 class="detail-title display" id="detailTitle">' + title + '</h2>' +
          '<p class="detail-line">' + line + '</p>' +
          '<div class="detail-block"><p class="detail-k mono">' + T('dl.get') + '</p><p class="detail-p">' + deliver + '</p></div>' +
          (ex.priceRows ? '<div class="detail-block detail-price"><p class="detail-k mono">' + T('dl.cost') + '</p><div class="detail-prices">' + ex.priceRows.map(function (r: any) { return '<div class="prow"><span class="pl">' + r[0] + '</span><span class="pa">' + r[1] + '</span></div>'; }).join('') + '</div></div>' : '') +
          '<div class="detail-block"><p class="detail-k mono">' + T('dl.approach') + '</p><p class="detail-p">' + ex.approach + '</p></div>' +
          '<div class="detail-block"><p class="detail-k mono">' + T('dl.stack') + '</p><div class="stack">' + stackHtml + '</div></div>' +
          (exHtml ? '<div class="detail-block"><p class="detail-k mono">' + T('dl.example') + '</p><div class="detail-ex-row">' + exHtml + '</div></div>' : '');
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
      function focusablesIn() {
        if (!panel) return [];
        return Array.prototype.slice.call(panel.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'
        )).filter(function (el: any) { return el.offsetParent !== null; });
      }
      function onDetailKey(e: any) {
        if (!detailOpen) return;
        if (e.key === 'Escape') { e.preventDefault(); closeDetail(); return; }
        if (e.key === 'Tab') {
          /* trap focus inside the open dialog (WCAG 2.1.2) */
          var f = focusablesIn();
          if (!f.length) return;
          var first = f[0], last = f[f.length - 1], a: any = document.activeElement;
          var inside = panel && panel.contains(a);
          if (e.shiftKey && (a === first || !inside)) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && (a === last || !inside)) { e.preventDefault(); first.focus(); }
        }
      }
      document.addEventListener('keydown', onDetailKey);

      /* ---------- copy email (mailto silently fails on machines with no mail
         client configured — the click "does nothing" and reads as broken).
         Class-based: one button beside each CTA. ---------- */
      var copyTimers: any[] = [];
      Array.prototype.forEach.call(document.querySelectorAll('.copy-email'), function (copyBtn: any, ci: number) {
        copyBtn.addEventListener('click', function () {
          var done = function () {
            copyBtn.innerHTML = T('ft.copied');
            copyBtn.classList.add('did');
            clearTimeout(copyTimers[ci]);
            copyTimers[ci] = setTimeout(function () { copyBtn.innerHTML = T('ft.copy'); copyBtn.classList.remove('did'); }, 1800);
          };
          beat('copy_email');
          try { navigator.clipboard.writeText('info@emanet-ai.com').then(done, function () { }); } catch (e) { }
        });
      });

      /* ---------- CTA click telemetry + magnetic pull (pointer:fine only) ---------- */
      Array.prototype.forEach.call(document.querySelectorAll('a.cta[data-mail]'), function (a: any) {
        a.addEventListener('click', function () { beat('cta_click', { which: a.getAttribute('data-mail') }); });
      });
      if (!REDUCE && window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
        Array.prototype.forEach.call(document.querySelectorAll('a.cta'), function (el: any) {
          el.classList.add('magnet');
          el.addEventListener('mousemove', function (e: any) {
            var r = el.getBoundingClientRect();
            var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
            el.style.transition = 'none';
            el.style.transform = 'translate(' + (dx * 0.12).toFixed(1) + 'px,' + (dy * 0.22).toFixed(1) + 'px)';
          });
          el.addEventListener('mouseleave', function () {
            el.style.transition = 'transform .4s cubic-bezier(.16,.84,.34,1)';
            el.style.transform = '';
          });
        });
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
        /* capture English from the DOM, then apply the stored/detected locale
           BEFORE the reveal/entry timeline reads any text (entry samples the
           headline's .w spans, which differ per language). */
        captureOriginals();
        applyLocale(detectLoc());
        Array.prototype.forEach.call(document.querySelectorAll('.langset .lang'), function (b: any) {
          b.addEventListener('click', function () { applyLocale(b.getAttribute('data-lang')); });
        });

        setupReveals();

        /* returning mid-session (reload, back-button): don't re-lock the page
           behind the ceremony — pass straight through after a beat. */
        var seenGate: any = null;
        try { seenGate = sessionStorage.getItem('emanet-entered'); } catch (e) { }
        if (seenGate) { setTimeout(enter, 350); }
        else { introDraw(); }

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
        copyTimers.forEach(function (t: any) { clearTimeout(t); });
        window.removeEventListener('scroll', onScrollWin);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('load', rebuild);
        window.removeEventListener('wheel', gateAdvance);
        window.removeEventListener('touchmove', gateAdvance);
        window.removeEventListener('keydown', onGateKey);
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
          <circle className="halo" cx="0" cy="0" r="14" />
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
          <p className="hero-eyebrow mono" data-i18n="gate.eyebrow">AMANAH — A TRUST HELD IN SAFEKEEPING</p>
          <div className="seal-stage" id="sealStage">
            <div className="gate-half left"><div className="svg-wrap" id="wrapL"></div></div>
            <div className="gate-half right"><div className="svg-wrap" id="wrapR"></div></div>
            <div className="seam"></div>
          </div>
          <p className="hero-arabic arabic" lang="ar">أمانة</p>
          <p className="hero-hint mono" data-i18n="gate.hint">press the seal — or just scroll</p>
          <p className="hero-pitch mono" data-i18n="gate.pitch">A four-person studio — AI automation, apps &amp; websites, data. First build €200.</p>
        </div>
        <div className="cursor mono" id="cursor"><span data-i18n="gate.cursor">press to be entrusted</span></div>
      </div>

      {/* ===== INTERIOR (the journey the thread routes through) ===== */}
      <a className="skip-link mono" href="#threshold">Skip to content</a>
      <div className="shell">

        <header className="topbar" id="topbar">
          <nav className="topnav">
            <a href="#practice" data-i18n="nav.practice">The Practice</a>
            <a href="#keepers" data-i18n="nav.keepers">The Keepers</a>
            <a href="#begin" data-i18n="nav.pricing">Pricing</a>
            <a href="#contact" className="nav-contact" data-i18n="nav.contact">Contact</a>
          </nav>
          <div className="langset" role="group" aria-label="Language">
            <button type="button" className="lang on" data-lang="en" lang="en">EN</button>
            <button type="button" className="lang" data-lang="bs" lang="bs">BS</button>
            <button type="button" className="lang" data-lang="ar" lang="ar">AR</button>
          </div>
        </header>

        {/* THRESHOLD */}
        <section id="threshold">
          <i className="anchor a-right" data-anchor="1" data-beat="" aria-hidden="true"></i>
          <div className="wrap">
            <div className="threshold-grid">
              <div>
                <p className="threshold-sub mono"><span className="node-pip"></span><span data-i18n="th.sub">NODE 00 · THE AMANAH</span></p>
                <h1 className="display threshold-h" data-i18n="th.h">
                  <span className="ln"><span className="w">We</span> <span className="w">hold</span> <span className="w">your</span></span>
                  <span className="ln"><span className="w">technology</span></span>
                  <span className="ln"><span className="w">in</span> <span className="w w-gold">trust.</span></span>
                </h1>
                <p className="threshold-thesis reveal" data-i18n="th.thesis"><b>Stop shipping broken AI features.</b> We build rock-solid agents and seamless integrations you can actually trust in production.</p>
              </div>
              <div className="threshold-side reveal">
                <p data-i18n="th.side">Amanah (<span className="arabic" lang="ar">أمانة</span>) is a trust placed in your keeping, to be returned whole. We build software the same way — what you hand us, we look after, and hand back intact.</p>
              </div>
            </div>
          </div>
          <div className="scrollcue mono" id="scrollcue"><span className="cue-dot"></span><span className="cue-line"></span><span data-i18n="th.cue">follow the line</span></div>
        </section>

        {/* PRACTICE — five service nodes */}
        <section className="band practice" id="practice">
          <div className="inner section-head reveal">
            <span className="idx" data-i18n="pr.idx">The Practice</span>
            <h2 className="display" data-i18n="pr.h">Five disciplines,<br />carried on one thread.</h2>
            <p data-i18n="pr.p">In plain words: we build the websites, apps, AI tools, and behind-the-scenes systems your business runs on — and look after them once they are live. Each one below is a kind of work we take on.</p>
          </div>

          {/* NODE 01 */}
          <div className="scene right" id="node-1">
            <i className="anchor a-left" data-anchor="2" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">01</span><span className="tag" data-i18n="n1.tag">Node 01 · AI automation</span></div>
              <h3 className="display" data-i18n="n1.h">AI automation &amp; agents</h3>
              <p className="line" data-i18n="n1.line">Smart assistants that take over the repetitive work in your business — answering routine questions, moving information between your tools, sorting and drafting — and that know when to stop and check with you.</p>
              <p className="deliver"><span className="dk mono" data-i18n="label.get">What you get</span><span className="dv" data-i18n="n1.dv">The boring, repeated tasks handled for you, the hours you save actually counted, and a simple off-switch you control.</span></p>
              <div className="flex"><span className="pip"></span><span data-i18n="n1.flex">Runs on hardware you control — by voice, chat, or API</span></div>
              <div className="stack"><span>Orchestration</span><span>Tool use</span><span>On-device</span><span>RAG</span></div>
            </div>
          </div>

          {/* NODE 02 */}
          <div className="scene left" id="node-2">
            <i className="anchor a-right" data-anchor="3" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">02</span><span className="tag" data-i18n="n2.tag">Node 02 · Software</span></div>
              <h3 className="display" data-i18n="n2.h">Web &amp; app development</h3>
              <p className="line" data-i18n="n2.line">We build your website or app — the thing your customers actually see and use — and make sure it is fast, easy to use, and still working long after launch.</p>
              <p className="deliver"><span className="dk mono" data-i18n="label.get">What you get</span><span className="dv" data-i18n="n2.dv">A finished website or app — usually in about three months — that looks right, works on phones, and is built to last, not just to launch.</span></p>
              <div className="stack"><span>TypeScript</span><span>Next.js</span><span>Mobile</span><span>Design systems</span></div>
            </div>
          </div>

          {/* NODE 03 */}
          <div className="scene right" id="node-3">
            <i className="anchor a-left" data-anchor="4" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">03</span><span className="tag" data-i18n="n3.tag">Node 03 · Data engineering</span></div>
              <h3 className="display" data-i18n="n3.h">Data engineering</h3>
              <p className="line" data-i18n="n3.line">We get your scattered information into one tidy, trustworthy place — so the numbers you make decisions on are actually right.</p>
              <p className="deliver"><span className="dk mono" data-i18n="label.get">What you get</span><span className="dv" data-i18n="n3.dv">Reports and dashboards you can trust, with the messy data cleaned up and organised behind them — and kept private.</span></p>
              <div className="stack"><span>Pipelines</span><span>Warehouse</span><span>Streaming</span><span>Governance</span></div>
            </div>
          </div>

          {/* NODE 04 */}
          <div className="scene left" id="node-4">
            <i className="anchor a-right" data-anchor="5" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">04</span><span className="tag" data-i18n="n4.tag">Node 04 · Cloud / DevOps</span></div>
              <h3 className="display" data-i18n="n4.h">Cloud &amp; DevOps</h3>
              <p className="line" data-i18n="n4.line">We set up and look after the place your software lives online — so it stays up, runs fast, and does not hand you a surprise bill.</p>
              <p className="deliver"><span className="dk mono" data-i18n="label.get">What you get</span><span className="dv" data-i18n="n4.dv">Your software running reliably online, updates that go out without drama, and a monthly bill you can actually read.</span></p>
              <div className="stack"><span>GCP</span><span>Terraform</span><span>CI·CD</span><span>Observability</span></div>
            </div>
          </div>

          {/* NODE 05 */}
          <div className="scene right" id="node-5">
            <i className="anchor a-left" data-anchor="6" data-beat="" aria-hidden="true"></i>
            <div className="scene-card reveal" role="button" tabIndex={0} aria-haspopup="dialog">
              <div className="nlabel"><span className="node-pip"></span><span className="num">05</span><span className="tag" data-i18n="n5.tag">Node 05 · Security &amp; reliability</span></div>
              <h3 className="display" data-i18n="n5.h">Security &amp; reliability</h3>
              <p className="line" data-i18n="n5.line">We keep what we build safe and online — your data protected, your logins locked down, and your site up when customers need it.</p>
              <p className="deliver"><span className="dk mono" data-i18n="label.get">What you get</span><span className="dv" data-i18n="n5.dv">Protection built in from day one, your passwords and access handled properly, and backups that are actually tested. We make what we build safe by default — we do not pose as your security team.</span></p>
              <div className="stack"><span>Secure by default</span><span>Secrets &amp; access</span><span>Backups</span><span>Uptime</span></div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK — real builds, no client logos */}
        <section className="band work" id="work">
          <i className="anchor a-right" data-anchor="8" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx"><span className="node-pip"></span><span data-i18n="wo.idx">Selected work</span></span>
            <h2 className="display" data-i18n="wo.h">Things we have<br />actually shipped.</h2>
            <p data-i18n="wo.p">Real builds from the team — not client logos, not case-study theatre. The work, named plainly.</p>
          </div>
          <div className="work-rail reveal" aria-label="Project gallery">
            <div className="work-track">
              {[false, true].map((dup) =>
                WORKS.map((w) => (
                  <article
                    className="wcard"
                    key={w.id + (dup ? '-dup' : '')}
                    id={dup ? undefined : w.id}
                    aria-hidden={dup || undefined}
                  >
                    <p className="wk-who mono">{w.who}</p>
                    <h3 className="wk-title display">
                      {w.href
                        ? <a className="wk-link" href={w.href} target="_blank" rel="noopener noreferrer" tabIndex={dup ? -1 : undefined}>{w.title}</a>
                        : w.title}
                    </h3>
                    <p className="wk-line" data-i18n={w.i18n}>{w.line}</p>
                    <div className="stack">{w.stack.map((s) => <span key={s}>{s}</span>)}</div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        {/* KEEPERS — after the work: first the proof, then the hands it came from */}
        <section className="band keepers" id="keepers">
          <i className="anchor a-left" data-anchor="7" data-beat="" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx"><span className="node-pip"></span><span data-i18n="ke.idx">The Keepers</span></span>
            <h2 className="display" data-i18n="ke.h">Four hands<br />on the same line.</h2>
            <p data-i18n="ke.p">A small studio on purpose. Each keeper signs their own node. One named engineer owns your work end to end and answers for it directly — no handoff to people you never met.</p>
          </div>
          <div className="inner grid" id="keeper-grid">
            <div className="keeper reveal d1">
              <div className="av"></div>
              <h3 className="kname"><a className="k-link" href="https://www.linkedin.com/in/ajdin-salihovic/" target="_blank" rel="noopener noreferrer">Ajdin Salihović</a></h3>
              <p className="role" data-i18n="role.data">Data Engineer</p>
              <p className="bio" data-i18n="bio.ajdin">Builds the pipelines and contracts the rest of us stand on.</p>
            </div>
            <div className="keeper reveal d2">
              <div className="av"></div>
              <h3 className="kname"><a className="k-link" href="https://www.linkedin.com/in/tarik-topalovic-a83770263/" target="_blank" rel="noopener noreferrer">Tarik Topalović</a></h3>
              <p className="role" data-i18n="role.ai">AI Automation Engineer</p>
              <p className="bio" data-i18n="bio.tarik">Designs agents that act with restraint — automation that knows its limits and asks before it crosses them.</p>
            </div>
            <div className="keeper reveal d3">
              <div className="av"></div>
              <h3 className="kname"><a className="k-link" href="https://www.linkedin.com/in/eman-cickusic/" target="_blank" rel="noopener noreferrer">Eman Čičkušić</a></h3>
              <p className="role" data-i18n="role.devops">DevOps Engineer</p>
              <p className="bio" data-i18n="bio.eman">Keeps the deploys boring and the lights on.</p>
            </div>
            <div className="keeper reveal d1">
              <div className="av"></div>
              <h3 className="kname"><a className="k-link" href="https://www.linkedin.com/in/aner-atovic-55830522a/" target="_blank" rel="noopener noreferrer">Aner Atović</a></h3>
              <p className="role" data-i18n="role.fullstack">Full-Stack Engineer</p>
              <p className="bio" data-i18n="bio.aner">From schema to screen — the whole stack, held together.</p>
            </div>
          </div>
        </section>

        {/* PRINCIPLE — the one emerald breath, the halal ethos */}
        <section id="principle">
          <i className="anchor a-right" data-anchor="8" data-beat="" aria-hidden="true"></i>
          <div className="pgrid">
            <div className="pwrap">
              <p className="p-eyebrow mono reveal"><span className="node-pip"></span><span data-i18n="pn.eyebrow">The line we keep</span></p>
              <blockquote className="reveal" data-i18n="pn.quote">We take on what we can do <b>honestly and well</b> — and we are straight with you about the rest.</blockquote>
              <p className="p-note reveal d1" data-i18n="pn.note">It is a matter of care, not rules. The same instinct that makes us guard your data keeps us honest about the work — and quick to tell you, one to one, if we are not the right hands for it.</p>
            </div>
            <aside className="pmark reveal d1" aria-hidden="true">
              <span className="pmark-ar arabic" lang="ar">أمانة</span>
              <span className="pmark-gloss mono" data-i18n="pn.gloss">amānah — a trust kept safe, and handed back whole</span>
            </aside>
          </div>
        </section>

        {/* PROOF — understated */}
        <section className="band" id="proof">
          <i className="anchor a-left" data-anchor="9" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx" data-i18n="pf.idx">What we hold to</span>
            <h2 className="display" data-i18n="pf.h">We&apos;d rather show<br />than tell.</h2>
            <p data-i18n="pf.p">No vanity metrics. The proof is in what we are willing to refuse, and what we are willing to be held to.</p>
          </div>
          <div className="inner proof-grid">
            <div className="pcard reveal d1">
              <p className="pt mono" data-i18n="pf.t1">Local-first</p>
              <p className="pk display" data-i18n="pf.k1">Yours to unplug.</p>
              <p className="pv" data-i18n="pf.v1">What we build runs on machines you control. Nothing leaves them that you did not send, and no cloud you cannot switch off.</p>
            </div>
            <div className="pcard reveal d2">
              <p className="pt mono" data-i18n="pf.t2">Read the source</p>
              <p className="pk display" data-i18n="pf.k2">Written to be audited.</p>
              <p className="pv" data-i18n="pf.v2">Code legible enough to inherit, documented enough to trust, and handed on intact.</p>
            </div>
            <div className="pcard reveal d3">
              <p className="pt mono" data-i18n="pf.t3">Kept, not rented</p>
              <p className="pk display" data-i18n="pf.k3">You own the keys.</p>
              <p className="pv" data-i18n="pf.v3">Infrastructure you hold and dependencies you can remove. No lock-in dressed up as a feature.</p>
            </div>
          </div>
        </section>

        {/* ENGAGEMENT — how we begin: start small, earn the rest */}
        <section className="band" id="begin">
          <i className="anchor a-right" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx"><span className="node-pip"></span><span data-i18n="bg.idx">How we begin</span></span>
            <h2 className="display" data-i18n="bg.h">Start small.<br />Earn the rest.</h2>
            <p data-i18n="bg.p">Trust is given in steps. We prove the work on something small before you commit to the whole build — no retainer, no lock-in.</p>
          </div>
          <div className="inner begin-grid">
            <div className="bcard reveal d1">
              <p className="bstep mono" data-i18n="bg.step1">Step one · The first cut</p>
              <p className="bname display" data-i18n="bg.name1">A simple site, built for real</p>
              <p className="bprice display" data-i18n="bg.price1">€200<small> fixed · one review cycle</small></p>
              <p className="bdesc" data-i18n="bg.desc1">We build the first version of a simple website — designed, coded, and live — then take it through one round of your feedback. You hold finished work in your hands before deciding on anything larger.</p>
              <p className="bnote mono" data-i18n="bg.note1">Live site · one revision · yours to keep</p>
            </div>
            <div className="bcard reveal d2">
              <p className="bstep mono" data-i18n="bg.step2">Step two · The full build</p>
              <p className="bname display" data-i18n="bg.name2">Scoped together, once trust is earned</p>
              <p className="bprice display" data-i18n="bg.price2">Quoted plainly<small> after the first cut</small></p>
              <p className="bdesc" data-i18n="bg.desc2">When the first cut has earned it, we scope the rest with you — the full site or product, priced line by line. You own the code and the keys; we hand it back whole.</p>
              <p className="bnote mono" data-i18n="bg.note2">You own everything we build</p>
            </div>
          </div>
          <div className="inner begin-cta reveal d1">
            <a className="cta" data-mail="first" href="mailto:info@emanet-ai.com?subject=The%20first%20cut%20%E2%80%94%20%E2%82%AC200">
              <span className="ar arabic" aria-hidden="true">أمانة</span>
              <span data-i18n="bg.cta">Begin with the first cut</span>
            </a>
            <p className="cta-fallback"><span data-i18n="ft.fallback">or email <a href="mailto:info@emanet-ai.com">info@emanet-ai.com</a></span> <button className="copy-email mono" type="button" data-i18n="ft.copy">Copy</button></p>
            <p className="cta-assure mono" data-i18n="bg.assure">First reply within a day — no obligation.</p>
          </div>
        </section>

        {/* FAQ — the fears, answered plainly (native disclosure, hairline style) */}
        <section className="band" id="faq">
          <i className="anchor a-left" aria-hidden="true"></i>
          <div className="inner section-head reveal">
            <span className="idx"><span className="node-pip"></span><span data-i18n="faq.idx">Questions</span></span>
            <h2 className="display" data-i18n="faq.h">Asked plainly,<br />answered plainly.</h2>
            <p data-i18n="faq.p">The things people actually want to know before they write.</p>
          </div>
          <div className="inner faq-list">
            <details className="faq-item reveal">
              <summary><span className="faq-q display" data-i18n="faq.q1">Who owns the code?</span><span className="faq-x" aria-hidden="true">+</span></summary>
              <p className="faq-a" data-i18n="faq.a1">You do — from the first commit. Repositories, keys and accounts are set up in your name and handed back whole. If we ever part ways, everything keeps working without us.</p>
            </details>
            <details className="faq-item reveal">
              <summary><span className="faq-q display" data-i18n="faq.q2">What if I don&apos;t like the first cut?</span><span className="faq-x" aria-hidden="true">+</span></summary>
              <p className="faq-a" data-i18n="faq.a2">You tell us, plainly. The €200 covers one honest attempt and one round of your feedback — if it still is not right, you keep what was built and owe nothing more. There is no retainer and nothing renews.</p>
            </details>
            <details className="faq-item reveal">
              <summary><span className="faq-q display" data-i18n="faq.q3">How do we communicate?</span><span className="faq-x" aria-hidden="true">+</span></summary>
              <p className="faq-a" data-i18n="faq.a3">Directly with the engineer doing your work — email, WhatsApp/Viber or a call. No account managers, no ticket queue. You hear from us when something ships, and before anything risky.</p>
            </details>
            <details className="faq-item reveal">
              <summary><span className="faq-q display" data-i18n="faq.q4">What does upkeep cost?</span><span className="faq-x" aria-hidden="true">+</span></summary>
              <p className="faq-a" data-i18n="faq.a4">From €10 a month, stated before you commit. It covers hosting, updates and backups — and it is cancellable any month, because the keys are yours.</p>
            </details>
            <details className="faq-item reveal">
              <summary><span className="faq-q display" data-i18n="faq.q5">Do you only work with businesses in Bosnia?</span><span className="faq-x" aria-hidden="true">+</span></summary>
              <p className="faq-a" data-i18n="faq.a5">No — we work remotely in English, Bosnian and Arabic. Most of our work ships across borders; our clock is Central European.</p>
            </details>
          </div>
        </section>

        {/* FOOTER / CONTACT — the loop closes, the board powers on */}
        <footer className="foot" id="contact">
          <i className="anchor a-left" data-anchor="10" style={{ top: '80px' }} aria-hidden="true"></i>
          <div className="footer-mark" id="footerMark" aria-hidden="true"></div>
          <div className="inner">
            <div className="pretitle mono reveal" data-i18n="ft.pretitle">The line returns · <span className="arabic" lang="ar">أمانة</span></div>
            <h2 className="display reveal" data-i18n="ft.h">Place a trust<br />in <em>steady hands.</em></h2>
            <a className="cta reveal d1" data-mail="main" href="mailto:info@emanet-ai.com">
              <span className="ar" aria-hidden="true">أمانة</span>
              <span data-i18n="ft.cta">Place your trust</span>
            </a>
            <p className="cta-fallback reveal d1"><span data-i18n="ft.fallback">or email <a href="mailto:info@emanet-ai.com">info@emanet-ai.com</a></span> <button className="copy-email mono" type="button" data-i18n="ft.copy">Copy</button></p>
            <p className="cta-assure mono reveal d2" data-i18n="ft.assure">We reply within a day · no obligation · conversations stay private</p>

            <div className="footrow">
              <div className="sig" data-i18n="ft.sig">Held in trust. <span className="ar" aria-hidden="true">أمانة</span></div>
              <div className="legal">Emanet AI · 2026 · info@emanet-ai.com</div>
            </div>
          </div>
        </footer>

      </div>{/* /shell */}

      {/* ===== SERVICE DETAIL OVERLAY (a card zooms into this fullscreen panel) ===== */}
      <div className="detail-overlay" id="detailOverlay" role="dialog" aria-modal="true" aria-labelledby="detailTitle" aria-hidden="true">
        <div className="detail-backdrop" id="detailBackdrop"></div>
        <div className="detail-panel" id="detailPanel">
          <button className="detail-close" id="detailClose" type="button" aria-label="Close detail"><span aria-hidden="true">&#x2715;</span></button>
          <div className="detail-body" id="detailBody" data-lenis-prevent></div>
        </div>
      </div>
    </>
  );
}
