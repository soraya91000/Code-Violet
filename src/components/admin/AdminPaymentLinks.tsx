import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, QrCode, ExternalLink, Trash2, Edit, CheckCircle2, Copy } from 'lucide-react';

export const AdminPaymentLinks: React.FC = () => {
  const { paymentLinks, addPaymentLink, deletePaymentLink } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<'Revolut' | 'Wero' | 'PayPal' | 'Lydia' | 'Stripe' | 'BankTransfer' | 'Custom'>('Revolut');
  const [url, setUrl] = useState('https://revolut.me/shsnhouse');
  const [beneficiaryName, setBeneficiaryName] = useState('Soraya (Code Violet)');
  const [amount, setAmount] = useState(50);
  const [description, setDescription] = useState('');
  const [paymentInstructions, setPaymentInstructions] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addPaymentLink({
      name,
      platform,
      url,
      beneficiaryName,
      amount: Number(amount),
      description,
      paymentInstructions,
      qrCodeUrl: qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(url),
      isActive: true,
    });
    setShowCreateModal(false);
    alert(`Lien de paiement "${name}" créé avec succès !`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Passerelles & Liens de Paiement Externe</h1>
          <p className="text-xs text-gray-500">
            Configurez les liens Revolut, Wero, PayPal ou RIB affichés aux membres pour le versement de leurs cotisations.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#F8D64E]" />
          <span>Ajouter un Lien de Paiement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentLinks.map((link) => (
          <div
            key={link.id}
            className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#F3EEFF] text-[#8F5DFF] font-black text-xs rounded-full">
                  {link.platform}
                </span>
                <span className="font-black text-[#8F5DFF] text-lg">{link.amount.toFixed(2)} €</span>
              </div>

              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">{link.name}</h3>
                <p className="text-xs text-gray-500 font-medium">Bénéficiaire : {link.beneficiaryName}</p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{link.paymentInstructions || link.description}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 font-mono text-[11px] text-gray-600 truncate">
                {link.url}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                link.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
              }`}>
                {link.isActive ? 'Actif 🟢' : 'Inactif ⚪'}
              </span>

              <button
                onClick={() => {
                  deletePaymentLink(link.id);
                  alert(`Lien "${link.name}" supprimé.`);
                }}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Supprimer ce lien"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create Link */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-extrabold text-gray-900 text-base">Créer une Passerelle de Paiement</h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nom du lien / Formule</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Revolut 50 € - Formule Sérénité"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Plateforme / Mode</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                  >
                    <option value="Revolut">Revolut</option>
                    <option value="Wero">Wero</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Lydia">Lydia</option>
                    <option value="Stripe">Stripe</option>
                    <option value="BankTransfer">Virement Bancaire (IBAN)</option>
                    <option value="Custom">Lien Personnalisé</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Montant Exigé (€)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">URL de paiement (ou IBAN / N° Wero)</label>
                <input
                  type="text"
                  required
                  placeholder="https://revolut.me/tontinescoffres"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Nom du Bénéficiaire</label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Instructions pour le membre</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Merci de mentionner votre nom et prénom en libellé de virement."
                  value={paymentInstructions}
                  onChange={(e) => setPaymentInstructions(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">URL Image du QR Code (Optionnel)</label>
                <input
                  type="text"
                  placeholder="Laissez vide pour générer automatiquement"
                  value={qrCodeUrl}
                  onChange={(e) => setQrCodeUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-100 font-bold rounded-xl text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8F5DFF] text-white font-extrabold rounded-xl shadow-md"
                >
                  Enregistrer le Lien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
