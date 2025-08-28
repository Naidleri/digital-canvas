import { TechStackData, PhysicsConfig } from '../models/TechStack';

export const techStackData: TechStackData = {
  react: { 
    name: 'React', 
    icon: 'devicon-react-original colored', 
    color: '#61DAFB',
    category: 'Frontend',
    description: 'Modern React with Hooks, Context API, and performance optimization. Building dynamic and interactive user interfaces with component-based architecture.'
  },
  
  html: { 
    name: 'HTML5', 
    icon: 'devicon-html5-plain', 
    color: '#E34F26',
    category: 'Frontend',
    description: 'Semantic markup and modern web standards. Creating structured, accessible, and SEO-friendly web content with latest HTML5 features.'
  },
  
  css: { 
    name: 'CSS3', 
    icon: 'devicon-css3-plain', 
    color: '#1572B6',
    category: 'Frontend',
    description: 'Modern CSS with Grid, Flexbox, and animations. Creating responsive, beautiful, and interactive user interfaces with advanced styling techniques.'
  },
  
  tailwind: { 
    name: 'Tailwind CSS', 
    icon: 'devicon-tailwindcss-original colored', 
    color: '#06B6D4',
    category: 'Styling',
    description: 'Utility-first CSS framework for rapid UI development. Building custom designs quickly without writing custom CSS from scratch.'
  },

  javascript: { 
    name: 'JavaScript', 
    icon: 'devicon-javascript-plain colored', 
    color: '#F7DF1E',
    category: 'Language',
    description: 'Modern ES6+ JavaScript development. Mastering async/await, destructuring, modules, and advanced JavaScript patterns for web development.'
  },
  
  typescript: { 
    name: 'TypeScript', 
    icon: 'devicon-typescript-plain colored', 
    color: '#3178C6',
    category: 'Language',
    description: 'Type-safe JavaScript development with advanced type patterns. Enhanced developer experience with static typing and better IDE support.'
  },
  
  dart: { 
    name: 'Dart', 
    icon: 'devicon-dart-plain colored', 
    color: '#0175C2',
    category: 'Language',
    description: 'Modern language for Flutter development. Object-oriented programming with strong typing and excellent performance for mobile apps.'
  },
  
  kotlin: { 
    name: 'Kotlin', 
    icon: 'devicon-kotlin-plain colored', 
    color: '#7F52FF',
    category: 'Language',
    description: 'Modern Android development language. Concise, safe, and fully interoperable with Java for building robust Android applications.'
  },

  flutter: { 
    name: 'Flutter', 
    icon: 'devicon-flutter-plain colored', 
    color: '#02569B',
    category: 'Mobile',
    description: 'Cross-platform mobile development with Dart. Building beautiful, natively compiled applications for mobile from a single codebase.'
  },
  
  jetpack: { 
    name: 'Jetpack Compose', 
    icon: 'devicon-jetpackcompose-plain-wordmark colored    ', 
    color: '#3DDC84',
    category: 'Mobile',
    description: 'Modern Android UI toolkit. Declarative UI development for Android with less code, powerful tools, and intuitive Kotlin APIs.'
  },

  laravel: { 
    name: 'Laravel', 
    icon: 'devicon-laravel-original colored', 
    color: '#FF2D20',
    category: 'Backend',
    description: 'Elegant PHP framework for web development. Building robust web applications with expressive syntax, ORM, and comprehensive ecosystem.'
  },
  
  postman: { 
    name: 'Postman', 
    icon: 'devicon-postman-plain colored', 
    color: '#FF6C37',
    category: 'API Testing',
    description: 'API development and testing platform. Streamlining API workflow with testing, documentation, and collaboration tools for development teams.'
  },

  figma: { 
    name: 'Figma', 
    icon: 'devicon-figma-plain colored', 
    color: '#1ABCFE',
    category: 'Design',
    description: 'Collaborative interface design tool. Creating stunning user interfaces, prototypes, and design systems with real-time collaboration features.'
  },
  
  photoshop: { 
    name: 'Adobe Photoshop', 
    icon: 'devicon-photoshop-plain colored', 
    color: '#31A8FF',
    category: 'Design',
    description: 'Digital image editing and design. Professional photo manipulation, graphic design, and digital art creation for web and mobile projects.'
  },

  github: { 
    name: 'GitHub', 
    icon: 'devicon-github-original', 
    color: '#181717',
    category: 'Version Control',
    description: 'Git repository hosting and collaboration platform. Managing code versions, collaborating with teams, and maintaining project documentation.'
  }
};

export const physicsConfig: PhysicsConfig = {
  damping: 0.8,
  airResistance: 0.99,
  maxVelocity: 15,
  minRadius: 40,
  maxRadius: 60,
  collisionDamping: 0.8
};

export const canvasConfig = {
  defaultWidth: 800,
  defaultHeight: 600,
  backgroundColor: '#ffffff',
  gridColor: '#f3f4f6',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOffset: { x: 3, y: 3 }
};

export const categoryColors: Record<string, string> = {
  'Frontend': '#3b82f6',
  'Language': '#10b981', 
  'Styling': '#06b6d4',
  'Mobile': '#8b5cf6',
  'Backend': '#ef4444',
  'API Testing': '#f59e0b',
  'Design': '#ec4899',
  'Version Control': '#6b7280'
};

export const bubblePatterns = {
  circle: 'circle',
  spiral: 'spiral', 
  random: 'random',
  grid: 'grid'
} as const;

export type BubblePattern = keyof typeof bubblePatterns;