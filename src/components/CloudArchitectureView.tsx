'use client';

import React, { useState } from 'react';
import { CloudComponent } from '@/types/system';
import { Cloud, Server, DollarSign, Cpu, ShieldCheck, Zap, Sliders } from 'lucide-react';

interface CloudArchitectureViewProps {
  components: CloudComponent[];
  baseEstimatedCost: string;
}

export const CloudArchitectureView: React.FC<CloudArchitectureViewProps> = ({ components, baseEstimatedCost }) => {
  const [scaleMultiplier, setScaleMultiplier] = useState<number>(1);

  const baseCostNumber = components.reduce((acc, c) => acc + c.monthlyCost, 0);
  const adjustedTotal = Math.round(baseCostNumber * scaleMultiplier);

  return (
    <div className="rounded-2xl glass-panel border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cloud className="h-5 w-5 text-cyan-400" />
            Cloud Multi-Region Infrastructure & Cost Calculator
          </h3>
          <p className="text-xs text-slate-400">AWS / GCP / Azure compute clusters, database instances, serverless edge networks, and live cost projections.</p>
        </div>

        {/* Live Monthly Cost Badge */}
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-right shadow-lg shadow-cyan-500/10">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Monthly Cloud Spend</div>
          <div className="text-lg font-extrabold text-cyan-300 font-mono">${adjustedTotal.toLocaleString()} / mo</div>
        </div>
      </div>

      {/* Interactive Scaling Slider */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-indigo-400" />
            Production Traffic Scaling Estimator
          </span>
          <span className="font-mono text-indigo-300 font-bold">
            {scaleMultiplier === 1 ? '1x Base Production' : `${scaleMultiplier}x Traffic Burst`}
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={scaleMultiplier}
          onChange={(e) => setScaleMultiplier(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />

        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>1x (Base SLA)</span>
          <span>2.5x (Peak Surge)</span>
          <span>5x (Global Scale)</span>
        </div>
      </div>

      {/* Cloud Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((comp, idx) => {
          const itemCost = Math.round(comp.monthlyCost * scaleMultiplier);
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition-all hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-400 border border-indigo-500/20">
                  {comp.provider}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  ${itemCost.toLocaleString()} / mo
                </span>
              </div>

              <h4 className="mt-2 text-sm font-bold text-white">{comp.name}</h4>
              <div className="mt-1 text-xs text-slate-300 font-mono">{comp.service} ({comp.tier})</div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-900 pt-2 text-[10px] text-slate-400 font-mono">
                <span>Region: <strong className="text-slate-300">{comp.region}</strong></span>
                <span className="text-cyan-400">{comp.autoScaleConfig}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
