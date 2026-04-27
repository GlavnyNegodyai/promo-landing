import SubHeadline from "./subheadline";
import Button from "./button";

import styles from "./calculator.module.css";

export default function Calculator() {
  return (
    <section className="orange-background px-8 py-12 pb-16">
      <div className="container mx-auto flex gap-30">
        <div>
          <SubHeadline>calculator</SubHeadline>
          <h2 className="text-5xl">Pirate ipsum league spanker shot.</h2>
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
            <div>
              <p className="text-3xl font-light">Duration</p>
              <div></div>
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
