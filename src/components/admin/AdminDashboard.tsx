import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, UserCheck, UserPlus, ShieldCheck, TrendingUp, TrendingDown, 
  CreditCard, Clock, AlertTriangle, CheckCircle2, XCircle, BookOpen, 
  HelpCircle, DollarSign, Calendar, Sparkles, Download, Send, Plus, 
  RefreshCw, FileText, PieChart as PieChartIcon, BarChart3, Layers, 
  Lock, Gift, ArrowUpRight, Filter, ChevronRight, Eye, MailCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Payment, Tontine } from '../../types';

interface AdminDashboardProps {
  onNavigateTab: (tab: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { 
    tontines, 
    users, 
    payments, 
    validatePayment, 
    rejectPayment, 
    paymentLinks,
    ebooks,
    supportTickets,
    offers,
    sendNotificationToUser
  } = useApp();

  // State for Chart Filters & Interactivity
  const [paymentsTimeframe, setPaymentsTimeframe] = useState<'weekly' | 'monthly'>('monthly');
  const [growthTimeframe, setGrowthTimeframe] = useState<'6m' | '1y'>('6m');
  const [selectedProofPayment, setSelectedProofPayment] = useState<Payment | null>(null);
  const [relanceSentState, setRelanceSentState] = useState<{ [id: string]: boolean }>({});
  const [showExportToast, setShowExportToast] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'late' | 'validated'>('all');

  // ---------------------------------------------------------------------------
  // 12 KEY STATISTICS CALCULATIONS (Dynamic + Baseline scaling)
  // ---------------------------------------------------------------------------
  const totalMembersCount = 194 + (users.length - 4);
  const activeMembersCount = users.filter(u => u.status === 'active').length + 180;
  const ongoingTontinesCount = tontines.filter(t => t.status === 'ongoing').length;
  const openTontinesCount = tontines.filter(t => t.status === 'open' || t.status === 'soon_full').length;
  
  const validatedPaymentsList = payments.filter(p => p.status === 'validated');
  const receivedPaymentsCount = validatedPaymentsList.length + 142;
  const receivedPaymentsSum = validatedPaymentsList.reduce((acc, p) => acc + p.amount, 0) + 12850;

  const pendingPaymentsList = payments.filter(p => p.status === 'pending_validation');
  const pendingPaymentsCount = pendingPaymentsList.length;
  const pendingPaymentsSum = pendingPaymentsList.reduce((acc, p) => acc + p.amount, 0);

  const latePaymentsList = payments.filter(p => p.status === 'late');
  const latePaymentsCount = latePaymentsList.length;
  const latePaymentsSum = latePaymentsList.reduce((acc, p) => acc + p.amount, 0);

  // Total amount declared paid (Validated + Pending + Declared)
  const totalDeclaredPaidSum = payments
    .filter(p => ['validated', 'pending_validation', 'declared'].includes(p.status))
    .reduce((acc, p) => acc + p.amount, 0) + 13400;

  // Upcoming distributions calculation across ongoing tontines
  const upcomingDistributionsCount = tontines.reduce((acc, t) => {
    return acc + t.members.filter(m => m.status === 'active').length;
  }, 0) + 18;
  const upcomingDistributionsSum = tontines.reduce((acc, t) => {
    return acc + (t.contributionAmount * t.maxMembers * t.members.filter(m => m.status === 'active').length);
  }, 0) + 8500;

  const newRegistrationsCount = users.filter(u => u.crmCategory === 'new' || u.status === 'pending_verification').length + 24;
  
  const ebooksSoldCount = ebooks.reduce((acc, eb) => acc + eb.downloadsCount, 0) + users.filter(u => u.hasEbookAccess).length + 42;

  const supportTicketsCount = supportTickets.length;
  const openSupportTicketsCount = supportTickets.filter(st => st.status === 'open' || st.status === 'in_progress').length;

  // ---------------------------------------------------------------------------
  // CHART DATASETS
  // ---------------------------------------------------------------------------
  
  // 1. Weekly & Monthly Payments Data
  const monthlyPaymentsData = [
    { period: 'Jan', Reçus: 4200, EnAttente: 300, Retards: 150 },
    { period: 'Fév', Reçus: 5800, EnAttente: 450, Retards: 200 },
    { period: 'Mar', Reçus: 7100, EnAttente: 500, Retards: 180 },
    { period: 'Avr', Reçus: 8900, EnAttente: 620, Retards: 210 },
    { period: 'Mai', Reçus: 10400, EnAttente: 750, Retards: 190 },
    { period: 'Juin', Reçus: 11800, EnAttente: 890, Retards: 240 },
    { period: 'Juil', Reçus: 13200, EnAttente: 940, Retards: 160 },
    { period: 'Août (Enc)', Reçus: receivedPaymentsSum, EnAttente: pendingPaymentsSum, Retards: latePaymentsSum },
  ];

  const weeklyPaymentsData = [
    { period: 'Sem 27', Reçus: 2850, EnAttente: 120, Retards: 50 },
    { period: 'Sem 28', Reçus: 3100, EnAttente: 180, Retards: 40 },
    { period: 'Sem 29', Reçus: 3450, EnAttente: 210, Retards: 60 },
    { period: 'Sem 30', Reçus: 3900, EnAttente: 290, Retards: 35 },
    { period: 'Sem 31', Reçus: 4250, EnAttente: pendingPaymentsSum + 100, Retards: latePaymentsSum + 20 },
  ];

  // 2. Registrations Chart Data (Direct vs Referral)
  const registrationsData = [
    { month: 'Jan', Directes: 12, Parrainages: 6, Total: 18 },
    { month: 'Fév', Directes: 18, Parrainages: 10, Total: 28 },
    { month: 'Mar', Directes: 24, Parrainages: 14, Total: 38 },
    { month: 'Avr', Directes: 29, Parrainages: 19, Total: 48 },
    { month: 'Mai', Directes: 35, Parrainages: 26, Total: 61 },
    { month: 'Juin', Directes: 42, Parrainages: 31, Total: 73 },
    { month: 'Juil', Directes: 48, Parrainages: 38, Total: 86 },
    { month: 'Août', Directes: 32, Parrainages: 24, Total: 56 },
  ];

  // 3. Popular Tontines Chart Data
  const popularTontinesData = [
    { name: 'Tontine Sérénité 50 €', value: 88, color: '#8F5DFF' },
    { name: 'Tontine Ambition 100 €', value: 54, color: '#F8D64E' },
    { name: 'Tontine Express 25 €', value: 36, color: '#10B981' },
    { name: 'Pack Ebook & Tontine VIP', value: 22, color: '#3B82F6' },
  ];

  // 4. Purchased Formulas Chart Data
  const purchasedFormulasData = [
    { formula: 'Sérénité 50€', Ventes: 112, ChiffreAffaires: 5600 },
    { formula: 'Ambition 100€', Ventes: 64, ChiffreAffaires: 6400 },
    { formula: 'Express 25€', Ventes: 48, ChiffreAffaires: 1200 },
    { formula: 'Pack Ebook (75.99€)', Ventes: 42, ChiffreAffaires: 3191 },
  ];

  // 5. Late Payments & Relances Trend Data
  const latePaymentsTrendData = [
    { month: 'Mars', TauxRetard: 5.2, RelancesEffectuees: 14, Resolus: 92 },
    { month: 'Avril', TauxRetard: 4.5, RelancesEffectuees: 11, Resolus: 95 },
    { month: 'Mai', TauxRetard: 3.8, RelancesEffectuees: 9, Resolus: 96 },
    { month: 'Juin', TauxRetard: 3.1, RelancesEffectuees: 8, Resolus: 97 },
    { month: 'Juillet', TauxRetard: 2.4, RelancesEffectuees: 6, Resolus: 98 },
    { month: 'Août', TauxRetard: 1.9, RelancesEffectuees: 4, Resolus: 99 },
  ];

  // 6. Member Growth Curve Data
  const memberGrowthData = [
    { month: 'Jan', TotalMembres: 34, MembresActifs: 30 },
    { month: 'Fév', TotalMembres: 62, MembresActifs: 58 },
    { month: 'Mar', TotalMembres: 100, MembresActifs: 94 },
    { month: 'Avr', TotalMembres: 148, MembresActifs: 140 },
    { month: 'Mai', TotalMembres: 209, MembresActifs: 198 },
    { month: 'Juin', TotalMembres: 282, MembresActifs: 268 },
    { month: 'Juil', TotalMembres: 368, MembresActifs: 350 },
    { month: 'Août', TotalMembres: totalMembersCount, MembresActifs: activeMembersCount },
  ];

  // Export CSV handler
  const handleExportCSV = () => {
    const csvHeader = "Metric,Value\n";
    const csvContent = [
      `Membres Totaux,${totalMembersCount}`,
      `Membres Actifs,${activeMembersCount}`,
      `Tontines en Cours,${ongoingTontinesCount}`,
      `Tontines Ouvertes,${openTontinesCount}`,
      `Paiements Reçus (€),${receivedPaymentsSum}`,
      `Paiements en Attente (€),${pendingPaymentsSum}`,
      `Paiements en Retard (€),${latePaymentsSum}`,
      `Montant Total Déclaré Payé (€),${totalDeclaredPaidSum}`,
      `Distributions à Venir (€),${upcomingDistributionsSum}`,
      `Nouvelles Inscriptions,${newRegistrationsCount}`,
      `Ebooks Vendus,${ebooksSoldCount}`,
      `Demandes Support,${supportTicketsCount}`,
    ].join("\n");

    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tontines_admin_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
  };

  const handleSendRelance = (paymentId: string, userId: string, userName: string) => {
    sendNotificationToUser(
      userId,
      '⚠️ Relance : Versement Tontine en retard',
      `Bonjour ${userName}, votre cotisation tontine est en attente. Merci d'effectuer votre règlement via le lien de paiement.`,
      'payment'
    );
    setRelanceSentState(prev => ({ ...prev, [paymentId]: true }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast notification for CSV export */}
      {showExportToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">Rapport CSV exporté avec succès !</span>
        </div>
      )}

      {/* Proof Modal */}
      {selectedProofPayment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8F5DFF]" />
                Preuve de Paiement — {selectedProofPayment.userName}
              </h4>
              <button 
                onClick={() => setSelectedProofPayment(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl space-y-1 border border-slate-100">
                <p className="text-slate-500 font-medium">Tontine : <span className="font-bold text-slate-800">{selectedProofPayment.tontineName}</span></p>
                <p className="text-slate-500 font-medium">Montant : <span className="font-black text-[#8F5DFF]">{selectedProofPayment.amount.toFixed(2)} €</span></p>
                <p className="text-slate-500 font-medium">Méthode : <span className="font-bold text-slate-800">{selectedProofPayment.paymentMethod}</span></p>
                <p className="text-slate-500 font-medium">Référence : <span className="font-mono text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded">{selectedProofPayment.proofReference || 'N/A'}</span></p>
                <p className="text-slate-500 font-medium">Date de déclaration : <span className="font-bold text-slate-800">{selectedProofPayment.declaredDate || selectedProofPayment.dueDate}</span></p>
              </div>

              {selectedProofPayment.proofUrl ? (
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  <img src={selectedProofPayment.proofUrl} alt="Preuve" className="w-full h-48 object-cover" />
                </div>
              ) : (
                <div className="p-6 bg-purple-50/50 rounded-2xl border border-dashed border-purple-200 text-center">
                  <ShieldCheck className="w-8 h-8 text-[#8F5DFF] mx-auto mb-2 opacity-80" />
                  <p className="text-xs text-slate-700 font-bold">Récépissé ou référence virement vérifié</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">La référence client concorde avec le compte bénéficiaire Revolut/Wero.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  validatePayment(selectedProofPayment.id, 'Fatou Diallo (Admin)');
                  setSelectedProofPayment(null);
                }}
                className="px-4 py-2 bg-[#8F5DFF] text-white font-bold rounded-xl text-xs shadow-xs hover:bg-purple-700 transition-all"
              >
                Valider ce Paiement
              </button>
              <button
                onClick={() => setSelectedProofPayment(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------------
          HERO BANNER & HEADER
      --------------------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 rounded-[36px] bg-gradient-to-r from-[#8F5DFF] via-[#7B42FB] to-[#6024E0] text-white shadow-2xl shadow-[#8F5DFF]/25 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-28 -mt-28 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#F8D64E]/15 rounded-full blur-xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-[#F8D64E] text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs">
              PANNEAU D'ADMINISTRATION CENTRALE
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-full border border-white/20">
              📅 30 Juillet 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
            Tableau de Bord <span className="font-extrabold text-[#F8D64E]">Supervisant & Analytique</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-2xl font-medium leading-relaxed">
            Vue consolidée à 360° : statistiques clés, performances financières, flux de trésorerie, suivi des tontines et santé globale de la communauté <strong className="text-white">TONTINES CODE VIOLET</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="px-4 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-2xl backdrop-blur-md border border-white/25 flex items-center gap-2 transition-all active:scale-98"
          >
            <Download className="w-4 h-4 text-[#F8D64E]" />
            <span>Exporter Rapport (CSV)</span>
          </button>
          <button
            onClick={() => onNavigateTab('payment_links')}
            className="px-4 py-3 bg-[#F8D64E] hover:bg-amber-400 text-slate-900 font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Lien</span>
          </button>
          <button
            onClick={() => onNavigateTab('tontine_management')}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs rounded-2xl shadow-md flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#8F5DFF]" />
            <span>Créer Tontine</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          12 KEY STATISTICS GRID (4 Columns x 3 Rows)
      --------------------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#8F5DFF]" />
            Indicateurs Clés de Performance (12 Statistiques Fondamentales)
          </h2>
          <span className="text-xs text-slate-400 font-medium">Mise à jour en temps réel</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* KPI 1: Membres Totaux */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Membres Totaux</span>
              <span className="p-2 bg-[#F3EEFF] text-[#8F5DFF] rounded-xl">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-slate-900">{totalMembersCount}</p>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +14.2%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Communauté active TONTINES CODE VIOLET</p>
          </div>

          {/* KPI 2: Membres Actifs */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-emerald-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Membres Actifs</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <UserCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-slate-900">{activeMembersCount}</p>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                93.8% du total
              </span>
            </div>
            <p className="text-[10px] text-emerald-600 font-extrabold mt-1">100% profils et identités vérifiés</p>
          </div>

          {/* KPI 3: Tontines en Cours */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Tontines en Cours</span>
              <span className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                <Layers className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-[#8F5DFF]">{ongoingTontinesCount}</p>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                Cycles verrouillés
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Ordres de passage tirés au sort</p>
          </div>

          {/* KPI 4: Tontines Ouvertes */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Tontines Ouvertes</span>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Lock className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-slate-900">{openTontinesCount}</p>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Inscriptions ouvertes
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Formules 25€, 50€ et 100€/mois</p>
          </div>

          {/* KPI 5: Paiements Reçus */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-emerald-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Paiements Reçus</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-emerald-600">{receivedPaymentsSum.toFixed(0)} €</p>
              <span className="text-[10px] font-bold text-slate-500">
                {receivedPaymentsCount} versements
              </span>
            </div>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">Validés sous séquestre sécurisé</p>
          </div>

          {/* KPI 6: Paiements en Attente */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-amber-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Paiements en Attente</span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-amber-600">{pendingPaymentsSum.toFixed(0)} €</p>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                {pendingPaymentsCount} à vérifier
              </span>
            </div>
            <p className="text-[10px] text-amber-700 font-bold mt-1">Action requise sous 24h</p>
          </div>

          {/* KPI 7: Paiements en Retard */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-rose-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Paiements en Retard</span>
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <AlertTriangle className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-rose-600">{latePaymentsSum.toFixed(0)} €</p>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                {latePaymentsCount} relances
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Garantie de sécurité activée</p>
          </div>

          {/* KPI 8: Montant Total Déclaré Payé */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Total Déclaré Payé</span>
              <span className="p-2 bg-[#F3EEFF] text-[#8F5DFF] rounded-xl">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-slate-900">{totalDeclaredPaidSum.toFixed(0)} €</p>
              <span className="text-[10px] font-bold text-slate-500">Cumul global</span>
            </div>
            <p className="text-[10px] text-purple-700 font-extrabold mt-1">Versements déclarés par les membres</p>
          </div>

          {/* KPI 9: Distributions à Venir */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-amber-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Distributions à Venir</span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Gift className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-amber-900">{upcomingDistributionsSum.toFixed(0)} €</p>
              <span className="text-[10px] font-bold text-slate-500">{upcomingDistributionsCount} tours</span>
            </div>
            <p className="text-[10px] text-amber-800 font-bold mt-1">Programmés pour Août & Septembre</p>
          </div>

          {/* KPI 10: Nouvelles Inscriptions */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Nouvelles Inscriptions</span>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <UserPlus className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-slate-900">+{newRegistrationsCount}</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                +18% ce mois
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Afflux d'inscriptions organiques & parrainages</p>
          </div>

          {/* KPI 11: Ebooks Vendus */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Ebooks Vendus</span>
              <span className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                <BookOpen className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-[#8F5DFF]">{ebooksSoldCount}</p>
              <span className="text-[10px] font-bold text-[#8F5DFF] bg-purple-50 px-2 py-0.5 rounded-full">
                Guide Épargne Gold
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Packs Ebook & accès membre inclus</p>
          </div>

          {/* KPI 12: Demandes de Support */}
          <div className="p-5 rounded-[28px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-slate-200 transition-all">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              <span>Demandes Support</span>
              <span className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                <HelpCircle className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-black text-slate-900">{supportTicketsCount}</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {openSupportTicketsCount} ouverts
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Temps de réponse moyen : 18 mins</p>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          GRAPHIC ANALYTICS DASHBOARD (6 Interactive Visual Charts)
      --------------------------------------------------------------------------- */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-[#8F5DFF]" />
              Analyses & Graphiques Financiers & Communautaires
            </h2>
            <p className="text-xs text-slate-500">Visualisation détaillée des tendances de cotisations, inscriptions, popularité et retards.</p>
          </div>
        </div>

        {/* Row 1: Payments Chart + Member Growth Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Weekly / Monthly Payments */}
          <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Paiements & Cotisations (€)</h3>
                <p className="text-[11px] text-slate-400">Comparatif des montants validés, en attente et en retard</p>
              </div>

              {/* Timeframe selector */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto">
                <button
                  onClick={() => setPaymentsTimeframe('weekly')}
                  className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    paymentsTimeframe === 'weekly' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Hebdomadaire
                </button>
                <button
                  onClick={() => setPaymentsTimeframe('monthly')}
                  className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    paymentsTimeframe === 'monthly' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mensuel
                </button>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={paymentsTimeframe === 'monthly' ? monthlyPaymentsData : weeklyPaymentsData}>
                  <defs>
                    <linearGradient id="colorRecus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8F5DFF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8F5DFF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAttente" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRetards" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}€`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(value: any) => [`${value} €`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="Reçus" stroke="#8F5DFF" fillOpacity={1} fill="url(#colorRecus)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="EnAttente" stroke="#F59E0B" fillOpacity={1} fill="url(#colorAttente)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Retards" stroke="#EF4444" fillOpacity={1} fill="url(#colorRetards)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Member Growth Curve */}
          <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Croissance Globale des Membres</h3>
                <p className="text-[11px] text-slate-400">Évolution du nombre total et actif des inscrites</p>
              </div>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                +194 Membres en 2026
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={memberGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Line type="monotone" dataKey="TotalMembres" stroke="#8F5DFF" strokeWidth={3} dot={{ r: 4, fill: '#8F5DFF' }} name="Total Membres" />
                  <Line type="monotone" dataKey="MembresActifs" stroke="#10B981" strokeWidth={2.5} strokeDasharray="4 4" name="Membres Actifs" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Row 2: Registrations Chart + Popular Tontines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Chart 3: Registrations Trend */}
          <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Flux des Inscriptions par Canal</h3>
                <p className="text-[11px] text-slate-400">Inscriptions directes vs Programme de Parrainage</p>
              </div>
              <span className="text-[11px] font-bold text-[#8F5DFF]">
                Parrainage = 43%
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={registrationsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="Directes" fill="#8F5DFF" radius={[6, 6, 0, 0]} name="Accès Direct" />
                  <Bar dataKey="Parrainages" fill="#F8D64E" radius={[6, 6, 0, 0]} name="Recommandations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Popular Tontines Breakdown */}
          <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Répartition des Tontines Populaires</h3>
                <p className="text-[11px] text-slate-400">Pourcentage des participantes par formule</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-64">
              <div className="h-full w-full sm:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={popularTontinesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {popularTontinesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                      formatter={(val: any) => [`${val} participantes`, '']}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend */}
              <div className="w-full sm:w-1/2 space-y-2.5">
                {popularTontinesData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-bold text-slate-800 text-[11px] truncate">{item.name}</span>
                    </div>
                    <span className="font-black text-slate-900 text-xs">{item.value} m.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Row 3: Purchased Formulas + Late Payments Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Chart 5: Purchased Formulas & Packs */}
          <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Formules & Packs Achetés</h3>
                <p className="text-[11px] text-slate-400">Volume des ventes d'abonnements et packs ebooks</p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                266 Formules souscrites
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchasedFormulasData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis dataKey="formula" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} width={110} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any, name: any) => [name === 'ChiffreAffaires' ? `${val} €` : `${val} souscriptions`, name]}
                  />
                  <Bar dataKey="Ventes" fill="#8F5DFF" radius={[0, 6, 6, 0]} name="Souscriptions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 6: Late Payments Trend & Relances Tracking */}
          <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Évolution des Retards & Taux de Résolution</h3>
                <p className="text-[11px] text-slate-400">Suivi des impayés temporaires et efficacité des relances</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                99% Taux de Recouvrement
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={latePaymentsTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [`${val}%`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="TauxRetard" stroke="#EF4444" fill="#FEE2E2" strokeWidth={2.5} name="Taux de Retard (%)" />
                  <Area type="monotone" dataKey="Resolus" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} name="Résolus après Relance (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          ACTION PANELS: PENDING PAYMENTS QUEUE & UPCOMING DISTRIBUTIONS SCHEDULE
      --------------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Pending Validation Table (2 Columns) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                File d'Attente des Paiements en Attente ({pendingPaymentsList.length})
              </h3>
              <p className="text-xs text-slate-400">Validez les reçus Revolut/Wero ou refusez avec motif explicatif.</p>
            </div>

            <button
              onClick={() => onNavigateTab('payment_management')}
              className="text-xs font-bold text-[#8F5DFF] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              Voir tout le journal &rarr;
            </button>
          </div>

          {pendingPaymentsList.length === 0 ? (
            <div className="p-8 text-center bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs text-emerald-800 font-bold space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <p>Tous les versements reçus ont été vérifiés et validés !</p>
              <p className="text-[10px] text-emerald-600 font-normal">Aucun paiement en attente dans la file administrateur.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Membre</th>
                    <th className="py-3 px-3">Tontine</th>
                    <th className="py-3 px-3">Montant</th>
                    <th className="py-3 px-3">Méthode & Proof</th>
                    <th className="py-3 px-3 text-right">Actions Rapid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingPaymentsList.map((p) => (
                    <tr key={p.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <img 
                            src={p.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                            alt="" 
                            className="w-7 h-7 rounded-full object-cover border border-purple-200"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{p.userName}</p>
                            <p className="text-[10px] text-slate-400">Tour #{p.installmentNumber}/{p.totalInstallments}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-700">{p.tontineName}</td>
                      <td className="py-3.5 px-3 font-black text-[#8F5DFF]">{p.amount.toFixed(2)} €</td>
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => setSelectedProofPayment(p)}
                          className="flex items-center gap-1.5 text-left text-[11px] font-bold text-slate-800 hover:text-[#8F5DFF] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#8F5DFF]" />
                          <span>{p.paymentMethod}</span>
                          <span className="text-[9px] font-mono bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">Réf</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              validatePayment(p.id, 'Fatou Diallo (Admin)');
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-[11px] shadow-xs flex items-center gap-1 transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valider
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt("Motif de refus :", "Récépissé non lisible ou référence erronée");
                              if (reason) rejectPayment(p.id, reason);
                            }}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-[11px] transition-all"
                          >
                            Refuser
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Late Payments Relance Console */}
          {latePaymentsList.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-rose-900 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Membres en Retard de Paiement ({latePaymentsList.length})
                </h4>
                <span className="text-[10px] text-rose-600 font-bold">Relance automatique active</span>
              </div>

              <div className="space-y-2">
                {latePaymentsList.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs p-2.5 bg-white rounded-xl border border-rose-200">
                    <div>
                      <p className="font-bold text-slate-900">{p.userName} — <span className="text-rose-600">{p.amount.toFixed(2)} €</span></p>
                      <p className="text-[10px] text-slate-500">{p.tontineName} • Échéance : {p.dueDate}</p>
                    </div>

                    <button
                      onClick={() => handleSendRelance(p.id, p.userId, p.userName)}
                      disabled={relanceSentState[p.id]}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 transition-all ${
                        relanceSentState[p.id] 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                      }`}
                    >
                      {relanceSentState[p.id] ? (
                        <>
                          <MailCheck className="w-3.5 h-3.5" /> Relance envoyée
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Relancer (SMS/Notif)
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Distributions Calendar & Active Tontines (1 Column) */}
        <div className="p-6 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#F8D64E]" />
                Distributions à Venir
              </h3>
              <span className="text-[10px] font-black text-[#8F5DFF] bg-purple-50 px-2.5 py-1 rounded-full">
                Août 2026
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-amber-900">
                  <span>Tour n°3 — Tontine Sérénité</span>
                  <span className="text-sm">500.00 €</span>
                </div>
                <p className="text-[11px] text-amber-800 font-medium">Bénéficiaire : <strong className="text-slate-900">Fatou Diallo</strong> (Ordre #3)</p>
                <div className="flex items-center justify-between text-[10px] text-amber-700 pt-1">
                  <span>Date prévue : 15 Août 2026</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Prêt pour virement</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-slate-900">
                  <span>Tour n°4 — Tontine Sérénité</span>
                  <span className="text-sm">500.00 €</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">Bénéficiaire : <strong className="text-slate-900">Néné Sow</strong> (Ordre #4)</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Date prévue : 15 Septembre 2026</span>
                  <span>Cotisations à venir</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-slate-900">
                  <span>Tour n°1 — Tontine Ambition</span>
                  <span className="text-sm">1 200.00 €</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">Bénéficiaire : <strong className="text-slate-900">Tirage au sort</strong></p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Date prévue : 01 Octobre 2026</span>
                  <span>Ouverte aux inscriptions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab('tontine_management')}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Layers className="w-4 h-4 text-[#F8D64E]" />
              <span>Gérer Ordres de Passage Tontines &rarr;</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
