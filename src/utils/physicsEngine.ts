import { Bubble, Vector2D, CollisionResult, PhysicsConfig } from '../models/TechStack';

export class PhysicsEngine {
  private config: PhysicsConfig;

  constructor(config: PhysicsConfig) {
    this.config = config;
  }

  updateBubble(bubble: Bubble, canvasWidth: number, canvasHeight: number): Bubble {
    if (bubble.isDragging) return bubble;

    let newX = bubble.x + bubble.vx;
    let newY = bubble.y + bubble.vy;
    let newVx = bubble.vx;
    let newVy = bubble.vy;

    if (newX <= bubble.radius || newX >= canvasWidth - bubble.radius) {
      newVx = -newVx * this.config.damping;
      newX = Math.max(bubble.radius, Math.min(canvasWidth - bubble.radius, newX));
    }

    if (newY <= bubble.radius || newY >= canvasHeight - bubble.radius) {
      newVy = -newVy * this.config.damping;
      newY = Math.max(bubble.radius, Math.min(canvasHeight - bubble.radius, newY));
    }

    newVx *= this.config.airResistance;
    newVy *= this.config.airResistance;

    const speed = Math.sqrt(newVx * newVx + newVy * newVy);
    if (speed > this.config.maxVelocity) {
      newVx = (newVx / speed) * this.config.maxVelocity;
      newVy = (newVy / speed) * this.config.maxVelocity;
    }

    return {
      ...bubble,
      x: newX,
      y: newY,
      vx: newVx,
      vy: newVy
    };
  }

  checkCollision(bubbleA: Bubble, bubbleB: Bubble): CollisionResult {
    const dx = bubbleB.x - bubbleA.x;
    const dy = bubbleB.y - bubbleA.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = bubbleA.radius + bubbleB.radius;

    if (distance < minDistance && distance > 0) {
      const separationVector: Vector2D = {
        x: (dx / distance) * (minDistance - distance) * 0.5,
        y: (dy / distance) * (minDistance - distance) * 0.5
      };

      return {
        bubbleA,
        bubbleB,
        hasCollision: true,
        separationVector
      };
    }

    return {
      bubbleA,
      bubbleB,
      hasCollision: false
    };
  }

  resolveCollision(collision: CollisionResult): { bubbleA: Bubble; bubbleB: Bubble } {
    if (!collision.hasCollision || !collision.separationVector) {
      return { bubbleA: collision.bubbleA, bubbleB: collision.bubbleB };
    }

    const { bubbleA, bubbleB, separationVector } = collision;

    const newBubbleA: Bubble = {
      ...bubbleA,
      x: bubbleA.x - separationVector.x,
      y: bubbleA.y - separationVector.y,
      vx: bubbleB.vx * this.config.collisionDamping,
      vy: bubbleB.vy * this.config.collisionDamping
    };

    const newBubbleB: Bubble = {
      ...bubbleB,
      x: bubbleB.x + separationVector.x,
      y: bubbleB.y + separationVector.y,
      vx: bubbleA.vx * this.config.collisionDamping,
      vy: bubbleA.vy * this.config.collisionDamping
    };

    return { bubbleA: newBubbleA, bubbleB: newBubbleB };
  }

  calculateFlingVelocity(startPos: Vector2D, endPos: Vector2D, deltaTime: number): Vector2D {
    const dx = endPos.x - startPos.x;
    const dy = endPos.y - startPos.y;
    const flingMultiplier = Math.min(deltaTime > 0 ? 1000 / deltaTime : 1, 5); // Limit fling speed
    
    return {
      x: Math.max(-this.config.maxVelocity, Math.min(this.config.maxVelocity, dx * 0.2 * flingMultiplier)),
      y: Math.max(-this.config.maxVelocity, Math.min(this.config.maxVelocity, dy * 0.2 * flingMultiplier))
    };
  }

  isPointInBubble(point: Vector2D, bubble: Bubble): boolean {
    const dx = point.x - bubble.x;
    const dy = point.y - bubble.y;
    return Math.sqrt(dx * dx + dy * dy) <= bubble.radius;
  }

  createBubble(
    id: string, 
    tech: any, 
    position: Vector2D, 
    velocity?: Vector2D
  ): Bubble {
    return {
      id,
      x: position.x,
      y: position.y,
      vx: velocity?.x ?? (Math.random() - 0.5) * 4,
      vy: velocity?.y ?? (Math.random() - 0.5) * 4,
      radius: this.config.minRadius + Math.random() * (this.config.maxRadius - this.config.minRadius),
      tech,
      isDragging: false
    };
  }
}

export class BubbleInitializer {
  static circlePattern(
    techData: any[], 
    canvasWidth: number, 
    canvasHeight: number,
    physicsEngine: PhysicsEngine
  ): Bubble[] {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = Math.min(canvasWidth, canvasHeight) * 0.3;

    return techData.map(([id, tech], index) => {
      const angle = (index / techData.length) * 2 * Math.PI;
      const position: Vector2D = {
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100
      };
      
      return physicsEngine.createBubble(id, tech, position);
    });
  }

  static spiralPattern(
    techData: any[], 
    canvasWidth: number, 
    canvasHeight: number,
    physicsEngine: PhysicsEngine
  ): Bubble[] {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    return techData.map(([id, tech], index) => {
      const angle = index * 0.5;
      const radius = index * 15 + 50;
      const position: Vector2D = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
      
      return physicsEngine.createBubble(id, tech, position);
    });
  }

  static randomPattern(
    techData: any[], 
    canvasWidth: number, 
    canvasHeight: number,
    physicsEngine: PhysicsEngine
  ): Bubble[] {
    return techData.map(([id, tech]) => {
      const position: Vector2D = {
        x: 100 + Math.random() * (canvasWidth - 200),
        y: 100 + Math.random() * (canvasHeight - 200)
      };
      
      return physicsEngine.createBubble(id, tech, position);
    });
  }
}