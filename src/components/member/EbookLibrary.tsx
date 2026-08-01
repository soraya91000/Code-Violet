import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Download, Lock, ShieldCheck, Eye, Star, ChevronRight, CheckCircle2 } from 'lucide-react';

export const EbookLibrary: React.FC = () => {
  const { ebooks, currentUser, toggleUserEbookAccess } = useApp();
  const [selectedEbook, setSelectedEbook] = useState<any | null>(null);

  const mainEbook = ebooks[0];
  const hasAccess = currentUser.hasEbookAccess;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Bibliothèque Ebook & Formations</h1>
        <p className="text-xs text-gray-500">
          Guide complet pour maîtriser l'épargne rotative, la budgétisation et le développement de patrimoine.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-md flex flex-col md:flex-row items-center gap-8">
        {/* Book Cover */}
        <div className="relative w-48 h-64 rounded-2xl overflow-hidden shadow-xl border-2 border-[#F8D64E] shrink-0">
          <img
            src={mainEbook.coverUrl}
            alt={mainEbook.title}
            className="w-full h-full object-cover"
          />
          {!hasAccess && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center">
              <Lock className="w-8 h-8 text-[#F8D64E] mb-2" />
              <p className="font-extrabold text-xs">Accès Réservé</p>
              <p className="text-[10px] text-gray-300">Inclus avec la Formule Sérénité ou Pack Ebook</p>
            </div>
          )}
        </div>

        {/* Info & Description */}
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EEFF] text-[#8F5DFF] text-xs font-black rounded-full">
            <BookOpen className="w-3.5 h-3.5" /> Ebook Exclusif • {mainEbook.pagesCount} pages
          </div>

          <h2 className="text-2xl font-black text-gray-900">{mainEbook.title}</h2>
          <p className="text-xs text-gray-400 font-bold">Auteur : {mainEbook.author}</p>
          <p className="text-xs text-gray-600 leading-relaxed">{mainEbook.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 bg-[#FAF8FF] rounded-2xl border border-purple-50">
              <span className="text-gray-400 font-bold text-[10px] block">Lectures</span>
              <span className="font-black text-gray-900">{mainEbook.viewsCount} membres</span>
            </div>
            <div className="p-3 bg-[#FAF8FF] rounded-2xl border border-purple-50">
              <span className="text-gray-400 font-bold text-[10px] block">Téléchargements</span>
              <span className="font-black text-gray-900">{mainEbook.downloadsCount} PDF</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 col-span-2 sm:col-span-1">
              <span className="text-gray-400 font-bold text-[10px] block">Note Communauté</span>
              <span className="font-black text-amber-900">4.9 / 5 ⭐</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            {hasAccess ? (
              <>
                <button
                  onClick={() => setSelectedEbook(mainEbook)}
                  className="px-6 py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#8F5DFF]/20 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#F8D64E]" />
                  <span>Lire en ligne</span>
                </button>
                <button
                  onClick={() => alert('Téléchargement du PDF démarré.')}
                  className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-xs rounded-2xl shadow-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#8F5DFF]" />
                  <span>Télécharger PDF</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  toggleUserEbookAccess(currentUser.id);
                  alert('Accès Ebook débloqué !');
                }}
                className="px-6 py-3 bg-[#F8D64E] hover:bg-amber-400 text-black font-extrabold text-xs rounded-2xl shadow-md flex items-center gap-2"
              >
                <span>Débloquer mon accès Ebook</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reader Modal Simulation */}
      {selectedEbook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-gray-900 text-base">{selectedEbook.title}</h3>
              <button onClick={() => setSelectedEbook(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 bg-[#FAF8FF] rounded-2xl border border-purple-100 text-xs text-gray-700 space-y-4 leading-relaxed">
              <h4 className="font-bold text-sm text-[#8F5DFF]">Chapitre 1 : Les Fondements de l'Épargne Collective</h4>
              <p>
                La tontine est un mécanisme millénaire d'entraide financière. En cotisant une somme régulière avec des personnes de confiance, vous créez un effet de levier puissant sans recourir au crédit bancaire.
              </p>
              <h4 className="font-bold text-sm text-[#8F5DFF]">Chapitre 2 : Optimiser vos Réception de Tours</h4>
              <p>
                Utilisez votre versement global (500 € ou 1200 €) de manière ciblée : achat de stocks professionnels, remboursement de dettes à fort taux, ou investissement dans une épargne d'urgence.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
