'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Experience } from '@/components/sections/Experience';
import { Flavours } from '@/components/sections/Flavours';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxContainer } from '@/components/animations/ParallaxContainer';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Fix SSR hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Simulate loading time for premium experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(index);
        }
      });
    };

    // Control body overflow safely
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, [mounted, isLoading]);

  const handleCartClick = () => {
    console.log('Cart clicked');
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  // Loading Screen Component
  const LoadingScreen = () => (
    <motion.div
      className="loading-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="text-4xl font-bold mb-8 text-brand-teal"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity
          }}
        >
          MR.POPS
        </motion.div>
        <div className="loading-spinner mx-auto"></div>
        <motion.p
          className="mt-4 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Preparing your premium experience...
        </motion.p>
      </div>
    </motion.div>
  );

  // Page Indicator Component
  const PageIndicator = () => (
    <motion.div
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: (!mounted || isLoading) ? 0 : 1, x: 0 }}
      transition={{ delay: 2.5 }}
    >
      {['Hero', 'Experience', 'Flavours'].map((section, index) => (
        <motion.div
          key={section}
          className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
            currentSection === index ? 'bg-brand-teal scale-125' : 'bg-white/30 hover:bg-white/50'
          }`}
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            if (!mounted) return;
            const element = document.querySelector(`section:nth-child(${index + 1})`);
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      ))}
    </motion.div>
  );

  // Background Effects Component
  const BackgroundEffects = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-pink/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  // Prevent SSR mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <BackgroundEffects />
      <PageIndicator />

      <Navigation cartCount={cartCount} onCartClick={handleCartClick} />

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Hero />
        </motion.div>

        {/* Experience Section with Parallax */}
        <ParallaxContainer speed={-0.2}>
          <Experience />
        </ParallaxContainer>

        {/* Flavours Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Flavours />
        </motion.div>

        {/* Premium CTA Section */}
        <ScrollReveal>
          <section className="py-32 px-6 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.1),transparent)] opacity-50" />
            
            <div className="relative max-w-4xl mx-auto text-center">
              <motion.h2
                className="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-white to-brand-pink"
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.8 }}
              >
                TASTE THE
                <br />
                PREMIUM
              </motion.h2>

              <ScrollReveal delay={0.3}>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                  Experience the perfect blend of premium ingredients, innovative flavors, 
                  and artisanal craftsmanship in every single scoop.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.button
                    className="px-12 py-4 bg-brand-teal text-black font-bold rounded-full text-lg hover:bg-brand-teal/90 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(20, 184, 166, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                  >
                    ORDER NOW
                  </motion.button>

                  <motion.button
                    className="px-12 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    LEARN MORE
                  </motion.button>
                </div>
              </ScrollReveal>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-20 right-20 w-20 h-20 bg-brand-yellow/20 rounded-full blur-xl"
              animate={{
                y: [-10, 10, -10],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </section>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal>
          <footer className="py-20 px-6 bg-black border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div>
                  <h3 className="text-3xl font-bold text-brand-red mb-6">MR.POPS</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Premium ice cream experience crafted with the finest ingredients 
                    and innovative flavors.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-brand-teal">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Flavours</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-brand-teal">Flavours</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Mango Maracuya</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">White Chocolate</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Berry Bliss</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Coconut Dream</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-brand-teal">Connect</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 text-center text-gray-400">
                <p>&copy; 2025 MR.POPS. All rights reserved. Crafted with ❤️ for ice cream lovers.</p>
              </div>
            </div>
          </footer>
        </ScrollReveal>
      </main>
    </div>
  );
}