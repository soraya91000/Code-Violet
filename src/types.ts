export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  rating: number;
  text: string;
  tontineName?: string;
  createdAt?: string;
}

export type UserRole = 'member' | 'admin' | 'moderator' | 'manager';

export interface MemberAccessKey {
  userId: string;
  password: string;
  label?: string;
  role?: UserRole;
}

export type AccountStatus = 'active' | 'suspended' | 'pending_verification';

export type PaymentStatus = 
  | 'upcoming' 
  | 'declared' 
  | 'pending_validation' 
  | 'validated' 
  | 'refused' 
  | 'late' 
  | 'cancelled' 
  | 'refunded';

export type TontineStatus = 
  | 'draft' 
  | 'open' 
  | 'soon_full' 
  | 'ongoing' 
  | 'completed' 
  | 'suspended' 
  | 'cancelled';

export type PaymentFrequency = 'weekly' | 'biweekly' | 'monthly' | 'custom';

export type AnnouncementPriority = 'info' | 'important' | 'urgent';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  isVerified: boolean;
  role: UserRole;
  status: AccountStatus;
  joinedDate: string;
  address?: string;
  preferredPaymentMethod?: string;
  hasEbookAccess: boolean;
  referralCode: string;
  referredBy?: string;
  referralsCount: number;
  totalPaid: number;
  totalReceived: number;
  internalNotes?: string;
  crmCategory?: 'new' | 'incomplete' | 'pending' | 'validated' | 'late' | 'loyal' | 'suspended' | 'vip';
  tags?: string[];
}

export interface TontineMember {
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  orderPosition: number;
  paidInstallments: number;
  totalInstallments: number;
  totalPaidAmount: number;
  status: 'active' | 'served' | 'postponed' | 'suspended';
  estimatedPayoutDate: string;
  actualPayoutDate?: string;
}

export interface Tontine {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  contributionAmount: number;
  frequency: PaymentFrequency;
  maxMembers: number;
  currentMembersCount: number;
  totalPayoutAmount: number;
  startDate: string;
  estimatedEndDate: string;
  status: TontineStatus;
  paymentLinkId?: string;
  isEbookIncluded: boolean;
  orderLocked: boolean;
  orderLockDate?: string;
  members: TontineMember[];
  nextPaymentDate: string;
  rules?: string;
}

export interface PaymentLink {
  id: string;
  name: string;
  platform: 'Revolut' | 'Wero' | 'PayPal' | 'Lydia' | 'Stripe' | 'BankTransfer' | 'Other';
  url: string;
  amount: number;
  associatedOfferName?: string;
  tontineId?: string;
  description?: string;
  beneficiaryName: string;
  paymentInstructions?: string;
  referenceToInclude?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  tontineId: string;
  tontineName: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  amount: number;
  dueDate: string;
  declaredDate?: string;
  validatedDate?: string;
  status: PaymentStatus;
  paymentMethod: string;
  paymentLinkId?: string;
  proofUrl?: string;
  proofReference?: string;
  refusalReason?: string;
  validatedBy?: string;
  installmentNumber: number;
  totalInstallments: number;
}

export interface Offer {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  benefits: string[];
  paymentLinkId: string;
  isEbookIncluded: boolean;
  isHighlighted?: boolean;
  status: 'active' | 'inactive' | 'full' | 'soon' | 'archived';
  availableSpots?: number;
}

export interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  pdfUrl: string;
  pagesCount: number;
  viewsCount: number;
  downloadsCount: number;
  associatedOfferId?: string;
  isPurchased?: boolean;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  isAdminSender?: boolean;
  content: string;
  timestamp: string;
  attachments?: { name: string; type: 'image' | 'pdf' | 'doc'; url: string }[];
  reactions?: { emoji: string; count: number; users: string[] }[];
  replyToId?: string;
  isPinned?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  publishedDate: string;
  expirationDate?: string;
  imageUrl?: string;
  targetTontineId?: string;
  isPinned: boolean;
  authorName: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'payment' | 'tontine' | 'account' | 'technical' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    isAdmin: boolean;
  }[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'payment' | 'turn' | 'announcement' | 'chat' | 'support' | 'document' | 'validation' | 'refusal';
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'payment' | 'turn' | 'distribution' | 'announcement';
  color: 'violet' | 'gold' | 'green' | 'red';
  tontineId?: string;
  amount?: number;
}
