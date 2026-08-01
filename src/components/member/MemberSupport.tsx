import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LifeBuoy, Send, MessageSquare, CheckCircle2, Clock, Phone, Mail, FileText } from 'lucide-react';

export const MemberSupport: React.FC = () => {
  const { supportTickets, currentUser, submitSupportTicket, replyToSupportTicket } = useApp();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'payment' | 'tontine' | 'account' | 'technical' | 'other'>('payment');
  const [message, setMessage] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(supportTickets[0]?.id || null);
  const [replyInput, setReplyInput] = useState('');

  const userTickets = supportTickets.filter(t => t.userId === currentUser.id);
  const activeTicket = userTickets.find(t => t.id === activeTicketId) || userTickets[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    submitSupportTicket(subject, category, message);
    setSubject('');
    setMessage('');
    alert('Votre demande d\'assistance a bien été transmise à notre équipe.');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput || !activeTicket) return;
    replyToSupportTicket(activeTicket.id, replyInput);
    setReplyInput('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Support Client & Assistance 7j/7</h1>
        <p className="text-xs text-gray-500">Posez vos questions ou soumettez un ticket à notre équipe de gestionnaires.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-[#F3EEFF] text-[#8F5DFF] rounded-2xl">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Téléphone Support</p>
            <p className="font-extrabold text-[#8F5DFF] text-sm">+33 1 89 00 12 34</p>
            <p className="text-[10px] text-gray-500">Du lundi au samedi 9h-19h</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-900 rounded-2xl">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Email Direct</p>
            <p className="font-extrabold text-gray-900 text-sm">support@tontines-coffres.com</p>
            <p className="text-[10px] text-gray-500">Réponse sous 2 heures</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Temps de Réponse</p>
            <p className="font-extrabold text-emerald-600 text-sm">&lt; 15 minutes</p>
            <p className="text-[10px] text-gray-500">Assistance prioritaire</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submit Ticket Form */}
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">Envoyer une Demande d'Assistance</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
              >
                <option value="payment">Paiement & Récépissé</option>
                <option value="tontine">Tontine & Ordre de passage</option>
                <option value="account">Vérification de compte</option>
                <option value="technical">Problème Technique</option>
                <option value="other">Autre demande</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Sujet de la demande</label>
              <input
                type="text"
                required
                placeholder="Ex: Confirmation de virement Revolut"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Message détaillé</label>
              <textarea
                rows={4}
                required
                placeholder="Décrivez votre question ou votre besoin..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Envoyer ma demande</span>
              <Send className="w-3.5 h-3.5 text-[#F8D64E]" />
            </button>
          </form>
        </div>

        {/* Tickets History & Active Chat */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">Historique des Demandes & Discussion Support</h3>

          {userTickets.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8">Aucun ticket en cours.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Tickets List */}
              <div className="space-y-2 border-r border-gray-100 pr-2">
                {userTickets.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setActiveTicketId(t.id)}
                    className={`p-3 rounded-2xl border text-xs cursor-pointer transition-colors ${
                      t.id === activeTicket?.id ? 'bg-[#F3EEFF] border-[#8F5DFF] font-bold' : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <p className="font-extrabold text-gray-900 truncate">{t.subject}</p>
                    <p className="text-[10px] text-gray-400">{t.createdAt}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-black ${
                      t.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-[#8F5DFF]'
                    }`}>
                      {t.status === 'resolved' ? 'Résolu' : 'En cours'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat Thread */}
              {activeTicket && (
                <div className="sm:col-span-2 flex flex-col h-80 bg-[#FAF8FF] rounded-2xl p-4">
                  <div className="pb-2 border-b border-gray-200">
                    <p className="font-extrabold text-gray-900 text-xs">{activeTicket.subject}</p>
                    <p className="text-[10px] text-gray-500">Ticket #{activeTicket.id}</p>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 py-3">
                    {activeTicket.messages.map(m => (
                      <div key={m.id} className={`flex ${m.isAdmin ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs p-3 rounded-2xl text-xs space-y-1 ${
                          m.isAdmin ? 'bg-white border border-purple-200 text-gray-800' : 'bg-[#8F5DFF] text-white'
                        }`}>
                          <p className="font-bold text-[10px] opacity-80">{m.senderName}</p>
                          <p>{m.content}</p>
                          <p className="text-[9px] text-right opacity-60">{m.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleReply} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Répondre au support..."
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white rounded-xl border border-gray-200 outline-hidden"
                    />
                    <button type="submit" className="px-3 py-2 bg-[#8F5DFF] text-white font-bold rounded-xl text-xs">
                      Envoyer
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
