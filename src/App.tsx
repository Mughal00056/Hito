import React, { useState, useCallback } from 'react';
import { FloatingButton } from './components/FloatingButton';
import { ScanOverlay } from './components/ScanOverlay';
import { SignalResult } from './components/SignalResult';
import { Dashboard } from './components/Dashboard';
import { Signal, TradeSettings, TradeHistoryItem } from './types';

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);
  
  const [settings, setSettings] = useState<TradeSettings>({
    demoMode: true,
    autoTrade: false,
    tradeAmount: 100,
    stopLoss: 2,
    takeProfit: 5,
  });

  const [history, setHistory] = useState<TradeHistoryItem[]>([]);

  const handleScanStart = () => {
    if (isScanning) return;
    setIsScanning(true);
    setCurrentSignal(null);
  };

  const generateSignal = useCallback(() => {
    // Simulated signal generation logic
    const isBuy = Math.random() > 0.5;
    const rsi = isBuy ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 20) + 75;
    const confidence = Math.floor(Math.random() * 20) + 75; // 75-95%
    
    const newSignal: Signal = {
      type: isBuy ? 'BUY' : 'SELL',
      confidence,
      reason: isBuy 
        ? `RSI oversold (${rsi}). EMA9 crossed above EMA21.` 
        : `RSI overbought (${rsi}). EMA9 crossed below EMA21.`,
      timestamp: Date.now(),
      price: 65000 + (Math.random() * 1000 - 500),
    };

    setCurrentSignal(newSignal);
    setIsScanning(false);

    if (settings.autoTrade) {
      executeTrade(newSignal, true);
    }
  }, [settings.autoTrade]);

  const executeTrade = (signal: Signal, auto: boolean = false) => {
    const trade: TradeHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      signal,
      executed: auto,
      amount: settings.tradeAmount,
    };
    
    setHistory(prev => [trade, ...prev]);
    if (!auto) {
      setCurrentSignal(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Dashboard 
        settings={settings} 
        setSettings={setSettings} 
        history={history} 
      />

      <FloatingButton 
        onClick={handleScanStart} 
        isScanning={isScanning} 
      />

      <ScanOverlay 
        isScanning={isScanning} 
        onScanComplete={generateSignal} 
      />

      <SignalResult 
        signal={currentSignal} 
        onClose={() => setCurrentSignal(null)}
        onExecute={() => currentSignal && executeTrade(currentSignal, false)}
        autoTrade={settings.autoTrade}
      />
    </div>
  );
}
