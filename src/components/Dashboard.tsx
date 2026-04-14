import React from 'react';
import { Settings, Shield, Activity, History, Power } from 'lucide-react';
import { Signal, TradeSettings, TradeHistoryItem } from '../types';
import { cn } from '../lib/utils';

interface DashboardProps {
  settings: TradeSettings;
  setSettings: React.Dispatch<React.SetStateAction<TradeSettings>>;
  history: TradeHistoryItem[];
}

export function Dashboard({ settings, setSettings, history }: DashboardProps) {
  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-cyan-500/30">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <Activity className="text-cyan-400" />
            CYBER<span className="text-cyan-400">TRADE</span>
          </h1>
          <p className="text-gray-500 text-sm font-mono mt-1">AI Assistant v1.0</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider",
            settings.demoMode 
              ? "border-yellow-500/50 text-yellow-500 bg-yellow-500/10" 
              : "border-red-500/50 text-red-500 bg-red-500/10"
          )}>
            {settings.demoMode ? 'DEMO MODE' : 'LIVE API'}
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Settings Panel */}
        <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
            <Settings className="text-gray-400" />
            <h2 className="text-lg font-bold tracking-wide">CONFIGURATION</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Demo Mode</p>
                <p className="text-xs text-gray-500">Use simulated market data</p>
              </div>
              <button 
                onClick={() => setSettings(s => ({ ...s, demoMode: !s.demoMode }))}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  settings.demoMode ? "bg-cyan-500" : "bg-gray-700"
                )}
              >
                <div className={cn(
                  "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                  settings.demoMode ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Trade</p>
                <p className="text-xs text-gray-500">Execute signals automatically</p>
              </div>
              <button 
                onClick={() => setSettings(s => ({ ...s, autoTrade: !s.autoTrade }))}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  settings.autoTrade ? "bg-green-500" : "bg-gray-700"
                )}
              >
                <div className={cn(
                  "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                  settings.autoTrade ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <label className="block text-sm font-medium text-gray-400 mb-2">Trade Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  type="number" 
                  value={settings.tradeAmount}
                  onChange={(e) => setSettings(s => ({ ...s, tradeAmount: Number(e.target.value) }))}
                  className="w-full bg-black border border-gray-800 rounded-lg py-2 pl-8 pr-4 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Stop Loss (%)</label>
                <input 
                  type="number" 
                  value={settings.stopLoss}
                  onChange={(e) => setSettings(s => ({ ...s, stopLoss: Number(e.target.value) }))}
                  className="w-full bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Take Profit (%)</label>
                <input 
                  type="number" 
                  value={settings.takeProfit}
                  onChange={(e) => setSettings(s => ({ ...s, takeProfit: Number(e.target.value) }))}
                  className="w-full bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>
          </div>
        </section>

        {/* History Panel */}
        <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
            <History className="text-gray-400" />
            <h2 className="text-lg font-bold tracking-wide">TRADE LOG</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-600">
                <Shield className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm">No trades executed yet</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bg-black border border-gray-800 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      item.signal.type === 'BUY' ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"
                    )} />
                    <div>
                      <p className="font-bold text-sm">{item.signal.type} BTC/USD</p>
                      <p className="text-xs text-gray-500 font-mono">
                        {new Date(item.signal.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">${item.amount}</p>
                    <p className="text-xs text-gray-500">{item.executed ? 'Executed' : 'Manual'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="mt-8 max-w-4xl mx-auto text-center">
        <p className="text-xs text-gray-600 max-w-lg mx-auto">
          DISCLAIMER: This app is for educational purposes only. Trading involves significant risk and is not financial advice.
        </p>
      </div>
    </div>
  );
}
