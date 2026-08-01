import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, Database } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline } = useApp();

  if (!isOffline) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-md">
      <WifiOff className="w-4 h-4 animate-bounce shrink-0" />
      <span>
        <strong>Mode Hors Ligne Actif :</strong> Vos dernières données transactionnelles et échéances restent accessibles localement en toute sécurité.
      </span>
      <span className="ml-auto hidden sm:inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
        <Database className="w-3 h-3" /> Cache local synchronisé
      </span>
    </div>
  );
};
