import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, ShieldCheck, X } from 'lucide-react';

interface PaymentReturnConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (proofRef: string) => void;
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
  const [proofRef, setProofRef] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirmPayment(proofRef || `REF-${Math.floor(100000 + Math.random() * 900000)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#F8D64E] overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

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
                Référence ou N° de transaction (Facultatif)
              </label>
              <input
                type="text"
                placeholder="Ex: REV-987456123 ou WERO-441122"
                value={proofRef}
                onChange={(e) => setProofRef(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF] focus:ring-2 focus:ring-[#8F5DFF]/20"
              />
              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8F5DFF]" />
                En cliquant sur "Oui", votre paiement passe automatiquement en <span className="font-bold text-[#8F5DFF]">🟡 En attente de validation</span> pour examen administrateur.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
