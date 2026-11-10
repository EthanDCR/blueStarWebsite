import { LONE_STAR_PATH } from "@/components/brand/LoneStar";

// ─── Star Field ──────────────────────────────────────────────────────────────
// Hero backdrop: a lone star outline sitting inside concentric rings, with a
// few spark rays thrown off the weld point at its centre.

const CX = 1046;
const CY = 356;

const RINGS = [
  { rx: 96,  ry: 92,  rot: -6, stroke: "var(--red-500)", sw: 1.4, op: 0.55 },
  { rx: 186, ry: 176, rot:  4, stroke: "var(--red-500)", sw: 1.1, op: 0.36 },
  { rx: 292, ry: 274, rot: -3, stroke: "var(--red-300)", sw: 0.9, op: 0.22 },
  { rx: 412, ry: 384, rot:  5, stroke: "var(--red-300)", sw: 0.7, op: 0.14 },
  { rx: 548, ry: 506, rot: -2, stroke: "var(--steel-500)", sw: 0.6, op: 0.1 },
  { rx: 702, ry: 644, rot:  3, stroke: "var(--steel-500)", sw: 0.5, op: 0.06 },
] as const;

// Rays fire out along the star's five points
const RAYS = [-90, -18, 54, 126, 198] as const;

export default function StarField() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {RINGS.map((r, i) => (
        <ellipse
          key={i}
          cx={CX}
          cy={CY}
          rx={r.rx}
          ry={r.ry}
          fill="none"
          stroke={r.stroke}
          strokeWidth={r.sw}
          opacity={r.op}
          transform={`rotate(${r.rot}, ${CX}, ${CY})`}
        />
      ))}

      {RAYS.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={CX + Math.cos(rad) * 70}
            y1={CY + Math.sin(rad) * 70}
            x2={CX + Math.cos(rad) * 620}
            y2={CY + Math.sin(rad) * 620}
            stroke="var(--red-500)"
            strokeWidth="0.8"
            opacity="0.14"
          />
        );
      })}

      {/* The star itself — outline only, so the video/plate reads through it */}
      <g transform={`translate(${CX - 230} ${CY - 230}) scale(4.6)`}>
        <path
          d={LONE_STAR_PATH}
          fill="none"
          stroke="var(--bone-50)"
          strokeWidth="0.7"
          opacity="0.14"
        />
      </g>

      {/* Weld point */}
      <circle cx={CX} cy={CY} r="4" fill="var(--spark-400)" opacity="0.8" />
      <circle cx={CX} cy={CY} r="12" fill="var(--spark-400)" opacity="0.12" />
    </svg>
  );
}
