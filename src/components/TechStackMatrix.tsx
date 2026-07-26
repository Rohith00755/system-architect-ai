'use client';

import React from 'react';
import { TechItem } from '@/types/system';
import { Layers, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

interface TechStackMatrixProps {
  stack: TechItem[];
}

export const TechStackMatrix: React.FC<TechStackMatrixProps> = ({ stack }) => {
  return (
    <div className="rounded-2xl glass-panel border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            Recommended Technology Stack & Rationale
          </h3>
          <p className="text-xs text-slate-400">Curated languages, frameworks, vector DBs, and event stream brokers suited for production scale.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stack.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{item.category}</span>
              <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[9px] font-mono text-indigo-400 border border-indigo-500/20">
                {item.badge}
              </span>
            </div>

            <h4 className="text-sm font-bold text-white">{item.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{item.reasoning}</p>
          </div>
        ))}
      </div>

    </div>
  );
};
