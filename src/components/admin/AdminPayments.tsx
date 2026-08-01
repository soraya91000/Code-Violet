import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, CheckCircle2, XCircle, AlertTriangle, Plus, Send, Download, Filter } from 'lucide-react';

export const AdminPayments: React.FC = () => {
  const { payments, validatePayment, refusePayment, recordManualPayment, tontines, users } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual payment form
  const [userId, setUserId] = useState(users[0]?.id || '');
  const [tontineId, setTontineId] = useState(tontines[0]?.id || '');
  const [amount, setAmount] = useState(50);
  const [method, setMethod] = useState('Virement Bancaire');
  const [ref, setRef] = useState('');

  const filtered = payments.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    return true;
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.id === userId);
    const tontine = tontines.find(t => t.id === tontineId);

    recordManualPayment({
      userId,
      userName: user ? `${user.firstName} ${user.lastName}` : 'Membre',
      tontineId,
      tontineName: tontine ? tontine.name : 'Tontine',
      amount: Number(amount),
      dueDate: new Date().toISOString().split('T')[0],
      paymentMethod: method,
      proofReference: ref || 'MANUAL-ADMIN',
      installmentNumber: 1,
      totalInstallments: 10,
    });

    setShowManualModal(false);
    alert('Versement manuel enregistré et validé !');
  };

  const sendGlobalReminders = () => {
    const lateCount = payments.filter(p => p.status === 'late').length;
    alert(`Relances envoyées par SMS et Email à ${lateCount || 1} membre(s) ayant un retard de versement.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Gestion Master des Paiements</h1>
          <p className="text-xs text-gray-500">Validez les cotisations déclarées, enregistrez des versements guichet et relancez les retards.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={sendGlobalReminders}
            className="px-4 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-extrabold text-xs rounded-2xl flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Envoyer Relances SMS / Email</span>
          </button>
          <button
            onClick={() => setShowManualModal(true)}
            className="px-4 py-2.5 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#F8D64E]" />
            <span>Saisir un Versement Guichet</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-[#FAF8FF] p-1.5 rounded-2xl border border-purple-100 overflow-x-auto">
        {[
          { id: 'all', label: `Tous (${payments.length})` },
          { id: 'pending_validation', label: 'En attente 🟡' },
          { id: 'validated', label: 'Validés 🟢' },
          { id: 'upcoming', label: 'À venir ⏳' },
          { id: 'late', label: 'Retards ⚠️' },
          { id: 'refused', label: 'Refusés ❌' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              filter === tab.id ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-3">Membre</th>
                <th className="py-3 px-3">Tontine</th>
                <th className="py-3 px-3">Montant</th>
                <th className="py-3 px-3">Échéance</th>
                <th className="py-3 px-3">Méthode & Réf</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3 text-right">Actions Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-3 font-bold text-gray-900">{p.userName}</td>
                  <td className="py-3.5 px-3 text-gray-700 font-medium">{p.tontineName}</td>
                  <td className="py-3.5 px-3 font-black text-[#8F5DFF]">{p.amount.toFixed(2)} €</td>
                  <td className="py-3.5 px-3 text-gray-500">{p.dueDate}</td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-gray-900">{p.paymentMethod}</p>
                    {p.proofReference && <p className="text-[10px] font-mono text-purple-700">{p.proofReference}</p>}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      p.status === 'validated'
                        ? 'bg-emerald-100 text-emerald-800'
                        : p.status === 'pending_validation'
                        ? 'bg-amber-100 text-amber-900'
                        : p.status === 'late'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    {p.status === 'pending_validation' && (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => validatePayment(p.id, 'Fatou Diallo (Admin)')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-xs"
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => refusePayment(p.id, 'Preuve non lisible')}
                          className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-lg text-xs"
                        >
                          Refuser
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Record Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 space-y-4">
            <h3 className="font-extrabold text-gray-900 text-base">Saisir un Versement Guichet / Manuel</h3>

            <form onSubmit={handleManualSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Sélectionner le Membre</label>
                <select
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                >
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.firstName} {u.lastName} ({u.email})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Sélectionner la Tontine</label>
                <select
                  value={tontineId}
                  onChange={(e) => setTontineId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                >
                  {tontines.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.contributionAmount} €)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Montant Versé (€)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mode de paiement</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                  >
                    <option value="Virement Bancaire">Virement Bancaire</option>
                    <option value="Espèces / Guichet">Espèces / Guichet</option>
                    <option value="Revolut">Revolut</option>
                    <option value="Wero">Wero</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Référence / Numéro de reçu</label>
                <input
                  type="text"
                  placeholder="Ex: REC-8890"
                  value={ref}
                  onChange={(e) => setRef(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 bg-gray-100 font-bold rounded-xl text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8F5DFF] text-white font-extrabold rounded-xl shadow-md"
                >
                  Enregistrer & Validé
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
