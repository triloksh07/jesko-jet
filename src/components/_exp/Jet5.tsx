import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlightHero from '../FlightHero';
import FlightSpecs from '../FlightSpecs';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.normalizeScroll(true);

export default function GulfstreamLanding() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".jet-trigger-section",
                    start: "top top",
                    end: "+=4000",
                    scrub: 1,
                    pin: true,
                    markers: false
                }
            });

            gsap.set(".hero-container", { yPercent: 100 });
            gsap.set(".specs-container", { yPercent: -100 });

            gsap.set(".animation-container", {
                // yPercent: 150,
                // yPercent: 400,
                yPercent: 250,
                scale: 3.5,
                transformOrigin: "center center",
            });

            gsap.set(".jet-wireframe", { opacity: 0 });

            tl
                .to(".hero-container", {
                    yPercent: 0,
                    duration: 3,
                    ease: "power2.out"
                })
                .to({}, { duration: 0.5 })

                .to(".animation-container", {
                    // yPercent: 25, 
                    yPercent: 50, 
                    duration: 4,
                    ease: "power1.out"
                })

                // Step 3: The Swap
                .addLabel("textSwap")
                .to(".hero-container", {
                    yPercent: 100,
                    duration: 6,
                    ease: "power1.inOut"
                }, "textSwap")
                .to(".specs-container", {
                    yPercent: 0,
                    duration: 6,
                    ease: "power1.inOut"
                }, "textSwap")
                .to(".animation-container", {
                    // yPercent: 0,
                    yPercent: -50,
                    scale: 1.8,
                    duration: 6,
                    ease: "power1.inOut"
                }, "textSwap")

                // Step 4: Mask Reveal
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

                // Buffer
                .to({}, { duration: 1.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#E9E6DF] min-h-svh font-sans text-gray-900 overflow-x-hidden overscroll-none">

            {/* Added overflow-hidden directly to the pinned section to prevent rogue scaling from expanding the viewport */}
            <section className="jet-trigger-section relative z-20 w-full h-svh flex items-center justify-center overflow-hidden">

                {/* Keep pointer-events-none if the user shouldn't interact with the text while scrolling */}
                <div className="hero-container absolute inset-0 z-10 w-full h-full pointer-events-none">
                    <FlightHero />
                </div>

                <div className="specs-container absolute inset-0 z-10 w-full h-full pointer-events-none">
                    <FlightSpecs />
                </div>

                <div className="animation-container absolute top-1/2 left-1/2 z-20 w-full max-w-5xl aspect-1000/600 pointer-events-none px-4 md:px-12">

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