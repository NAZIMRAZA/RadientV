
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Trade Info & Escrow */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                trade.status === TradeStatus.PENDING_PAYMENT ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>
                {trade.status.replace('_', ' ')}
              </span>
              <h1 className="text-2xl font-bold mt-2">
                {isBuyer ? `Buy ${trade.asset}` : `Sell ${trade.asset}`}
              </h1>
              <p className="text-gray-500 text-sm">Trade ID: {trade.id}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">{formatTime(timeLeft)}</div>
              <p className="text-xs text-gray-400">Time remaining to pay</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-50">
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-bold">{trade.amount} {trade.asset}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-bold">₹{trade.price.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">TDS (1%)</p>
              <p className="font-bold text-red-600">₹{trade.tdsAmount.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total INR</p>
              <p className="font-bold text-lg">₹{trade.totalInr.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="font-bold text-gray-900">Seller's Payment Method (UPI)</h3>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-blue-600 uppercase font-bold tracking-wider">UPI ID</p>
                <p className="text-lg font-mono font-bold text-blue-900">merchant.vda@okaxis</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-bold underline">Copy</button>
            </div>
            
            {isBuyer && trade.status === TradeStatus.PENDING_PAYMENT && (
              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Enter 12-Digit UTR Number</label>
                  <input
                    type="text"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    placeholder="123456789012"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <button
                  disabled={utr.length < 12}
                  className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-200 disabled:opacity-50"
                >
                  I Have Paid & Submitted UTR
                </button>
                <p className="text-xs text-center text-gray-400">Fraudulent UTR submission leads to permanent ban and FIU reporting.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">Escrow Security Policy</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex gap-2">✅ Crypto is currently locked in our platform's secure multi-sig escrow.</li>
            <li className="flex gap-2">✅ Do not release crypto unless you verify the amount in your bank statement.</li>
            <li className="flex gap-2">✅ Screenshot proof must be uploaded for dispute cases.</li>
          </ul>
        </div>
      </div>

      {/* Right: Chat */}
      <div className="bg-white flex flex-col h-[600px] rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <span className="font-bold text-gray-800">Trade Chat</span>
          <button className="text-red-500 text-sm font-bold hover:underline">Dispute Trade</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                m.sender === 'You' 
                  ? 'bg-orange-600 text-white rounded-tr-none' 
                  : m.sender === 'System'
                  ? 'bg-gray-200 text-gray-700 w-full text-center italic rounded-lg'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
              }`}>
                {m.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1">{m.time}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-50 flex gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-1 focus:ring-orange-500"
          />
          <button onClick={handleSend} className="bg-orange-600 text-white p-2 rounded-full">
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
