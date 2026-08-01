import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, X, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PaymentReturnConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (fullName: string) => void;
  amount: number;
  tontineName: string;
}

export const PaymentReturnConfirmModal: React.FC<PaymentReturnConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmPayment,
  amount,
  tontineName,
}) => {
  const { currentUser } = useApp();
  const [fullName, setFullName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFullName(`${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim());
      setIsSubmitted(false);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const finalName = fullName.trim() || `${currentUser?.firstName || 'Membre'} ${currentUser?.lastName || ''}`.trim();
    setIsSubmitted(true);
    onConfirmPayment(finalName);

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2800);
  };

  const handleCloseModal = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#F8D64E] overflow-hidden"
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 shadow-md">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  🔔 Notification transmise
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Paiement Déclaré avec Succès !</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Votre versement de <span className="font-bold text-[#8F5DFF]">{amount.toFixed(2)} €</span> au nom de <strong className="text-slate-900">{fullName || `${currentUser?.firstName} ${currentUser?.lastName}`}</strong> a été envoyé.
                </p>
              </div>

              <div className="p-3.5 bg-[#F3EEFF] rounded-2xl border border-[#8F5DFF]/20 text-xs text-[#8F5DFF] font-bold flex items-center justify-center gap-2 text-left">
                <Bell className="w-5 h-5 text-[#8F5DFF] shrink-0" />
                <span>Le nom <strong>{fullName}</strong> est désormais visible dans l'espace Administrateur pour validation.</span>
              </div>
            </motion.div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#F3EEFF] border-2 border-[#8F5DFF]/30 flex items-center justify-center text-[#8F5DFF] shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#8F5DFF]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-gray-900">✅ Avez-vous effectué votre paiement ?</h3>
                <p className="text-sm text-gray-600">
                  Vous avez initié un versement de <span className="font-bold text-[#8F5DFF]">{amount.toFixed(2)} €</span> pour <span className="font-medium text-gray-900">{tontineName}</span>.
                </p>
              </div>

              <div className="bg-[#F3EEFF]/60 p-4 rounded-2xl text-left border border-[#8F5DFF]/20 space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Nom et prénom du payeur
                </label>
                <input
                  type="text"
                  placeholder="Ex: Amina Diallo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-gray-300 outline-hidden focus:border-[#8F5DFF] focus:ring-2 focus:ring-[#8F5DFF]/20 font-semibold text-gray-900"
                />
                <p className="text-[11px] text-gray-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8F5DFF] shrink-0" />
                  Ces informations permettent à l'administrateur de vous identifier et de valider votre entrée.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-colors text-sm"
                >
                  Non, pas encore
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-bold rounded-2xl shadow-lg shadow-[#8F5DFF]/20 transition-transform active:scale-98 text-sm flex items-center justify-center gap-1.5"
                >
                  <span>Oui, j'ai payé</span>
                  <CheckCircle2 className="w-4 h-4 text-[#F8D64E]" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
