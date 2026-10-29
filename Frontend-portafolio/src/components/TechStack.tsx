import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { techStackList, TechItem } from '../data/techStackLogos';

export const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-linked animation: disappears when scrolling down, reappears when scrolling back up
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const stackOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.95], [0, 1, 1, 0]);
  const stackScale = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.95], [0.93, 1, 1, 0.92]);
  const stackY = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.95], [50, 0, 0, -60]);
  const stackBlur = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.95], [8, 0, 0, 12]);
  const stackFilter = useTransform(stackBlur, (v) => `blur(${v}px)`);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeAuraColor, setActiveAuraColor] = useState<string>('#38bdf8');
  const [isAuraActive, setIsAuraActive] = useState<boolean>(false);
  const [sweepTrigger, setSweepTrigger] = useState<number>(0);
  const [isSurging, setIsSurging] = useState<boolean>(false);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);
  const surgeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Group the 30 technologies into 3 realistic keyboard rows (10 keys per row)
  const row1 = techStackList.slice(0, 10);
  const row2 = techStackList.slice(10, 20);
  const row3 = techStackList.slice(20, 30);

  // Singleton AudioContext reference to prevent garbage collection spikes & audio latency
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = (): AudioContext | null => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  };

  // Synthesized mechanical keyboard switch click sound (zero dependencies, safe Web Audio API)
  const playSwitchSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sharp mechanical tactile click: 160Hz -> 50Hz in 35ms
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Graceful fallback if audio is not permitted
    }
  };

  // Deep mechanical spacebar "thock" with stabilizer rumble
  const playSpacebarSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Deep resonant body thock (85Hz -> 28Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(95, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.085);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);

      // Stabilizer click transient
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(260, ctx.currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.025);
      clickGain.gain.setValueAtTime(0.12, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start();
      clickOsc.stop(ctx.currentTime + 0.03);
    } catch {
      // Graceful fallback
    }
  };

  const handleKeyClick = (tech: TechItem) => {
    playSwitchSound();
    setActiveKey(tech.name);
    setActiveAuraColor(tech.color || '#38bdf8');
    setIsAuraActive(true);
    setSweepTrigger((prev) => prev + 1);

    setTimeout(() => {
      setActiveKey(null);
    }, 150);
  };

  // Full Keyboard RGB Aura Surge triggered by the Spacebar
  const handleSpacebarClick = () => {
    playSpacebarSound();
    setIsSpacePressed(true);
    setIsSurging(true);
    setIsAuraActive(true);
    setActiveAuraColor('#00f0ff');
    setSweepTrigger((prev) => prev + 1);

    setTimeout(() => {
      setIsSpacePressed(false);
    }, 140);

    if (surgeTimeoutRef.current) {
      clearTimeout(surgeTimeoutRef.current);
    }
    surgeTimeoutRef.current = setTimeout(() => {
      setIsSurging(false);
    }, 3600);
  };

  const renderKey = (tech: TechItem, index: number, rowIndex: number) => {
    const isPressed = activeKey === tech.name;
    const isHovered = hoveredKey === tech.name;

    // Calculate distance from spacebar (center column 4.5, row 3) for the radial ripple delay
    const distFromSpace = Math.sqrt(Math.pow(index - 4.5, 2) + Math.pow(3 - rowIndex, 2));
    const rippleDelay = distFromSpace * 65; // ms

    return (
      <div key={tech.name} className={`relative flex justify-center ${isHovered ? 'z-50' : 'z-10'}`}>
        {/* Floating Tooltip with Tech Name on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: -10, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-11 z-50 px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold tracking-wide pointer-events-none shadow-2xl whitespace-nowrap"
              style={{
                backgroundColor: '#030712',
                color: tech.color || '#ffffff',
                border: `1.5px solid ${tech.color || '#3b82f6'}`,
                boxShadow: `0 4px 16px ${tech.color || '#3b82f6'}60, 0 0 10px ${tech.color || '#3b82f6'}40`,
              }}
            >
              {tech.name}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Physical Mechanical Keycap */}
        <button
          onClick={() => handleKeyClick(tech)}
          onMouseEnter={() => setHoveredKey(tech.name)}
          onMouseLeave={() => setHoveredKey(null)}
          title={tech.name}
          aria-label={tech.name}
          className="relative flex items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl select-none group aspect-square w-full cursor-pointer transition-all duration-300"
          style={{
            transitionDelay: isSurging ? `${rippleDelay}ms` : '0ms',

            // When surging or hovered: lifts up; when clicked: depresses (+2px)
            transform: isPressed
              ? 'translateY(2px) scale(0.95)'
              : isHovered
              ? 'translateY(-8px) scale(1.06)'
              : isSurging
              ? 'translateY(-5px) scale(1.04)'
              : 'translateY(0) scale(1)',

            // Keycap body color: during surge lights up in signature color!
            backgroundColor: isHovered || isSurging
              ? tech.color
              : isPressed
              ? `${tech.color}ee`
              : '#0a1122',

            // Keycap perimeter border
            border: isHovered || isSurging
              ? `2px solid #ffffff`
              : isPressed
              ? `2px solid ${tech.color}`
              : '1px solid rgba(30, 58, 138, 0.45)',

            // Mechanical keycap elevation & lighting shadow
            boxShadow: isPressed
              ? 'inset 0 3px 6px rgba(0,0,0,0.7), 0 1px 0 rgba(0,0,0,0.5)'
              : isHovered || isSurging
              ? `0 14px 28px -2px ${tech.glowColor || tech.color + 'bb'}, 0 6px 14px ${tech.color}90, 0 0 25px ${tech.color}99, 0 6px 0 ${tech.keycapSkirt || '#030712'}`
              : '0 4px 0 #040814, 0 6px 12px rgba(0,0,0,0.5)',
          }}
        >
          {/* Subtle top bevel shine for keycap tactile realism */}
          <div
            className={`absolute inset-x-2 top-1 h-[2px] rounded-full pointer-events-none transition-opacity duration-200 ${
              isHovered || isSurging ? 'bg-white/70' : 'bg-white/10'
            }`}
          />

          {/* Centered Technology Icon only (no text inside keycap) */}
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-transform duration-200 ${
              isHovered || isSurging ? 'scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]' : 'group-hover:scale-105'
            }`}
          >
            {tech.svg}
          </div>
        </button>
      </div>
    );
  };

  return (
    <section id="stack" ref={sectionRef} className="py-24 relative border-t border-blue-900/20 bg-[#030712] overflow-hidden section-contain">
      {/* Background ambient aura that lights up in sync with the active keyboard color or surge */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none rounded-full transition-all duration-700 ease-out"
        style={{
          background: isSurging
            ? 'radial-gradient(circle, rgba(0,240,255,0.35) 0%, rgba(168,85,247,0.25) 45%, transparent 70%)'
            : isAuraActive
            ? `radial-gradient(circle, ${activeAuraColor}33 0%, ${activeAuraColor}11 40%, transparent 70%)`
            : 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)',
          filter: 'blur(35px)',
        }}
      />

      <motion.div
        style={{
          opacity: stackOpacity,
          scale: stackScale,
          y: stackY,
          filter: stackFilter,
          willChange: 'transform, opacity, filter',
        }}
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Title: Exactly 'Tecnologías que manejo' */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Tecnologías que manejo
          </h2>
        </motion.div>

        {/* The Computer Keyboard Chassis with Aura & Traveling Light Sweep */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* External Halo Aura that bathes the keyboard on click / surge */}
          <div
            className="absolute -inset-6 sm:-inset-10 rounded-[36px] sm:rounded-[44px] pointer-events-none transition-all duration-700 ease-out"
            style={{
              opacity: isSurging ? 1 : isAuraActive ? 0.85 : 0.2,
              background: isSurging
                ? 'radial-gradient(ellipse at center, rgba(0,240,255,0.6) 0%, rgba(168,85,247,0.35) 45%, transparent 75%)'
                : `radial-gradient(ellipse at center, ${activeAuraColor}55 0%, ${activeAuraColor}20 50%, transparent 75%)`,
              filter: 'blur(30px)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative p-4 sm:p-7 pt-6 sm:pt-8 rounded-3xl bg-[#060b18] border-2 transition-all duration-500 ease-out space-y-3 sm:space-y-3.5"
            style={{
              borderColor: isSurging
                ? '#00f0ff'
                : isAuraActive
                ? activeAuraColor
                : 'rgba(30, 58, 138, 0.4)',
              boxShadow: isSurging
                ? '0 0 100px 25px rgba(0, 240, 255, 0.5), 0 0 160px 50px rgba(168, 85, 247, 0.3), inset 0 0 45px rgba(0, 240, 255, 0.3)'
                : isAuraActive
                ? `0 0 80px 15px ${activeAuraColor}45, 0 0 140px 35px ${activeAuraColor}20, inset 0 0 35px ${activeAuraColor}25`
                : '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* 1. TRAVELING LIGHT WAVE ACROSS THE KEYBOARD SURFACE (Clipped to chassis bounds) */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-10">
              <AnimatePresence>
                {(sweepTrigger > 0 || isSurging) && (
                  <motion.div
                    key={`sweep-${sweepTrigger}-${isSurging ? 'surge' : 'normal'}`}
                    initial={{ x: '-120%', opacity: 0.9 }}
                    animate={{
                      x: '240%',
                      opacity: [0.2, 0.95, 0.9, 0],
                    }}
                    transition={{
                      duration: isSurging ? 1.6 : 1.1,
                      repeat: isSurging ? 2 : 0,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-y-0 w-64 -skew-x-12 pointer-events-none"
                    style={{
                      background: isSurging
                        ? 'linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.3) 20%, rgba(168,85,247,0.7) 45%, #ffffffdd 50%, rgba(0,240,255,0.7) 55%, transparent 100%)'
                        : `linear-gradient(90deg, transparent 0%, ${activeAuraColor}30 25%, ${activeAuraColor}80 50%, #ffffffbb 52%, ${activeAuraColor}80 55%, transparent 100%)`,
                      mixBlendMode: 'screen',
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* 2. TRAVELING LIGHT PERIMETER RUNNER (Laser beam traversing the keyboard chassis frame) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl overflow-visible z-20"
              style={{ width: '100%', height: '100%' }}
            >
              <defs>
                <linearGradient id="keyboard-beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor={isSurging ? '#00f0ff' : activeAuraColor} stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="keyboard-surge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>

              {/* Responsive continuous perimeter beam */}
              <motion.rect
                key={`border-runner-${sweepTrigger}-${isSurging ? 'surge' : 'normal'}`}
                x="1.5"
                y="1.5"
                width="calc(100% - 3px)"
                height="calc(100% - 3px)"
                rx="22"
                fill="none"
                stroke={isSurging ? 'url(#keyboard-surge-grad)' : 'url(#keyboard-beam-grad)'}
                strokeWidth={isSurging ? '4' : '3'}
                strokeDasharray="220 1200"
                initial={{ strokeDashoffset: 1420, opacity: 0 }}
                animate={{
                  strokeDashoffset: isSurging ? [1420, -1420] : [1420, 0],
                  opacity: isSurging ? [0, 1, 1, 1, 0.8] : [0, 1, 1, 0.8, 0],
                }}
                transition={{
                  duration: isSurging ? 2.2 : 1.4,
                  repeat: isSurging ? 1 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  filter: `drop-shadow(0 0 ${isSurging ? '16px #00f0ff' : '10px ' + activeAuraColor})`,
                }}
              />
            </svg>

            {/* Keyboard Keys Grid (3 rows of 10 keys + 4th row with Spacebar) */}
            <div className="relative z-30 space-y-2.5 sm:space-y-3">
              {/* Row 1 (10 keys) */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5">
                {row1.map((tech, idx) => renderKey(tech, idx, 0))}
              </div>

              {/* Row 2 (10 keys with natural keyboard stagger) */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5 sm:pl-3">
                {row2.map((tech, idx) => renderKey(tech, idx, 1))}
              </div>

              {/* Row 3 (10 keys with natural keyboard stagger) */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5 sm:pl-6">
                {row3.map((tech, idx) => renderKey(tech, idx, 2))}
              </div>

              {/* Row 4: Modifiers + Mechanical Spacebar (Centerpiece) */}
              <div className="flex items-center gap-2 sm:gap-2.5 pt-1">
                {/* Left Modifier: CTRL */}
                <button
                  type="button"
                  onClick={playSwitchSound}
                  title="Control"
                  aria-label="Control key"
                  className="hidden sm:flex items-center justify-center h-12 px-3.5 rounded-xl bg-[#0a1122] hover:bg-[#111c38] text-slate-400 hover:text-white font-mono text-xs font-bold tracking-wider border border-blue-900/40 hover:border-blue-400/60 shadow-[0_4px_0_#040814,0_6px_10px_rgba(0,0,0,0.5)] active:translate-y-0.5 transition-all duration-150 cursor-pointer select-none"
                >
                  CTRL
                </button>

                {/* Left Modifier: ALT */}
                <button
                  type="button"
                  onClick={playSwitchSound}
                  title="Alt / Option"
                  aria-label="Alt key"
                  className="hidden sm:flex items-center justify-center h-12 px-3.5 rounded-xl bg-[#0a1122] hover:bg-[#111c38] text-slate-400 hover:text-white font-mono text-xs font-bold tracking-wider border border-blue-900/40 hover:border-blue-400/60 shadow-[0_4px_0_#040814,0_6px_10px_rgba(0,0,0,0.5)] active:translate-y-0.5 transition-all duration-150 cursor-pointer select-none"
                >
                  ALT
                </button>

                {/* THE MECHANICAL SPACEBAR */}
                <button
                  type="button"
                  onClick={handleSpacebarClick}
                  title="Haz clic para activar el aura RGB en todo el teclado"
                  aria-label="Barra espaciadora: while(alive) { code(); } - Activar Aura RGB"
                  className="relative flex-1 h-12 sm:h-14 rounded-xl sm:rounded-2xl cursor-pointer select-none group flex items-center justify-between px-3 sm:px-6 transition-all duration-200 overflow-hidden"
                  style={{
                    transform: isSpacePressed
                      ? 'translateY(2px) scale(0.985)'
                      : isSurging
                      ? 'translateY(-3px)'
                      : 'translateY(0)',
                    backgroundColor: isSurging
                      ? '#0f172a'
                      : '#0a1122',
                    border: isSurging
                      ? '2px solid #00f0ff'
                      : '1px solid rgba(56, 189, 248, 0.45)',
                    boxShadow: isSpacePressed
                      ? 'inset 0 3px 6px rgba(0,0,0,0.7), 0 1px 0 rgba(0,0,0,0.5)'
                      : isSurging
                      ? '0 0 30px rgba(0, 240, 255, 0.4), 0 8px 20px rgba(0, 0, 0, 0.6), 0 5px 0 #030712'
                      : '0 4px 0 #040814, 0 6px 14px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Keycap top bevel shine */}
                  <div
                    className={`absolute inset-x-3 top-1 h-[2px] rounded-full pointer-events-none transition-opacity duration-200 ${
                      isSurging ? 'bg-cyan-300/60' : 'bg-white/10 group-hover:bg-white/30'
                    }`}
                  />

                  {/* Left tag: SPACE + LED status dot */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isSurging
                          ? 'bg-emerald-400 shadow-[0_0_10px_#4ade80] animate-pulse'
                          : 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'
                      }`}
                    />
                    <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 group-hover:text-cyan-300 transition-colors uppercase">
                      SPACE
                    </span>
                  </div>

                  {/* Programming statement in center */}
                  <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm">
                    <span className="text-purple-400 font-bold">while</span>
                    <span className="text-slate-400 font-normal">(</span>
                    <span className="text-cyan-300 font-semibold">alive</span>
                    <span className="text-slate-400 font-normal">)</span>
                    <span className="text-slate-300 font-normal"> {'{'} </span>
                    <span className="text-emerald-400 font-bold group-hover:underline decoration-emerald-400/50">code</span>
                    <span className="text-yellow-300 font-semibold">()</span>
                    <span className="text-slate-300 font-normal">; {'}'}</span>
                    <span className="text-sm ml-0.5">🚀</span>
                  </div>

                  {/* Right tag: RGB Aura indicator */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] sm:text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border transition-all duration-300 ${
                        isSurging
                          ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/80 shadow-[0_0_12px_rgba(0,240,255,0.4)] animate-pulse'
                          : 'bg-blue-950/60 text-slate-400 group-hover:text-cyan-300 border-blue-800/40 group-hover:border-cyan-500/50'
                      }`}
                    >
                      {isSurging ? '✨ RGB ACTIVO' : '⚡ AURA RGB'}
                    </span>
                  </div>
                </button>

                {/* Right Modifier: ALT */}
                <button
                  type="button"
                  onClick={playSwitchSound}
                  title="Alt"
                  aria-label="Alt key"
                  className="hidden sm:flex items-center justify-center h-12 px-3.5 rounded-xl bg-[#0a1122] hover:bg-[#111c38] text-slate-400 hover:text-white font-mono text-xs font-bold tracking-wider border border-blue-900/40 hover:border-blue-400/60 shadow-[0_4px_0_#040814,0_6px_10px_rgba(0,0,0,0.5)] active:translate-y-0.5 transition-all duration-150 cursor-pointer select-none"
                >
                  ALT
                </button>

                {/* Right Modifier: FN */}
                <button
                  type="button"
                  onClick={playSwitchSound}
                  title="Function"
                  aria-label="Function key"
                  className="hidden sm:flex items-center justify-center h-12 px-3.5 rounded-xl bg-[#0a1122] hover:bg-[#111c38] text-slate-400 hover:text-white font-mono text-xs font-bold tracking-wider border border-blue-900/40 hover:border-blue-400/60 shadow-[0_4px_0_#040814,0_6px_10px_rgba(0,0,0,0.5)] active:translate-y-0.5 transition-all duration-150 cursor-pointer select-none"
                >
                  FN
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

