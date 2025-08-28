import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Play, Pause, Activity } from 'lucide-react';

import { TechNode, Bubble, BubbleAnimationState, MouseInteraction } from '../../models/TechStack';
import { techStackData, physicsConfig } from '../../data/techStackData';
import { PhysicsEngine, BubbleInitializer } from '../../utils/physicsEngine';
import { CanvasRenderer } from '../../utils/canvasRenderer';

const TechStackSection: React.FC = () => {
  const [, setSelectedNode] = useState<TechNode | null>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [animationState, setAnimationState] = useState<BubbleAnimationState>({
    isPlaying: true,
    animationFrame: null
  });
  const [mouseInteraction, setMouseInteraction] = useState<MouseInteraction>({
    x: 0,
    y: 0,
    isDown: false,
    draggedBubbleId: null
  });
  const [fps, setFps] = useState<number>(60);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsEngineRef = useRef<PhysicsEngine>(new PhysicsEngine(physicsConfig));
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      rendererRef.current = new CanvasRenderer(canvas);
    } catch (error) {
      console.error('Failed to initialize canvas renderer:', error);
    }
  }, []);

  const initializeBubbles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const techEntries = Object.entries(techStackData);
    const newBubbles = BubbleInitializer.circlePattern(
      techEntries,
      canvas.width,
      canvas.height,
      physicsEngineRef.current
    );

    setBubbles(newBubbles);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const renderer = rendererRef.current;
    
    if (!canvas || !container || !renderer) return;

    const rect = container.getBoundingClientRect();
    renderer.resize(rect.width, rect.height);
    
    if (bubbles.length === 0) {
      initializeBubbles();
    }
  }, [bubbles.length, initializeBubbles]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (!animationState.isPlaying) return;

    const animate = (currentTime: number) => {
      const canvas = canvasRef.current;
      const renderer = rendererRef.current;
      if (!canvas || !renderer) return;

      frameCountRef.current++;
      if (currentTime - lastFrameTimeRef.current > 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (currentTime - lastFrameTimeRef.current)));
        frameCountRef.current = 0;
        lastFrameTimeRef.current = currentTime;
      }

      // Update physics
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => 
          physicsEngineRef.current.updateBubble(bubble, canvas.width, canvas.height)
        )
      );

      const nextFrame = requestAnimationFrame(animate);
      setAnimationState(prev => ({ ...prev, animationFrame: nextFrame }));
    };

    const initialFrame = requestAnimationFrame(animate);
    setAnimationState(prev => ({ ...prev, animationFrame: initialFrame }));

    return () => {
      if (animationState.animationFrame) {
        cancelAnimationFrame(animationState.animationFrame);
      }
    };
  }, [animationState.isPlaying, animationState.animationFrame]);

  useEffect(() => {
    if (!animationState.isPlaying) return;

    const checkCollisions = () => {
      setBubbles(prevBubbles => {
        const newBubbles = [...prevBubbles];
        
        for (let i = 0; i < newBubbles.length; i++) {
          for (let j = i + 1; j < newBubbles.length; j++) {
            const bubbleA = newBubbles[i];
            const bubbleB = newBubbles[j];
            
            if (bubbleA.isDragging || bubbleB.isDragging) continue;
            
            const collision = physicsEngineRef.current.checkCollision(bubbleA, bubbleB);
            if (collision.hasCollision) {
              const resolved = physicsEngineRef.current.resolveCollision(collision);
              newBubbles[i] = resolved.bubbleA;
              newBubbles[j] = resolved.bubbleB;
            }
          }
        }
        
        return newBubbles;
      });
    };

    const interval = setInterval(checkCollisions, 16);
    return () => clearInterval(interval);
  }, [animationState.isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;

    const render = () => {
      renderer.clear();

      renderer.drawGrid();

      renderer.drawBubbles(bubbles);
      
      renderer.drawInstructions('💡 Drag bubbles to fling them around!');

      renderer.drawStats(fps, bubbles.length);
      
      requestAnimationFrame(render);
    };

    render();
  }, [bubbles, fps]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;

    const mousePos = renderer.screenToCanvas(e.clientX, e.clientY);
    
    const clickedBubble = bubbles.find(bubble => 
      physicsEngineRef.current.isPointInBubble(mousePos, bubble)
    );

    if (clickedBubble) {
      setMouseInteraction({
        x: mousePos.x,
        y: mousePos.y,
        isDown: true,
        draggedBubbleId: clickedBubble.id
      });

      setBubbles(prev => 
        prev.map(b => 
          b.id === clickedBubble.id 
            ? { ...b, isDragging: true, vx: 0, vy: 0 }
            : b
        )
      );
    }
  }, [bubbles]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer || !mouseInteraction.draggedBubbleId) return;

    const mousePos = renderer.screenToCanvas(e.clientX, e.clientY);

    setMouseInteraction(prev => ({ ...prev, x: mousePos.x, y: mousePos.y }));

    setBubbles(prev => 
      prev.map(bubble => 
        bubble.id === mouseInteraction.draggedBubbleId 
          ? { ...bubble, x: mousePos.x, y: mousePos.y }
          : bubble
      )
    );
  }, [mouseInteraction.draggedBubbleId]);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mouseInteraction.draggedBubbleId) return;

    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;

    const mousePos = renderer.screenToCanvas(e.clientX, e.clientY);
    const flingVelocity = physicsEngineRef.current.calculateFlingVelocity(
      { x: mouseInteraction.x, y: mouseInteraction.y },
      mousePos,
      16
    );

    setBubbles(prev => 
      prev.map(bubble => {
        if (bubble.id === mouseInteraction.draggedBubbleId) {
          return { 
            ...bubble, 
            isDragging: false,
            vx: flingVelocity.x,
            vy: flingVelocity.y
          };
        }
        return bubble;
      })
    );

    setMouseInteraction({
      x: 0,
      y: 0,
      isDown: false,
      draggedBubbleId: null
    });
  }, [mouseInteraction]);

  const handleBubbleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer || mouseInteraction.draggedBubbleId) return;

    const mousePos = renderer.screenToCanvas(e.clientX, e.clientY);
    
    const clickedBubble = bubbles.find(bubble => 
      physicsEngineRef.current.isPointInBubble(mousePos, bubble)
    );
    
    if (clickedBubble) {
      setSelectedNode(clickedBubble.tech);
    }
  }, [bubbles, mouseInteraction.draggedBubbleId]);

  const togglePhysics = useCallback(() => {
    setAnimationState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  }, []);

  const resetBubbles = useCallback(() => {
    initializeBubbles();
  }, [initializeBubbles]);

  const addRandomBubble = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const techEntries = Object.entries(techStackData);
    const randomTech = techEntries[Math.floor(Math.random() * techEntries.length)];
    
    const newBubble = physicsEngineRef.current.createBubble(
      `${randomTech[0]}-${Date.now()}`,
      randomTech[1],
      {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      },
      {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10
      }
    );

    setBubbles(prev => [...prev, newBubble]);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500 to-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Tech Stack <span className="text-blue-600">Physics Sandbox</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Interactive physics playground with floating tech bubbles. 
            Drag to fling bubbles around, watch them bounce and collide naturally!
          </p>
          
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <button
              onClick={togglePhysics}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-800"
            >
              {animationState.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {animationState.isPlaying ? 'Pause Physics' : 'Start Physics'}
            </button>
            
            <button
              onClick={resetBubbles}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-800"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Bubbles
            </button>
            
            <button
              onClick={addRandomBubble}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Activity className="w-5 h-5" />
              Add Bubble
            </button>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">{fps} FPS</span>
            </div>
          </div>
        </div>
        <div 
          ref={containerRef}
          className="relative w-full h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleBubbleClick}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{bubbles.length}</div>
            <div className="text-sm text-gray-600">Active Bubbles</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{fps}</div>
            <div className="text-sm text-gray-600">Frames Per Second</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {animationState.isPlaying ? 'Active' : 'Paused'}
            </div>
            <div className="text-sm text-gray-600">Physics Engine</div>
          </div>
        </div>
      </div>
     
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />
    </section>
  );
};

export default TechStackSection;