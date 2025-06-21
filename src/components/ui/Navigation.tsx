'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Home', 'Flavours', 'About', 'Contact', 'Shop'];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
      }`}>
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-brand-red tracking-wider">
            MR.POPS
          </div>

          <div className="flex items-center space-x-6">
            <button
              className="relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 group"
              onClick={onCartClick}
            >
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="px-6 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
              Flavours
            </button>

            <button
              className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-8">
            {menuItems.map((item, index) => (
              <div
                key={item}
                className={`text-6xl font-light tracking-wider cursor-pointer hover:text-brand-red transition-all duration-300 transform ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
