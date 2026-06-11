import { useLenisScroll } from './hooks/useLenisScroll';
import HeroScroll from './components/HeroScroll';
import "./App.css";
import PlaneMorph from './components/PlaneMorph';
import Footer from './components/Footer';

export default function App() {
  useLenisScroll();

  return (
    <div className="relative w-full min-h-screen bg-[#141110] selection:bg-neutral-800 selection:text-[#E9E6DF]">

      <main id="luxury-scrolling-stage" className="relative z-10">

        <HeroScroll />
        <PlaneMorph />

        <Footer />

      </main>

    </div>
  );
}

