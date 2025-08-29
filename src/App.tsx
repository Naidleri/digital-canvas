import { useEffect } from 'react';
import InteractiveHarisSection from "./components/Interactive/InteractiveSection";
import HeroSection from "./components/Hero/HeroSection";
import ProjectSection from "./components/Projects/ProjectSetion";
import TechStackSection from './components/Tech/TechStackSection';
import Footer from './components/Footer/footerSection';
import GlassNav, {GlassNavMobile} from './components/fragments/GlassNav';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div id='interactive'>
        <InteractiveHarisSection />
      </div>
      <div id='hero' className='text-center'>
        <HeroSection />
      </div>
      <div id='projects'>
        <ProjectSection />
      </div>
      <div id='tech'>
        <TechStackSection />
      </div>
      <div id='footer'>
        <Footer />
      </div>

      <GlassNav />
      <GlassNavMobile />

      <style>{`
        * {
          scroll-behavior: smooth;
        }
        
        /* Optimasi untuk performa animasi */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Custom scrollbar untuk pengalaman yang lebih smooth */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
}

export default App;