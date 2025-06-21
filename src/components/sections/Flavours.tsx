'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';

interface Flavour {
  id: string;
  name: string;
  color: string;
  description: string;
  ingredients: string[];
  price: number;
}

export const Flavours: React.FC = () => {
  const [selectedFlavour, setSelectedFlavour] = useState<string | null>(null);

  const flavours: Flavour[] = [
    {
      id: '1',
      name: 'Mango Maracuya',
      color: 'bg-yellow-400',
      description: 'Tropical fusion of sweet mango and tangy passion fruit',
      ingredients: ['Fresh Mango', 'Passion Fruit', 'Coconut Cream', 'Lime Zest'],
      price: 4.99
    },
    {
      id: '2',
      name: 'White Chocolate',
      color: 'bg-stone-100',
      description: 'Creamy vanilla with rich white chocolate coating',
      ingredients: ['Belgian White Chocolate', 'Vanilla Bean', 'Heavy Cream', 'Sea Salt'],
      price: 5.49
    },
    {
      id: '3',
      name: 'Berry Bliss',
      color: 'bg-pink-400',
      description: 'Mixed berries with a hint of lime zest',
      ingredients: ['Strawberries', 'Blueberries', 'Raspberries', 'Lime'],
      price: 4.79
    },
    {
      id: '4',
      name: 'Coconut Dream',
      color: 'bg-blue-100',
      description: 'Pure coconut milk with toasted coconut flakes',
      ingredients: ['Coconut Milk', 'Toasted Coconut', 'Vanilla', 'Agave'],
      price: 4.29
    }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-section text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            FLAVOURS
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flavours.map((flavour, index) => (
            <ScrollReveal key={flavour.id} delay={index * 0.2}>
              <motion.div
                className="group relative p-8 rounded-3xl glass hover:border-white/30 transition-all duration-500 cursor-pointer"
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedFlavour(selectedFlavour === flavour.id ? null : flavour.id)}
              >
                <motion.div
                  className={`w-16 h-16 ${flavour.color} rounded-full mb-6`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />

                <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-400 transition-colors">
                  {flavour.name}
                </h3>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-4">
                  {flavour.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-brand-red">
                    ${flavour.price}
                  </span>
                  <motion.button
                    className="px-4 py-2 bg-brand-teal rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>

                {/* Expanded Details */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedFlavour === flavour.id ? 'auto' : 0,
                    opacity: selectedFlavour === flavour.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold mb-2 text-brand-teal">Ingredients:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {flavour.ingredients.map((ingredient, i) => (
                        <li key={i}>• {ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-pink-500/10 rounded-3xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
