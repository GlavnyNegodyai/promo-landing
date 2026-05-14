import styles from "./reviews.module.css";
import Button from "./button";
import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import type { Swiper as SwiperType } from "swiper";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import img1 from "../assets/reviews/1.webp";
import img2 from "../assets/reviews/2.webp";
import img3 from "../assets/reviews/3.webp";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrambleTextPlugin);

type ReviewCardProps = {
  src: string;
  name: string;
  age: string;
  profit: string;
  quote: string;
};

function ReviewCard({ src, name, age, profit, quote }: ReviewCardProps) {
  return (
    <div>
      <div className={`${styles.card} rounded-4xl p-6`}>
        <div className="flex gap-6">
          <img src={src} alt="" className="rounded-full" loading="lazy" />
          <h3 className="font-[Bitcount_Double] text-5xl font-[350]">{`${name}, ${age}`}</h3>
        </div>
        <p
          className={`${styles["profit"]} font-[Bitcount] text-4xl py-3 font-[350]`}
        >
          {profit}
        </p>
        <p className="text-2xl">{quote}</p>
      </div>
    </div>
  );
}

const scrambledItems = [
  {
    prefix: "a2cf2424d9",
    text: "look",
    hash: "2cf24dba5fb0a2cf24dba5fb0",
  },
  {
    prefix: "ba5fb024d1",
    text: "what_our",
    hash: "9f86d08182cf24dba5fb0a2cf24dba5fb0",
  },
  {
    prefix: "7a2cf24db3",
    text: "users",
    hash: "5d41402abc2cf24dba5fb0a2cf24dba5fb0",
  },
  {
    prefix: "0a2cf24dba",
    text: "say",
    hash: "7d793037a2cf24dba5fb0a2cf24dba5fb0",
  },
];

const preScrambledItems = [
  {
    prefix: "9f86d08188",
    text: "a2cf",
    hash: "7a2cf24dba5fb0a2cf24dba50",
  },
  {
    prefix: "e3b0c44298",
    text: "d08182cf",
    hash: "2cf24dba5f9f86d08182cf24dba5fb0a2cf24dba5fb0",
  },
  {
    prefix: "5d41402abc",
    text: "24dba",
    hash: "9f86d08182cf24dba5fb0a2cf24dba5fb0",
  },
  {
    prefix: "7d793037a2",
    text: "5fb",
    hash: "2cf24dba5fb0a2cf24dba5fb0a2cf24dba5fb0",
  },
];

function HashTitle() {
  const elementRef = useRef<HTMLHeadingElement | null>(null);
  const prefixRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const postfixRefs = useRef<(HTMLSpanElement | null)[]>([]);

useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elementRef.current,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "restart reverse play reverse",
    },
  });

  prefixRefs.current.forEach((ref, i) => {
    if (!ref) return;

    tl.fromTo(
      ref,
      { opacity: 0 },
      {
        opacity: .8,
        duration: 1.4,
        scrambleText: {
          text: scrambledItems[i].prefix,
          chars: "upperCase",
          speed: 0.4,
        },
        ease: "power2.out",
      },
      0,
    );
  });

  textRefs.current.forEach((ref, i) => {
    if (!ref) return;

    tl.fromTo(
      ref,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.4,
        scrambleText: {
          text: scrambledItems[i].text,
          chars: "upperCase",
          speed: 0.4,
        },
        ease: "power2.out",
      },
      0,
    );
  });

  postfixRefs.current.forEach((ref, i) => {
    if (!ref) return;

    tl.fromTo(
      ref,
      { opacity: 0 },
      {
        opacity: .8,
        duration: 1.4,
        scrambleText: {
          text: scrambledItems[i].hash,
          speed: 0.4,
        },
        ease: "power2.out",
      },
      0,
    );
  });
});

  return (
    <h2
      className="text-8xl font-[Bitcount] font-light top-0 mb-8"
      ref={elementRef}
    >
      {preScrambledItems.map((item, i) => (
        <div key={item.text} className="relative">
          <span
            className="absolute -left-144"
            ref={(el) => {
              prefixRefs.current[i] = el;
            }}
          >
            {item.prefix}
          </span>

          <span
            className="text-(--white)"
            ref={(el) => {
              textRefs.current[i] = el;
            }}
          >
            {item.text}
          </span>

          <span
            className="absolute"
            ref={(el) => {
              postfixRefs.current[i] = el;
            }}
          >
            {item.hash}
          </span>
        </div>
      ))}
    </h2>
  );
}

export default function Reviews() {
  const swiperRef = useRef<SwiperType | null>(null);
  const slideRef = useRef<HTMLElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState<HTMLElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  function animateSLides(
    prevRef: HTMLElement | null,
    currRef: HTMLElement | null,
  ) {
    let vals = { blur: { a: 0, b: 5 }, brightness: { a: 1, b: 0.5 } };

    gsap.to(vals.blur, {
      a: 5,
      b: 0,
      duration: 0.1,
      onUpdate: () => {
        if (prevRef){
          gsap.to(prevRef, {
            filter: `blur(${vals.blur.a}px) brightness(${vals.brightness.a})`,
          });
        }
        gsap.to(currRef, {
          filter: `blur(${vals.blur.b}px) brightness(${vals.brightness.b})`,
        });
      },
    });
    gsap.to(vals.brightness, {
      a: 0.5,
      b: 1,
      duration: 0.1,
    });
    setCurrentSlide(currRef);
  }

  return (
    <section
      className={`${styles.reviews} py-18  relative overflow-hidden`}
      id="reviews"
    >
      <div className="container mx-auto grid grid-cols-[3fr_2fr]">
        <div>
          <HashTitle />
          <Button className="pl-12 bg-(--green)">Join now</Button>
        </div>
        <div className="flex flex-col-reverse items-center gap-6 reviews-cards relative">
          <div className="grid grid-cols-2 gap-3 text-5xl font-[Bitcount]">
            <button
              ref={prevRef}
              className={`${styles["button"]} rounded-full w-16 h-16 flex items-center justify-start p-4 pl-5`}
              onClick={() => {
                if (!swiperRef.current) return;

                if (swiperRef.current.isBeginning) {
                  swiperRef.current.slideTo(
                    swiperRef.current.slides.length - 1,
                  );
                } else {
                  swiperRef.current.slidePrev();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 16"
                fill="none"
                className="rotate-180"
              >
                <path
                  d="M1.66399 15.968L1.63199 16H1.59999C1.40799 16 1.22665 15.9787 1.05599 15.936C0.906655 15.872 0.767988 15.7973 0.639988 15.712C0.511988 15.6053 0.394655 15.488 0.287988 15.36C0.202655 15.232 0.127988 15.0933 0.063988 14.944C0.0213212 14.7733 -1.21593e-05 14.592 -1.21593e-05 14.4V14.368L0.0319879 14.336H1.66399V15.968ZM1.53599 15.968V14.336H3.16799L3.19999 14.368V14.4C3.19999 14.592 3.16799 14.7733 3.10399 14.944C3.06132 15.0933 2.98665 15.232 2.87999 15.36C2.79465 15.488 2.68799 15.6053 2.55999 15.712C2.43199 15.7973 2.28265 15.872 2.11199 15.936C1.96265 15.9787 1.79199 16 1.59999 16H1.56799L1.53599 15.968ZM1.53599 12.832L1.56799 12.8H1.59999C1.79199 12.8 1.96265 12.832 2.11199 12.896C2.28265 12.9387 2.43199 13.0133 2.55999 13.12C2.68799 13.2053 2.79465 13.312 2.87999 13.44C2.98665 13.568 3.06132 13.7173 3.10399 13.888C3.16799 14.0373 3.19999 14.208 3.19999 14.4V14.432L3.16799 14.464H1.53599V12.832ZM1.66399 12.832V14.464H0.0319879L-1.21593e-05 14.432V14.4C-1.21593e-05 14.208 0.0213212 14.0373 0.063988 13.888C0.127988 13.7173 0.202655 13.568 0.287988 13.44C0.394655 13.312 0.511988 13.2053 0.639988 13.12C0.767988 13.0133 0.906655 12.9387 1.05599 12.896C1.22665 12.832 1.40799 12.8 1.59999 12.8H1.63199L1.66399 12.832ZM1.66399 3.168L1.63199 3.2H1.59999C1.40799 3.2 1.22665 3.17867 1.05599 3.136C0.906655 3.072 0.767988 2.99733 0.639988 2.912C0.511988 2.80533 0.394655 2.688 0.287988 2.56C0.202655 2.432 0.127988 2.29333 0.063988 2.144C0.0213212 1.97333 -1.21593e-05 1.792 -1.21593e-05 1.6V1.568L0.0319879 1.536H1.66399V3.168ZM1.53599 3.168V1.536H3.16799L3.19999 1.568V1.6C3.19999 1.792 3.16799 1.97333 3.10399 2.144C3.06132 2.29333 2.98665 2.432 2.87999 2.56C2.79465 2.688 2.68799 2.80533 2.55999 2.912C2.43199 2.99733 2.28265 3.072 2.11199 3.136C1.96265 3.17867 1.79199 3.2 1.59999 3.2H1.56799L1.53599 3.168ZM1.53599 0.0319996L1.56799 0H1.59999C1.79199 0 1.96265 0.0319999 2.11199 0.0959997C2.28265 0.138666 2.43199 0.213332 2.55999 0.32C2.68799 0.405333 2.79465 0.511999 2.87999 0.639999C2.98665 0.767999 3.06132 0.917332 3.10399 1.088C3.16799 1.23733 3.19999 1.408 3.19999 1.6V1.632L3.16799 1.664H1.53599V0.0319996ZM1.66399 0.0319996V1.664H0.0319879L-1.21593e-05 1.632V1.6C-1.21593e-05 1.408 0.0213212 1.23733 0.063988 1.088C0.127988 0.917332 0.202655 0.767999 0.287988 0.639999C0.394655 0.511999 0.511988 0.405333 0.639988 0.32C0.767988 0.213332 0.906655 0.138666 1.05599 0.0959997C1.22665 0.0319999 1.40799 0 1.59999 0H1.63199L1.66399 0.0319996ZM4.86399 12.768L4.83199 12.8H4.79999C4.60799 12.8 4.42665 12.7787 4.25599 12.736C4.10665 12.672 3.96799 12.5973 3.83999 12.512C3.71199 12.4053 3.59465 12.288 3.48799 12.16C3.40265 12.032 3.32799 11.8933 3.26399 11.744C3.22132 11.5733 3.19999 11.392 3.19999 11.2V11.168L3.23199 11.136H4.86399V12.768ZM4.73599 12.768V11.136H6.36799L6.39999 11.168V11.2C6.39999 11.392 6.36799 11.5733 6.30399 11.744C6.26132 11.8933 6.18666 12.032 6.07999 12.16C5.99465 12.288 5.88799 12.4053 5.75999 12.512C5.63199 12.5973 5.48265 12.672 5.31199 12.736C5.16265 12.7787 4.99199 12.8 4.79999 12.8H4.76799L4.73599 12.768ZM4.73599 9.632L4.76799 9.6H4.79999C4.99199 9.6 5.16265 9.632 5.31199 9.696C5.48265 9.73867 5.63199 9.81333 5.75999 9.92C5.88799 10.0053 5.99465 10.112 6.07999 10.24C6.18666 10.368 6.26132 10.5173 6.30399 10.688C6.36799 10.8373 6.39999 11.008 6.39999 11.2V11.232L6.36799 11.264H4.73599V9.632ZM4.86399 9.632V11.264H3.23199L3.19999 11.232V11.2C3.19999 11.008 3.22132 10.8373 3.26399 10.688C3.32799 10.5173 3.40265 10.368 3.48799 10.24C3.59465 10.112 3.71199 10.0053 3.83999 9.92C3.96799 9.81333 4.10665 9.73867 4.25599 9.696C4.42665 9.632 4.60799 9.6 4.79999 9.6H4.83199L4.86399 9.632ZM4.86399 6.368L4.83199 6.4H4.79999C4.60799 6.4 4.42665 6.37867 4.25599 6.336C4.10665 6.272 3.96799 6.19733 3.83999 6.112C3.71199 6.00533 3.59465 5.888 3.48799 5.76C3.40265 5.632 3.32799 5.49333 3.26399 5.344C3.22132 5.17333 3.19999 4.992 3.19999 4.8V4.768L3.23199 4.736H4.86399V6.368ZM4.73599 6.368V4.736H6.36799L6.39999 4.768V4.8C6.39999 4.992 6.36799 5.17333 6.30399 5.344C6.26132 5.49333 6.18666 5.632 6.07999 5.76C5.99465 5.888 5.88799 6.00533 5.75999 6.112C5.63199 6.19733 5.48265 6.272 5.31199 6.336C5.16265 6.37867 4.99199 6.4 4.79999 6.4H4.76799L4.73599 6.368ZM4.73599 3.232L4.76799 3.2H4.79999C4.99199 3.2 5.16265 3.232 5.31199 3.296C5.48265 3.33867 5.63199 3.41333 5.75999 3.52C5.88799 3.60533 5.99465 3.712 6.07999 3.84C6.18666 3.968 6.26132 4.11733 6.30399 4.288C6.36799 4.43733 6.39999 4.608 6.39999 4.8V4.832L6.36799 4.864H4.73599V3.232ZM4.86399 3.232V4.864H3.23199L3.19999 4.832V4.8C3.19999 4.608 3.22132 4.43733 3.26399 4.288C3.32799 4.11733 3.40265 3.968 3.48799 3.84C3.59465 3.712 3.71199 3.60533 3.83999 3.52C3.96799 3.41333 4.10665 3.33867 4.25599 3.296C4.42665 3.232 4.60799 3.2 4.79999 3.2H4.83199L4.86399 3.232ZM8.06399 9.568L8.03199 9.6H7.99999C7.80799 9.6 7.62665 9.57867 7.45599 9.536C7.30665 9.472 7.16799 9.39733 7.03999 9.312C6.91199 9.20533 6.79465 9.088 6.68799 8.96C6.60265 8.832 6.52799 8.69333 6.46399 8.544C6.42132 8.37333 6.39999 8.192 6.39999 8V7.968L6.43199 7.936H8.06399V9.568ZM7.93599 9.568V7.936H9.56799L9.59999 7.968V8C9.59999 8.192 9.56799 8.37333 9.50399 8.544C9.46132 8.69333 9.38665 8.832 9.27999 8.96C9.19465 9.088 9.08799 9.20533 8.95999 9.312C8.83199 9.39733 8.68266 9.472 8.51199 9.536C8.36266 9.57867 8.19199 9.6 7.99999 9.6H7.96799L7.93599 9.568ZM7.93599 6.432L7.96799 6.4H7.99999C8.19199 6.4 8.36266 6.432 8.51199 6.496C8.68266 6.53867 8.83199 6.61333 8.95999 6.72C9.08799 6.80533 9.19465 6.912 9.27999 7.04C9.38665 7.168 9.46132 7.31733 9.50399 7.488C9.56799 7.63733 9.59999 7.808 9.59999 8V8.032L9.56799 8.064H7.93599V6.432ZM8.06399 6.432V8.064H6.43199L6.39999 8.032V8C6.39999 7.808 6.42132 7.63733 6.46399 7.488C6.52799 7.31733 6.60265 7.168 6.68799 7.04C6.79465 6.912 6.91199 6.80533 7.03999 6.72C7.16799 6.61333 7.30665 6.53867 7.45599 6.496C7.62665 6.432 7.80799 6.4 7.99999 6.4H8.03199L8.06399 6.432Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <button
              ref={nextRef}
              className={`${styles["button"]} rounded-full w-16 h-16 flex items-center justify-end p-4 pr-5`}
              onClick={() => {
                if (!swiperRef.current) return;

                if (swiperRef.current.isEnd) {
                  swiperRef.current.slideTo(0);
                } else {
                  swiperRef.current.slideNext();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 16"
                fill="none"
              >
                <path
                  d="M1.66399 15.968L1.63199 16H1.59999C1.40799 16 1.22665 15.9787 1.05599 15.936C0.906655 15.872 0.767988 15.7973 0.639988 15.712C0.511988 15.6053 0.394655 15.488 0.287988 15.36C0.202655 15.232 0.127988 15.0933 0.063988 14.944C0.0213212 14.7733 -1.21593e-05 14.592 -1.21593e-05 14.4V14.368L0.0319879 14.336H1.66399V15.968ZM1.53599 15.968V14.336H3.16799L3.19999 14.368V14.4C3.19999 14.592 3.16799 14.7733 3.10399 14.944C3.06132 15.0933 2.98665 15.232 2.87999 15.36C2.79465 15.488 2.68799 15.6053 2.55999 15.712C2.43199 15.7973 2.28265 15.872 2.11199 15.936C1.96265 15.9787 1.79199 16 1.59999 16H1.56799L1.53599 15.968ZM1.53599 12.832L1.56799 12.8H1.59999C1.79199 12.8 1.96265 12.832 2.11199 12.896C2.28265 12.9387 2.43199 13.0133 2.55999 13.12C2.68799 13.2053 2.79465 13.312 2.87999 13.44C2.98665 13.568 3.06132 13.7173 3.10399 13.888C3.16799 14.0373 3.19999 14.208 3.19999 14.4V14.432L3.16799 14.464H1.53599V12.832ZM1.66399 12.832V14.464H0.0319879L-1.21593e-05 14.432V14.4C-1.21593e-05 14.208 0.0213212 14.0373 0.063988 13.888C0.127988 13.7173 0.202655 13.568 0.287988 13.44C0.394655 13.312 0.511988 13.2053 0.639988 13.12C0.767988 13.0133 0.906655 12.9387 1.05599 12.896C1.22665 12.832 1.40799 12.8 1.59999 12.8H1.63199L1.66399 12.832ZM1.66399 3.168L1.63199 3.2H1.59999C1.40799 3.2 1.22665 3.17867 1.05599 3.136C0.906655 3.072 0.767988 2.99733 0.639988 2.912C0.511988 2.80533 0.394655 2.688 0.287988 2.56C0.202655 2.432 0.127988 2.29333 0.063988 2.144C0.0213212 1.97333 -1.21593e-05 1.792 -1.21593e-05 1.6V1.568L0.0319879 1.536H1.66399V3.168ZM1.53599 3.168V1.536H3.16799L3.19999 1.568V1.6C3.19999 1.792 3.16799 1.97333 3.10399 2.144C3.06132 2.29333 2.98665 2.432 2.87999 2.56C2.79465 2.688 2.68799 2.80533 2.55999 2.912C2.43199 2.99733 2.28265 3.072 2.11199 3.136C1.96265 3.17867 1.79199 3.2 1.59999 3.2H1.56799L1.53599 3.168ZM1.53599 0.0319996L1.56799 0H1.59999C1.79199 0 1.96265 0.0319999 2.11199 0.0959997C2.28265 0.138666 2.43199 0.213332 2.55999 0.32C2.68799 0.405333 2.79465 0.511999 2.87999 0.639999C2.98665 0.767999 3.06132 0.917332 3.10399 1.088C3.16799 1.23733 3.19999 1.408 3.19999 1.6V1.632L3.16799 1.664H1.53599V0.0319996ZM1.66399 0.0319996V1.664H0.0319879L-1.21593e-05 1.632V1.6C-1.21593e-05 1.408 0.0213212 1.23733 0.063988 1.088C0.127988 0.917332 0.202655 0.767999 0.287988 0.639999C0.394655 0.511999 0.511988 0.405333 0.639988 0.32C0.767988 0.213332 0.906655 0.138666 1.05599 0.0959997C1.22665 0.0319999 1.40799 0 1.59999 0H1.63199L1.66399 0.0319996ZM4.86399 12.768L4.83199 12.8H4.79999C4.60799 12.8 4.42665 12.7787 4.25599 12.736C4.10665 12.672 3.96799 12.5973 3.83999 12.512C3.71199 12.4053 3.59465 12.288 3.48799 12.16C3.40265 12.032 3.32799 11.8933 3.26399 11.744C3.22132 11.5733 3.19999 11.392 3.19999 11.2V11.168L3.23199 11.136H4.86399V12.768ZM4.73599 12.768V11.136H6.36799L6.39999 11.168V11.2C6.39999 11.392 6.36799 11.5733 6.30399 11.744C6.26132 11.8933 6.18666 12.032 6.07999 12.16C5.99465 12.288 5.88799 12.4053 5.75999 12.512C5.63199 12.5973 5.48265 12.672 5.31199 12.736C5.16265 12.7787 4.99199 12.8 4.79999 12.8H4.76799L4.73599 12.768ZM4.73599 9.632L4.76799 9.6H4.79999C4.99199 9.6 5.16265 9.632 5.31199 9.696C5.48265 9.73867 5.63199 9.81333 5.75999 9.92C5.88799 10.0053 5.99465 10.112 6.07999 10.24C6.18666 10.368 6.26132 10.5173 6.30399 10.688C6.36799 10.8373 6.39999 11.008 6.39999 11.2V11.232L6.36799 11.264H4.73599V9.632ZM4.86399 9.632V11.264H3.23199L3.19999 11.232V11.2C3.19999 11.008 3.22132 10.8373 3.26399 10.688C3.32799 10.5173 3.40265 10.368 3.48799 10.24C3.59465 10.112 3.71199 10.0053 3.83999 9.92C3.96799 9.81333 4.10665 9.73867 4.25599 9.696C4.42665 9.632 4.60799 9.6 4.79999 9.6H4.83199L4.86399 9.632ZM4.86399 6.368L4.83199 6.4H4.79999C4.60799 6.4 4.42665 6.37867 4.25599 6.336C4.10665 6.272 3.96799 6.19733 3.83999 6.112C3.71199 6.00533 3.59465 5.888 3.48799 5.76C3.40265 5.632 3.32799 5.49333 3.26399 5.344C3.22132 5.17333 3.19999 4.992 3.19999 4.8V4.768L3.23199 4.736H4.86399V6.368ZM4.73599 6.368V4.736H6.36799L6.39999 4.768V4.8C6.39999 4.992 6.36799 5.17333 6.30399 5.344C6.26132 5.49333 6.18666 5.632 6.07999 5.76C5.99465 5.888 5.88799 6.00533 5.75999 6.112C5.63199 6.19733 5.48265 6.272 5.31199 6.336C5.16265 6.37867 4.99199 6.4 4.79999 6.4H4.76799L4.73599 6.368ZM4.73599 3.232L4.76799 3.2H4.79999C4.99199 3.2 5.16265 3.232 5.31199 3.296C5.48265 3.33867 5.63199 3.41333 5.75999 3.52C5.88799 3.60533 5.99465 3.712 6.07999 3.84C6.18666 3.968 6.26132 4.11733 6.30399 4.288C6.36799 4.43733 6.39999 4.608 6.39999 4.8V4.832L6.36799 4.864H4.73599V3.232ZM4.86399 3.232V4.864H3.23199L3.19999 4.832V4.8C3.19999 4.608 3.22132 4.43733 3.26399 4.288C3.32799 4.11733 3.40265 3.968 3.48799 3.84C3.59465 3.712 3.71199 3.60533 3.83999 3.52C3.96799 3.41333 4.10665 3.33867 4.25599 3.296C4.42665 3.232 4.60799 3.2 4.79999 3.2H4.83199L4.86399 3.232ZM8.06399 9.568L8.03199 9.6H7.99999C7.80799 9.6 7.62665 9.57867 7.45599 9.536C7.30665 9.472 7.16799 9.39733 7.03999 9.312C6.91199 9.20533 6.79465 9.088 6.68799 8.96C6.60265 8.832 6.52799 8.69333 6.46399 8.544C6.42132 8.37333 6.39999 8.192 6.39999 8V7.968L6.43199 7.936H8.06399V9.568ZM7.93599 9.568V7.936H9.56799L9.59999 7.968V8C9.59999 8.192 9.56799 8.37333 9.50399 8.544C9.46132 8.69333 9.38665 8.832 9.27999 8.96C9.19465 9.088 9.08799 9.20533 8.95999 9.312C8.83199 9.39733 8.68266 9.472 8.51199 9.536C8.36266 9.57867 8.19199 9.6 7.99999 9.6H7.96799L7.93599 9.568ZM7.93599 6.432L7.96799 6.4H7.99999C8.19199 6.4 8.36266 6.432 8.51199 6.496C8.68266 6.53867 8.83199 6.61333 8.95999 6.72C9.08799 6.80533 9.19465 6.912 9.27999 7.04C9.38665 7.168 9.46132 7.31733 9.50399 7.488C9.56799 7.63733 9.59999 7.808 9.59999 8V8.032L9.56799 8.064H7.93599V6.432ZM8.06399 6.432V8.064H6.43199L6.39999 8.032V8C6.39999 7.808 6.42132 7.63733 6.46399 7.488C6.52799 7.31733 6.60265 7.168 6.68799 7.04C6.79465 6.912 6.91199 6.80533 7.03999 6.72C7.16799 6.61333 7.30665 6.53867 7.45599 6.496C7.62665 6.432 7.80799 6.4 7.99999 6.4H8.03199L8.06399 6.432Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              slideRef.current = swiper.slides[swiper.activeIndex];
              setCurrentSlide(slideRef.current);
            }}
            onSlideChange={(swiper) => {
              slideRef.current = swiper.slides[swiper.activeIndex];
              animateSLides(currentSlide, slideRef.current);
            }}
            className="min-w-0 w-full"
            modules={[A11y, EffectCards]}
            effect="cards"
            grabCursor={true}
            slidesPerView={1}
            initialSlide={1}
            speed={450}
            style={{ width: 360 }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper: SwiperType) => {
              const navigation = swiper.params.navigation as any;
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }}
            cardsEffect={{
              perSlideOffset: 44,
              perSlideRotate: 0,
              rotate: true,
              slideShadows: false,
            }}
          >
            <SwiperSlide>
              <ReviewCard
                src={img1.src}
                name="Anna"
                age="24"
                profit="$2,100"
                quote="Pirate ipsum matey scallywag rum brigantine. Keelhaul bilge rat marooned."
              />
            </SwiperSlide>

            <SwiperSlide>
              <ReviewCard
                src={img2.src}
                name="Johny"
                age="26"
                profit="$1,500"
                quote="Pirate ipsum arrgh bounty warp jack. Lee line heave chantey rat lugsail shiver pounders."
              />
            </SwiperSlide>

            <SwiperSlide>
              <ReviewCard
                src={img3.src}
                name="Mark"
                age="31"
                profit="$3,400"
                quote="Pirate ipsum galleon jib cutlass. Black spot ballast aye crow's nest."
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
