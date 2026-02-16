
import React, { useState } from 'react';

interface AdminPanelProps {
  onUpdatePrice?: (price: number) => void;
  currentPrice?: number;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onUpdatePrice, currentPrice = 91.45 }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  // Market Rate State
  const [newPrice, setNewPrice] = useState(currentPrice.toString());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Rvv@121OTC') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Admin Password. Access Denied.');
    }
  };

  const handleUpdatePrice = () => {
    const price = parseFloat(newPrice);
    if (isNaN(price) || price <= 0) {
      alert("Invalid price value.");
      return;
    }

    setSaveStatus('saving');
    setTimeout(() => {
      if (onUpdatePrice) {
        onUpdatePrice(price);
        localStorage.setItem('PLATFORM_USDT_PRICE', price.toString());
      }
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-24 px-4">
        <div className="glass-card p-10 rounded-[3rem] border-red-500/20 text-center bg-red-500/5 backdrop-blur-3xl">
          <div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black font-orbitron text-white mb-2 uppercase tracking-tighter">Restricted Access</h2>
          <p className="text-gray-500 mb-10 text-xs font-bold uppercase tracking-widest">Administrative credentials required</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="ENTER ADMIN KEY"
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-red-500 transition text-white font-mono text-center tracking-[0.3em]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-[10px] text-red-500 font-black uppercase tracking-widest animate-pulse">{error}</p>}
            <button className="w-full bg-white text-black py-5 rounded-2xl font-black font-orbitron tracking-widest text-sm hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] uppercase">
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black font-orbitron tracking-tighter text-white">ADMIN TERMINAL</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">System Authority: RadiantVault Mainnet</p>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)} 
          className="glass-card px-6 py-3 rounded-xl text-[10px] font-black font-orbitron text-gray-400 hover:text-red-500 hover:border-red-500/50 transition uppercase tracking-widest"
        >
          Deactivate Session
        </button>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MARKET RATE CONTROL - NEW FUNCTIONALITY */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 rounded-[2.5rem] border-cyan-500/30 h-full bg-gradient-to-br from-cyan-500/5 to-transparent">
            <h3 className="text-xs font-black font-orbitron text-cyan-400 tracking-widest uppercase mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              Market Rate Control
            </h3>
            
            <div className="space-y-6">
               <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Live Platform Price</p>
                  <p className="text-5xl font-black font-orbitron text-white">₹{currentPrice.toFixed(2)}</p>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest block ml-2">New USDT Rate (INR)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400 font-black">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full bg-white/5 border border-white/10 px-10 py-5 rounded-2xl outline-none focus:border-cyan-500 text-white font-black text-xl font-orbitron"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleUpdatePrice}
                    disabled={saveStatus === 'saving'}
                    className={`w-full py-5 rounded-2xl font-black font-orbitron text-xs tracking-widest transition-all shadow-[0_10px_30px_-10px_rgba(6,182,212,0.4)] ${
                      saveStatus === 'success' ? 'bg-green-500 text-black' : 'bg-cyan-500 text-black hover:bg-cyan-400'
                    }`}
                  >
                    {saveStatus === 'saving' ? 'SYNCING...' : saveStatus === 'success' ? 'SYSTEM UPDATED ✓' : 'OVERRIDE GLOBAL RATE'}
                  </button>
                  <p className="text-[10px] text-gray-600 font-medium italic text-center">Changes reflect instantly across the entire platform.</p>
               </div>
            </div>
          </div>
        </div>

        {/* ANALYTICS & STATS */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="glass-card p-8 rounded-3xl border-white/5">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Active Merchants</p>
              <p className="text-4xl font-black text-white font-orbitron">1,248</p>
              <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                +12 VERIFIED TODAY
              </div>
           </div>
           <div className="glass-card p-8 rounded-3xl border-orange-500/20 bg-orange-500/5">
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">KYC Approval Queue</p>
              <p className="text-4xl font-black text-white font-orbitron">42</p>
              <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-orange-400">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping"></span>
                ACTION REQUIRED
              </div>
           </div>
           <div className="glass-card p-8 rounded-3xl border-white/5">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Active Escrow Volume</p>
              <p className="text-4xl font-black text-white font-orbitron">₹1.4M</p>
              <div className="h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-cyan-500 w-[78%]"></div>
              </div>
           </div>
           <div className="glass-card p-8 rounded-3xl border-green-500/20 bg-green-500/5">
              <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">Net Platform Revenue</p>
              <p className="text-4xl font-black text-white font-orbitron">₹8,450</p>
              <p className="text-[9px] text-gray-500 font-bold mt-4">24H CYCLE SETTLEMENT COMPLETE</p>
           </div>
        </div>
      </div>

      {/* RECENT ACTIVITY QUEUE */}
      <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
        <div className="px-8 py-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h3 className="font-black text-white font-orbitron text-xs tracking-widest uppercase">KYC Verification Terminal</h3>
          <span className="text-[10px] font-bold text-cyan-400">3 PENDING ACTION</span>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { name: 'Rahul Sharma', email: 'rahul@example.com', docs: 'PAN + Aadhaar', time: '2h ago', status: 'UNVERIFIED' },
            { name: 'Priya Patel', email: 'priya.p@test.in', docs: 'PAN + Passport', time: '5h ago', status: 'UNVERIFIED' },
            { name: 'Amit Kumar', email: 'amit99@gmail.com', docs: 'PAN Only', time: '1d ago', status: 'RISK_FLAG' },
          ].map((item, i) => (
            <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-white/5 transition group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center font-black text-cyan-400 font-orbitron text-xl">
                  {item.name[0]}
                </div>
                <div>
                  <p className="text-sm font-black text-white font-orbitron tracking-tight">{item.name}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.email}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">PAYLOAD</p>
                <p className="text-xs text-gray-300 font-bold">{item.docs}</p>
              </div>
              <div className="flex items-center gap-4">
                 <span className={`text-[9px] font-black px-2 py-1 rounded border ${item.status === 'RISK_FLAG' ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-gray-500 text-gray-500'}`}>{item.status}</span>
                 <button className="bg-cyan-500 text-black px-4 py-2 rounded-lg text-[10px] font-black font-orbitron tracking-widest hover:bg-cyan-400 transition">REVIEW</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
