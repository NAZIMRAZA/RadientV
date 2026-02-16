
import React from 'react';
import { P2PAd, TradeSide, AssetType } from '../../types';

interface AdListProps {
  ads: P2PAd[];
  asset: AssetType;
  side: TradeSide;
  onTrade: (ad: P2PAd) => void;
}

const AdList: React.FC<AdListProps> = ({ ads, asset, side, onTrade }) => {
  return (
    <div className="overflow-x-auto p-2">
      <table className="min-w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase font-orbitron">
            <th className="px-6 py-4 text-left">Merchant</th>
            <th className="px-6 py-4 text-left">Market Price</th>
            <th className="px-6 py-4 text-left">Capacity / Limits</th>
            <th className="px-6 py-4 text-left">Payment Methods</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {ads.map((ad) => (
            <tr key={ad.id} className="glass-card rounded-2xl group">
              <td className="px-6 py-5 first:rounded-l-2xl">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px]">
                    <div className="h-full w-full rounded-xl bg-gray-900 flex items-center justify-center text-cyan-400 font-orbitron font-bold text-xl">
                      {ad.userName[0]}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-black text-white font-orbitron">{ad.userName}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] text-green-400 font-bold tracking-widest uppercase">Verified Merchant</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="text-xl font-black text-white font-orbitron">₹{ad.price.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Fixed Price / {ad.asset}</div>
              </td>
              <td className="px-6 py-5">
                <div className="text-sm text-gray-300 font-bold">
                  {ad.availableAmount} <span className="text-cyan-400">{ad.asset}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Limits: ₹{ad.minLimit.toLocaleString('en-IN')} - ₹{ad.maxLimit.toLocaleString('en-IN')}</div>
              </td>
              <td className="px-6 py-5">
                <div className="flex gap-2 flex-wrap">
                  {ad.paymentMethods.map(m => (
                    <span key={m} className="px-2 py-1 text-[9px] font-black bg-white/5 text-cyan-400 rounded-md border border-white/10 uppercase tracking-widest">
                      {m}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-5 text-right last:rounded-r-2xl">
                <button
                  onClick={() => onTrade(ad)}
                  className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] font-orbitron transition-all duration-300 transform active:scale-95 ${
                    side === TradeSide.BUY 
                    ? 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                    : 'bg-red-500 text-white hover:bg-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  }`}
                >
                  {side === TradeSide.BUY ? 'Execute Buy' : 'Execute Sell'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdList;
