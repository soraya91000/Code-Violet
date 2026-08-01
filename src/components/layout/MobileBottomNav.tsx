import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, CreditCard, Users, Sparkles, User as UserIcon, ShieldCheck } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeMemberTab, setActiveMemberTab, activeRole, switchRole } = useApp();

  if (activeRole === 'admin') {
    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          <button
            onClick={() => switchRole('member')}
            className="flex flex-col items-center gap-1 text-[#8F5DFF] text-xs font-bold"
          >
            <ShieldCheck className="w-5 h-5 text-[#F8D64E]" />
            <span>Mode Admin Actif</span>
          </button>
        </div>
      </nav>
    );
  }

  const items = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'paiements', label: 'Paiements', icon: CreditCard },
    { id: 'mes_tontines', label: 'Ma tontine', icon: Users },
    { id: 'ambition', label: 'Ambition', icon: Sparkles },
    { id: 'profil', label: 'Profil', icon: UserIcon },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeMemberTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMemberTab(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all ${
                isActive
                  ? 'text-[#8F5DFF] font-black scale-105 bg-[#F3EEFF]/80'
                  : 'text-gray-400 font-medium hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#8F5DFF]' : ''}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F8D64E] -mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
