import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  isExiting: boolean;
}

interface LetterAnimations {
  H: boolean;
  A: boolean;
  R: boolean;
  I: boolean;
  S: boolean;
}

type Letter = keyof LetterAnimations;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, isExiting }) => {
  const [letterAnimations, setLetterAnimations] = useState<LetterAnimations>({
    H: false,
    A: false,
    R: false,
    I: false,
    S: false
  });
  const [showSwipe, setShowSwipe] = useState<boolean>(false);

  const letters: Letter[] = ['H', 'A', 'R', 'I', 'S'];

  useEffect(() => {
    letters.forEach((letter: Letter, index: number) => {
      setTimeout(() => {
        setLetterAnimations(prev => ({ ...prev, [letter]: true }));
      }, index * 200); 
    });

    const swipeTimer = setTimeout(() => {
      setShowSwipe(true);
    }, letters.length * 200 + 1000); 

    const completeTimer = setTimeout(() => {
      onComplete();
    }, letters.length * 200 + 2500);

    return () => {
      clearTimeout(swipeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, letters.length]);

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center z-50 transition-transform duration-800 ease-in-out ${
        isExiting ? 'animate-slideUpAndOut' : ''
      }`}
    >
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
        <div 
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-pulse" 
          style={{ animationDelay: '0.5s' }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-60 animate-pulse" 
          style={{ animationDelay: '1s' }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-pulse" 
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      <div className="relative">
        <div className="flex space-x-4 mb-12">
          {letters.map((letter: Letter, index: number) => (
            <div
              key={letter}
              className={`text-8xl lg:text-9xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-1000 ease-out ${
                letterAnimations[letter] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 -translate-y-20 scale-75'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.575)', 
                textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-500 ${
          showSwipe ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-white text-lg font-medium mb-4">Loading Portfolio...</p>
          
          <div className="w-64 h-1 bg-zinc-700 rounded-full mx-auto overflow-hidden">
            <div className={`h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-2000 ease-out ${
              showSwipe ? 'w-full' : 'w-0'
            }`} />
          </div>
        </div>

        {showSwipe && (
          <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 text-center items-center animate-bounce">
            <div className="text-white/70 text-sm mb-2">Swipe up to continue</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUpAndOut {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100vh);
          }
        }

        .animate-slideUpAndOut {
          animation: slideUpAndOut 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Glowing effect for letters */
        .text-transparent {
          background-clip: text;
          -webkit-background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;