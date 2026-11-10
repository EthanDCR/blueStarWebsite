import { LONE_STAR_PATH } from "./LoneStar";

// ─── Flag Badge ──────────────────────────────────────────────────────────────
// The Texas flag abstracted into a logo tile: navy hoist band carrying the lone
// star, then the white and red bars. Drawn at 3:2 like the real flag.

export default function FlagBadge({ size = 44 }: { size?: number }) {
  const w = size * 1.5;
  const h = size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 90 60"
      aria-hidden="true"
      focusable="false"
      style={{ borderRadius: 2, overflow: "hidden", flexShrink: 0 }}
    >
      {/* Hoist band */}
      <rect x="0" y="0" width="30" height="60" fill="var(--navy-900)" />
      {/* White bar */}
      <rect x="30" y="0" width="60" height="30" fill="var(--bone-50)" />
      {/* Red bar */}
      <rect x="30" y="30" width="60" height="30" fill="var(--red-500)" />
      {/* Lone star, inset in the hoist band */}
      <g transform="translate(7.5 15) scale(0.3)">
        <path d={LONE_STAR_PATH} fill="var(--bone-50)" />
      </g>
      {/* Hairline so the badge reads on either background */}
      <rect
        x="0.5"
        y="0.5"
        width="89"
        height="59"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1"
      />
    </svg>
  );
}
