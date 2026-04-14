import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface FloatingButtonProps {
  onClick: () => void;
  isScanning: boolean;
}

export function FloatingButton({ onClick, isScanning }: FloatingButtonProps) {
  const constraintsRef = useRef(null);

  return (
    <>
      {/* Invisible container for drag constraints */}
      <div ref={constraintsRef} className="fixed inset-0 z-40 pointer-events-none" />
      
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        className="fixed bottom-24 right-6 z-50 cursor-grab active:cursor-grabbing pointer-events-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={onClick}
          disabled={isScanning}
          className={cn(
            "relative flex items-center justify-center w-16 h-16 rounded-full border-2 bg-black/80 backdrop-blur-md transition-colors duration-300",
            isScanning 
              ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)]" 
              : "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          )}
        >
          <motion.div
            animate={{
              scale: isScanning ? [1, 1.2, 1] : [1, 1.1, 1],
              opacity: isScanning ? [1, 0.8, 1] : [1, 0.5, 1],
            }}
            transition={{
              duration: isScanning ? 1 : 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute inset-0 rounded-full opacity-50",
              isScanning ? "bg-cyan-500" : "bg-green-500"
            )}
          />
          <Activity 
            className={cn(
              "w-8 h-8 relative z-10",
              isScanning ? "text-cyan-400" : "text-green-400"
            )} 
          />
        </button>
      </motion.div>
    </>
  );
}
