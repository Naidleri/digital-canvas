export interface TechNode {
  name: string;
  icon: string;
  color: string;
  category: TechCategory;
  description: string;
}

export interface TechStackData {
  [key: string]: TechNode;
}

export interface Bubble {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  tech: TechNode;
  isDragging: boolean;
}

export interface PhysicsConfig {
  damping: number;
  airResistance: number;
  maxVelocity: number;
  minRadius: number;
  maxRadius: number;
  collisionDamping: number;
}

export interface CanvasState {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D | null;
}

export interface MouseInteraction {
  x: number;
  y: number;
  isDown: boolean;
  draggedBubbleId: string | null;
}

export type TechCategory = 
  | 'Frontend' 
  | 'Language' 
  | 'Styling' 
  | 'Mobile' 
  | 'Backend' 
  | 'API Testing' 
  | 'Design' 
  | 'Version Control';

export interface BubbleAnimationState {
  isPlaying: boolean;
  animationFrame: number | null;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface CollisionResult {
  bubbleA: Bubble;
  bubbleB: Bubble;
  hasCollision: boolean;
  separationVector?: Vector2D;
}