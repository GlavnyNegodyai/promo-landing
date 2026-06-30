import Button from "./button";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      if (!headerRef.current) return;
      let position = window.pageYOffset;
      let passDiff = 50;
      let hidden = false;
      let headerDistanceToHide =
        headerRef.current.getBoundingClientRect().bottom;
      const tl = gsap.timeline({ defaults: { overwrite: true } });

      const onScroll = () => {
        let scroll = window.pageYOffset;

        let difference = scroll - position;

        if (difference > passDiff) {
          position = scroll;
          if (!hidden) {
            tl.to(headerRef.current, {
              y: -headerDistanceToHide,
              duration: 0.4,
              ease: "power1.out",
              onStart: () => {
                hidden = true;
              },
            });
          }
        }
        if (difference < -passDiff) {
          position = scroll;
          if (hidden) {
            tl.to(headerRef.current, {
              y: 0,
              duration: 0.4,
              ease: "power1.out",
              onStart: () => {
                hidden = false;
              },
            });
          }
        }
      };

      document.addEventListener("scroll", onScroll);

      return () => {
        document.removeEventListener("scroll", onScroll);
      };
    },
    {
      dependencies: [headerRef],
    },
  );
  return (
    <header
      ref={headerRef}
      className="
    box-border
    fixed z-100
    mt-0 min-[768px]:mt-6 min-[426px]:mt-3 lg:mt-12
    left-0 right-0 min-[426px]:left-4 min-[426px]:right-4 lg:left-6 lg:right-6
    w-auto
    px-4 sm:px-6 md:px-8 lg:px-20
    py-2 lg:py-4
    bg-(--black)/60 text-(--white)
    rounded-none min-[426px]:rounded-full
    flex justify-between items-center
    gap-2
    backdrop-blur-sm
  "
    >
      <h1 className="font-[Bitcount] text-xl lg:text-2xl font-medium uppercase">
        M.Labs
      </h1>

      <nav className="hidden lg:block">
        <ul className="flex gap-10">
          <li>
            <a href="#about-us">About Us</a>
          </li>
          <li>
            <a href="#calc">Calculator</a>
          </li>
          <li>
            <a href="#press">Press</a>
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
        <span>Start now</span>
      </Button>
    </header>
  );
}
