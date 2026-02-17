import React, { useEffect, useState } from 'react';

interface BinanceDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CountUp: React.FC<{ end: number; duration?: number; decimals?: number; suffix?: string }> = ({ end, duration = 1000, decimals = 0, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toFixed(decimals).toLocaleString()}{suffix}</span>;
};

const BinanceDetailsPanel: React.FC<BinanceDetailsPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col bg-black/80 backdrop-blur-3xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      {/* Header / Close Bar */}
      <div className="flex items-center justify-between p-6 border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-cyan-400 font-orbitron tracking-widest uppercase">Verified Merchant</span>
          <h2 className="text-xl font-black text-white font-orbitron tracking-tighter">TRADE WITH BINANCE</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32">
        {/* 1. Merchant Identity Block */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 p-[2px]">
              <div className="h-full w-full rounded-2xl bg-black flex items-center justify-center">
                <img src="https://lh3.googleusercontent.com/d/1qIVJ0mMNCPtL-qs23g1y0TRSG9m0tYpD" alt="RV" className="w-10 h-10 object-contain" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-white font-orbitron tracking-tighter">RadiantVaultOTC</h3>
                <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-black px-2 py-0.5 rounded border border-yellow-500/30 font-orbitron">PRO</span>
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Professional Crypto Exchange</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-widest">Last Seen: 8 hours ago</div>
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-widest">Joined: 2024-09-29</div>
          </div>
        </div>

        {/* 2. Verification Checklist */}
        <div className="grid grid-cols-2 gap-3">
          {['Email Verified', 'SMS Verified', 'ID Verified', 'Address Verified'].map((item, i) => (
            <div key={i} className="glass-card p-4 rounded-xl border-green-500/20 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{item}</span>
            </div>
          ))}
        </div>

        {/* 3. Performance Metrics Grid */}
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border-white/5 text-center">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">All Trades</p>
              <p className="text-2xl font-black text-white font-orbitron"><CountUp end={7735} /></p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-white/5 text-center">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">30-Day Trades</p>
              <p className="text-2xl font-black text-white font-orbitron"><CountUp end={681} /></p>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl border-green-500/20 bg-green-500/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <svg className="w-12 h-12 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-1">30-Day Completion Rate</p>
            <p className="text-4xl font-black text-white font-orbitron"><CountUp end={100} suffix="%" /></p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border-cyan-500/20 text-center">
              <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">Avg Release</p>
              <p className="text-xl font-black text-white font-orbitron"><CountUp end={2.16} decimals={2} suffix="m" /></p>
            </div>
            <div className="glass-card p-6 rounded-2xl border-purple-500/20 text-center">
              <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Avg Pay</p>
              <p className="text-xl font-black text-white font-orbitron"><CountUp end={2.67} decimals={2} suffix="m" /></p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CTA Button (Fixed Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
        <a 
          href="https://c2c.binance.com/en/advertiserDetail?advertiserNo=sde741e95d96635af90ff0d0579e252ec"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white text-black py-5 rounded-2xl font-black font-orbitron tracking-[0.2em] text-[11px] uppercase grid grid-cols-[48px_1fr_48px] items-center shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
        >
          <div className="flex justify-center">
            <img src="https://bin.bnbstatic.com/static/images/common/favicon.ico" className="w-5 h-5 rounded-md" alt="Binance" />
          </div>
          <span className="text-center">View Official Binance Profile</span>
          <div className="w-12"></div>
        </a>
      </div>
    </div>
  );
};

export default BinanceDetailsPanel;
