import styles from "./reviews.module.css";
import Button from "./button";

import img1 from "../assets/reviews/1.webp";
import img2 from "../assets/reviews/2.webp";
import img3 from "../assets/reviews/3.webp";

type ReviewCardProps = {
  src: string;
  name: string;
  age: string;
  profit: string;
  quote: string;
};

function ReviewCard({src, name, age, profit, quote}: ReviewCardProps) {
  return (
    <li className={`${styles.card} rounded-4xl p-6`}>
        <div className="flex gap-6">
          <img src={src} alt="" className="rounded-full" />
          <h3 className="font-[Bitcount_Double] text-5xl font-[350]">{`${name}, ${age}`}</h3>
        </div>
        <p className={`${styles["profit"]} font-[Bitcount] text-4xl py-3 font-[350]`}>
          {profit}$
        </p>
        <p className="text-2xl">{quote}</p>
    </li>
  );
}

export default function Reviews() {
  return (
    <section className={`${styles.reviews} py-18 grid grid-cols-2`}>
      <div className="overflow-hidden relative flex items-end">
        <h2 className="text-8xl font-[Bitcount] font-light absolute top-0">
          <div>
            <span>0a</span>
            <span className="text-(--white)">look</span>
            <span>2cf24dba5fb0a2cf24dba5fb0</span>
          </div>
          <div>
            <span>c7</span>
            <span className="text-(--white)">what_our</span>
            <span>9f86d081884c79f86d081884c7</span>
          </div>
          <div>
            <span>bc42</span>
            <span className="text-(--white)">users</span>
            <span>5d41402abc4b25d41402abc4b2</span>
          </div>
          <div>
            <span>760</span>
            <span className="text-(--white)">say</span>
            <span>7d793037a0767d793037a0760</span>
          </div>
        </h2>
        <Button className="pl-12 bg-(--green)">Join now</Button>
      </div>
      <ul className="flex">
        <ReviewCard
          src={img1.src}
          name="Anna"
          age="24"
          profit="$2,100"
          quote="Pirate ipsum matey scallywag rum brigantine. Keelhaul bilge rat marooned."
        />
        <ReviewCard
          src={img2.src}
          name="Johny"
          age="26"
          profit="$1,500"
          quote="Pirate ipsum arrgh bounty warp jack. Lee line heave chantey rat lugsail shiver pounders."
        />
        <ReviewCard
          src={img3.src}
          name="Mark"
          age="31"
          profit="$3,400"
          quote="Pirate ipsum galleon jib cutlass. Black spot ballast aye crow's nest."
        />
      </ul>
    </section>
  );
}
