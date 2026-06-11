import  { useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxEffect() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // === 1. Cloud Parallax Effect ===
            // Moves the background at a different speed than the scroll
            gsap.to(".parallax-clouds", {
                y: "20%", // Moves the image down slightly as we scroll down
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Global Scroll Animations for standard sections
            gsap.fromTo(".hero-text", { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".hero-text", start: "top 85%", once: true } });
            gsap.fromTo(".transition-text-block", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".transition-text-block", start: "top 80%", toggleActions: "play none none reverse" } });
            gsap.fromTo(".bottom-section-text", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".bottom-section-text", start: "top 85%", once: true } });

            // === 2. Pinned Jet Timeline with Text Sequencing ===
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".jet-trigger-section",
                    start: "top top",
                    end: "+=5000", // Increased slightly to accommodate the text phases
                    scrub: 1.5,
                    pin: true,
                    markers: false
                }
            });

            // Initial Layout States
            gsap.set(".animation-container", { y: "110vh", scale: 3.5 });
            gsap.set(".jet-wireframe", { opacity: 0 });
            gsap.set(".phase-1-text", { opacity: 0, y: 80 });  // Bottom text initial
            gsap.set(".phase-2-text", { opacity: 0, y: -80 }); // Top text initial

            // PHASE 1: "Bottom Text" enters BEFORE the jet
            tl.to(".phase-1-text", {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power2.out"
            })

                // PHASE 2: Jet begins its massive ascent
                .to(".animation-container", {
                    y: "15vh",         // Move to about 80% into the viewport
                    duration: 4,
                    ease: "power1.out"
                }, "-=1") // Overlap: Jet starts flying up while Phase 1 text is finishing its entrance

                // PHASE 3: THE SWAP (Jet is at 80% view)
                // We use the "textSwap" label to make these three animations happen simultaneously
                .addLabel("textSwap")
                .to(".phase-1-text", { opacity: 0, y: 80, duration: 2, ease: "power2.inOut" }, "textSwap") // Bottom text drops away
                .to(".phase-2-text", { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, "textSwap")   // Top text drops in
                .to(".animation-container", { y: "0vh", scale: 1.6, duration: 2, ease: "power1.inOut" }, "textSwap") // Jet continues moving smoothly during text swap

                // PHASE 4: Scale down and dock natively
                .to(".animation-container", {
                    scale: 1,
                    duration: 3,
                    ease: "power2.inOut"
                })

                // PHASE 5: Mask wipe and wireframe reveal
                .addLabel("revealLabel")
                .to("#mask-rect", { attr: { height: 0 }, duration: 3.5, ease: "none" }, "revealLabel")
                .to(".jet-wireframe", { opacity: 1, duration: 1.5, ease: "power1.out" }, "revealLabel")

                // PHASE 6: Smooth interaction buffer scroll zone
                .to({}, { duration: 1.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#E9E6DF] min-h-screen font-sans text-gray-900 overflow-x-hidden">

            {/* SECTION 1: Hero Block with Parallax Clouds */}
            <section className="hero-section relative h-[120vh] bg-[#E9E6DF] overflow-hidden">
                {/* Parallax Cloud Setup: 
                    Made 130% height and offset top so it has room to translate Y via GSAP 
                */}
                <div
                    className="parallax-clouds absolute -top-[15%] left-0 w-full h-[130%] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('cloud_01.webp')" }}
                ></div>

                {/* Blending Overlay - Unmoved to keep the transition to section 2 flawless */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[#E9E6DF]/40 to-[#E9E6DF] h-full w-full pointer-events-none"></div>

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

                            <button className="flex items-center gap-2 bg-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-50 transition-colors pointer-events-auto">
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

            {/* SECTION 2: Seamless Mid-Zone */}
            <section className="relative bg-[#E9E6DF] py-32 px-6 z-20">
                <div className="transition-text-block max-w-3xl mx-auto text-center opacity-0">
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Aeronautical Canvas</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3 leading-tight">
                        Precision tracking configurations modeled for private transit architectures.
                    </h2>
                </div>
            </section>

            {/* SECTION 3: The Pinned Immersion Sequence */}
            <section className="jet-trigger-section bg-[#E9E6DF] relative z-20 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-12">

                {/* --- NEW: Phase 1 Narrative Text (Enters from Bottom) --- */}
                <div className="phase-1-text absolute bottom-[15%] w-full text-center z-30 pointer-events-none">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">System Initialization</p>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">Approaching the Pinnacle</h3>
                </div>

                {/* --- NEW: Phase 2 Narrative Text (Enters from Top) --- */}
                <div className="phase-2-text absolute top-[15%] w-full text-center z-30 pointer-events-none">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">Coordinates Locked</p>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">Precision Docking Sequence</h3>
                </div>

                <div className="animation-container relative w-full max-w-5xl aspect-[1000/600] z-10">

                    <svg
                        className="jet-wireframe absolute inset-0 w-full h-full pointer-events-none filter brightness-[0.70] contrast-[1.40]"
                        viewBox="0 0 1000 600"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <image href="jet-wireframe.webp" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
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
                        <image href="jet.webp" width="100%" height="100%" mask="url(#clip-mask)" preserveAspectRatio="xMidYMid meet" />
                    </svg>

                </div>
            </section>

            {/* SECTION 4: Tail Transition Content */}
            <section className="bg-[#E9E6DF] py-40 px-6 relative z-20">
                <div className="bottom-section-text max-w-4xl mx-auto text-center opacity-0">
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Experience the Unmatched</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Whether spanning international datelines or micro-adjusting cruising coordinates, flight integrity remains flawlessly realized.
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