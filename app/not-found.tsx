import Link from "next/link";

/* Server component: static seal, no Deck. The inline script clears the
   gate scroll-lock class the root layout ships (Deck isn't here to do it). */
export default function NotFound() {
  return (
    <main className="nf">
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('gated');" }} />
      <svg viewBox="0 0 120 120" aria-hidden="true" className="nf-seal">
        <g fill="none" stroke="#C6A867" strokeWidth="1.2">
          <circle cx="60" cy="60" r="44" opacity=".35" />
          <polygon points="60,16 91.1,28.9 104,60 91.1,91.1 60,104 28.9,91.1 16,60 28.9,28.9" opacity=".5" />
          <polygon points="60,30 81.2,38.8 90,60 81.2,81.2 60,90 38.8,81.2 30,60 38.8,38.8" stroke="#5E9B7A" />
          <path d="M60 44 L71.3 71.3 L44 60 L71.3 48.7 L60 76 L48.7 48.7 L76 60 L48.7 71.3 Z" />
        </g>
      </svg>
      <p className="mono nf-eyebrow">404 — NOT ENTRUSTED</p>
      <h1 className="display">This path was never<br />placed in our keeping.</h1>
      <Link className="cta" href="/">
        <span className="ar arabic" aria-hidden="true">أمانة</span>
        <span>Return to the seal</span>
      </Link>
    </main>
  );
}
