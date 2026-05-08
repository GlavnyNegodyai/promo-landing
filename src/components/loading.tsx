import { useEffect, useState } from "react";

export default function Loading(){
    const loadChars = ["\u007C", "\u002F", "\u2014", "\u005C"];
    const [currentChar, setCurrChar] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    document.body.style.overflow = "hidden";
    const loop = () => {
        setCurrChar((prev) => (prev + 1) % loadChars.length);
      timeout = setTimeout(loop, 300);
    };
    loop();

    function onLoad() {
        console.log("+");
        setIsLoaded(true);
        clearTimeout(timeout);
        document.body.style.overflow = "";
        window.removeEventListener("load", onLoad);
    }
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
    return () => {clearTimeout(timeout);
        window.removeEventListener("load", onLoad);
        document.body.style.overflow = "";
    };
    }, []);

    if (isLoaded) return null;
    return (
        <section className="bg-(--black) flex items-center justify-center fixed w-full h-full z-1000">
            <h1 className="font-[Bitcount] text-8xl font-light text-(--orange) block">
                <span className="text-(--green)">loading </span>
                <span>{loadChars[currentChar]}</span>
            </h1>
        </section>
    );
}