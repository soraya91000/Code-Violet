import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, X, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setSuccessMsg(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '2020') {
      setError(false);
      setSuccessMsg(true);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#8F5DFF]/30 overflow-hidden text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* GOLDEN ROTATING ANIMATION AROUND LOCK ICON */}
          <div className="relative w-18 h-18 mx-auto mb-4 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full p-[1px] shadow-[0_0_12px_rgba(248,214,78,0.25)]"
              style={{
                background: 'conic-gradient(from 0deg, #F8D64E 0%, rgba(248,214,78,0.2) 35%, #D97706 70%, #F8D64E 100%)'
              }}
            >
              <div className="w-full h-full bg-slate-900 rounded-full" />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1.5 rounded-full pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFF3B0] rounded-full shadow-[0_0_6px_#F8D64E]" />
            </motion.div>

            <div className="relative w-14 h-14 rounded-full bg-slate-900 border border-[#F8D64E]/60 flex items-center justify-center text-[#F8D64E] shadow-md z-10">
              <Lock className="w-6 h-6 text-[#F8D64E] drop-shadow-[0_0_6px_rgba(248,214,78,0.7)]" />
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <span className="px-3 py-1 rounded-full bg-[#F3EEFF] text-[#8F5DFF] text-[10px] font-black uppercase tracking-wider">
              🛡️ Accès Sécurisé
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 pt-1">
              Espace Administration
            </h3>
            <p className="text-xs text-slate-500">
              Veuillez saisir le code d'accès administrateur à 4 chiffres.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#FAF8FF] p-4 rounded-2xl border border-[#8F5DFF]/20 space-y-3">
              <label className="block text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#8F5DFF]" />
                <span>Code d'accès (PIN)</span>
              </label>

              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                autoFocus
                required
                placeholder="• • • •"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full text-center text-2xl font-black tracking-[0.5em] py-3 bg-white rounded-xl border-2 outline-hidden transition-all ${
                  error
                    ? 'border-rose-500 bg-rose-50/50 text-rose-600 focus:ring-2 focus:ring-rose-200'
                    : 'border-[#8F5DFF] text-slate-900 focus:ring-2 focus:ring-[#8F5DFF]/20'
                }`}
              />

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-1 text-xs font-bold text-rose-600 bg-rose-100/80 py-1.5 px-3 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Code d'accès incorrect ! (Code : 2020)</span>
                </motion.div>
              )}

              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 py-1.5 px-3 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Code validé ! Accès en cours...</span>
                </motion.div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors text-xs"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold rounded-2xl shadow-lg shadow-[#8F5DFF]/20 transition-transform active:scale-98 text-xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#F8D64E]" />
                <span>Accéder à l'Admin</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
