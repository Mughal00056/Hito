import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, TrendingDown, Zap, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Signal } from '../types';
import { cn } from '../lib/utils';

interface SignalResultProps {
  signal: Signal | null;
  onClose: () => void;
  onExecute: () => void;
  autoTrade: boolean;
}

// Generate some dummy chart data based on signal type
const generateChartData = (type: 'BUY' | 'SELL') => {
  const data = [];
  let price = 100;
  for (let i = 0; i < 20; i++) {
    price += (Math.random() - 0.5) * 5;
    data.push({ value: price });
  }
  // Force the end to match the signal
  if (type === 'BUY') {
    data[18].value = price - 5;
    data[19].value = price + 10; // Sharp up
  } else {
    data[18].value = price + 5;
    data[19].value = price - 10; // Sharp down
  }
  return data;
};

export function SignalResult({ signal, onClose, onExecute, autoTrade }: SignalResultProps) {
  if (!signal) return null;

  const isBuy = signal.type === 'BUY';
  const colorClass = isBuy ? 'text-green-400' : 'text-red-500';
  const borderColorClass = isBuy ? 'border-green-500/50' : 'border-red-500/50';
  const bgColorClass = isBuy ? 'bg-green-500/10' : 'bg-red-500/10';
  const chartData = generateChartData(signal.type);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <div className={cn(
          "relative w-full max-w-sm rounded-2xl border bg-black/90 p-6 shadow-2xl backdrop-blur-xl",
          borderColorClass,
          isBuy ? "shadow-[0_0_30px_rgba(34,197,94,0.2)]" : "shadow-[0_0_30px_rgba(239,68,68,0.2)]"
        )}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className={cn("p-3 rounded-xl", bgColorClass)}>
              {isBuy ? <TrendingUp className={colorClass} /> : <TrendingDown className={colorClass} />}
            </div>
            <div>
              <h2 className={cn("text-3xl font-black tracking-wider", colorClass)}>
                {signal.type}
              </h2>
              <p className="text-gray-400 font-mono text-sm">
                Confidence: <span className="text-white">{signal.confidence}%</span>
              </p>
            </div>
          </div>

          <div className="mb-6 h-32 w-full rounded-lg overflow-hidden bg-gray-900/50 border border-gray-800">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isBuy ? '#22c55e' : '#ef4444'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isBuy ? '#22c55e' : '#ef4444'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={isBuy ? '#22c55e' : '#ef4444'} 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-900/80 rounded-lg p-3 border border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">Reason</span>
              </div>
              <p className="text-sm text-gray-200">{signal.reason}</p>
            </div>
            
            <div className="bg-gray-900/80 rounded-lg p-3 border border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">Risk Note</span>
              </div>
              <p className="text-xs text-gray-400">
                Trading involves risk. This signal is for educational purposes.
              </p>
            </div>
          </div>

          {autoTrade ? (
            <div className="w-full py-3 rounded-xl bg-gray-800 border border-gray-700 text-center">
              <p className="text-sm text-gray-300 font-medium">Auto Trade Executed</p>
              <p className="text-xs text-gray-500 mt-1">Check history for details</p>
            </div>
          ) : (
            <button
              onClick={onExecute}
              className={cn(
                "w-full py-4 rounded-xl font-bold text-lg tracking-wider transition-all active:scale-95",
                isBuy 
                  ? "bg-green-500 hover:bg-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                  : "bg-red-500 hover:bg-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              )}
            >
              EXECUTE {signal.type}
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
