import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useEffect(() => {
    const tween = gsap.to(".window-frame img", {
      scale: window.innerWidth < 768 ? 5 : 12,
      ease: "none",

      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=1800",
        scrub: true,
        markers: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="hero">
      <img
        className="hero-bg"
        src="/clouds_img_sky-hero.webp"
        alt=""
      />

      <div className="clouds">
        <div className="clouds-track">
          <img src="/animated-clouds.webp" alt="" />
          <img src="/animated-clouds.webp" alt="" />
          <img src="/animated-clouds.webp" alt="" />
        </div>
      </div>

      <div className="window-frame">
        <img
          src="/window-view.webp"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#E9E6DF] h-full w-full"></div>
    </section>
  );
}