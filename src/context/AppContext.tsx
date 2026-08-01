import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Tontine, PaymentLink, Payment, Offer, Ebook, 
  ChatMessage, Announcement, SupportTicket, Badge, 
  AppNotification, TontineMember, Testimonial 
} from '../types';
import { 
  currentUserMock, adminUserMock, sampleUsers, 
  samplePaymentLinks, sampleTontines, samplePayments, 
  sampleOffers, sampleEbooks, sampleAnnouncements, 
  sampleChatMessages, sampleNotifications, sampleBadges, 
  sampleSupportTickets, sampleTestimonials 
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  activeRole: 'member' | 'admin' | 'public';
  currentRole: 'member' | 'admin' | 'public';
  users: User[];
  tontines: Tontine[];
  paymentLinks: PaymentLink[];
  payments: Payment[];
  offers: Offer[];
  ebooks: Ebook[];
  announcements: Announcement[];
  chatMessages: ChatMessage[];
  notifications: AppNotification[];
  supportTickets: SupportTicket[];
  badges: Badge[];
  testimonials: Testimonial[];
  isOffline: boolean;
  activeMemberTab: string;
  activeAdminTab: string;
  selectedTontineId: string | null;
  unreadNotificationsCount: number;

  // Actions
  switchRole: (role: 'member' | 'admin' | 'public') => void;
  setActiveMemberTab: (tab: string) => void;
  setActiveAdminTab: (tab: string) => void;
  setSelectedTontineId: (id: string | null) => void;
  
  // Payment Actions
  declarePayment: (tontineId: string, amount: number, paymentLinkId: string, proofRef?: string) => void;
  validatePayment: (paymentId: string, adminName?: string) => void;
  rejectPayment: (paymentId: string, reason: string) => void;

  // Tontine & Turn Actions
  createTontine: (tontine: Omit<Tontine, 'id' | 'currentMembersCount' | 'orderLocked' | 'members'>) => void;
  joinTontine: (tontineId: string) => void;
  updateTontineMembersOrder: (tontineId: string, members: TontineMember[], lock?: boolean) => void;
  performRandomDraw: (tontineId: string) => void;

  // Payment Link Actions
  addPaymentLink: (link: Omit<PaymentLink, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePaymentLink: (link: PaymentLink) => void;
  togglePaymentLinkActive: (linkId: string) => void;
  deletePaymentLink: (linkId: string) => void;

  // Offer & Ebook Actions
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (offer: Offer) => void;
  addEbook: (ebook: Omit<Ebook, 'id' | 'viewsCount' | 'downloadsCount'>) => void;
  toggleUserEbookAccess: (userId: string) => void;

  // Testimonial Actions
  addTestimonial: (tst: Omit<Testimonial, 'id' | 'createdAt'>) => void;
  deleteTestimonial: (id: string) => void;

  // Admin & CRM Actions
  toggleUserStatus: (userId: string) => void;
  updateUserNotes: (userId: string, notes: string) => void;
  updateUserTags: (userId: string, tags: string[]) => void;
  updateUserProfile: (data: Partial<User>) => void;

  // Announcements & Chat & Notifications
  publishAnnouncement: (announcement: Omit<Announcement, 'id' | 'publishedDate'>) => void;
  sendChatMessage: (channelId: string, content: string, attachments?: any[]) => void;
  addChatReaction: (messageId: string, emoji: string) => void;
  sendNotificationToUser: (userId: string, title: string, message: string, type: AppNotification['type']) => void;
  markNotificationRead: (id: string) => void;
  deleteNotification: (id: string) => void;

  // Support & Referral
  submitSupportTicket: (subject: string, category: SupportTicket['category'], message: string) => void;
  replyToSupportTicket: (ticketId: string, content: string) => void;

  // Reset demo state
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'TONTINES_COFFRES_V1_STATE';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<'member' | 'admin' | 'public'>('member');
  const [currentUser, setCurrentUser] = useState<User>(currentUserMock);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [tontines, setTontines] = useState<Tontine[]>(sampleTontines);
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>(samplePaymentLinks);
  const [payments, setPayments] = useState<Payment[]>(samplePayments);
  const [offers, setOffers] = useState<Offer[]>(sampleOffers);
  const [ebooks, setEbooks] = useState<Ebook[]>(sampleEbooks);
  const [announcements, setAnnouncements] = useState<Announcement[]>(sampleAnnouncements);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(sampleChatMessages);
  const [notifications, setNotifications] = useState<AppNotification[]>(sampleNotifications);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(sampleSupportTickets);
  const [badges, setBadges] = useState<Badge[]>(sampleBadges);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(sampleTestimonials);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  const [activeMemberTab, setActiveMemberTab] = useState<string>('accueil');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('dashboard');
  const [selectedTontineId, setSelectedTontineId] = useState<string | null>('tnt_serenite_50');

  // Monitor network online/offline status for Offline Mode
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.users) setUsers(parsed.users);
        if (parsed.tontines) setTontines(parsed.tontines);
        if (parsed.paymentLinks) setPaymentLinks(parsed.paymentLinks);
        if (parsed.payments) setPayments(parsed.payments);
        if (parsed.offers) setOffers(parsed.offers);
        if (parsed.ebooks) setEbooks(parsed.ebooks);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
        if (parsed.chatMessages) setChatMessages(parsed.chatMessages);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.supportTickets) setSupportTickets(parsed.supportTickets);
        if (parsed.testimonials) setTestimonials(parsed.testimonials);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
      }
    } catch (e) {
      console.warn('Failed to load local state', e);
    }
  }, []);

  // Save state updates
  const saveState = (updated: any) => {
    try {
      const currentFullState = {
        users, tontines, paymentLinks, payments, offers, ebooks,
        announcements, chatMessages, notifications, supportTickets, testimonials, currentUser,
        ...updated
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentFullState));
    } catch (e) {
      console.warn('Failed to save local state', e);
    }
  };

  const switchRole = (role: 'member' | 'admin' | 'public') => {
    setActiveRole(role);
    if (role === 'admin') {
      setCurrentUser(adminUserMock);
    } else if (role === 'member') {
      const soraya = users.find(u => u.id === 'usr_soraya') || currentUserMock;
      setCurrentUser(soraya);
    }
  };

  // Payment Flow Actions
  const declarePayment = (tontineId: string, amount: number, paymentLinkId: string, proofRef?: string) => {
    const tontine = tontines.find(t => t.id === tontineId);
    const link = paymentLinks.find(l => l.id === paymentLinkId);
    const declaredName = (proofRef && proofRef.trim()) ? proofRef.trim() : `${currentUser.firstName} ${currentUser.lastName}`;

    const newPayment: Payment = {
      id: `pay_${Date.now()}`,
      tontineId,
      tontineName: tontine ? tontine.name : (link?.associatedOfferName || 'Tontine'),
      userId: currentUser.id,
      userName: declaredName,
      userAvatar: currentUser.avatarUrl,
      amount,
      dueDate: new Date().toISOString().split('T')[0],
      declaredDate: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'pending_validation',
      paymentMethod: link ? link.platform : 'Lien de paiement',
      paymentLinkId,
      proofReference: declaredName,
      installmentNumber: 8,
      totalInstallments: 8,
    };

    const nextPayments = [newPayment, ...payments];
    setPayments(nextPayments);

    // Add Admin Notification
    const adminNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: adminUserMock.id,
      title: '🟡 Paiement à valider',
      message: `${declaredName} a déclaré un versement de ${amount} € pour ${tontine?.name || link?.associatedOfferName || 'une tontine'}.`,
      type: 'payment',
      isRead: false,
      createdAt: 'À l\'instant',
    };

    // Add Member Notification
    const memberNotif: AppNotification = {
      id: `notif_mem_${Date.now()}`,
      userId: currentUser.id,
      title: '✅ Déclaration de paiement reçue',
      message: `Votre versement de ${amount} € au nom de ${declaredName} a bien été transmis à l'administrateur.`,
      type: 'payment',
      isRead: false,
      createdAt: 'À l\'instant',
    };

    setNotifications(prev => [adminNotif, memberNotif, ...prev]);
    saveState({ payments: nextPayments });
  };

  const validatePayment = (paymentId: string, adminName: string = 'Fatou Diallo (Admin)') => {
    const nextPayments = payments.map(p => {
      if (p.id === paymentId) {
        return {
          ...p,
          status: 'validated' as const,
          validatedDate: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
          validatedBy: adminName,
        };
      }
      return p;
    });

    const targetPayment = payments.find(p => p.id === paymentId);
    if (targetPayment) {
      // Notify Member
      const memberNotif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: targetPayment.userId,
        title: '✅ Paiement validé',
        message: `Votre versement de ${targetPayment.amount.toFixed(2)} € pour ${targetPayment.tontineName} a été validé par l'administration !`,
        type: 'validation',
        isRead: false,
        createdAt: 'À l\'instant',
      };
      setNotifications(prev => [memberNotif, ...prev]);

      // Update user total paid
      setUsers(prevUsers => prevUsers.map(u => {
        if (u.id === targetPayment.userId) {
          return { ...u, totalPaid: u.totalPaid + targetPayment.amount };
        }
        return u;
      }));

      // Update current user if it's Soraya
      if (targetPayment.userId === currentUser.id) {
        setCurrentUser(prev => ({ ...prev, totalPaid: prev.totalPaid + targetPayment.amount }));
      }
    }

    setPayments(nextPayments);
    saveState({ payments: nextPayments });
  };

  const rejectPayment = (paymentId: string, reason: string) => {
    const nextPayments = payments.map(p => {
      if (p.id === paymentId) {
        return {
          ...p,
          status: 'refused' as const,
          refusalReason: reason,
        };
      }
      return p;
    });

    const targetPayment = payments.find(p => p.id === paymentId);
    if (targetPayment) {
      const memberNotif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: targetPayment.userId,
        title: '❌ Paiement non validé',
        message: `Votre versement de ${targetPayment.amount.toFixed(2)} € a été refusé. Motif : ${reason}`,
        type: 'refusal',
        isRead: false,
        createdAt: 'À l\'instant',
      };
      setNotifications(prev => [memberNotif, ...prev]);
    }

    setPayments(nextPayments);
    saveState({ payments: nextPayments });
  };

  // Tontine Management Actions
  const createTontine = (newTontineData: Omit<Tontine, 'id' | 'currentMembersCount' | 'orderLocked' | 'members'>) => {
    const newTontine: Tontine = {
      ...newTontineData,
      id: `tnt_${Date.now()}`,
      currentMembersCount: 0,
      orderLocked: false,
      members: [],
    };

    const updatedTontines = [newTontine, ...tontines];
    setTontines(updatedTontines);
    saveState({ tontines: updatedTontines });
  };

  const joinTontine = (tontineId: string) => {
    setTontines(prev => prev.map(t => {
      if (t.id === tontineId) {
        if (t.members.some(m => m.userId === currentUser.id)) return t;
        const newMember: TontineMember = {
          userId: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          avatarUrl: currentUser.avatarUrl,
          orderPosition: t.members.length + 1,
          paidInstallments: 0,
          totalInstallments: t.maxMembers,
          totalPaidAmount: 0,
          status: 'active',
          estimatedPayoutDate: 'Date à définir',
        };
        return {
          ...t,
          currentMembersCount: t.currentMembersCount + 1,
          members: [...t.members, newMember],
        };
      }
      return t;
    }));
  };

  const updateTontineMembersOrder = (tontineId: string, members: TontineMember[], lock: boolean = false) => {
    setTontines(prev => prev.map(t => {
      if (t.id === tontineId) {
        return {
          ...t,
          members,
          orderLocked: lock ? true : t.orderLocked,
          orderLockDate: lock ? new Date().toISOString().split('T')[0] : t.orderLockDate,
        };
      }
      return t;
    }));

    // Notify all members of this tontine if order is locked
    if (lock) {
      const targetTontine = tontines.find(t => t.id === tontineId);
      if (targetTontine) {
        targetTontine.members.forEach(m => {
          const notif: AppNotification = {
            id: `notif_lock_${Date.now()}_${m.userId}`,
            userId: m.userId,
            title: '🔒 Ordre de passage définitif',
            message: `L'ordre de passage pour ${targetTontine.name} a été validé définitivement par l'administration.`,
            type: 'turn',
            isRead: false,
            createdAt: 'À l\'instant',
          };
          setNotifications(n => [notif, ...n]);
        });
      }
    }
  };

  const performRandomDraw = (tontineId: string) => {
    setTontines(prev => prev.map(t => {
      if (t.id === tontineId) {
        const shuffled = [...t.members].sort(() => Math.random() - 0.5);
        const reordered = shuffled.map((m, index) => ({
          ...m,
          orderPosition: index + 1,
        }));
        return {
          ...t,
          members: reordered,
        };
      }
      return t;
    }));
  };

  // Payment Link Actions
  const addPaymentLink = (linkData: Omit<PaymentLink, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLink: PaymentLink = {
      ...linkData,
      id: `pl_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newLink, ...paymentLinks];
    setPaymentLinks(updated);
    saveState({ paymentLinks: updated });
  };

  const updatePaymentLink = (updatedLink: PaymentLink) => {
    const updated = paymentLinks.map(l => l.id === updatedLink.id ? { ...updatedLink, updatedAt: new Date().toISOString().split('T')[0] } : l);
    setPaymentLinks(updated);
    saveState({ paymentLinks: updated });
  };

  const togglePaymentLinkActive = (linkId: string) => {
    const updated = paymentLinks.map(l => l.id === linkId ? { ...l, isActive: !l.isActive } : l);
    setPaymentLinks(updated);
    saveState({ paymentLinks: updated });
  };

  const deletePaymentLink = (linkId: string) => {
    const updated = paymentLinks.filter(l => l.id !== linkId);
    setPaymentLinks(updated);
    saveState({ paymentLinks: updated });
  };

  // Offer Actions
  const addOffer = (offerData: Omit<Offer, 'id'>) => {
    const newOffer: Offer = { ...offerData, id: `off_${Date.now()}` };
    const updated = [...offers, newOffer];
    setOffers(updated);
    saveState({ offers: updated });
  };

  const updateOffer = (updatedOffer: Offer) => {
    const updated = offers.map(o => o.id === updatedOffer.id ? updatedOffer : o);
    setOffers(updated);
    saveState({ offers: updated });
  };

  // Ebook Actions
  const addEbook = (ebookData: Omit<Ebook, 'id' | 'viewsCount' | 'downloadsCount'>) => {
    const newEbook: Ebook = {
      ...ebookData,
      id: `eb_${Date.now()}`,
      viewsCount: 0,
      downloadsCount: 0,
    };
    const updated = [...ebooks, newEbook];
    setEbooks(updated);
    saveState({ ebooks: updated });
  };

  const toggleUserEbookAccess = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, hasEbookAccess: !u.hasEbookAccess };
      }
      return u;
    }));
    if (userId === currentUser.id) {
      setCurrentUser(prev => ({ ...prev, hasEbookAccess: !prev.hasEbookAccess }));
    }
  };

  // Admin CRM Actions
  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const updateUserNotes = (userId: string, notes: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, internalNotes: notes } : u));
  };

  const updateUserTags = (userId: string, tags: string[]) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, tags } : u));
  };

  const updateUserProfile = (data: Partial<User>) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...data };
      setUsers(all => all.map(u => u.id === prev.id ? updated : u));
      return updated;
    });
  };

  // Announcement & Messaging
  const publishAnnouncement = (annData: Omit<Announcement, 'id' | 'publishedDate'>) => {
    const newAnn: Announcement = {
      ...annData,
      id: `anc_${Date.now()}`,
      publishedDate: new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' }),
    };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);

    // Broadcast notification to all members
    users.forEach(u => {
      const notif: AppNotification = {
        id: `notif_ann_${Date.now()}_${u.id}`,
        userId: u.id,
        title: `📢 ${newAnn.title}`,
        message: newAnn.content,
        type: 'announcement',
        isRead: false,
        createdAt: 'À l\'instant',
      };
      setNotifications(prev => [notif, ...prev]);
    });
  };

  const sendChatMessage = (channelId: string, content: string, attachments?: any[]) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      channelId,
      senderId: currentUser.id,
      senderName: `${currentUser.firstName} ${currentUser.lastName}`,
      senderAvatar: currentUser.avatarUrl,
      isAdminSender: activeRole === 'admin',
      content,
      timestamp: 'Aujourd\'hui à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      attachments,
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const addChatReaction = (messageId: string, emoji: string) => {
    setChatMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        const existingReactions = m.reactions || [];
        const targetReaction = existingReactions.find(r => r.emoji === emoji);
        if (targetReaction) {
          if (targetReaction.users.includes(currentUser.id)) return m;
          return {
            ...m,
            reactions: existingReactions.map(r => r.emoji === emoji ? { ...r, count: r.count + 1, users: [...r.users, currentUser.id] } : r)
          };
        } else {
          return {
            ...m,
            reactions: [...existingReactions, { emoji, count: 1, users: [currentUser.id] }]
          };
        }
      }
      return m;
    }));
  };

  const sendNotificationToUser = (userId: string, title: string, message: string, type: AppNotification['type']) => {
    const notif: AppNotification = {
      id: `notif_custom_${Date.now()}`,
      userId,
      title,
      message,
      type,
      isRead: false,
      createdAt: 'À l\'instant',
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const submitSupportTicket = (subject: string, category: SupportTicket['category'], message: string) => {
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userEmail: currentUser.email,
      subject,
      category,
      status: 'open',
      createdAt: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
      messages: [{
        id: `tkt_msg_${Date.now()}`,
        senderId: currentUser.id,
        senderName: `${currentUser.firstName} ${currentUser.lastName}`,
        content: message,
        timestamp: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
        isAdmin: false,
      }]
    };
    setSupportTickets(prev => [newTicket, ...prev]);
  };

  const replyToSupportTicket = (ticketId: string, content: string) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newReply = {
          id: `tkt_reply_${Date.now()}`,
          senderId: currentUser.id,
          senderName: `${currentUser.firstName} ${currentUser.lastName}`,
          content,
          timestamp: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
          isAdmin: activeRole === 'admin',
        };
        return {
          ...t,
          status: activeRole === 'admin' ? ('in_progress' as const) : t.status,
          messages: [...t.messages, newReply],
        };
      }
      return t;
    }));
  };

  const addTestimonial = (tst: Omit<Testimonial, 'id' | 'createdAt'>) => {
    const newTst: Testimonial = {
      ...tst,
      id: `tst_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const next = [newTst, ...testimonials];
    setTestimonials(next);
    saveState({ testimonials: next });
  };

  const deleteTestimonial = (id: string) => {
    const next = testimonials.filter(t => t.id !== id);
    setTestimonials(next);
    saveState({ testimonials: next });
  };

  const resetToDefaultData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUsers(sampleUsers);
    setTontines(sampleTontines);
    setPaymentLinks(samplePaymentLinks);
    setPayments(samplePayments);
    setOffers(sampleOffers);
    setEbooks(sampleEbooks);
    setAnnouncements(sampleAnnouncements);
    setChatMessages(sampleChatMessages);
    setNotifications(sampleNotifications);
    setSupportTickets(sampleSupportTickets);
    setTestimonials(sampleTestimonials);
    setCurrentUser(currentUserMock);
    setActiveRole('member');
  };

  const unreadNotificationsCount = notifications.filter(n => n.userId === currentUser.id && !n.isRead).length;

  return (
    <AppContext.Provider value={{
      currentUser,
      activeRole,
      currentRole: activeRole,
      users,
      tontines,
      paymentLinks,
      payments,
      offers,
      ebooks,
      announcements,
      chatMessages,
      notifications,
      supportTickets,
      badges,
      testimonials,
      isOffline,
      activeMemberTab,
      activeAdminTab,
      selectedTontineId,
      unreadNotificationsCount,

      switchRole,
      setActiveMemberTab,
      setActiveAdminTab,
      setSelectedTontineId,
      declarePayment,
      validatePayment,
      rejectPayment,
      createTontine,
      joinTontine,
      updateTontineMembersOrder,
      performRandomDraw,
      addPaymentLink,
      updatePaymentLink,
      togglePaymentLinkActive,
      deletePaymentLink,
      addOffer,
      updateOffer,
      addEbook,
      toggleUserEbookAccess,
      addTestimonial,
      deleteTestimonial,
      toggleUserStatus,
      updateUserNotes,
      updateUserTags,
      updateUserProfile,
      publishAnnouncement,
      sendChatMessage,
      addChatReaction,
      sendNotificationToUser,
      markNotificationRead,
      deleteNotification,
      submitSupportTicket,
      replyToSupportTicket,
      resetToDefaultData,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
