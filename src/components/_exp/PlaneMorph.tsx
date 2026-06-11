import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlightHero from '../FlightHero';

gsap.registerPlugin(ScrollTrigger);

export default function GulfstreamLanding() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // === Pinned Jet Timeline ===
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".jet-trigger-section",
                    start: "top top",
                    end: "+=4000",
                    scrub: 2,
                    pin: true,
                    markers: false
                }
            });

            gsap.set(".intro-section", {
                opacity: 1
            });

            gsap.set(".animation-container", {
                y: "110vh",
                scale: 3.5
            });

            gsap.set(".jet-wireframe", {
                opacity: 0
            });

            tl
                .to(".animation-container", {
                    y: "0vh",
                    duration: 4,
                    ease: "power1.out"
                })
                .to(".animation-container", {
                    scale: 1.8,
                    duration: 4,
                    ease: "power2.inOut"
                })

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

                .to({}, { duration: 1.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#E9E6DF] min-h-screen font-sans text-gray-900 overflow-x-hidden">

            <section className="jet-trigger-section bg-[#E9E6DF] relative z-20 w-full h-screen flex items-center justify-center overflow-hidden px-4 md:px-12">


                <FlightHero />

                {/* Aspect ratio wrapper box ensures structural uniformity */}
                <div className="animation-container relative w-full max-w-5xl aspect-1000/600">

                    {/* LAYER 1: Separate Wireframe Blueprint SVG Wrapper */}
                    <svg
                        className="jet-wireframe absolute inset-0 w-full h-full pointer-events-none filter brightness-[0.70] contrast-[1.40]"
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

                    {/* LAYER 2: Separate Jet SVG Wrapper */}
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