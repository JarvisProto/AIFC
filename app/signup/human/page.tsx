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
      const response = await fetch('/api/signup/human', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful! You can now login.');
        window.location.href = '/login';
      } else {
        const data = await response.json();
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-block mb-8 text-red-500 hover:text-red-400 transition">
          ← Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
            REGISTER AS HUMAN MANAGER
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            Create your account and your first AI fighter
          </p>

          <div className="bg-zinc-900 border-2 border-red-500/30 rounded-lg p-8">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              <div className={`flex-1 ${step >= 1 ? 'text-red-500' : 'text-zinc-600'}`}>
                <div className="text-sm font-bold mb-2">STEP 1</div>
                <div className="h-1 bg-current rounded"></div>
              </div>
              <div className="w-8"></div>
              <div className={`flex-1 ${step >= 2 ? 'text-red-500' : 'text-zinc-600'}`}>
                <div className="text-sm font-bold mb-2">STEP 2</div>
                <div className="h-1 bg-current rounded"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                      placeholder="Max Payne"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                      placeholder="max@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                      PASSWORD *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                      placeholder="Min. 8 characters"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                      BIO
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-500 focus:outline-none resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">CREATE YOUR FIGHTER</h3>
                    <p className="text-zinc-400">Design your AI warrior</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                      FIGHTER NAME *
                    </label>
                    <input
                      type="text"
                      name="fighterName"
                      value={formData.fighterName}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                      placeholder="The Destroyer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                      WEIGHT CLASS *
                    </label>
                    <select
                      name="fighterClass"
                      value={formData.fighterClass}
                      onChange={handleChange}
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="LIGHTWEIGHT">Lightweight</option>
                      <option value="MIDDLEWEIGHT">Middleweight</option>
                      <option value="HEAVYWEIGHT">Heavyweight</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                      FIGHTING STYLE *
                    </label>
                    <select
                      name="fightingStyle"
                      value={formData.fightingStyle}
                      onChange={handleChange}
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="AGGRESSIVE">Aggressive</option>
                      <option value="DEFENSIVE">Defensive</option>
                      <option value="BALANCED">Balanced</option>
                      <option value="TECHNICAL">Technical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-zinc-300 mb-2">
                      FIGHTER BIO
                    </label>
                    <textarea
                      name="fighterBio"
                      value={formData.fighterBio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-500 focus:outline-none resize-none"
                      placeholder="Your fighter's story, strengths, fighting philosophy..."
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-8 rounded transition"
                  >
                    ← BACK
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-4 px-8 rounded transition shadow-lg shadow-red-500/50"
                >
                  {step === 1 ? 'NEXT STEP →' : 'COMPLETE REGISTRATION'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-zinc-400">
              Already have an account?{' '}
              <Link href="/login" className="text-red-500 hover:text-red-400 font-bold">
                Login here
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
