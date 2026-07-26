'use client';

import React, { useState } from 'react';
import { ApiEndpoint } from '@/types/system';
import { Terminal, Play, Lock, ShieldCheck, Zap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface APIExplorerProps {
  endpoints: ApiEndpoint[];
}

export const APIExplorer: React.FC<APIExplorerProps> = ({ endpoints }) => {
  const [selectedApi, setSelectedApi] = useState<ApiEndpoint>(endpoints[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'POST': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'PUT': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'DELETE': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  const handleTestRequest = () => {
    setIsExecuting(true);
    setResponseOutput(null);
    setExecutionTime(null);

    const startTime = performance.now();
    setTimeout(() => {
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime + Math.random() * 12));
      setResponseOutput(selectedApi.responseBody);
      setIsExecuting(false);
    }, 450);
  };

  return (
    <div className="rounded-2xl glass-panel border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="h-5 w-5 text-indigo-400" />
            REST & OpenAPI 3.0 Specifications
          </h3>
          <p className="text-xs text-slate-400">Interactive API sandbox with payload validation, rate-limiting rules, and mTLS authentication bounds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: API Endpoint List */}
        <div className="lg:col-span-5 space-y-2">
          {endpoints.map((api) => {
            const isSelected = selectedApi.id === api.id;
            return (
              <button
                key={api.id}
                onClick={() => {
                  setSelectedApi(api);
                  setResponseOutput(null);
                }}
                className={`w-full text-left rounded-xl p-3 border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getMethodBadge(api.method)}`}>
                    {api.method}
                  </span>
                  {api.authRequired && (
                    <span className="flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                      <Lock className="h-3 w-3" /> OAuth2
                    </span>
                  )}
                </div>
                <div className="mt-2 text-xs font-mono font-bold text-white truncate">{api.path}</div>
                <div className="mt-1 text-[11px] text-slate-400 line-clamp-1">{api.summary}</div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Endpoint Specification & Try Sandbox */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getMethodBadge(selectedApi.method)}`}>
                {selectedApi.method}
              </span>
              <h4 className="mt-1 text-sm font-mono font-bold text-white">{selectedApi.path}</h4>
            </div>

            <button
              onClick={handleTestRequest}
              disabled={isExecuting}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <Activity className="h-3.5 w-3.5 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Send Request
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{selectedApi.description}</p>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            <span>Rate Limit: <strong className="text-indigo-300">{selectedApi.rateLimit}</strong></span>
            <span>Auth: <strong className="text-amber-400">{selectedApi.authRequired ? 'mTLS Bearer JWT' : 'Public'}</strong></span>
          </div>

          {/* Request Payload */}
          {selectedApi.requestBody && (
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-1">JSON Request Body</span>
              <pre className="rounded-lg bg-slate-900 p-3 font-mono text-[11px] text-indigo-300 border border-slate-800 overflow-x-auto">
                {selectedApi.requestBody}
              </pre>
            </div>
          )}

          {/* Response Output */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">HTTP Response (200 OK)</span>
              {executionTime !== null && (
                <span className="font-mono text-emerald-400 font-bold">Latency: {executionTime} ms</span>
              )}
            </div>
            <pre className="rounded-lg bg-slate-900 p-3 font-mono text-[11px] text-emerald-400 border border-slate-800 overflow-x-auto min-h-[120px]">
              {responseOutput || selectedApi.responseBody}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
