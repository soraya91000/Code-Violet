import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, Trash2, X, CheckCircle, AlertTriangle, Info, Clock, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationDropdown: React.FC = () => {
  const { notifications, currentUser, unreadNotificationsCount, markNotificationRead, deleteNotification } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const userNotifs = notifications.filter(n => n.userId === currentUser.id);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'validation':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'refusal':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'turn':
        return <Clock className="w-4 h-4 text-[#8F5DFF]" />;
      default:
        return <Info className="w-4 h-4 text-[#8F5DFF]" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-[#8F5DFF] hover:border-[#8F5DFF]/40 shadow-xs transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-rose-500 text-white font-black text-[10px] rounded-full ring-2 ring-white animate-pulse">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900 text-sm">Centre de notifications</h4>
                  {unreadNotificationsCount > 0 && (
                    <span className="px-2 py-0.5 bg-[#F3EEFF] text-[#8F5DFF] font-extrabold text-xs rounded-full">
                      {unreadNotificationsCount} non lues
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 my-2">
                {userNotifs.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-xs">
                    Aucune notification pour le moment.
                  </div>
                ) : (
                  userNotifs.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-2xl transition-colors flex items-start gap-3 ${
                        n.isRead ? 'bg-white opacity-80' : 'bg-[#F3EEFF]/40 border-l-4 border-[#8F5DFF]'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white shadow-xs border border-gray-100 shrink-0">
                        {getTypeIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-bold text-gray-900 text-xs truncate">{n.title}</h5>
                          <span className="text-[10px] text-gray-400 shrink-0">{n.createdAt}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{n.message}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          {!n.isRead && (
                            <button
                              onClick={() => markNotificationRead(n.id)}
                              className="text-[11px] font-semibold text-[#8F5DFF] hover:underline flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Marquer lu
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(n.id)}
                            className="text-[11px] font-medium text-gray-400 hover:text-rose-500 flex items-center gap-1 ml-auto"
                          >
                            <Trash2 className="w-3 h-3" /> Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
