import Button from "./button";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={`${styles.hero} text-(--white)`}>
      <div>
        <svg className="w-full h-full absolute">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="-16"
                dy="16"
                stdDeviation="8"
                floodColor="black"
                floodOpacity="0.5"
              />
            </filter>
            <mask id="heroMask">
              <rect width="100%" height="100%" fill="#fff" />
              <g fontWeight="500" fontFamily="Bitcount, serif">
                <rect width="54%" height="86%" x="50%" y="-5%" rx="36" />
                <text
                  x="-100"
                  y="100%"
                  dy="15"
                  fontSize="160"
                  fill="rgba(0, 0, 0, 1)"
                >
                  WALL STREET/NASDAQ/NEW YORK STOCK EXCHANGE/GOLDMAN
                  SACHS/JPMORGAN CHASE
                </text>
                h
                <text
                  x="-1000"
                  y="100%"
                  fontSize="144"
                  dy="-105"
                  fill="rgba(0, 0, 0, .5)"
                >
                  WALL STREET/NASDAQ/NEW YORK STOCK EXCHANGE/GOLDMAN
                  SACHS/JPMORGAN CHASE
                </text>
                <text
                  x="-1400"
                  y="100%"
                  fontSize="128"
                  dy="-215"
                  fill="rgba(0, 0, 0, .25)"
                >
                  WALL STREET/NASDAQ/NEW YORK STOCK EXCHANGE/GOLDMAN
                  SACHS/JPMORGAN CHASE
                </text>
                <text
                  x="-3300"
                  y="100%"
                  fontSize="128"
                  dy="-320"
                  fill="rgba(0, 0, 0, .125)"
                >
                  WALL STREET/NASDAQ/NEW YORK STOCK EXCHANGE/GOLDMAN
                  SACHS/JPMORGAN CHASE
                </text>
              </g>
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="#1d1d1d"
            mask="url(#heroMask)"
          />
          <rect
            width="54%"
            height="86%"
            x="50%"
            y="-5%"
            rx="36"
            fill="#1d1d1d"
            filter="url(#shadow)"
            mask="url(#heroMask)"
          />
        </svg>
        <div className="absolute w-full h-full flex items-center pl-12">
          <div className="container mx-auto">
            <h1>
              <p className="text-8xl font-medium">Trading was for</p>
              <p className="uppercase font-[Bitcount] text-(--orange) text-[184px] flex gap-15">
                <span>the</span>
                <span>few</span>
              </p>
            </h1>
          </div>
        </div>
      </div>
      <div className="hidden">
        <h1>
          <p className="font-medium text-8xl">And now its for</p>
          <p className="uppercase font-[Bitcount] text-[184px] text-(--green)">
            you
          </p>
          <Button>
            <p>Join Now</p>
          </Button>
        </h1>
      </div>
    </section>
  );
}
