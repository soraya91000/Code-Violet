import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Package, Plus, CheckCircle2, ShieldCheck, Edit3, Trash2, Link2, Sparkles, BookOpen } from 'lucide-react';

export const AdminOffers: React.FC = () => {
  const { offers, addOffer, updateOffer, paymentLinks } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOffer, setNewOffer] = useState({
    name: '',
    price: 50,
    description: '',
    benefits: ['Accès Tontine 50€/mois', 'Support Prioritaire VIP', 'Coffre-fort Documentaire'],
    paymentLinkId: paymentLinks[0]?.id || '',
    isEbookIncluded: true,
    isHighlighted: false,
    status: 'active' as const,
  });

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.name) return;
    addOffer({
      ...newOffer,
      benefits: newOffer.benefits.filter(Boolean),
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-[#F8D64E] text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs inline-block">
              PANNEAU OFFRES & CATALOE
            </span>
            <h1 className="text-2xl sm:text-3xl font-light">
              Gestion des <span className="font-extrabold text-[#F8D64E]">Formules & Packs</span>
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
              Configurez les abonnements, tarifs, cagnottes associées et avantages réservés aux membres TONTINES COFFRES.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-3 bg-[#8F5DFF] hover:bg-purple-600 text-white font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une Formule</span>
          </button>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div 
            key={offer.id}
            className={`p-6 rounded-[32px] bg-white border space-y-4 shadow-sm relative overflow-hidden ${
              offer.isHighlighted ? 'border-[#8F5DFF] ring-2 ring-[#8F5DFF]/20' : 'border-slate-100'
            }`}
          >
            {offer.isHighlighted && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-[#F8D64E] text-slate-900 font-black text-[9px] uppercase tracking-wider rounded-full">
                FORMULE VEDETTE ⭐
              </span>
            )}

            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-lg">{offer.name}</h3>
              <p className="text-xs text-slate-500">{offer.description}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl flex items-baseline justify-between">
              <span className="text-xs text-slate-500 font-bold">Tarif mensuel</span>
              <span className="text-2xl font-black text-[#8F5DFF]">{offer.price.toFixed(2)} €</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700">Avantages inclus :</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {offer.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
                {offer.isEbookIncluded && (
                  <li className="flex items-center gap-2 text-[#8F5DFF] font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-[#8F5DFF] shrink-0" />
                    <span>Guide Épargne & Ebook offert</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                offer.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {offer.status === 'active' ? '● Actif au catalogue' : 'Indisponible'}
              </span>

              <button
                onClick={() => {
                  updateOffer({
                    ...offer,
                    status: offer.status === 'active' ? 'inactive' : 'active',
                  });
                }}
                className="text-xs font-bold text-[#8F5DFF] hover:underline"
              >
                Changer statut
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Offer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateOffer} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-[#8F5DFF]" />
                Nouvelle Formule d'Épargne
              </h4>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Nom de la formule</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Formule Privilège 150 €"
                  value={newOffer.name}
                  onChange={(e) => setNewOffer(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Prix mensuel (€)</label>
                <input
                  type="number"
                  required
                  value={newOffer.price}
                  onChange={(e) => setNewOffer(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Description court</label>
                <textarea
                  rows={2}
                  value={newOffer.description}
                  onChange={(e) => setNewOffer(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Formule d'épargne avec suivi personnalisé..."
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">Annuler</button>
              <button type="submit" className="px-4 py-2 bg-[#8F5DFF] text-white font-bold rounded-xl text-xs shadow-md">Enregistrer la Formule</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
