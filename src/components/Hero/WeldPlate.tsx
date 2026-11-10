// ─── Weld Plate ──────────────────────────────────────────────────────────────
// Stand-in for the hero media slot: a shop-drawing elevation of a welded pipe
// railing, with weld callouts and a dimension line. Drop a <video> in the
// hero's right column in place of this once real footage exists.

const POSTS = [96, 232, 368, 504] as const;

export default function WeldPlate() {
  return (
    <svg
      viewBox="0 0 600 420"
      width="100%"
      height="100%"
      role="img"
      aria-label="Shop drawing of a welded steel pipe railing assembly"
    >
      <defs>
        {/* Faint blueprint grid */}
        <pattern id="wp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M24 0 H0 V24"
            fill="none"
            stroke="var(--navy-700)"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </pattern>
      </defs>

      <rect width="600" height="420" fill="url(#wp-grid)" />

      {/* ── Railing assembly ── */}
      <g stroke="var(--steel-300)" strokeWidth="7" strokeLinecap="square" fill="none">
        {/* Top rail */}
        <line x1="72" y1="128" x2="528" y2="128" />
        {/* Mid rail */}
        <line x1="72" y1="214" x2="528" y2="214" />
      </g>

      <g stroke="var(--steel-300)" strokeWidth="7" strokeLinecap="square">
        {POSTS.map((x) => (
          <line key={x} x1={x} y1="128" x2={x} y2="300" />
        ))}
      </g>

      {/* Base plates */}
      {POSTS.map((x) => (
        <rect key={x} x={x - 22} y="300" width="44" height="9" fill="var(--steel-500)" />
      ))}

      {/* Floor line */}
      <line
        x1="48"
        y1="313"
        x2="552"
        y2="313"
        stroke="var(--navy-700)"
        strokeWidth="2"
      />

      {/* ── Weld callouts ── */}
      {POSTS.map((x) => (
        <g key={x}>
          <circle cx={x} cy="128" r="9" fill="none" stroke="var(--red-500)" strokeWidth="1.5" />
          <circle cx={x} cy="300" r="9" fill="none" stroke="var(--red-500)" strokeWidth="1.5" />
        </g>
      ))}

      {/* Leader line to the spec label */}
      <g stroke="var(--red-500)" strokeWidth="1" opacity="0.85">
        <line x1="105" y1="121" x2="150" y2="74" />
        <line x1="150" y1="74" x2="268" y2="74" />
      </g>
      <text
        x="152"
        y="66"
        fill="var(--red-300)"
        fontSize="13"
        fontFamily="var(--font-mono)"
        letterSpacing="1.6"
      >
        3/16 FILLET — ALL AROUND
      </text>

      {/* ── Dimension line ── */}
      <g stroke="var(--steel-500)" strokeWidth="1">
        <line x1="72" y1="356" x2="528" y2="356" />
        <line x1="72" y1="346" x2="72" y2="366" />
        <line x1="528" y1="346" x2="528" y2="366" />
      </g>
      <text
        x="300"
        y="384"
        fill="var(--steel-300)"
        fontSize="13"
        fontFamily="var(--font-mono)"
        letterSpacing="1.6"
        textAnchor="middle"
      >
        38&apos;-0&quot;
      </text>

      {/* ── Material notes ── */}
      <g fontSize="12" fontFamily="var(--font-mono)" fill="var(--steel-500)" letterSpacing="1.4">
        <text x="48" y="40">A36 STRUCTURAL STEEL</text>
        <text x="552" y="40" textAnchor="end">SCH. 40 — 2&quot; O.D.</text>
      </g>
    </svg>
  );
}
