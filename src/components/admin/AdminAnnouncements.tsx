import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, Plus, Pin, Send, Bell, CheckCircle2, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { AnnouncementPriority } from '../../types';

export const AdminAnnouncements: React.FC = () => {
  const { announcements, publishAnnouncement, sendNotificationToUser, users } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<AnnouncementPriority>('important');
  const [isPinned, setIsPinned] = useState(true);
  const [pushSent, setPushSent] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    publishAnnouncement({
      title,
      content,
      priority,
      isPinned,
      authorName: 'Fatou Diallo (Admin)',
    });

    // Send push notification to all users
    users.forEach(u => {
      sendNotificationToUser(u.id, `📢 ${title}`, content, 'announcement');
    });

    setPushSent(true);
    setTimeout(() => setPushSent(false), 3000);
    setShowAddModal(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {pushSent && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">Annonce publiée & Push envoyé à toutes les membres !</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-[#F8D64E] text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs inline-block">
              COMMUNICATION & ANNONCES
            </span>
            <h1 className="text-2xl sm:text-3xl font-light">
              Diffusion d'<span className="font-extrabold text-[#F8D64E]">Annonces & Notifications Push</span>
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
              Communiquez avec la communauté TONTINES COFFRES, épinglez les rappels de tirage et envoyez des notifications en direct.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-3 bg-[#8F5DFF] hover:bg-purple-600 text-white font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Créer une Annonce</span>
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div 
            key={ann.id}
            className={`p-6 rounded-[32px] bg-white border space-y-3 shadow-sm relative overflow-hidden ${
              ann.isPinned ? 'border-[#8F5DFF] bg-gradient-to-r from-purple-50/40 via-white to-white' : 'border-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {ann.isPinned && (
                  <span className="px-2.5 py-0.5 bg-[#8F5DFF] text-white text-[10px] font-black rounded-full flex items-center gap-1">
                    <Pin className="w-3 h-3" /> ÉPINGLÉE
                  </span>
                )}
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  ann.priority === 'urgent' ? 'bg-rose-100 text-rose-700' :
                  ann.priority === 'important' ? 'bg-amber-100 text-amber-800' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {ann.priority}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">{ann.publishedDate}</span>
            </div>

            <h3 className="font-extrabold text-slate-900 text-base">{ann.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold">
              <span>Rédigé par : {ann.authorName}</span>
              <span className="text-emerald-600"> Envoyé par Push & Notifications In-App</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handlePublish} className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#8F5DFF]" />
                Publier une Nouvelle Annonce Officielle
              </h4>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Titre de l'annonce</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 🎉 Tirage au Sort de la Tontine Sérénité effectué !"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Priorité d'affichage</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                >
                  <option value="info">Info Générale</option>
                  <option value="important">Important (Mise en avant)</option>
                  <option value="urgent">Urgent (Bannière rouge)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Contenu du message</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Écrivez le message de l'annonce..."
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-[#8F5DFF] focus:ring-[#8F5DFF]"
                />
                <label htmlFor="pinCheck" className="font-bold text-slate-700">
                  Épingler en haut des canaux de discussion
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">Annuler</button>
              <button type="submit" className="px-4 py-2 bg-[#8F5DFF] text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Publier & Déclencher Push
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
