'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export const FloatingElements: React.FC = () => {
  const floatingVariants: Variants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  // Alternative approach using direct animate props for better performance
  const floatingAnimation = {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Using direct animate prop - more performant */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-pink-400/20 backdrop-blur-sm"
        animate={{
          y: [-15, 15, -15],
          x: [-8, 8, -8],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-yellow-400/20 backdrop-blur-sm"
        animate={{
          y: [-12, 12, -12],
          x: [-6, 6, -6],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Additional floating elements for more premium feel */}
      <motion.div
        className="absolute top-3/4 right-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-brand-teal/10 to-brand-pink/10 backdrop-blur-sm"
        animate={{
          y: [-18, 18, -18],
          x: [-9, 9, -9],
          rotate: [0, -6, 6, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute top-1/6 left-1/2 w-12 h-12 rounded-full bg-brand-red/15 backdrop-blur-sm"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  );
};

// Enhanced version with more control and better performance
export const PremiumFloatingElements: React.FC = () => {
  const elements = [
    {
      size: 'w-32 h-32',
      position: 'top-1/4 right-1/4',
      color: 'bg-white/10',
      animation: { y: [-20, 20], x: [-10, 10], rotate: [0, 5] },
      duration: 6,
      delay: 0
    },
    {
      size: 'w-24 h-24',
      position: 'bottom-1/4 left-1/4',
      color: 'bg-pink-400/20',
      animation: { y: [-15, 15], x: [-8, 8], rotate: [0, -3] },
      duration: 7,
      delay: 2
    },
    {
      size: 'w-16 h-16',
      position: 'top-1/2 left-1/3',
      color: 'bg-yellow-400/20',
      animation: { y: [-12, 12], x: [-6, 6], rotate: [0, 8] },
      duration: 8,
      delay: 4
    },
    {
      size: 'w-20 h-20',
      position: 'top-3/4 right-1/3',
      color: 'bg-gradient-to-r from-brand-teal/10 to-brand-pink/10',
      animation: { y: [-18, 18], x: [-9, 9], rotate: [0, -6], scale: [1, 1.1] },
      duration: 9,
      delay: 1
    },
    {
      size: 'w-12 h-12',
      position: 'top-1/6 left-1/2',
      color: 'bg-brand-red/15',
      animation: { y: [-10, 10], x: [-5, 5], rotate: [0, 10] },
      duration: 5,
      delay: 3
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.position} ${element.size} rounded-full ${element.color} backdrop-blur-sm`}
          animate={element.animation}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};