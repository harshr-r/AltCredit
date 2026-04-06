import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  BarChart3, 
  Lock, 
  Cpu,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
              The Future of Financial Sovereignty
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-on-surface mb-8 leading-[0.95] font-headline">
              Architecting <br />
              <span className="text-primary">Financial Freedom</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface-variant mb-12 font-medium leading-relaxed">
              A high-end financial ledger designed for the modern sovereign. 
              Secure your assets with military-grade encryption and AI-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigate('/onboarding')}
                className="silk-gradient text-on-primary px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                Get Started Now <ArrowRight size={20} />
              </button>
              <button className="px-10 py-4 rounded-full text-lg font-bold border-2 border-outline-variant/30 hover:bg-surface-container-low transition-all">
                View Documentation
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="glass-panel p-4 rounded-[2.5rem] shadow-2xl border-white/40 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800" 
                alt="Dashboard Preview" 
                className="w-full h-auto rounded-[2rem] shadow-inner"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 hidden lg:block">
              <div className="glass-panel p-6 rounded-3xl shadow-2xl border-white/40 w-64 animate-bounce-slow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time</div>
                    <div className="text-sm font-black text-primary">Processing</div>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-3/4"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Total Assets Secured', value: '₹2.4B+' },
            { label: 'Active Sovereigns', value: '120K+' },
            { label: 'Uptime Guarantee', value: '99.99%' },
            { label: 'Global Nodes', value: '450+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary mb-2 font-headline">{stat.value}</div>
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface mb-6 font-headline">
              Engineered for <span className="text-primary">Excellence</span>
            </h2>
            <p className="max-w-2xl mx-auto text-on-surface-variant font-medium">
              Our platform combines cutting-edge technology with intuitive design to provide 
              the ultimate financial management experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Military-Grade Security',
                desc: 'Your data is encrypted using AES-256 and protected by multi-factor authentication.',
                icon: ShieldCheck,
                color: 'bg-blue-500/10 text-blue-600'
              },
              {
                title: 'AI-Driven Insights',
                desc: 'Our proprietary Axiom AI analyzes your spending patterns to provide actionable advice.',
                icon: Cpu,
                color: 'bg-purple-500/10 text-purple-600'
              },
              {
                title: 'Global Connectivity',
                desc: 'Connect to thousands of financial institutions worldwide with a single click.',
                icon: Globe,
                color: 'bg-green-500/10 text-green-600'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-panel p-10 rounded-[2rem] border-outline-variant/10 hover:border-primary/30 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-on-surface mb-4 font-headline">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">{feature.desc}</p>
                <a href="#" className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Learn More <ChevronRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto silk-gradient rounded-[3rem] p-12 md:p-20 text-center text-on-primary relative overflow-hidden shadow-2xl shadow-primary/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 font-headline">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-on-primary/80 mb-12 max-w-2xl mx-auto font-medium">
            Join thousands of modern sovereigns who have already secured their financial future with ArchitectLedger.
          </p>
          <button 
            onClick={() => navigate('/onboarding')}
            className="bg-white text-primary px-12 py-5 rounded-full text-xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Get Started for Free
          </button>
        </div>
      </section>
    </div>
  );
};
