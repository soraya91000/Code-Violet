import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, CheckCircle2, MessageSquare, Clock, User, ShieldCheck } from 'lucide-react';

export const AdminSupport: React.FC = () => {
  const { supportTickets, replyToSupportTicket } = useApp();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(supportTickets[0]?.id || null);
  const [replyText, setReplyText] = useState('');

  const activeTicket = supportTickets.find(t => t.id === selectedTicketId) || supportTickets[0];

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !activeTicket) return;
    replyToSupportTicket(activeTicket.id, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Centre d'Assistance & Tickets Admin</h1>
        <p className="text-xs text-gray-500">Répondez aux questions des membres et validez les demandes de support en direct.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3">
          <h3 className="font-extrabold text-gray-900 text-sm">Tickets des Membres ({supportTickets.length})</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {supportTickets.map(t => (
              <div
                key={t.id}
                onClick={() => setSelectedTicketId(t.id)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  t.id === activeTicket?.id
                    ? 'bg-[#F3EEFF] border-[#8F5DFF] shadow-xs'
                    : 'bg-white hover:bg-gray-50 border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-gray-900 truncate">{t.userName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                    t.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-[#8F5DFF]'
                  }`}>
                    {t.status === 'resolved' ? 'Résolu' : 'En cours'}
                  </span>
                </div>
                <p className="font-bold text-gray-800 text-xs truncate">{t.subject}</p>
                <p className="text-[10px] text-gray-400 mt-1">{t.createdAt} • Catégorie: {t.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Ticket Conversation */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col h-[650px]">
          {activeTicket ? (
            <>
              <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-gray-900 text-base">{activeTicket.subject}</h3>
                  <p className="text-xs text-gray-500">
                    Membre : <strong className="text-gray-900">{activeTicket.userName}</strong> • Ticket #{activeTicket.id}
                  </p>
                </div>

                <span className="px-3 py-1 bg-[#F3EEFF] text-[#8F5DFF] font-black text-xs rounded-full">
                  {activeTicket.category}
                </span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-4 bg-[#FAF8FF] rounded-2xl my-4 space-y-3">
                {activeTicket.messages.map(m => (
                  <div key={m.id} className={`flex ${m.isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      m.isAdmin
                        ? 'bg-[#8F5DFF] text-white rounded-br-none shadow-xs'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-xs'
                    }`}>
                      <p className="font-bold text-[10px] opacity-80">{m.senderName} {m.isAdmin && '🛡️ (Admin)'}</p>
                      <p className="leading-relaxed">{m.content}</p>
                      <p className="text-[9px] text-right opacity-60 mt-1">{m.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleReply} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Écrire une réponse officielle en tant qu'Admin..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-4 py-3 text-xs bg-gray-50 rounded-2xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold rounded-2xl text-xs shadow-md flex items-center gap-1.5"
                >
                  <span>Répondre</span>
                  <Send className="w-4 h-4 text-[#F8D64E]" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-xs text-gray-400">
              Sélectionnez un ticket pour afficher les échanges.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
