import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Shuffle, Lock, Unlock, ArrowUp, ArrowDown, Trash2, Edit, Crown, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminTontines: React.FC = () => {
  const { tontines, createTontine, shuffleTontineOrder, lockTontineOrder, paymentLinks } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTontineId, setSelectedTontineId] = useState(tontines[0]?.id || '');

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contribution, setContribution] = useState(50);
  const [maxMembers, setMaxMembers] = useState(8);
  const [frequency, setFrequency] = useState<'monthly' | 'biweekly'>('monthly');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [category, setCategory] = useState('Sérénité');
  const [paymentLinkId, setPaymentLinkId] = useState(paymentLinks[0]?.id || '');

  const activeTontine = tontines.find(t => t.id === selectedTontineId) || tontines[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createTontine({
      name,
      description,
      contributionAmount: Number(contribution),
      maxMembers: Number(maxMembers),
      frequency,
      startDate,
      category,
      paymentLinkId,
    });
    setShowCreateModal(false);
    alert(`Nouvelle tontine "${name}" créée avec succès !`);
  };

  const handleShuffle = () => {
    shuffleTontineOrder(activeTontine.id);
    confetti({ particleCount: 70, spread: 60 });
    alert(`L'ordre de passage de la tontine "${activeTontine.name}" a été tiré au sort avec succès !`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Gestion des Tontines & Tirage au Sort</h1>
          <p className="text-xs text-gray-500">Créez de nouvelles formules, attribuez l'ordre des tours et verrouillez les plannings.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#F8D64E]" />
          <span>Créer une Tontine</span>
        </button>
      </div>

      {/* Select active tontine pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tontines.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTontineId(t.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              t.id === activeTontine.id
                ? 'bg-[#8F5DFF] text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t.name} ({t.currentMembersCount}/{t.maxMembers})
          </button>
        ))}
      </div>

      {/* Tontine Detail & Order Management Card */}
      {activeTontine && (
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-gray-900 text-lg">{activeTontine.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F3EEFF] text-[#8F5DFF] text-[10px] font-extrabold">
                  {activeTontine.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{activeTontine.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                disabled={activeTontine.orderLocked}
                className={`px-4 py-2 bg-[#F8D64E] text-[#111827] font-extrabold text-xs rounded-2xl shadow-xs flex items-center gap-1.5 ${
                  activeTontine.orderLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-400'
                }`}
              >
                <Shuffle className="w-4 h-4" />
                <span>Tirage au Sort Aléatoire</span>
              </button>

              <button
                onClick={() => lockTontineOrder(activeTontine.id)}
                className={`px-4 py-2 text-xs font-bold rounded-2xl flex items-center gap-1.5 ${
                  activeTontine.orderLocked
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200 hover:bg-rose-200'
                }`}
              >
                {activeTontine.orderLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                <span>{activeTontine.orderLocked ? 'Ordre Verrouillé' : 'Verrouiller l\'Ordre'}</span>
              </button>
            </div>
          </div>

          {/* Members & Positions Table */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-gray-900 text-sm">Ordre de Passage des Participants</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                    <th className="py-2.5 px-3">Position</th>
                    <th className="py-2.5 px-3">Membre</th>
                    <th className="py-2.5 px-3">Montant à recevoir</th>
                    <th className="py-2.5 px-3">Date estimée de versement</th>
                    <th className="py-2.5 px-3">Statut tour</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activeTontine.members.map((m) => (
                    <tr key={m.userId} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-mono font-black text-[#8F5DFF] text-sm">
                        #{m.orderPosition}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                            alt={m.firstName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="font-bold text-gray-900">{m.firstName} {m.lastName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-black text-gray-900">{activeTontine.totalPayoutAmount.toFixed(2)} €</td>
                      <td className="py-3 px-3 text-gray-600 font-medium">{m.estimatedPayoutDate}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          m.status === 'served' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-[#8F5DFF]'
                        }`}>
                          {m.status === 'served' ? '🟢 Déjà servie' : '⏳ En attente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Create Tontine */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 space-y-4">
            <h3 className="font-extrabold text-gray-900 text-base">Créer une Nouvelle Formule Tontine</h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nom de la Tontine</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Tontine Premium 100 €"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Formule d'épargne rotative..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Montant Cotisation (€)</label>
                  <input
                    type="number"
                    required
                    value={contribution}
                    onChange={(e) => setContribution(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Nombre Max de Membres</label>
                  <input
                    type="number"
                    required
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Fréquence</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                  >
                    <option value="monthly">Mensuelle</option>
                    <option value="biweekly">Bimensuelle</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Date de démarrage</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Lien de Paiement Associé</label>
                <select
                  value={paymentLinkId}
                  onChange={(e) => setPaymentLinkId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
                >
                  {paymentLinks.map(l => (
                    <option key={l.id} value={l.id}>{l.name} ({l.amount} € - {l.platform})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold rounded-xl text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold rounded-xl shadow-md"
                >
                  Créer la Tontine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
