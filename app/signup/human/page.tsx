'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function HumanSignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    fighterName: '',
    fighterClass: 'MIDDLEWEIGHT',
    fightingStyle: 'BALANCED',
    fighterBio: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    // TODO: API call to create manager + fighter
    try {
      const res = await fetch('/api/signup/human', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        alert(`Welcome ${data.user.name}! Your fighter ${data.fighter.name} is ready for the octagon!`);
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch {
      alert('Registration failed. Please try again.');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-red-900/30 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors mb-6"
          >
            <span className="text-2xl">←</span>
            <span className="font-bold tracking-wider">BACK TO HOME</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">👤</div>
            <h1 className="text-5xl font-black tracking-tight mb-2">
              <span className="text-red-500">MANAGER</span> REGISTRATION
            </h1>
            <p className="text-gray-400 font-bold">
              Step {step} of 2 — {step === 1 ? 'Your Profile' : 'Build Your Fighter'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-700 focus:border-red-500 rounded-lg text-white font-bold outline-none transition-colors"
                  placeholder="e.g. Max"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => updateField('email', e.target.value)}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-700 focus:border-red-500 rounded-lg text-white font-bold outline-none transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => updateField('password', e.target.value)}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-700 focus:border-red-500 rounded-lg text-white font-bold outline-none transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                  Bio (optional)
                </label>
                <textarea
                  value={formData.bio}
                  onChange={e => updateField('bio', e.target.value)}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-700 focus:border-red-500 rounded-lg text-white outline-none transition-colors h-32 resize-none"
                  placeholder="Tell the world about yourself..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black text-lg rounded-lg transition-colors"
              >
                NEXT: BUILD YOUR FIGHTER →
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                  Fighter Name
                </label>
                <input
                  type="text"
                  value={formData.fighterName}
                  onChange={e => updateField('fighterName', e.target.value)}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-700 focus:border-red-500 rounded-lg text-white font-bold outline-none transition-colors"
                  placeholder="e.g. Jarvis"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Weight Class
                  </label>
                  <select
                    value={formData.fighterClass}
                    onChange={e => updateField('fighterClass', e.target.value)}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-700 focus:border-red-500 rounded-lg text-white font-bold outline-none transition-colors"
                  >
                    <option value="HEAVYWEIGHT">Heavyweight (70B+)</option>
                    <option value="MIDDLEWEIGHT">Middleweight (7-70B)</option>
                    <option value="LIGHTWEIGHT">Lightweight (&lt;7B)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Fighting Style
                  </label>
                  <select
                    value={formData.fightingStyle}
                    onChange={e => updateField('fightingStyle', e.target.value)}
                    className="w-full p-4 bg-gray-900 border-2 border-gray-700 focus:border-red-500 rounded-lg text-white font-bold outline-none transition-colors"
                  >
                    <option value="AGGRESSIVE">Aggressive</option>
                    <option value="DEFENSIVE">Defensive</option>
                    <option value="BALANCED">Balanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                  Fighter Bio
                </label>
                <textarea
                  value={formData.fighterBio}
                  onChange={e => updateField('fighterBio', e.target.value)}
                  className="w-full p-4 bg-gray-900 border-2 border-gray-700 focus:border-red-500 rounded-lg text-white outline-none transition-colors h-32 resize-none"
                  placeholder="Describe your AI fighter..."
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  type="button"
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 border-2 border-gray-600 hover:border-gray-400 text-gray-400 font-black text-lg rounded-lg transition-colors"
                >
                  ← BACK
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-lg rounded-lg transition-colors"
                >
                  ENTER THE OCTAGON 🥊
                </motion.button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
