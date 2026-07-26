'use client';

import React, { useState } from 'react';
import { DatabaseTable } from '@/types/system';
import { Database, Key, Copy, Check, Table, ShieldCheck, Zap } from 'lucide-react';

interface DBSchemaViewerProps {
  tables: DatabaseTable[];
}

export const DBSchemaViewer: React.FC<DBSchemaViewerProps> = ({ tables }) => {
  const [selectedTable, setSelectedTable] = useState<DatabaseTable>(tables[0]);
  const [copied, setCopied] = useState(false);

  const generateDDL = (table: DatabaseTable) => {
    const cols = table.columns.map(c => `  ${c.name.padEnd(20)} ${c.type.padEnd(16)} ${c.constraints}`).join(',\n');
    const idxs = table.indexes.join(';\n');
    return `-- PostgreSQL 16 DDL Schema for Table: ${table.name}\nCREATE TABLE ${table.name} (\n${cols}\n);\n\n-- Indexes & Partitioning Strategy\n${idxs};`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDDL(selectedTable));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl glass-panel border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-400" />
            Database Schema & DDL Architecture
          </h3>
          <p className="text-xs text-slate-400">PostgreSQL 16 relational DDL, hypertable time-series partitions, and vector index configurations.</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-indigo-500 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-indigo-400" />}
          {copied ? 'Copied DDL!' : 'Copy SQL DDL'}
        </button>
      </div>

      {/* Table Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/60">
        {tables.map((table) => (
          <button
            key={table.name}
            onClick={() => setSelectedTable(table)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
              selectedTable.name === table.name
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Table className="h-4 w-4" />
            {table.name}
          </button>
        ))}
      </div>

      {/* Table Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Schema Fields */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400">Table Overview</span>
              <span className="font-mono text-emerald-400 font-bold">PK: {selectedTable.primaryKey}</span>
            </div>
            <p className="text-xs text-white leading-relaxed">{selectedTable.description}</p>
          </div>

          {/* Columns Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Column Name</th>
                  <th className="px-4 py-3 font-semibold">Data Type</th>
                  <th className="px-4 py-3 font-semibold">Constraints</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {selectedTable.columns.map((col, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="px-4 py-2.5 font-bold text-indigo-300 flex items-center gap-1.5">
                      {col.constraints.includes('PRIMARY KEY') && <Key className="h-3 w-3 text-amber-400" />}
                      {col.name}
                    </td>
                    <td className="px-4 py-2.5 text-emerald-400">{col.type}</td>
                    <td className="px-4 py-2.5 text-slate-400 text-[10px]">{col.constraints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Foreign Relationships */}
          {selectedTable.relationships.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-semibold text-slate-300 block mb-2">Entity Foreign Key Mappings</span>
              <div className="space-y-1">
                {selectedTable.relationships.map((rel, idx) => (
                  <div key={idx} className="text-[11px] font-mono text-indigo-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                    {rel}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Copyable SQL DDL Snippet */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex-1 font-mono text-[11px] text-emerald-400 overflow-x-auto">
            <div className="text-xs text-slate-500 border-b border-slate-900 pb-2 mb-3 font-sans font-semibold">
              PostgreSQL DDL Code Generator
            </div>
            <pre className="leading-relaxed whitespace-pre-wrap">{generateDDL(selectedTable)}</pre>
          </div>
        </div>

      </div>

    </div>
  );
};
