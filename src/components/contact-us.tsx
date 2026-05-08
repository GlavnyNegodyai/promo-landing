import SubHeadline from "./subheadline";
import Form from "./form";

export default function ContactUs() {
  return (
    <section className="container mx-auto flex gap-24 py-18">
      <div className="max-w-117.5">
        <SubHeadline>contact us</SubHeadline>
        <h2 className="text-5xl pb-6">Pirate ipsum league spanker shot.</h2>
        <p>
          Pirate ipsum arrgh bounty warp jack. Jolly parrel keelhaul spyglass
          hogshead seven jones' blow gangway tea. Jolly lee arrgh belaying fer
          deck quarterdeck cup spanish.
        </p>
      </div>
        <Form/>
    </section>
  );
}
