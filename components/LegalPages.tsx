
import React, { useState } from 'react';
import { APP_CONFIG } from '../constants';

export const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqs = [
    { q: "What is Radiantvault Ventures?", a: "Radiantvault Ventures is a leading peer-to-peer (P2P) cryptocurrency trading platform in India. We provide a secure, transparent, and user-friendly marketplace for individuals to trade digital assets directly with one another. By eliminating intermediaries, we offer faster and more decentralized trading options." },
    { q: "How do I create an account on Radiantvault Ventures?", a: "Step 1: Click on the Sign Up button. Step 2: Enter email, choice password. Step 3: Verify email. Once verified, log in and proceed to KYC." },
    { q: "Is KYC mandatory?", a: "Yes, KYC (Know Your Customer) is mandatory for all users on Radiantvault Ventures. We enforce strict KYC rules to ensure compliance with Indian regulations." },
    { q: "What documents do I need for KYC verification?", a: "Valid government photo ID (Aadhaar/PAN/Passport), Proof of Address, Passport Photo, and a Real-time Selfie." },
    { q: "How long does KYC verification take?", a: "Usually 24-48 hours after submission. You will be notified via email." },
    { q: "How do I trade cryptocurrency on Radiantvault Ventures?", a: "Browse offers, choose a buyer/seller, initiate trade, confirm payment, and release crypto via escrow." },
    { q: "What payment methods are accepted?", a: "Bank transfers (IMPS, NEFT, RTGS), UPI, and popular mobile wallets." },
    { q: "Is there a minimum or maximum trading limit?", a: "Limits vary by the individual offer. Check offer details before proceeding." },
    { q: "What are the fees for trading on Radiantvault Ventures?", a: "We charge a small, transparent transaction fee displayed upfront before you confirm." },
    { q: "Is Radiantvault Ventures secure?", a: "Yes. We use advanced encryption, 2FA, and a secure escrow system for all trades." },
    { q: "How does the escrow system work?", a: "Crypto is held in a neutral escrow wallet once a trade starts. It's only released to the buyer after both parties confirm the payment." },
    { q: "What happens if I have a dispute during a trade?", a: "Our support team mediates. Provide evidence (payment proof/chats) and we will resolve based on facts." },
    { q: "How do I withdraw my cryptocurrency to an external wallet?", a: "Go to Wallet, select crypto, enter destination address and amount, then confirm." },
    { q: "Can I trade other cryptocurrencies besides Bitcoin?", a: "Yes, we support BTC, ETH, LTC, and USDT, with more assets added regularly." },
    { q: "Is there a mobile app for Radiantvault Ventures?", a: "Currently in development for Android and iOS. Stay tuned for the release!" },
    { q: "What happens if I forget my password?", a: "Use the 'Forgot Password' link on the login page to receive a reset link via email." },
    { q: "Can I delete my Radiantvault Ventures account?", a: "Yes, contact support for assistance. Note that data removal is permanent." },
    { q: "How can I contact customer support?", a: "Email: radiantvaultventures@gmail.com, or use the Live Chat on our website during business hours." },
    { q: "Are there any risks in P2P cryptocurrency trading?", a: "Risks exist, but we mitigate them through escrow, KYC, and ratings. Always verify payment receipt before releasing." },
    { q: "Does Radiantvault Ventures comply with Indian regulations?", a: "Yes, we adhere to all Indian VDA regulations, including FIU-IND compliance and 1% TDS (Sec 194S)." },
    { q: "Can foreign nationals use Radiantvault Ventures?", a: "Currently available only to Indian residents. International expansion is planned." },
    { q: "How can I report suspicious activity?", a: "Email security@radiantvault.com immediately with details." },
    { q: "What is the future of Radiantvault Ventures?", a: "Expanding asset support, launching a mobile app, and entering international markets while remaining Bharat's #1 hub." }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-tighter mb-4 uppercase">Support Terminal</h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Access the Knowledge Database</p>
      </div>

      <div className="relative mb-12">
        <input 
          type="text" 
          placeholder="SEARCH FAQ DATABASE..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-white font-orbitron text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-black text-xs">CTRL + K</div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, i) => (
          <details key={i} className="group glass-card rounded-2xl border-white/5 overflow-hidden">
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
              <span className="font-bold text-gray-200 text-sm md:text-base pr-8">{faq.q}</span>
              <span className="text-cyan-400 transform group-open:rotate-180 transition-transform font-bold">↓</span>
            </summary>
            <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed font-medium border-t border-white/5 bg-black/20">
              {faq.a}
            </div>
          </details>
        ))}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-20 text-gray-600 font-black uppercase tracking-widest">No matching protocol entries found.</div>
        )}
      </div>
    </div>
  );
};

export const PolicyPage: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => (
  <div className="max-w-4xl mx-auto py-24 px-4">
    <div className="glass-card p-10 md:p-16 rounded-[3rem] border-white/5">
      <h1 className="text-3xl font-black font-orbitron mb-12 text-white uppercase tracking-tighter">{title}</h1>
      <div className="text-gray-400 leading-relaxed font-medium">
        {content}
      </div>
    </div>
  </div>
);

export const AMLPolicyContent = () => (
  <div className="space-y-8">
    <p className="text-cyan-400 font-bold uppercase text-xs tracking-widest">Compliance Protocol v2.4</p>
    <p>RadiantVaultOTC (Radiantvault Ventures) is committed to the highest standards of Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) compliance under the FIU-IND framework.</p>
    
    <div className="space-y-4">
      <h3 className="text-xl font-black font-orbitron text-white">1. KYC Mandatory Verification</h3>
      <p>To ensure a secure trading environment, all individual customers must complete KYC verification. This is non-negotiable for accessing full trading features.</p>
      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>Provide full legal name, DOB, and contact details.</li>
        <li>Upload Govt-issued ID (Aadhaar, PAN, or Passport).</li>
        <li>Proof of Residence (Utility bills/Bank statements).</li>
        <li>Mandatory real-time selfie for liveness verification.</li>
      </ul>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-black font-orbitron text-white">2. Transaction Monitoring</h3>
      <p>We monitor all trades for suspicious patterns using advanced AI models. High-frequency or high-value transactions are subject to enhanced due diligence (EDD).</p>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-black font-orbitron text-white">3. Reporting Duties</h3>
      <p>In accordance with PMLA guidelines, suspicious activity is reported to the Financial Intelligence Unit - India (FIU-IND) under registration <span className="text-white font-bold">REID-VA00058829</span>.</p>
    </div>
  </div>
);

export const TermsOfServiceContent = () => (
  <div className="space-y-6 text-sm">
    <p className="text-pink-400 font-bold">Last Updated: October 2024</p>
    <p>By using RadiantVaultOTC, you agree to comply with the following terms:</p>
    <ul className="space-y-4">
      <li className="flex gap-4"><span className="text-cyan-500 font-black">01</span> You must be an Indian resident aged 18 or older.</li>
      <li className="flex gap-4"><span className="text-cyan-500 font-black">02</span> All users must pay 1% TDS as per Section 194S of the Income Tax Act.</li>
      <li className="flex gap-4"><span className="text-cyan-500 font-black">03</span> Radiantvault Ventures is a neutral technology provider; all P2P trades are executed at user discretion.</li>
      <li className="flex gap-4"><span className="text-cyan-500 font-black">04</span> Fraudulent UTR submissions or bank chargebacks will result in permanent bans and legal action.</li>
    </ul>
  </div>
);

export const PrivacyPolicyContent = () => (
  <div className="space-y-8">
    <p>We value your privacy at Radiantvault Ventures.</p>
    <div className="space-y-4">
      <h3 className="text-xl font-black font-orbitron text-white">Data Protection Layer</h3>
      <p>Your identity documents are used solely for regulatory compliance and stored using 256-bit AES encryption. Aadhaar numbers are masked in accordance with UIDAI guidelines.</p>
    </div>
    <div className="space-y-4">
      <h3 className="text-xl font-black font-orbitron text-white">Contact Integrity</h3>
      <p>For privacy queries, reach out to <span className="text-cyan-400 font-bold">radiantvaultventures@gmail.com</span>.</p>
    </div>
  </div>
);
