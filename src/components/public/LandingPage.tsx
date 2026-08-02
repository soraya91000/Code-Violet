import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, Crown, Sparkles, 
  ChevronDown, Star, Lock, HeartHandshake, Zap, Award, 
  CreditCard, Users, BookOpen, ChevronRight, ExternalLink, ShoppingBag 
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onJoinClick: () => void;
  onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onJoinClick, onLoginClick }) => {
  const { paymentLinks, switchRole, testimonials, openSiteGate } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPaymentModal, setSelectedPaymentModal] = useState<{ formulaName: string; amount: number; category: string } | null>(null);

  const getLinksForAmount = (amount: number) => {
    return {
      revolut: paymentLinks.find(p => p.amount === amount && p.platform === 'Revolut')?.url || 'https://revolut.me/shsnhouse',
      wero: paymentLinks.find(p => p.amount === amount && p.platform === 'Wero')?.url || 'https://share.weropay.eu/p/1/c/HXXidRPfLV',
      paypal: paymentLinks.find(p => p.amount === amount && p.platform === 'PayPal')?.url || `https://paypal.me/codeviolet/${amount}EUR`,
      stripe: paymentLinks.find(p => p.amount === amount && p.platform === 'Stripe')?.url || `https://buy.stripe.com/codeviolet${amount}eur`
    };
  };

  const faqs = [
    {
      q: "Qu'est-ce que Code Violet et comment fonctionne le système de tontine ?",
      a: "Code Violet est un cercle d'épargne rotative haut de gamme où chaque tontine regroupe strictement 8 participantes. Chaque membre verse une cotisation fixe (25 €, 50 € ou 100 €) et perçoit la totalité du capital (200 €, 400 € ou 800 €) à son tour de passage."
    },
    {
      q: "Comment sont effectués les versements ?",
      a: "Chaque tontine dispose de 4 canaux de paiement rapides et sécurisés : Revolut, Wero, PayPal et Stripe. Vous choisissez votre méthode préférée à chaque échéance et l'administrateur Soraya Ahamada valide votre virement."
    },
    {
      q: "Pourquoi les tontines sont-elles toutes limitées à 8 participants ?",
      a: "Le format 8 participantes garantit un cycle court, dynamique et prévisible. Vous n'attendez jamais inutilement votre tour et la gestion reste transparente."
    },
    {
      q: "Comment commander l'E-book de formation Code Violet ?",
      a: "L'E-book de formation est disponible au tarif de 14,99 € directement depuis notre site ou inclus gratuitement dans la Tontine Premium (50 €) et la Tontine Gold (100 €)."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-[#111827] selection:bg-[#8F5DFF] selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-purple-100/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="lg" />

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a href="#pourquoi" className="hover:text-[#8F5DFF] transition-colors">Pourquoi Code Violet</a>
            <a href="#fonctionnement" className="hover:text-[#8F5DFF] transition-colors">Fonctionnement</a>
            <a href="#formules" className="hover:text-[#8F5DFF] transition-colors">Nos Formules</a>
            <a href="#ebook" className="hover:text-[#8F5DFF] transition-colors">E-book</a>
            <a href="#temoignages" className="hover:text-[#8F5DFF] transition-colors">Avis</a>
            <a href="#faq" className="hover:text-[#8F5DFF] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openSiteGate}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[#8F5DFF] hover:bg-[#F3EEFF] rounded-2xl transition-colors"
            >
              Accès Code Violet
            </button>
            <button
              onClick={openSiteGate}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#8F5DFF] hover:bg-[#7b46ff] rounded-2xl shadow-lg shadow-[#8F5DFF]/25 transition-transform active:scale-98 flex items-center gap-2"
            >
              <span>Rejoindre</span>
              <Crown className="w-4 h-4 text-[#F8D64E]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5EEFF] via-[#FDFCFE] to-white">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-[#8F5DFF]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-200 text-[#8F5DFF] font-extrabold text-xs sm:text-sm shadow-xs">
            <Sparkles className="w-4 h-4 text-[#F8D64E]" />
            <span>Code Violet • Cercle d'Épargne Privé & Structuré</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#111827] max-w-4xl mx-auto leading-[1.1]">
            Épargnez entre proches. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F5DFF] via-[#7b46ff] to-[#B45309]">
              8 Participants. Capital Garanti.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Bienvenue dans l'espace <strong>Code Violet</strong>, géré par <strong>Soraya Ahamada</strong>. Des formules exclusives à 8 participants avec paiements simplifiés via Revolut, Wero, PayPal et Stripe.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={openSiteGate}
              className="w-full sm:w-auto px-8 py-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold rounded-2xl shadow-xl shadow-[#8F5DFF]/30 text-base flex items-center justify-center gap-3 transition-transform active:scale-98"
            >
              <span>Accès Code Violet</span>
              <ArrowRight className="w-5 h-5 text-[#F8D64E]" />
            </button>

            <a
              href="#formules"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F3EEFF] text-[#111827] font-bold rounded-2xl border-2 border-purple-200 text-base flex items-center justify-center gap-2 transition-colors"
            >
              <span>Voir les 3 Tontines (25€, 50€, 100€)</span>
            </a>
          </div>

          {/* Key Metrics */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs text-center">
              <p className="text-2xl sm:text-3xl font-black text-[#8F5DFF]">8</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Participants / Tontine</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs text-center">
              <p className="text-2xl sm:text-3xl font-black text-gray-900">200€ à 800€</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Capital perçu</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs text-center">
              <p className="text-2xl sm:text-3xl font-black text-[#D97706]">4 Modes</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Revolut, Wero, PP, Stripe</p>
            </div>
            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs text-center">
              <p className="text-2xl sm:text-3xl font-black text-[#8F5DFF]">Soraya A.</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Fondatrice & Admin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Nos Formules Code Violet */}
      <section id="formules" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#F3EEFF] text-[#8F5DFF] text-xs font-bold uppercase tracking-wider">
              Tontines 8 Participants Strictes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900">
              Nos 3 Formules Code Violet
            </h2>
            <p className="text-gray-600 text-base">
              Chaque tontine rassemble exactement 8 participantes avec ordre garanti de 1/8 à 8/8.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* 1. TONTINE EXPRESS 25€ (Bloc Violet Clair) */}
            <div className="rounded-3xl p-8 bg-[#F3EEFF] border-2 border-[#8F5DFF] shadow-lg flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8F5DFF]/15 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#8F5DFF] text-white text-xs font-extrabold uppercase">
                    Tontine Express
                  </span>
                  <span className="text-xs font-bold text-[#8F5DFF] bg-white px-2.5 py-1 rounded-lg border border-purple-200">
                    8 Participants
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2">Tontine Express 25 €</h3>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                  Formule rapide et accessible. Cotisez 25 € par versement et recevez un capital garanti de 200 € à votre tour.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-purple-200/80 mb-6 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Cotisation :</span>
                    <span className="font-extrabold text-[#8F5DFF] text-base">25 €</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Participants :</span>
                    <span className="font-bold text-gray-900">8 personnes</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-purple-100">
                    <span className="text-gray-700 font-bold">Capital Reçu :</span>
                    <span className="font-black text-[#8F5DFF] text-lg">200 €</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1">
                    <span>Position attribuée :</span>
                    <span className="font-semibold text-purple-900">de 1/8 à 8/8</span>
                  </div>
                </div>

                <div className="space-y-2.5 mb-8 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                    <span>8 participantes uniquement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                    <span>Capital garanti de 200 €</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                    <span>Support par Soraya Ahamada</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-purple-200/60">
                <p className="text-[11px] font-bold text-gray-500 text-center uppercase tracking-wider">
                  Options de paiement disponibles :
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={getLinksForAmount(25).revolut}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                  >
                    <span>Revolut 25€</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={getLinksForAmount(25).wero}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                  >
                    <span>Wero 25€</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={getLinksForAmount(25).paypal}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                  >
                    <span>PayPal 25€</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={getLinksForAmount(25).stripe}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                  >
                    <span>Stripe 25€</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. TONTINE PREMIUM 50€ (Bloc Noir Ecriture Blanche) */}
            <div className="rounded-3xl p-8 bg-[#0F172A] text-white border-2 border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-black text-slate-200 text-[10px] font-black tracking-widest uppercase rounded-bl-2xl border-l border-b border-slate-800">
                Formule Populaire
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-black text-white border border-slate-700 text-xs font-extrabold uppercase">
                    Tontine Premium
                  </span>
                  <span className="text-xs font-bold text-slate-200 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                    8 Participants
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-2">Tontine Premium 50 €</h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  Formule équilibrée et sécurisée. Cotisez 50 € par versement pour percevoir un capital de 400 €. E-book de formation inclus.
                </p>

                <div className="p-4 rounded-2xl bg-black border border-slate-800 mb-6 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Cotisation :</span>
                    <span className="font-extrabold text-white text-base">50 €</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Participants :</span>
                    <span className="font-bold text-slate-200">8 personnes</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                    <span className="text-slate-300 font-bold">Capital Reçu :</span>
                    <span className="font-black text-[#F8D64E] text-lg">400 €</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                    <span>Position attribuée :</span>
                    <span className="font-semibold text-slate-300">de 1/8 à 8/8</span>
                  </div>
                </div>

                <div className="space-y-2.5 mb-8 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F8D64E]" />
                    <span>8 participantes uniquement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F8D64E]" />
                    <span>Capital garanti de 400 €</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F8D64E]" />
                    <span>E-book de formation offert (valeur 14,99€)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <p className="text-[11px] font-bold text-slate-300 text-center uppercase tracking-wider">
                  Options de paiement disponibles :
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={getLinksForAmount(50).revolut}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                  >
                    <span>Revolut 50€</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={getLinksForAmount(50).wero}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs border border-slate-700"
                  >
                    <span>Wero 50€</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={getLinksForAmount(50).paypal}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                  >
                    <span>PayPal 50€</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={getLinksForAmount(50).stripe}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                  >
                    <span>Stripe 50€</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* 3. TONTINE GOLD 100€ (Bloc Jaune Gold avec animation cadre Membre Code Violet) */}
            <div className="relative rounded-3xl p-[3px] overflow-hidden group shadow-2xl flex flex-col">
              {/* Animated Glowing Gold & Purple Ring Halo Frame */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#EAB308,#F8D64E,#8F5DFF,#EAB308)] opacity-90 blur-xs"
              />
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7], scale: [0.99, 1.01, 0.99] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-[#EAB308] via-[#F8D64E] to-[#CA8A04] rounded-3xl"
              />

              <div className="relative z-10 rounded-[21px] p-8 bg-gradient-to-br from-[#FEF08A] via-[#EAB308] to-[#CA8A04] text-slate-950 flex flex-col justify-between h-full">
                
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-slate-950 text-[#F8D64E] text-[11px] font-black tracking-widest uppercase rounded-bl-2xl shadow-md flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-[#F8D64E] fill-current" />
                  <span>Membre Code Violet</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-950 text-[#F8D64E] text-xs font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#F8D64E]" /> Tontine Gold
                    </span>
                    <span className="text-xs font-extrabold text-slate-950 bg-yellow-200/90 px-2.5 py-1 rounded-lg border border-yellow-400">
                      8 Participants
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 mb-2">Tontine Gold 100 €</h3>
                  <p className="text-xs text-slate-900 font-medium mb-6 leading-relaxed">
                    Formule Prestige Code Violet. Cotisez 100 € par versement et débloquez un capital exceptionnel de 800 €.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950/90 text-white border border-yellow-500/40 mb-6 space-y-2 shadow-md">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-amber-200 font-medium">Cotisation :</span>
                      <span className="font-extrabold text-[#F8D64E] text-base">100 €</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-amber-200 font-medium">Participants :</span>
                      <span className="font-bold text-white">8 personnes</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                      <span className="text-amber-200 font-extrabold">Capital Reçu :</span>
                      <span className="font-black text-[#F8D64E] text-xl">800 €</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-amber-300 pt-1">
                      <span>Position attribuée :</span>
                      <span className="font-bold text-white">de 1/8 à 8/8</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-8 text-xs text-slate-950 font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>8 participantes uniquement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>Capital prestige de 800 €</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>Badge "Membre Code Violet" & Support Privilège</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-950/20">
                  <p className="text-[11px] font-extrabold text-slate-950 text-center uppercase tracking-wider">
                    Options de paiement disponibles :
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={getLinksForAmount(100).revolut}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 bg-slate-950 hover:bg-slate-900 text-[#F8D64E] text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-md"
                    >
                      <span>Revolut 100€</span>
                      <ExternalLink className="w-3 h-3 text-[#F8D64E]" />
                    </a>
                    <a
                      href={getLinksForAmount(100).wero}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 bg-amber-950 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                    >
                      <span>Wero 100€</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={getLinksForAmount(100).paypal}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                    >
                      <span>PayPal 100€</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={getLinksForAmount(100).stripe}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
                    >
                      <span>Stripe 100€</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section: Témoignages */}
      <section id="temoignages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#F3EEFF] text-[#8F5DFF] text-xs font-bold uppercase tracking-wider">
              Avis & Retours Membres
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900">
              Ce que disent nos membres Code Violet
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(tst => (
              <div key={tst.id} className="p-6 rounded-3xl bg-[#FAF8FF] border border-purple-100 shadow-xs space-y-4 flex flex-col justify-between hover:border-purple-300 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#F8D64E]">
                    {[...Array(tst.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    "{tst.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-purple-200/60">
                  <img
                    src={tst.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={tst.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#8F5DFF]"
                  />
                  <div>
                    <p className="font-extrabold text-gray-900 text-xs">{tst.name}</p>
                    <p className="text-[10px] text-gray-500 font-semibold">{tst.tontineName || 'Membre Code Violet'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: E-Book de Formation (En fin de page d'accueil) */}
      <section id="ebook" className="py-20 bg-gradient-to-br from-[#FAF5FF] via-white to-[#FDFCFE] border-t border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute inset-0 bg-[#8F5DFF]/20 rounded-3xl blur-2xl transform rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
                  alt="E-book Code Violet"
                  className="relative rounded-3xl shadow-2xl border-4 border-white object-cover w-full h-[380px]"
                />
                <div className="absolute -bottom-4 -right-4 px-5 py-2.5 bg-[#F8D64E] text-[#111827] font-black rounded-2xl shadow-lg text-lg flex items-center gap-1.5 border-2 border-white">
                  <span>14,99 €</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEFF] text-[#8F5DFF] text-xs font-extrabold uppercase">
                <BookOpen className="w-4 h-4" /> E-book de Formation
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
                Guide Ultime de l'Épargne Collective & Code Violet
              </h2>

              <p className="text-gray-600 text-base leading-relaxed">
                Rédigé par <strong>Soraya Ahamada</strong>, cet ouvrage pratique vous livre toutes les stratégies pour maîtriser votre gestion financière, sécuriser vos revenus et maximiser l'efficacité de vos cycles de tontine.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700 pt-2">
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-purple-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                  <span>128 pages de conseils financiers</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-purple-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                  <span>Format PDF téléchargeable</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-purple-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                  <span>Inclus avec les Tontines 50€ & 100€</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-purple-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                  <span>Accès instantané après achat</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://revolut.me/shsnhouse"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-black rounded-2xl shadow-xl shadow-[#8F5DFF]/25 text-base flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <ShoppingBag className="w-5 h-5 text-[#F8D64E]" />
                  <span>Acheter l'E-book pour 14,99 €</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className="py-20 bg-[#FAF8FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-[#8F5DFF] uppercase tracking-wider">Informations Pratiques</h2>
            <h3 className="text-3xl font-extrabold text-[#111827]">Questions Fréquentes</h3>
          </div>

          <div className="divide-y divide-purple-100 rounded-3xl border border-purple-100 p-4 bg-white shadow-xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left font-bold text-gray-900 text-sm sm:text-base flex items-center justify-between gap-4 py-2"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#8F5DFF] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed pl-2 border-l-2 border-[#8F5DFF]">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="md" showTagline />
            <div className="flex items-center gap-6 text-xs text-gray-500 font-medium">
              <a href="#formules" className="hover:text-[#8F5DFF]">Tontines</a>
              <a href="#ebook" className="hover:text-[#8F5DFF]">E-book</a>
              <a href="#faq" className="hover:text-[#8F5DFF]">FAQ</a>
              <button onClick={() => switchRole('admin')} className="text-[#8F5DFF] font-extrabold hover:underline">
                Accès Administrateur (Soraya Ahamada)
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
            <p>© 2026 Code Violet • Administré par Soraya Ahamada. Tous droits réservés.</p>
            <button onClick={openSiteGate} className="flex items-center gap-1 mt-2 sm:mt-0 text-slate-400 hover:text-[#8F5DFF] transition-colors">
              <ShieldCheck className="w-4 h-4 text-[#8F5DFF]" /> Espace Code Violet Sécurisé
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
