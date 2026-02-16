
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12" }) => {
  // Updated to the correct logo ID: 1qIVJ0mMNCPtL-qs23g1y0TRSG9m0tYpD
  const imageUrl = "https://lh3.googleusercontent.com/d/1qIVJ0mMNCPtL-qs23g1y0TRSG9m0tYpD";
  
  return (
    <div className={`${className} relative group`}>
      {/* Decorative glow behind the logo image to match cyber-defy aesthetic */}
      <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500 opacity-50"></div>
      
      <img 
        src={imageUrl} 
        alt="RadiantVault Logo" 
        className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          // Fallback if needed
          (e.target as HTMLImageElement).src = 'https://drive.google.com/uc?export=view&id=1qIVJ0mMNCPtL-qs23g1y0TRSG9m0tYpD';
        }}
      />
    </div>
  );
};

export default Logo;
