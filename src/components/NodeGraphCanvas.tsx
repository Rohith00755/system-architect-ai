'use client';

import React, { useState } from 'react';
import { ArchitectureNode, ArchitectureEdge, NodeType } from '@/types/system';
import { Cpu, Database, Network, ShieldCheck, Activity, Layers, ArrowUpRight, Zap, Info, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NodeGraphCanvasProps {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  onSelectNode?: (node: ArchitectureNode) => void;
}

export const NodeGraphCanvas: React.FC<NodeGraphCanvasProps> = ({ nodes, edges }) => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(nodes[0] || null);
  const [filterType, setFilterType] = useState<string>('all');

  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case 'edge':
        return { bg: 'bg-cyan-500/10', border: 'border-cyan-500/50', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' };
      case 'ai':
        return { bg: 'bg-purple-500/10', border: 'border-purple-500/50', text: 'text-purple-400', glow: 'shadow-purple-500/20' };
      case 'microservice':
        return { bg: 'bg-indigo-500/10', border: 'border-indigo-500/50', text: 'text-indigo-400', glow: 'shadow-indigo-500/20' };
      case 'database':
        return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/50', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' };
      case 'queue':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/50', text: 'text-amber-400', glow: 'shadow-amber-500/20' };
      case 'security':
        return { bg: 'bg-rose-500/10', border: 'border-rose-500/50', text: 'text-rose-400', glow: 'shadow-rose-500/20' };
      default:
        return { bg: 'bg-slate-800', border: 'border-slate-700', text: 'text-slate-300', glow: '' };
    }
  };

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'edge': return Network;
      case 'ai': return Cpu;
      case 'microservice': return Layers;
      case 'database': return Database;
      case 'queue': return Zap;
      case 'security': return ShieldCheck;
      default: return Activity;
    }
  };

  const filteredNodes = filterType === 'all' 
    ? nodes 
    : nodes.filter(n => n.type === filterType);

  return (
    <div className="relative w-full rounded-2xl glass-panel border border-slate-800 p-4 md:p-6 overflow-hidden">
      
      {/* Top Controls Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-400" />
            Interactive Topological Node Graph
          </h3>
          <p className="text-xs text-slate-400">Click any node to inspect latency SLAs, gRPC APIs, and component specifications.</p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Filter className="h-3.5 w-3.5 text-slate-500 mr-1" />
          {[
            { id: 'all', label: 'All Nodes' },
            { id: 'edge', label: 'Edge' },
            { id: 'ai', label: 'AI Agents' },
            { id: 'microservice', label: 'Services' },
            { id: 'database', label: 'Data Stores' },
            { id: 'queue', label: 'Event Bus' },
            { id: 'security', label: 'Security' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterType(btn.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                filterType === btn.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Canvas Area */}
        <div className="lg:col-span-8 relative min-h-[460px] w-full rounded-xl bg-slate-950/90 border border-slate-800/80 bg-grid-pattern p-4 overflow-x-auto">
          
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            {edges.map((edge) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);

              if (!fromNode || !toNode) return null;

              // Node dimensions center offsets
              const x1 = fromNode.x + 90;
              const y1 = fromNode.y + 40;
              const x2 = toNode.x + 90;
              const y2 = toNode.y + 40;

              const isConnectedToSelected = selectedNode && (selectedNode.id === edge.from || selectedNode.id === edge.to);

              return (
                <g key={edge.id}>
                  {/* Connection Line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isConnectedToSelected ? '#818cf8' : '#334155'}
                    strokeWidth={isConnectedToSelected ? '2.5' : '1.5'}
                    strokeDasharray={edge.animated ? '6,6' : undefined}
                    className={edge.animated ? 'animate-flow' : ''}
                  />
                </g>
              );
            })}
          </svg>

          {/* Node Cards overlay */}
          <div className="relative min-w-[900px] min-h-[440px]">
            {filteredNodes.map((node) => {
              const colors = getNodeColor(node.type);
              const Icon = getNodeIcon(node.type);
              const isSelected = selectedNode?.id === node.id;

              return (
                <motion.div
                  key={node.id}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  onClick={() => setSelectedNode(node)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`absolute w-[190px] cursor-pointer rounded-xl border p-3 backdrop-blur-md transition-all shadow-lg ${colors.bg} ${colors.border} ${colors.glow} ${
                    isSelected ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950 z-20' : 'z-10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${colors.bg} ${colors.text}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-1">{node.label}</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5 line-clamp-1">{node.tech}</p>

                  <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[9px] font-mono text-slate-400">
                    <span>SLA: {node.metrics.latency}</span>
                    <span className="text-indigo-400 font-semibold">{node.type.toUpperCase()}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-3 left-3 text-[10px] text-slate-500 font-mono flex items-center gap-2">
            <Info className="h-3 w-3 text-indigo-400" />
            <span>Interactive Visual Graph • Drag or click nodes for telemetry detail</span>
          </div>
        </div>

        {/* Node Detail Slide-Over Inspector */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border border-indigo-500/30 bg-slate-900/90 p-5 shadow-xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400 uppercase">
                      {selectedNode.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: {selectedNode.id}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Healthy
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">{selectedNode.label}</h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">{selectedNode.description}</p>

                {/* Tech & Framework */}
                <div className="mt-4 rounded-lg bg-slate-950 p-3 border border-slate-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Technology Stack</span>
                  <div className="mt-1 text-xs font-mono font-bold text-indigo-300">{selectedNode.tech}</div>
                </div>

                {/* Live Telemetry Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
                    <div className="text-[9px] text-slate-400">Latency</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">{selectedNode.metrics.latency}</div>
                  </div>
                  <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
                    <div className="text-[9px] text-slate-400">Throughput</div>
                    <div className="text-xs font-bold text-cyan-400 font-mono mt-0.5">{selectedNode.metrics.throughput}</div>
                  </div>
                  <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
                    <div className="text-[9px] text-slate-400">Memory</div>
                    <div className="text-xs font-bold text-purple-400 font-mono mt-0.5">{selectedNode.metrics.memory}</div>
                  </div>
                </div>

                {/* Exposed APIs */}
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-300">Bound Endpoints & Topics</span>
                  <div className="mt-2 space-y-1.5">
                    {selectedNode.apis.map((api, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-md bg-slate-950 px-2.5 py-1.5 text-[11px] font-mono text-slate-300 border border-slate-800">
                        <span className="truncate">{api}</span>
                        <ArrowUpRight className="h-3 w-3 text-indigo-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center text-slate-400">
                Select a node from the canvas to inspect component telemetry.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
