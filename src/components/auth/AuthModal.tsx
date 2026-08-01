import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { X, Mail, Lock, User, Phone, ShieldCheck, ArrowRight, CheckSquare, UploadCloud, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot' | '2fa';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { switchRole, updateUserProfile } = useApp();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | '2fa' | 'success'>(initialMode);

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [acceptCgu, setAcceptCgu] = useState(false);
  const [acceptReglement, setAcceptReglement] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (email.toLowerCase().includes('admin')) {
        setMode('2fa');
      } else {
        switchRole('member');
        onClose();
      }
    } else if (mode === 'signup') {
      if (!acceptCgu || !acceptReglement) {
        alert('Veuillez accepter les CGU et le Règlement particulier des tontines pour continuer.');
        return;
      }
      updateUserProfile({
        firstName: firstName || 'Soraya',
        lastName: lastName || 'Benziane',
        email: email || 'Soraya91000@gmail.com',
        phone: phone || '+33 6 12 34 56 78',
      });
      setMode('success');
    } else if (mode === '2fa') {
      switchRole('admin');
      onClose();
    } else if (mode === 'forgot') {
      alert(`Un lien de réinitialisation a été envoyé à l'adresse : ${email}`);
      setMode('login');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <Logo size="md" className="justify-center mb-2" />
            <h3 className="text-xl font-extrabold text-gray-900">
              {mode === 'login' && 'Connexion à votre espace'}
              {mode === 'signup' && 'Créer un compte Membre'}
              {mode === 'forgot' && 'Mot de passe oublié'}
              {mode === '2fa' && 'Double Authentification Administrateur'}
              {mode === 'success' && 'Inscription réussie ! 🎉'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {mode === 'login' && 'Accédez à vos tontines, paiements et documents.'}
              {mode === 'signup' && 'Rejoignez une communauté d\'épargne sûre et transparente.'}
              {mode === '2fa' && 'Saisissez le code de sécurité 2FA à 6 chiffres.'}
            </p>
          </div>

          {mode === 'success' ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#F3EEFF] border-2 border-[#8F5DFF] flex items-center justify-center text-[#8F5DFF]">
                <ShieldCheck className="w-10 h-10 text-[#F8D64E]" />
              </div>
              <p className="text-sm text-gray-700">
                Un email de confirmation vient de vous être envoyé. Vous êtes désormais membre actif de TONTINES COFFRES.
              </p>
              <button
                onClick={() => {
                  switchRole('member');
                  onClose();
                }}
                className="w-full py-3 bg-[#8F5DFF] text-white font-bold rounded-2xl shadow-lg shadow-[#8F5DFF]/20"
              >
                Accéder à mon tableau de bord
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Prénom</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Soraya"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Benziane"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
                    />
                  </div>
                </div>
              )}

              {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Adresse email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="soraya@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
                    />
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Téléphone mobile</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+33 6 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
                    />
                  </div>
                </div>
              )}

              {(mode === 'login' || mode === 'signup') && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mot de passe</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
                    />
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Confirmation mot de passe</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 outline-hidden focus:border-[#8F5DFF]"
                  />
                </div>
              )}

              {mode === '2fa' && (
                <div className="bg-[#FAF8FF] p-4 rounded-2xl border border-purple-200 text-center space-y-3">
                  <KeyRound className="w-8 h-8 mx-auto text-[#8F5DFF]" />
                  <label className="block text-xs font-bold text-gray-700">Code de validation Authenticator / SMS</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="1 2 3 4 5 6"
                    value={twoFaCode}
                    onChange={(e) => setTwoFaCode(e.target.value)}
                    className="w-full text-center text-xl font-mono tracking-widest py-2 bg-white rounded-xl border-2 border-[#8F5DFF] outline-hidden"
                  />
                  <p className="text-[10px] text-gray-500">Protection renforcée Administrateur active.</p>
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptCgu}
                      onChange={(e) => setAcceptCgu(e.target.checked)}
                      className="mt-0.5 rounded text-[#8F5DFF]"
                    />
                    <span>J'accepte les Conditions Générales d'Utilisation (CGU).</span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptReglement}
                      onChange={(e) => setAcceptReglement(e.target.checked)}
                      className="mt-0.5 rounded text-[#8F5DFF]"
                    />
                    <span>J'accepte le Règlement particulier et la charte de la tontine.</span>
                  </label>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-[#8F5DFF] font-semibold hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold rounded-2xl shadow-lg shadow-[#8F5DFF]/25 text-sm flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>
                  {mode === 'login' && 'Se connecter'}
                  {mode === 'signup' && 'Créer mon compte'}
                  {mode === 'forgot' && 'Réinitialiser'}
                  {mode === '2fa' && 'Valider le code 2FA'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#F8D64E]" />
              </button>

              <div className="text-center pt-2 text-xs text-gray-500">
                {mode === 'login' ? (
                  <span>
                    Pas encore de compte ?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="font-bold text-[#8F5DFF] hover:underline"
                    >
                      S'inscrire gratuitement
                    </button>
                  </span>
                ) : (
                  <span>
                    Déjà inscrit(e) ?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-bold text-[#8F5DFF] hover:underline"
                    >
                      Se connecter
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
