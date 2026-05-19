import SubHeadline from "./subheadline";

type TextblockProps = {
    subHeadline: string,
    headline: string,
    desc?: string

};

export default function TextBlock({ subHeadline, headline, desc }: TextblockProps) {
  return (
    <div>
      <SubHeadline>{subHeadline}</SubHeadline>
      <h2 className="text-3xl min-[426px]:text-5xl">{headline}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}