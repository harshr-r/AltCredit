import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  FileText, 
  BarChart3, 
  Settings, 
  Plus, 
  HelpCircle, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X,
  ShieldCheck,
  ChevronRight,
  Send,
  Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { aiService } from '../services/aiService';
import { Message } from '../types';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello, Architect. I'm monitoring the scoring engine's throughput. How can I assist you with the infrastructure deployment today?", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const isLanding = location.pathname === '/';
  const isAuthPage = location.pathname === '/onboarding';

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Linked Data', path: '/onboarding', icon: Database },
    { name: 'Credit Stories', path: '#', icon: FileText },
    { name: 'Lender Portal', path: '/admin', icon: BarChart3 },
    { name: 'Architecture', path: '/architecture', icon: Settings },
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const response = await aiService.generateResponse([...messages, userMessage]);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  if (isLanding) {
    return (
      <div className="min-h-screen bg-surface">
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
            <div className="text-2xl font-extrabold tracking-tighter text-primary">The Sovereign</div>
            <div className="hidden md:flex items-center space-x-8 font-medium text-sm">
              <Link to="/" className="text-primary font-bold border-b-2 border-primary pb-1">Home</Link>
              <a href="#" className="text-on-surface/70 hover:text-primary transition-colors">Features</a>
              <Link to="/onboarding" className="text-on-surface/70 hover:text-primary transition-colors">Eligibility</Link>
              <a href="#" className="text-on-surface/70 hover:text-primary transition-colors">FAQ</a>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-on-surface/70 font-medium text-sm hover:text-primary transition-colors">Login</button>
              <button onClick={() => navigate('/onboarding')} className="silk-gradient text-on-primary px-6 py-2.5 rounded-full text-sm font-bold shadow-sm active:opacity-80 active:scale-[0.99] transition-all">Get Started</button>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-surface w-full py-12 border-t border-outline-variant/20">
          <div className="flex flex-col md:flex-row justify-between items-center px-10 max-w-7xl mx-auto gap-8">
            <div className="font-bold text-primary text-xl">The Sovereign</div>
            <div className="flex gap-8 text-xs uppercase tracking-widest">
              <a className="text-on-surface/50 hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-on-surface/50 hover:text-primary transition-colors" href="#">Security Protocol</a>
              <a className="text-on-surface/50 hover:text-primary transition-colors" href="#">Contact Support</a>
              <a className="text-on-surface/50 hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
            <div className="text-[10px] text-on-surface/40 uppercase tracking-[0.2em]">
              © 2024 THE SOVEREIGN EDITORIAL. HIGH-END FINANCIAL CURATORS.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      {/* Sidebar */}
      {!isAuthPage && (
        <aside className={cn(
          "bg-[#f3f3f6] h-screen border-r-0 flex flex-col p-4 space-y-2 shrink-0 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}>
          <div className="mb-8 px-4 py-2 flex items-center justify-between">
            {isSidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-primary-container font-headline">Ledger Admin</h1>
                <p className="uppercase tracking-widest text-[10px] font-bold text-slate-500">System Authority</p>
              </div>
            )}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-200 rounded">
              {isSidebarOpen ? <Minimize2 size={16} /> : <Menu size={20} />}
            </button>
          </div>
          
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-3 flex items-center gap-3 transition-all ease-in-out duration-200 rounded-lg",
                  location.pathname === item.path 
                    ? "bg-white text-primary-container shadow-sm font-bold" 
                    : "text-slate-500 hover:bg-slate-200"
                )}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span className="uppercase tracking-widest text-[10px] font-bold">{item.name}</span>}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4 space-y-1">
            <button className={cn(
              "w-full bg-primary text-on-primary py-3 px-4 rounded-lg font-bold mb-4 shadow-sm active:scale-95 transition-all flex items-center justify-center",
              !isSidebarOpen && "p-2"
            )}>
              <Plus size={16} className={isSidebarOpen ? "mr-2" : ""} />
              {isSidebarOpen && <span className="uppercase tracking-widest text-[10px]">New Analysis</span>}
            </button>
            <a className="text-slate-500 px-4 py-3 hover:bg-slate-200 flex items-center gap-3 transition-all rounded-lg" href="#">
              <HelpCircle size={20} />
              {isSidebarOpen && <span className="uppercase tracking-widest text-[10px] font-bold">Help Center</span>}
            </a>
            <Link to="/" className="text-slate-500 px-4 py-3 hover:bg-slate-200 flex items-center gap-3 transition-all rounded-lg">
              <LogOut size={20} />
              {isSidebarOpen && <span className="uppercase tracking-widest text-[10px] font-bold">Sign Out</span>}
            </Link>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Nav */}
        {!isAuthPage && (
          <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-20 shadow-sm">
            <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
              <div className="text-2xl font-black text-primary-container tracking-tighter font-headline">ArchitectLedger</div>
              <nav className="hidden md:flex items-center gap-8">
                <Link to="/dashboard" className={cn(
                  "font-semibold tracking-tight transition-colors",
                  location.pathname === '/dashboard' ? "text-primary-container border-b-2 border-primary-container pb-1" : "text-slate-500 hover:text-primary"
                )}>Dashboard</Link>
                <Link to="/admin" className={cn(
                  "font-semibold tracking-tight transition-colors",
                  location.pathname === '/admin' ? "text-primary-container border-b-2 border-primary-container pb-1" : "text-slate-500 hover:text-primary"
                )}>Analytics</Link>
                <Link to="/architecture" className={cn(
                  "font-semibold tracking-tight transition-colors",
                  location.pathname === '/architecture' ? "text-primary-container border-b-2 border-primary-container pb-1" : "text-slate-500 hover:text-primary"
                )}>Batch Processing</Link>
                <a href="#" className="text-slate-500 font-semibold tracking-tight hover:text-primary">Support</a>
              </nav>
              <div className="flex items-center gap-4">
                <button className="p-2 text-primary-container hover:bg-slate-100 rounded-full transition-all">
                  <Bell size={20} />
                </button>
                <button className="p-2 text-primary-container hover:bg-slate-100 rounded-full transition-all">
                  <Settings size={20} />
                </button>
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ml-2 border border-outline-variant/30">
                  <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5E4fr2r4ci5O7Y4B0BUE92Dk7XzZMALCCP-gAKfR_Y8wQ427xlydPIoopfkKtV6iXa__Ds9JW5nPAU171FgsoJpDhdGBvp-fqQ4lnoJLJKvLs0pD3Wo_xmTmn2gxmE4DBDrnepidkOODmMGeAKCVLZXJ2cL399WkNydYf7doEL5ZC7cXHY7gIdC6pXCM7ecoBJq3fgzWRWjpWmYOqo-dSZn_r7wo3c1NDIw7vZI8RHoZLVtwOsQ8VZXSCLcK8Fm0kRhrJwvtYKSc" />
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Onboarding Header */}
        {isAuthPage && (
          <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl px-8 py-4 flex justify-between items-center max-w-screen-2xl mx-auto">
            <div className="text-2xl font-black text-primary tracking-tighter font-headline">ArchitectLedger</div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-on-surface-variant">Secure Session</span>
              <ShieldCheck className="text-secondary fill-secondary/20" />
            </div>
          </header>
        )}

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Chatbot Toggle */}
        {!isLanding && !isAuthPage && (
          <div className={cn(
            "fixed bottom-6 right-6 bg-white border border-outline-variant/30 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300",
            isChatOpen ? "w-80 h-[500px]" : "w-14 h-14 rounded-full"
          )}>
            {isChatOpen ? (
              <>
                <div className="p-4 border-b border-outline-variant/30 bg-surface-container-low/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <h3 className="font-headline font-black text-sm text-primary">Axiom Assistant</h3>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white/50 backdrop-blur-sm">
                  {messages.map((m) => (
                    <div key={m.id} className={cn("flex flex-col group", m.role === 'user' ? "items-end" : "items-start")}>
                      <div className={cn(
                        "p-4 rounded-2xl border transition-colors shadow-sm text-xs leading-relaxed",
                        m.role === 'user' 
                          ? "bg-primary text-on-primary border-primary/10 rounded-tr-none" 
                          : "bg-surface-container-low text-on-surface border-outline-variant/10 rounded-tl-none group-hover:bg-white"
                      )}>
                        {m.content}
                      </div>
                      <span className="text-[8px] mt-2 font-black text-slate-400 uppercase tracking-widest">
                        {m.role === 'assistant' ? 'Axiom AI' : 'You'}
                      </span>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex flex-col items-start">
                      <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-none border border-outline-variant/10 animate-pulse">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-surface-container-low/50 border-t border-outline-variant/20">
                  <div className="relative flex items-center">
                    <input
                      className="w-full bg-white border border-outline-variant/50 rounded-xl py-3 pl-4 pr-12 text-xs focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
                      placeholder="Ask infrastructure..."
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="absolute right-2 p-2 bg-primary text-white rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full h-full flex items-center justify-center bg-primary text-on-primary hover:scale-110 transition-transform"
              >
                <Send size={24} />
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
