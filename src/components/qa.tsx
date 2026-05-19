import SubHeadline from "./subheadline";
import styles from "./qa.module.css";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const questionList = [
  {
    question: "What happens after I leave my details?",
    answer:
      "After you submit the form, a manager will contact you to confirm your access, answer key questions, and guide you through the first step. No pressure. Just a clean route from interest to platform.",
  },
  {
    question: "Why does a manager call me?",
    answer:
      "The call helps set up your access correctly. The manager explains how the platform works, what the AI does, and how to start with the required minimum deposit of $250.",
  },
  {
    question: "When do I get access to the platform?",
    answer:
      "After the call and account setup, you receive access to the trading platform. From there, the AI can begin scanning market movement and working with available opportunities on your behalf.",
  },
  {
    question: "Do I need trading experience?",
    answer:
      "No. The platform is built for people who want advanced market technology without living inside charts all day. The AI handles the heavy analytical work while you keep the process simple.",
  },
  {
    question: "How does the AI help with trading?",
    answer:
      "The AI reads market signals, reacts to movement, and helps execute trades with speed and discipline. It is designed to remove guesswork, reduce emotional decisions, and create a sharper path toward potential profit.",
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
