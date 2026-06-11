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
                    end: "+=4000",
                    scrub: 2,
                    pin: true,
                    markers: false
                }
            });

            // 1. Initial Setups
            gsap.set(".hero-container", {
                y: "100vh",
                opacity: 0
            });

            gsap.set(".intro-section", {
                opacity: 1
            });

            gsap.set(".animation-container", {
                // INCREASED Y-OFFSET: Pushed down to 250vh to account for the 3.5x scale
                y: "250vh",
                scale: 3.5
            });

            gsap.set(".jet-wireframe", {
                opacity: 0
            });

            // 2. Timeline Animation Sequence
            tl
                // Step 1: Slide up the Flight Hero text first
                .to(".hero-container", {
                    y: "0vh",
                    opacity: 1,
                    duration: 3,
                    ease: "power2.out"
                })

                // Buffer: Forces the text animation to fully complete before the jet moves
                .to({}, { duration: 1 })

                // Step 2: Fly the jet into the viewport from the bottom
                .to(".animation-container", {
                    y: "0vh",
                    duration: 4,
                    ease: "power1.out"
                })

                // Step 3: Scale down the jet into resting position
                .to(".animation-container", {
                    scale: 1.8,
                    duration: 4,
                    ease: "power2.inOut"
                })

                // Step 4: Mask reveal and wireframe transition
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

                // Buffer at the end of the scroll
                .to({}, { duration: 1.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#E9E6DF] min-h-screen font-sans text-gray-900 overflow-x-hidden">

            <section className="jet-trigger-section bg-[#E9E6DF] relative z-20 w-full h-screen flex items-center justify-center overflow-hidden">

                <div className="hero-container absolute inset-0 z-10 w-full h-full">
                    <FlightHero />
                </div>

                <FlightSpecs />

                <div className="animation-container relative z-20 w-full max-w-5xl aspect-1000/600 pointer-events-none px-4 md:px-12">

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