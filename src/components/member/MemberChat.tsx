import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, Paperclip, Smile, Pin, ShieldCheck, UserCheck, Bell, Sparkles } from 'lucide-react';

export const MemberChat: React.FC = () => {
  const { chatMessages, sendChatMessage, currentUser, announcements } = useApp();
  const [activeChannel, setActiveChannel] = useState<'general' | 'tontine_serenite' | 'annonces'>('general');
  const [messageInput, setMessageInput] = useState<string>('');

  const channels = [
    { id: 'general', name: '💬 Chat Général Communauté', desc: 'Échanges généraux entre membres' },
    { id: 'tontine_serenite', name: '🔒 Tontine Sérénité (Groupe Privé)', desc: 'Membres du cycle 50 €/mois' },
    { id: 'annonces', name: '📢 Annonces Officiel Admin', desc: 'Informations et rappels importants' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendChatMessage(activeChannel, messageInput.trim());
    setMessageInput('');
  };

  const channelMessages = chatMessages.filter(m => m.channelId === activeChannel || activeChannel === 'general');

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-[#8F5DFF] via-[#7B42FB] to-[#6024E0] text-white shadow-xl shadow-[#8F5DFF]/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="px-3 py-1 bg-[#F8D64E] text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs inline-block">
            ENTRAIDE & COMMUNAUTÉ SÉCURISÉE
          </span>
          <h1 className="text-2xl sm:text-3xl font-light">
            Espace de <span className="font-extrabold text-[#F8D64E]">Discussion & Chat</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
            Échangez en toute convivialité avec les membres de vos tontines et recevez les annonces officielles de l'administration.
          </p>
        </div>
      </div>

      {/* Main Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[500px]">
        {/* Channel Selector Sidebar */}
        <div className="lg:col-span-1 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider px-2">Canaux de Discussion</h3>
          <div className="space-y-1">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id as any)}
                className={`w-full text-left p-3 rounded-2xl transition-all text-xs ${
                  activeChannel === ch.id
                    ? 'bg-[#8F5DFF] text-white font-extrabold shadow-md shadow-[#8F5DFF]/20'
                    : 'hover:bg-purple-50 text-slate-700 font-bold'
                }`}
              >
                <p>{ch.name}</p>
                <p className={`text-[10px] ${activeChannel === ch.id ? 'text-purple-100' : 'text-slate-400'}`}>
                  {ch.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Pinned Announcement Box */}
          <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl space-y-2 pt-4">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#8F5DFF]">
              <Pin className="w-3.5 h-3.5" />
              <span>Annonce Épinglée</span>
            </div>
            {announcements[0] && (
              <div>
                <p className="text-xs font-bold text-slate-900">{announcements[0].title}</p>
                <p className="text-[10px] text-slate-500 line-clamp-3 mt-0.5">{announcements[0].content}</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Feed & Input */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Chat Feed */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[420px] flex-1">
            {channelMessages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-medium">
                Aucun message dans ce canal pour le moment. Soyez la première à écrire !
              </div>
            ) : (
              channelMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <img 
                      src={msg.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                      alt=""
                      className="w-8 h-8 rounded-full object-cover border border-purple-200 shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className={`max-w-md space-y-1 ${isMe ? 'items-end text-right' : 'items-start'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{msg.senderName}</span>
                        {msg.isAdminSender && (
                          <span className="px-1.5 py-0.2 bg-[#8F5DFF] text-white text-[9px] font-black rounded-full">
                            ADMIN 🛡️
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>

                      <div className={`p-3.5 rounded-2xl text-xs ${
                        isMe 
                          ? 'bg-[#8F5DFF] text-white rounded-tr-none font-medium shadow-xs' 
                          : 'bg-slate-100 text-slate-800 rounded-tl-none font-medium'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Écrivez votre message à la communauté..."
              className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-[#8F5DFF] shadow-2xs"
            />
            <button
              type="submit"
              className="p-3 bg-[#8F5DFF] hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
