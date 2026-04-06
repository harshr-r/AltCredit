import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Activity, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  ArrowUpRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Admin: React.FC = () => {
  const [applications, setApplications] = useState([
    { id: 'APP-1245', user: 'Alexander Wright', score: 782, amount: '₹4,50,000', status: 'Approved', date: '2 mins ago', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 'APP-1246', user: 'Eleanor Vance', score: 645, amount: '₹1,20,000', status: 'Pending', date: '15 mins ago', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 'APP-1247', user: 'Julian Thorne', score: 812, amount: '₹1.2M', status: 'Approved', date: '1 hour ago', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 'APP-1248', user: 'Marcus Sterling', score: 520, amount: '₹25,000', status: 'Review', date: '3 hours ago', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 'APP-1249', user: 'Sophia Laurent', score: 755, amount: '₹3,80,000', status: 'Approved', date: '5 hours ago', avatar: 'https://i.pravatar.cc/150?u=5' },
  ]);

  const stats = [
    { label: 'Total Applications', value: '1,245', change: '+12%', isUp: true, icon: FileText, color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Approval Rate', value: '84.2%', change: '+2.4%', isUp: true, icon: CheckCircle2, color: 'bg-green-500/10 text-green-600' },
    { label: 'Total Volume', value: '₹42.5M', change: '+15%', isUp: true, icon: BarChart3, color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Avg. Decision Time', value: '12.4s', change: '-4.2s', isUp: true, icon: Clock, color: 'bg-orange-500/10 text-orange-600' },
  ];

  const handleAction = (action: string) => {
    alert(`Admin Action: ${action}`);
  };

  const handleAppAction = (id: string, action: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : app.status } : app
    ));
  };

  return (
    <div className="p-8 max-w-screen-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-container tracking-tighter font-headline">Lender Portal</h1>
          <p className="text-slate-500 font-medium">System Authority: Overseeing the Axiom Scoring Engine's decision matrix.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleAction('Export')}
            className="px-4 py-2 bg-white border border-outline-variant/30 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Download size={16} /> Export Data
          </button>
          <button 
            onClick={() => handleAction('Audit')}
            className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <ShieldCheck size={16} /> Security Audit
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-3xl border-outline-variant/10 hover:border-primary/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full uppercase tracking-widest bg-green-500/10 text-green-600">
                <ArrowUpRight size={12} />
                {stat.change}
              </div>
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-2xl font-black text-primary-container font-headline">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="glass-panel p-8 rounded-[2.5rem] border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h3 className="text-xl font-black text-primary-container font-headline">Recent Applications</h3>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search applicants..." 
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <button className="p-2.5 bg-white border border-outline-variant/30 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/10">
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Applicant</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Application ID</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Credit Score</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {applications.map((app) => (
                <tr key={app.id} className="group hover:bg-surface-container-low/50 transition-all">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-outline-variant/20 group-hover:scale-110 transition-transform">
                        <img src={app.avatar} alt={app.user} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-black text-primary-container text-sm">{app.user}</div>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className="text-xs font-bold text-slate-500 font-mono">{app.id}</span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        app.score >= 750 ? "bg-green-500" : app.score >= 600 ? "bg-orange-500" : "bg-red-500"
                      )}></div>
                      <span className="text-sm font-black text-primary-container">{app.score}</span>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className="text-sm font-black text-primary-container">{app.amount}</span>
                  </td>
                  <td className="py-5">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                      app.status === 'Approved' ? "bg-green-500/10 text-green-600" : 
                      app.status === 'Pending' ? "bg-orange-500/10 text-orange-600" : 
                      "bg-blue-500/10 text-blue-600"
                    )}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-5">
                    <span className="text-xs font-bold text-slate-400">{app.date}</span>
                  </td>
                  <td className="py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 5 of 1,245 applications</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-outline-variant/30 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all">Previous</button>
            <button className="px-4 py-2 bg-white border border-outline-variant/30 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all">Next</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Decision Matrix */}
        <div className="glass-panel p-8 rounded-[2.5rem] border-outline-variant/10">
          <h3 className="text-xl font-black text-primary-container font-headline mb-8">Axiom Decision Matrix</h3>
          <div className="space-y-8">
            {[
              { label: 'Risk Tolerance', value: 'Aggressive', color: 'bg-red-500' },
              { label: 'Liquidity Threshold', value: '₹1.2M', color: 'bg-blue-500' },
              { label: 'Exposure Limit', value: '12.5%', color: 'bg-purple-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm font-black text-primary-container">{item.value}</span>
                </div>
                <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: '65%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="glass-panel p-8 rounded-[2.5rem] border-outline-variant/10 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2563eb" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset="42.4" strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-primary-container font-headline">85%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</span>
              </div>
            </div>
            <h4 className="text-lg font-black text-primary-container font-headline mb-2">System Integrity: High</h4>
            <p className="text-xs text-slate-500 font-medium">All nodes are synchronized with the central authority.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
