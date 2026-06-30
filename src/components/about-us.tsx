import SubHeadline from "./subheadline";
import img1 from "../assets/about-us/bit.svg";
import img2 from "../assets/about-us//people.svg";
import img3 from "../assets/about-us/zap.svg";

import gsap from "gsap";

import { useEffect, useRef } from "react";

import AnimationWrapper from "./animation-wrapper";

import styles from "./about-us.module.css";

const statsList = [
  {
    value: "1,000+",
    text: "Creators matched with brands for focused campaign launches.",
    bg: "bg-(--orange)",
    image: img2.src,
  },
  {
    value: "250+",
    text: "Brand campaigns planned, launched, and optimized with clear goals.",
    bg: "bg-(--green)",
    image: img1.src,
  },
  {
    value: "48h",
    text: "Average time to shortlist relevant creators. Less searching. More action.",
    bg: "bg-(--black) text-(--white)",
    image: img3.src,
  },
];

function StatCard({
  value,
  text,
  bg,
  image,
  cardRef,
}: {
  value: string;
  text: string;
  bg: string;
  image: string;
  cardRef: (el: HTMLElement | null) => void;
}) {

  return (
    <li
      className={`
    flex flex-col
    xl:flex-row xl:justify-between xl:items-start
    rounded-[36px]
    p-6 xl:pr-12 bottom-0
    absolute
    min-h-[284px]
    h-full
    sm:h-fit
    w-full
    ${bg}
  `}
      ref={cardRef}
    >
      <img
        className={`
      order-1
      xl:order-2
      max-w-16 max-h-16 md:max-h-20 md:max-w-20
    `}
        src={image}
        alt=""
        loading="lazy"
      />

      <div
        className={`
      order-2 xl:order-1 flex flex-col
    `}
      >
        <h3 className="text-6xl xl:text-9xl mt-4 xl:mt-12 mb-6 xl:mb-18">
          {value}
        </h3>

        <p className="text-xl xl:text-2xl">{text}</p>
      </div>
    </li>
  );
}

export default function AboutUs() {
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const cardsWrapperRef = useRef<HTMLUListElement | null>(null);
    const cardDist = 600;
    const scaleMax = 1.00;
    const cardsOffset = 40;

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: "#about-us",
        start: "top top",
        end: "bottom bottom",
      },
    });

    cardsRef.current.forEach((cardRef, i) => {
      const newZindex = i + 1;
      const oldScale = scaleMax - i * 0.05;
      const newScale = scaleMax - (cardsRef.current.length - i) * 0.05;
      const currCardDist = cardDist - (i - 1) * cardsOffset;
      (i + 1) % cardsRef.current.length == 0
        ? tl
            .set(cardRef, {
              zIndex: newZindex,
            })
            .fromTo(
              cardRef,
              {scale: oldScale },
              {
                y: -currCardDist,
                scale: newScale,
                ease: "power2.inOut",
              },
            )
        : 
        tl
            .fromTo(
              cardRef,
              { scale: oldScale },
              {
                y: -currCardDist,
                scale: newScale,
                ease: "power2.inOut",
              },
            )
            .set(cardRef, {
              zIndex: newZindex,
            });
    });
    return () => {
      tl.kill();
    }
  }, []);

  return (
    <section className="relative h-[300vh] white-background--fixed" id="about-us">
      <div
        className={`px-6 sticky min-[520px]:top-[25vh] top-0 pt-16 min-[426px]:pt-18`}
      >
        <div
          className={`container mx-auto gap-15 lg:gap-20 pb-14 min-[426px]:pb-18 ${styles["about-wrapper"]}`}
        >
          <ul className={`${styles["cards-wrapper"]}`} style={{ transform: `translateY(${cardDist}px)`}} ref={cardsWrapperRef}>
            {statsList.map((item, i) => (
              <StatCard
                key={i}
                value={item.value}
                text={item.text}
                bg={item.bg}
                image={item.image}
                cardRef={(el) => {
                  cardsRef.current[i] = el;
                }}
              />
            ))}
          </ul>
          <div className="px-6">
            <SubHeadline>about us</SubHeadline>
            <AnimationWrapper isHeadline>
              <h2 className="text-3xl min-[426px]:text-5xl pb-6">
                The right creators. The right impact.
              </h2>
            </AnimationWrapper>
            <AnimationWrapper>
              <p>
                We connect companies with creators who actually fit their
                audience, goals, and market. No random outreach. Only smart
                influencer partnerships, clear campaign strategy, and
                advertising built to perform. From creator selection to campaign
                direction, we help brands turn attention into measurable
                business results.
              </p>
            </AnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
