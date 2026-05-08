import { useEffect, useRef, useState } from "react";
import SubHeadline from "./subheadline";
import Button from "./button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./calculator.module.css";

function DepositInput({
  setDeposit,
  defaultDeposit,
}: {
  setDeposit: (value: number) => void;
  defaultDeposit: number;
}) {
  return (
    <div className="text-3xl flex rounded-lg border-2 border-(--white)">
      <span className="text-(--orange) px-2 py-1">$</span>
      <input
        type="number"
        className={`${styles["number-input"]} w-30`}
        defaultValue={`${defaultDeposit}`}
        onChange={(e) => setDeposit(Number(e.currentTarget.value))}
        onBlur={(e) => {
          if (Number(e.currentTarget.value) < defaultDeposit) {
            e.currentTarget.value = `${defaultDeposit}`;
            setDeposit(defaultDeposit);
          }
        }}
      />
    </div>
  );
}

type Props = {
  setDuration: React.Dispatch<React.SetStateAction<number>>;
};

function RangeSlider({ setDuration }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [rangeValue, setRangeValue] = useState(1);
  const monthAmount = [1, 3, 6, 9, 12];

  const { contextSafe } = useGSAP();

  const updateRange = (el: HTMLInputElement) => {
    const min = Number(el.min);
    const max = Number(el.max);
    const value = Number(el.value);

    const percent = ((value - min) / (max - min)) * 100;
    el.style.setProperty("--progress", `${percent}%`);
    setDuration(monthAmount[Number(el.value) - 1]);
  };

  useEffect(() => {
    if (!ref.current) return;

    updateRange(ref.current);
    setRangeValue(ref.current.valueAsNumber);

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const snapToClosest = contextSafe((el: HTMLInputElement) => {
    tweenRef.current?.kill();

    const actualValue = Number(el.value);
    const closestValue = Math.round(actualValue);
    const proxy = { value: actualValue };

    tweenRef.current = gsap.to(proxy, {
      value: closestValue,
      duration: 0.2,
      ease: "power2.out",
      onUpdate: () => {
        el.value = String(proxy.value);
        updateRange(el);
        setRangeValue(closestValue);
      },
    });
  });

  return (
    <div className="w-full">
      <input
        ref={ref}
        id="duration-range"
        type="range"
        className={`${styles.range} mb-3`}
        min={1}
        max={5}
        step={0.01}
        onChange={(e) => {
          updateRange(e.currentTarget);
        }}
        onPointerUp={(e) => snapToClosest(e.currentTarget)}
        onTouchEnd={(e) => snapToClosest(e.currentTarget)}
      />
      <ul className="flex justify-between font-[Bitcount] font-extralight">
        {["1m", "3m", "6m", "9m", "1y"].map((label, index) => {
          const value = index + 1;

          return (
            <li
              key={label}
              className={`${styles["range-value"]} ${
                rangeValue === value ? styles["range-value--active"] : ""
              }`}
            >
              <p>{label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Calculator() {
  const [profit, setProfit] = useState({ min: 1000, max: 1500 });
  const defaultDeposit = 250;
  const [deposit, setDeposit] = useState(defaultDeposit);
  const [duration, setDuration] = useState(6);
  const [isLoading, setLoading] = useState(true);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { contextSafe } = useGSAP();

const animateLoading = contextSafe((loading: boolean) => {
  if (!titleRef.current || !buttonRef.current) return;

  if (loading) {
    gsap.to(titleRef.current, {
      backgroundColor: "var(--green)",
      borderRadius: "0.75rem",
      paddingInline: "0.5rem",
      color: "transparent",
      duration: 0.3,
    });

    gsap.to(buttonRef.current, {
      backgroundColor: "var(--grey)",
      scale: 0.96,
      opacity: 0.7,
      duration: 0.3,
    });
  } else {
    gsap.to(titleRef.current, {
      backgroundColor: "transparent",
      color: "var(--green)",
      paddingInline: "0rem",
      duration: 0.3,
    });

    gsap.to(buttonRef.current, {
      backgroundColor: "var(--green)",
      scale: 1,
      opacity: 1,
      duration: 0.3,
    });
  }
});

  useEffect(() => {
    computeProfit();
  }, []);

  useEffect(() => {
    animateLoading(isLoading);
  }, [isLoading]);

  function computeProfit() {
    setLoading(true);
    setTimeout(() => {
      const calculatedProfit =
        Math.round((deposit * Math.PI) / ((21 - (9 + 10)) / 1.5)) *
        duration; /* -What`s nine plus ten? -Twenty one? -you stupid! */
      const newProfitObj = {
        min: calculatedProfit - 42 * 2,
        max: calculatedProfit + 42 * 2,
      };
      setProfit(newProfitObj);
      setLoading(false);
    }, 1000);
  }

  return (
    <section className="orange-background px-8 py-12 pb-18" id="calc">
      <div className={`container mx-auto ${styles["calculator-wrapper"]}`}>
        <div>
          <SubHeadline>calculator</SubHeadline>
          <h2 className="text-5xl pb-6">Pirate ipsum league spanker shot.</h2>
          <p className="text-(--white)">
            Pirate ipsum arrgh bounty warp jack. Jolly parrel keelhaul spyglass
            hogshead seven jones' blow gangway tea. Jolly lee arrgh belaying fer
            deck quarterdeck cup spanish.
          </p>
        </div>

        <div className={`bg-(--black) p-6 pt-8 rounded-3xl text-(--white)`}>
          <h3
            ref={titleRef}
            className={`w-fit font-[Bitcount_Double] text-(--green) text-5xl font-light mb-6 whitespace-nowrap ${styles.profit}`}
          >
            ~{profit.min}-{profit.max}$
          </h3>

          <div>
            <div className="mb-3 flex items-center gap-12">
              <p className="text-3xl font-light mb-2">Deposit</p>
              <DepositInput
                setDeposit={setDeposit}
                defaultDeposit={defaultDeposit}
              />
            </div>

            <div className="flex items-center gap-12 mb-6">
              <label htmlFor="duration-range" className="text-3xl font-light">
                Duration
              </label>
              <RangeSlider setDuration={setDuration} />
            </div>
            <Button
              ref={buttonRef}
              className="bg-(--green) text-(--white) px-8"
              onClick={computeProfit}
              disabled={isLoading}
            >
              Calculate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
