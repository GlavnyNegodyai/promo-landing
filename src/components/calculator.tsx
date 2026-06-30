import { useEffect, useRef, useState } from "react";
import SubHeadline from "./subheadline";
import Button from "./button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./calculator.module.css";

import AnimationWrapper from "./animation-wrapper";

function DepositInput({
  setBudget,
  defaultMRR,
}: {
  setBudget: (value: number) => void;
  defaultMRR: number;
}) {
  return (
    <div className="text-3xl flex rounded-lg border-2 border-(--white)">
      <span className="text-(--orange) px-2 py-1">$</span>
      <input
        type="number"
        className={`${styles["number-input"]} w-full sm:w-30`}
        defaultValue={`${defaultMRR}`}
        onChange={(e) => setBudget(Number(e.currentTarget.value))}
        onBlur={(e) => {
          if (Number(e.currentTarget.value) < defaultMRR) {
            e.currentTarget.value = `${defaultMRR}`;
            setBudget(defaultMRR);
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
      ease: "elastic.out(1, 0.8)",
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

const growthOptions = [
  { name: "Maintain", multiplyer: 0.3 },
  { name: "Grow", multiplyer: 0.5 },
  { name: "Aggressive", multiplyer: 1 },
];

export default function Calculator() {
  const [magicNumber, setMagicNumber] = useState({ min: 42, max: 21 });
  const defaultMRR = 500;
  const [budget, setBudget] = useState(defaultMRR);
  const [growthGoalMultiplyer, setGrowthGoalMultiplyer] = useState(
    growthOptions[0].multiplyer,
  );

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
        opacity: 0.9,
        color: "transparent",
        duration: 0.3,
      });

      gsap.to(buttonRef.current, {
        backgroundColor: "var(--orange)",
        scale: 0.96,
        opacity: 0.5,
        ease: "power4.out",
        duration: 0.01,
      });
    } else {
      gsap.to(titleRef.current, {
        backgroundColor: "transparent",
        opacity: 1,
        color: "var(--green)",
        duration: 0.3,
      });

      gsap.to(buttonRef.current, {
        backgroundColor: "var(--green)",
        scale: 1,
        opacity: 1,
        ease: "power4.out",
        duration: 0.01,
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
        Math.round(((budget * Math.PI) / 3) * growthGoalMultiplyer) * duration;
      const newProfitObj = {
        min: Math.round(calculatedProfit * 0.8),
        max: Math.round(calculatedProfit * 1.2),
      };
      setMagicNumber(newProfitObj);
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
      gap-10 lg:gap-20
      ${styles["calculator-wrapper"]}
    `}
      >
        <div>
          <SubHeadline>calculator</SubHeadline>
          <AnimationWrapper isHeadline>
            <h2 className="text-3xl min-[426px]:text-5xl pb-6">
              Estimate reach. Forecast results.
            </h2>
          </AnimationWrapper>
          <AnimationWrapper>
            <p className="text-(--white)">
              Enter your target monthly revenue, select your campaign timeline,
              and choose your growth goal. Based on these inputs, the calculator
              estimates the advertising budget typically required to support
              your objectives. It is not a guarantee of results, but a practical
              planning tool designed to help you set realistic expectations,
              compare growth scenarios, and understand how much investment may
              be needed to reach your goals.
            </p>
          </AnimationWrapper>
        </div>
        <AnimationWrapper>
          <div className="bg-(--black) p-4 sm:p-6 sm:pt-8 rounded-3xl text-(--white) min-w-0">
            <div
              ref={titleRef}
              className={`w-full font-[Bitcount_Double] text-(--green) text-5xl sm:text-6xl font-light mb-6 flex`}
            >
              <div>~</div>
              <div>
                {magicNumber.min}-&#8203;{magicNumber.max}$
              </div>
            </div>

            <div>
              <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-12">
                <p className={styles.sectionTitle}>Target MRR</p>
                <DepositInput setBudget={setBudget} defaultMRR={defaultMRR} />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-12 mb-6">
                <p className={styles.sectionTitle}>Timeline</p>
                <RangeSlider setDuration={setDuration} />
              </div>

              <div className={styles.growthSection}>
                <p className={styles.sectionTitle}>Growth Goal</p>

                <div className={styles.radioGroup}>
                  {growthOptions.map((option, i) => (
                    <label className={styles.radioLabel} key={i}>
                      <input
                        type="radio"
                        name="growthGoal"
                        value={option.multiplyer}
                        className={styles.radioButton}
                        onChange={(e) =>
                          setGrowthGoalMultiplyer(Number(e.target.value))
                        }
                        defaultChecked={
                          growthOptions.indexOf(option) == 0 && true
                        }
                      />
                      {option.name}
                    </label>
                  ))}
                </div>
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
        </AnimationWrapper>
      </div>
    </section>
  );
}
