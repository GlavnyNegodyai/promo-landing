import Button from "./button";

export default function Header() {
  return (
    <header className="fixed z-100 px-30 py-4 mt-12 left-6 right-6 bg-(--black) rounded-full text-(--white) container flex justify-between items-center mx-auto">
        <h1 className="font-[Bitcount] text-2xl font-normal uppercase">
          Pixum AI
        </h1>
        <nav>
          <ul className="flex gap-10">
            <li>
              <a href="#about-us">About Us</a>
            </li>
            <li>
              <a href="#calc">Profit Calculator</a>
            </li>
            <li>
              <a href="#press">Press Reviews</a>
            </li>
            <li>
              <a href="#reviews">User Reviews</a>
            </li>
            <li>
              <a href="#qa">Q&A</a>
            </li>
          </ul>
        </nav>
        <Button className="text-(--green) border-2 border-(--green)">
          <span>Join Now</span>
        </Button>
    </header>
  );
}
