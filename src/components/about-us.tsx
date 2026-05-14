import SubHeadline from "./subheadline";
import img1 from "../assets/about-us/Frame 5.svg";

const statsList = [
  {
    value: "50k+",
    text: "Pirate ipsum arrgh bounty warp jack, hogshead lass yard just run.",
    bg: "bg-(--orange)",
    image: img1.src,
  },
  {
    value: "50k+",
    text: "Pirate ipsum arrgh bounty warp jack, hogshead lass yard just run.",
    bg: "bg-(--green)",
    image: img1.src,
  },
  {
    value: "50k+",
    text: "Pirate ipsum arrgh bounty warp jack, hogshead lass yard just run.",
    bg: "bg-(--black)",
    image: img1.src,
  },
];

function StatCard({
  value,
  text,
  bg,
  image,
}: {
  value: string;
  text: string;
  bg: string;
  image: string;
}) {
  return (
    <li
      className={`flex justify-between items-start gap-18 rounded-[36px] p-6 pr-12 ${bg}`}
    >
      <div className="flex flex-col">
        <h3 className="text-9xl mt-12 mb-30">{value}</h3>
        <p className="text-2xl">{text}</p>
      </div>

      <img src={image} alt="" loading="lazy" />
    </li>
  );
}

export default function AboutUs() {
  return (
    <section className="pt-18  relative" id="about-us">
      <div className="grid grid-cols-2 gap-18 container mx-auto h-[300vh]">
        <ul className="text-(--white) sticky z-10 top-0 overflow-y-hidden h-fit">
          {statsList.map((item, i) => (
            <StatCard
              key={i}
              value={item.value}
              text={item.text}
              bg={item.bg}
              image={item.image}
            />
          ))}
        </ul>
        <div>
          <SubHeadline>about us</SubHeadline>
          <h2 className="text-5xl pb-6">Pirate ipsum league spanker shot.</h2>
          <p>
            Pirate ipsum arrgh bounty warp jack. Jolly parrel keelhaul spyglass
            hogshead seven jones' blow gangway tea. Jolly lee arrgh belaying fer
            deck quarterdeck cup spanish.
          </p>
        </div>
      </div>
    </section>
  );
}
