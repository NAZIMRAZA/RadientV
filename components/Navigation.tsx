import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';
import Logo from './Logo';
import BinanceDetailsPanel from './BinanceDetailsPanel';

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBinancePanelOpen, setIsBinancePanelOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.hash === `#${path}`;

  const navItems = [
    { label: 'P2P TRADING', path: '/' },
    { label: 'FAQ', path: '/faq' },
    { label: 'COMPLIANCE', path: '/compliance' },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-2 shrink-0">
              <Link to="/" onClick={closeMenu} className="flex items-center space-x-2 md:space-x-3 group">
                <Logo className="h-9 w-9 md:h-12 md:w-12" />
                <div className="flex flex-col">
                  <span className="text-lg md:text-2xl font-black text-white leading-none tracking-tighter font-orbitron">RADIANTVAULT</span>
                  <span className="text-[7px] md:text-[9px] font-bold text-cyan-400 uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none mt-1">VENTURES OTC</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    isActive(item.path) || (item.path === '/' && location.hash === '')
                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  } transition-all duration-300 py-6 text-[10px] lg:text-xs font-black tracking-widest font-orbitron uppercase`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions (Desktop) */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-white font-orbitron uppercase">{user.email.split('@')[0]}</span>
                    <span className="text-[9px] uppercase text-cyan-400 font-bold tracking-widest">{user.kycStatus}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-gray-400 hover:text-red-500 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/auth" className="text-gray-400 px-2 py-2 text-xs font-black hover:text-white transition uppercase tracking-widest">
                    Login
                  </Link>
                  <Link 
                    to="/auth" 
                    className="bg-cyan-500 text-black px-6 py-2.5 rounded-xl text-xs font-black hover:bg-cyan-400 transition shadow-[0_0_15px_rgba(0,242,255,0.3)] font-orbitron tracking-widest uppercase"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center space-x-3">
               {user && (
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-white font-orbitron uppercase truncate max-w-[60px]">{user.email.split('@')[0]}</span>
                    <span className="text-[7px] uppercase text-cyan-400 font-bold tracking-tighter">{user.kycStatus}</span>
                 </div>
               )}
               <button 
                onClick={toggleMenu}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle Menu"
               >
                 {isMobileMenuOpen ? (
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 ) : (
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                   </svg>
                 )}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'}`}>
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`block py-3 text-sm font-black font-orbitron tracking-widest uppercase ${
                  isActive(item.path) || (item.path === '/' && location.hash === '') ? 'text-cyan-400' : 'text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Binance Details Item */}
            <button
              onClick={() => { setIsBinancePanelOpen(true); closeMenu(); }}
              className="w-full text-left py-3 text-sm font-black text-yellow-500 font-orbitron tracking-widest uppercase flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4.5 9.5L12 17L19.5 9.5L12 2ZM12 4.8L16.7 9.5L12 14.2L7.3 9.5L12 4.8ZM12 18L4.5 10.5L3.1 11.9L12 20.8L20.9 11.9L19.5 10.5L12 18Z" />
              </svg>
              Trade With Binance
            </button>

            <div className="pt-4 mt-4 border-t border-white/5 space-y-4">
              {user ? (
                <button 
                  onClick={() => { onLogout(); closeMenu(); }}
                  className="w-full text-left py-3 text-sm font-black text-red-500 font-orbitron tracking-widest uppercase"
                >
                  LOGOUT TERMINAL
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="/auth" 
                    onClick={closeMenu}
                    className="flex items-center justify-center py-4 border border-white/10 rounded-xl text-xs font-black text-white uppercase tracking-widest"
                  >
                    LOGIN
                  </Link>
                  <Link 
                    to="/auth" 
                    onClick={closeMenu}
                    className="flex items-center justify-center py-4 bg-cyan-500 rounded-xl text-xs font-black text-black uppercase tracking-widest"
                  >
                    SIGN UP
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen Slide-up Panel */}
      <BinanceDetailsPanel 
        isOpen={isBinancePanelOpen} 
        onClose={() => setIsBinancePanelOpen(false)} 
      />
    </>
  );
};

export default Navigation;
