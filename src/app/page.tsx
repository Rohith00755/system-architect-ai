'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroPromptBox } from '@/components/HeroPromptBox';
import { ArchitectLoader } from '@/components/ArchitectLoader';
import { ArchitectureWorkspace } from '@/components/ArchitectureWorkspace';
import { ExportModal } from '@/components/ExportModal';
import { generateArchitectureFromPrompt } from '@/lib/dynamic-generator';
import { PREBUILT_TEMPLATES } from '@/lib/templates';
import { SystemArchitecture } from '@/types/system';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Database, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [architecture, setArchitecture] = useState<SystemArchitecture | null>(null);
  const [activeView, setActiveView] = useState('topology');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleGenerate = (promptText: string) => {
    setCurrentPrompt(promptText);
    setIsLoading(true);
    setArchitecture(null);

    // Simulate AI synthesis telemetry
    setTimeout(() => {
      const generated = generateArchitectureFromPrompt(promptText);
      setArchitecture(generated);
      setIsLoading(false);
      setActiveView('topology');
    }, 2800);
  };

  const handleSelectTemplate = (templateKey: string) => {
    const tmpl = PREBUILT_TEMPLATES[templateKey];
    if (tmpl) {
      setCurrentPrompt(tmpl.title);
      setIsLoading(true);
      setArchitecture(null);

      setTimeout(() => {
        setArchitecture(tmpl);
        setIsLoading(false);
        setActiveView('topology');
      }, 1500);
    }
  };

  const handleReset = () => {
    setArchitecture(null);
    setIsLoading(false);
    setCurrentPrompt('');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentArchitecture={architecture}
        onReset={handleReset}
        onOpenExport={() => setIsExportOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main>
        {/* State 1: Hero & Prompt Box (When no architecture loaded and not loading) */}
        {!architecture && !isLoading && (
          <>
            <HeroPromptBox onGenerate={handleGenerate} isLoading={isLoading} />

            {/* Featured Pre-Built Systems Catalog Section */}
            <section id="templates" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20">
                  Prebuilt System Architectures
                </span>
                <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                  Production-Ready Reference Architectures
                </h2>
                <p className="mt-2 text-sm text-slate-400 max-w-2xl mx-auto">
                  Click any pre-compiled system to inspect node topologies, OpenAPI 3.0 endpoints, PyTorch multi-agent models, and PostgreSQL schemas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { key: 'smart-hospital', title: 'Autonomous Smart Hospital OS', category: 'Healthcare & IoT', icon: '🏥', desc: 'Real-time patient monitoring, IoT medical telemetry, AI diagnostic triage, and FHIR EMR storage.' },
                  { key: 'drone-delivery', title: 'Drone Delivery Platform', category: 'Logistics & Aerospace', icon: '🛸', desc: '5G telemetry hub, Uber H3 dynamic 3D airspace path planning, and FAA UTM Remote-ID tracking.' },
                  { key: 'autonomous-warehouse', title: 'Robotic Autonomous Warehouse', category: 'Robotics & Supply Chain', icon: '🤖', desc: 'Swarm robotics MAPF gridlock avoidance, Redis AMR floor map, and AI barcode vision sorting.' },
                ].map((item) => (
                  <motion.div
                    key={item.key}
                    whileHover={{ y: -5 }}
                    className="glass-panel glass-panel-hover flex flex-col justify-between rounded-2xl p-6 border border-slate-800"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => handleSelectTemplate(item.key)}
                      className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-2.5 text-xs font-bold text-indigo-300 transition-all hover:bg-indigo-600 hover:text-white"
                    >
                      Inspect System Architecture
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* State 2: Telemetry Loader */}
        {isLoading && <ArchitectLoader promptText={currentPrompt} />}

        {/* State 3: Active Architecture Workspace */}
        {architecture && !isLoading && (
          <ArchitectureWorkspace
            architecture={architecture}
            activeView={activeView}
            setActiveView={setActiveView}
          />
        )}
      </main>

      {/* Export Modal */}
      {isExportOpen && architecture && (
        <ExportModal architecture={architecture} onClose={() => setIsExportOpen(false)} />
      )}

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-indigo-400" />
            <span className="font-bold text-slate-300">System Architect AI</span>
            <span>• Y Combinator Seed Portfolio</span>
          </div>
          <div>Powered by Gemini 3.6 • Next.js 14 • Tailwind CSS • Framer Motion</div>
        </div>
      </footer>
    </div>
  );
}
