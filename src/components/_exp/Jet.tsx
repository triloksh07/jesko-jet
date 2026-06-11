import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlightHero from '../FlightHero';
import FlightSpecs from '../FlightSpecs';

gsap.registerPlugin(ScrollTrigger);

export default function GulfstreamLanding() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".jet-trigger-section",
                    start: "top top",
                    end: "+=5000", // Extended duration slightly for the new transitions
                    scrub: 2,
                    pin: true,
                    markers: false
                }
            });

            // 1. Initial Setups
            gsap.set(".hero-container", { y: "100vh", opacity: 0 }); // Hero starts below
            gsap.set(".specs-container", { y: "-100vh", opacity: 0 }); // Specs start above

            gsap.set(".animation-container", {
                y: "250vh", // Jet starts way below
                scale: 3.5
            });

            gsap.set(".jet-wireframe", { opacity: 0 });

            // 2. The Timeline Sequence
            tl
                // Step 1: Hero text slides up from the bottom and anchors there
                .to(".hero-container", {
                    y: "0vh",
                    opacity: 1,
                    duration: 3,
                    ease: "power2.out"
                })

                // Step 2: Jet starts entering the viewport (moves up a bit)
                .to(".animation-container", {
                    y: "50vh", // Moves partially up 
                    duration: 4,
                    ease: "power1.out"
                })

                // Step 3: Text swap! Hero goes down, Specs come down from the top, Jet scales to final spot
                .addLabel("textSwap")
                .to(".hero-container", {
                    y: "100vh",
                    opacity: 0,
                    duration: 3,
                    ease: "power2.inOut"
                }, "textSwap")
                .to(".specs-container", {
                    y: "0vh",
                    opacity: 1,
                    duration: 3,
                    ease: "power2.inOut"
                }, "textSwap")
                .to(".animation-container", {
                    y: "0vh",
                    scale: 1.8,
                    duration: 4,
                    ease: "power2.inOut"
                }, "textSwap") // The jet cross-fades its movement alongside the text swap

                // Step 4: Mask reveal and wireframe merge
                .to("#mask-rect", {
                    attr: { height: 0 },
                    duration: 3.5,
                    ease: "none"
                }, "revealLabel")
                .to(".jet-wireframe", {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power1.out"
                }, "revealLabel")

                // Buffer to allow normal scrolling to resume smoothly
                .to({}, { duration: 1.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        // Added the gradient background here globally so transitions are seamless
        <div ref={containerRef} className="bg-[#E9E6DF] bsg-gradient-to-b from-[#CBE0E8] via-[#E4EBE3] to-[#F7EEe3] min-h-screen font-sans text-gray-900 overflow-x-hidden">

            <section className="jet-trigger-section relative z-20 w-full h-screen flex items-center justify-center overflow-hidden">

                {/* LAYER 1: First Text Section (Slides up from bottom) */}
                <div className="hero-container absolute inset-0 z-10 w-full h-full pointer-events-auto">
                    <FlightHero />
                </div>

                {/* LAYER 2: Second Text Section (Slides down from top) */}
                <div className="specs-container absolute inset-0 z-10 w-full h-full pointer-events-auto">
                    <FlightSpecs />
                </div>

                {/* LAYER 3: Jet Animation Wrapper */}
                <div className="animation-container relative z-20 w-full max-w-5xl aspect-[1000/600] pointer-events-none px-4 md:px-12">

                    <svg
                        className="jet-wireframe absolute inset-0 w-full h-full filter brightness-[0.70] contrast-[1.40]"
                        viewBox="0 0 1000 600"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <image
                            href="jet-wireframe.webp"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                        />
                    </svg>

                    <svg
                        className="flying-jet absolute inset-0 w-full h-full"
                        viewBox="0 0 1000 600"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <filter id="bottom-blur" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="0 15" />
                            </filter>
                            <mask id="clip-mask">
                                <rect id="mask-rect" x="0" y="0" width="1000" height="600" fill="white" filter="url(#bottom-blur)" />
                            </mask>
                        </defs>
                        <image
                            href="jet.webp"
                            width="100%"
                            height="100%"
                            mask="url(#clip-mask)"
                            preserveAspectRatio="xMidYMid meet"
                        />
                    </svg>
                </div>
            </section>
        </div>
    );
}