// ─── Motifs ──────────────────────────────────────────────────────────────────
// Each project tile holds a line drawing of what was actually built, so the
// grid reads as work rather than four empty frames. Swap any of these for a
// <video> or <Image> once real job footage comes in.

const STROKE = "var(--steel-300)";
const FAINT = "var(--navy-700)";

function Frame({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 480 270"
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={`hatch-${id}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="8" x2="8" y2="0" stroke={FAINT} strokeWidth="1" />
        </pattern>
      </defs>
      {children}
    </svg>
  );
}

// Mezzanine framing — plan of beams over columns
function Mezzanine() {
  return (
    <Frame id="mezz">
      <g stroke={FAINT} strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="60" y1={70 + i * 32} x2="420" y2={70 + i * 32} />
        ))}
      </g>
      <g stroke={STROKE} strokeWidth="6" strokeLinecap="square">
        <line x1="60" y1="70" x2="420" y2="70" />
        <line x1="60" y1="198" x2="420" y2="198" />
        <line x1="60" y1="70" x2="60" y2="198" />
        <line x1="240" y1="70" x2="240" y2="198" />
        <line x1="420" y1="70" x2="420" y2="198" />
      </g>
      {[60, 240, 420].map((x) => (
        <g key={x}>
          <circle cx={x} cy="70" r="8" fill="none" stroke="var(--red-500)" strokeWidth="1.5" />
          <circle cx={x} cy="198" r="8" fill="none" stroke="var(--red-500)" strokeWidth="1.5" />
        </g>
      ))}
    </Frame>
  );
}

// Ranch entry gate — pipe frame with vertical pickets
function EntryGate() {
  return (
    <Frame id="gate">
      <rect x="92" y="78" width="296" height="118" fill="url(#hatch-gate)" opacity="0.6" />
      <g stroke={STROKE} strokeWidth="5" strokeLinecap="square">
        <rect x="92" y="78" width="296" height="118" fill="none" />
        {[132, 172, 212, 252, 292, 332].map((x) => (
          <line key={x} x1={x} y1="78" x2={x} y2="196" strokeWidth="3" />
        ))}
        {/* Posts */}
        <line x1="66" y1="54" x2="66" y2="222" strokeWidth="9" />
        <line x1="414" y1="54" x2="414" y2="222" strokeWidth="9" />
        {/* Header */}
        <line x1="58" y1="54" x2="422" y2="54" strokeWidth="7" />
      </g>
      <g transform="translate(222 14) scale(0.36)">
        <path
          d="M50 0 L61.23 34.55 L97.55 34.55 L68.17 55.9 L79.39 90.45 L50 69.1 L20.61 90.45 L31.83 55.9 L2.45 34.55 L38.77 34.55 Z"
          fill="var(--red-500)"
        />
      </g>
      <line x1="40" y1="222" x2="440" y2="222" stroke={FAINT} strokeWidth="2" />
    </Frame>
  );
}

// Stair tower — stringer with treads
function StairTower() {
  const treads = [0, 1, 2, 3, 4, 5, 6] as const;
  return (
    <Frame id="stair">
      <g stroke={STROKE} strokeWidth="5" strokeLinecap="square">
        {treads.map((i) => (
          <line
            key={i}
            x1={110 + i * 42}
            y1={212 - i * 22}
            x2={152 + i * 42}
            y2={212 - i * 22}
          />
        ))}
        {/* Stringers */}
        <line x1="104" y1="222" x2="420" y2="56" strokeWidth="6" />
        <line x1="104" y1="248" x2="420" y2="82" strokeWidth="4" />
      </g>
      <g stroke="var(--red-500)" strokeWidth="1.5" fill="none">
        {treads.map((i) => (
          <circle key={i} cx={110 + i * 42} cy={212 - i * 22} r="7" />
        ))}
      </g>
      <line x1="60" y1="248" x2="440" y2="248" stroke={FAINT} strokeWidth="2" />
    </Frame>
  );
}

// Pipe spool — flanged run with a mitre
function PipeSpool() {
  return (
    <Frame id="spool">
      <g stroke={STROKE} strokeWidth="14" fill="none" strokeLinecap="butt">
        <path d="M70 96 H300 L404 200" />
      </g>
      <g fill="var(--steel-500)">
        {/* Inlet flange */}
        <rect x="64" y="70" width="12" height="52" />
        {/* Outlet flange — square to the 45 degree run */}
        <rect x="398" y="174" width="12" height="52" transform="rotate(45 404 200)" />
      </g>
      <g stroke="var(--red-500)" strokeWidth="1.5" fill="none">
        <circle cx="300" cy="96" r="13" />
        <circle cx="70" cy="96" r="13" />
      </g>
      <g stroke={FAINT} strokeWidth="1">
        <line x1="70" y1="150" x2="300" y2="150" />
        <line x1="70" y1="142" x2="70" y2="158" />
        <line x1="300" y1="142" x2="300" y2="158" />
      </g>
    </Frame>
  );
}

const MOTIFS = [Mezzanine, EntryGate, StairTower, PipeSpool] as const;

export default function Motif({ index }: { index: number }) {
  const Chosen = MOTIFS[index % MOTIFS.length];
  return <Chosen />;
}
