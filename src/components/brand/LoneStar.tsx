// ─── Lone Star ───────────────────────────────────────────────────────────────
// A five-pointed star on a 0–100 box, point-up. Shared by the logo badge, the
// hero backdrop, and the footer. Colour comes from the parent via currentColor
// unless `fill` is passed.

export const LONE_STAR_PATH =
  "M50 0 L61.23 34.55 L97.55 34.55 L68.17 55.9 L79.39 90.45 " +
  "L50 69.1 L20.61 90.45 L31.83 55.9 L2.45 34.55 L38.77 34.55 Z";

type LoneStarProps = {
  size?: number;
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
};

export default function LoneStar({
  size = 24,
  className,
  fill = "currentColor",
  stroke,
  strokeWidth,
  opacity,
}: LoneStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={LONE_STAR_PATH}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    </svg>
  );
}
