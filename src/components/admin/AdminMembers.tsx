import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShieldCheck, UserX, UserCheck, Mail, Phone, Filter, Crown } from 'lucide-react';

export const AdminMembers: React.FC = () => {
  const { users, toggleUserStatus } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'suspended'>('all');

  const filtered = users.filter(u => {
    if (filter === 'verified' && u.status !== 'verified') return false;
    if (filter === 'suspended' && u.status !== 'suspended') return false;
    if (query) {
      const q = query.toLowerCase();
      return u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Gestion des Membres & CRM</h1>
          <p className="text-xs text-gray-500">Supervisez la communauté des participantes, vérifiez les profils et réglez les accès.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl ${filter === 'all' ? 'bg-[#8F5DFF] text-white' : 'bg-white border text-gray-700'}`}
          >
            Tous ({users.length})
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl ${filter === 'verified' ? 'bg-[#8F5DFF] text-white' : 'bg-white border text-gray-700'}`}
          >
            Vérifiées 🟢
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs bg-white rounded-2xl border border-gray-200 outline-hidden"
        />
      </div>

      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-3">Membre</th>
                <th className="py-3 px-3">Coordonnées</th>
                <th className="py-3 px-3">Date d'inscription</th>
                <th className="py-3 px-3">Total Versé</th>
                <th className="py-3 px-3">Statut Profil</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatarUrl}
                        alt={user.firstName}
                        className="w-9 h-9 rounded-full object-cover border-2 border-purple-100"
                      />
                      <div>
                        <p className="font-extrabold text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-[10px] text-gray-400 font-mono">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="text-gray-900 font-medium">{user.email}</p>
                    <p className="text-[10px] text-gray-500">{user.phone}</p>
                  </td>
                  <td className="py-3.5 px-3 text-gray-500">{user.joinedDate}</td>
                  <td className="py-3.5 px-3 font-black text-[#8F5DFF]">{user.totalPaid.toFixed(2)} €</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      user.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {user.status === 'verified' ? 'Vérifiée 🟢' : 'Suspendue 🔴'}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1.5 font-bold rounded-xl text-xs ${
                        user.status === 'verified'
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {user.status === 'verified' ? 'Suspendre' : 'Activer'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
