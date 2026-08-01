import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  LayoutDashboard, Users, FolderKanban, CreditCard, Link2, 
  Package, BookOpen, Megaphone, ShieldAlert, ArrowLeft, 
  FileText, MessageSquare, CheckSquare 
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { activeAdminTab, setActiveAdminTab, switchRole, payments } = useApp();

  const pendingPaymentsCount = payments.filter(p => p.status === 'pending_validation').length;

  const adminNavItems = [
    { id: 'dashboard', label: 'Tableau de bord Admin', icon: LayoutDashboard },
    { id: 'membres', label: 'Gestion Membres (CRM)', icon: Users },
    { id: 'tontines', label: 'Tontines & Tirages', icon: FolderKanban },
    { id: 'paiements', label: 'Paiements & Validations', icon: CreditCard, count: pendingPaymentsCount },
    { id: 'liens', label: 'Liens de Paiement & QR', icon: Link2 },
    { id: 'offres', label: 'Formules & Offres', icon: Package },
    { id: 'ebooks', label: 'Ebooks & Fichiers', icon: BookOpen },
    { id: 'annonces', label: 'Annonces & Push', icon: Megaphone },
    { id: 'chat_moderation', label: 'Modération & Support', icon: MessageSquare },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#FAF8FF] border-r border-purple-200 min-h-screen p-5 shadow-sm sticky top-0 h-screen overflow-y-auto">
      {/* Brand Header */}
      <div className="pb-4 border-b border-purple-100">
        <Logo size="md" />
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#8F5DFF] text-white text-[11px] font-black rounded-full shadow-xs">
          <ShieldAlert className="w-3.5 h-3.5 text-[#F8D64E]" />
          ESPACE ADMINISTRATEUR
        </div>
      </div>

      {/* Switch to Member Workspace button */}
      <button
        onClick={() => switchRole('member')}
        className="my-4 w-full py-2.5 px-3 bg-white hover:bg-[#F3EEFF] border border-[#8F5DFF]/30 text-[#8F5DFF] font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Accès Code Violet</span>
      </button>

      {/* Admin Navigation */}
      <nav className="flex-1 space-y-1">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeAdminTab === item.id ||
            (item.id === 'membres' && activeAdminTab === 'member_management') ||
            (item.id === 'tontines' && activeAdminTab === 'tontine_management') ||
            (item.id === 'paiements' && activeAdminTab === 'payment_management') ||
            (item.id === 'liens' && activeAdminTab === 'payment_links') ||
            (item.id === 'chat_moderation' && activeAdminTab === 'support');
          return (
            <button
              key={item.id}
              onClick={() => setActiveAdminTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#8F5DFF] text-white shadow-md shadow-[#8F5DFF]/20 translate-x-1'
                  : 'text-gray-700 hover:bg-[#F3EEFF] hover:text-[#8F5DFF]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F8D64E]' : 'text-[#8F5DFF]'}`} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full animate-bounce ${
                  isActive ? 'bg-[#F8D64E] text-black' : 'bg-rose-500 text-white'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="pt-4 border-t border-purple-100 text-center">
        <p className="text-[11px] font-bold text-gray-500">Code Violet Admin v2.4.0</p>
        <p className="text-[10px] text-gray-400">Administratrice : Soraya Ahamada</p>
      </div>
    </aside>
  );
};
