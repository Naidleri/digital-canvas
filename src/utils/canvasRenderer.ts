import { Bubble } from '../models/TechStack';

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private iconCache: Record<string, HTMLImageElement> = {};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = context;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGrid(gridSize: number = 50, color: string = '#f3f4f6'): void {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.globalAlpha = 0.3;

    for (let x = 0; x <= this.canvas.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y <= this.canvas.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }

    this.ctx.globalAlpha = 1;
  }

  private loadIcon(iconClass: string): Promise<HTMLImageElement> {
    if (this.iconCache[iconClass]) {
      return Promise.resolve(this.iconCache[iconClass]);
    }

    const match = iconClass.match(/devicon-([a-z0-9]+)-([a-z0-9]+)/i);
    if (!match) {
      return Promise.reject(new Error("Invalid devicon class: " + iconClass));
    }

    const [, name, style] = match;
    const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${style}.svg`;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => {
        this.iconCache[iconClass] = img;
        resolve(img);
      };
      img.onerror = (err) => reject(err);
    });
  }

  async preloadIcons(iconClasses: string[]): Promise<void> {
    await Promise.all(
      iconClasses.map(cls => this.loadIcon(cls))
    );
  }

  async drawBubble(bubble: Bubble): Promise<void> {
    const { x, y, radius, tech, isDragging } = bubble;

    this.drawBubbleShadow(x + 3, y + 3, radius);

    this.drawBubbleGradient(x, y, radius, tech.color);

    this.drawBubbleBorder(x, y, radius, tech.color, isDragging);

    this.drawBubbleHighlight(x - radius * 0.3, y - radius * 0.3, radius * 0.2);

    await this.drawBubbleIcon(x, y, tech.icon, radius);

    this.drawBubbleLabel(x, y + radius + 20, tech.name);
  }

  private drawBubbleShadow(x: number, y: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fill();
  }

  private drawBubbleGradient(x: number, y: number, radius: number, color: string): void {
    const gradient = this.ctx.createRadialGradient(
      x - radius * 0.3, 
      y - radius * 0.3, 
      0,
      x, 
      y, 
      radius
    );
    
    gradient.addColorStop(0, color + '40'); 
    gradient.addColorStop(0.7, color + '80'); 
    gradient.addColorStop(1, color + 'FF'); 

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }

  private drawBubbleBorder(x: number, y: number, radius: number, color: string, isDragging: boolean): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = isDragging ? 4 : 2;
    this.ctx.stroke();
  }

  private drawBubbleHighlight(x: number, y: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.fill();
  }

  private drawBubbleIcon(x: number, y: number, iconClass: string, radius: number): void {
    const img = this.iconCache[iconClass];
    if (!img) return; 
    const size = radius * 1.2;
    this.ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  }

  private drawBubbleLabel(x: number, y: number, text: string): void {
    this.ctx.fillStyle = '#333';
    this.ctx.font = '12px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y);
  }

  async drawBubbles(bubbles: Bubble[]): Promise<void> {
    for (const bubble of bubbles) {
      await this.drawBubble(bubble);
    }
  }

  drawInstructions(text: string): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(16, 16, 280, 40);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = '14px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, 24, 36);
  }

  drawStats(fps: number, bubbleCount: number): void {
    const stats = [`FPS: ${fps}`, `Bubbles: ${bubbleCount}`];
    
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(this.canvas.width - 120, 16, 100, 50);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = '12px monospace';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    
    stats.forEach((stat, index) => {
      this.ctx.fillText(stat, this.canvas.width - 110, 26 + index * 16);
    });
  }

  drawParticles(particles: Array<{x: number, y: number, size: number, opacity: number}>): void {
    particles.forEach(particle => {
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = '#60a5fa';
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1;
  }

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  getDimensions(): { width: number; height: number } {
    return {
      width: this.canvas.width,
      height: this.canvas.height
    };
  }

  screenToCanvas(screenX: number, screenY: number): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: screenX - rect.left,
      y: screenY - rect.top
    };
  }
}
