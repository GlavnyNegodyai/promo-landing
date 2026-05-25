import styles from "./footer.module.css";

export default function Footer() {
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
                fontSize="144px"
                fill="rgba(0, 0, 0, 1)"
              >
                &lt;M.Labs&gt;.from_campaign_brief("ad-v2.4", cache_dir="/mnt/audience-data", strict_fit=True)
              </text>
            </g>
          </mask>
        </defs>
        <rect x="2rem" width="700px" height="100%" fill="#EC6519" />
        <rect
          width="100%"
          height="100%"
          fill="#1d1d1d"
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
