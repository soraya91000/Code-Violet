import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  Home, CreditCard, Users, Calendar, MessageSquare, 
  BookOpen, FolderCheck, LifeBuoy, Gift, User as UserIcon, 
  ShieldCheck, Clock, Settings, Search, LogOut, Sparkles 
} from 'lucide-react';

interface DesktopSidebarProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ onOpenSearch, onOpenAuth }) => {
  const { activeMemberTab, setActiveMemberTab, currentUser, activeRole, switchRole } = useApp();

  const navItems = [
    { id: 'accueil', label: 'Accueil / Dashboard', icon: Home },
    { id: 'mes_tontines', label: 'Mes Tontines', icon: Users },
    { id: 'mon_tour', label: 'Mon Tour', icon: Clock, badge: 'N°6' },
    { id: 'paiements', label: 'Paiements & Liens', icon: CreditCard },
    { id: 'calendrier', label: 'Calendrier', icon: Calendar },
    { id: 'ambition', label: 'Ambition & Ebook', icon: Sparkles, badge: 'Ebook & VIP' },
    { id: 'documents', label: 'Coffre Documentaire', icon: FolderCheck },
    { id: 'support', label: 'Support Client', icon: LifeBuoy },
    { id: 'parrainage', label: 'Parrainage & Bonus', icon: Gift },
    { id: 'profil', label: 'Mon Profil & Paramètres', icon: UserIcon },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-slate-100 min-h-screen p-5 sticky top-0 h-screen overflow-y-auto">
      {/* Brand Header */}
      <div className="pb-6 border-b border-slate-100">
        <Logo size="md" showTagline />
      </div>

      {/* Mode Switcher Banner (Role Toggle) */}
      <div className="my-4 p-3 rounded-2xl bg-[#F3EEFF] border border-[#8F5DFF]/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#8F5DFF]" />
          <div>
            <p className="text-xs font-bold text-slate-900">Accès Code Violet</p>
            <p className="text-[10px] text-slate-500">Connecté en tant que {currentUser.firstName}</p>
          </div>
        </div>
        <button
          onClick={() => switchRole('admin')}
          className="px-2 py-1 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-[10px] rounded-xl shadow-xs transition-colors"
        >
          Admin ⚙️
        </button>
      </div>

      {/* Quick Search Button */}
      <button
        onClick={onOpenSearch}
        className="w-full mb-4 px-3.5 py-2.5 bg-slate-50 hover:bg-[#F3EEFF]/40 border border-slate-200/60 rounded-2xl text-left text-xs font-medium text-slate-400 flex items-center justify-between transition-colors shadow-2xs"
      >
        <span className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#8F5DFF]" />
          Recherche rapide...
        </span>
        <kbd className="px-1.5 py-0.5 bg-white text-[10px] font-mono rounded-md border border-slate-200">⌘K</kbd>
      </button>

      {/* Main Navigation List */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMemberTab === item.id || 
            (item.id === 'accueil' && activeMemberTab === 'dashboard') ||
            (item.id === 'ebook' && activeMemberTab === 'ebooks');
          return (
            <button
              key={item.id}
              onClick={() => setActiveMemberTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#8F5DFF] text-white shadow-lg shadow-[#8F5DFF]/20'
                  : 'text-slate-600 hover:bg-[#F3EEFF]/60 hover:text-[#8F5DFF]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F8D64E]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full ${
                  isActive ? 'bg-[#F8D64E] text-slate-900' : 'bg-[#F3EEFF] text-[#8F5DFF]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile Box */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.firstName}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#F8D64E]"
              />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-xs truncate">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-950 bg-gradient-to-r from-[#FEF08A] to-[#EAB308] px-2 py-0.5 rounded-full border border-amber-400 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-slate-950" /> Membre Code Violet
              </span>
            </div>
          </div>
          <button
            onClick={onOpenAuth}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl transition-colors"
            title="Se déconnecter / Inscription"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
