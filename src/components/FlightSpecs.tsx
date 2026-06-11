import React from 'react';

const FlightSpecs = () => {
    return (
        <div className="specs-container absolute inset-0 w-full h-full flex flex-col lg:flex-row justify-between items-start px-6 sm:px-12 lg:px-24 pt-12 lg:pt-24 pb-8 font-sans text-[#2A2321] z-10 pointer-events-none overflow-y-auto lg:overflow-hidden">

            {/* === MOBILE LAYOUT === */}
            <div className="flex lg:hidden flex-col w-full pointer-events-auto pb-12">

                {/* Top Title */}
                <div className="mb-[40vh] sm:mb-[50vh]"> {/* Large bottom margin creates physical space for the jet */}
                    <h2 className="text-lg sm:text-xl font-medium tracking-wide text-gray-700 mb-1">Gulfstream</h2>
                    <h1 className="text-6xl sm:text-7xl font-medium tracking-tighter leading-none">
                        650ER
                    </h1>
                </div>

                {/* Description Section */}
                <div className="flex flex-col w-full mb-10">
                    <h2 className="text-3xl font-medium leading-tight mb-6 tracking-tight">
                        Ultra-long-range<br />Aircraft
                    </h2>
                    <div className="border-t border-[#2A2321]/20 pt-6">
                        <h3 className="text-[0.65rem] font-bold tracking-widest uppercase leading-relaxed mb-4">
                            Direct access to<br />private travel
                        </h3>
                        <p className="text-sm font-medium leading-relaxed">
                            A true time-saving machine it brings Tokyo and New York an hour closer, and at 92% of the speed of sound, it can circle the globe with just a single stop.
                        </p>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="border-t border-[#2A2321]/20 pt-6 mb-8 w-full">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-[0.65rem] sm:text-xs">
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Maximum Operating Range</span><span className="font-bold tracking-wide">11,263 KM</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Speed</span><span className="font-bold tracking-wide">480 KNOTS</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Passenger Capacity</span><span className="font-bold tracking-wide">UP TO 12 SEATS (+1 CABIN SERVER)</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Endurance</span><span className="font-bold tracking-wide">14 HRS (MAXIMUM FOR EUROPEAN BASED AIRCRAFT)</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Baggage Capacity</span><span className="font-bold tracking-wide">5.52 M³</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Cruising Altitude</span><span className="font-bold tracking-wide">15,544 M</span></div>
                    </div>
                </div>

                {/* Specifications List */}
                <div className="border-t border-[#2A2321]/20 pt-6 w-full">
                    <p className="text-[#2A2321]/50 text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase mb-4">Specification</p>
                    <div className="flex flex-col gap-2 text-[0.65rem] sm:text-xs font-bold tracking-wide">
                        <div className="flex justify-between w-full"><span>CABIN LENGTH</span><span>14.05 M²</span></div>
                        <div className="flex justify-between w-full"><span>CABIN WIDTH</span><span>2.49 M²</span></div>
                        <div className="flex justify-between w-full"><span>CABIN HEIGHT</span><span>1.92 M²</span></div>
                    </div>
                </div>
            </div>


            {/* === DESKTOP LAYOUT === */}
            {/* Left Column: Aircraft Details */}
            <div className="hidden lg:flex flex-col w-full max-w-sm pointer-events-auto">
                <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-1">Gulfstream</h2>
                <h1 className="text-[5.5rem] font-medium tracking-tighter leading-none mb-16">
                    650ER
                </h1>

                <div className="border-t border-[#2A2321]/20 pt-6 mb-8">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-xs">
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Maximum Operating Range</span><span className="font-bold tracking-wide">11,263 KM</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Speed</span><span className="font-bold tracking-wide">480 KNOTS</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Passenger Capacity</span><span className="font-bold tracking-wide">UP TO 12 SEATS (+1 CABIN SERVER)</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Endurance</span><span className="font-bold tracking-wide">14 HRS (MAXIMUM FOR EUROPEAN BASED AIRCRAFT)</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Baggage Capacity</span><span className="font-bold tracking-wide">5.52 M³</span></div>
                        <div className="flex flex-col gap-1"><span className="text-[#2A2321]/50 font-bold tracking-widest uppercase">Cruising Altitude</span><span className="font-bold tracking-wide">15,544 M</span></div>
                    </div>
                </div>

                <div className="border-t border-[#2A2321]/20 pt-6">
                    <p className="text-[#2A2321]/50 text-xs font-bold tracking-widest uppercase mb-4">Specification</p>
                    <div className="flex flex-col gap-2 text-xs font-bold tracking-wide">
                        <div className="flex justify-between w-3/4"><span>CABIN LENGTH</span><span>14.05 M²</span></div>
                        <div className="flex justify-between w-3/4"><span>CABIN WIDTH</span><span>2.49 M²</span></div>
                        <div className="flex justify-between w-3/4"><span>CABIN HEIGHT</span><span>1.92 M²</span></div>
                    </div>
                </div>
            </div>

            {/* Right Column: Description */}
            <div className="hidden lg:flex flex-col w-full max-w-[22rem] pointer-events-auto mt-2">
                <h2 className="text-[2.5rem] font-medium leading-tight mb-16 tracking-tight">
                    Ultra-long-range<br />Aircraft
                </h2>

                <div className="border-t border-[#2A2321]/20 pt-8">
                    <h3 className="text-xs font-bold tracking-widest uppercase leading-relaxed mb-8">
                        Direct access to<br />private travel
                    </h3>
                    <p className="text-sm font-medium leading-relaxed">
                        A true time-saving machine it brings Tokyo and New York an hour closer, and at 92% of the speed of sound, it can circle the globe with just a single stop.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default FlightSpecs;