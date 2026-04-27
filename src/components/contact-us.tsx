import SubHeadline from "./subheadline";
import Form from "./form";

export default function ContactUs() {
  return (
    <section className="container mx-auto flex gap-30">
      <div className="max-w-[470px]">
        <SubHeadline>contact us</SubHeadline>
        <h2 className="text-5xl">Pirate ipsum league spanker shot.</h2>
        <p>
          Pirate ipsum arrgh bounty warp jack. Jolly parrel keelhaul spyglass
          hogshead seven jones' blow gangway tea. Jolly lee arrgh belaying fer
          deck quarterdeck cup spanish.
        </p>
      </div>
      <Form />
    </section>
  );
}
