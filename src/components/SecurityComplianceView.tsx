'use client';

import React from 'react';
import { SecurityPolicy } from '@/types/system';
import { ShieldCheck, Lock, Key, CheckCircle2, Award, FileCode } from 'lucide-react';

interface SecurityComplianceViewProps {
  policies: SecurityPolicy[];
  securityScore: string;
}

export const SecurityComplianceView: React.FC<SecurityComplianceViewProps> = ({ policies, securityScore }) => {
  return (
    <div className="rounded-2xl glass-panel border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-rose-400" />
            Security & Zero-Trust Compliance Architecture
          </h3>
          <p className="text-xs text-slate-400">mTLS identity attestation, AES-256 GCM envelope encryption, and SOC2 / HIPAA readiness models.</p>
        </div>

        {/* Security Audit Rating */}
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-right">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Security Readiness Score</div>
          <div className="text-lg font-extrabold text-rose-300 font-mono">{securityScore}</div>
        </div>
      </div>

      {/* Security Policies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((policy, idx) => (
          <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-400 border border-rose-500/20">
                {policy.category}
              </span>
              <Lock className="h-4 w-4 text-slate-500" />
            </div>

            <h4 className="text-sm font-bold text-white">{policy.mechanism}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{policy.description}</p>

            <div className="pt-2 border-t border-slate-900 flex flex-wrap gap-1">
              {policy.compliance.map((c, cIdx) => (
                <span key={cIdx} className="inline-flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-slate-800">
                  <CheckCircle2 className="h-3 w-3" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
