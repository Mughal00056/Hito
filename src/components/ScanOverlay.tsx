import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface ScanOverlayProps {
  isScanning: boolean;
  onScanComplete: () => void;
}

export function ScanOverlay({ isScanning, onScanComplete }: ScanOverlayProps) {
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        onScanComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isScanning, onScanComplete]);

  if (!isScanning) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-hidden"
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Scanning Line */}
      <motion.div
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 2.5, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_5px_rgba(6,182,212,0.8)] z-50"
      />

      {/* HUD Elements */}
      <div className="relative z-50 flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 rounded-full border-t-2 border-r-2 border-cyan-500 border-dashed opacity-70"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-4 w-40 h-40 rounded-full border-b-2 border-l-2 border-blue-500 opacity-50"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-cyan-400 font-mono text-xl tracking-widest font-bold"
          >
            SCANNING...
          </motion.p>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t-4 border-l-4 border-cyan-500 opacity-50" />
      <div className="absolute top-10 right-10 w-16 h-16 border-t-4 border-r-4 border-cyan-500 opacity-50" />
      <div className="absolute bottom-10 left-10 w-16 h-16 border-b-4 border-l-4 border-cyan-500 opacity-50" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b-4 border-r-4 border-cyan-500 opacity-50" />
    </motion.div>
  );
}
