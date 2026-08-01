import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, Copy, Check, Users, Award, Crown, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

export const ReferralAndRewards: React.FC = () => {
  const { currentUser, badges } = useApp();
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [wheelReward, setWheelReward] = useState<string | null>(null);

  const referralUrl = `https://tontines-coffres.com/r/${currentUser.referralCode.toLowerCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setWheelReward(null);
    setTimeout(() => {
      setSpinning(false);
      const rewards = ['Badge VIP Gold 👑', 'Frais Offerts 1 Mois 🎉', 'Pass Prioritaire Tour ⭐', 'Bonus 15 € Épargne 💰'];
      const chosen = rewards[Math.floor(Math.random() * rewards.length)];
      setWheelReward(chosen);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Parrainage & Roue des Récompenses</h1>
        <p className="text-xs text-gray-500">
          Invitez vos amies à épargner en toute sécurité et débloquez des avantages exclusifs et des badges de fidélité.
        </p>
      </div>

      {/* Referral Link Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FAF8FF] via-[#F3EEFF] to-white border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-2xl shadow-xs text-[#8F5DFF]">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Votre Lien de Parrainage Personnel</h3>
              <p className="text-xs text-gray-500">Offrez 10 € de réduction sur la première inscription de vos filleules.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white text-[#8F5DFF] text-xs font-black rounded-full border border-purple-200">
              Code : {currentUser.referralCode}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-200">
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="w-full bg-transparent text-xs font-mono text-gray-700 outline-hidden px-2 truncate"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-[#F8D64E]" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copié !' : 'Copier mon lien'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
          <div className="p-3 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 font-bold text-[10px] uppercase">Filleules Invitées</p>
            <p className="text-xl font-black text-gray-900">{currentUser.referralsCount}</p>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 font-bold text-[10px] uppercase">Filleules Actives</p>
            <p className="text-xl font-black text-[#8F5DFF]">3</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-gray-400 font-bold text-[10px] uppercase">Bonus Cumulés</p>
            <p className="text-xl font-black text-amber-900">45,00 €</p>
          </div>
        </div>
      </div>

      {/* Rewards Wheel Section */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm text-center space-y-6 max-w-xl mx-auto">
        <div className="space-y-1">
          <h3 className="font-extrabold text-gray-900 text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F8D64E]" /> Roue des Récompenses Mensuelle
          </h3>
          <p className="text-xs text-gray-500">Tournez la roue tous les mois pour débloquer des cadeaux réservés aux membres fidèles !</p>
        </div>

        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <motion.div
            animate={{ rotate: spinning ? 1440 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full h-full rounded-full border-4 border-[#F8D64E] bg-gradient-to-tr from-[#8F5DFF] via-[#7b46ff] to-[#5e2ad6] shadow-xl flex items-center justify-center p-4 text-white font-black text-center"
          >
            {wheelReward ? (
              <span className="text-sm text-[#F8D64E] font-black">{wheelReward}</span>
            ) : (
              <div className="space-y-1">
                <Crown className="w-8 h-8 mx-auto text-[#F8D64E]" />
                <span className="text-xs block">CLIQUEZ SUR TOURNER</span>
              </div>
            )}
          </motion.div>
        </div>

        <button
          onClick={handleSpinWheel}
          disabled={spinning}
          className="px-8 py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#8F5DFF]/20"
        >
          {spinning ? 'Lancement en cours...' : 'Lancer la Roue des Récompenses 🎰'}
        </button>
      </div>

      {/* Badges Collection */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-gray-900 text-base">Mes Badges & Accomplissements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border flex items-center gap-3 ${
                b.unlocked ? 'bg-[#FAF8FF] border-purple-200' : 'bg-gray-50 border-gray-100 opacity-60'
              }`}
            >
              <div className={`p-3 rounded-xl ${b.unlocked ? 'bg-[#8F5DFF] text-[#F8D64E]' : 'bg-gray-200 text-gray-400'}`}>
                <Award className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 text-xs truncate">{b.name}</h4>
                <p className="text-[10px] text-gray-500 line-clamp-1">{b.description}</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F8D64E] rounded-full"
                      style={{ width: `${(b.progress / b.maxProgress) * 100}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-gray-400">{b.progress}/{b.maxProgress}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
