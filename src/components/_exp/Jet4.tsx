import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlightHero from '../FlightHero';
import FlightSpecs from '../FlightSpecs';

gsap.registerPlugin(ScrollTrigger);

export default function GulfstreamLanding() {
    const containerRef = useRef(null);

    // useEffect(() => {
    //     const ctx = gsap.context(() => {
    //         const tl = gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: ".jet-trigger-section",
    //                 start: "top top",
    //                 end: "+=5000",
    //                 scrub: 2,
    //                 pin: true,
    //                 // Keeps the pin stable on mobile browsers when the address bar moves
    //                 pinType: ScrollTrigger.isTouch === 1 ? "fixed" : "transform",
    //                 markers: false
    //             }
    //         });

    //         // 1. Initial Setups
    //         gsap.set(".hero-container", { y: "100vh" });
    //         gsap.set(".specs-container", { y: "-100vh" });

    //         gsap.set(".animation-container", {
    //             y: "250vh",
    //             scale: 3.5
    //         });

    //         gsap.set(".jet-wireframe", { opacity: 0 });

    //         tl
    //             // Step 1: Hero text slides up
    //             .to(".hero-container", {
    //                 y: "0vh",
    //                 duration: 3,
    //                 ease: "power2.out"
    //             })
    //             .to({}, { duration: 0.5 })

    //             // Step 2: Jet starts entering
    //             .to(".animation-container", {
    //                 y: "50vh",
    //                 duration: 4,
    //                 ease: "power1.out"
    //             })

    //             // Step 3: THE PURE SLIDE SWAP (Smooth & Slow)
    //             .addLabel("textSwap")
    //             .to(".hero-container", {
    //                 y: "100vh",
    //                 duration: 6,
    //                 ease: "power1.inOut"
    //             }, "textSwap")
    //             .to(".specs-container", {
    //                 y: "0vh",
    //                 duration: 6,
    //                 ease: "power1.inOut"
    //             }, "textSwap")
    //             .to(".animation-container", {
    //                 y: "0vh",
    //                 scale: 1.8,
    //                 duration: 6,
    //                 ease: "power1.inOut"
    //             }, "textSwap")

    //             // Step 4: YOUR ORIGINAL SVG MASK REVEAL
    //             .to("#mask-rect", {
    //                 attr: { height: 0 },
    //                 duration: 4,
    //                 ease: "none"
    //             }, "revealLabel")
    //             .to(".jet-wireframe", {
    //                 opacity: 1,
    //                 duration: 2,
    //                 ease: "power1.out"
    //             }, "revealLabel")

    //             // Buffer to allow normal scrolling to resume smoothly
    //             .to({}, { duration: 1.5 });

    //     }, containerRef);

    //     return () => ctx.revert();
    // }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".jet-trigger-section",
                    start: "top top",
                    end: "+=5000",
                    scrub: 2,
                    pin: true,
                    pinType: ScrollTrigger.isTouch === 1 ? "fixed" : "transform",
                    markers: false
                }
            });

            // 1. Set explicit transform origins to stop browser drift
            gsap.set(".animation-container", {
                transformOrigin: "center center"
            });

            // Set the final resting scale immediately
            gsap.set(".animation-container", { scale: 1.8 });

            // Text initial states
            gsap.set(".hero-container", { y: "100vh" });
            gsap.set(".specs-container", { y: "-100vh" });
            gsap.set(".jet-wireframe", { opacity: 0 });

            tl
                // Step 1: Hero text slides up
                .to(".hero-container", {
                    y: "0vh",
                    duration: 3,
                    ease: "power2.out"
                })
                .to({}, { duration: 0.5 })

                .from(".animation-container", {
                    yPercent: 200, 
                    // y: "200vh",
                    scale: 3.5,
                    duration: 4,
                    ease: "power1.out"
                })

                .addLabel("textSwap")
                .to(".hero-container", {
                    y: "100vh",
                    duration: 6,
                    ease: "power1.inOut"
                }, "textSwap")
                .to(".specs-container", {
                    y: "0vh",
                    duration: 6,
                    ease: "power1.inOut"
                }, "textSwap")

                .to({}, { duration: 6 }, "textSwap")


                .to("#mask-rect", {
                    attr: { height: 0 },
                    duration: 4,
                    ease: "none"
                }, "revealLabel")
                .to(".jet-wireframe", {
                    opacity: 1,
                    duration: 2,
                    ease: "power1.out"
                }, "revealLabel")

                .to({}, { duration: 1.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);
    return (
        <div ref={containerRef} className="bg-[#E9E6DF] min-h-svh font-sans text-gray-900 overflow-x-hidden overscroll-none pointer-events-auto">

            <section className="jet-trigger-section relative z-20 w-full h-svh flex items-center justify-center overflow-hidden">

                <div className="hero-container absolute inset-0 z-10 w-full h-full pointer-events-auto">
                    <FlightHero />
                </div>

                <div className="specs-container absolute inset-0 z-10 w-full h-full pointer-events-auto">
                    <FlightSpecs />
                </div>

                <div className="animation-container relative z-20 w-full max-w-5xl aspect-1000/600 pointer-events-none px-4 md:px-12">

                    <svg
                        className="jet-wireframe absolute inset-0 w-full h-full filter brightness-[0.80] contrast-[1.40]"
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