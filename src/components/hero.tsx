import Button from "./button";
import styles from "./hero.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useCallback, useState } from "react";
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
  const isPortraitRef = useRef(false);

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
    if (isScrolledRef.current) return;
    if (!lenis) return;
    document.body.style.overflow = "hidden";
    isScrolledRef.current = true;
    lenis.stop();
  }

  function unlockScroll() {
    if (!isScrolledRef.current) return;
    if (!lenis) return;
    document.body.style.overflow = "";
    isScrolledRef.current = false;
    lenis.start();
  }

  function snapTo(target: number, onComplete?: () => void) {
    if (!lenis) return;
    lockScroll();
    console.log("oh snap");
    lenis.scrollTo(target, {
      immediate: true,
      force: true,
    });
  }

  const checkRatio = useCallback(() => {
    isPortraitRef.current = window.innerHeight > window.innerWidth;
  }, []);

  useEffect(() => {
    checkRatio();

    window.addEventListener("resize", checkRatio);

    return () => window.removeEventListener("resize", checkRatio);
  }, [checkRatio]);

  useGSAP(
    () => {
      let heroTl = gsap.timeline({
        scrollTrigger: {
          invalidateOnRefresh: true,
          trigger: heroRef.current,
          start: "0% top",
          end: "80% bottom",
          toggleActions: "play play reverse reverse",
          onEnter: () => {
            checkRatio();
            if (!heroRef.current) return;
            const heroPos =
              heroRef.current.offsetTop + heroRef.current.offsetHeight;
            if ((heroPos > window.scrollY) && !isScrolledRef.current) {
              const bottomScroll = heroPos - window.innerHeight;
              snapTo(bottomScroll - 130);
            }
          },
          onEnterBack: () => {
            checkRatio();
            if (!isScrolledRef.current) {
              firstSlide.current?.classList.remove("hidden");
              snapTo(0);
            }
          },
          onLeaveBack: () => {
            firstSlide.current?.classList.remove("hidden");
          },
        },
        onComplete: () => {
          unlockScroll();
        },
        onStart: () => {
          checkRatio();
        },
        onReverseComplete: () => {
          checkRatio();
          unlockScroll();
        },
      });
      heroTl
        .to(maskRef.current, {
          x: "-40%",
          y: "20%",
          duration: 0.5,
          ease: `power1.inOut`,
          onStart: () => {
            checkRatio();
            secondSlide.current?.classList.remove("hidden");
          },
          onReverseComplete: () => {
            checkRatio();
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
            backgroundSize: () =>
              isPortraitRef.current ? "auto 120%" : "120% auto",
            backgroundPosition: "100% 20%",
            duration: 0.5,
            ease: "power1.inOut",
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
      dy: "0",
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
      dy: "-210",
      fontSize: 128,
      fill: "rgba(0, 0, 0, .25)",
    },
    {
      x: "0",
      dy: "-315",
      fontSize: 128,
      fill: "rgba(0, 0, 0, .125)",
    },
  ];

  const horizontalLoop = contextSafe((el: SVGTextElement | null, i: number) => {
    if (!el) return;
    gsap.killTweensOf(el);
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

  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      horizontalLoop(el, i);
    });


  return () => {
    itemsRef.current.forEach((el) => {
      if (el) gsap.killTweensOf(el);
    })};
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
          <div className="absolute w-full h-full flex items-center px-6 sm:px-8 lg:pl-12">
            <div className="container mx-auto">
              <h1 ref={firstHeadline}>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium">
                  Trading was for
                </span>

                <span className="block uppercase font-[Bitcount] text-(--orange) text-[76px] sm:text-[110px] md:text-[140px] lg:text-[184px]">
                  <span className="inline-flex gap-4 sm:gap-8 lg:gap-15">
                    <span>the</span>
                    <span>few</span>
                  </span>
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div
          ref={secondSlide}
          style={{ opacity: 0 }}
          className="hidden relative h-full overflow-hidden"
        >
          <div className="container mx-auto flex items-center relative z-10 h-full px-6">
            <div className="pt-15 lg:pt-0">
              <h1>
                <span className="block font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                  And now its for
                </span>

                <span className="block uppercase font-[Bitcount] text-[128px] sm:text-[170px] md:text-[220px] lg:text-[296px] text-(--green) font-medium leading-none lg:leading-62.5">
                  you
                </span>
              </h1>
              <Button className="text-(--black) bg-(--green)" isForForm>
                Join Now
              </Button>
            </div>
            <div className="absolute bottom-0 right-0 w-full h-full min-[426px]:w-[70%] min-[426px]:h-auto">
              <div
                ref={(el) => {
                  if (el) coinRef.current[1] = el;
                }}
                className="
                  flex h-40 w-40 min-[426px]:h-70 min-[426px]:w-70
                  items-center justify-center rounded-full absolute z-100
                  top-[18%] left-[-10%]
                  min-[426px]:top-[30%] min-[426px]:left-[16%]
                "
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
                className="
                  flex h-36 w-36 min-[426px]:h-65 min-[426px]:w-65
                  items-center justify-center rounded-full absolute z-1001
                  bottom-[20%] right-[5%]
                  min-[426px]:bottom-[30%] min-[426px]:right-[5%]
                "
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
                className="
                  flex h-32 w-32 min-[426px]:h-60 min-[426px]:w-60
                  items-center justify-center rounded-full absolute z-1001
                  top-[10%] right-[20%]
                  min-[426px]:top-[-8%] min-[426px]:right-[20%]
                "
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
                className="hidden min-[426px]:block w-full relative z-1000 pointer-events-none"
              />
            </div>
          </div>
          <div className={styles["second-slide-overlay"]}></div>
        </div>
      </div>
    </section>
  );
}
