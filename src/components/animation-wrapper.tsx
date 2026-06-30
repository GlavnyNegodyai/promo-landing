import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(TextPlugin, SplitText);

type AnimationWrapperType = {
  children: React.ReactNode;
  duration?: number;
  ease?: string;
  initialY?: number;
  isHeadline?: boolean;
  isCodedHeadline?: boolean;
};

export default function AnimationWrapper({
  children,
  duration,
  ease,
  initialY,
  isHeadline,
  isCodedHeadline,
}: AnimationWrapperType) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      let hd = wrapperRef.current?.firstElementChild as
        | HTMLHeadingElement
        | null
        | undefined;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          end: "10% 20%",
          toggleActions: "play none play none",
        },
        
      });

      if (isHeadline) {
        if (!hd) return null;
        const headlineText = hd.textContent;

        if (isCodedHeadline) {
          const { width, height } = hd.getBoundingClientRect();
          const headlineTextArr = [...headlineText];
          const codedHeadlineArr = [..."▓▒░█▓▒░█▓▒░█▓▒"];
          let codedHeadline = "";
          for (let i = 0; i <= headlineText.length; i++) {
            if (headlineTextArr[i] == " ") {
              codedHeadline += " ";
            } else {
              let newI = i % codedHeadlineArr.length;
              codedHeadline += codedHeadlineArr[newI];
            }
          }
          tl.set(hd, {
            width,
            height,
          })
            .set(hd, { text: { value: codedHeadline } })
            .to(wrapperRef.current, { opacity: 1, duration: 0.3 })
            .to(
              hd,
              {
                text: { value: headlineText },
                duration: duration || 0.9,
              },
              "<",
            );
        } else {
          let split = SplitText.create(hd, { type: "words, chars" });
          let headlineLength = headlineText.length;
          let animationLength = duration || 0.9;
          tl.set(split.chars, { opacity: 0 })
            .set(wrapperRef.current, { opacity: 1 })
            .set(split.chars, {
              duration: 0,
              opacity: 1,
              stagger: animationLength / headlineLength,
            });
        }
      } else {
        tl.fromTo(
          wrapperRef.current,
          { opacity: 0, y: initialY || 50 },
          {
            opacity: 1,
            y: 0,
            duration: duration || 0.9,
            ease: ease || "power2.out",
          },
        );
      }
    },
    { dependencies: [wrapperRef] },
  );

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }} className="relative">
      {children}
    </div>
  );
}
