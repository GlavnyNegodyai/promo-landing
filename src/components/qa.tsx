import SubHeadline from "./subheadline";
import styles from "./qa.module.css";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const questionList = [
  {
    question: "Why be the rum always gone?",
    answer:
      "Because the crew drank it all after a long day plunderin’ the seven seas. After battles, storms, and long nights under the stars, the barrels never stood a chance. Each pirate claimed his share, and before the moon reached its peak, not a single drop remained. It wasn’t just drink—it was tradition, celebration, and escape from the harsh life aboard a creaking ship surrounded by endless waters.",
  },
  {
    question: "Where can I find buried treasure?",
    answer:
      "Follow the map, trust no one, and dig where the X marks the spot, ye scallywag. But beware, for many maps are cursed or misleading, drawn by hands that sought to deceive. The journey itself is filled with traps, riddles, and rival hunters who would slit a throat for a single coin. Only the cunning, the patient, and the bold ever lay their hands upon true treasure, and even then, it rarely comes without a cost.",
  },
  {
    question: "What makes a good pirate captain?",
    answer:
      "A sharp cutlass, a louder voice, and a heart fearless as the open ocean. A true captain commands respect not through fear alone, but through cunning strategy and unshakable resolve. He must navigate storms both at sea and within his crew, balancing loyalty and discipline. A great captain knows when to fight, when to flee, and when to strike a deal that turns the tide in his favor.",
  },
  {
    question: "How do pirates greet each other?",
    answer:
      "With a hearty ‘Ahoy!’ and a suspicious glance at each other’s pockets. Trust is a rare currency among pirates, and even greetings carry a hint of caution. A smile may hide a dagger, and a friendly nod might be followed by a scheme. Still, among old allies, the greeting can carry warmth, shared memories of voyages, and tales of fortune and loss exchanged over a drink.",
  },
  {
    question: "What do pirates fear the most?",
    answer:
      "A calm sea, empty rum barrels, and the dreaded royal navy on the horizon. But beyond that, pirates fear betrayal from within their own ranks, for mutiny is a silent storm that brews in whispers. They fear being forgotten, their names lost to the winds, and dying without legend or legacy. Above all, they fear losing freedom—the very thing that drove them to the seas in the first place.",
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
          <span className="font-[Bitcount] text-4xl font-light">
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
  const { contextSafe } = useGSAP();

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
        gsap.to(answer, { height: "auto", duration: 0.4, ease: "power2.out" });
        gsap.to(button, {
          rotate: 45,
          color: orangeColorVar,
          fontWeight: "350",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const closeAnswer = (button: HTMLButtonElement, answer:HTMLParagraphElement) => {
        gsap.to(answer, { height: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(button, {
          rotate: 0,
          color: greenColorVar,
          fontWeight: "",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const greenColorVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--green")
        .trim();
      const orangeColorVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--orange")
        .trim();

      const answer = element.querySelector<HTMLParagraphElement>(`.${styles.answer}`);
      const button = element.querySelector<HTMLButtonElement>(
        `.${styles.button}`,
      );

      if (!button || !answer) return;

      console.log(openedElementIndex, i);

      if (openedElementIndex == i) {
        closeAnswer(button, answer);
        setOpened(null);
        console.log("no other accordeon opened");
        return;
      }
      if (openedElementIndex != null) {
        console.log("other opened");
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
    <section className="black-background py-18" id="qa">
      <div className="container mx-auto flex gap-18">
        <ul className="w-full">
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
        <div>
          <SubHeadline>FAQ</SubHeadline>
          <h2 className="text-5xl text-(--white)">
            Frequently Asked Questions
          </h2>
        </div>
      </div>
    </section>
  );
}
