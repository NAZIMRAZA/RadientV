import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import AdList from './components/P2P/AdList';
import KycForm from './components/KYC/KycForm';
import TradeRoom from './components/Trade/TradeRoom';
import AuthPage from './components/Auth/AuthPage';
import AdminPanel from './components/Admin/AdminPanel';
import Logo from './components/Logo';
import { FAQPage, PolicyPage, AMLPolicyContent, TermsOfServiceContent, PrivacyPolicyContent } from './components/LegalPages';
import { AssetType, TradeSide, P2PAd, TradeStatus, Trade, User, KycStatus } from './types';
import { APP_CONFIG, MOCK_PRICES } from './constants';

const App: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetType>(AssetType.USDT);
  const [tradeSide, setTradeSide] = useState<TradeSide>(TradeSide.BUY);
  const [activeTrade, setActiveTrade] = useState<Trade | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const [usdtPrice, setUsdtPrice] = useState<number>(() => {
    const saved = localStorage.getItem('PLATFORM_USDT_PRICE');
    return saved ? parseFloat(saved) : MOCK_PRICES.USDT;
  });

  const [ads, setAds] = useState<P2PAd[]>([
    {
      id: 'ad_1',
      userId: 'user_99',
      userName: 'DesiTrader_Pro',
      side: TradeSide.SELL,
      asset: AssetType.USDT,
      price: usdtPrice,
      priceType: 'FIXED',
      minLimit: 5000,
      maxLimit: 50000,
      paymentMethods: ['UPI', 'IMPS'],
      availableAmount: 1200,
    },
    {
      id: 'ad_2',
      userId: 'user_102',
      userName: 'BharatCrypto_X',
      side: TradeSide.SELL,
      asset: AssetType.USDT,
      price: usdtPrice + 0.05,
      priceType: 'FIXED',
      minLimit: 1000,
      maxLimit: 100000,
      paymentMethods: ['UPI', 'NEFT'],
      availableAmount: 8500,
    }
  ]);

  useEffect(() => {
    setAds(prev => prev.map(ad => ({
      ...ad,
      price: ad.id === 'ad_1' ? usdtPrice : usdtPrice + 0.05
    })));
  }, [usdtPrice]);

  const handleStartTrade = (ad: P2PAd) => {
    if (!user) { window.location.hash = '#/auth'; return; }
    const totalInr = ad.minLimit;
    const tdsAmount = totalInr * APP_CONFIG.TDS_RATE;
    const newTrade: Trade = {
      id: `TR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      adId: ad.id,
      buyerId: user.id,
      sellerId: ad.userId,
      asset: ad.asset,
      amount: totalInr / ad.price,
      price: ad.price,
      totalInr: totalInr,
      tdsAmount: tdsAmount,
      commission: totalInr * APP_CONFIG.DEFAULT_COMMISSION,
      status: TradeStatus.PENDING_PAYMENT,
      createdAt: Date.now(),
      escrowLockedAt: Date.now(),
    };
    setActiveTrade(newTrade);
    window.location.hash = '#/trade-active';
  };

  const handleLogin = (newUser: User) => { setUser(newUser); window.location.hash = '#/'; };
  const handleLogout = () => { setUser(null); window.location.hash = '#/'; };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#030712] text-[#f3f4f6]">
        <Navigation user={user} onLogout={handleLogout} />
        
        <main className="flex-grow w-full max-w-full overflow-x-hidden pt-16 md:pt-20">
          <Routes>
            <Route path="/" element={
              <div className="space-y-16 md:space-y-32 pb-16 md:pb-32">
                {/* 1. HERO SECTION */}
                <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center px-4 pt-10 md:pt-20">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10 w-full">
                    <div className="text-left space-y-6 md:space-y-8">
                       <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-card border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-black tracking-widest font-orbitron">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
                          INDIA'S TRUSTED P2P HUB
                       </div>
                       <h1 className="text-4xl md:text-8xl font-black font-orbitron leading-[1] md:leading-[0.9] tracking-tighter">
                          RADIANTVAULT <br/>
                          <span className="gradient-text">VENTURES</span>
                       </h1>
                       <p className="text-sm md:text-xl text-gray-400 font-medium max-w-xl leading-relaxed">
                          Welcome to Radiantvault Ventures – India’s trusted P2P engine. 
                          <span className="block mt-2 text-cyan-400">Secure, fast, and FIU-compliant trade architecture.</span>
                       </p>
                       <div className="flex flex-col sm:flex-row gap-4 pt-2">
                          <button onClick={() => window.location.hash = user ? '#/kyc' : '#/auth'} 
                            className="w-full sm:w-auto bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black font-orbitron tracking-widest text-[11px] md:text-sm hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            INITIALIZE TRADE
                          </button>
                          <button onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto glass-card px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black font-orbitron tracking-widest text-[11px] md:text-sm text-white hover:border-purple-500/50">
                            OUR MISSION
                          </button>
                       </div>
                    </div>

                    <div className="relative hidden lg:block">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="glass-card p-8 rounded-3xl space-y-4 animate-float border-cyan-500/30">
                             <p className="text-xs font-black text-cyan-400 font-orbitron tracking-[0.2em] uppercase">USDT RATE</p>
                             <p className="text-4xl font-black text-white font-orbitron">₹{usdtPrice.toFixed(2)}</p>
                          </div>
                          <div className="glass-card p-8 rounded-3xl space-y-4 animate-float border-purple-500/30" style={{animationDelay: '-2s'}}>
                             <p className="text-xs font-black text-purple-400 font-orbitron tracking-[0.2em] uppercase">NODES</p>
                             <p className="text-4xl font-black text-white font-orbitron">ACTIVE</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </section>

                {/* 2. ABOUT US SECTION */}
                <section id="about-us" className="max-w-7xl mx-auto px-4 scroll-mt-24 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
                    <div className="space-y-4 md:space-y-8">
                       <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tighter uppercase">About Us</h2>
                       <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                       <p className="text-sm md:text-xl text-gray-400 leading-relaxed font-medium">
                          Simplifying crypto for Bharat. As a premier Indian P2P platform, we connect you directly, fostering a transparent and decentralized trade layer.
                       </p>
                       <p className="text-xs md:text-lg text-gray-500 leading-relaxed font-medium italic border-l-2 md:border-l-4 border-cyan-500 pl-4 md:pl-6">
                          Headquartered in Bangalore, our team is passionate about empowering the Bharat digital economy.
                       </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                       {[
                         { title: "Connect", icon: "🤝", desc: "P2P Liquidity" },
                         { title: "Vault", icon: "🛡️", desc: "Escrow Shield" },
                         { title: "Bharat", icon: "🇮🇳", desc: "VDA Compliant" },
                         { title: "Support", icon: "📞", desc: "24/7 Desk" }
                       ].map((feat, i) => (
                         <div key={i} className="glass-card p-4 md:p-8 rounded-2xl md:rounded-3xl border-white/5 space-y-2">
                            <span className="text-xl md:text-3xl">{feat.icon}</span>
                            <h4 className="font-black text-white font-orbitron text-[9px] md:text-xs tracking-widest uppercase">{feat.title}</h4>
                            <p className="text-[8px] md:text-xs text-gray-500 font-bold">{feat.desc}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                </section>

                {/* 3. TRADING INTERFACE */}
                <section className="max-w-7xl mx-auto px-4 w-full">
                  <div className="gradient-border p-[1px] rounded-2xl md:rounded-3xl overflow-hidden">
                    <div className="bg-gray-950 rounded-[inherit]">
                       <div className="p-4 md:p-8 border-b border-white/5 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between">
                          <div className="flex bg-white/5 p-1 rounded-xl md:rounded-2xl w-full md:w-auto">
                            <button onClick={() => setTradeSide(TradeSide.BUY)} className={`flex-1 md:w-32 py-2 md:py-3 rounded-lg md:rounded-xl font-black font-orbitron text-[10px] md:text-xs tracking-widest transition-all ${tradeSide === TradeSide.BUY ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:text-white'}`}>BUY</button>
                            <button onClick={() => setTradeSide(TradeSide.SELL)} className={`flex-1 md:w-32 py-2 md:py-3 rounded-lg md:rounded-xl font-black font-orbitron text-[10px] md:text-xs tracking-widest transition-all ${tradeSide === TradeSide.SELL ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-500 hover:text-white'}`}>SELL</button>
                          </div>
                          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
                            {[AssetType.USDT, AssetType.BTC, AssetType.ETH].map(asset => (
                              <button
                                key={asset}
                                onClick={() => setSelectedAsset(asset)}
                                className={`px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl font-black font-orbitron text-[9px] md:text-xs tracking-widest transition-all border ${selectedAsset === asset ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' : 'border-white/5 text-gray-500 hover:border-white/10'} whitespace-nowrap`}
                              >
                                {asset}
                              </button>
                            ))}
                          </div>
                       </div>
                       <AdList ads={ads.filter(ad => ad.asset === selectedAsset)} asset={selectedAsset} side={tradeSide} onTrade={handleStartTrade} />
                    </div>
                  </div>
                </section>
                
                {/* 4. AML & KYC POLICIES SECTION */}
                <section className="max-w-7xl mx-auto px-4 w-full">
                  <div className="glass-card p-6 md:p-12 rounded-3xl md:rounded-[4rem] border-red-500/20 bg-gradient-to-b from-red-500/5 to-transparent">
                    <div className="text-center mb-8 md:mb-16 space-y-2">
                       <h2 className="text-2xl md:text-4xl font-black font-orbitron tracking-tighter uppercase">AML Protocol</h2>
                       <p className="text-gray-500 font-bold uppercase tracking-widest text-[8px] md:text-xs">Secure trading environment guidelines</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                       <div className="space-y-6 md:space-y-8">
                          <h3 className="text-sm md:text-xl font-black font-orbitron text-white uppercase tracking-widest flex items-center gap-3">
                             <span className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-red-500 flex items-center justify-center text-[10px] md:text-xs">01</span>
                             Mandatory Verification
                          </h3>
                          <div className="grid grid-cols-1 gap-4 md:gap-6">
                             {[
                                { t: "ID Protocol", d: "Name, DOB, contact via Govt ID." },
                                { t: "Documents", d: "Aadhaar, PAN, or Passport upload." },
                                { t: "Liveness", d: "Real-time selfie matching confirmation." }
                             ].map((step, i) => (
                               <div key={i} className="flex gap-4 group">
                                  <div className="shrink-0 w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                                  <div>
                                     <h4 className="text-white font-bold text-[11px] md:text-sm uppercase tracking-tight">{step.t}</h4>
                                     <p className="text-gray-500 text-[9px] md:text-xs font-medium">{step.d}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                       <div className="space-y-6 bg-black/40 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5">
                          <h3 className="text-sm md:text-xl font-black font-orbitron text-cyan-400 uppercase tracking-widest">Compliance</h3>
                          <ul className="space-y-4 md:space-y-6">
                             <li className="space-y-1">
                                <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">FIU REGISTRATION</span>
                                <p className="text-gray-400 font-medium text-[11px] md:text-sm">REID-VA00058829</p>
                             </li>
                             <li className="space-y-1">
                                <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">1% TDS (SEC 194S)</span>
                                <p className="text-gray-400 font-medium text-[11px] md:text-sm">Automated tax handling for every VDA transaction.</p>
                             </li>
                          </ul>
                          <Link to="/compliance" className="inline-block text-[9px] md:text-xs font-black text-cyan-400 font-orbitron uppercase border-b border-cyan-400/30 pb-1">Full AML Policy →</Link>
                       </div>
                    </div>
                  </div>
                </section>

                {/* 5. FEEDBACK SECTION */}
                <section className="max-w-7xl mx-auto px-4 w-full">
                  <div className="space-y-10 md:space-y-16">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl md:text-5xl font-black font-orbitron tracking-tighter uppercase">Transmission Log</h2>
                      <p className="text-cyan-400 font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px]">Verified Network Feedback</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                       {[
                         { name: "Aarav M.", location: "Mumbai, MH", text: "Fastest UPI settlement I've experienced. Node released USDT in 4 mins.", rating: 5 },
                         { name: "Deepika K.", location: "Bangalore, KA", text: "FIU registration is the main reason I moved my volume here.", rating: 5 },
                         { name: "Vikram J.", location: "Pune, MH", text: "Competitive spreads. Direct INR pipeline that actually works.", rating: 5 }
                       ].map((review, i) => (
                         <div key={i} className="glass-card p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between group">
                            <div className="space-y-4">
                               <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-black font-orbitron text-cyan-400">
                                        {review.name[0]}
                                     </div>
                                     <div>
                                        <p className="text-[11px] md:text-sm font-black text-white font-orbitron">{review.name}</p>
                                        <p className="text-[8px] md:text-[10px] text-gray-600 font-bold uppercase">{review.location}</p>
                                     </div>
                                  </div>
                               </div>
                               <p className="text-[11px] md:text-sm text-gray-500 font-medium leading-relaxed italic">
                                  "{review.text}"
                                </p>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </section>
              </div>
            } />
            <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
            <Route path="/kyc" element={user ? <KycForm /> : <Navigate to="/auth" />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/admin" element={<AdminPanel onUpdatePrice={setUsdtPrice} currentPrice={usdtPrice} />} />
            <Route path="/trade-active" element={activeTrade && user ? <TradeRoom trade={activeTrade} isBuyer={true} /> : <Navigate to="/" />} />
            <Route path="/compliance" element={<PolicyPage title="AML & Compliance" content={<AMLPolicyContent />} />} />
            <Route path="/terms" element={<PolicyPage title="Terms of Service" content={<TermsOfServiceContent />} />} />
            <Route path="/privacy" element={<PolicyPage title="Privacy Policy" content={<PrivacyPolicyContent />} />} />
          </Routes>
        </main>

        <section className="max-w-7xl mx-auto px-4 mb-16 md:mb-24 w-full">
           <div className="glass-card rounded-2xl md:rounded-[3rem] p-1.5 md:p-2 overflow-hidden border-cyan-500/10">
             <img src="https://lh3.googleusercontent.com/d/1Tq9MSNzoVqZITLhDXb8uobD7DhQubGfO" alt="Banner" className="w-full h-auto rounded-xl md:rounded-[2.8rem]" />
           </div>
        </section>

        <footer className="bg-black/50 border-t border-white/5 py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20 text-left">
               <div className="space-y-4 md:space-y-6">
                 <div className="flex items-center gap-3">
                   <Logo className="h-8 w-8 md:h-10 md:w-10" />
                   <span className="text-base md:text-xl font-black font-orbitron tracking-tighter">RV_OTC</span>
                 </div>
                 <p className="text-xs md:text-sm text-gray-600 font-medium">Enterprise infrastructure for the Bharat digital economy.</p>
                 <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
                    <span className="text-[8px] md:text-[10px] font-black font-orbitron tracking-widest text-cyan-400 uppercase">PROD NODE READY</span>
                 </div>
               </div>
               <div>
                 <h4 className="text-[10px] md:text-xs font-black font-orbitron tracking-widest text-white mb-4 md:mb-6 uppercase">System</h4>
                 <ul className="space-y-3 text-[10px] md:text-sm text-gray-600 font-bold uppercase tracking-wider">
                   <li><Link to="/admin" className="text-red-500 hover:text-red-400">Admin Login</Link></li>
                   <li><Link to="/faq" className="hover:text-white">Knowledge Base</Link></li>
                 </ul>
               </div>
               <div>
                 <h4 className="text-[10px] md:text-xs font-black font-orbitron tracking-widest text-white mb-4 md:mb-6 uppercase">Legal</h4>
                 <ul className="space-y-3 text-[10px] md:text-sm text-gray-600 font-bold uppercase tracking-wider">
                   <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
                   <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
                   <li><Link to="/compliance" className="hover:text-white">AML Protocol</Link></li>
                 </ul>
               </div>
               <div className="space-y-4">
                 <h4 className="text-[10px] md:text-xs font-black font-orbitron tracking-widest text-white mb-4 md:mb-6 uppercase">HQ</h4>
                 <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed font-bold uppercase">Bangalore 560068, Karnataka, India</p>
               </div>
            </div>
            <div className="border-t border-white/5 pt-8">
              <div className="inline-block glass-card px-6 py-4 md:px-8 md:py-6 rounded-2xl md:rounded-[2rem] border-cyan-500/20 max-w-4xl w-full">
                 <p className="text-[9px] md:text-sm font-bold text-gray-400 leading-relaxed">
                    <span className="text-cyan-400 font-orbitron font-black text-[10px] block mb-1 tracking-widest">OFFICIAL DECLARATION</span>
                    <span className="text-white">{APP_CONFIG.LEGAL_NAME}</span> is FIU-IND registered: <span className="text-cyan-400">{APP_CONFIG.FIU_REG_ID}</span>
                 </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;