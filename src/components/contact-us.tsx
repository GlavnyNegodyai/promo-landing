import SubHeadline from "./subheadline";
import Form from "./form";

export default function ContactUs() {
  return (
    <section
      id="contact-us"
      className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-24 py-10 min-[426px]:py-18 px-6"
    >
      <div className="max-w-117.5">
        <SubHeadline>contact us</SubHeadline>

        <h2 className="text-3xl min-[426px]:text-5xl pb-6">
          Your campaigns start with one move.
        </h2>

        <p>
          Leave your details and we’ll get back to you shortly to discuss your
          brand, campaign goals, and the type of creators you want to work with.
          From the first contact, we help shape a clear route toward a campaign
          built around relevance, strategy, and measurable results.
        </p>

        <p className="pt-4">
          Tell us what you want to launch. We’ll help you find the right
          creators for it.
        </p>
      </div>

      <Form />
    </section>
  );
}
