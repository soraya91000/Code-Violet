import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentLink, PaymentStatus } from '../../types';
import { 
  CreditCard, ExternalLink, QrCode, Download, ShieldCheck, 
  CheckCircle2, Clock, AlertTriangle, XCircle, Search, Filter 
} from 'lucide-react';

interface MemberPaymentsProps {
  onOpenQR: (link: PaymentLink) => void;
  onPayNow: (paymentLinkId: string, amount: number, tontineName: string) => void;
}

export const MemberPayments: React.FC<MemberPaymentsProps> = ({ onOpenQR, onPayNow }) => {
  const { paymentLinks, payments, currentUser } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  const activeLinks = paymentLinks.filter(l => l.isActive);

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'validated':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">✅ Paiement Validé</span>;
      case 'pending_validation':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">🟡 En attente de validation</span>;
      case 'upcoming':
        return <span className="px-2.5 py-1 rounded-full bg-purple-100 text-[#8F5DFF] text-[10px] font-black">⏳ À venir</span>;
      case 'late':
        return <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black">⚠️ Retard</span>;
      case 'refused':
        return <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-black">❌ Refusé</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-black">{status}</span>;
    }
  };

  const filteredPayments = payments.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Paiements & Passerelles Officiels</h1>
        <p className="text-xs text-gray-500">
          Sélectionnez l'offre ou la plateforme de votre choix (Revolut, Wero, PayPal, Lydia, Virement) pour régler votre versement.
        </p>
      </div>

      {/* Grid of Payment Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeLinks.map((link) => {
          const is25 = Math.abs(link.amount - 25) < 0.01;
          const is50 = Math.abs(link.amount - 50) < 0.01;
          const is100 = Math.abs(link.amount - 100) < 0.01;

          return (
            <div
              key={link.id}
              className={`p-5 rounded-3xl transition-all flex flex-col justify-between space-y-4 shadow-md ${
                is25
                  ? 'bg-[#F3EEFF] text-slate-900 border-2 border-[#8F5DFF]/60'
                  : is50
                  ? 'bg-[#0F172A] text-white border-2 border-slate-800'
                  : is100
                  ? 'bg-gradient-to-br from-[#FEF08A] via-[#EAB308] to-[#CA8A04] text-slate-950 border-2 border-yellow-400'
                  : 'bg-white text-gray-900 border border-gray-100'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full font-black text-[10px] ${
                    is25
                      ? 'bg-[#8F5DFF] text-white'
                      : is50
                      ? 'bg-black text-white border border-slate-700'
                      : is100
                      ? 'bg-slate-950 text-[#F8D64E]'
                      : 'bg-[#F3EEFF] text-[#8F5DFF]'
                  }`}>
                    {link.platform}
                  </span>
                  <span className={`font-black text-base ${
                    is25
                      ? 'text-[#8F5DFF]'
                      : is50
                      ? 'text-[#F8D64E]'
                      : is100
                      ? 'text-slate-950'
                      : 'text-[#8F5DFF]'
                  }`}>
                    {link.amount.toFixed(2)} €
                  </span>
                </div>
                <h3 className={`font-extrabold text-sm ${is25 ? 'text-slate-900' : is50 ? 'text-white' : is100 ? 'text-slate-950' : 'text-gray-900'}`}>
                  {link.name}
                </h3>
                <p className={`text-xs line-clamp-2 ${is25 ? 'text-slate-700 font-medium' : is50 ? 'text-slate-300' : is100 ? 'text-slate-900 font-medium' : 'text-gray-500'}`}>
                  {link.paymentInstructions || link.beneficiaryName}
                </p>
              </div>

              <div className={`space-y-2 pt-2 border-t ${is25 ? 'border-purple-200' : is50 ? 'border-slate-800' : is100 ? 'border-amber-600/30' : 'border-gray-100'}`}>
                <button
                  onClick={() => onOpenQR(link)}
                  className={`w-full py-2 px-3 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors ${
                    is25
                      ? 'bg-white hover:bg-purple-100/80 text-[#8F5DFF] border border-purple-200'
                      : is50
                      ? 'bg-slate-900 hover:bg-black text-slate-200 border border-slate-700'
                      : is100
                      ? 'bg-yellow-200/80 hover:bg-yellow-300 text-slate-950 border border-yellow-400'
                      : 'bg-gray-50 hover:bg-[#F3EEFF] text-gray-800 hover:text-[#8F5DFF]'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>QR Code & Lien</span>
                </button>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPayNow(link.id, link.amount, link.associatedOfferName || 'Tontine')}
                  className={`w-full py-2.5 px-3 font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-transform active:scale-98 ${
                    is25
                      ? 'bg-[#8F5DFF] hover:bg-[#7b46ff] text-white'
                      : is50
                      ? 'bg-[#8F5DFF] hover:bg-[#7b46ff] text-white'
                      : is100
                      ? 'bg-slate-950 hover:bg-slate-900 text-[#F8D64E]'
                      : 'bg-[#8F5DFF] hover:bg-[#7b46ff] text-white'
                  }`}
                >
                  <span>Payer via {link.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#F8D64E]" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment History Table Section */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-gray-900 text-base">Historique des Paiements & Récépissés</h3>
            <p className="text-xs text-gray-500">Suivi en temps réel de tous vos versements déclarés et validés par l'administration.</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-gray-50 text-xs font-bold text-gray-700 rounded-xl border border-gray-200 outline-hidden"
            >
              <option value="all">Tous les statuts</option>
              <option value="validated">Validés 🟢</option>
              <option value="pending_validation">En attente 🟡</option>
              <option value="upcoming">À venir ⏳</option>
              <option value="late">En retard ⚠️</option>
              <option value="refused">Refusés ❌</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-3">N° Échéance</th>
                <th className="py-3 px-3">Tontine</th>
                <th className="py-3 px-3">Montant</th>
                <th className="py-3 px-3">Date Exigible</th>
                <th className="py-3 px-3">Mode & Réf</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-3 font-mono font-bold text-gray-900">
                    Tour #{p.installmentNumber}/{p.totalInstallments}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-gray-900">{p.tontineName}</td>
                  <td className="py-3.5 px-3 font-black text-[#8F5DFF]">{p.amount.toFixed(2)} €</td>
                  <td className="py-3.5 px-3 text-gray-600">{p.dueDate}</td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-gray-900">{p.paymentMethod}</p>
                    {p.proofReference && <p className="text-[10px] font-mono text-gray-400">{p.proofReference}</p>}
                  </td>
                  <td className="py-3.5 px-3">{getStatusBadge(p.status)}</td>
                  <td className="py-3.5 px-3 text-right">
                    {p.status === 'validated' && (
                      <button
                        onClick={() => setSelectedReceipt(p)}
                        className="px-3 py-1 bg-[#F3EEFF] hover:bg-[#8F5DFF] hover:text-white text-[#8F5DFF] font-bold rounded-xl transition-colors inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Récépissé
                      </button>
                    )}
                    {p.status === 'upcoming' && (
                      <button
                        onClick={() => onPayNow('pl_revolut_50', p.amount, p.tontineName)}
                        className="px-3 py-1 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-bold rounded-xl shadow-xs"
                      >
                        Payer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-[#8F5DFF] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#8F5DFF]" />
                <h3 className="font-extrabold text-gray-900 text-base">Récépissé Officiel de Versement</h3>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="p-4 bg-[#FAF8FF] rounded-2xl border border-purple-100 text-xs space-y-2 font-mono">
              <p className="font-bold text-gray-900">ORGANISME : TONTINES COFFRES SAS</p>
              <p>MEMBRE : {selectedReceipt.userName}</p>
              <p>TONTINE : {selectedReceipt.tontineName}</p>
              <p>MONTANT VALIDÉ : <span className="text-[#8F5DFF] font-black">{selectedReceipt.amount.toFixed(2)} EUR</span></p>
              <p>RÉFÉRENCE : {selectedReceipt.proofReference || 'REV-987456'}</p>
              <p>VALIDÉ PAR : {selectedReceipt.validatedBy || 'Fatou Diallo (Admin)'}</p>
              <p>DATE HORODATAGE : {selectedReceipt.validatedDate || '2026-07-04 16:05'}</p>
            </div>

            <button
              onClick={() => {
                alert('Impression / Téléchargement du récépissé PDF démarré.');
                setSelectedReceipt(null);
              }}
              className="w-full py-3 bg-[#8F5DFF] text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#F8D64E]" />
              <span>Télécharger le récépissé PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
