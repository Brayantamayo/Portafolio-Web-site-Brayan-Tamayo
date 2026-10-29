import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Matter from 'matter-js';
import { techStackList, TechItem } from '../data/techStackLogos';

// Selected key technologies to drop in the Hero
const SELECTED_TECH_NAMES = [
  'TypeScript',
  'JavaScript',
  'Python',
  'PostgreSQL',
  'React',
  'Docker',
  'Node.js',
  'Tailwind CSS',
  'MongoDB',
  'FastAPI',
];

interface DragSample {
  x: number;
  y: number;
  time: number;
}

interface HeroFallingTechProps {
  isWelcomeDone?: boolean;
}

// Keep the initial drop inside the visible hero and spread the tiles across its width.
function generateSkyDropSpawn(width: number, height: number, count: number) {
  const safeMargin = 40;
  const availableWidth = Math.max(300, width - safeMargin * 2);
  const slotWidth = availableWidth / count;

  // Create slot indices and shuffle them (Fisher-Yates)
  const slotIndices = Array.from({ length: count }, (_, i) => i);
  for (let i = slotIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slotIndices[i], slotIndices[j]] = [slotIndices[j], slotIndices[i]];
  }

  return slotIndices.map((slot) => {
    // Random horizontal position within its shuffled slot
    const x = safeMargin + slot * slotWidth + Math.random() * (slotWidth * 0.7);
    const minY = Math.min(96, height * 0.35);
    const maxY = Math.max(minY, Math.min(220, height * 0.75));
    const y = minY + Math.random() * (maxY - minY);
    const angle = (Math.random() - 0.5) * Math.PI * 1.5;
    const vx = (Math.random() - 0.5) * 5; // random horizontal drift
    const vy = Math.random() * 4 + 2.5; // downward initial velocity
    const angularVelocity = (Math.random() - 0.5) * 0.12;

    return { x, y, angle, vx, vy, angularVelocity };
  });
}

export const HeroFallingTech: React.FC<HeroFallingTechProps> = ({ isWelcomeDone = false }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const isRunnerRunningRef = useRef(false);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const hasDroppedRef = useRef<boolean>(false);
  const activeDragRef = useRef<{
    index: number;
    pointerId: number;
    samples: DragSample[];
  } | null>(null);

  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);

  // Memoize tech items so the array reference never changes across re-renders
  const techItems: TechItem[] = useMemo(() => {
    return SELECTED_TECH_NAMES.map((name) => {
      return techStackList.find((t) => t.name === name) || techStackList[0];
    });
  }, []);

  // Drops bodies dynamically from the sky
  const dropBodiesFromSky = useCallback(() => {
    const container = sceneRef.current;
    const engine = engineRef.current;
    if (!container || !engine) return;

    const width = container.clientWidth || window.innerWidth;
    const isMobile = width < 640;
    const boxSize = isMobile ? 48 : 58;

    const { Bodies, Composite, Body } = Matter;

    // Remove any previous bodies safely
    if (bodiesRef.current.length > 0) {
      Composite.remove(engine.world, bodiesRef.current);
      bodiesRef.current = [];
    }

    // Generate coordinates high above in the sky
    const spawnData = generateSkyDropSpawn(width, container.clientHeight, techItems.length);

    const newBodies = techItems.map((_, i) => {
      const spawn = spawnData[i];

      const body = Bodies.rectangle(spawn.x, spawn.y, boxSize, boxSize, {
        chamfer: { radius: 14 },
        restitution: 0.68,
        friction: 0.15,
        frictionAir: 0.012,
        density: 0.002,
        angle: spawn.angle,
        angularVelocity: spawn.angularVelocity,
      });

      Body.setVelocity(body, { x: spawn.vx, y: spawn.vy });
      return body;
    });

    bodiesRef.current = newBodies;
    Composite.add(engine.world, newBodies);
    hasDroppedRef.current = true;
  }, [techItems]);

  // Physics engine setup: runs once on mount, tearing down only on unmount
  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const { Engine, Runner, Bodies, Composite, Events, Body } = Matter;
    const isMobile = width < 640;
    const boxSize = isMobile ? 48 : 58;
    const halfSize = boxSize / 2;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.95, scale: 0.001 },
      enableSleeping: true,
    });
    engineRef.current = engine;

    const runner = Runner.create();
    runnerRef.current = runner;

    const startRunner = () => {
      if (isRunnerRunningRef.current || !runnerRef.current || !engineRef.current) return;
      runner.enabled = true;
      Runner.run(runner, engine);
      isRunnerRunningRef.current = true;
    };

    const stopRunner = () => {
      if (!isRunnerRunningRef.current) return;
      runner.enabled = false;
      Runner.stop(runner);
      isRunnerRunningRef.current = false;
    };

    startRunner();

    // Wall & floor thicknesses
    const wallThickness = 120;
    const floorThickness = 100;
    const ceilingThickness = 120;

    // Floor (exact delimiter with About Me at bottom border)
    const floor = Bodies.rectangle(
      width / 2,
      height - halfSize + floorThickness / 2,
      width * 2.5,
      floorThickness,
      { isStatic: true, restitution: 0.65, friction: 0.25 }
    );

    // Left wall
    const leftWall = Bodies.rectangle(
      halfSize - wallThickness / 2,
      height / 2,
      wallThickness,
      height * 4,
      { isStatic: true, restitution: 0.75, friction: 0.1 }
    );

    // Right wall
    const rightWall = Bodies.rectangle(
      width - halfSize + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 4,
      { isStatic: true, restitution: 0.75, friction: 0.1 }
    );

    const ceiling = Bodies.rectangle(
      width / 2,
      halfSize - ceilingThickness / 2,
      width * 2.5,
      ceilingThickness,
      { isStatic: true, restitution: 0.6, friction: 0.1 }
    );

    Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // 60FPS DOM Sync Loop: skips resting bodies to prevent layout thrashing
    const updateHandler = () => {
      const bodies = bodiesRef.current;
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const el = elementsRef.current[i];
        if (el && body && (!body.isSleeping || activeDragRef.current?.index === i)) {
          const x = body.position.x - halfSize;
          const y = body.position.y - halfSize;
          const angle = body.angle;
          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${angle.toFixed(3)}rad)`;
          el.style.zIndex = activeDragRef.current?.index === i
            ? '20000'
            : String(10000 + Math.round(body.position.y) + i);
        }
      }
    };

    Events.on(engine, 'afterUpdate', updateHandler);

    // IntersectionObserver to pause the physics engine when Hero is off-screen, freeing 100% CPU/GPU
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!runnerRef.current || !engineRef.current) return;
        if (entry.isIntersecting) {
          startRunner();
        } else {
          stopRunner();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Handle Window Resize to reposition boundaries
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      width = newWidth;
      height = newHeight;

      Body.setPosition(floor, {
        x: width / 2,
        y: height - halfSize + floorThickness / 2,
      });
      Body.setPosition(leftWall, {
        x: halfSize - wallThickness / 2,
        y: height / 2,
      });
      Body.setPosition(rightWall, {
        x: width - halfSize + wallThickness / 2,
        y: height / 2,
      });
      Body.setPosition(ceiling, {
        x: width / 2,
        y: halfSize - ceilingThickness / 2,
      });
    };

    window.addEventListener('resize', handleResize);

    // Safety timer: in case welcome screen event doesn't fire after 4.5s, drop them anyway
    const safetyTimer = setTimeout(() => {
      if (!hasDroppedRef.current) {
        dropBodiesFromSky();
      }
    }, 4500);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
      window.removeEventListener('resize', handleResize);
      Events.off(engine, 'afterUpdate', updateHandler);
      stopRunner();
      Engine.clear(engine);
      engineRef.current = null;
      runnerRef.current = null;
      isRunnerRunningRef.current = false;
      bodiesRef.current = [];
    };
  }, [dropBodiesFromSky]);

  // When welcome completes, drop the icons from the sky!
  useEffect(() => {
    if (isWelcomeDone && !hasDroppedRef.current && engineRef.current) {
      const timer = setTimeout(() => {
        dropBodiesFromSky();
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isWelcomeDone, dropBodiesFromSky]);

  // Pointer drag & throw handlers
  const handlePointerDown = (index: number, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const body = bodiesRef.current[index];
    if (!body || !sceneRef.current) return;

    // Temporarily make static so physics and gravity don't fight user's cursor
    Matter.Body.setStatic(body, true);
    Matter.Sleeping.set(body, false);
    Matter.Body.setVelocity(body, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(body, 0);

    setActiveDragIndex(index);

    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if capture unsupported
    }

    activeDragRef.current = {
      index,
      pointerId: e.pointerId,
      samples: [{ x, y, time: now }],
    };
    e.currentTarget.style.zIndex = '20000';
  };

  const handlePointerMove = (index: number, e: React.PointerEvent<HTMLDivElement>) => {
    const drag = activeDragRef.current;
    if (!drag || drag.index !== index || drag.pointerId !== e.pointerId) return;

    const body = bodiesRef.current[index];
    if (!body || !sceneRef.current) return;

    const rect = sceneRef.current.getBoundingClientRect();
    const x = Math.max(30, Math.min(rect.width - 30, e.clientX - rect.left));
    const y = Math.max(30, Math.min(rect.height - 35, e.clientY - rect.top));
    const now = performance.now();

    // Directly align body with cursor
    Matter.Body.setPosition(body, { x, y });

    // Keep rolling track of recent points for throw calculation
    drag.samples.push({ x, y, time: now });
    if (drag.samples.length > 8) {
      drag.samples.shift();
    }
  };

  const handlePointerUp = (index: number, e: React.PointerEvent<HTMLDivElement>) => {
    const drag = activeDragRef.current;
    if (!drag || drag.index !== index || drag.pointerId !== e.pointerId) return;

    const body = bodiesRef.current[index];
    activeDragRef.current = null;
    setActiveDragIndex(null);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    if (!body) return;
    e.currentTarget.style.zIndex = String(10000 + Math.round(body.position.y) + index);

    // Re-enable dynamic physics on release
    Matter.Body.setStatic(body, false);
    Matter.Sleeping.set(body, false);

    // Calculate throw velocity based on recent pointer movement samples (last 120ms)
    const now = performance.now();
    const recent = drag.samples.filter((s) => now - s.time < 120);

    let vx = 0;
    let vy = 0;

    if (recent.length >= 2) {
      const first = recent[0];
      const last = recent[recent.length - 1];
      const dt = Math.max(16, last.time - first.time);

      // Pixels per millisecond scaled to Matter.js velocity scale
      vx = ((last.x - first.x) / dt) * 16;
      vy = ((last.y - first.y) / dt) * 16;
    } else if (drag.samples.length >= 2) {
      const first = drag.samples[0];
      const last = drag.samples[drag.samples.length - 1];
      const dt = Math.max(16, last.time - first.time);
      vx = ((last.x - first.x) / dt) * 16;
      vy = ((last.y - first.y) / dt) * 16;
    }

    // If it was just a tap/click without dragging, give it a joyful upward impulse
    if (Math.hypot(vx, vy) < 2) {
      vx = (Math.random() - 0.5) * 8;
      vy = -(Math.random() * 6 + 9);
      Matter.Body.setVelocity(body, { x: vx, y: vy });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
      return;
    }

    // Clamp maximum velocities to prevent tunneling
    const maxSpeed = 30;
    vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
    vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));

    Matter.Body.setVelocity(body, { x: vx, y: vy });
    Matter.Body.setAngularVelocity(body, vx * 0.04);
  };

  return (
    <div
      ref={sceneRef}
      className="absolute inset-0 z-20 overflow-hidden pointer-events-none select-none"
    >
      {/* Render the tech squares synced to physics bodies */}
      {techItems.map((tech, index) => {
        const isDragging = activeDragIndex === index;

        return (
          <div
            key={tech.name}
            ref={(el) => {
              elementsRef.current[index] = el;
            }}
            onPointerDown={(e) => handlePointerDown(index, e)}
            onPointerMove={(e) => handlePointerMove(index, e)}
            onPointerUp={(e) => handlePointerUp(index, e)}
            onPointerCancel={(e) => handlePointerUp(index, e)}
            className="absolute top-0 left-0 pointer-events-auto will-change-transform cursor-grab active:cursor-grabbing select-none"
            style={{
              touchAction: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            <div
              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-150 group ${
                isDragging ? 'scale-115' : 'hover:scale-105'
              }`}
              style={{
                background: 'rgba(11, 18, 33, 0.90)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: isDragging
                  ? `2px solid ${tech.color}`
                  : `1px solid rgba(59, 130, 246, 0.35)`,
                boxShadow: isDragging
                  ? `0 0 35px ${tech.glowColor}, 0 12px 25px rgba(0,0,0,0.8)`
                  : `0 8px 20px rgba(0,0,0,0.5), 0 0 14px ${tech.glowColor}`,
              }}
              title={`${tech.name} • ${tech.categoryLabel} (¡Arrastra y lánzame!)`}
            >
              {/* Inner ambient glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-35 pointer-events-none transition-opacity"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${tech.color}, transparent 70%)`,
                }}
              />

              {/* Icon rendering */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center relative z-10 pointer-events-none">
                {tech.image ? (
                  <span className="flex h-full w-full items-center justify-center rounded-md bg-white p-1">
                    <img
                      src={tech.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-contain"
                    />
                  </span>
                ) : (
                  tech.svg
                )}
              </div>

              {/* Minimal Tech Tag indicator */}
              <span
                className="text-[9px] font-mono font-bold leading-none mt-1 tracking-tight truncate max-w-[42px] pointer-events-none select-none transition-colors"
                style={{
                  color: isDragging ? tech.color : 'rgba(226, 232, 240, 0.9)',
                }}
              >
                {tech.name === 'PostgreSQL'
                  ? 'Postgres'
                  : tech.name === 'JavaScript'
                  ? 'JS'
                  : tech.name === 'TypeScript'
                  ? 'TS'
                  : tech.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Delimiting tech line at bottom border separating Hero and About Me */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none z-30" />
    </div>
  );
};
