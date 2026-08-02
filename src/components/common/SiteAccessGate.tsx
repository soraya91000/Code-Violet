import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, KeyRound, AlertCircle, ArrowRight, Eye, EyeOff, CheckCircle2, X } from 'lucide-react';
import { Logo } from './Logo';

interface SiteAccessGateProps {
  children?: React.ReactNode;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  onSuccessAccess?: (type: 'owner' | 'standard_member') => void;
}

export const SiteAccessGate: React.FC<SiteAccessGateProps> = ({
  children,
  isOpenModal,
  onCloseModal,
  onSuccessAccess,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('code_violet_site_access_granted') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [accessModeType, setAccessModeType] = useState<'owner' | 'standard_member' | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpenModal) {
      setPassword('');
      setError(false);
      setSuccessMsg(false);
      setAccessModeType(null);
    }
  }, [isOpenModal]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPwd = password.trim();

    if (cleanPwd === 'coffre2020' || cleanPwd === '2020') {
      // Owner / Admin Access - Soraya Ahamada
      setError(false);
      setSuccessMsg(true);
      setAccessModeType('owner');
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('code_violet_site_access_granted', 'true');
        localStorage.setItem('code_violet_access_type', 'owner');
        setIsUnlocked(true);
        setLoading(false);
        if (onSuccessAccess) {
          onSuccessAccess('owner');
        }
        if (onCloseModal) {
          onCloseModal();
        }
      }, 600);
    } else if (cleanPwd === 'coffre#1') {
      // Individual Member Space - Clean personalized user space
      setError(false);
      setSuccessMsg(true);
      setAccessModeType('standard_member');
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('code_violet_site_access_granted', 'true');
        localStorage.setItem('code_violet_access_type', 'standard_member');
        setIsUnlocked(true);
        setLoading(false);
        if (onSuccessAccess) {
          onSuccessAccess('standard_member');
        }
        if (onCloseModal) {
          onCloseModal();
        }
      }, 600);
    } else {
      setError(true);
      setSuccessMsg(false);
    }
  };

  const handleRelock = () => {
    localStorage.removeItem('code_violet_site_access_granted');
    localStorage.removeItem('code_violet_access_type');
    setIsUnlocked(false);
    setPassword('');
  };

  // Golden Rotating Ring Graphic Component
  const GoldenLockGraphic = () => (
    <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
      {/* 1. Outer Golden Rotating Conic Gradient Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1.5 rounded-full p-[3px] shadow-[0_0_25px_rgba(248,214,78,0.6)]"
        style={{
          background: 'conic-gradient(from 0deg, #F8D64E, #FFF3B0, #D97706, #F8D64E, #FFE885, #F8D64E)'
        }}
      />

      {/* 2. Inner Golden Dashed Ring Rotating in Reverse */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-dashed border-[#F8D64E] opacity-75"
      />

      {/* 3. Orbiting Gold Particle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-2.5 rounded-full pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFF5C0] rounded-full shadow-[0_0_15px_#F8D64E] border-2 border-white flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#B45309] rounded-full" />
        </div>
      </motion.div>

      {/* 4. Golden Pulsing Glowing Ambient Background */}
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-1 rounded-full bg-[#F8D64E]/25 blur-md"
      />

      {/* 5. Central Dark Badge with Golden Lock Icon */}
      <div className="relative w-20 h-20 rounded-full bg-slate-950 border-2 border-[#F8D64E] flex items-center justify-center text-[#F8D64E] shadow-2xl z-10">
        <Lock className="w-9 h-9 text-[#F8D64E] drop-shadow-[0_0_12px_rgba(248,214,78,0.9)]" />
      </div>
    </div>
  );

  // Modal Trigger Overlay
  if (isOpenModal !== undefined) {
    if (!isOpenModal) return null;

    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          {/* Background glowing ambient light */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8F5DFF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F8D64E]/15 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-md bg-slate-900/95 border-2 border-[#F8D64E]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(248,214,78,0.2)] backdrop-blur-2xl overflow-hidden text-center"
          >
            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Logo variant="dark" className="scale-110" />
            </div>

            {/* GOLDEN ROTATING LOCK ANIMATION */}
            <GoldenLockGraphic />

            {/* Header titles */}
            <div className="space-y-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F8D64E]/15 border border-[#F8D64E]/40 text-[#F8D64E] text-[11px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F8D64E]" /> Accès Protégé
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Plateforme Code Violet
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                Saisissez votre mot de passe d'accès pour entrer dans votre espace.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2 text-left">
                <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#F8D64E]" /> Mot de passe d'accès
                  </span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    className={`w-full px-4 py-3 pr-10 text-sm font-bold rounded-xl bg-slate-900 border text-white placeholder:text-slate-600 outline-hidden transition-all ${
                      error
                        ? 'border-rose-500 bg-rose-950/30 text-rose-200 focus:ring-2 focus:ring-rose-500/30'
                        : 'border-slate-700 focus:border-[#F8D64E] focus:ring-2 focus:ring-[#F8D64E]/30'
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
                    className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/50 border border-rose-900/60 p-2.5 rounded-xl mt-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>Mot de passe incorrect.</span>
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 p-2.5 rounded-xl mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      {accessModeType === 'owner'
                        ? 'Espace Administrateur déverrouillé !'
                        : 'Bienvenue dans votre Espace Membre Personnel !'}
                    </span>
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !password.trim()}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#8F5DFF] via-[#7b46ff] to-[#8F5DFF] hover:opacity-95 disabled:opacity-50 text-white font-extrabold rounded-2xl shadow-xl shadow-[#8F5DFF]/30 transition-all active:scale-98 text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Accéder à la Plateforme</span>
                    <ArrowRight className="w-4 h-4 text-[#F8D64E]" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-[11px] text-slate-500">
              Code Violet • Espace Sécurisé
            </p>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // Otherwise, default full-page wrapper if not unlocked yet
  if (isUnlocked) {
    return (
      <>
        {children}
        <button
          onClick={handleRelock}
          title="Verrouiller le site"
          className="fixed bottom-3 right-3 z-50 p-2 bg-slate-900/80 hover:bg-slate-900 text-white/70 hover:text-white rounded-full text-xs flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all opacity-40 hover:opacity-100 border border-slate-700"
        >
          <Lock className="w-3.5 h-3.5 text-[#F8D64E]" />
          <span className="hidden sm:inline font-medium text-[11px]">Verrouiller</span>
        </button>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950 text-white overflow-y-auto">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8F5DFF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F8D64E]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden text-center"
      >
        <div className="flex justify-center mb-6">
          <Logo variant="dark" className="scale-110" />
        </div>

        {/* GOLDEN ROTATING LOCK ANIMATION */}
        <GoldenLockGraphic />

        <div className="space-y-2 mb-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8F5DFF]/20 border border-[#8F5DFF]/30 text-[#8F5DFF] text-[10px] font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F8D64E]" /> Accès Protégé
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Plateforme Code Violet
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            Veuillez entrer votre mot de passe d'accès pour continuer vers la plateforme.
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

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 p-2.5 rounded-xl mt-2"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  {accessModeType === 'owner'
                    ? 'Espace Administrateur déverrouillé !'
                    : 'Bienvenue dans votre Espace Membre Personnel !'}
                </span>
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
