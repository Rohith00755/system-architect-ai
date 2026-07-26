'use client';

import React, { useState } from 'react';
import { SystemArchitecture } from '@/types/system';
import { X, Download, Copy, Check, FileCode, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  architecture: SystemArchitecture;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ architecture, onClose }) => {
  const [activeTab, setActiveTab] = useState<'json' | 'mermaid' | 'terraform'>('json');
  const [copied, setCopied] = useState(false);

  const getJsonString = () => JSON.stringify(architecture, null, 2);

  const getMermaidString = () => {
    const lines = ['graph TD'];
    architecture.nodes.forEach(n => {
      lines.push(`  ${n.id}["${n.label} (${n.tech})"]`);
    });
    architecture.edges.forEach(e => {
      lines.push(`  ${e.from} -->|"${e.label}"| ${e.to}`);
    });
    return lines.join('\n');
  };

  const getTerraformString = () => {
    return `# System Architect AI - Terraform Module for ${architecture.title}\n\nmodule "system_infrastructure" {\n  source = "terraform-aws-modules/vpc/aws"\n  name   = "${architecture.id}-vpc"\n  cidr   = "10.0.0.0/16"\n  azs    = ["us-east-1a", "us-east-1b"]\n}\n\n# Node Count: ${architecture.stats.nodeCount} microservices & AI agents\n# Security Score: ${architecture.stats.securityScore}`;
  };

  const getContent = () => {
    if (activeTab === 'json') return getJsonString();
    if (activeTab === 'mermaid') return getMermaidString();
    return getTerraformString();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([getJsonString()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${architecture.id}-architecture.json`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Download className="h-5 w-5 text-indigo-400" />
              Export System Architecture
            </h3>
            <p className="text-xs text-slate-400">Download production specs for "{architecture.title}"</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'json', label: 'Architecture JSON' },
            { id: 'mermaid', label: 'Mermaid JS Diagram' },
            { id: 'terraform', label: 'Terraform HCL' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Snippet Box */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 max-h-[350px] overflow-y-auto font-mono text-[11px] text-indigo-300">
          <pre>{getContent()}</pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
          >
            <Download className="h-4 w-4" />
            Download JSON File
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Snippet'}
          </button>
        </div>

      </div>
    </div>
  );
};
