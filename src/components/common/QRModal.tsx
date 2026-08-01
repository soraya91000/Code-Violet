import React, { useState } from 'react';
import { PaymentLink } from '../../types';
import { X, Copy, Check, ExternalLink, QrCode, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: PaymentLink | null;
  onPaymentClicked: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, link, onPaymentClicked }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !link) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(link.url)}&color=8F5DFF&bgcolor=FFFFFF`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#8F5DFF]/20 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F3EEFF] flex items-center justify-center text-[#8F5DFF]">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Lien de Paiement & QR Code</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4 text-center">
            <div className="inline-block px-3 py-1 bg-[#F3EEFF] text-[#8F5DFF] font-semibold text-xs rounded-full">
              Plateforme : {link.platform} • {link.amount.toFixed(2)} €
            </div>

            <div className="relative mx-auto w-52 h-52 p-3 bg-white rounded-2xl shadow-md border-2 border-[#F8D64E] flex items-center justify-center">
              <img
                src={qrImageUrl}
                alt="QR Code de paiement"
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute -bottom-3 bg-[#8F5DFF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-[#F8D64E]" /> Sécurisé par {link.platform}
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-2xl text-left border border-gray-100">
              <p className="font-semibold text-gray-900 text-xs uppercase mb-1">Bénéficiaire : {link.beneficiaryName}</p>
              {link.paymentInstructions && (
                <p className="text-xs text-gray-600 mb-1">{link.paymentInstructions}</p>
              )}
              {link.referenceToInclude && (
                <p className="text-xs font-mono bg-white p-1.5 rounded-lg border border-gray-200 font-semibold text-[#8F5DFF]">
                  Motif obligatoire : {link.referenceToInclude}
                </p>
              )}
            </div>

            {/* URL Box */}
            <div className="flex items-center gap-2 bg-[#F3EEFF]/50 p-2 rounded-xl border border-[#8F5DFF]/20">
              <input
                type="text"
                readOnly
                value={link.url}
                className="w-full bg-transparent text-xs font-mono text-gray-700 outline-hidden px-2 truncate"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 bg-white text-[#8F5DFF] text-xs font-bold rounded-lg shadow-xs hover:bg-[#F3EEFF] transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copié' : 'Copier'}
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 flex flex-col gap-2">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onPaymentClicked();
                onClose();
              }}
              className="w-full py-3 px-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-bold rounded-2xl shadow-lg shadow-[#8F5DFF]/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <span>Accéder au paiement ({link.platform})</span>
              <ExternalLink className="w-4 h-4 text-[#F8D64E]" />
            </a>
            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
            >
              Fermer la fenêtre
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
