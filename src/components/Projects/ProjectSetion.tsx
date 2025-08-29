import { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/Project';
import type { Project } from '../../models/Project';

interface FloatingProject extends Project {
  col: number;
  row: number;
  rotation: number;
  scale: number;
  floatOffset: number;
  animationDelay: number;
}

const ProjectSection = () => {
  const [floatingCards, setFloatingCards] = useState<FloatingProject[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [cardAnimations, setCardAnimations] = useState<{[key: string]: boolean}>({});
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateFloatingCards = () => {
      const cards: FloatingProject[] = [];
      const cols = 3;

      projects.forEach((project, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;

        cards.push({
          ...project,
          row,
          col,
          rotation: (Math.random() - 0.5) * 10,
          scale: 0.95 + Math.random() * 0.1,
          floatOffset: Math.random() * Math.PI * 2,
          animationDelay: index * 120,
        });
      });

      setFloatingCards(cards);
    };

    generateFloatingCards();
  }, []);

  // Intersection Observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate cards one by one
          projects.forEach((_, index) => {
            setTimeout(() => {
              setCardAnimations(prev => ({ 
                ...prev, 
                [projects[index].id]: true 
              }));
            }, index * 150); // 150ms delay between each card
          });
        }
      },
      {
        threshold: 0.2,
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

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.02;

      setFloatingCards(prev =>
        prev.map(card => ({
          ...card,
          floatOffset: timeRef.current + card.animationDelay * 0.001,
        }))
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const getCardTransform = (card: FloatingProject) => {
    const floatY = Math.sin(card.floatOffset) * 10;
    const floatX = Math.cos(card.floatOffset * 0.7) * 6;
    const dynamicRotation = Math.sin(card.floatOffset * 0.5) * 2;

    return `
      translate(${floatX}px, ${floatY}px)
      rotate(${card.rotation + dynamicRotation}deg)
      scale(${card.scale + (hoveredCard === card.id ? 0.08 : 0)})
    `;
  };

  return (
    <div ref={sectionRef} className="bg-white py-36 px-16 rounded-t-4xl relative z-20 -mt-8">
      {/* Header */}
      <div className="mb-16">
        <div className="inline-block border-2 border-gray-900 rounded-4xl px-6 py-3">
          <h2 className="text-l font-bold text-gray-900">Projects</h2>
        </div>
        <p className="text-gray-700 text-lg pt-8">
          Floating project cards with gentle animations. Hover to explore each project in detail.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
        {floatingCards.map((card: FloatingProject) => {
          const isHovered = hoveredCard === card.id;
          const isAnimated = cardAnimations[card.id];

          return (
            <div
              key={card.id}
              className={`w-80 h-96 cursor-pointer transition-all duration-700 ease-out flex ${
                isAnimated 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transform: `${getCardTransform(card)} ${!isAnimated ? 'translateY(48px)' : 'translateY(0px)'}`,
                transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => window.open(card.link, '_blank')}
            >
              <div
                className={`w-full h-full flex flex-col rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                  isHovered ? 'border-gray-400 shadow-2xl' : 'border-gray-200 shadow-lg'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${card.color}15, ${card.color}30)`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Card Content */}
                <div className="p-6 flex flex-col h-full relative">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.purpose.map((tag: string) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full border text-xs capitalize transition-all duration-300 ${
                          isHovered
                            ? 'border-gray-400 text-gray-800 bg-white/70'
                            : 'border-gray-300 text-gray-600 bg-white/50'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-2 transition-all duration-300 ${
                      isHovered ? 'text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {card.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed transition-all duration-300 ${
                      isHovered ? 'text-gray-700' : 'text-gray-500'
                    }`}
                  >
                    {card.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {card.techStack.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          isHovered ? 'bg-gray-900 text-white' : 'bg-gray-600 text-gray-100'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex-grow" />

                  <div className="mt-4 w-full h-48 rounded-2xl relative overflow-hidden transition-all duration-700">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />

                    <div
                      className="absolute w-24 h-24 rounded-full transition-all duration-1000 opacity-80"
                      style={{
                        backgroundColor: card.color,
                        top: '10%',
                        right: '10%',
                        transform: isHovered ? 'scale(1.2) rotate(45deg)' : 'scale(1)',
                      }}
                    />
                    <div
                      className="absolute w-16 h-16 rounded-full transition-all duration-1000 opacity-60"
                      style={{
                        backgroundColor: card.color,
                        bottom: '20%',
                        left: '15%',
                        transform: isHovered ? 'scale(0.8) rotate(-30deg)' : 'scale(1)',
                      }}
                    />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm" />
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm" />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="text-center">
                        <div
                          className={`text-4xl font-black transition-all duration-500 ${
                            isHovered ? 'text-white/95' : 'text-white/70'
                          }`}
                        >
                          {card.name
                            .split(' ')
                            .map(word => word[0])
                            .join('')}
                        </div>
                        {isHovered && (
                          <div className="text-white/90 text-xs font-medium mt-2 animate-pulse">
                            Click to view project
                          </div>
                        )}
                      </div>
                    </div>

                    {isHovered && (
                      <div
                        className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at center, ${card.color}20 0%, transparent 70%)`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSection;