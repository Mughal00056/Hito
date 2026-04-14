export type SignalType = 'BUY' | 'SELL';

export interface Signal {
  type: SignalType;
  confidence: number;
  reason: string;
  timestamp: number;
  price: number;
}

export interface TradeSettings {
  demoMode: boolean;
  autoTrade: boolean;
  tradeAmount: number;
  stopLoss: number;
  takeProfit: number;
}

export interface TradeHistoryItem {
  id: string;
  signal: Signal;
  executed: boolean;
  amount: number;
}
