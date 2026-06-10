import { useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GulfstreamLanding() {
    const containerRef = useRef(null);
    const heroTextRef = useRef(null);
    const bottomSectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.fromTo(heroTextRef.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: heroTextRef.current,
                        start: "top 90%",
                        once: true
                    }
                }
            );

            gsap.fromTo(bottomSectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: bottomSectionRef.current,
                        start: "top 85%",
                        once: true
                    }
                }
            );

            // === Jet Entrance ===

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".jet-trigger-section",
                    start: "top top",
                    end: "+=4000", // scroll distance to handle the separated phases
                    scrub: 3,
                    pin: true,
                    markers: false
                }
            });

            // Set the initial state before any scrolling happens
            gsap.set(".flying-jet", {
                y: "150vh",
                scale: 4.5
            });

            tl.to(".flying-jet", {
                y: "5vh",
                duration: 3.5,
                ease: "power1.out"
            })

                .to(".flying-jet", {
                    y: "0vh",
                    scale: 1.3,
                    duration: 3.5,
                    ease: "power2.inOut"
                })

                .to(".jet-wireframe", {
                    opacity: 0.6,
                    duration: 1.5,
                    ease: "power1.inOut"
                }, "+=1")

                // The SVG Mask Wipe
                .to("#mask-rect", {
                    attr: { height: 0 },
                    duration: 2.8,
                    ease: "none"
                })

                // scroll buffer
                .to({}, { duration: 1.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#E9E6DF] min-h-screen font-sans text-gray-900 overflow-hidden">

            <section className="relative h-[120vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{ backgroundImage: "url('cloud_01.webp')" }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#f4f2ec]"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-end h-screen pb-32 px-6">
                    <div ref={heroTextRef} className="text-center opacity-0"> {/* opacity-0 prevents flash before JS loads */}
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

            <section className="relative bsg-[#e8e6e1] bg-[#E9E6DF] py-32 px-6 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">

            </section>

            <section className="jet-trigger-section">
                <div className="animation-container">
                    <img src="jet_wireframe.png" className="jet-wireframe" alt="Jet Wireframe Layout" />

                    <svg className="flying-jet" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <filter id="bottom-blur" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="0 15" />
                            </filter>

                            <mask id="clip-mask">
                                <rect id="mask-rect" x="0" y="0" width="1000" height="600" fill="white" filter="url(#bottom-blur)" />
                            </mask>
                        </defs>

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

            <section className="bg-[#e8e6e1] py-32 px-6">
                <div ref={bottomSectionRef} className="max-w-4xl mx-auto text-center opacity-0">
                    <h2 className="text-4xl font-bold mb-6">Experience the Unmatched</h2>
                    <p className="text-xl text-gray-600">The journey continues seamlessly.</p>
                </div>
            </section>

            <footer className="bg-gray-900 text-white py-12 text-center">
                <p className="text-gray-400">© 2026 Gulfstream Aerospace Corporation. All rights reserved.</p>
            </footer>
        </div>
    );
}