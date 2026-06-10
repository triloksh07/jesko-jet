import React, { useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function GulfstreamLanding() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Global Scroll Animation: Hero Text Fade Up
            gsap.fromTo(".hero-text",
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".hero-text",
                        start: "top 85%",
                        once: true
                    }
                }
            );

            // Global Scroll Animation: Transition Section Text Reveal
            gsap.fromTo(".transition-text-block",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".transition-text-block",
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Global Scroll Animation: Bottom Section Fade Up
            gsap.fromTo(".bottom-section-text",
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".bottom-section-text",
                        start: "top 85%",
                        once: true
                    }
                }
            );

            // === Pinned Jet Timeline ===
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".jet-trigger-section",
                    start: "top top",
                    end: "+=4000",
                    scrub: 2, // Slightly lowered for snappier native feel
                    pin: true,
                    markers: false // Turn off for production
                }
            });

            // Initial state layout setup
            gsap.set(".flying-jet-svg", {
                y: "130vh",
                scale: 4.5
            });

            // PHASE 1a: Fly into viewport natively
            tl.to(".flying-jet-svg", {
                y: "0vh",
                duration: 4,
                ease: "power1.out"
            })

                // PHASE 1b: Scale down and dock seamlessly
                .to(".flying-jet-svg", {
                    scale: 1.2,
                    duration: 4,
                    ease: "power2.inOut"
                })

                // PHASE 2: The SVG Mask Wipe (Reveals the wireframe natively stacked below)
                .to("#mask-rect", {
                    attr: { height: 0 },
                    duration: 3.5,
                    ease: "none"
                })

                // PHASE 3: The Scroll Buffer (Absorb interaction before unpinning)
                .to({}, { duration: 1.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#E9E6DF] min-h-screen font-sans text-gray-900 overflow-x-hidden">

            {/* SECTION 1: Hero Block with Custom Clouds Background */}
            <section className="relative h-[120vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{ backgroundImage: "url('cloud_01.webp')" }}
                >
                    {/* Fixed Blend: Transitions perfectly into the main background color #E9E6DF */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E9E6DF]"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-end h-screen pb-32 px-6">
                    <div className="hero-text text-center opacity-0">
                        <div className="flex justify-between items-center w-full max-w-6xl mx-auto mb-16 px-4">
                            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-gray-900">Fly in</h1>
                            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-gray-900">Luxury</h1>
                        </div>

                        <div className="flex flex-col items-center gap-6 mt-8">
                            <p className="text-lg md:text-xl font-medium max-w-md text-gray-800 text-left">
                                Luxury that moves with you.
                            </p>

                            <button className="flex items-center gap-2 bg-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-50 transition-colors">
                                Book the Flight
                                <span className="bg-gray-100 p-2 rounded-full">
                                    <Plane size={18} />
                                </span>
                            </button>

                            <p className="text-sm max-w-xl mt-12 text-gray-700 text-left">
                                GULFSTREAM <span className="float-right font-bold">650ER</span>
                                <br /><br />
                                Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 A1-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: Blending Transition Zone */}
            <section className="relative bg-[#E9E6DF] py-32 px-6 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.03)] border-t border-stone-200/40">
                <div className="transition-text-block max-w-3xl mx-auto text-center opacity-0">
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Engineering Excellence</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3 leading-tight">
                        The intersection of aerodynamic performance and bespoke cabin craft.
                    </h2>
                </div>
            </section>

            {/* SECTION 3: Pinned Immersive Jet Matrix */}
            <section className="jet-trigger-section bg-[#E9E6DF] relative z-20">
                <div className="h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-12">

                    {/* Single unified SVG viewport ensuring perfect structural layout sync */}
                    <svg className="flying-jet-svg w-full max-w-5xl h-auto aspect-1000/600" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <filter id="bottom-blur" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="0 15" />
                            </filter>

                            <mask id="clip-mask">
                                <rect id="mask-rect" x="0" y="0" width="1000" height="600" fill="white" filter="url(#bottom-blur)" />
                            </mask>
                        </defs>

                        {/* BASE LAYER: The wireframe blueprint. Protected from mask effects */}
                        {/* <image
                            href="jet_blueprint.webp"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                        /> */}

                        {/* TOP LAYER: Rendered aircraft model. Controlled dynamically by the clipping mask */}
                        <image
                            href="jesko_jet.webp"
                            width="100%"
                            height="100%"
                            mask="url(#clip-mask)"
                            preserveAspectRatio="xMidYMid meet"
                        />
                    </svg>

                </div>
            </section>

            {/* SECTION 4: Next Phase Content */}
            <section className="bg-[#e8e6e1] py-40 px-6 relative z-20">
                <div className="bottom-section-text max-w-4xl mx-auto text-center opacity-0">
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Experience the Unmatched</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Whether spanning oceans or scaling crosswinds, every detail of the flight profiles remains meticulously calibrated.
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-900 text-white py-12 text-center relative z-20">
                <p className="text-gray-400 text-sm">© 2026 Gulfstream Aerospace Corporation. All rights reserved.</p>
            </footer>
        </div>
    );
}