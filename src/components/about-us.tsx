import SubHeadline from "./subheadline";
import img1 from "../assets/about-us/bit.svg";
import img2 from "../assets/about-us//people.svg";
import img3 from "../assets/about-us/zap.svg";

const statsList = [
  {
    value: "142k+",
    text: "Active users operating on autopilot.",
    bg: "bg-(--orange)",
    image: img2.src,
  },
  {
    value: "$1.2B+",
    text: "Net profit captured across our community.",
    bg: "bg-(--green)",
    image: img1.src,
  },
  {
    value: "0.02s",
    text: "Latency from insight to execution. Markets move. We’re already there.",
    bg: "bg-(--black) text-(--white)",
    image: img3.src,
  },
];

function StatCard({
  value,
  text,
  bg,
  image,
  reverse,
}: {
  value: string;
  text: string;
  bg: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <li
      className={`
    flex flex-col
    ${reverse ? "items-end text-right" : "items-start text-left"}
    xl:flex-row xl:justify-between xl:items-start
    gap-3 xl:gap-18
    rounded-[36px]
    p-6 xl:pr-12
    ${bg}
  `}
    >
      <img
        className={`
      order-1
      xl:order-2
      w-20 h-20
    `}
        src={image}
        alt=""
        loading="lazy"
      />

      <div
        className={`
      order-2 xl:order-1 flex flex-col
      ${reverse ? "items-end" : "items-start"}
    `}
      >
        <h3 className="text-6xl xl:text-9xl mt-4 xl:mt-12 mb-6 xl:mb-30">
          {value}
        </h3>

        <p className="text-xl xl:text-2xl">{text}</p>
      </div>
    </li>
  );
}

export default function AboutUs() {
  return (
    <section
      className="py-10 min-[426px]:py-18 px-6 relative tetx"
      id="about-us"
    >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-6">
        <div className="order-first">
          <SubHeadline>about us</SubHeadline>
          <h2 className="text-3xl min-[426px]:text-5xl pb-6">
            The market is noise. Our AI is signal.
          </h2>
          <p>
            We stripped trading of its friction. What remains is
            state-of-the-art AI—autonomous, adaptive, and ruthlessly precise. It
            reads global markets, executes without hesitation, and compounds
            profit while you step away. Near-zero error. Maximum clarity. The
            future doesn’t wait. It trades.
          </p>
        </div>

        {statsList.map((item, i) => (
          <StatCard
            key={i}
            value={item.value}
            text={item.text}
            bg={item.bg}
            image={item.image}
            reverse={i % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}