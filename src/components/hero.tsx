import Button from "./button";
import styles from "./hero.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import img1 from "../assets/hero/hero-person.webp";
import coinImg1 from "../assets/hero/bit.svg";
import coinImg2 from "../assets/hero/dol.svg";
import coinImg3 from "../assets/hero/eth.svg";

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
  const lenis = useLenis();
  const isScrolledRef = useRef<boolean>(false);
  const heroRef = useRef<HTMLElement | null>(null);

  const itemsRef = useRef<(SVGTextElement | null)[]>([]);
  const { contextSafe } = useGSAP();
  const maskRef = useRef<SVGSVGElement | null>(null);
  const firstSlide = useRef<HTMLDivElement | null>(null);
  const secondSlide = useRef<HTMLDivElement | null>(null);
  const firstHeadline = useRef<HTMLHeadingElement | null>(null);
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const coinRef = useRef<(HTMLDivElement | null)[]>([]);

  function lockScroll() {
    if (!lenis) return;
    isScrolledRef.current = true;
    lenis.stop();
  }

  function unlockScroll() {
    if (!lenis) return;
    lenis.start();
    isScrolledRef.current = false;
  }

  function snapTo(target: number, onComplete?: () => void) {
    if (!lenis) return;
    console.log("snapTo called");
    lockScroll();

    lenis.scrollTo(target, {
      duration: 0.5,
      force: true,
      onComplete: () => {
        onComplete?.();
        unlockScroll();
      },
    });
  }

  useGSAP(
    () => {
      let heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "0% top",
          end: "80% bottom",
          toggleActions: "play play reverse reverse",
          onEnter: () => {
            if (!heroRef.current) return;
            const bottomScroll =
              heroRef.current.offsetTop +
              heroRef.current.offsetHeight -
              window.innerHeight;
            snapTo(bottomScroll);
          },
          onEnterBack: () => {
            firstSlide.current?.classList.remove("hidden");
            snapTo(0);
          },
          onLeaveBack: () => {
            firstSlide.current?.classList.remove("hidden");
          }
        },
      });
      heroTl
        .to(maskRef.current, {
          x: "-40%",
          y: "20%",
          duration: 0.5,
          ease: `power1.inOut`,
          onStart: () => {
            secondSlide.current?.classList.remove("hidden");
          },
          onReverseComplete: () => {
            secondSlide.current?.classList.add("hidden");
          },
        })
        .to(
          firstHeadline.current,
          {
            x: "-100%",
            y: "20%",
            duration: 0.5,
            ease: `power1.inOut`,
            onStart: () => {
              secondSlide.current?.classList.remove("hidden");
            },
            onReverseComplete: () => {
              secondSlide.current?.classList.add("hidden");
            },
          },
          "<",
        )
        .to(
          secondSlide.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: `power1.inOut`,
          },
          "<",
        )
        .to(
          heroWrapperRef.current,
          {
            backgroundSize: "120% auto",
            backgroundPosition: "100% 20%",
            duration: 0.5,
            ease: `power1.inOut`,
            onComplete: () => {
              firstSlide.current?.classList.add("hidden");
            },
          },
          "<",
        );
    },
    {
      dependencies: [lenis],
    },
  );

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    coinRef.current.forEach((zone) => {
      if (!zone) return;

      const coin = zone.querySelector<HTMLImageElement>("img");
      if (!coin) return;

      const onMouseMove = (e: MouseEvent) => {
        const coinRect = coin.getBoundingClientRect();
        const dotX = (coinRect.right + coinRect.left) / 2;
        const dotY = (coinRect.bottom + coinRect.top) / 2;

        const zoneRect = zone.getBoundingClientRect();
        const radius = zoneRect.width / 2;
        var posX = e.clientX;
        var posY = e.clientY;
        const distY = posY - dotY;
        const distX = posX - dotX;
        const dist = Math.sqrt(distY * distY + distX * distX);
        const newDistX = -10 * (distX / dist) * (radius / dist);
        const newDistY = -10 * (distY / dist) * (radius / dist);

        gsap.to(coin, {
          x: newDistX,
          y: newDistY,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const onMouseLeave = (e: MouseEvent) => {
        gsap.to(coin, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: true,
        });
      };

      zone.addEventListener("mousemove", onMouseMove);
      zone.addEventListener("mouseleave", onMouseLeave);

      cleanups.push(() => {
        zone.removeEventListener("mousemove", onMouseMove);
        zone.removeEventListener("mouseleave", onMouseLeave);
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup);
      };
    });
  }, []);

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

    if (i % 2 === 0) {
      gsap.to(el, {
        x: `${-(textWidth / 2)}px`,
        duration: 60 + i * 6,
        repeat: -1,
        ease: "none",
      });
    } else {
      gsap.fromTo(
        el,
        { x: `${-(textWidth / 2)}px` },
        {
          x: `0px`,
          duration: 60 + i * 6,
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
    <section className={`${styles.hero} text-(--white)`} ref={heroRef}>
      <div className={styles["hero__content-wrap"]} ref={heroWrapperRef}>
        <div
          className="absolute w-full h-full overflow-hidden z-100"
          ref={firstSlide}
        >
          <svg className="w-[200%] h-[120%] absolute bottom-0" ref={maskRef}>
            <defs>
              <mask id="heroMask">
                <rect width="100%" height="100%" fill="#fff" />
                <g fontWeight="500" fontFamily="Bitcount, serif">
                  <rect width="100%" height="86%" x="25%" y="-5%" rx="36" />
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
          </svg>
          <div className="absolute w-full h-full flex items-center pl-12">
            <div className="container mx-auto">
              <h1 ref={firstHeadline} className="">
                <p className="text-8xl font-medium">Trading was for</p>
                <p className="uppercase font-[Bitcount] text-(--orange) text-[184px] flex gap-15">
                  <span>the</span>
                  <span>few</span>
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div
          ref={secondSlide}
          style={{ opacity: 0 }}
          className="hidden relative h-full overflow-x-hidden overflow-x-hidden"
        >
          <div className="container mx-auto flex items-center relative z-10 h-full">
            <div>
              <h1>
                <p className="font-medium text-8xl">And now its for</p>
                <p className="uppercase font-[Bitcount] text-[296px] text-(--green) font-medium leading-62.5">
                  you
                </p>
              </h1>
              <Button className="text-(--black) bg-(--green)">
                <p>Join Now</p>
              </Button>
            </div>
            <div className="absolute bottom-0 right-0 w-[70%]">
              <div
                ref={(el) => {
                  if (el) coinRef.current[1] = el;
                }}
                className="flex h-70 w-70 items-center justify-center rounded-full absolute z-100 top-[30%] left-[16%]"
              >
                <img
                  src={coinImg1.src}
                  alt=""
                  className="w-[50%] h-[50%] relative"
                />
              </div>
              <div
                ref={(el) => {
                  if (el) coinRef.current[2] = el;
                }}
                className="flex h-65 w-65 items-center justify-center rounded-full absolute z-1001 bottom-[30%] right-[5%]"
              >
                <img
                  src={coinImg2.src}
                  alt=""
                  className="w-[50%] h-[50%] relative"
                />
              </div>
              <div
                ref={(el) => {
                  if (el) coinRef.current[3] = el;
                }}
                className="flex h-60 w-60 items-center justify-center rounded-full absolute z-1001 top-[-8%] right-[20%]"
              >
                <img
                  src={coinImg3.src}
                  alt=""
                  className="w-[50%] h-[50%] relative"
                />
              </div>
              <img
                src={img1.src}
                alt=""
                className="w-full relative z-1000 pointer-events-none"
              />
            </div>
          </div>
          <div className={styles["second-slide-overlay"]}></div>
        </div>
      </div>
    </section>
  );
}
