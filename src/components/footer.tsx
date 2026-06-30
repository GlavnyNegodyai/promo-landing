import styles from "./footer.module.css";
import gsap from "gsap";
import { useEffect } from "react";
import { useRef } from "react";

export default function Footer() {
  const footerTextRef = useRef<SVGTextElement | null>(null);
  const orangeRectRef = useRef<SVGRectElement | null>(null);
  useEffect(() => {
    const tl = gsap.timeline({scrollTrigger: {
          invalidateOnRefresh: true,
          trigger: "#contact-us",
          start: "100% 80%",
          end: "120% 100%",
          toggleActions: "play play reverse reverse",
          }});
    tl.fromTo([footerTextRef.current, orangeRectRef.current], {x: -700, opacity: 0}, {x: 0, duration: 3, opacity: 1, ease:"power4.out"});
  });
  return (
    <footer className={styles.footer}>
      <svg className="w-full h-full absolute">
        <defs>
          <mask id="footer-mask">
            <rect width="100%" height="100%" fill="#fff" />
            <g fontWeight="400" fontFamily="Bitcount, serif">
              <text
                x="2rem"
                y="80px"
                fontSize="120px"
                fill="rgba(0, 0, 0, 1)"
                ref={footerTextRef}
              >
                &lt;M.Labs&gt;.from_campaign_brief("ad-v2.4", cache_dir="/mnt/audience-data", strict_fit=True)
              </text>
            </g>
          </mask>
        </defs>
        <rect x="2rem" width="640px" height="100%" fill="#EC6519" ref={orangeRectRef}/>
        <rect
          width="100%"
          height="100%"
          fill="rgb(7, 7, 7)"
          mask="url(#footer-mask)"
        />
      </svg>
      <div
        className={`${styles["footer__bottom"]} relative z-100 text-(--grey) p-6 mx-6 font-thin`}
      >
        <p>© 2026 M.Labs. All rights preserved.</p>
      </div>
    </footer>
  );
}
