import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Eye, Download, CheckCircle2, ShieldCheck, FileText, Sparkles } from 'lucide-react';

export const AdminEbooks: React.FC = () => {
  const { ebooks, addEbook, users, toggleUserEbookAccess } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Fatou Diallo');
  const [description, setDescription] = useState('');

  const handleAddEbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addEbook({
      title,
      author,
      description: description || 'Guide complet d\'éducation financière et d\'épargne collective.',
      coverUrl: 'https://image.noelshack.com/fichiers/2026/32/1/1785708347-e8909f30-5565-417b-a872-ad5bb85375db.jpg',
      pdfUrl: '#',
      pagesCount: 84,
    });
    setShowAddModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-[#F8D64E] text-slate-900 text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs inline-block">
              BIBLIOTHÈQUE DIGITALE ADMIN
            </span>
            <h1 className="text-2xl sm:text-3xl font-light">
              Gestion des <span className="font-extrabold text-[#F8D64E]">Ebooks & Documents</span>
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
              Publiez de nouveaux guides, suivez les téléchargements et contrôlez les droits d'accès des membres.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-3 bg-[#8F5DFF] hover:bg-purple-600 text-white font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un Ebook</span>
          </button>
        </div>
      </div>

      {/* Ebooks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ebooks.map((ebook) => (
          <div key={ebook.id} className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-36 h-48 bg-[#120B2E] rounded-2xl border border-slate-200 shrink-0 flex items-center justify-center p-1">
              <img 
                src={ebook.coverUrl} 
                alt={ebook.title} 
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#8F5DFF] uppercase tracking-wider">Guide Officiel</span>
                <h3 className="font-extrabold text-slate-900 text-base">{ebook.title}</h3>
                <p className="text-xs text-slate-500">Par {ebook.author}</p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">{ebook.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-purple-600" /> {ebook.viewsCount} vues
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-emerald-600" /> {ebook.downloadsCount} téléch.
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Access Control List for Members */}
      <div className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#8F5DFF]" />
          Accès aux Ebooks par Membre
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Membre</th>
                <th className="py-2.5 px-3">Statut Ebook</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 px-3 font-bold text-slate-900">{u.firstName} {u.lastName}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.hasEbookAccess ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {u.hasEbookAccess ? '✓ Accès Intégral Débloqué' : 'Non Inclus'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => toggleUserEbookAccess(u.id)}
                      className="text-xs font-bold text-[#8F5DFF] hover:underline"
                    >
                      {u.hasEbookAccess ? 'Révoquer Accès' : 'Débloquer Accès'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Ebook */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddEbook} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8F5DFF]" />
                Publier un Nouveau Guide Digital
              </h4>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Titre de l'Ebook</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Le Guide Ultime des Tontines Modernes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Auteur / Formatrice</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Résumé du contenu pédagogique..."
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#8F5DFF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">Annuler</button>
              <button type="submit" className="px-4 py-2 bg-[#8F5DFF] text-white font-bold rounded-xl text-xs shadow-md">Publier l'Ebook</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
