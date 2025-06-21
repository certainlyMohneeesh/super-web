'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';

export const Experience: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const experiences = [
    {
      icon: "🍦",
      title: "Premium Quality",
      description: "Crafted with finest ingredients",
      details: "Every scoop is made with carefully selected, premium ingredients sourced from trusted suppliers worldwide.",
      stats: "99% Satisfaction Rate"
    },
    {
      icon: "❄️",
      title: "Fresh Daily",
      description: "Made fresh every single day",
      details: "Our ice cream is prepared fresh daily in small batches to ensure maximum flavor and quality.",
      stats: "Made < 12 Hours Ago"
    },
    {
      icon: "🌟",
      title: "Unique Flavors",
      description: "Innovative taste combinations",
      details: "Our flavor scientists create unique combinations that surprise and delight with every taste.",
      stats: "50+ Unique Flavors"
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent)]" />

      <div className="relative max-w-6xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-section font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-400">
            EXPERIENCE
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-12 mt-20">
          {experiences.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.3}>
              <motion.div
                className="group p-8 rounded-2xl glass hover:bg-white/10 transition-all duration-500 cursor-pointer"
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{
                    scale: activeCard === index ? 1.2 : 1,
                    rotate: activeCard === index ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-teal transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-4">
                  {item.description}
                </p>

                {/* Expanded Content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeCard === index ? 'auto' : 0,
                    opacity: activeCard === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-sm text-gray-300 mb-3">{item.details}</p>
                    <div className="inline-block px-3 py-1 bg-brand-teal/20 rounded-full text-brand-teal text-sm font-medium">
                      {item.stats}
                    </div>
                  </div>
                </motion.div>

                {/* Interactive Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ boxShadow: '0 0 0 rgba(20, 184, 166, 0)' }}
                  animate={{
                    boxShadow: activeCard === index
                      ? '0 0 30px rgba(20, 184, 166, 0.3)'
                      : '0 0 0 rgba(20, 184, 166, 0)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
