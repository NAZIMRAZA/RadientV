import React, { useState } from 'react';

interface AdminPanelProps {
  onUpdatePrice?: (price: number) => void;
  currentPrice?: number;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onUpdatePrice, currentPrice = 91.45 }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  const [newPrice, setNewPrice] = useState(currentPrice.toString());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Rvv@121OTC') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Access Denied.');
    }
  };

  const handleUpdatePrice = () => {
    const price = parseFloat(newPrice);
    if (isNaN(price) || price <= 0) return;

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
      <div className="w-full max-w-full overflow-x-hidden py-16 md:py-24 px-4 flex justify-center">
        <div className="w-full max-w-md glass-card p-6 md:p-10 rounded-2xl md:rounded-[3rem] text-center bg-red-500/5">
          <h2 className="text-xl md:text-3xl font-black font-orbitron text-white mb-2 uppercase tracking-tighter">RESTRICTED</h2>
          <p className="text-gray-600 mb-8 text-[9px] md:text-xs font-bold uppercase tracking-widest">Admin credentials required</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="ADMIN KEY"
              className="w-full bg-white/5 border border-white/10 px-4 py-4 rounded-xl outline-none focus:border-red-500 text-white font-mono text-center tracking-widest"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-[9px] text-red-500 font-black uppercase tracking-widest">{error}</p>}
            <button className="w-full bg-white text-black py-4 rounded-xl font-black font-orbitron tracking-widest text-[11px] md:text-sm uppercase">
              Verify
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden py-10 md:py-24 px-4 space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-black font-orbitron tracking-tighter text-white uppercase">TERMINAL</h1>
          <p className="text-gray-600 font-bold uppercase tracking-widest text-[9px] md:text-xs">Authority: RadiantVault Mainnet</p>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)} 
          className="glass-card px-4 py-2 rounded-lg text-[9px] font-black font-orbitron text-gray-500 uppercase"
        >
          Deactivate
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1">
          <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border-cyan-500/30 bg-cyan-500/5">
            <h3 className="text-[10px] font-black font-orbitron text-cyan-400 tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              Rate Override
            </h3>
            
            <div className="space-y-6">
               <div className="bg-black/40 p-5 rounded-xl border border-white/5 text-center">
                  <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1">Live Rate</p>
                  <p className="text-3xl md:text-5xl font-black font-orbitron text-white">₹{currentPrice.toFixed(2)}</p>
               </div>

               <div className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-black">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full bg-white/5 border border-white/10 px-8 py-4 rounded-xl outline-none focus:border-cyan-500 text-white font-black text-lg md:text-xl"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleUpdatePrice}
                    className={`w-full py-4 rounded-xl font-black font-orbitron text-[10px] tracking-widest transition-all ${
                      saveStatus === 'success' ? 'bg-green-500 text-black' : 'bg-cyan-500 text-black'
                    }`}
                  >
                    {saveStatus === 'saving' ? 'SYNCING...' : 'OVERRIDE RATE'}
                  </button>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
           <div className="glass-card p-6 rounded-2xl border-white/5">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Merchants</p>
              <p className="text-2xl md:text-4xl font-black text-white font-orbitron">1,248</p>
           </div>
           <div className="glass-card p-6 rounded-2xl border-orange-500/20 bg-orange-500/5">
              <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1">KYC Pending</p>
              <p className="text-2xl md:text-4xl font-black text-white font-orbitron">42</p>
           </div>
           <div className="glass-card p-6 rounded-2xl border-white/5">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Escrow Vol</p>
              <p className="text-2xl md:text-4xl font-black text-white font-orbitron">₹1.4M</p>
           </div>
           <div className="glass-card p-6 rounded-2xl border-green-500/20 bg-green-500/5">
              <p className="text-[9px] font-black text-green-500 uppercase tracking-widest mb-1">Revenue</p>
              <p className="text-2xl md:text-4xl font-black text-white font-orbitron">₹8,450</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;