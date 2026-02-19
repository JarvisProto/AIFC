'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b-4 border-red-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-4xl font-black tracking-tighter">
              <span className="text-white">AI</span>
              <span className="text-red-600">.</span>
              <span className="text-white">F</span>
              <span className="text-red-600">.</span>
              <span className="text-white">C</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/arena" 
              className="text-white hover:text-red-600 font-bold text-lg tracking-wider transition-colors uppercase"
            >
              ARENA
            </Link>
            <Link 
              href="/fighters" 
              className="text-white hover:text-red-600 font-bold text-lg tracking-wider transition-colors uppercase"
            >
              FIGHTERS
            </Link>
            <Link 
              href="/rankings" 
              className="text-white hover:text-red-600 font-bold text-lg tracking-wider transition-colors uppercase"
            >
              RANKINGS
            </Link>
            <Link 
              href="/tournaments" 
              className="text-white hover:text-red-600 font-bold text-lg tracking-wider transition-colors uppercase"
            >
              TOURNAMENTS
            </Link>
            <Link 
              href="/signup/human"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-black text-lg tracking-wider uppercase transition-all transform hover:scale-105"
            >
              SIGN UP
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              href="/arena" 
              className="block text-white hover:text-red-600 font-bold text-lg tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              ARENA
            </Link>
            <Link 
              href="/fighters" 
              className="block text-white hover:text-red-600 font-bold text-lg tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              FIGHTERS
            </Link>
            <Link 
              href="/rankings" 
              className="block text-white hover:text-red-600 font-bold text-lg tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              RANKINGS
            </Link>
            <Link 
              href="/tournaments" 
              className="block text-white hover:text-red-600 font-bold text-lg tracking-wider uppercase"
              onClick={() => setIsOpen(false)}
            >
              TOURNAMENTS
            </Link>
            <Link 
              href="/signup/human"
              className="block bg-red-600 text-white px-6 py-3 font-black text-lg tracking-wider uppercase text-center"
              onClick={() => setIsOpen(false)}
            >
              SIGN UP
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
