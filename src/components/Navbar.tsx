'use client';

import React from 'react';
import { Cpu, Sparkles, Code2, Download, Share2, Layers } from 'lucide-react';
import { SystemArchitecture } from '@/types/system';

interface NavbarProps {
  currentArchitecture: SystemArchitecture | null;
  onReset: () => void;
  onOpenExport: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentArchitecture,
  onReset,
  onOpenExport,
  activeView,
  setActiveView,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & YC Badge */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
              <Cpu className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                System<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Architect</span> AI
              </span>
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                YC W26
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Autonomous Infrastructure Synthesis</p>
          </div>
        </div>

        {/* View Switcher Tabs (Visible when architecture is loaded) */}
        {currentArchitecture && (
          <nav className="hidden md:flex items-center space-x-1 rounded-xl bg-slate-900/90 p-1 border border-slate-800">
            {[
              { id: 'topology', label: 'Node Graph', icon: Layers },
              { id: 'database', label: 'DB Schema', icon: Code2 },
              { id: 'apis', label: 'REST APIs', icon: Sparkles },
              { id: 'agents', label: 'AI Agents', icon: Cpu },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {currentArchitecture ? (
            <>
              <button
                onClick={onReset}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
              >
                + New Prompt
              </button>
              <button
                onClick={onOpenExport}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
              >
                <Download className="h-3.5 w-3.5" />
                Export JSON
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline-block text-xs text-slate-400">
                Engine Status: <span className="text-emerald-400 font-mono">● Operational</span>
              </span>
              <a
                href="#templates"
                className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-all hover:bg-indigo-500/20"
              >
                Explore Examples
              </a>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
