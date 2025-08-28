import { useState } from 'react';
import type { MouseEvent } from 'react';

const InteractiveHarisSection = () => {
  const [canvasX, setCanvasX] = useState(0);
  const [canvasY, setCanvasY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
     const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    
    const normalizedX = (mouseX / containerWidth) * 2 - 1;
    const normalizedY = (mouseY / containerHeight) * 2 - 1;
    
    setCanvasX(normalizedX * -300);
    setCanvasY(normalizedY * -600);
  };

  const techIcons = [
    { icon: 'devicon-react-original', name: 'React', color: '#61DAFB', x: -450, y: -500 },
    { icon: 'devicon-nextjs-plain', name: 'Next.js', color: '#000000', x: -150, y: -550 },
    { icon: 'devicon-typescript-original', name: 'TypeScript', color: '#3178C6', x: 150, y: -500 },
    { icon: 'devicon-javascript-plain', name: 'JavaScript', color: '#F7DF1E', x: 450, y: -550 },
    { icon: 'devicon-tailwindcss-plain', name: 'Tailwind CSS', color: '#06B6D4', x: 750, y: -500 },
    { icon: 'devicon-html5-plain', name: 'HTML5', color: '#E34F26', x: -750, y: -400 },
    { icon: 'devicon-css3-plain', name: 'CSS3', color: '#1572B6', x: -450, y: -300 },
    { icon: 'devicon-vuejs-plain', name: 'Vue.js', color: '#4FC08D', x: 750, y: -300 },
    
    { icon: 'devicon-nodejs-plain', name: 'Node.js', color: '#339933', x: -600, y: -150 },
    { icon: 'devicon-express-original', name: 'Express.js', color: '#000000', x: -350, y: -100 },
    { icon: 'devicon-postgresql-plain', name: 'PostgreSQL', color: '#336791', x: -600, y: 100 },
    { icon: 'devicon-mongodb-plain', name: 'MongoDB', color: '#47A248', x: -350, y: 150 },
    { icon: 'devicon-php-plain', name: 'PHP', color: '#777BB4', x: -850, y: 50 },
    { icon: 'devicon-laravel-plain', name: 'Laravel', color: '#FF2D20', x: -600, y: 300 },
    
    { icon: 'devicon-docker-plain', name: 'Docker', color: '#2496ED', x: 500, y: -200 },
    { icon: 'devicon-git-plain', name: 'Git', color: '#F05032', x: 750, y: -100 },
    { icon: 'devicon-github-original', name: 'GitHub', color: '#181717', x: 500, y: 50 },
    { icon: 'devicon-githubactions-plain', name: 'GitHub Actions', color: '#2088FF', x: 800, y: 100 },
    { icon: 'devicon-nginx-original', name: 'Nginx', color: '#009639', x: 550, y: 250 },
    
    { icon: 'devicon-vscode-plain', name: 'VS Code', color: '#007ACC', x: -100, y: -50 },
    { icon: 'devicon-figma-plain', name: 'Figma', color: '#F24E1E', x: 150, y: 80 },
    { icon: 'devicon-linux-plain', name: 'Linux', color: '#FCC624', x: -250, y: 120 },
    { icon: 'devicon-ubuntu-plain', name: 'Ubuntu', color: '#E95420', x: 280, y: -80 },
    
    { icon: 'devicon-vitejs-plain', name: 'Vite', color: '#646CFF', x: -180, y: 260 },
    { icon: 'devicon-webpack-plain', name: 'Webpack', color: '#8DD6F9', x: 320, y: 180 },
    { icon: 'devicon-babel-original', name: 'Babel', color: '#F9DC3E', x: -0, y: -240 },
    { icon: 'devicon-npm-original-wordmark', name: 'NPM', color: '#CB3837', x: 50, y: 220 },
    { icon: 'devicon-yarn-original', name: 'Yarn', color: '#2C8EBB', x: -400, y: 20 },
    
    { icon: 'devicon-amazonwebservices-plain', name: 'AWS', color: '#232F3E', x: -800, y: 600 },
    { icon: 'devicon-firebase-plain', name: 'Firebase', color: '#FFCA28', x: 800, y: 600 },
    { icon: 'devicon-vercel-original', name: 'Vercel', color: '#000000', x: -550, y: 450 },
    
    { icon: 'devicon-python-plain', name: 'Python', color: '#3776AB', x: 900, y: -400 },
    { icon: 'devicon-angular-plain', name: 'Angular', color: '#DD0031', x: -950, y: -300 },
    
    { icon: 'devicon-mysql-original', name: 'MySQL', color: '#4479A1', x: -750, y: 250 },
    { icon: 'devicon-redis-plain', name: 'Redis', color: '#DC382D', x: -400, y: 350 },
    { icon: 'devicon-graphql-plain', name: 'GraphQL', color: '#E10098', x: -850, y: 400 },
    
    { icon: 'devicon-flutter-plain', name: 'Flutter', color: '#02569B', x: 950, y: -200 },
    { icon: 'devicon-android-plain', name: 'Android', color: '#3DDC84', x: 900, y: 50 },
    { icon: 'devicon-kotlin-plain', name: 'Kotlin', color: '#7F52FF', x: 750, y: 200 },

    { icon: 'devicon-jest-plain', name: 'Jest', color: '#C21325', x: 650, y: 500 },
  ];

  return (
    <div 
      className="relative w-full h-screen bg-white overflow-hidden cursor-move"
      onMouseMove={handleMouseMove}
    >
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

      <div 
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${canvasX}px, ${canvasY}px)`,
          width: '400%',
          height: '400%',
          left: '-150%',
          top: '-150%'
        }}
      >
        {techIcons.map((tech, index) => {
          return (
            <div
              key={`${tech.name}-${index}`}
              className="absolute transition-all duration-300 ease-out hover:scale-125 group cursor-pointer z-10"
              style={{
                left: `calc(50% + ${tech.x}px)`,
                top: `calc(50% + ${tech.y}px)`,
                transform: 'translate(-50%, -50%)',
                minWidth: '120px',
                minHeight: '120px',
              }}
            >
              <div 
                className="w-24 h-24 flex items-center justify-center rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-2 hover:border-4"
                style={{ 
                  borderColor: tech.color + '40',
                  boxShadow: `0 8px 32px ${tech.color}30`
                }}
              >
                <i 
                  className={`${tech.icon}`}
                  style={{ 
                    color: tech.color,
                    fontSize: '48px'
                  }}
                />
              </div>
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-20">
                <div className="relative">
                  <span 
                    className="text-sm font-bold px-3 py-2 rounded-lg text-white shadow-xl whitespace-nowrap block"
                    style={{ backgroundColor: tech.color }}
                  >
                    {tech.name}
                  </span>
                  <div 
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{ backgroundColor: tech.color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        {[...Array(30)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-20"
            style={{
              left: `${15 + (i * 8) % 85}%`,
              top: `${15 + ((i * 11) % 75)}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <h1 className="font-black text-black select-none tracking-wider drop-shadow-lg
               text-[clamp(3rem,12vw,10rem)]">
          HARIS
        </h1>
      </div>
    </div>
  );
};

export default InteractiveHarisSection;