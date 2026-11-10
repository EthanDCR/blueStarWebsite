"use client";

import { useEffect, useRef, useState } from "react";
import { Lottie, type LottieHandle } from "lottie-react";

// ─── Logo Lottie ─────────────────────────────────────────────────────────────
// The animated wordmark. Lives in the nav bar as the home link, which is what
// carries the accessible name — this is marked aria-hidden so the mark isn't
// announced a second time.
//
// `src` takes the URL and the library fetches it, so the animation data stays
// out of the page bundle — the video and the headline paint first, and the
// logo arriving a beat later costs nothing. `.homeMark` in Nav.module.css
// reserves the space, so the bar doesn't shift when it lands.
//
// ─── Why the segment ─────────────────────────────────────────────────────────
// The export is 1092 frames (36.4s at 29.97fps), but the mark finishes drawing
// around frame 100 and everything after it is a hold. Verified by stepping the
// file frame by frame under plain lottie-web: frames 150 through 1092 are
// pixel-identical.
//
// So playback stops at frame 100. Dropping the 31-second hold also puts the
// animation under five seconds, which is the WCAG 2.2.2 threshold for needing
// a pause control.
//
// Re-export with real motion past that point and this segment wants widening
// to match — measure it, don't guess.
const PLAYABLE: readonly [number, number] = [0, 100];

export default function LogoLottie() {
  const lottie = useRef<LottieHandle>(null);
  const [reduced, setReduced] = useState(false);

  // Read in an effect, not at render: window doesn't exist during SSR, and
  // the value must not differ between server and client markup.
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // With motion reduced, skip straight to the finished mark.
  useEffect(() => {
    if (reduced) lottie.current?.seek({ percent: 100 });
  }, [reduced]);

  return (
    <Lottie
      src="/bluestar-logo.json"
      lottieRef={lottie}
      segment={PLAYABLE}
      autoplay={!reduced}
      loop={false}
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
