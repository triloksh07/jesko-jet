import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer 
      id="about" 
      className="bg-[#E9E6DF] border-t border-black/10 py-24 px-8 md:px-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Dynamic Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-black/10">
          
          {/* Column 1: Core Narrative */}
          <div className="md:col-span-2 space-y-6">
            <span className="text-[10px] font-mono text-[#8D7A70] uppercase tracking-widest font-bold">EXCELLENCE DEFINED</span>
            <h3 
              className="text-2xl sm:text-3.5xl font-sans text-neutral-900 leading-tight tracking-tight uppercase"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              The definitive private<br />aviation charter.
            </h3>
            <p className="text-xs font-light text-neutral-600 leading-relaxed max-w-sm">
              Tailored services centered completely around you. Fly when you want, where you want, on our modern fleet of ultra-long-range jets.
            </p>
          </div>

          {/* Column 2: Quick Anchors */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-neutral-900 uppercase">EXPLORE FLEET</h4>
            <ul className="space-y-2 text-xs font-light text-neutral-600">
              <li><a href="#" className="hover:text-black duration-200">Gulfstream G650ER</a></li>
              <li><a href="#" className="hover:text-black duration-200">Bombardier Global 7500</a></li>
              <li><a href="#" className="hover:text-black duration-200">Our Advantages</a></li>
              <li><a href="#" className="hover:text-black duration-200">Custom Charters</a></li>
            </ul>
          </div>

          {/* Column 3: Global Headquarters */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-[#8D7A70] uppercase">REPRESENTATION</h4>
            <p className="text-xs font-light text-neutral-600 leading-relaxed">
              Jesko Jets Ltd.<br />
              Executive Terminal, Al Maktoum Airport<br />
              Dubai South, UAE
            </p>
            <div className="pt-2">
              <a 
                href="mailto:info@jeskojets.com"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-neutral-900 hover:opacity-70 duration-200 uppercase tracking-wider"
              >
                <span>CONNECT WITH AGENT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Lower Meta Block (Legals, Copyrights, and Brand Seal) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-12 text-neutral-500 text-[10px] font-mono tracking-widest uppercase">
          
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} JESKO JETS. ALL RIGHTS RESERVED.</p>
            <p className="text-[9px] text-neutral-400 font-light">OPERATED BY REGISTERED WORLDWIDE AIR CARRIER CONTRACTORS ONLY.</p>
          </div>

          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-black duration-200">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-black duration-200">TERMS OF SERVICE</a>
          </div>

        </div>

        {/* Huge Ambient typographic branding background */}
        <div className="text-center mt-24 opacity-[0.03] select-none pointer-events-none">
          <span 
            className="text-[10vw] font-bold tracking-[0.4em] text-black uppercase leading-none block font-sans"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Jesko
          </span>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
