import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, CreditCard, Calendar, MessageSquare, FileText, 
  Crown, ShieldCheck, ArrowLeft, Clock, ExternalLink, 
  Send, Lock, CheckCircle2, Download, Paperclip 
} from 'lucide-react';

interface TontineDetailProps {
  tontineId: string;
  onBack: () => void;
  onPayNow: (paymentLinkId: string, amount: number, tontineName: string) => void;
}

export const TontineDetail: React.FC<TontineDetailProps> = ({ tontineId, onBack, onPayNow }) => {
  const { tontines, payments, chatMessages, currentUser, sendChatMessage, paymentLinks } = useApp();
  const [activeTab, setActiveTab] = useState<'apercu' | 'paiements' | 'calendrier' | 'discussion' | 'membres' | 'documents'>('apercu');
  const [chatInput, setChatInput] = useState('');

  const tontine = tontines.find(t => t.id === tontineId) || tontines[0];
  const tontinePayments = payments.filter(p => p.tontineId === tontine.id);
  const tontineMessages = chatMessages.filter(m => m.channelId === tontine.id);

  const associatedLink = paymentLinks.find(l => l.id === tontine.paymentLinkId) || paymentLinks[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(tontine.id, chatInput);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Back Arrow */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3.5 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-2xl flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux tontines</span>
        </button>

        <span className="px-3 py-1 bg-[#F3EEFF] text-[#8F5DFF] text-xs font-black rounded-full border border-purple-200">
          {tontine.category}
        </span>
      </div>

      {/* Hero Card */}
      <div className="relative rounded-3xl bg-white border border-gray-100 shadow-md p-6 sm:p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={tontine.imageUrl}
              alt={tontine.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#F8D64E] shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900">{tontine.name}</h1>
                {tontine.orderLocked && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#F8D64E]" /> Ordre Définitif
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 max-w-xl mt-1 leading-relaxed">{tontine.description}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Montant du coffre</p>
              <p className="text-2xl font-black text-[#8F5DFF]">{tontine.totalPayoutAmount.toFixed(2)} €</p>
            </div>
            <button
              onClick={() => onPayNow(associatedLink.id, tontine.contributionAmount, tontine.name)}
              className="w-full sm:w-auto px-6 py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#8F5DFF]/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <CreditCard className="w-4 h-4 text-[#F8D64E]" />
              <span>Effectuer mon versement</span>
            </button>
          </div>
        </div>

        {/* 6 Tabs Header */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'apercu', label: 'Aperçu', icon: Users },
            { id: 'paiements', label: 'Paiements', icon: CreditCard },
            { id: 'calendrier', label: 'Calendrier', icon: Calendar },
            { id: 'discussion', label: 'Discussion', icon: MessageSquare },
            { id: 'membres', label: 'Membres', icon: Users },
            { id: 'documents', label: 'Documents', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#8F5DFF] text-white shadow-md shadow-[#8F5DFF]/20'
                    : 'bg-[#FAF8FF] text-gray-600 hover:bg-[#F3EEFF] hover:text-[#8F5DFF]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F8D64E]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'apercu' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-900 text-base">Règlement Particulier & Conditions</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {tontine.rules || "Les versement s'effectuent au plus tard le 5 de chaque mois. L'ordre de passage est verrouillé et audité. Les fonds sont distribués sous 24h après validation des cotisations."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs">
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px]">Cotisation</p>
                  <p className="font-extrabold text-gray-900 text-sm">{tontine.contributionAmount.toFixed(2)} €</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px]">Fréquence</p>
                  <p className="font-extrabold text-gray-900 text-sm">{tontine.frequency === 'monthly' ? 'Mensuelle' : 'Bimensuelle'}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px]">Paiement Prochain</p>
                  <p className="font-extrabold text-[#8F5DFF] text-sm">{tontine.nextPaymentDate}</p>
                </div>
              </div>
            </div>

            {/* Turn order highlight */}
            <div className="p-6 rounded-3xl bg-[#FAF8FF] border border-purple-100 space-y-3">
              <h3 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#F8D64E]" /> Votre Position : Numéro 6
              </h3>
              <p className="text-xs text-gray-600">
                Vous recevrez l'intégralité du cagnotte de <strong className="text-gray-900">500,00 €</strong> le <strong className="text-[#8F5DFF]">15 Novembre 2026</strong>. Plus que 18 jours avant votre échéance.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-gray-900 text-base">Lien de Paiement Associé</h3>
            <div className="p-4 rounded-2xl bg-[#F3EEFF]/60 border border-purple-200 text-xs space-y-2">
              <p className="font-extrabold text-gray-900">{associatedLink.name}</p>
              <p className="text-gray-600">{associatedLink.paymentInstructions}</p>
              <p className="font-mono bg-white p-2 rounded-xl border border-gray-200 text-[#8F5DFF] font-bold">
                {associatedLink.url}
              </p>
            </div>

            <button
              onClick={() => onPayNow(associatedLink.id, tontine.contributionAmount, tontine.name)}
              className="w-full py-3 px-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Ouvrir la passerelle de paiement</span>
              <ExternalLink className="w-4 h-4 text-[#F8D64E]" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'paiements' && (
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">Historique des Paiements de la Tontine</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                  <th className="py-3 px-2">Membre</th>
                  <th className="py-3 px-2">Montant</th>
                  <th className="py-3 px-2">Échéance</th>
                  <th className="py-3 px-2">Mode</th>
                  <th className="py-3 px-2">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tontinePayments.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-3 px-2 font-bold text-gray-900">{p.userName}</td>
                    <td className="py-3 px-2 font-black text-[#8F5DFF]">{p.amount.toFixed(2)} €</td>
                    <td className="py-3 px-2 text-gray-500">{p.dueDate}</td>
                    <td className="py-3 px-2 text-gray-600 font-mono">{p.paymentMethod}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        p.status === 'validated' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status === 'validated' ? '✅ Validé' : '🟡 En attente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'membres' && (
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">Membres et Ordre de Passage</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tontine.members.map(m => {
              const isMe = m.userId === currentUser.id;
              return (
                <div
                  key={m.userId}
                  className={`p-4 rounded-2xl border flex items-center justify-between ${
                    isMe ? 'bg-[#F3EEFF] border-[#8F5DFF]' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-black text-xs flex items-center justify-center">
                      #{m.orderPosition}
                    </span>
                    <img
                      src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={m.firstName}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-xs">{m.firstName} {m.lastName} {isMe && '(Vous)'}</p>
                      <p className="text-[10px] text-gray-400">Distribution : {m.estimatedPayoutDate}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 text-[10px] font-black rounded-full ${
                    m.status === 'served' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-[#8F5DFF]'
                  }`}>
                    {m.status === 'served' ? 'Servie' : 'En attente'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'discussion' && (
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">Chat de Groupe - {tontine.name}</h3>
          
          <div className="h-80 overflow-y-auto p-4 bg-[#FAF8FF] rounded-2xl space-y-3">
            {tontineMessages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs space-y-1 ${
                    isMe ? 'bg-[#8F5DFF] text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-xs'
                  }`}>
                    <p className="font-bold text-[10px] opacity-80">{msg.senderName}</p>
                    <p className="leading-relaxed">{msg.content}</p>
                    <p className="text-[9px] text-right opacity-60 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Écrire un message à la communauté..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs bg-gray-50 rounded-2xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white rounded-2xl text-xs font-bold shadow-xs flex items-center gap-1"
            >
              <span>Envoyer</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
