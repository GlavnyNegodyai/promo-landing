
import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 0.8,
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
