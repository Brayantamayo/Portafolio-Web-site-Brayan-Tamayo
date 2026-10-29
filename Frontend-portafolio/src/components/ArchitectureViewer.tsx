import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Server, Database, Shield, Zap, Play, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { architectureNodesData } from '../data/portfolioData';
import { ArchitectureNode } from '../types/portfolio';

export const ArchitectureViewer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('api-gateway');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedHop, setSimulatedHop] = useState<number>(-1);

  const selectedNode = architectureNodesData.find((n) => n.id === selectedNodeId) || architectureNodesData[1];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulatedHop(0);

    const sequence = [0, 1, 2, 3, 4];
    sequence.forEach((index, i) => {
      setTimeout(() => {
        setSimulatedHop(index);
        setSelectedNodeId(architectureNodesData[index].id);
        if (i === sequence.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setSimulatedHop(-1);
          }, 800);
        }
      }, (i + 1) * 600);
    });
  };

  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'edge':
        return <Shield className="w-5 h-5" />;
      case 'api-gateway':
        return <Zap className="w-5 h-5" />;
      case 'core-services':
        return <Server className="w-5 h-5" />;
      case 'event-bus':
        return <Network className="w-5 h-5" />;
      case 'database-cluster':
        return <Database className="w-5 h-5" />;
      default:
        return <Server className="w-5 h-5" />;
    }
  };

  return (
    <section id="arquitectura" className="py-20 lg:py-28 bg-[#040814] relative border-t border-blue-900/20 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <span>02. Topología de Sistemas Distribuidos</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Patrones de Escalabilidad</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Simulador de Arquitectura de Alta Disponibilidad
            </h2>
          </div>

          {/* Interactive Simulation Trigger */}
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className={`px-5 py-2.5 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg ${
              isSimulating
                ? 'bg-blue-950 text-blue-300 border border-blue-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25 active:scale-[0.98]'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Simulando Tráfico en Pipeline...' : 'Simular Flujo de Petición en Vivo'}
          </button>
        </div>

        {/* Architecture Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Node Flow Pipeline (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Pipeline de Ejecución (Haz clic en un nodo para inspeccionarlo)
            </p>

            {architectureNodesData.map((node, idx) => {
              const isSelected = selectedNodeId === node.id;
              const isCurrentSimHop = simulatedHop === idx;

              return (
                <motion.div
                  key={node.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-blue-500 bg-[#091533] shadow-lg shadow-blue-950/80 ring-1 ring-blue-500/40'
                      : isCurrentSimHop
                      ? 'border-cyan-400 bg-[#081a38] shadow-md shadow-cyan-500/30'
                      : 'border-blue-900/30 bg-[#060c1d] hover:border-blue-700/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-[#091328] text-blue-400 border-blue-900/40'
                      }`}
                    >
                      {getNodeIcon(node.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white tracking-tight">{node.title}</h4>
                        {isCurrentSimHop && (
                          <span className="text-[10px] font-mono font-bold text-cyan-300 animate-pulse bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/50">
                            PROCESANDO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{node.role}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-semibold text-blue-300 tabular-nums">
                      {node.latency}
                    </div>
                    <span className="text-[11px] text-slate-400">Latencia estimada</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Node Inspector Panel (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl border border-blue-800/40 bg-[#070e24] shadow-xl space-y-6"
              >
                {/* Node Inspector Header */}
                <div className="border-b border-blue-900/30 pb-4">
                  <div className="flex items-center justify-between text-xs text-blue-400 font-mono mb-2">
                    <span>NODO_ID: {selectedNode.id.toUpperCase()}</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Estado: Óptimo
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {selectedNode.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {selectedNode.role}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Responsabilidad Arquitectónica
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Tech & Protocols in this node */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Tecnologías & Protocolos Aplicados
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-[#0b1736] border border-blue-900/50 text-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benchmarks & SLA */}
                <div className="p-3.5 rounded-xl bg-[#030612] border border-blue-900/40 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-0.5">Latencia Típica</span>
                    <span className="text-sm font-mono font-bold text-white tabular-nums">
                      {selectedNode.latency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-0.5">SLA de Disponibilidad</span>
                    <span className="text-sm font-mono font-bold text-emerald-400 tabular-nums">
                      99.995%
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
                  <span>Diseñado para tolerancia a particiones de red</span>
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
