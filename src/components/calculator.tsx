import { useEffect, useRef, useState } from "react";
import SubHeadline from "./subheadline";
import Button from "./button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./calculator.module.css";

export default function Calculator() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [rangeValue, setRangeValue] = useState(1);

  useEffect(() => {
    if (!ref.current) return;

    updateRange(ref.current);
    setRangeValue(ref.current.valueAsNumber);
  }, []);

  const { contextSafe } = useGSAP();
  
  
  const updateRange = (el: HTMLInputElement) => {
    const min = Number(el.min);
    const max = Number(el.max);
    const value = Number(el.value);

    const percent = ((value - min) / (max - min)) * 100;
    
    el.style.setProperty("--progress", `${percent}%`);
  };



  const snapToClosest = contextSafe((el: HTMLInputElement) => {
    const actualValue = Number(el.value);
    const closestValue = Math.round(actualValue);

    let proxy = { value: actualValue };

    gsap.to(proxy, {
      value: closestValue,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        el.value = String(proxy.value);
        updateRange(el);
      },
    });

    setRangeValue(closestValue);
  });

  return (
    <section className="orange-background px-8 py-12 pb-18">
      <div className="container mx-auto flex gap-24">
        <div>
          <SubHeadline>calculator</SubHeadline>
          <h2 className="text-5xl pb-6">Pirate ipsum league spanker shot.</h2>
          <p className="text-(--white)">
            Pirate ipsum arrgh bounty warp jack. Jolly parrel keelhaul spyglass
            hogshead seven jones' blow gangway tea. Jolly lee arrgh belaying fer
            deck quarterdeck cup spanish.
          </p>
        </div>
        <div
          className={`${styles.calculator} bg-(--black) p-4 pt-8 rounded-3xl text-(--white)`}
        >
          <h3 className="font-[Bitcount_Double] text-(--green) text-5xl font-light">
            ~1000-1200$
          </h3>
          <div>
            <div>
              <p className="text-3xl font-light">Deposit</p>
              <div></div>
            </div>
            <div className="flex items-center gap-6">
              <label htmlFor="duration-range" className="text-3xl font-light">
                Duration
              </label>
              <div className="w-full">
                <input
                  ref={ref}
                  id="duration-range"
                  type="range"
                  className={`${styles["range"]} mb-3`}
                  min={1}
                  max={5}
                  onChange={(e) => updateRange(e.currentTarget)}
                  onPointerUp={(e) => snapToClosest(e.currentTarget)}
                  onTouchEnd={(e) => snapToClosest(e.currentTarget)}
                  step={0.01}
                />
                <ul className="flex justify-between font-[Bitcount] font-extralight">
                  <li
                    className={`${styles["range-value"]} ${rangeValue == 1 ? styles["range-value--active"] : ""}`}
                  >
                    <p>1m</p>
                  </li>
                  <li
                    className={`${styles["range-value"]} ${rangeValue == 2 ? styles["range-value--active"] : ""}`}
                  >
                    <p>3m</p>
                  </li>
                  <li
                    className={`${styles["range-value"]} ${rangeValue == 3 ? styles["range-value--active"] : ""}`}
                  >
                    <p>6m</p>
                  </li>
                  <li
                    className={`${styles["range-value"]} ${rangeValue == 4 ? styles["range-value--active"] : ""}`}
                  >
                    <p>9m</p>
                  </li>
                  <li
                    className={`${styles["range-value"]} ${rangeValue == 5 ? styles["range-value--active"] : ""}`}
                  >
                    <p>1y</p>
                  </li>
                </ul>
              </div>
            </div>
            <Button className="bg-(--green) text-(--white) px-8">
              Calculate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
