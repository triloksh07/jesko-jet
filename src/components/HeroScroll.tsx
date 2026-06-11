import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useEffect(() => {

    gsap.fromTo(
      ".window-shield-wrapper",
      {
        y: "0",
      },
      {
        y: "-47vh",
        opacity: 1,
        duration: 1.4,
        delay: 0.6,
        ease: "power2.inOut",
        markers: true,
      }
    );

    const scrollTween = gsap.to(".window-group", {
      scale: window.innerWidth < 768 ? 5 : 12,
      ease: "none",

      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=1800",
        scrub: true,
        markers: false,
      },
    });

    return () => {
      scrollTween.kill();
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
        <div className="window-group">
          <img
            className="window-main"
            src="/window-view.webp"
            alt=""
          />

          <div className="window-shield-wrapper">
            <div className="window-shield-bg"></div>
            <img className="window-knob" src="/window-knob.webp" alt="" />
          </div>

          <img
            className="window-inner"
            src="/hero-window-inner-frame.webp"
            alt=""
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#E9E6DF] h-full w-full"></div>
    </section>
  );
}