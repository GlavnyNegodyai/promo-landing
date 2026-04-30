import SubHeadline from "./subheadline";
import img1 from "../assets/about-us/Frame 5.svg";

export default function AboutUs() {
  return (
    <section className="py-18 h-full">
      <div className="grid grid-cols-2 gap-18 container mx-auto">
        <ul className="text-(--white)">
          <li className="flex justify-between items-start gap-18 bg-(--orange) rounded-[36px] p-6 pr-12">
            <div className="flex flex-col">
              <h3 className="text-9xl mt-12 mb-30">50k+</h3>
              <p className="text-2xl">
                Pirate ipsum arrgh bounty warp jack, hogshead lass yard just
                run.
              </p>
            </div>
            <img src={img1.src} alt="" loading="lazy" />
          </li>
          <li className="flex justify-between items-start gap-18 bg-(--green) rounded-[36px] p-6 pr-12">
            <div className="flex flex-col">
              <h3 className="text-9xl mt-12 mb-30">50k+</h3>
              <p className="text-2xl">
                Pirate ipsum arrgh bounty warp jack, hogshead lass yard just
                run.
              </p>
            </div>
            <img src={img1.src} alt="" loading="lazy" />
          </li>
          <li className="flex justify-between items-start gap-18 bg-(--black) rounded-[36px] p-6 pr-12">
            <div className="flex flex-col">
              <h3 className="text-9xl mt-12 mb-30">50k+</h3>
              <p className="text-2xl">
                Pirate ipsum arrgh bounty warp jack, hogshead lass yard just
                run.
              </p>
            </div>
            <img src={img1.src} alt="" loading="lazy" />
          </li>
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
