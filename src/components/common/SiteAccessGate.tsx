import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, KeyRound, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Logo } from './Logo';

interface SiteAccessGateProps {
  children: React.ReactNode;
}

export const SiteAccessGate: React.FC<SiteAccessGateProps> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('code_violet_site_access_granted') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'coffre2020') {
      setError(false);
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('code_violet_site_access_granted', 'true');
        setIsUnlocked(true);
        setLoading(false);
      }, 600);
    } else {
      setError(true);
    }
  };

  const handleRelock = () => {
    localStorage.removeItem('code_violet_site_access_granted');
    setIsUnlocked(false);
    setPassword('');
  };

  if (isUnlocked) {
    return (
      <>
        {children}
        {/* Quick lock toggle in corner for admin/owner testing */}
        <button
          onClick={handleRelock}
          title="Verrouiller le site"
          className="fixed bottom-3 right-3 z-50 p-2 bg-slate-900/80 hover:bg-slate-900 text-white/70 hover:text-white rounded-full text-xs flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all opacity-40 hover:opacity-100"
        >
          <Lock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-medium text-[11px]">Verrouiller</span>
        </button>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950 text-white overflow-y-auto">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8F5DFF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F8D64E]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden text-center"
      >
        {/* Top Decorative Header */}
        <div className="flex justify-center mb-6">
          <Logo variant="dark" className="scale-110" />
        </div>

        <div className="w-16 h-16 mx-auto rounded-full bg-[#8F5DFF]/15 border border-[#8F5DFF]/30 flex items-center justify-center text-[#8F5DFF] mb-5 shadow-lg shadow-[#8F5DFF]/10">
          <Lock className="w-8 h-8 text-[#8F5DFF]" />
        </div>

        <div className="space-y-2 mb-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8F5DFF]/20 border border-[#8F5DFF]/30 text-[#8F5DFF] text-[10px] font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F8D64E]" /> Accès Protégé
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Plateforme Code Violet
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            Veuillez entrer le mot de passe d'accès pour continuer vers la plateforme.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2 text-left">
            <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#8F5DFF]" /> Mot de passe
              </span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoFocus
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full px-4 py-3 pr-10 text-sm font-semibold rounded-xl bg-slate-900 border text-white placeholder:text-slate-600 outline-hidden transition-all ${
                  error
                    ? 'border-rose-500 bg-rose-950/20 text-rose-200 focus:ring-2 focus:ring-rose-500/30'
                    : 'border-slate-700 focus:border-[#8F5DFF] focus:ring-2 focus:ring-[#8F5DFF]/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-900/50 p-2 rounded-xl mt-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Mot de passe incorrect.</span>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full py-3.5 px-6 bg-[#8F5DFF] hover:bg-[#7b46ff] disabled:opacity-50 text-white font-extrabold rounded-2xl shadow-lg shadow-[#8F5DFF]/25 transition-all active:scale-98 text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Accéder au site</span>
                <ArrowRight className="w-4 h-4 text-[#F8D64E]" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-[11px] text-slate-500">
          Code Violet • Plateforme sécurisée d'épargne et tontines
        </p>
      </motion.div>
    </div>
  );
};
