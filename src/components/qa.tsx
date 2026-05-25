import SubHeadline from "./subheadline";
import styles from "./qa.module.css";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const questionList = [
  {
    question: "How do you choose the right creators?",
    answer:
      "We look at audience fit, content style, platform relevance, engagement quality, and campaign goals. The point is not to find creators with the biggest numbers, but creators who can speak to the right people.",
  },
  {
    question: "Can you help plan the campaign strategy?",
    answer:
      "Yes. M.Labs helps shape the campaign direction, from creator selection and messaging to platform mix and expected performance. The goal is to make the campaign clear before the budget is spent.",
  },
  {
    question: "Which platforms can campaigns run on?",
    answer:
      "Campaigns can be planned across major social platforms such as Instagram, TikTok, YouTube, and other channels depending on the brand, audience, and campaign objective.",
  },
  {
    question: "How do you estimate campaign results?",
    answer:
      "Estimates are based on previous campaign data, selected platforms, campaign duration, budget, and expected audience behavior. They are not guarantees, but they help brands compare scenarios and plan with more confidence.",
  },
  {
    question: "Do you work with small brands?",
    answer:
      "Yes. A strong creator campaign does not always need a huge brand presence. What matters more is a clear offer, the right audience, and creators who can make the message feel relevant.",
  },
];

function ListElement({
  listNumber,
  question,
  answer,
  onButtonClick,
  refSetter,
}: {
  listNumber: number;
  question: string;
  answer: string;
  onButtonClick: () => void;
  refSetter: (el: HTMLLIElement | null) => void;
}) {
  return (
    <li className={`${styles["list-element"]} text-(--white)`} ref={refSetter}>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-[Bitcount] text-3xl font-light">
            {listNumber}/
          </span>
          <h3 className="text-2xl inline pl-2">{question}</h3>
        </div>
        <button
          className={`${styles.button} leading-12 font-[Bitcount] text-7xl text-(--green) font-extralight`}
          onClick={onButtonClick}
        >
          +
        </button>
      </div>
      <p className={`${styles.answer} pl-6`}>{answer}</p>
    </li>
  );
}

export default function QA() {
  const [opened, setOpened] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const greenColorRef = useRef<string | null>(null);
  const orangeColorRef = useRef<string | null>(null);
  const { contextSafe } = useGSAP();

  useEffect(() => {
    greenColorRef.current = getComputedStyle(document.documentElement)
      .getPropertyValue("--green")
      .trim();
    orangeColorRef.current = getComputedStyle(document.documentElement)
      .getPropertyValue("--orange")
      .trim();
  }, []);

  const handleAccordeon = contextSafe(
    (
      openedElementIndex: number | null,
      i: number,
      element: HTMLLIElement | null,
    ) => {
      if (!element) return;
      let previousElement;
      if (openedElementIndex != null) {
        previousElement = itemsRef.current[openedElementIndex];
      }

      const openAnswer = (
        button: HTMLButtonElement,
        answer: HTMLParagraphElement,
      ) => {
        gsap.to(answer, { height: "100", duration: 0.2, ease: "power2.out" });
        gsap.to(button, {
          rotate: 45,
          color: `${orangeColorRef.current}`,
          fontWeight: "350",
          duration: 0.1,
          ease: "power2.out",
        });
      };

      const closeAnswer = (
        button: HTMLButtonElement,
        answer: HTMLParagraphElement,
      ) => {
        gsap.to(answer, { height: 0, duration: 0.2, ease: "power2.out" });
        gsap.to(button, {
          rotate: 0,
          color: `${greenColorRef.current}`,
          fontWeight: "",
          duration: 0.1,
          ease: "power2.out",
        });
      };

      const answer = element.querySelector<HTMLParagraphElement>(
        `.${styles.answer}`,
      );
      const button = element.querySelector<HTMLButtonElement>(
        `.${styles.button}`,
      );

      if (!button || !answer) return;

      if (openedElementIndex == i) {
        closeAnswer(button, answer);
        setOpened(null);
        return;
      }
      if (openedElementIndex != null) {
        const previousAnswer =
          previousElement?.querySelector<HTMLParagraphElement>(
            `.${styles.answer}`,
          );
        const previousButton =
          previousElement?.querySelector<HTMLButtonElement>(
            `.${styles.button}`,
          );
        if (previousAnswer && previousButton) {
          closeAnswer(previousButton, previousAnswer);
          openAnswer(button, answer);
        }
        setOpened(i);
      } else {
        openAnswer(button, answer);
        setOpened(i);
      }
    },
  );

  return (
    <section className="black-background py-10 min-[426px]:py-18 px-6" id="qa">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-18">
        <ul className="w-full order-2 lg:order-1">
          {questionList.map((questionElement, i) => {
            return (
              <ListElement
                question={questionElement.question}
                answer={questionElement.answer}
                listNumber={i + 1}
                key={i}
                refSetter={(el) => {
                  itemsRef.current[i] = el;
                }}
                onButtonClick={() => {
                  handleAccordeon(opened, i, itemsRef.current[i]);
                }}
              />
            );
          })}
        </ul>

        <div className="order-1 lg:order-2">
          <SubHeadline>FAQ</SubHeadline>
          <h2 className="text-3xl min-[426px]:text-5xl text-(--white)">
            Frequently Asked Questions
          </h2>
        </div>
      </div>
    </section>
  );
}
