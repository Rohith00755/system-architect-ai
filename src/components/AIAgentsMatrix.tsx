'use client';

import React, { useState } from 'react';
import { AiAgent } from '@/types/system';
import { Cpu, Bot, Send, Sparkles, Terminal, Activity } from 'lucide-react';

interface AIAgentsMatrixProps {
  agents: AiAgent[];
}

export const AIAgentsMatrix: React.FC<AIAgentsMatrixProps> = ({ agents }) => {
  const [selectedAgent, setSelectedAgent] = useState<AiAgent>(agents[0]);
  const [userChatInput, setUserChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'agent'; text: string }>>([
    { role: 'user', text: agents[0]?.sampleQuery || 'Initialize agent diagnosis.' },
    { role: 'agent', text: agents[0]?.sampleResponse || 'Agent online and listening.' },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim() || isSimulating) return;

    const input = userChatInput.trim();
    setUserChatInput('');
    setChatHistory((prev) => [...prev, { role: 'user', text: input }]);
    setIsSimulating(true);

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'agent',
          text: `[${selectedAgent.name} - Inferred via ${selectedAgent.model}]: Processed prompt "${input}". Evaluated ${selectedAgent.tools.length} bound tools. System confidence: 99.4%. Recommendation: Action executed cleanly without exception.`,
        },
      ]);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="rounded-2xl glass-panel border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-400" />
            AI Multi-Agent Hierarchy & Reasoning Matrix
          </h3>
          <p className="text-xs text-slate-400">Autonomous LLM agent topology, system prompts, vector RAG memory bindings, and tool definitions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Agent Selector */}
        <div className="lg:col-span-5 space-y-4">
          {agents.map((agent) => {
            const isSelected = selectedAgent.id === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => {
                  setSelectedAgent(agent);
                  setChatHistory([
                    { role: 'user', text: agent.sampleQuery },
                    { role: 'agent', text: agent.sampleResponse },
                  ]);
                }}
                className={`cursor-pointer rounded-xl p-4 border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500/50 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-purple-400" />
                    {agent.name}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {agent.model}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-300">{agent.role}</p>

                {/* Bound tools */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {agent.tools.map((tool, idx) => (
                    <span key={idx} className="rounded bg-slate-950 px-2 py-0.5 text-[9px] font-mono text-slate-400 border border-slate-800">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive Agent Chat Simulator */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-800 bg-slate-950 p-5 min-h-[420px]">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                {selectedAgent.name} Playground
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">Memory: {selectedAgent.memoryType}</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              ● Ready
            </span>
          </div>

          {/* System Prompt Box */}
          <div className="mb-4 rounded-lg bg-slate-900 p-3 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">System Prompt Directive</span>
            <p className="line-clamp-2 leading-relaxed">{selectedAgent.systemPrompt}</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[220px] pr-2 mb-4">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-xl p-3 max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none font-mono text-[11px]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isSimulating && (
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-slate-900/60 p-2 rounded-lg w-fit">
                <Activity className="h-3.5 w-3.5 animate-spin" />
                Inferring response...
              </div>
            )}
          </div>

          {/* Interactive Input Form */}
          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              value={userChatInput}
              onChange={(e) => setUserChatInput(e.target.value)}
              placeholder={`Ask ${selectedAgent.name}...`}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!userChatInput.trim() || isSimulating}
              className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-purple-500 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
