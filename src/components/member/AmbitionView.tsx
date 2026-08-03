import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, Download, Lock, Eye, ChevronRight, Sparkles, 
  ShoppingBag, Lightbulb, Compass, Users, Phone, ExternalLink, 
  CheckCircle2, Star, Target, MessageSquare, ArrowRight, ShieldCheck, 
  Building2, TrendingUp, Award, HelpCircle
} from 'lucide-react';

export const AmbitionView: React.FC = () => {
  const { ebooks, currentUser, toggleUserEbookAccess } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'ebooks' | 'fournisseurs' | 'conseils' | 'idees' | 'accompagnement'>('ebooks');
  
  // Ebook reader modal
  const [selectedEbook, setSelectedEbook] = useState<any | null>(null);
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState<string>('Tous');
  const [coachingRequested, setCoachingRequested] = useState<boolean>(false);

  const mainEbook = ebooks[0] || {
    id: 'ebk_001',
    title: 'Guide Ultime de l\'Épargne Rotative & Création de Patrimoine',
    author: 'Soraya Ahamada',
    coverUrl: 'https://image.noelshack.com/fichiers/2026/32/1/1785708347-e8909f30-5565-417b-a872-ad5bb85375db.jpg',
    pagesCount: 124,
    description: 'Apprenez à structurer vos finances personnelles, à maximiser l\'impact de votre tontine et à investir sereinement dans des projets rentables.',
    viewsCount: 142,
    downloadsCount: 98
  };
  
  const hasEbookAccess = currentUser.hasEbookAccess;

  // Mock Suppliers Data
  const suppliers = [
    {
      id: 'sup_01',
      name: 'Maison Silk & Velvet - Dubaï',
      category: 'Mode & Abayas',
      location: 'Dubaï, EAU (Expédition Monde)',
      discount: '-15% avec le code VIOLET15',
      contact: '+971 50 123 4567',
      minOrder: '10 pièces',
      rating: 4.9,
      description: 'Fournisseur premium de kimonos, abayas et tenues de fête. Tissus haut de gamme et finitions impeccables.',
      verified: true,
      tags: ['Grossiste', 'Modest Fashion', 'WhatsApp Direct']
    },
    {
      id: 'sup_02',
      name: 'Cosmetix Laboratoire Paris',
      category: 'Beauté & Cosmétiques',
      location: 'Paris, France',
      discount: 'Échantillons offerts + -10%',
      contact: '+33 1 42 68 00 11',
      minOrder: '500 €',
      rating: 4.8,
      description: 'Fabrication marque blanche de soins visage et corps certifiés BIO. Idéal pour lancer votre marque de cosmétiques.',
      verified: true,
      tags: ['Marque Blanche', 'Made in France', 'Certifié BIO']
    },
    {
      id: 'sup_03',
      name: 'Istanbul Fashion Wholesale',
      category: 'Mode & Chaussures',
      location: 'Istanbul, Turquie',
      discount: 'Livraison express offerte dès 300€',
      contact: '+90 532 987 6543',
      minOrder: '1 série (5 articles)',
      rating: 4.9,
      description: 'Vêtements tendance femmes, sacs et chaussures en cuir véritable à prix grossiste direct usine.',
      verified: true,
      tags: ['Grossiste Direct', 'Prix Usine', 'Livraison DHL']
    },
    {
      id: 'sup_04',
      name: 'Luxe Fragrance Import',
      category: 'Parfums & Senteurs',
      location: 'Grasse / Marseille, France',
      discount: '-20% sur la première commande',
      contact: '+33 4 91 00 22 33',
      minOrder: '20 flacons',
      rating: 4.7,
      description: 'Extraits de parfum de Grasse, brumes corporelles et encens orientaux de haute tenue.',
      verified: true,
      tags: ['Parfumerie', 'Grasse', 'Marge Élevée']
    },
    {
      id: 'sup_05',
      name: 'Tech & Home Shenzhen Direct',
      category: 'High-Tech & Maison',
      location: 'Shenzhen, Chine (Entrepôt FR)',
      discount: 'Prix préférentiels membre VIP',
      contact: 'contact@techdirect-violet.com',
      minOrder: '50 units',
      rating: 4.6,
      description: 'Accessoires smartphone, appareils beauté LED, et objets connectés avec marquage personnalisé.',
      verified: true,
      tags: ['Logistique FR', 'High-Tech', 'Custom Brand']
    }
  ];

  // Business Advice/Tips Data
  const businessAdvice = [
    {
      id: 'adv_01',
      title: 'Comment réinvestir efficacement son capital de Tontine (400€ / 800€)',
      category: 'Gestion de Capital',
      readTime: '5 min de lecture',
      summary: 'Évitez l\'erreur classique de consommer la totalité du versement. Découvrez la règle des 3 tiers (Stock, Urgence, Développement).'
    },
    {
      id: 'adv_02',
      title: 'Créer sa Micro-Entreprise en 2026 : Le Guide Étape par Étape',
      category: 'Juridique & Légal',
      readTime: '8 min de lecture',
      summary: 'De l\'immatriculation URSSAF au compte bancaire dédié, sécurisez votre activité commerciale sereinement.'
    },
    {
      id: 'adv_03',
      title: 'Masterclass Négociation Grossistes & Délais de Paiement',
      category: 'Négociation',
      readTime: '6 min de lecture',
      summary: 'Les phrases clés à employer sur WhatsApp avec les fournisseurs de Dubaï et de Turquie pour obtenir les tarifs VIP.'
    },
    {
      id: 'adv_04',
      title: 'Stratégie Social Selling : Vendre sans budget publicitaire sur TikTok & Insta',
      category: 'Marketing',
      readTime: '7 min de lecture',
      summary: 'Exploitez le pouvoir de la preuve sociale et du storytelling pour écouler vos premiers stocks en moins de 14 jours.'
    }
  ];

  // Project Ideas Data
  const projectIdeas = [
    {
      id: 'idea_01',
      title: 'Boutique de Modest Fashion & Abayas de Prestige',
      initialCapital: '300 € à 500 €',
      potentialMargin: '60% à 70%',
      timeToMarket: '7 à 10 jours',
      description: 'Lancement d\'une collection capsule de 10 à 15 pièces sourcées à Dubaï ou Istanbul avec packaging soigné.'
    },
    {
      id: 'idea_02',
      title: 'Marque de Brumes Corporelles & Parfums d\'Intérieur',
      initialCapital: '200 € à 400 €',
      potentialMargin: '70% à 80%',
      timeToMarket: '5 jours',
      description: 'Création d\'un univers olfactif personnalisé (Grasse) distribué en packs cadeaux et sur les réseaux sociaux.'
    },
    {
      id: 'idea_03',
      title: 'Service d\'Accompagnement Événementiel & Box Cadeaux VIP',
      initialCapital: '150 € à 300 €',
      potentialMargin: '50% à 65%',
      timeToMarket: 'Immédiat',
      description: 'Conception de box thématiques sur-mesure pour mariages, anniversaires et événements professionnels.'
    }
  ];

  const categories = ['Tous', 'Mode & Abayas', 'Beauté & Cosmétiques', 'Mode & Chaussures', 'Parfums & Senteurs', 'High-Tech & Maison'];

  const filteredSuppliers = selectedSupplierCategory === 'Tous' 
    ? suppliers 
    : suppliers.filter(s => s.category === selectedSupplierCategory);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-[#1E1B4B] to-slate-900 text-white border border-purple-900/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8F5DFF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8F5DFF]/30 text-[#F8D64E] text-xs font-black uppercase tracking-wider border border-[#8F5DFF]/50">
            <Sparkles className="w-3.5 h-3.5" /> Espace Ambition & Opportunités
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Propulsez vos Projets avec Code Violet
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Accédez à notre bibliothèque d'E-books, notre réseau exclusif de fournisseurs vérifiés, nos conseils stratégiques et notre accompagnement personnalisé pour concrétiser vos ambitions.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
        {[
          { id: 'ebooks', label: 'E-Books & Formations', icon: BookOpen, badge: 'Offert' },
          { id: 'fournisseurs', label: 'Annuaire Fournisseurs', icon: ShoppingBag, badge: 'VIP' },
          { id: 'conseils', label: 'Conseils Business', icon: Lightbulb },
          { id: 'idees', label: 'Idées de Projets', icon: TrendingUp },
          { id: 'accompagnement', label: 'Accompagnement VIP', icon: Users, badge: 'Soraya' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-xs ${
                isActive
                  ? 'bg-[#8F5DFF] text-white shadow-md shadow-[#8F5DFF]/20'
                  : 'bg-white text-slate-600 hover:bg-[#F3EEFF] hover:text-[#8F5DFF] border border-slate-200/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#F8D64E]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-2 py-0.5 text-[9px] font-black rounded-full ${
                  isActive ? 'bg-[#F8D64E] text-slate-950' : 'bg-[#F3EEFF] text-[#8F5DFF]'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: E-BOOKS & FORMATIONS */}
      {activeSubTab === 'ebooks' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-md flex flex-col md:flex-row items-center gap-8">
            {/* Book Cover */}
            <div className="relative w-52 sm:w-60 h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#F8D64E] bg-[#120B2E] shrink-0 flex items-center justify-center p-1">
              <img
                src={mainEbook.coverUrl}
                alt={mainEbook.title}
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              {!hasEbookAccess && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center">
                  <Lock className="w-8 h-8 text-[#F8D64E] mb-2" />
                  <p className="font-black text-xs">Accès Réservé</p>
                  <p className="text-[10px] text-slate-300">Inclus avec la Tontine Premium & Gold</p>
                </div>
              )}
            </div>

            {/* Info & Description */}
            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EEFF] text-[#8F5DFF] text-xs font-black rounded-full">
                <BookOpen className="w-3.5 h-3.5 text-[#8F5DFF]" /> Ebook Exclusif • {mainEbook.pagesCount} pages
              </div>

              <h2 className="text-2xl font-black text-slate-900">{mainEbook.title}</h2>
              <p className="text-xs text-slate-500 font-bold">Auteure : <span className="text-[#8F5DFF]">{mainEbook.author}</span></p>
              <p className="text-xs text-slate-600 leading-relaxed">{mainEbook.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3 bg-[#FAF8FF] rounded-2xl border border-purple-100">
                  <span className="text-slate-400 font-bold text-[10px] block">Lectures</span>
                  <span className="font-black text-slate-900">{mainEbook.viewsCount} membres</span>
                </div>
                <div className="p-3 bg-[#FAF8FF] rounded-2xl border border-purple-100">
                  <span className="text-slate-400 font-bold text-[10px] block">Téléchargements</span>
                  <span className="font-black text-slate-900">{mainEbook.downloadsCount} PDF</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 col-span-2 sm:col-span-1">
                  <span className="text-amber-800 font-bold text-[10px] block">Note Communauté</span>
                  <span className="font-black text-amber-950">4.9 / 5 ⭐</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                {hasEbookAccess ? (
                  <>
                    <button
                      onClick={() => setSelectedEbook(mainEbook)}
                      className="px-6 py-3 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#8F5DFF]/20 flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <Eye className="w-4 h-4 text-[#F8D64E]" />
                      <span>Lire en ligne</span>
                    </button>
                    <button
                      onClick={() => alert('Téléchargement du PDF démarré.')}
                      className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs rounded-2xl shadow-xs flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4 text-[#8F5DFF]" />
                      <span>Télécharger le PDF</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      toggleUserEbookAccess(currentUser.id);
                      alert('Accès Ebook débloqué !');
                    }}
                    className="px-6 py-3 bg-[#F8D64E] hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-md flex items-center gap-2"
                  >
                    <span>Débloquer mon accès Ebook</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANNUAIRE FOURNISSEURS */}
      {activeSubTab === 'fournisseurs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">Annuaire des Fournisseurs Vérifiés</h2>
              <p className="text-xs text-slate-500">Grossistes testés et négociés pour les membres de Code Violet.</p>
            </div>
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSupplierCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedSupplierCategory === cat
                      ? 'bg-slate-950 text-[#F8D64E]'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSuppliers.map((sup) => (
              <div key={sup.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F3EEFF] text-[#8F5DFF] font-black text-[10px]">
                        {sup.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base mt-1">{sup.name}</h3>
                      <p className="text-xs text-slate-500">{sup.location}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-lg border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> {sup.rating}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{sup.description}</p>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Avantage Code Violet :</span>
                      <span className="font-black text-[#8F5DFF]">{sup.discount}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Commande Minimum :</span>
                      <span className="font-bold text-slate-900">{sup.minOrder}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sup.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/${sup.contact.replace(/\s+/g, '').replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contacter sur WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONSEILS BUSINESS */}
      {activeSubTab === 'conseils' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Conseils & Guides Stratégiques</h2>
            <p className="text-xs text-slate-500">Les clés pour gérer vos gains de tontine et bâtir un projet pérenne.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessAdvice.map((adv) => (
              <div key={adv.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#F3EEFF] text-[#8F5DFF] text-[10px] font-black">
                    {adv.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{adv.readTime}</span>
                </div>

                <h3 className="font-black text-slate-900 text-base">{adv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{adv.summary}</p>

                <button 
                  onClick={() => alert(`Ouverture du guide : "${adv.title}"`)}
                  className="pt-2 text-xs font-extrabold text-[#8F5DFF] hover:text-[#7b46ff] flex items-center gap-1"
                >
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: IDEES DE PROJETS */}
      {activeSubTab === 'idees' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Idées de Projets Clé en Main</h2>
            <p className="text-xs text-slate-500">Des concepts rentables prêts à être lancés avec vos versements de tontine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectIdeas.map((idea) => (
              <div key={idea.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="p-3 bg-[#F3EEFF] text-[#8F5DFF] w-fit rounded-2xl">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">{idea.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{idea.description}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Capital Requis :</span>
                    <span className="font-bold text-slate-900">{idea.initialCapital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Marge Estimée :</span>
                    <span className="font-black text-emerald-600">{idea.potentialMargin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Délai de Lancement :</span>
                    <span className="font-bold text-slate-900">{idea.timeToMarket}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ACCOMPAGNEMENT VIP */}
      {activeSubTab === 'accompagnement' && (
        <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-lg space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <img
                src="https://image.noelshack.com/fichiers/2026/32/1/1785708686-b64b8e7b-b894-4a99-ae32-ba7ad2428e22.jpg"
                alt="Soraya Ahamada"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#8F5DFF] shadow-md mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="px-3 py-1 rounded-full bg-[#F3EEFF] text-[#8F5DFF] text-xs font-black uppercase">
              Mentorat & Suivi Personnalisé
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Accompagnement VIP avec Soraya Ahamada
            </h2>
            <p className="text-xs text-slate-500">
              Réservé aux membres Code Violet : bénéficiez d'un échange individuel pour structurer votre projet ou clarifier votre stratégie d'épargne.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8FF] border border-purple-100 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm">Ce que comprend la session d'accompagnement :</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                <span>Analyse de votre objectif financier et calendrier de tontine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                <span>Recommandations de fournisseurs sur-mesure selon votre projet</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8F5DFF]" />
                <span>Conseils de gestion de trésorerie et montage juridique</span>
              </li>
            </ul>
          </div>

          {coachingRequested ? (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold text-center">
              ✓ Votre demande d'accompagnement a bien été enregistrée ! Soraya vous contactera directement sous 24h sur WhatsApp.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setCoachingRequested(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Votre projet ou question principale :</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ex : Je souhaite utiliser mon versement de 800€ pour lancer une marque de vêtements et j'aimerais des conseils sur le fournisseur..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-[#8F5DFF] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#8F5DFF] hover:bg-[#7b46ff] text-white font-extrabold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-[#F8D64E]" />
                <span>Réserver mon entretien individuel avec Soraya</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Reader Modal Simulation */}
      {selectedEbook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base">{selectedEbook.title}</h3>
              <button onClick={() => setSelectedEbook(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">✕</button>
            </div>
            <div className="p-6 bg-[#FAF8FF] rounded-2xl border border-purple-100 text-xs text-slate-700 space-y-4 leading-relaxed">
              <h4 className="font-bold text-sm text-[#8F5DFF]">Chapitre 1 : Les Fondements de l'Épargne Collective Code Violet</h4>
              <p>
                La tontine est un mécanisme millénaire d'entraide financière. En cotisant une somme régulière avec des personnes de confiance, vous créez un effet de levier puissant sans recourir au crédit bancaire.
              </p>
              <h4 className="font-bold text-sm text-[#8F5DFF]">Chapitre 2 : Optimiser vos Réceptions de Tours</h4>
              <p>
                Utilisez votre versement global (400 € ou 800 €) de manière ciblée : achat de stocks professionnels auprès des fournisseurs agréés, constitution d'une épargne de sécurité ou lancement d'un projet rentable.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
