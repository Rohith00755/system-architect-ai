'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Activity, ShieldCheck, Database, Cpu, Cloud, Terminal, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroPromptBoxProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export const HeroPromptBox: React.FC<HeroPromptBoxProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const samplePrompts = [
    { label: '🏥 Smart Hospital OS', text: 'Build a smart hospital' },
    { label: '🛸 Drone Delivery Platform', text: 'Build a drone delivery platform' },
    { label: '🤖 Autonomous Warehouse', text: 'Build a warehouse with autonomous robots' },
    { label: '💳 AI Banking Engine', text: 'Build an AI banking system with fraud detection' },
    { label: '🎬 Real-Time Video Streaming', text: 'Build a high-scale real-time video analytics platform' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  };

  const handleSelectSample = (sampleText: string) => {
    setPrompt(sampleText);
    onGenerate(sampleText);
  };

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Glow background artifacts */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-20 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[90px]" />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* YC Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-slate-900/80 px-4 py-1.5 backdrop-blur-md mb-8 shadow-inner"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
          <span className="text-xs font-semibold text-indigo-300">
            Backed by Y Combinator • System Architect AI v3.6
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-xs text-slate-400">Natural Language to Production Specs</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Architect Any Complex System <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
            In Natural Language
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg"
        >
          Describe your product or infrastructure concept. The AI instantly synthesizes topological node diagrams, PostgreSQL DDL schemas, REST API specs, AI agent hierarchies, and cloud deployment manifests.
        </motion.p>

        {/* Prompt Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-40 blur-lg transition duration-500 group-hover:opacity-75" />
            
            <div className="relative flex items-center rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 backdrop-blur-xl shadow-2xl">
              <div className="pl-4 pr-2 text-indigo-400">
                <Sparkles className="h-6 w-6 animate-pulse" />
              </div>
              
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 'Build a smart hospital' or 'Build a drone delivery platform'"
                className="w-full bg-transparent px-2 py-3 text-base text-white placeholder-slate-400 focus:outline-none sm:text-lg"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <>
                    <Activity className="h-4 w-4 animate-spin" />
                    Synthesizing...
                  </>
                ) : (
                  <>
                    Generate
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Preset Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Try Prompts:</span>
            {samplePrompts.map((sample) => (
              <button
                key={sample.label}
                onClick={() => handleSelectSample(sample.text)}
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3.5 py-1.5 text-xs text-slate-300 transition-all hover:border-indigo-500/50 hover:bg-slate-800 hover:text-indigo-300"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {[
            { icon: Activity, label: 'Node Topology', desc: 'Interactive Graph' },
            { icon: Database, label: 'Postgres DDL', desc: 'SQL Schema' },
            { icon: Terminal, label: 'REST & gRPC', desc: 'OpenAPI Specs' },
            { icon: Cpu, label: 'AI Multi-Agent', desc: 'Agent Prompts' },
            { icon: Cloud, label: 'Cloud Architecture', desc: 'AWS / GCP Specs' },
            { icon: ShieldCheck, label: 'Zero Trust IAM', desc: 'Security Model' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover flex flex-col items-center rounded-xl p-4 text-center"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-semibold text-white">{item.label}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
};
