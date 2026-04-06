import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Globe, 
  Zap, 
  ChevronRight,
  Search,
  CreditCard,
  Building2,
  Wallet
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const banks = [
    { id: 'chase', name: 'Chase Bank', icon: Building2, color: 'bg-blue-600' },
    { id: 'bofa', name: 'Bank of America', icon: Building2, color: 'bg-red-600' },
    { id: 'wellsfargo', name: 'Wells Fargo', icon: Building2, color: 'bg-yellow-600' },
    { id: 'citibank', name: 'Citibank', icon: Building2, color: 'bg-blue-500' },
    { id: 'capitalone', name: 'Capital One', icon: Building2, color: 'bg-red-700' },
    { id: 'amex', name: 'American Express', icon: CreditCard, color: 'bg-blue-400' },
  ];

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setStep(3);
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 bg-surface">
      <div className="max-w-4xl w-full">
        {/* Progress Tracker */}
        <div className="flex justify-between items-center mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/20 -translate-y-1/2 -z-10"></div>
          <div className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300",
                step >= s ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-110" : "bg-white border-2 border-outline-variant/30 text-slate-400"
              )}>
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest transition-colors",
                step >= s ? "text-primary" : "text-slate-400"
              )}>
                {s === 1 ? 'Identity' : s === 2 ? 'Connection' : 'Success'}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-12 rounded-[3rem] border-outline-variant/10 shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={40} />
              </div>
              <h2 className="text-3xl font-black text-primary-container tracking-tighter font-headline mb-4">Secure Identity Verification</h2>
              <p className="text-slate-500 font-medium mb-12 max-w-lg mx-auto">
                ArchitectLedger uses military-grade encryption to protect your data. 
                Verify your identity to begin the financial architecture process.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 text-left">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                    <Lock size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-primary-container">End-to-End Encryption</div>
                    <div className="text-[10px] font-medium text-slate-400">Your data is never stored in plain text.</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 text-left">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-secondary">
                    <Globe size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-primary-container">Global Compliance</div>
                    <div className="text-[10px] font-medium text-slate-400">Adhering to international financial standards.</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full silk-gradient text-on-primary py-5 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Continue to Connection <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-12 rounded-[3rem] border-outline-variant/10 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black text-primary-container tracking-tighter font-headline mb-2">Connect Financial Data</h2>
                  <p className="text-slate-500 font-medium">Select your primary institution to link your ledger.</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search institutions..." 
                    className="pl-12 pr-6 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={cn(
                      "p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group",
                      selectedBank === bank.id 
                        ? "border-primary bg-primary/5 shadow-lg" 
                        : "border-outline-variant/10 hover:border-primary/30 bg-white"
                    )}
                  >
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform", bank.color)}>
                      <bank.icon size={28} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-primary-container">{bank.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-5 rounded-2xl text-lg font-black border-2 border-outline-variant/30 text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button 
                  disabled={!selectedBank || isConnecting}
                  onClick={handleConnect}
                  className={cn(
                    "flex-[2] py-5 rounded-2xl text-lg font-black shadow-xl transition-all flex items-center justify-center gap-3",
                    selectedBank && !isConnecting ? "silk-gradient text-on-primary shadow-primary/20 hover:scale-[1.02]" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  )}
                >
                  {isConnecting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Connecting...
                    </>
                  ) : (
                    <>Link Institution <Zap size={20} /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-16 rounded-[3rem] border-outline-variant/10 shadow-2xl text-center"
            >
              <div className="w-24 h-24 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <CheckCircle2 size={48} />
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-green-500/20 rounded-full"
                ></motion.div>
              </div>
              <h2 className="text-4xl font-black text-primary-container tracking-tighter font-headline mb-4">Architecture Complete</h2>
              <p className="text-slate-500 font-medium mb-12 max-w-lg mx-auto text-lg">
                Your financial data has been successfully linked and the Axiom Scoring Engine is now processing your initial batch.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Initial Score</div>
                  <div className="text-3xl font-black text-primary font-headline">782</div>
                </div>
                <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Risk Level</div>
                  <div className="text-3xl font-black text-secondary font-headline">Low</div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full silk-gradient text-on-primary py-6 rounded-2xl text-xl font-black shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Enter Dashboard <ChevronRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-center gap-2">
            <Lock size={12} /> Military-Grade 256-bit Encryption Active
          </p>
        </div>
      </div>
    </div>
  );
};
