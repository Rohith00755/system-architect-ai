'use client';

import React, { useEffect, useState } from 'react';
import { Cpu, Terminal, CheckCircle2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArchitectLoaderProps {
  promptText: string;
}

export const ArchitectLoader: React.FC<ArchitectLoaderProps> = ({ promptText }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Ingesting Natural Language Requirements', detail: `Parsing scope & domain context for "${promptText}"` },
    { title: 'Mapping Microservices & Topological Nodes', detail: 'Designing Envoy gateway, gRPC routing, and fault-tolerant boundaries' },
    { title: 'Orchestrating AI Multi-Agent Matrix', detail: 'Generating system prompts, tool bindings, and RAG vector memory schemas' },
    { title: 'Formulating Database Schemas & Index Strategy', detail: 'Compiling PostgreSQL DDL, foreign key relationships, and hypertable partitions' },
    { title: 'Designing Cloud Infrastructure & Security Model', detail: 'Calculating multi-region AWS/GCP nodes, mTLS certificates, and monthly cost' },
    { title: 'Finalizing System Architecture Blueprint', detail: 'Building interactive topology graph and OpenAPI specifications' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="glass-panel rounded-2xl p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Cpu className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Synthesizing System Architecture</h2>
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            </div>
            <p className="text-xs text-slate-400">
              Generating blueprint for: <span className="text-indigo-300 font-medium font-mono">"{promptText}"</span>
            </p>
          </div>
        </div>

        {/* Telemetry Progress Steps */}
        <div className="mt-8 space-y-4">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-start gap-3 rounded-xl p-3 text-xs transition-all ${
                  isCurrent
                    ? 'bg-indigo-500/10 border border-indigo-500/30 text-white'
                    : isDone
                    ? 'bg-slate-900/40 text-slate-400'
                    : 'opacity-40 text-slate-500'
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Activity className="h-4 w-4 text-indigo-400 animate-spin" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-slate-700" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{step.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{step.detail}</div>
                </div>
                {isCurrent && (
                  <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded">
                    PROCESSING
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Terminal Log Output */}
        <div className="mt-8 rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-2 text-slate-500 border-b border-slate-900 pb-2 mb-2">
            <Terminal className="h-3.5 w-3.5" />
            <span>AI Architecture Engine Telemetry Log</span>
          </div>
          <div className="text-emerald-400">[SYSTEM] Initialization completed. CPU threads: 16. VRAM: 32GB</div>
          <div className="text-indigo-300">[PARSER] Natural language prompt validated. Domain confidence: 99.8%</div>
          <div className="text-cyan-400">[TOPOLOGY] Generating 8 interconnected microservices & AI agent nodes</div>
          <div className="text-purple-300">[DDL] Compiling PostgreSQL DDL with ACID hypertable partitioning</div>
          <div className="text-slate-400">[COMPLETED] Rendering interactive canvas...</div>
        </div>

      </div>
    </div>
  );
};
