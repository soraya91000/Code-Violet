import React from 'react';
import { Crown, ShieldCheck, Lock } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-extrabold',
    lg: 'text-2xl font-black',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Badge: Soft Lavender box with Violet Vault & Gold Crown */}
      <div className="relative flex items-center justify-center p-2 rounded-2xl bg-[#F3EEFF] border border-[#8F5DFF]/20 shadow-xs">
        <Crown className={`${iconSizes[size]} text-[#F8D64E] filter drop-shadow-xs`} />
        <div className="absolute -bottom-1 -right-1 bg-[#8F5DFF] p-1 rounded-full text-white shadow-xs">
          <ShieldCheck className="w-3 h-3 text-[#F8D64E]" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className={`flex items-center gap-1.5 ${textSizes[size]} tracking-tight text-[#111827]`}>
          <span className="text-[#8F5DFF]">TONTINES</span>
          <span className="text-[#111827] font-black">COFFRES</span>
        </div>
        {showTagline && (
          <span className="text-xs font-medium text-gray-500 tracking-wide uppercase">
            Épargne collective & Coffre-fort
          </span>
        )}
      </div>
    </div>
  );
};
