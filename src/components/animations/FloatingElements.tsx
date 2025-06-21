'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElements: React.FC = () => {
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '0s' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-pink-400/20 backdrop-blur-sm"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-yellow-400/20 backdrop-blur-sm"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
};