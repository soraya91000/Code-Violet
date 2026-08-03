import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tontine, TontineStatus } from '../../types';
import { Users, Calendar, ArrowRight, ShieldCheck, Crown, Sparkles, Filter, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface MyTontinesProps {
  onSelectTontine: (tontineId: string) => void;
}

export const MyTontines: React.FC<MyTontinesProps> = ({ onSelectTontine }) => {
  const { tontines, currentUser, joinTontine } = useApp();
  const [filter, setFilter] = useState<'all' | 'my' | 'open'>('all');
  const [search, setSearch] = useState('');

  const getStatusBadge = (status: TontineStatus) => {
    switch (status) {
      case 'open':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">🟢 Ouverte</span>;
      case 'soon_full':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black">🟡 Bientôt complète</span>;
      case 'ongoing':
        return <span className="px-2.5 py-1 rounded-full bg-purple-100 text-[#8F5DFF] text-xs font-black">🔵 En cours</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-black">⚫ Terminée</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-black">Brouillon</span>;
    }
  };

  const filtered = tontines.filter(t => {
    const isMember = t.members.some(m => m.userId === currentUser.id);
    if (filter === 'my' && !isMember) return false;
    if (filter === 'open' && t.status !== 'open' && t.status !== 'soon_full') return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Mes Tontines</h1>
          <p className="text-xs text-gray-500">Retrouvez toutes les tontines auxquelles vous participez et découvrez les nouvelles offres.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-[#FAF8FF] p-1.5 rounded-2xl border border-purple-100">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
              filter === 'all' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Toutes ({tontines.length})
          </button>
          <button
            onClick={() => setFilter('my')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
              filter === 'my' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mes Tontines (1)
          </button>
          <button
            onClick={() => setFilter('open')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
              filter === 'open' ? 'bg-[#8F5DFF] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Ouvertes aux inscriptions
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Rechercher une tontine par nom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs bg-white rounded-2xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
        />
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tontine) => {
          const isMember = tontine.members.some(m => m.userId === currentUser.id);
          const remainingSpots = tontine.maxMembers - tontine.currentMembersCount;

          return (
            <motion.div
              key={tontine.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-purple-200 transition-all"
            >
              <div>
                {/* Image & Status Tag */}
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <img
                    src={tontine.imageUrl}
                    alt={tontine.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(tontine.status)}
                  </div>
                  {isMember && (
                    <div className="absolute top-3 right-3 bg-[#F8D64E] text-[#111827] text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Crown className="w-3 h-3 text-[#111827]" /> Inscrite
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-black text-gray-900">{tontine.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{tontine.description}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="p-2.5 rounded-2xl bg-[#FAF8FF] border border-purple-50">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Cotisation</p>
                      <p className="font-black text-[#8F5DFF] text-sm">{tontine.contributionAmount.toFixed(2)} €</p>
                      <p className="text-[10px] text-gray-500">/ versement</p>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-amber-50/50 border border-amber-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Capital Reçu</p>
                      <p className="font-black text-gray-900 text-sm">{tontine.totalPayoutAmount.toFixed(2)} €</p>
                      <p className="text-[10px] text-gray-500">au moment du tour</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Users className="w-3.5 h-3.5 text-[#8F5DFF]" /> Participantes
                      </span>
                      <span className="font-bold text-gray-900">{tontine.currentMembersCount} / {tontine.maxMembers}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-[#8F5DFF]" /> Date de début
                      </span>
                      <span className="font-bold text-gray-900">{tontine.startDate}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-1">
                      <span>Remplissage</span>
                      <span>{Math.round((tontine.currentMembersCount / tontine.maxMembers) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#8F5DFF] to-[#F8D64E] rounded-full"
                        style={{ width: `${(tontine.currentMembersCount / tontine.maxMembers) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => onSelectTontine(tontine.id)}
                  className="w-full py-3 px-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-md shadow-[#8F5DFF]/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <span>Consulter la tontine</span>
                  <ArrowRight className="w-4 h-4 text-[#F8D64E]" />
                </button>

                {!isMember && tontine.status === 'open' && (
                  <button
                    onClick={() => {
                      joinTontine(tontine.id);
                      alert(`Félicitations ! Vous avez rejoint la ${tontine.name}.`);
                    }}
                    className="py-3 px-3 bg-[#F8D64E] hover:bg-amber-400 text-[#111827] font-extrabold text-xs rounded-2xl shadow-xs shrink-0"
                    title="Rejoindre immédiatement"
                  >
                    Rejoindre
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
