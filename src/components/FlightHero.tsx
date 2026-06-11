import React from 'react';

const FlightHero = () => {
    return (
        <div className="min-h-screen w-full flex flex-col justify-end pb-12 sm:pb-20 lg:pb-32 bg-transparent font-sans text-[#2A2321] overflow-hidden">
            <div className="w-full px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row justify-between items-start lg:items-end relative z-10 pointer-events-none gap-12 lg:gap-0">

                {/* === MOBILE LAYOUT === */}
                <div className="flex lg:hidden flex-col pointer-events-auto w-full">
                    <h1 className="text-[5.5rem] sm:text-7xl font-medium tracking-tighter leading-[0.8] mb-8">
                        Fly in<br />
                        <span className="ml-16 sm:ml-24">Luxury</span>
                    </h1>
                    <p className="text-2xl sm:text-3xl font-medium leading-tight">
                        Luxury <br />
                        that moves <br />
                        with you
                    </p>
                </div>

                {/* === DESKTOP LAYOUT (Left Side) === */}
                <div className="hidden lg:flex flex-col pointer-events-auto">
                    <h1 className="text-8xl lg:text-[11rem] font-medium tracking-tighter leading-none mb-6">
                        Fly in
                    </h1>
                    <p className="text-2xl lg:text-3xl font-medium leading-tight ml-2">
                        Luxury <br />
                        that moves <br />
                        with you
                    </p>
                </div>

                {/* Right Section (Shared Bottom Text, but Title hidden on mobile) */}
                <div className="flex flex-col pointer-events-auto w-full max-w-lg mt-auto lg:mt-0">
                    <h1 className="hidden lg:block text-8xl lg:text-[11rem] font-medium tracking-tighter leading-none mb-12">
                        Luxury
                    </h1>

                    <div className="w-full border-t border-[#2A2321]/20 pt-6">
                        <div className="flex justify-between items-center mb-6 text-xs sm:text-sm font-bold tracking-widest uppercase">
                            <span>Gulfstream</span>
                            <span>650ER</span>
                        </div>
                        <p className="text-sm sm:text-base leading-relaxed font-medium">
                            Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 A1-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FlightHero;