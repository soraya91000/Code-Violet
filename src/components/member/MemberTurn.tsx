import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Crown, Sparkles, Clock, Calendar, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

export const MemberTurn: React.FC = () => {
  const { currentUser, tontines } = useApp();
  const activeTontine = tontines.find(t => t.id === 'tnt_serenite_50') || tontines[0];

  // Target date: Nov 15, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 18, hours: 14, mins: 32, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, secs: 59, mins: prev.mins > 0 ? prev.mins - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8F5DFF', '#F8D64E', '#111827', '#F3EEFF'],
    });
  };

  const servedMembers = activeTontine.members.filter(m => m.status === 'served');
  const myTurnMember = activeTontine.members.find(m => m.userId === currentUser.id) || activeTontine.members[5];
  const upcomingMembers = activeTontine.members.filter(m => m.status !== 'served' && m.userId !== currentUser.id);

  return (
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEFF] text-[#8F5DFF] font-black text-xs border border-purple-200 shadow-xs">
          <Crown className="w-4 h-4 text-[#F8D64E]" /> ESPACE DISTRIBUTION EXCLUSIVE
        </div>
        <h1 className="text-3xl font-black text-gray-900">Suivi de Votre Tour de Passage</h1>
        <p className="text-xs text-gray-500">
          Visualisez votre position dans le coffre d'épargne et suivez le compte à rebours avant la mise à disposition de votre capital.
        </p>
      </div>

      {/* Main Hero Circle Display */}
      <div className="relative max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-white via-[#FAF8FF] to-white border-2 border-[#F8D64E] shadow-xl text-center space-y-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8D64E]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Big Central Circle */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48 mx-auto rounded-full bg-gradient-to-tr from-[#8F5DFF] via-[#7b46ff] to-[#5e2ad6] text-white flex flex-col items-center justify-center p-4 shadow-2xl ring-8 ring-[#F3EEFF]"
        >
          <Crown className="w-8 h-8 text-[#F8D64E] animate-bounce mb-1" />
          <p className="text-xs font-bold uppercase tracking-widest text-purple-200">Votre Tour</p>
          <p className="text-4xl font-black text-[#F8D64E]">N° 6</p>
          <p className="text-[11px] font-semibold text-purple-100 mt-1">Garantie Tontines Coffres</p>
        </motion.div>

        {/* Countdown Box */}
        <div className="space-y-2">
          <p className="text-sm font-extrabold text-[#8F5DFF] flex items-center justify-center gap-1.5">
            <Clock className="w-4 h-4 text-[#F8D64E]" /> Plus que {timeLeft.days} jours !
          </p>

          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto pt-2">
            <div className="p-2 bg-white rounded-2xl border border-purple-100 shadow-xs">
              <span className="block text-xl font-black text-gray-900">{timeLeft.days}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Jours</span>
            </div>
            <div className="p-2 bg-white rounded-2xl border border-purple-100 shadow-xs">
              <span className="block text-xl font-black text-gray-900">{timeLeft.hours}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Heures</span>
            </div>
            <div className="p-2 bg-white rounded-2xl border border-purple-100 shadow-xs">
              <span className="block text-xl font-black text-gray-900">{timeLeft.mins}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Min</span>
            </div>
            <div className="p-2 bg-white rounded-2xl border border-purple-100 shadow-xs">
              <span className="block text-xl font-black text-gray-900 font-mono text-[#8F5DFF]">{timeLeft.secs}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Sec</span>
            </div>
          </div>
        </div>

        {/* Amount & Date Summary */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-left">
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
            <p className="text-[10px] text-gray-400 font-bold uppercase">Montant estimé à recevoir</p>
            <p className="text-2xl font-black text-gray-900">500,00 €</p>
            <p className="text-[10px] text-emerald-600 font-extrabold">Frais : 0,00 €</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
            <p className="text-[10px] text-gray-400 font-bold uppercase">Date de versement prévue</p>
            <p className="text-xl font-black text-[#8F5DFF]">15 Novembre 2026</p>
            <p className="text-[10px] text-gray-500 font-medium">Virement Instantané</p>
          </div>
        </div>

        <button
          onClick={triggerConfetti}
          className="w-full py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-[#F8D64E]" />
          <span>Simuler la fête de réception de votre tour 🎉</span>
        </button>
      </div>

      {/* Horizontal Frise Timeline */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-gray-900 text-base">Frise Chronologique des Distributions</h3>
        <p className="text-xs text-gray-500">Déjà servis 🟢 &rarr; Votre Tour 👑 &rarr; Tours suivants ⏳</p>

        <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2">
          {activeTontine.members.map((m) => {
            const isMe = m.userId === currentUser.id;
            return (
              <div
                key={m.userId}
                className={`flex-shrink-0 w-44 p-4 rounded-2xl border text-center space-y-2 relative ${
                  isMe
                    ? 'bg-gradient-to-b from-[#F3EEFF] to-white border-2 border-[#F8D64E] shadow-md scale-105'
                    : m.status === 'served'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {isMe && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F8D64E] text-black text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                    VOTRE TOUR
                  </span>
                )}
                <span className="inline-block font-black text-xs text-gray-700">Tour #{m.orderPosition}</span>
                <img
                  src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={m.firstName}
                  className="w-10 h-10 mx-auto rounded-full object-cover border-2 border-white shadow-xs"
                />
                <p className="font-extrabold text-gray-900 text-xs">{m.firstName}</p>
                <p className="text-[10px] text-gray-500 font-medium">{m.estimatedPayoutDate}</p>

                <span className={`inline-block px-2 py-0.5 text-[9px] font-black rounded-full ${
                  m.status === 'served'
                    ? 'bg-emerald-100 text-emerald-800'
                    : isMe
                    ? 'bg-[#8F5DFF] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {m.status === 'served' ? 'Servie 🟢' : isMe ? 'Le 15 Nov 👑' : 'À venir ⏳'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
