import React, { useState, useEffect } from 'react';
import { Trade, TradeStatus, AssetType } from '../../types';
import { APP_CONFIG } from '../../constants';

interface TradeRoomProps {
  trade: Trade;
  isBuyer: boolean;
}

const TradeRoom: React.FC<TradeRoomProps> = ({ trade, isBuyer }) => {
  const [timeLeft, setTimeLeft] = useState(APP_CONFIG.TRADE_EXPIRY_MINUTES * 60);
  const [messages, setMessages] = useState<{sender: string, text: string, time: string}[]>([
    { sender: 'System', text: 'Escrow has locked the crypto. Buyer can proceed with payment.', time: '12:00' }
  ]);
  const [input, setInput] = useState('');
  const [utr, setUtr] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { sender: 'You', text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setInput('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-8">
      {/* Left: Trade Info & Escrow */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 text-gray-900">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                trade.status === TradeStatus.PENDING_PAYMENT ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>
                {trade.status.replace('_', ' ')}
              </span>
              <h1 className="text-2xl md:text-3xl font-black font-orbitron mt-3 tracking-tighter text-gray-900">
                {isBuyer ? `BUY ${trade.asset}` : `SELL ${trade.asset}`}
              </h1>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Protocol ID: {trade.id}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black font-orbitron text-orange-600">{formatTime(timeLeft)}</div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Expiration Window</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-50">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Amount</p>
              <p className="font-black text-lg text-gray-900">{trade.amount} {trade.asset}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Price</p>
              <p className="font-black text-lg text-gray-900">₹{trade.price.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">TDS (1%)</p>
              <p className="font-black text-lg text-red-600">₹{trade.tdsAmount.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total INR</p>
              <p className="font-black text-2xl text-gray-900">₹{trade.totalInr.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <h3 className="font-black font-orbitron text-gray-900 uppercase tracking-widest text-xs">Merchant Payment Terminal (UPI)</h3>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex justify-between items-center group">
              <div>
                <p className="text-[9px] text-blue-600 uppercase font-black tracking-[0.2em] mb-1">UPI ADDRESS</p>
                <p className="text-xl font-mono font-black text-blue-900 tracking-tight">merchant.vda@okaxis</p>
              </div>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-200 hover:bg-blue-600 hover:text-white transition-all">Copy</button>
            </div>
            
            {isBuyer && trade.status === TradeStatus.PENDING_PAYMENT && (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Enter 12-Digit UTR Number</label>
                  <input
                    type="text"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    placeholder="123456789012"
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-black font-black text-lg tracking-widest"
                  />
                </div>
                <button
                  disabled={utr.length < 12}
                  className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black font-orbitron tracking-widest text-sm uppercase shadow-lg shadow-orange-100 disabled:opacity-30 transition-all active:scale-95"
                >
                  Confirm Payment Transmission
                </button>
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-[9px] text-red-700 font-bold uppercase tracking-wider">Warning: Fraudulent UTR reporting triggers immediate FIU-IND investigation.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200 text-gray-900">
          <h3 className="font-black font-orbitron text-gray-900 uppercase tracking-widest text-xs mb-4">Escrow Protocol</h3>
          <ul className="text-xs text-gray-600 space-y-3 font-bold">
            <li className="flex gap-3">
              <span className="text-green-600">✔</span>
              Asset status: SECURELY LOCKED in multi-sig vault.
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✔</span>
              Release condition: Manual bank statement verification required.
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✔</span>
              Dispute resolution: Human mediation available 24/7.
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Chat */}
      <div className="bg-white flex flex-col h-[600px] md:h-auto md:min-h-[700px] rounded-3xl shadow-xl border border-gray-100 overflow-hidden text-gray-900">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-black font-orbitron text-[10px] text-gray-900 uppercase tracking-widest">Trade Terminal</span>
          </div>
          <button className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline">Open Dispute</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50/50 no-scrollbar">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] font-bold leading-relaxed ${
                m.sender === 'You' 
                  ? 'bg-orange-600 text-white rounded-tr-none shadow-md shadow-orange-100' 
                  : m.sender === 'System'
                  ? 'bg-gray-200 text-gray-600 w-full text-center italic rounded-xl text-[10px]'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
              }`}>
                {m.text}
              </div>
              <span className="text-[9px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">{m.time}</span>
            </div>
          ))}
        </div>

        <div className="p-5 bg-white border-t border-gray-100 flex gap-3">
          <button className="p-3 text-gray-400 hover:text-orange-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="TYPE TRANSMISSION..."
            className="flex-1 px-5 py-3 bg-gray-100 rounded-xl text-[11px] font-bold outline-none focus:ring-1 focus:ring-orange-500 text-black placeholder:text-gray-400"
          />
          <button onClick={handleSend} className="bg-orange-600 text-white p-3 rounded-xl shadow-md shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeRoom;