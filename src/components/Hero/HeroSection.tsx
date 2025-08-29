import { useState, useEffect, useRef } from 'react';
import { Parallax } from 'react-parallax';

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldParallax, setShouldParallax] = useState(false);
  const [textAnimations, setTextAnimations] = useState({
    greeting: false,
    name: false,
    role: false,
    description: false,
    card: false
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);

  const roles = [
    "Mobile Developer",
    "Flutter Developer", 
    "Web Developer",
    "UI/UX Enthusiast",
    "Tech Innovation"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Text animations on scroll/view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          setTimeout(() => setTextAnimations(prev => ({ ...prev, greeting: true })), 200);
          setTimeout(() => setTextAnimations(prev => ({ ...prev, name: true })), 400);
          setTimeout(() => setTextAnimations(prev => ({ ...prev, role: true })), 600);
          setTimeout(() => setTextAnimations(prev => ({ ...prev, description: true })), 800);
          setTimeout(() => setTextAnimations(prev => ({ ...prev, card: true })), 1000);

          setTimeout(() => {
            setShouldParallax(true);
          }, 2000);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const heroContent = (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <div 
        ref={sectionRef}
        className={`absolute inset-0 bg-zinc-900 transition-all duration-1000 ease-out transform-gpu rounded-t-4xl ${
          hasAnimated 
            ? 'scale-100 opacity-100' 
            : 'scale-75 opacity-80'
        }`}
        style={{
          transformOrigin: 'center center',
        }}
      />
      
      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 py-20">
        
        <div className="space-y-8">
          <div className={`space-y-2 transition-all duration-800 ease-out ${
            textAnimations.greeting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}>
            <p className="text-lg text-gray-300 font-medium">
              👋 Hello, I'm
            </p>
          </div>

          <div className={`space-y-2 transition-all duration-900 ease-out ${
            textAnimations.name 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              HARIS
              <span className="block text-4xl lg:text-5xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                FIRMAN ARDIANSYAH
              </span>
            </h1>
          </div>

          <div className={`h-16 flex items-center transition-all duration-1000 ease-out ${
            textAnimations.role 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}>
            <span className="text-xl text-gray-200 mr-3">I'm a passionate</span>
            <div className="relative overflow-hidden h-10">
              <div 
                className="flex flex-col transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${currentRole * 40}px)` }}
              >
                {roles.map((role) => (
                  <span
                    key={role}
                    className="h-10 flex items-center text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1100 ease-out ${
            textAnimations.description 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              A <strong className="text-white">University of Jember</strong> Information Technology student committed to developing 
              <span className="text-blue-400 font-semibold"> innovative mobile applications</span> and 
              <span className="text-purple-400 font-semibold"> effective digital solutions</span>. 
              Ready to contribute to dynamic teams and exceed user expectations.
            </p>
          </div>
        </div>
        
        <div className={`relative transition-all duration-1200 ease-out ${
          textAnimations.card 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-0 translate-x-8 scale-95'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}>
          
          {/* Main Card */}
          <div className="relative bg-zinc-700 rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black transform hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <h3 className="text-xl font-bold text-gray-100">Latest Achievements</h3>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 hover:scale-105 transition-transform duration-200">
                <div className="text-2xl">🏆</div>
                <div>
                  <p className="font-semibold text-gray-900">2nd Place Winner</p>
                  <p className="text-sm text-gray-600">MQTT UI/UX Competition</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:scale-105 transition-transform duration-200">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-semibold text-gray-900">GPA 3.81/4.00</p>
                  <p className="text-sm text-gray-600">Information Technology</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:scale-105 transition-transform duration-200">
                <div className="text-2xl">💼</div>
                <div>
                  <p className="font-semibold text-gray-900">5+ Major Projects</p>
                  <p className="text-sm text-gray-600">Mobile & Web Development</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-200 mb-3">Core Technologies</p>
              <div className="flex flex-wrap gap-2">
                {['Flutter', 'Laravel', 'React', 'Kotlin', 'Firebase'].map((tech, index) => (
                  <span 
                    key={tech}
                    className={`px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-sm font-medium text-gray-700 rounded-full hover:scale-110 transition-all duration-200 ${
                      hasAnimated ? 'animate-fadeInUp' : 'opacity-0'
                    }`}
                    style={{
                      animationDelay: `${1200 + (index * 100)}ms`
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Background blur  */}
          <div className={`absolute -z-10 top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-50 blur-2xl transition-all duration-1000 ${
            hasAnimated ? 'scale-100' : 'scale-75'
          }`}></div>
          <div className={`absolute -z-10 -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-50 blur-2xl transition-all duration-1000 delay-200 ${
            hasAnimated ? 'scale-100' : 'scale-75'
          }`}></div>
        </div>

      </div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-80 transition-all duration-1000 ${
          hasAnimated ? 'scale-100 opacity-80' : 'scale-0 opacity-0'
        }`} style={{ animationDelay: '800ms' }}></div>
        <div className={`absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-80 transition-all duration-1000 ${
          hasAnimated ? 'scale-100 opacity-80' : 'scale-0 opacity-0'
        }`} style={{ animationDelay: '1000ms' }}></div>
        <div className={`absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-80 transition-all duration-1000 ${
          hasAnimated ? 'scale-100 opacity-80' : 'scale-0 opacity-0'
        }`} style={{ animationDelay: '1200ms' }}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300 rounded-full opacity-80 transition-all duration-1000 ${
          hasAnimated ? 'scale-100 opacity-80' : 'scale-0 opacity-0'
        }`} style={{ animationDelay: '1400ms' }}></div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
  if (shouldParallax) {
    return (
      <Parallax
        blur={0}
        bgImage=""
        bgImageAlt=""
        strength={300}
        renderLayer={(percentage) => (
          <div
            style={{
              position: 'absolute',
              background: 'transparent',
              left: '50%',
              top: '50%',
              borderRadius: '50%',
              transform: `translate(-50%, -50%) translateY(${percentage * 200}px)`,
              width: percentage * 500,
              height: percentage * 500,
            }}
          />
        )}
      >
        {heroContent}
      </Parallax>
    );
  }
  return heroContent;
};

export default HeroSection;