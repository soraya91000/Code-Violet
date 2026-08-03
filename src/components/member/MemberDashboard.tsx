import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, CreditCard, Clock, Calendar as CalendarIcon, 
  TrendingUp, Download, LifeBuoy, Crown, CheckCircle2, 
  ArrowRight, Sparkles, ChevronRight, AlertCircle 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { motion } from 'motion/react';

interface MemberDashboardProps {
  onPayNow: (paymentLinkId: string, amount: number, tontineName: string) => void;
  onViewTurn: () => void;
  onViewTontineDetail: (tontineId: string) => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({ onPayNow, onViewTurn, onViewTontineDetail }) => {
  const { currentUser, tontines, payments, setActiveMemberTab, paymentLinks } = useApp();

  // Find active tontine
  const activeTontine = tontines.find(t => t.id === 'tnt_serenite_50') || tontines[0];
  const nextPayment = payments.find(p => p.status === 'upcoming') || payments[0];

  const chartData = [
    { month: 'Mai', amount: 50 },
    { month: 'Juin', amount: 100 },
    { month: 'Juil', amount: 150 },
    { month: 'Août', amount: 200 },
    { month: 'Sept', amount: 250 },
    { month: 'Oct', amount: 300 },
    { month: 'Nov (Tour 6)', amount: 350 },
  ];

  return (
    <div className="space-y-6">
      {/* Bento Grid Row 1: Welcome & Stats (8 cols) + Featured Mon Tour Hero Card (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Welcome & Stats Row - 8 cols */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3EEFF] rounded-full -mr-20 -mt-20 opacity-40 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.firstName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#F8D64E] shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h1 className="text-3xl font-light text-slate-900 leading-tight">
                    Bonjour, <span className="font-bold">{currentUser.firstName} 👋</span>
                  </h1>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Heureux de vous revoir. Votre tontine avance à grands pas !
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FEF08A] to-[#EAB308] text-slate-950 font-black text-xs border border-[#EAB308] shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" /> Membre Code Violet
                </span>
              </div>
            </div>

            {/* 4 Bento Stat Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-[#F3EEFF] p-4 rounded-2xl border border-[#8F5DFF]/10">
                <p className="text-[10px] uppercase font-bold text-[#8F5DFF] tracking-wider mb-1">Ma Formule</p>
                <p className="text-lg font-bold text-slate-900 truncate">{activeTontine.name}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Paiement Total</p>
                <p className="text-lg font-bold text-slate-900">{currentUser.totalPaid.toFixed(2)} €</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Prochain Tour</p>
                <p className="text-lg font-bold text-slate-900">18 Jours</p>
              </div>
              <div className="bg-[#F8D64E]/15 p-4 rounded-2xl border border-[#F8D64E]/40">
                <p className="text-[10px] uppercase font-bold text-slate-800 tracking-wider mb-1">Position</p>
                <p className="text-lg font-bold text-slate-900">#06 <span className="text-xs font-normal text-slate-600">/ 8</span></p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Tontine Sérénité Active
            </span>
            <button
              onClick={() => onViewTontineDetail(activeTontine.id)}
              className="text-[#8F5DFF] font-bold hover:underline flex items-center gap-1"
            >
              Détails du groupe &rarr;
            </button>
          </div>
        </div>

        {/* Hero "Mon Tour" Bento Card - 4 cols */}
        <div className="lg:col-span-4 bg-[#8F5DFF] rounded-[32px] p-7 text-white relative overflow-hidden shadow-xl shadow-[#8F5DFF]/25 flex flex-col justify-between">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          
          <div className="flex justify-between items-center relative z-10 mb-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F8D64E]">MON TOUR</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#F8D64E]" />
            </div>
          </div>

          {/* Circular Countdown Gauge */}
          <div className="flex flex-col items-center justify-center relative z-10 py-2">
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40">
                <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.15)" strokeWidth="8" fill="transparent" />
                <circle cx="80" cy="80" r="72" stroke="#F8D64E" strokeWidth="8" fill="transparent" strokeDasharray="452" strokeDashoffset="135" strokeLinecap="round" className="rotate-[-90deg] origin-center transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-widest opacity-80 font-bold">Numéro</span>
                <span className="text-5xl font-black text-white">6</span>
                <span className="text-[10px] mt-1 bg-white/20 font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  En approche
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xl font-light">Plus que <span className="font-bold text-[#F8D64E]">18 jours</span></p>
              <p className="text-[10px] opacity-70 mt-0.5 italic uppercase tracking-wider">Date estimée : 15 Nov 2026 • 500 €</p>
            </div>
          </div>

          <button
            onClick={onViewTurn}
            className="w-full mt-6 py-3.5 bg-white hover:bg-slate-50 text-[#8F5DFF] rounded-2xl font-black text-xs shadow-xl active:scale-98 transition-all relative z-10 flex items-center justify-center gap-2"
          >
            <span>Détails du calendrier</span>
            <ArrowRight className="w-4 h-4 text-[#8F5DFF]" />
          </button>
        </div>
      </div>

      {/* Bento Grid Row 2: Progress Tracking & Next Payment + Badge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Progression & Chart - 8 cols */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Ma Progression & Épargne</h3>
              <p className="text-xs text-slate-400">Cumul des versements à la cagnotte collective</p>
            </div>
            <span className="text-xs font-black text-[#8F5DFF] bg-[#F3EEFF] px-3.5 py-1.5 rounded-full border border-[#8F5DFF]/20">
              7 sur 10 validés (70%)
            </span>
          </div>

          <div className="space-y-2">
            <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1 p-0.5">
              <div className="h-full bg-gradient-to-r from-[#F8D64E] to-amber-500 rounded-full transition-all duration-500" style={{ width: '70%' }} />
              <div className="h-full bg-slate-200 rounded-full flex-1" />
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider">
              <span>Début Mai 2026</span>
              <span>Fin Fév 2027</span>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8F5DFF" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#8F5DFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F3EEFF', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                  formatter={(value: any) => [`${value} €`, 'Solde cumulé']}
                />
                <Area type="monotone" dataKey="amount" stroke="#8F5DFF" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Stack: Next Payment + Achievement Badge - 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Next Payment Bento Box */}
          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-xl shadow-slate-200/30 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">PROCHAIN PAIEMENT</span>
                <span className="p-2 rounded-xl bg-[#F3EEFF] text-[#8F5DFF]">
                  <CreditCard className="w-4 h-4" />
                </span>
              </div>
              <p className="text-3xl font-black text-slate-900">50,00 €</p>
              <p className="text-xs text-[#8F5DFF] font-extrabold mt-1">Dû le 05 Août 2026</p>
            </div>

            <div className="my-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F3EEFF] flex items-center justify-center shrink-0">
                  <CreditCard className="w-3.5 h-3.5 text-[#8F5DFF]" />
                </div>
                <p className="text-[11px] font-medium text-slate-500">Lien direct Revolut / Wero sécurisé</p>
              </div>
            </div>

            <button
              onClick={() => onPayNow('pl_revolut_50', 50.00, activeTontine.name)}
              className="w-full py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white rounded-2xl font-black text-xs shadow-lg shadow-[#8F5DFF]/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-[#F8D64E]" />
              <span>Payer maintenant</span>
            </button>
          </div>

          {/* Gold Badge Bento Box */}
          <div className="bg-[#F8D64E] rounded-[32px] p-6 shadow-xl shadow-[#F8D64E]/25 flex flex-col justify-between text-slate-900 border border-amber-300">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-white/40 backdrop-blur-xs rounded-2xl flex items-center justify-center border border-white/50">
                <Crown className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900 text-[#F8D64E] px-2.5 py-1 rounded-full">
                Nouveau Badge
              </span>
            </div>
            <div>
              <h4 className="text-lg font-black leading-tight text-slate-900">Ambassadrice Fidèle</h4>
              <p className="text-xs text-slate-800 font-medium mt-1">
                7 paiements consécutifs validés dans les temps !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 3: Order Timeline + Support/Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Order Timeline Bento - 8 cols */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Aperçu du Calendrier de Passage</h3>
              <p className="text-xs text-slate-400">Positionnement des 8 membres de la tontine</p>
            </div>
            <button
              onClick={onViewTurn}
              className="text-xs font-bold text-[#8F5DFF] hover:underline flex items-center gap-1"
            >
              Voir tout l'ordre &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {activeTontine.members.slice(0, 6).map((m) => {
              const isMe = m.userId === currentUser.id;
              return (
                <div
                  key={m.userId}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isMe
                      ? 'bg-[#F3EEFF] border-[#8F5DFF] shadow-xs'
                      : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                      m.status === 'served' ? 'bg-emerald-100 text-emerald-700' : isMe ? 'bg-[#F8D64E] text-slate-900' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {m.orderPosition}
                    </span>
                    <span className={`px-2 py-0.5 text-[9px] font-black rounded-full ${
                      m.status === 'served'
                        ? 'bg-emerald-100 text-emerald-800'
                        : isMe
                        ? 'bg-[#8F5DFF] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {m.status === 'served' ? 'Servie 🟢' : isMe ? 'Mon Tour 👑' : 'À venir'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <img
                      src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={m.firstName}
                      className="w-8 h-8 rounded-full object-cover border border-white shadow-xs"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {m.firstName} {m.lastName}
                      </p>
                      <p className="text-[10px] text-slate-400">{m.estimatedPayoutDate}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Footer Action Bento - 4 cols */}
        <div className="lg:col-span-4 bg-[#FCFCFD] rounded-[32px] p-6 border border-slate-200/70 shadow-md flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#F3EEFF] rounded-2xl text-[#8F5DFF]">
              <Download className="w-5 h-5 text-[#8F5DFF]" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Gestion documentaire</h4>
              <p className="text-xs text-slate-400">Vos reçus et justificatifs officiels</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setActiveMemberTab('documents')}
              className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-2xl shadow-xs transition-colors"
            >
              Télécharger mes reçus
            </button>
            <button
              onClick={() => setActiveMemberTab('support')}
              className="w-full py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white text-xs font-extrabold rounded-2xl shadow-xs transition-colors"
            >
              Contacter le support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
