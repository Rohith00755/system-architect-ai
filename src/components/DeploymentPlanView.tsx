'use client';

import React, { useState } from 'react';
import { DeploymentStage } from '@/types/system';
import { Rocket, FileCode, CheckCircle2, Terminal, Copy, Check } from 'lucide-react';

interface DeploymentPlanViewProps {
  plan: DeploymentStage[];
}

export const DeploymentPlanView: React.FC<DeploymentPlanViewProps> = ({ plan }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="rounded-2xl glass-panel border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Rocket className="h-5 w-5 text-indigo-400" />
            Deployment Plan & Infrastructure as Code (IaC)
          </h3>
          <p className="text-xs text-slate-400">Terraform HCL manifests, Helm charts, and Docker Compose configurations.</p>
        </div>
      </div>

      <div className="space-y-6">
        {plan.map((stage, idx) => (
          <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {stage.tool}
                </span>
                <h4 className="mt-1 text-sm font-bold text-white">{stage.stage}</h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{stage.description}</p>

            {stage.snippet && (
              <div className="rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950 text-[11px] font-mono text-slate-400">
                  <span>{stage.snippet.filename} ({stage.snippet.language})</span>
                  <button
                    onClick={() => handleCopy(stage.snippet!.code, idx)}
                    className="flex items-center gap-1 hover:text-white transition-all"
                  >
                    {copiedIdx === idx ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copiedIdx === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 text-[11px] font-mono text-indigo-300 overflow-x-auto">
                  {stage.snippet.code}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
