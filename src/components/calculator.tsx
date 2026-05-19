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
        className={`${styles["number-input"]} w-full sm:w-30`}
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
        duration; /* -What`s nine plus ten? -Twenty one? -you`re stupid! */
      const newProfitObj = {
        min: calculatedProfit - 42 * 2,
        max: calculatedProfit + 42 * 2,
      };
      setProfit(newProfitObj);
      setLoading(false);
    }, 1000);
  }

  return (
    <section
      className="orange-background px-6 py-10 min-[426px]:pb-18 min-[426px]:pt-12"
      id="calc"
    >
      <div
        className={`
      container mx-auto
      flex flex-col lg:flex-row
      gap-10 lg:gap-20
      ${styles["calculator-wrapper"]}
    `}
      >
        <div>
          <SubHeadline>calculator</SubHeadline>
          <h2 className="text-3xl min-[426px]:text-5xl pb-6">
            Capital in. Intelligence out.
          </h2>
          <p className="text-(--white)">
            Drop your starting position. Lock in your timeframe. Behind the
            scenes, our model strips market chaos into clean, executable
            signals. What you see is a projection of compounded precision, not
            hopeful marketing. Tweak the inputs. Watch the projection lock in.
            Trade the future, not the noise.
          </p>
        </div>

        <div className="bg-(--black) p-4 sm:p-6 sm:pt-8 rounded-3xl text-(--white) min-w-0">
          <h3
            ref={titleRef}
            className={`w-fit font-[Bitcount_Double] text-(--green) text-4xl sm:text-5xl font-light mb-6 break-all ${styles.profit}`}
          >
            ~{profit.min}-{profit.max}$
          </h3>

          <div>
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-12">
              <p className="text-2xl sm:text-3xl font-light mb-0 sm:mb-2">
                Capital
              </p>
              <DepositInput
                setDeposit={setDeposit}
                defaultDeposit={defaultDeposit}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-12 mb-6">
              <label
                htmlFor="duration-range"
                className="text-2xl sm:text-3xl font-light"
              >
                Timeline
              </label>
              <RangeSlider setDuration={setDuration} />
            </div>

            <Button
              ref={buttonRef}
              className="bg-(--green) text-(--white) px-6 w-full sm:w-auto"
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
