import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Folder, MessageSquare, CreditCard, Users, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { tontines, payments, chatMessages, ebooks, users, setSelectedTontineId, setActiveMemberTab } = useApp();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredTontines = tontines.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));
  const filteredPayments = payments.filter(p => p.tontineName.toLowerCase().includes(query.toLowerCase()) || p.amount.toString().includes(query));
  const filteredMessages = chatMessages.filter(m => m.content.toLowerCase().includes(query.toLowerCase()));
  const filteredEbooks = ebooks.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelectTontine = (id: string) => {
    setSelectedTontineId(id);
    setActiveMemberTab('tontine_detail');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#8F5DFF]/20 overflow-hidden"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-[#FAF8FF]">
            <Search className="w-5 h-5 text-[#8F5DFF]" />
            <input
              type="text"
              autoFocus
              placeholder="Rechercher des tontines, paiements, messages, documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base font-medium text-gray-900 bg-transparent outline-hidden placeholder:text-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-xs font-bold rounded-xl text-gray-700">
              ESC
            </button>
          </div>

          {/* Results Container */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {!query ? (
              <div className="text-center py-8 text-xs text-gray-400">
                Saisissez un terme de recherche pour retrouver n'importe quelle donnée transactionnelle ou communautaire.
              </div>
            ) : (
              <>
                {/* Tontines */}
                {filteredTontines.length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-[#8F5DFF]" /> Tontines ({filteredTontines.length})
                    </h5>
                    <div className="space-y-1">
                      {filteredTontines.map(t => (
                        <div
                          key={t.id}
                          onClick={() => handleSelectTontine(t.id)}
                          className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-[#F3EEFF] cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                            <p className="text-xs text-gray-500">{t.contributionAmount} € • {t.currentMembersCount}/{t.maxMembers} membres</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#8F5DFF]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payments */}
                {filteredPayments.length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#8F5DFF]" /> Paiements ({filteredPayments.length})
                    </h5>
                    <div className="space-y-1">
                      {filteredPayments.map(p => (
                        <div key={p.id} className="p-3 rounded-2xl bg-gray-50 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-gray-900">{p.tontineName} - {p.amount.toFixed(2)} €</p>
                            <p className="text-gray-500">{p.dueDate} • Status: {p.status}</p>
                          </div>
                          <span className="font-mono text-gray-400">{p.paymentMethod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {filteredMessages.length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#8F5DFF]" /> Messages ({filteredMessages.length})
                    </h5>
                    <div className="space-y-1">
                      {filteredMessages.map(m => (
                        <div key={m.id} className="p-3 rounded-2xl bg-gray-50 text-xs">
                          <p className="font-bold text-gray-900">{m.senderName}:</p>
                          <p className="text-gray-600 line-clamp-1">{m.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
