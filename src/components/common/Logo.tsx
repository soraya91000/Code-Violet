import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
}

export const LOGO_IMAGE_URL = "https://image.noelshack.com/fichiers/2026/32/1/1785708082-70c4b4dd-f12e-41fd-87c8-0cdde670ac94.jpg";

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showTagline = false,
  variant = 'light' 
}) => {
  const imgSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-extrabold',
    lg: 'text-2xl font-black',
  };

  const textColor = variant === 'dark' ? 'text-white' : 'text-[#111827]';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Logo Image */}
      <img
        src={LOGO_IMAGE_URL}
        alt="Logo Code Violet"
        className={`${imgSizes[size]} object-cover rounded-2xl border border-[#8F5DFF]/30 shadow-xs shrink-0`}
        referrerPolicy="no-referrer"
      />

      <div className="flex flex-col">
        <div className={`flex items-center gap-1.5 ${textSizes[size]} tracking-tight ${textColor}`}>
          <span className="text-[#8F5DFF]">TONTINES</span>
          <span className="font-black">CODE VIOLET</span>
        </div>
        {showTagline && (
          <span className={`text-xs font-medium tracking-wide uppercase ${variant === 'dark' ? 'text-purple-200' : 'text-gray-500'}`}>
            Épargne collective & Sécurisée
          </span>
        )}
      </div>
    </div>
  );
};

