import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderCheck, FileText, Download, ShieldCheck, Search, Filter, Lock } from 'lucide-react';

export const DocumentVault: React.FC = () => {
  const { currentUser } = useApp();
  const [query, setQuery] = useState('');

  const documents = [
    {
      id: 'doc_1',
      title: 'Récépissé de Versement Tour #7 - Tontine Sérénité',
      type: 'Reçu de paiement',
      date: '04 Juillet 2026',
      size: '1.2 Mo',
      verified: true,
    },
    {
      id: 'doc_2',
      title: 'Contrat d\'Engagement & Règlement Particulier',
      type: 'Contrat d\'adhésion',
      date: '12 Janvier 2026',
      size: '2.4 Mo',
      verified: true,
    },
    {
      id: 'doc_3',
      title: 'Attestation de Garantie du Coffre-Fort',
      type: 'Certificat de Sécurité',
      date: '15 Mai 2026',
      size: '850 Ko',
      verified: true,
    },
    {
      id: 'doc_4',
      title: 'Facture d\'Adhésion Offre Pack Ebook',
      type: 'Facture officielle',
      date: '12 Janvier 2026',
      size: '1.1 Mo',
      verified: true,
    }
  ];

  const filtered = documents.filter(d => d.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Coffre-Fort Documentaire</h1>
          <p className="text-xs text-gray-500">Stockage hautement sécurisé de vos contrats, factures, récépissés et attestations.</p>
        </div>

        <div className="relative max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-2xl border border-gray-200 outline-hidden"
          />
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-3">Document</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Date d'archivage</th>
                <th className="py-3 px-3">Taille</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#F3EEFF] text-[#8F5DFF] rounded-xl">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{doc.title}</p>
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Horodaté & Authentifié
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-gray-600 font-semibold">{doc.type}</td>
                  <td className="py-3.5 px-3 text-gray-500">{doc.date}</td>
                  <td className="py-3.5 px-3 text-gray-400 font-mono">{doc.size}</td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => alert(`Téléchargement de : ${doc.title}`)}
                      className="px-3 py-1.5 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 ml-auto"
                    >
                      <Download className="w-3.5 h-3.5 text-[#F8D64E]" />
                      <span>Télécharger</span>
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
