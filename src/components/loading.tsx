import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Loading(){
    const [isLoaded, setIsLoaded] = useState(false);
    const loadRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
    function onLoad() {
        gsap.to(loadRef.current, {opacity: 0, ease:"power2.inOut", duration: 0.4, onComplete: () => {
            setIsLoaded(true);
            window.removeEventListener("load", onLoad);
        }});
    }
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
    }, []);

    if (isLoaded) return null;
    return (
        <section className="bg-(--black) flex items-center justify-center fixed w-full h-full z-1000" ref={loadRef}>
            <div className="font-[Bitcount] text-5xl lg:text-8xl font-light text-(--orange) block flex items-stretch">
                <h1 className="text-(--green)">loading...</h1>
                <div></div>
            </div>
        </section>
    );
}
{/*
    самый простой выход  -добавить анимированную SVG с этими символами + GSAP анимацию которая будет фейдить экран на загрузке
    | / — \ 
*/}