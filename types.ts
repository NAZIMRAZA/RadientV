
export enum KycStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum AssetType {
  USDT = 'USDT',
  BTC = 'BTC',
  ETH = 'ETH'
}

export enum TradeSide {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum TradeStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAYMENT_SUBMITTED = 'PAYMENT_SUBMITTED',
  DISPUTED = 'DISPUTED',
  RELEASED = 'RELEASED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  email: string;
  phone: string;
  kycStatus: KycStatus;
  isFrozen: boolean;
  twoFactorEnabled: boolean;
  tradeSuccessRate: number;
  completedTrades: number;
}

export interface P2PAd {
  id: string;
  userId: string;
  userName: string;
  side: TradeSide;
  asset: AssetType;
  price: number;
  priceType: 'FIXED' | 'FLOATING';
  minLimit: number;
  maxLimit: number;
  paymentMethods: string[];
  availableAmount: number;
}

export interface Trade {
  id: string;
  adId: string;
  buyerId: string;
  sellerId: string;
  asset: AssetType;
  amount: number;
  price: number;
  totalInr: number;
  tdsAmount: number;
  commission: number;
  status: TradeStatus;
  utrNumber?: string;
  paymentProofUrl?: string;
  createdAt: number;
  escrowLockedAt: number;
}

export interface KycDetails {
  userId: string;
  panNumber: string;
  aadhaarMasked: string;
  selfieUrl?: string;
  submittedAt: number;
}
