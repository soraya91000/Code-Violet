import React, { useState } from 'react';
import { useApp } from './context/AppContext';

// Layout & Common
import { DesktopSidebar } from './components/layout/DesktopSidebar';
import { AdminSidebar } from './components/layout/AdminSidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Logo } from './components/common/Logo';
import { OfflineBanner } from './components/common/OfflineBanner';
import { NotificationDropdown } from './components/common/NotificationDropdown';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { QRModal } from './components/common/QRModal';
import { PaymentReturnConfirmModal } from './components/common/PaymentReturnConfirmModal';

// Public Landing
import { LandingPage } from './components/public/LandingPage';
import { AuthModal } from './components/auth/AuthModal';

// Member Components
import { MemberDashboard } from './components/member/MemberDashboard';
import { MyTontines } from './components/member/MyTontines';
import { TontineDetail } from './components/member/TontineDetail';
import { MemberPayments } from './components/member/MemberPayments';
import { MemberTurn } from './components/member/MemberTurn';
import { MemberCalendar } from './components/member/MemberCalendar';
import { MemberChat } from './components/member/MemberChat';
import { AmbitionView } from './components/member/AmbitionView';
import { DocumentVault } from './components/member/DocumentVault';
import { ReferralAndRewards } from './components/member/ReferralAndRewards';
import { MemberSupport } from './components/member/MemberSupport';
import { MemberProfile } from './components/member/MemberProfile';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminTontines } from './components/admin/AdminTontines';
import { AdminMembers } from './components/admin/AdminMembers';
import { AdminPayments } from './components/admin/AdminPayments';
import { AdminPaymentLinks } from './components/admin/AdminPaymentLinks';
import { AdminOffers } from './components/admin/AdminOffers';
import { AdminEbooks } from './components/admin/AdminEbooks';
import { AdminAnnouncements } from './components/admin/AdminAnnouncements';
import { AdminSupport } from './components/admin/AdminSupport';

import { Search, ShieldCheck, UserCheck, Crown, Bell, LogOut, ArrowRight, Sparkles } from 'lucide-react';
import { PaymentLink } from './types';

export function App() {
  const { 
    currentRole, 
    activeMemberTab, 
    activeAdminTab, 
    setActiveMemberTab, 
    setActiveAdminTab,
    switchRole,
    currentUser,
    paymentLinks,
    declarePayment,
  } = useApp();

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | '2fa'>('login');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [qrModalLink, setQrModalLink] = useState<PaymentLink | null>(null);
  const [confirmPaymentState, setConfirmPaymentState] = useState<{
    isOpen: boolean;
    paymentLinkId: string;
    amount: number;
    tontineName: string;
  }>({
    isOpen: false,
    paymentLinkId: '',
    amount: 50,
    tontineName: 'Tontine Sérénité 50 €',
  });

  const [selectedTontineId, setSelectedTontineId] = useState<string>('tnt_serenite_50');

  // Trigger Auth
  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Payment trigger
  const handlePayNow = (paymentLinkId: string, amount: number, tontineName: string) => {
    setConfirmPaymentState({
      isOpen: true,
      paymentLinkId,
      amount,
      tontineName,
    });
  };

  const handleSelectTontine = (tontineId: string) => {
    setSelectedTontineId(tontineId);
    setActiveMemberTab('tontine_detail');
  };

  // 1. PUBLIC LANDING VIEW
  if (currentRole === 'public') {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#F3EEFF] selection:text-[#8F5DFF]">
        <OfflineBanner />
        <LandingPage
          onLogin={() => handleOpenAuth('login')}
          onSignup={() => handleOpenAuth('signup')}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          initialMode={authMode}
        />
      </div>
    );
  }

  // 2. MEMBER / ADMIN AUTHENTICATED WRAPPER
  return (
    <div className="min-h-screen bg-[#FCFCFD] text-slate-900 font-sans flex flex-col md:flex-row pb-24 md:pb-0 selection:bg-[#F3EEFF] selection:text-[#8F5DFF]">
      <OfflineBanner />

      {/* Desktop Sidebar depending on role */}
      {currentRole === 'member' ? (
        <DesktopSidebar onOpenSearch={() => setIsSearchOpen(true)} />
      ) : (
        <AdminSidebar />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header Bar */}
        <header className="sticky top-0 z-30 bg-[#FCFCFD]/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" className="md:hidden" />
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none uppercase text-slate-900">
                {currentRole === 'member' ? 'Tontines Coffres' : 'Administration Tontines'}
              </span>
              <span className="text-[10px] text-[#8F5DFF] font-semibold tracking-widest uppercase opacity-80 mt-0.5">
                {currentRole === 'member' ? 'Épargne Premium' : 'Panneau de Contrôle'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-2xl hover:bg-slate-100 hidden sm:flex items-center gap-2 text-xs bg-white px-4 py-2 border border-slate-200/60 shadow-xs"
            >
              <Search className="w-4 h-4 text-[#8F5DFF]" />
              <span>Rechercher...</span>
              <kbd className="font-mono text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">⌘K</kbd>
            </button>

            <NotificationDropdown />

            {/* Role Switcher Pill */}
            <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200/60 flex items-center gap-1">
              <button
                onClick={() => switchRole('member')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  currentRole === 'member' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Membre
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  currentRole === 'admin' ? 'bg-[#111827] text-[#F8D64E] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin 🛡️
              </button>
            </div>

            {/* Logout button */}
            <button
              onClick={() => switchRole('public')}
              className="p-2 text-slate-400 hover:text-rose-600 rounded-2xl hover:bg-rose-50 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Main Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {currentRole === 'member' && (
            <>
              {(activeMemberTab === 'dashboard' || activeMemberTab === 'accueil' || ![
                'dashboard', 'accueil', 'mes_tontines', 'tontine_detail', 'paiements', 
                'mon_tour', 'calendrier', 'ambition', 'discussion', 'ebooks', 'ebook', 'documents', 
                'parrainage', 'support', 'profil'
              ].includes(activeMemberTab)) && (
                <MemberDashboard
                  onPayNow={handlePayNow}
                  onViewTurn={() => setActiveMemberTab('mon_tour')}
                  onViewTontineDetail={handleSelectTontine}
                />
              )}
              {activeMemberTab === 'mes_tontines' && (
                <MyTontines onSelectTontine={handleSelectTontine} />
              )}
              {activeMemberTab === 'tontine_detail' && (
                <TontineDetail
                  tontineId={selectedTontineId}
                  onBack={() => setActiveMemberTab('mes_tontines')}
                  onPayNow={handlePayNow}
                />
              )}
              {activeMemberTab === 'paiements' && (
                <MemberPayments
                  onOpenQR={(link) => setQrModalLink(link)}
                  onPayNow={handlePayNow}
                />
              )}
              {activeMemberTab === 'mon_tour' && <MemberTurn />}
              {activeMemberTab === 'calendrier' && <MemberCalendar />}
              {(activeMemberTab === 'ambition' || activeMemberTab === 'ebooks' || activeMemberTab === 'ebook') && <AmbitionView />}
              {activeMemberTab === 'discussion' && <MemberChat />}
              {activeMemberTab === 'documents' && <DocumentVault />}
              {activeMemberTab === 'parrainage' && <ReferralAndRewards />}
              {activeMemberTab === 'support' && <MemberSupport />}
              {activeMemberTab === 'profil' && <MemberProfile />}
            </>
          )}

          {currentRole === 'admin' && (
            <>
              {(activeAdminTab === 'dashboard' || ![
                'dashboard', 'tontine_management', 'tontines', 'member_management', 
                'membres', 'payment_management', 'paiements', 'payment_links', 'liens', 
                'offres', 'ebooks', 'annonces', 'support', 'chat_moderation'
              ].includes(activeAdminTab)) && (
                <AdminDashboard onNavigateTab={setActiveAdminTab} />
              )}
              {(activeAdminTab === 'tontine_management' || activeAdminTab === 'tontines') && <AdminTontines />}
              {(activeAdminTab === 'member_management' || activeAdminTab === 'membres') && <AdminMembers />}
              {(activeAdminTab === 'payment_management' || activeAdminTab === 'paiements') && <AdminPayments />}
              {(activeAdminTab === 'payment_links' || activeAdminTab === 'liens') && <AdminPaymentLinks />}
              {activeAdminTab === 'offres' && <AdminOffers />}
              {activeAdminTab === 'ebooks' && <AdminEbooks />}
              {activeAdminTab === 'annonces' && <AdminAnnouncements />}
              {(activeAdminTab === 'support' || activeAdminTab === 'chat_moderation') && <AdminSupport />}
            </>
          )}
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      {currentRole === 'member' && <MobileBottomNav />}

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTontine={handleSelectTontine}
      />

      <QRModal
        isOpen={!!qrModalLink}
        onClose={() => setQrModalLink(null)}
        paymentLink={qrModalLink}
        onProceedToPay={(link) => handlePayNow(link.id, link.amount, link.name)}
      />

      <PaymentReturnConfirmModal
        isOpen={confirmPaymentState.isOpen}
        onClose={() => setConfirmPaymentState(prev => ({ ...prev, isOpen: false }))}
        amount={confirmPaymentState.amount}
        tontineName={confirmPaymentState.tontineName}
        onConfirmPayment={(fullName) => {
          declarePayment(
            selectedTontineId || 'tnt_serenite_50',
            confirmPaymentState.amount,
            confirmPaymentState.paymentLinkId,
            fullName
          );
        }}
      />
    </div>
  );
}

export default App;
