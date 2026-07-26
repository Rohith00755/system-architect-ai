'use client';

import React from 'react';
import { UserStep, EventTopic } from '@/types/system';
import { Activity, ArrowRight, Zap, Radio, CheckCircle2 } from 'lucide-react';

interface UserEventFlowViewProps {
  userFlow: UserStep[];
  eventFlow: EventTopic[];
}

export const UserEventFlowView: React.FC<UserEventFlowViewProps> = ({ userFlow, eventFlow }) => {
  return (
    <div className="rounded-2xl glass-panel border border-slate-800 p-6 space-y-8">
      
      {/* User Journey Section */}
      <div>
        <div className="border-b border-slate-800 pb-3 mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-400" />
            End-to-End User & System Execution Flow
          </h3>
          <p className="text-xs text-slate-400">Sequence of actions from client trigger to background system reaction.</p>
        </div>

        <div className="space-y-4">
          {userFlow.map((step) => (
            <div key={step.step} className="flex gap-4 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 font-mono">
                {step.step}
              </div>
              <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-white">{step.title}</h4>
                  <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    Actor: {step.actor}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{step.action}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono border-t border-slate-900 pt-2">
                  <span className="text-emerald-400">Response: {step.systemResponse}</span>
                  <span className="text-slate-400">Impact: {step.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Topics Section */}
      <div>
        <div className="border-b border-slate-800 pb-3 mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Radio className="h-5 w-5 text-amber-400" />
            Event-Driven Architecture (Kafka / NATS Topics)
          </h3>
          <p className="text-xs text-slate-400">Decoupled pub/sub message queues, payloads, and consumer targets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventFlow.map((topic, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-300 truncate">{topic.name}</span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                  {topic.payloadFormat}
                </span>
              </div>
              <div className="text-xs text-slate-300">Producer: <strong className="text-white">{topic.producer}</strong></div>
              <div className="text-xs text-slate-400">
                Consumers: <span className="text-indigo-300 font-mono">{topic.consumers.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
