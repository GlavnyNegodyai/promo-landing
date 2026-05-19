import Button from "./button";

export default function Header() {
  return (
    <header
      className="
    box-border
    fixed z-100
    mt-0 min-[768px]:mt-6 min-[426px]:mt-3 lg:mt-12
    left-0 right-0 min-[426px]:left-4 min-[426px]:right-4 lg:left-6 lg:right-6
    w-auto
    px-2 sm:px-6 md:px-8 lg:px-20
    py-3 lg:py-4
    bg-(--black)/50 text-(--white)
    rounded-none min-[426px]:rounded-full
    flex justify-between items-center
    gap-2
    backdrop-blur-xs
    shadow-lg
    border border-(--grey)/20
  "
    >
      <h1 className="font-[Bitcount] text-xl lg:text-2xl font-medium uppercase">
        Pixum AI
      </h1>

      <nav className="hidden lg:block">
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

      <Button className="text-(--green) border-2 border-(--green)" isForForm>
        <span>Join Now</span>
      </Button>
    </header>
  );
}
