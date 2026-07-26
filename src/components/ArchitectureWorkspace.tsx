'use client';

import React, { useState } from 'react';
import { SystemArchitecture } from '@/types/system';
import { NodeGraphCanvas } from './NodeGraphCanvas';
import { DBSchemaViewer } from './DBSchemaViewer';
import { APIExplorer } from './APIExplorer';
import { AIAgentsMatrix } from './AIAgentsMatrix';
import { CloudArchitectureView } from './CloudArchitectureView';
import { SecurityComplianceView } from './SecurityComplianceView';
import { UserEventFlowView } from './UserEventFlowView';
import { DeploymentPlanView } from './DeploymentPlanView';
import { TechStackMatrix } from './TechStackMatrix';
import { Layers, Database, Terminal, Cpu, Cloud, ShieldCheck, Activity, Rocket, CpuIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchitectureWorkspaceProps {
  architecture: SystemArchitecture;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const ArchitectureWorkspace: React.FC<ArchitectureWorkspaceProps> = ({
  architecture,
  activeView,
  setActiveView,
}) => {
  const tabs = [
    { id: 'topology', label: 'Node Graph', icon: Layers },
    { id: 'database', label: 'DB Schema', icon: Database },
    { id: 'apis', label: 'REST APIs', icon: Terminal },
    { id: 'agents', label: 'AI Agents', icon: Cpu },
    { id: 'cloud', label: 'Cloud Specs', icon: Cloud },
    { id: 'security', label: 'Security Model', icon: ShieldCheck },
    { id: 'flows', label: 'User & Events', icon: Activity },
    { id: 'deployment', label: 'IaC & Deploy', icon: Rocket },
    { id: 'techstack', label: 'Tech Stack', icon: Sparkles },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Architecture System Title Banner */}
      <div className="rounded-2xl glass-panel border border-indigo-500/30 p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20">
                {architecture.category}
              </span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                {architecture.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {architecture.title}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-300 leading-relaxed">
              {architecture.description}
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-slate-950/80 p-3 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Target QPS</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{architecture.stats.qps}</div>
            </div>
            <div className="rounded-xl bg-slate-950/80 p-3 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">p99 Latency</div>
              <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">{architecture.stats.latency}</div>
            </div>
            <div className="rounded-xl bg-slate-950/80 p-3 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Cloud Cost</div>
              <div className="text-sm font-bold text-indigo-300 font-mono mt-0.5">{architecture.stats.estimatedMonthlyCost}</div>
            </div>
            <div className="rounded-xl bg-slate-950/80 p-3 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Security Score</div>
              <div className="text-sm font-bold text-purple-400 font-mono mt-0.5">{architecture.stats.securityScore}</div>
            </div>
          </div>
        </div>

        {/* View Navigation Tabs */}
        <div className="mt-8 flex items-center gap-1.5 overflow-x-auto border-t border-slate-800/80 pt-4 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 scale-[1.02]'
                    : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Render */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
        >
          {activeView === 'topology' && (
            <NodeGraphCanvas nodes={architecture.nodes} edges={architecture.edges} />
          )}

          {activeView === 'database' && (
            <DBSchemaViewer tables={architecture.databaseSchema} />
          )}

          {activeView === 'apis' && (
            <APIExplorer endpoints={architecture.apiEndpoints} />
          )}

          {activeView === 'agents' && (
            <AIAgentsMatrix agents={architecture.aiAgents} />
          )}

          {activeView === 'cloud' && (
            <CloudArchitectureView
              components={architecture.cloudArchitecture}
              baseEstimatedCost={architecture.stats.estimatedMonthlyCost}
            />
          )}

          {activeView === 'security' && (
            <SecurityComplianceView
              policies={architecture.securityModel}
              securityScore={architecture.stats.securityScore}
            />
          )}

          {activeView === 'flows' && (
            <UserEventFlowView
              userFlow={architecture.userFlow}
              eventFlow={architecture.eventFlow}
            />
          )}

          {activeView === 'deployment' && (
            <DeploymentPlanView plan={architecture.deploymentPlan} />
          )}

          {activeView === 'techstack' && (
            <TechStackMatrix stack={architecture.techStack} />
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
