import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  CreditCard, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  MoreVertical,
  Calendar,
  PieChart,
  Lock, 
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState(124592.00);
  const [monthlySpend, setMonthlySpend] = useState(4230.15);
  const [creditScore, setCreditScore] = useState(782);
  const [activeAssets, setActiveAssets] = useState(12);
  
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Apple Store', category: 'Technology', amount: -1299.00, date: 'Today, 2:45 PM', icon: '💻' },
    { id: 2, name: 'Salary Deposit', category: 'Income', amount: 8500.00, date: 'Yesterday, 9:00 AM', icon: '💰' },
    { id: 3, name: 'Whole Foods', category: 'Groceries', amount: -245.30, date: 'Yesterday, 6:30 PM', icon: '🥦' },
    { id: 4, name: 'Netflix Subscription', category: 'Entertainment', amount: -19.99, date: 'Oct 24, 2024', icon: '🎬' },
    { id: 5, name: 'Uber Technologies', category: 'Transport', amount: -42.50, date: 'Oct 23, 2024', icon: '🚗' },
  ]);

  const [chartData, setChartData] = useState([40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + (Math.random() * 10 - 5));
      setChartData(prev => [...prev.slice(1), Math.floor(Math.random() * 60) + 40]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Total Balance', value: `₹${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, change: '+12.5%', isUp: true, icon: CreditCard, color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Monthly Spend', value: `₹${monthlySpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, change: '-2.4%', isUp: false, icon: Activity, color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Credit Score', value: creditScore.toString(), change: '+15 pts', isUp: true, icon: ShieldCheck, color: 'bg-green-500/10 text-green-600' },
    { label: 'Active Assets', value: activeAssets.toString(), change: '0%', isUp: true, icon: Zap, color: 'bg-orange-500/10 text-orange-600' },
  ];

  const factors = [
    { name: 'Payment History', score: 98, status: 'Excellent', color: 'bg-green-500' },
    { name: 'Credit Utilization', score: 24, status: 'Good', color: 'bg-blue-500' },
    { name: 'Credit Age', score: 85, status: 'Excellent', color: 'bg-green-500' },
    { name: 'Total Accounts', score: 62, status: 'Moderate', color: 'bg-orange-500' },
  ];

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    // Add logic for actions
    if (action === 'Freeze') {
      alert('System security protocols engaged. Assets frozen.');
    } else if (action === 'Transfer') {
      const amount = prompt('Enter amount to transfer (₹):');
      if (amount && !isNaN(Number(amount))) {
        const val = Number(amount);
        setBalance(prev => prev - val);
        setTransactions(prev => [
          { id: Date.now(), name: 'External Transfer', category: 'Transfer', amount: -val, date: 'Just now', icon: '💸' },
          ...prev
        ]);
      }
    } else if (action === 'Deposit') {
      const amount = prompt('Enter amount to deposit (₹):');
      if (amount && !isNaN(Number(amount))) {
        const val = Number(amount);
        setBalance(prev => prev + val);
        setTransactions(prev => [
          { id: Date.now(), name: 'Manual Deposit', category: 'Income', amount: val, date: 'Just now', icon: '💳' },
          ...prev
        ]);
      }
    }
  };

  return (
    <div className="p-8 max-w-screen-2xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-container tracking-tighter font-headline">System Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back, Architect. Your financial engine is running at peak efficiency.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleAction('Date Range')}
            className="px-4 py-2 bg-white border border-outline-variant/30 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Calendar size={16} /> Last 30 Days
          </button>
          <button 
            onClick={() => handleAction('Report')}
            className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <PieChart size={16} /> Generate Report
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
            className="glass-panel p-6 rounded-3xl border-outline-variant/10 hover:border-primary/20 transition-all group cursor-pointer"
            onClick={() => handleAction(`View ${stat.label}`)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full uppercase tracking-widest",
                stat.isUp ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              )}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-2xl font-black text-primary-container font-headline">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8 rounded-[2.5rem] border-outline-variant/10 h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-black text-primary-container font-headline">Balance Trajectory</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Asset accumulation over time</p>
              </div>
              <div className="flex gap-2">
                {['1W', '1M', '3M', '1Y', 'ALL'].map((t) => (
                  <button 
                    key={t} 
                    onClick={() => handleAction(`Chart Time: ${t}`)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                      t === '1M' ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-slate-100"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 flex items-end gap-2">
              {chartData.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 bg-primary/10 hover:bg-primary rounded-t-lg transition-all relative group cursor-pointer"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary-container text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{(h * 1245).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </div>

          {/* Transactions */}
          <div className="glass-panel p-8 rounded-[2.5rem] border-outline-variant/10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-primary-container font-headline">Recent Activity</h3>
              <button 
                onClick={() => handleAction('View All Transactions')}
                className="text-primary font-bold text-xs uppercase tracking-widest hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-6">
              {transactions.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => handleAction(`Transaction: ${t.name}`)}
                  className="flex items-center justify-between p-4 hover:bg-surface-container-low rounded-2xl transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                      {t.icon}
                    </div>
                    <div>
                      <div className="font-black text-primary-container text-sm">{t.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.category} • {t.date}</div>
                    </div>
                  </div>
                  <div className={cn(
                    "font-black text-sm",
                    t.amount > 0 ? "text-green-600" : "text-primary-container"
                  )}>
                    {t.amount > 0 ? `+ ₹${t.amount.toLocaleString()}` : `- ₹${Math.abs(t.amount).toLocaleString()}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Credit Score Card */}
          <div className="silk-gradient p-8 rounded-[2.5rem] text-on-primary shadow-2xl shadow-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 opacity-70">Axiom Scoring Engine</div>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-7xl font-black tracking-tighter mb-2 font-headline">{creditScore}</div>
                <div className="text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-1 rounded-full">Elite Tier</div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-70">
                  <span>Risk Level</span>
                  <span>Low</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[85%]"></div>
                </div>
                <p className="text-[10px] font-medium leading-relaxed opacity-80">
                  Your score has increased by 15 points since the last batch processing cycle. 
                  Maintain current utilization for optimal growth.
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Factors */}
          <div className="glass-panel p-8 rounded-[2.5rem] border-outline-variant/10">
            <h3 className="text-lg font-black text-primary-container font-headline mb-6">Analysis Factors</h3>
            <div className="space-y-6">
              {factors.map((f, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{f.name}</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{f.status}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${f.score}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className={cn("h-full rounded-full", f.color)}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handleAction('Detailed Analysis')}
              className="w-full mt-8 py-4 border-2 border-primary/10 rounded-2xl text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
            >
              Detailed Analysis <ChevronRight size={14} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-primary-container p-8 rounded-[2.5rem] text-white shadow-xl">
            <h3 className="text-lg font-black font-headline mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Transfer', icon: ArrowUpRight },
                { label: 'Deposit', icon: ArrowDownRight },
                { label: 'Freeze', icon: Lock },
                { label: 'Settings', icon: Settings },
              ].map((action, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAction(action.label)}
                  className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all gap-2 group"
                >
                  <action.icon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
