import Button from "./button";
import styles from "./hero.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import img1 from "../assets/hero/hero-person.webp";
import coinImg1 from "../assets/hero/tiktok.svg";
import coinImg2 from "../assets/hero/twitch.svg";
import coinImg3 from "../assets/hero/yt.svg";
import noteImg1 from "../assets/hero/roi.svg";
import noteImg2 from "../assets/hero/insight.svg";
import noteImg3 from "../assets/hero/cpa.svg";

import AnimationWrapper from "./animation-wrapper";

const noteImages = [noteImg1, noteImg2, noteImg3];

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
      /TIKTOK/YOUTUBE/INSTAGRAM/TWITCH/X(TWITTER)/BLUESKY/FACEBOOK/TIKTOK/YOUTUBE/INSTAGRAM/TWITCH/X(TWITTER)/BLUESKY/FACEBOOK
    </text>
  );
}

export default function Hero() {
  const lenis = useLenis();
  const isScrolledRef = useRef<boolean>(false);
  const heroRef = useRef<HTMLElement | null>(null);

  const itemsRef = useRef<(SVGTextElement | null)[]>([]);
  const maskRef = useRef<SVGSVGElement | null>(null);
  const firstSlide = useRef<HTMLDivElement | null>(null);
  const secondSlide = useRef<HTMLDivElement | null>(null);
  const secondSlideContentRef = useRef<HTMLDivElement | null>(null);
  const firstHeadline = useRef<HTMLHeadingElement | null>(null);
  const heroBackgroundRef = useRef<HTMLDivElement | null>(null);
  const coinRef = useRef<(HTMLDivElement | null)[]>([]);
  const notificationRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* строчки start */
  let runningTextTl = useRef<gsap.core.Timeline | null>(null);

  const bgTexts = [
    {
      x: "0",
      dy: "0",
      fontSize: 160,
      fill: "rgba(0, 0, 0, 1)",
    },
    {
      x: "0",
      dy: "-115",
      fontSize: 144,
      fill: "rgba(0, 0, 0, .5)",
    },
    {
      x: "0",
      dy: "-230",
      fontSize: 128,
      fill: "rgba(0, 0, 0, .25)",
    },
    {
      x: "0",
      dy: "-330",
      fontSize: 128,
      fill: "rgba(0, 0, 0, .125)",
    },
  ];

  const killRunTxt = () => {
    runningTextTl.current?.kill();
  };

  const startRunTxt = () => {
    if (runningTextTl.current) {
      killRunTxt();
    }

    const tl = gsap.timeline();

    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      const textWidth = el.getComputedTextLength() ?? 0;

      tl.set(el, { webkitFilter: `blur(${i * 0.5}px)` }, "<");

      if (i % 2 === 0) {
        tl.to(
          el,
          {
            x: `${-(textWidth / 2)}px`,
            duration: 40 - i * 5,
            repeat: -1,
            ease: "none",
          },
          "<",
        );
      } else {
        tl.fromTo(
          el,
          { x: `${-(textWidth / 2)}px` },
          {
            x: `0px`,
            duration: 40 - i * 5,
            repeat: -1,
            ease: "none",
          },
          "<",
        );
      }
    });

    runningTextTl.current = tl;
  };

  const stopRunTxt = () => {
    runningTextTl.current?.pause();
  };

  const resumeRunTxt = () => {
    runningTextTl.current?.resume();
  };

  useEffect(() => {
    startRunTxt();
    return () => {
      killRunTxt();
    };
  }, []);
  /*строчки end*/

  /* Анимация смены слайдов start*/

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

  function snapTo(target: number) {
    if (!lenis) return;
    lockScroll();
    lenis.scrollTo(target, {
      immediate: true,
      force: true,
    });
  }

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
            if (!heroRef.current) return;
            const heroPos =
              heroRef.current.offsetTop + heroRef.current.offsetHeight;
            if (heroPos > window.scrollY && !isScrolledRef.current) {
              const bottomScroll = heroPos - window.innerHeight;
              snapTo(bottomScroll - 130);
            }
          },
          onEnterBack: () => {
            if (!isScrolledRef.current) {
              resumeRunTxt();
              firstSlide.current?.classList.remove("hidden");

              snapTo(0);
            }
          },
          onLeaveBack: () => {
            resumeRunTxt();
            firstSlide.current?.classList.remove("hidden");
          },
        },
        onComplete: () => {
          unlockScroll();
        },
        onReverseComplete: () => {
          unlockScroll();
        },
      });
      heroTl
        .to(maskRef.current, {
          x: "-40%",
          y: "20%",
          duration: 0.5,
          ease: `power1.inOut`,
        })
        .to(
          firstHeadline.current,
          {
            x: "-100%",
            y: "20%",
            scale: 1.3,
            duration: 0.5,
            ease: `power1.inOut`,
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
        .fromTo(
          secondSlideContentRef.current,
          {
            x: "40%",
            y: "20%",
            scale: 0.7,
          },
          {
            x: "0%",
            y: "0%",
            scale: 1,
            duration: 0.5,
            ease: `power1.inOut`,
          },
          "<",
        )
        .to(
          heroBackgroundRef.current,
          {
            backgroundPosition: "40% 20%",
            scale: 1.5,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              stopRunTxt();
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
  /* Анимация смены слайдов end*/

  /* start убегающие кругляши */
  /* Подумал, т.к. анимашка простая и слушателей немного, что не буду их убирать при отсутствии во вьюпорте */

  useGSAP(() => {
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
        const newDistX = -20 * (distX / dist) * (radius / dist);
        const newDistY = -20 * (distY / dist) * (radius / dist);

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
          ease: "elastic.out(1.2, 0.4)",
          overwrite: true,
        });
      };

      zone.addEventListener("mousemove", onMouseMove);
      zone.addEventListener("mouseleave", onMouseLeave);
    });
  }, []);
  /* end убегающие кругляши */

  /* нотификации start */

  useGSAP(() => {
    const els = notificationRefs.current;
    if (!els.length) return;

    const randomRotate = () => gsap.utils.random(-10, 10);
    const randomDelay = () => gsap.utils.random(1, 1.5);

    gsap.set(els, {
      opacity: 0,
      scale: 0,
    });

    const tl = gsap.timeline({ repeat: -1 });

    els.forEach((el) => {
      tl.to(el, {
        opacity: 1,
        scale: 1,
        rotate: randomRotate,
        duration: 0.5,
        ease: "back.out(1.7)",
      })
        .to({}, { duration: 0.2 })
        .to(el, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
        })
        .to({}, { duration: randomDelay });
    });

    return () => tl.kill();
  }, []);

  /* нотификации end */

  return (
    <section className={`${styles.hero} text-(--white)`} ref={heroRef}>
      <div className={styles["hero__content-wrap"]}>
        <div className="absolute w-full h-full z-100" ref={firstSlide}>
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
              <mask id="cutoutMask">
                <rect width="100%" height="100%" fill="#fff" />
                <g>
                  <rect width="100%" height="86%" x="25%" y="-5%" rx="36" />
                </g>
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(82, 82, 82, 0.6)"
              mask="url(#cutoutMask)"
            />
            <rect
              width="100%"
              height="100%"
              fill="rgb(7, 7, 7);"
              mask="url(#heroMask)"
            />
          </svg>
          <div className="absolute w-full h-full flex items-center px-6 sm:px-8 lg:pl-12">
            <div className="container mx-auto">
              <h1 ref={firstHeadline}>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium">
                  Creator ads feel
                </span>
                <AnimationWrapper isHeadline isCodedHeadline>
                  <span className="block uppercase font-[Bitcount] text-(--orange) text-[76px] sm:text-[110px] md:text-[140px] lg:text-[184px]">
                    random
                  </span>
                </AnimationWrapper>
              </h1>
            </div>
          </div>
        </div>
        <div
          ref={secondSlide}
          style={{ opacity: 0 }}
          className="relative h-full z-10"
        >
          <div
            className="container mx-auto flex items-center relative z-10 h-full px-6"
            ref={secondSlideContentRef}
          >
            <div className="pt-15 lg:pt-0">
              <h1>
                <span className="block font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                  But not with
                </span>
                <span className="block uppercase font-[Bitcount] text-[128px] sm:text-[170px] md:text-[220px] lg:text-[296px] text-(--green) font-medium leading-none lg:leading-62.5">
                  us
                </span>
              </h1>
              <Button className="text-(--black) bg-(--green)" isForForm>
                Start now
              </Button>
            </div>
            <div className="absolute bottom-0 right-0 w-[70%] h-auto">
              <div
                ref={(el) => {
                  if (el) coinRef.current[1] = el;
                }}
                className="
      flex h-[40%] w-[40%]
      items-center justify-center rounded-full absolute z-100
      top-[30%] left-[10%]
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
                  if (el) coinRef.current[3] = el;
                }}
                className="
      flex h-[35%] w-[35%]
      items-center justify-center rounded-full absolute z-1001
      top-[-10%] right-[15%]
    "
              >
                <img
                  src={coinImg3.src}
                  alt=""
                  className="w-[50%] h-[50%] relative"
                />
              </div>

              <div
                ref={(el) => {
                  if (el) coinRef.current[2] = el;
                }}
                className="
      flex h-[35%] w-[35%]
      items-center justify-center rounded-full absolute z-1001
      bottom-[25%] right-[0%]
    "
              >
                <img
                  src={coinImg2.src}
                  alt=""
                  className="w-[50%] h-[50%] relative"
                />
              </div>

              <div
                className="
      flex h-[35%] w-[35%]
      items-center justify-center rounded-full absolute z-1001
      bottom-[55%] left-[23%]
    "
              >
                {noteImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.src}
                    alt=""
                    className="w-[50%] h-[50%] absolute origin-[center_bottom]"
                    ref={(el) => {
                      if (el) notificationRefs.current[index] = el;
                    }}
                  />
                ))}
              </div>

              <img
                src={img1.src}
                alt=""
                className="block w-full relative z-1000 pointer-events-none"
              />
            </div>
          </div>
          <div className={styles["second-slide-overlay"]}></div>
        </div>
        <div
          className={styles["hero-background"]}
          ref={heroBackgroundRef}
        ></div>
      </div>
    </section>
  );
}
