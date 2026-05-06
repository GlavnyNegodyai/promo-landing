import Button from "./button";
import styles from "./hero.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

type BackgroundTextProps = {
  x: string;
  dy: string;
  fontSize: number;
  fill: string;
  ref: (el: SVGTextElement | null) => void;
};

function BackgroundText({ x, dy, fontSize, fill, ref }: BackgroundTextProps) {
  return (
    <text x={x} y="100%" dy={dy} fontSize={fontSize} fill={fill} ref={ref}>
      /WALL STREET/NASDAQ/NEW YORK STOCK EXCHANGE/GOLDMAN SACHS/JPMORGAN
      CHASE/WALL STREET/NASDAQ/NEW YORK STOCK EXCHANGE/GOLDMAN SACHS/JPMORGAN
      CHASE
    </text>
  );
}

export default function Hero() {
  const itemsRef = useRef<(SVGTextElement | null)[]>([]);
  const { contextSafe } = useGSAP();

  const bgTexts = [
    {
      x: "0",
      dy: "15",
      fontSize: 160,
      fill: "rgba(0, 0, 0, 1)",
    },
    {
      x: "0",
      dy: "-105",
      fontSize: 144,
      fill: "rgba(0, 0, 0, .5)",
    },
    {
      x: "0",
      dy: "-215",
      fontSize: 128,
      fill: "rgba(0, 0, 0, .25)",
    },
    {
      x: "0",
      dy: "-320",
      fontSize: 128,
      fill: "rgba(0, 0, 0, .125)",
    },
  ];

  const horizontalLoop = contextSafe((el: SVGTextElement | null, i: number) => {
    if (!el) return;
    const textWidth = el.getComputedTextLength() ?? 0;
    console.log(textWidth);

    if (i % 2 === 0) {
      gsap.to(el, {
        x: `${-(textWidth / 2)}px`,
        duration: 40 + i * 6,
        repeat: -1,
        ease: "none",
      });
    } else {
      gsap.fromTo(
        el,
        { x: `${-(textWidth / 2)}px` },
        {
          x: `0px`,
          duration: 40 + i * 6,
          repeat: -1,
          ease: "none",
        },
      );
    }
  });

  useLayoutEffect(() => {
    itemsRef.current.forEach((el, i) => {
      horizontalLoop(el, i);
    });
  }, []);

  return (
    <section className={`${styles.hero} text-(--white)`}>
      <div>
        <svg className="w-full h-full absolute">
          <defs>
            <mask id="heroMask">
              <rect width="100%" height="100%" fill="#fff" />
              <g fontWeight="500" fontFamily="Bitcount, serif">
                <rect width="54%" height="86%" x="50%" y="-5%" rx="36" />
                {bgTexts.map((text, i) => (
                  <BackgroundText
                    key={i}
                    {...text}
                    ref={(el) => {
                      itemsRef.current[i] = el;
                    }}
                  />
                ))}
              </g>
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="#1d1d1d"
            mask="url(#heroMask)"
          />
          <rect
            width="54%"
            height="86%"
            x="50%"
            y="-5%"
            rx="36"
            fill="#1d1d1d"
            mask="url(#heroMask)"
          />
        </svg>
        <div className="absolute w-full h-full flex items-center pl-12">
          <div className="container mx-auto">
            <h1>
              <p className="text-8xl font-medium">Trading was for</p>
              <p className="uppercase font-[Bitcount] text-(--orange) text-[184px] flex gap-15">
                <span>the</span>
                <span>few</span>
              </p>
            </h1>
          </div>
        </div>
      </div>
      <div className="hidden">
        <h1>
          <p className="font-medium text-8xl">And now its for</p>
          <p className="uppercase font-[Bitcount] text-[184px] text-(--green)">
            you
          </p>
          <Button>
            <p>Join Now</p>
          </Button>
        </h1>
      </div>
    </section>
  );
}
