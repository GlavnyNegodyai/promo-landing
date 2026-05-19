import styles from "./powered-by.module.css";

import img1 from "../assets/company-logos/1234.svg";
import img2 from "../assets/company-logos/Vecto12r.svg";
import img3 from "../assets/company-logos/Vector.svg";

export default function PoweredBy() {
  return (
    <section className="grey-background">
      <div
        className={`${styles.grid} text-(--white) py-5 px-6 container mx-auto text-center lg:text-left gap-2`}
      >
        <h2 className="uppercase font-[Bitcount] lg:text-4xl text-3xl">
          Powered by leadfing financial platforms
        </h2>

        <ul className="flex items-center justify-center lg:justify-between gap-4">
          <li>
            <img src={img1.src} alt="" height={55} width={280} loading="lazy" />
          </li>
          <li>
            <img src={img2.src} alt="" height={55} width={280} loading="lazy" />
          </li>
          <li>
            <img src={img3.src} alt="" height={55} width={280} loading="lazy" />
          </li>
        </ul>
      </div>
    </section>
  );
}
