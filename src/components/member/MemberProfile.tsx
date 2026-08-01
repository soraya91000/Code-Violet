import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, ShieldCheck, Lock, Bell, Moon, Globe, Trash2, Save, LogOut } from 'lucide-react';

export const MemberProfile: React.FC = () => {
  const { currentUser, updateUserProfile, switchRole } = useApp();

  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.address || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || '');
  const [paymentPref, setPaymentPref] = useState(currentUser.preferredPaymentMethod || 'Revolut Instant');

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [twoFa, setTwoFa] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      firstName,
      lastName,
      email,
      phone,
      address,
      avatarUrl,
      preferredPaymentMethod: paymentPref,
    });
    alert('Modifications enregistrées avec succès !');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Mon Profil & Paramètres</h1>
          <p className="text-xs text-gray-500">Gérez vos informations personnelles, préférences de paiement et sécurité.</p>
        </div>

        <button
          onClick={() => switchRole('admin')}
          className="px-3 py-1.5 bg-[#F3EEFF] text-[#8F5DFF] text-xs font-black rounded-xl border border-purple-200"
        >
          Mode Admin ⚙️
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={firstName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F8D64E]"
          />
          <div className="space-y-1">
            <h3 className="font-extrabold text-gray-900 text-lg">{firstName} {lastName}</h3>
            <p className="text-xs text-gray-500">Membre depuis le {currentUser.joinedDate}</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3" /> Identité Validée & Vérifiée
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Prénom</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Téléphone mobile</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-gray-700 mb-1">Adresse postale</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Moyen de paiement préféré</label>
            <select
              value={paymentPref}
              onChange={(e) => setPaymentPref(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
            >
              <option value="Revolut Instant">Revolut Instant</option>
              <option value="Wero Pay">Wero Pay</option>
              <option value="PayPal">PayPal</option>
              <option value="Lydia">Lydia</option>
              <option value="Virement Bancaire">Virement Bancaire</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">URL Photo de Profil</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-hidden"
            />
          </div>
        </div>

        {/* Security & Preferences */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          <h4 className="font-extrabold text-gray-900 text-sm">Préférences & Sécurité</h4>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 cursor-pointer">
              <span className="font-bold text-gray-800">Notifications par Email (Rappels de versement)</span>
              <input
                type="checkbox"
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="rounded text-[#8F5DFF]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 cursor-pointer">
              <span className="font-bold text-gray-800">Notifications Push dans l'application</span>
              <input
                type="checkbox"
                checked={notifPush}
                onChange={(e) => setNotifPush(e.target.checked)}
                className="rounded text-[#8F5DFF]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F3EEFF]/50 border border-purple-100 cursor-pointer">
              <span className="font-bold text-[#8F5DFF]">Activer la Double Authentification (2FA)</span>
              <input
                type="checkbox"
                checked={twoFa}
                onChange={(e) => setTwoFa(e.target.checked)}
                className="rounded text-[#8F5DFF]"
              />
            </label>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#F8D64E]" />
            <span>Enregistrer mes modifications</span>
          </button>

          <p className="text-[11px] font-bold text-gray-400">Application TONTINES COFFRES v2.4.0</p>
        </div>
      </form>
    </div>
  );
};
