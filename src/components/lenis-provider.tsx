
import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1,
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
