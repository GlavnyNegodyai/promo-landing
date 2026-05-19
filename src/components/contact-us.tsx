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
          Your access starts with one move.
        </h2>

        <p>
          Leave your details for our manager to contact
          you shortly, confirm your setup, and guide you toward the platform
          with a clear route from first contact to live AI trading. Built for
          speed, precision, and calm execution while the market keeps moving.
        </p>

        <p className="pt-4">
          Minimum deposit: $250. The next move is already forming.
        </p>
      </div>

      <Form />
    </section>
  );
}
