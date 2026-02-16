
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';
import Logo from './Logo';

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const isActive = (path: string) => location.hash === `#${path}`;

  const navItems = [
    { label: 'P2P TRADING', path: '/' },
    { label: 'FAQ', path: '/faq' },
    { label: 'COMPLIANCE', path: '/compliance' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo className="h-14 w-14" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white leading-none tracking-tighter font-orbitron">RADIANTVAULT</span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em] leading-none mt-1">VENTURES OTC</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive(item.path) || (item.path === '/' && location.hash === '')
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-white'
                } transition-all duration-300 py-6 text-xs font-black tracking-widest font-orbitron`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs font-black text-white font-orbitron uppercase">{user.email.split('@')[0]}</span>
                  <span className="text-[10px] uppercase text-cyan-400 font-bold tracking-widest">{user.kycStatus}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-gray-400 hover:text-red-500 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth" className="text-gray-400 px-4 py-2 text-xs font-black hover:text-white transition uppercase tracking-widest">
                  Login
                </Link>
                <Link 
                  to="/auth" 
                  className="relative group overflow-hidden bg-cyan-500 text-black px-8 py-3 rounded-xl text-xs font-black hover:bg-cyan-400 transition shadow-[0_0_20px_rgba(0,242,255,0.4)] font-orbitron tracking-widest uppercase"
                >
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
