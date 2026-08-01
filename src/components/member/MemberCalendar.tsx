import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Clock, Gift, CreditCard, ChevronLeft, ChevronRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const MemberCalendar: React.FC = () => {
  const { tontines, payments, currentUser } = useApp();
  const [selectedMonth, setSelectedMonth] = useState<string>('Août 2026');
  const [filterType, setFilterType] = useState<'all' | 'payment' | 'turn'>('all');

  // Simulated calendar events generated from user's active tontines & payments
  const events = [
    {
      id: 'evt-1',
      date: '2026-08-05',
      dateFormatted: '5 Août 2026',
      title: 'Cotisation Tontine Sérénité (50 €)',
      type: 'payment',
      amount: 50,
      tontineName: 'Tontine Sérénité 50 €',
      status: 'upcoming',
      description: 'Versement mensuel à effectuer via Revolut ou Wero avant minuit.',
    },
    {
      id: 'evt-2',
      date: '2026-08-15',
      dateFormatted: '15 Août 2026',
      title: 'Distribution de la Cagnotte (500 €)',
      type: 'turn',
      amount: 500,
      tontineName: 'Tontine Ambition 100 €',
      status: 'scheduled',
      description: 'C\'est le tour de distribution pour Mariam Traore ! Viré sous 24h.',
    },
    {
      id: 'evt-3',
      date: '2026-08-28',
      dateFormatted: '28 Août 2026',
      title: 'Mon Tour de Tirage #6 — Tontine Sérénité',
      type: 'turn',
      amount: 400,
      tontineName: 'Tontine Sérénité 50 €',
      status: 'upcoming',
      description: 'Votre cagnotte de 400 € sera débloquée et versée directement sur votre compte !',
      isCurrentUser: true,
    },
    {
      id: 'evt-4',
      date: '2026-09-05',
      dateFormatted: '5 Septembre 2026',
      title: 'Cotisation Tontine Sérénité (50 €)',
      type: 'payment',
      amount: 50,
      tontineName: 'Tontine Sérénité 50 €',
      status: 'upcoming',
      description: 'Versement mensuel pour la 7ème échéance.',
    },
    {
      id: 'evt-5',
      date: '2026-09-15',
      dateFormatted: '15 Septembre 2026',
      title: 'Clôture de la Tontine Express 25 €',
      type: 'info',
      amount: 250,
      tontineName: 'Tontine Express 25 €',
      status: 'info',
      description: 'Fin du cycle de 10 mois. Remise des diplômes d\'épargne et badges.',
    },
  ];

  const filteredEvents = events.filter(evt => {
    if (filterType === 'all') return true;
    return evt.type === filterType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-[#8F5DFF] via-[#7B42FB] to-[#6024E0] text-white shadow-xl shadow-[#8F5DFF]/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="px-3 py-1 bg-[#F8D64E] text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs inline-block">
            CALENDRIER DES COTISATIONS & GAINS
          </span>
          <h1 className="text-2xl sm:text-3xl font-light">
            Mon Agenda <span className="font-extrabold text-[#F8D64E]">Épargne & Tours</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
            Suivez en un coup d'œil les échéances de versements et les dates d'attribution de vos cagnottes collectives.
          </p>
        </div>
      </div>

      {/* Filter and Month Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedMonth('Juillet 2026')}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-black text-slate-900 text-sm px-2 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#8F5DFF]" />
            {selectedMonth}
          </span>
          <button 
            onClick={() => setSelectedMonth('Septembre 2026')}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              filterType === 'all' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tous les évènements
          </button>
          <button
            onClick={() => setFilterType('payment')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              filterType === 'payment' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cotisations
          </button>
          <button
            onClick={() => setFilterType('turn')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              filterType === 'turn' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tours & Gain
          </button>
        </div>
      </div>

      {/* Events List Timeline */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => (
          <div 
            key={evt.id}
            className={`p-6 rounded-[28px] bg-white border transition-all shadow-sm ${
              evt.isCurrentUser 
                ? 'border-[#8F5DFF] bg-gradient-to-r from-purple-50/50 via-white to-amber-50/30 ring-2 ring-[#8F5DFF]/20' 
                : 'border-slate-100 hover:border-purple-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl shrink-0 ${
                  evt.type === 'turn' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-[#8F5DFF]'
                }`}>
                  {evt.type === 'turn' ? <Gift className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      {evt.dateFormatted}
                    </span>
                    {evt.isCurrentUser && (
                      <span className="px-2.5 py-0.5 bg-[#F8D64E] text-slate-900 text-[10px] font-black rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> VOUS (TOUR N°6)
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">{evt.title}</h3>
                  <p className="text-xs text-slate-500">{evt.description}</p>
                  <p className="text-[11px] font-bold text-slate-700">Tontine : {evt.tontineName}</p>
                </div>
              </div>

              <div className="sm:text-right shrink-0 space-y-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <p className={`text-xl font-black ${evt.type === 'turn' ? 'text-amber-600' : 'text-[#8F5DFF]'}`}>
                  {evt.type === 'turn' ? '+' : '-'}{evt.amount.toFixed(2)} €
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold ${
                  evt.type === 'turn' ? 'bg-amber-50 text-amber-700' : 'bg-purple-50 text-[#8F5DFF]'
                }`}>
                  {evt.type === 'turn' ? 'Distribution Cagnotte' : 'Versement Requis'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
