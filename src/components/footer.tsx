import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <svg className="w-full h-full absolute">
        <defs>
          <mask id="footerMask">
            <rect width="100%" height="100%" fill="#fff" />
            <g fontWeight="400" fontFamily="Bitcount, serif">
              <text
                x="-1686px"
                y="80px"
                fontSize="144px"
                fill="rgba(0, 0, 0, 1)"
              >
                neural_net_registry.&lt;PIXUM_AI&gt;.from_pretrained("vision-core-v2.4-alpha",
                cache_dir="/mnt/weights", strict=False)
              </text>
            </g>
          </mask>
        </defs>
        <rect x="2rem" width="880px" height="100%" fill="#EC6519" />
        <rect
          width="100%"
          height="100%"
          fill="#1d1d1d"
          mask="url(#footerMask)"
        />
      </svg>
      <div
        className={`${styles["footer__bottom"]} relative z-100 text-(--grey) p-6 mx-6 font-thin`}
      >
        <p>© 2026 Pixum AI. All rights preserved.</p>
      </div>
    </footer>
  );
}
