import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Database, 
  Network, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Server, 
  Cloud, 
  Lock, 
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Code
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Architecture: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState(452);
  const [throughput, setThroughput] = useState(1240);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setThroughput(prev => prev + (Math.random() > 0.5 ? 5 : -5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const logs = [
    { time: '09:45:12', type: 'info', msg: 'Batch processing cycle initiated for region: US-EAST-1' },
    { time: '09:45:15', type: 'success', msg: 'Axiom Scoring Engine: Handshake successful' },
    { time: '09:45:22', type: 'info', msg: 'Processing 12,450 records across 452 active nodes' },
    { time: '09:45:30', type: 'warning', msg: 'Node 124: Latency spike detected (45ms). Rerouting...' },
    { time: '09:45:45', type: 'success', msg: 'Encryption layer: AES-256-GCM verified' },
    { time: '09:46:02', type: 'info', msg: 'Data synchronization with Ledger Core complete' },
  ];

  const components = [
    { name: 'Axiom Core', status: 'Operational', load: '42%', icon: Cpu, color: 'text-blue-500' },
    { name: 'Ledger DB', status: 'Healthy', load: '18%', icon: Database, color: 'text-green-500' },
    { name: 'Auth Layer', status: 'Secure', load: '12%', icon: ShieldCheck, color: 'text-purple-500' },
    { name: 'API Gateway', status: 'Operational', load: '65%', icon: Network, color: 'text-orange-500' },
  ];

  return (
    <div className="p-8 max-w-screen-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-container tracking-tighter font-headline">System Architecture</h1>
          <p className="text-slate-500 font-medium">Real-time monitoring of the ArchitectLedger infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-outline-variant/30 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <RefreshCcw size={16} className={isProcessing ? "animate-spin" : ""} /> Force Sync
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Terminal size={16} /> System Console
          </button>
        </div>
      </div>

      {/* Main Architecture Canvas */}
      <div className="architecture-canvas h-[500px] rounded-[3rem] p-12 relative overflow-hidden flex items-center justify-center border border-primary/10">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Central Core */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative z-10 w-48 h-48 bg-primary rounded-[2.5rem] shadow-[0_0_80px_rgba(37,99,235,0.4)] flex flex-col items-center justify-center text-on-primary border-4 border-white/20"
        >
          <Cpu size={48} className="mb-4" />
          <div className="text-sm font-black uppercase tracking-[0.2em]">Axiom Core</div>
          <div className="text-[10px] font-bold opacity-70">v4.2.1-stable</div>
        </motion.div>

        {/* Orbiting Nodes */}
        {[
          { icon: Database, label: 'Ledger DB', pos: 'top-20 left-1/4', color: 'bg-green-500' },
          { icon: ShieldCheck, label: 'Auth', pos: 'top-20 right-1/4', color: 'bg-purple-500' },
          { icon: Network, label: 'Gateway', pos: 'bottom-20 left-1/4', color: 'bg-orange-500' },
          { icon: Cloud, label: 'Sync', pos: 'bottom-20 right-1/4', color: 'bg-blue-500' },
        ].map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className={cn("absolute z-10 p-6 rounded-3xl bg-white shadow-xl border border-outline-variant/20 flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform", node.pos)}
          >
            <div className={cn("p-3 rounded-2xl text-white shadow-lg", node.color)}>
              <node.icon size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{node.label}</span>
            
            {/* Connection Lines (Visual only) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10 rotate-45"></div>
          </motion.div>
        ))}

        {/* Status Indicators */}
        <div className="absolute bottom-8 left-8 flex gap-6">
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border-white/40">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Nodes</div>
              <div className="text-lg font-black text-primary-container font-headline">{activeNodes}</div>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border-white/40">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Throughput</div>
              <div className="text-lg font-black text-primary-container font-headline">{throughput} req/s</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Components */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] border-outline-variant/10">
          <h3 className="text-xl font-black text-primary-container font-headline mb-8">Component Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {components.map((comp, i) => (
              <div key={i} className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={cn("p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform", comp.color)}>
                    <comp.icon size={28} />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-outline-variant/10">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{comp.status}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-primary-container font-headline">{comp.name}</span>
                    <span className="text-sm font-bold text-slate-400">{comp.load} Load</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: comp.load }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Logs */}
        <div className="glass-panel p-8 rounded-[2.5rem] border-outline-variant/10 bg-slate-950 text-slate-300 font-mono text-xs overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <Code size={16} className="text-primary" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Axiom_System_Logs</span>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-500">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                <span className={cn(
                  "font-bold uppercase tracking-widest text-[8px] px-1.5 py-0.5 rounded shrink-0",
                  log.type === 'success' ? "bg-green-500/20 text-green-400" : 
                  log.type === 'warning' ? "bg-orange-500/20 text-orange-400" : 
                  "bg-blue-500/20 text-blue-400"
                )}>
                  {log.type}
                </span>
                <span className="leading-relaxed">{log.msg}</span>
              </div>
            ))}
            <div className="flex gap-3 animate-pulse">
              <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-primary">_</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-500">
            <span>Nodes: 452 Online</span>
            <span>Latency: 12ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
