
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
  
  // Price State: Priority: LocalStorage > Constant
  const [usdtPrice, setUsdtPrice] = useState<number>(() => {
    const saved = localStorage.getItem('PLATFORM_USDT_PRICE');
    return saved ? parseFloat(saved) : MOCK_PRICES.USDT;
  });

  // Dynamic Ads based on Platform Price
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

  // Update ads whenever the global price changes
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
      <div className="min-h-screen flex flex-col selection:bg-cyan-500/30">
        <Navigation user={user} onLogout={handleLogout} />
        
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={
              <div className="space-y-32 pb-32">
                {/* 1. HERO SECTION */}
                <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden pt-20">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="text-left space-y-8">
                       <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-cyan-500/20 text-cyan-400 text-xs font-black tracking-widest font-orbitron">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                          INDIA'S TRUSTED P2P PLATFORM
                       </div>
                       <h1 className="text-6xl md:text-8xl font-black font-orbitron leading-[0.9] tracking-tighter">
                          RADIANTVAULT <br/>
                          <span className="gradient-text">VENTURES</span>
                       </h1>
                       <p className="text-xl text-gray-300 font-medium max-w-xl leading-relaxed">
                          Welcome to Radiantvault Ventures – India’s trusted peer-to-peer cryptocurrency trading platform. 
                          <span className="block mt-2 text-cyan-400">Secure, fast, and user-friendly, we empower you to trade digital assets with confidence.</span>
                       </p>
                       <div className="flex flex-wrap gap-6 pt-4">
                          <button onClick={() => window.location.hash = user ? '#/kyc' : '#/auth'} 
                            className="bg-white text-black px-10 py-5 rounded-2xl font-black font-orbitron tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            INITIALIZE TRADE
                          </button>
                          <button onClick={() => {
                            const section = document.getElementById('about-us');
                            section?.scrollIntoView({ behavior: 'smooth' });
                          }}
                            className="glass-card px-10 py-5 rounded-2xl font-black font-orbitron tracking-widest text-sm text-white hover:border-purple-500/50">
                            OUR MISSION
                          </button>
                       </div>
                    </div>

                    <div className="relative">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="glass-card p-8 rounded-3xl space-y-4 animate-float border-cyan-500/30">
                             <div className="flex justify-between items-center">
                                <p className="text-xs font-black text-cyan-400 font-orbitron tracking-[0.2em] uppercase">USDT RATE</p>
                                <span className="text-[8px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold">PLATFORM</span>
                             </div>
                             <p className="text-4xl font-black text-white font-orbitron">₹{usdtPrice.toFixed(2)}</p>
                          </div>
                          <div className="glass-card p-8 rounded-3xl space-y-4 animate-float border-purple-500/30" style={{animationDelay: '-2s'}}>
                             <p className="text-xs font-black text-purple-400 font-orbitron tracking-[0.2em] uppercase">ESCROW NODES</p>
                             <p className="text-4xl font-black text-white font-orbitron">ACTIVE</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </section>

                {/* 2. ABOUT US SECTION */}
                <section id="about-us" className="max-w-7xl mx-auto px-4 scroll-mt-24">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                       <h2 className="text-5xl font-black font-orbitron tracking-tighter uppercase">About Us</h2>
                       <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                       <p className="text-xl text-gray-300 leading-relaxed font-medium">
                          At Radiantvault Ventures, we are on a mission to simplify and secure cryptocurrency trading for everyone. 
                          As a premier Indian P2P platform, we connect buyers and sellers directly, fostering a transparent and decentralized trading experience.
                       </p>
                       <p className="text-lg text-gray-400 leading-relaxed font-medium italic border-l-4 border-cyan-500 pl-6">
                          Headquartered in Bangalore, our team is passionate about empowering individuals and businesses in the ever-evolving crypto space. 
                          Whether you're new to cryptocurrency or an experienced trader, Radiantvault Ventures is here to provide a fast, reliable, and secure solution tailored to your needs.
                       </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { title: "Direct Connect", icon: "🤝", desc: "Peer-to-peer liquidity without intermediaries." },
                         { title: "Vault Security", icon: "🛡️", desc: "Multi-sig escrow protection for every trade." },
                         { title: "Bharat Ready", icon: "🇮🇳", desc: "Compliant with all Indian VDA regulations." },
                         { title: "24/7 Support", icon: "📞", desc: "Dedicated desk for all trade resolutions." }
                       ].map((feat, i) => (
                         <div key={i} className="glass-card p-8 rounded-3xl border-white/5 space-y-3">
                            <span className="text-3xl">{feat.icon}</span>
                            <h4 className="font-black text-white font-orbitron text-xs tracking-widest uppercase">{feat.title}</h4>
                            <p className="text-xs text-gray-500 font-bold">{feat.desc}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                </section>

                {/* 3. TRADING INTERFACE */}
                <section className="max-w-7xl mx-auto px-4">
                  <div className="gradient-border p-[1px]">
                    <div className="bg-gray-950 rounded-[inherit] overflow-hidden">
                       <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-8 items-center justify-between">
                          <div className="flex bg-white/5 p-1.5 rounded-2xl w-full md:w-auto">
                            <button onClick={() => setTradeSide(TradeSide.BUY)} className={`flex-1 md:w-32 py-3 rounded-xl font-black font-orbitron text-xs tracking-widest transition-all ${tradeSide === TradeSide.BUY ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:text-white'}`}>BUY</button>
                            <button onClick={() => setTradeSide(TradeSide.SELL)} className={`flex-1 md:w-32 py-3 rounded-xl font-black font-orbitron text-xs tracking-widest transition-all ${tradeSide === TradeSide.SELL ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-500 hover:text-white'}`}>SELL</button>
                          </div>
                          <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2">
                            {[AssetType.USDT, AssetType.BTC, AssetType.ETH].map(asset => (
                              <button
                                key={asset}
                                onClick={() => setSelectedAsset(asset)}
                                className={`px-8 py-3 rounded-xl font-black font-orbitron text-xs tracking-widest transition-all border-2 ${selectedAsset === asset ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' : 'border-white/5 text-gray-500 hover:border-white/10'}`}
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
                <section className="max-w-7xl mx-auto px-4">
                  <div className="glass-card p-12 rounded-[4rem] border-red-500/20 bg-gradient-to-b from-red-500/5 to-transparent">
                    <div className="text-center mb-16 space-y-4">
                       <h2 className="text-4xl font-black font-orbitron tracking-tighter uppercase">AML & KYC Protocol</h2>
                       <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Ensuring a secure and compliant trading environment</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                       <div className="space-y-8">
                          <h3 className="text-xl font-black font-orbitron text-white uppercase tracking-widest flex items-center gap-3">
                             <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-xs">01</span>
                             Mandatory Verification
                          </h3>
                          <div className="space-y-6">
                             {[
                                { t: "Basic Information", d: "Full name, DOB, and contact details as per Govt ID." },
                                { t: "Document Submission", d: "Valid Aadhaar, PAN card, or Passport upload." },
                                { t: "Address Proof", d: "Utility bills or bank statements for residence verification." },
                                { t: "Selfie Liveness", d: "Real-time selfie matching for identity confirmation." },
                                { t: "Verification Window", d: "Fast 24-48 hour approval turnaround." }
                             ].map((step, i) => (
                               <div key={i} className="flex gap-4 group">
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                                  <div>
                                     <h4 className="text-white font-bold text-sm uppercase">{step.t}</h4>
                                     <p className="text-gray-500 text-xs font-medium">{step.d}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                       <div className="space-y-8 bg-black/40 p-8 rounded-3xl border border-white/5">
                          <h3 className="text-xl font-black font-orbitron text-cyan-400 uppercase tracking-widest">Compliance Overview</h3>
                          <ul className="space-y-6">
                             <li className="space-y-2">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">FIU REGISTRATION</span>
                                <p className="text-gray-300 font-medium text-sm">FIU-IND Registered entity: <span className="text-white font-bold font-orbitron">REID-VA00058829</span></p>
                             </li>
                             <li className="space-y-2">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">TAXATION (SECTION 194S)</span>
                                <p className="text-gray-300 font-medium text-sm">Automated 1% TDS deduction for every VDA transaction to ensure full tax compliance.</p>
                             </li>
                             <li className="space-y-2">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">AML FRAMEWORK</span>
                                <p className="text-gray-300 font-medium text-sm">Strict Anti-Money Laundering monitoring of all P2P interactions to prevent illicit activities.</p>
                             </li>
                          </ul>
                          <Link to="/compliance" className="inline-block text-xs font-black text-cyan-400 font-orbitron uppercase border-b border-cyan-400/30 pb-1 hover:text-white transition">Read Full AML Policy →</Link>
                       </div>
                    </div>
                  </div>
                </section>

                {/* 5. CLIENT TRANSMISSION LOG (FEEDBACK SECTION) */}
                <section className="max-w-7xl mx-auto px-4">
                  <div className="space-y-16">
                    <div className="text-center space-y-4">
                      <h2 className="text-4xl md:text-5xl font-black font-orbitron tracking-tighter uppercase">Client Transmission Log</h2>
                      <div className="flex items-center justify-center gap-2">
                        <span className="h-[1px] w-12 bg-cyan-500/30"></span>
                        <p className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[10px]">Verified Trade Network Feedback</p>
                        <span className="h-[1px] w-12 bg-cyan-500/30"></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {[
                         { name: "Aarav M.", location: "Mumbai, MH", text: "Fastest UPI settlement I've experienced in the Indian P2P market. The escrow node released my USDT within 4 minutes of UTR verification.", rating: 5 },
                         { name: "Deepika K.", location: "Bangalore, KA", text: "FIU-IND registration is the main reason I moved my volume here. Compliance is non-negotiable for high-ticket trades and RadiantVault delivers.", rating: 5 },
                         { name: "Rahul S.", location: "New Delhi, DL", text: "The AI risk analysis caught a suspicious buyer on my sell ad before I even initiated. Saved me from a potential bank freeze. Truly enterprise-grade.", rating: 4 },
                         { name: "Priyanka V.", location: "Hyderabad, TS", text: "Smooth KYC protocol. Approved in under 4 hours on a weekend. The automated 1% TDS handling simplifies my tax filings significantly.", rating: 5 },
                         { name: "Vikram J.", location: "Pune, MH", text: "Competitive USDT spreads compared to global exchanges. Direct INR-to-VDA pipeline that actually works without the usual p2p anxiety.", rating: 5 },
                         { name: "Anil T.", location: "Chennai, TN", text: "Security architecture is foolproof. Every trade feels like a handshake in a digital vault. Customer support desk is very responsive.", rating: 5 }
                       ].map((review, i) => (
                         <div key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between group">
                            <div className="space-y-6">
                               <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-black font-orbitron text-cyan-400">
                                        {review.name[0]}
                                     </div>
                                     <div>
                                        <p className="text-sm font-black text-white font-orbitron">{review.name}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{review.location}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 border border-green-500/20">
                                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                     <span className="text-[8px] font-black text-green-400 uppercase tracking-widest">VERIFIED</span>
                                  </div>
                               </div>
                               <div className="flex gap-1 text-yellow-500/80">
                                  {[...Array(review.rating)].map((_, idx) => (
                                    <svg key={idx} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                  ))}
                               </div>
                               <p className="text-sm text-gray-400 font-medium leading-relaxed italic group-hover:text-gray-300 transition-colors">
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

        <section className="max-w-7xl mx-auto px-4 mb-24">
           <div className="glass-card rounded-[3rem] p-2 overflow-hidden border-cyan-500/10 shadow-[0_30px_60px_-12px_rgba(0,242,255,0.15)]">
             <img src="https://lh3.googleusercontent.com/d/1Tq9MSNzoVqZITLhDXb8uobD7DhQubGfO" alt="RadiantVault Promotional" className="w-full h-auto rounded-[2.8rem]" />
           </div>
        </section>

        <footer className="bg-black/50 border-t border-white/5 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-left">
               <div className="space-y-6">
                 <div className="flex items-center gap-4">
                   <Logo className="h-10 w-10" />
                   <span className="text-xl font-black font-orbitron tracking-tighter">RV_OTC</span>
                 </div>
                 <p className="text-sm text-gray-500 font-medium">Enterprise grade OTC infrastructure for the Bharat digital economy.</p>
                 <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black font-orbitron tracking-widest text-cyan-400">VERCEL PROD NODE</span>
                 </div>
               </div>
               <div>
                 <h4 className="text-xs font-black font-orbitron tracking-widest text-white mb-6 uppercase">Control Center</h4>
                 <ul className="space-y-4 text-sm text-gray-500 font-bold uppercase tracking-wider">
                   <li><span className="opacity-40 cursor-not-allowed select-none">Support Terminal</span></li>
                   <li><span className="opacity-40 cursor-not-allowed select-none">Identity Module</span></li>
                   <li><Link to="/admin" className="text-red-500 hover:text-red-400 transition inline-flex items-center gap-2">Admin Access <span className="text-[8px] border border-red-500/30 px-1 rounded">SECURE</span></Link></li>
                 </ul>
               </div>
               <div>
                 <h4 className="text-xs font-black font-orbitron tracking-widest text-white mb-6 uppercase">Legal Protocols</h4>
                 <ul className="space-y-4 text-sm text-gray-500 font-bold uppercase tracking-wider">
                   <li><span className="opacity-40 cursor-not-allowed select-none">AML System</span></li>
                   <li><span className="opacity-40 cursor-not-allowed select-none">Service Terms</span></li>
                   <li><span className="opacity-40 cursor-not-allowed select-none">Privacy Layer</span></li>
                 </ul>
               </div>
               <div className="space-y-6 text-left">
                 <h4 className="text-xs font-black font-orbitron tracking-widest text-white mb-6 uppercase">Headquarters</h4>
                 <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase">Bangalore 560068, Karnataka, India</p>
               </div>
            </div>
            <div className="border-t border-white/5 pt-8">
              <div className="inline-block glass-card px-8 py-6 rounded-[2rem] border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] max-w-4xl">
                 <p className="text-sm md:text-base font-bold text-gray-300 leading-relaxed tracking-wide">
                    <span className="text-cyan-400 font-orbitron font-black text-xs block mb-2 tracking-[0.3em]">OFFICIAL REGULATORY DECLARATION</span>
                    <span className="text-white">{APP_CONFIG.LEGAL_NAME}</span> is FIU-IND registered entity: REID-<span className="text-cyan-400">{APP_CONFIG.FIU_REG_ID}</span>
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
