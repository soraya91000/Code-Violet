import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, KeyRound, AlertCircle, ArrowRight, Eye, EyeOff, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface SiteAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SiteAccessModal: React.FC<SiteAccessModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setLoading(false);
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'coffre2020') {
      setError(false);
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('code_violet_site_access_granted', 'true');
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 500);
      }, 500);
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        {/* Background glowing ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8F5DFF]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F8D64E]/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-md bg-slate-900/95 border-2 border-[#8F5DFF]/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Logo */}
          <div className="flex justify-center mb-6">
            <Logo variant="dark" className="scale-110" />
          </div>

          {/* CADENAS AVEC ANIMATION DE ROTATION DORÉE */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-6">
            {/* Outer rotating golden dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#F8D64E] shadow-[0_0_25px_rgba(248,214,78,0.6)]"
            />

            {/* Inner counter-rotating golden solid ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 11, ease: "linear" }}
              className="absolute inset-2.5 rounded-full border-2 border-amber-300/80 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
            />

            {/* Radiant golden blur aura */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-[#F8D64E]/30 via-[#8F5DFF]/20 to-[#F8D64E]/50 blur-md pointer-events-none" />

            {/* Center Lock Badge */}
            <div className="relative w-16 h-16 rounded-full bg-[#8F5DFF]/25 border-2 border-[#8F5DFF]/50 flex items-center justify-center text-[#8F5DFF] shadow-inner z-10">
              <Lock className="w-8 h-8 text-[#8F5DFF] drop-shadow-md" />
            </div>

            {/* Floating Golden Sparkles */}
            <motion.div
              animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-1 -right-1 text-[#F8D64E] z-20"
            >
              <Sparkles className="w-5 h-5 drop-shadow-[0_0_10px_rgba(248,214,78,0.9)]" />
            </motion.div>
            <motion.div
              animate={{ scale: [1.2, 0.75, 1.2], opacity: [0.5, 0.9, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute -bottom-1 -left-1 text-[#F8D64E] z-20"
            >
              <Sparkles className="w-4 h-4 drop-shadow-[0_0_8px_rgba(248,214,78,0.8)]" />
            </motion.div>
          </div>

          <div className="space-y-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8F5DFF]/20 border border-[#8F5DFF]/30 text-[#8F5DFF] text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F8D64E]" /> Accès Protégé
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Espace Code Violet
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Saisissez le mot de passe d'accès <span className="text-[#F8D64E] font-bold">(coffre2020)</span> pour ouvrir l'espace privé.
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Accès Déverrouillé ! Ouverture en cours...</span>
            </motion.div>
          ) : (
            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2 text-left">
                <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#8F5DFF]" /> Mot de passe d'accès
                  </span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    placeholder="Ex: coffre2020"
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
                    <span>Mot de passe incorrect ! (Entrez : coffre2020)</span>
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !password.trim()}
                className="w-full py-3.5 px-6 bg-[#8F5DFF] hover:bg-[#7b46ff] disabled:opacity-50 text-white font-extrabold rounded-2xl shadow-lg shadow-[#8F5DFF]/25 transition-all active:scale-98 text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Accéder à l'espace</span>
                    <ArrowRight className="w-4 h-4 text-[#F8D64E]" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="mt-6 text-[11px] text-slate-500">
            Code Violet • Cercle privé & sécurisé
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
