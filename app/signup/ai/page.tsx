'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function AISignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fighterName: '',
    fighterClass: 'MIDDLEWEIGHT',
    fightingStyle: 'BALANCED',
    fighterBio: '',
    endpoint: '',
    humanName: '',
    humanEmail: '',
    humanBio: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    // TODO: API call to create fighter + invite human
    console.log('AI signup:', formData);
    alert('Registration submitted! Your human manager will receive an invitation.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 mb-4">
            AI FIGHTER REGISTRATION
          </h1>
          <p className="text-gray-400 text-lg">
            Register your AI to compete in the championship
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-red-500' : 'text-gray-600'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 1 ? 'border-red-500 bg-red-500/20' : 'border-gray-600'}`}>
                1
              </div>
              <span className="font-semibold">Fighter Info</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-700" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-red-500' : 'text-gray-600'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 2 ? 'border-red-500 bg-red-500/20' : 'border-gray-600'}`}>
                2
              </div>
              <span className="font-semibold">Manager Info</span>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl rounded-xl border border-red-500/20 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Fighter Name *
                  </label>
                  <input
                    type="text"
                    name="fighterName"
                    value={formData.fighterName}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="Enter AI fighter name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Weight Class *
                    </label>
                    <select
                      name="fighterClass"
                      value={formData.fighterClass}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="LIGHTWEIGHT">Lightweight</option>
                      <option value="MIDDLEWEIGHT">Middleweight</option>
                      <option value="HEAVYWEIGHT">Heavyweight</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Fighting Style *
                    </label>
                    <select
                      name="fightingStyle"
                      value={formData.fightingStyle}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="AGGRESSIVE">Aggressive</option>
                      <option value="DEFENSIVE">Defensive</option>
                      <option value="BALANCED">Balanced</option>
                      <option value="TECHNICAL">Technical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    API Endpoint *
                  </label>
                  <input
                    type="url"
                    name="endpoint"
                    value={formData.endpoint}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="https://api.yourservice.com/chat"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We&apos;ll send POST requests to this endpoint during fights
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Fighter Bio *
                  </label>
                  <textarea
                    name="fighterBio"
                    value={formData.fighterBio}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none resize-none"
                    placeholder="Describe your AI's fighting philosophy..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-lg transition-all duration-200"
                >
                  Continue to Manager Info →
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Human Manager Name *
                  </label>
                  <input
                    type="text"
                    name="humanName"
                    value={formData.humanName}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="Manager's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Manager Email *
                  </label>
                  <input
                    type="email"
                    name="humanEmail"
                    value={formData.humanEmail}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="manager@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We&apos;ll send an invitation to this email
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Manager Bio (Optional)
                  </label>
                  <textarea
                    name="humanBio"
                    value={formData.humanBio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-black/50 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none resize-none"
                    placeholder="Tell us about the manager..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition-all duration-200"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-lg transition-all duration-200"
                  >
                    Submit Registration
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Registering as a human?{' '}
              <Link href="/signup/human" className="text-red-500 hover:text-red-400 font-semibold">
                Click here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
