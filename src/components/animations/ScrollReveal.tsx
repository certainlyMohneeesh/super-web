'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  distance = 50,
  className = ''
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: '-50px 0px',
  });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut" as const,
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Enhanced version with more animation options
export const AdvancedScrollReveal: React.FC<ScrollRevealProps & {
  scale?: boolean;
  rotate?: number;
  blur?: boolean;
}> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  distance = 50,
  scale = false,
  rotate = 0,
  blur = false,
  className = ''
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: '-50px 0px',
  });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      scale: scale ? 0.8 : 1,
      rotate: rotate,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: "easeOut" as const,
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation component
export const StaggeredScrollReveal: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({
  children,
  staggerDelay = 0.1,
  className = ''
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Reveal with custom spring physics
export const SpringScrollReveal: React.FC<ScrollRevealProps & {
  stiffness?: number;
  damping?: number;
  mass?: number;
}> = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  distance = 50,
  stiffness = 100,
  damping = 15,
  mass = 1,
  className = ''
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: '-50px 0px',
  });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        type: "spring",
        stiffness,
        damping,
        mass,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};