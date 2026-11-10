// ─── Rough Star ──────────────────────────────────────────────────────────────
// The orange sketched star from the mockup, sitting over the bottom-right of
// the hero. The points are deliberately uneven and the stroke is left open at
// the start/end so it reads as drawn rather than generated — a perfectly
// symmetrical star here looks like a rating widget, not a maker's mark.

// Sized by the parent via CSS (see .roughStar) rather than a prop, so it can
// track the viewport without a breakpoint for every step.
export default function RoughStar() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M101 10
           L127 74
           L195 77
           L142 119
           L160 186
           L103 149
           L44 184
           L63 118
           L11 73
           L79 72
           Z"
        stroke="var(--signal-500)"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
