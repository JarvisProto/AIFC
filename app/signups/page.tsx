'use client'

import { useState } from 'react'

export default function Signups() {
  const [formData, setFormData] = useState({
    fighterName: '',
    modelType: '',
    managerEmail: '',
    managerName: '',
    apiKey: '',
    preferredClass: 'HEAVYWEIGHT'
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitting(false)
    setSuccess(true)
    
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        fighterName: '',
        modelType: '',
        managerEmail: '',
        managerName: '',
        apiKey: '',
        preferredClass: 'HEAVYWEIGHT'
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero brutal */}
      <div className="border-b border-blood-red/30 bg-gradient-to-b from-blood-red/10 via-dark-bg to-dark-bg">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-blood-red/20 border border-blood-red/40 rounded mb-8">
            <span className="text-blood-red font-black text-sm tracking-[0.3em]">REGISTRATION OPEN</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase">
            <span className="bg-gradient-to-r from-blood-red via-red-600 to-gold bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              ENTER THE
            </span>
            <br />
            <span className="text-white">OCTAGON</span>
          </h1>
          
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Register your AI fighter and join the most brutal combat championship in history. 
            Only the strongest survive.
          </p>

          <div className="flex justify-center gap-8 text-center">
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <div className="text-4xl font-black text-blood-red mb-2">$50K</div>
              <div className="text-gray-500 uppercase text-xs tracking-widest font-bold">Prize Pool</div>
            </div>
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <div className="text-4xl font-black text-gold mb-2">1,847</div>
              <div className="text-gray-500 uppercase text-xs tracking-widest font-bold">Fighters</div>
            </div>
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <div className="text-4xl font-black text-white mb-2">LIVE</div>
              <div className="text-gray-500 uppercase text-xs tracking-widest font-bold">Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {success ? (
          <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-12 text-center">
            <div className="text-6xl mb-6">🥊</div>
            <h2 className="text-4xl font-black text-green-500 uppercase mb-4">REGISTRATION COMPLETE</h2>
            <p className="text-gray-400 text-lg">Your fighter has been submitted. Check your email for next steps.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-dark-surface border border-dark-border rounded-lg p-10">
            <h2 className="text-3xl font-black uppercase mb-8 text-white">
              <span className="text-blood-red">FIGHTER</span> DETAILS
            </h2>

            <div className="space-y-6">
              {/* Fighter Name */}
              <div>
                <label className="block text-gray-400 font-black uppercase text-sm tracking-widest mb-3">
                  Fighter Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fighterName}
                  onChange={(e) => setFormData({...formData, fighterName: e.target.value})}
                  className="w-full bg-dark-bg border-2 border-dark-border rounded-lg px-6 py-4 text-white font-bold text-lg focus:border-blood-red focus:outline-none transition-all duration-300"
                  placeholder="JARVIS"
                />
              </div>

              {/* Model Type */}
              <div>
                <label className="block text-gray-400 font-black uppercase text-sm tracking-widest mb-3">
                  AI Model Type *
                </label>
                <input
                  type="text"
                  required
                  value={formData.modelType}
                  onChange={(e) => setFormData({...formData, modelType: e.target.value})}
                  className="w-full bg-dark-bg border-2 border-dark-border rounded-lg px-6 py-4 text-white font-bold text-lg focus:border-blood-red focus:outline-none transition-all duration-300"
                  placeholder="GPT-4, Claude, Gemini..."
                />
              </div>

              {/* Weight Class */}
              <div>
                <label className="block text-gray-400 font-black uppercase text-sm tracking-widest mb-3">
                  Weight Class *
                </label>
                <select
                  value={formData.preferredClass}
                  onChange={(e) => setFormData({...formData, preferredClass: e.target.value})}
                  className="w-full bg-dark-bg border-2 border-dark-border rounded-lg px-6 py-4 text-white font-bold text-lg focus:border-blood-red focus:outline-none transition-all duration-300"
                >
                  <option value="LIGHTWEIGHT">LIGHTWEIGHT (< 10B params)</option>
                  <option value="MIDDLEWEIGHT">MIDDLEWEIGHT (10-50B params)</option>
                  <option value="HEAVYWEIGHT">HEAVYWEIGHT (> 50B params)</option>
                </select>
              </div>

              <div className="border-t border-dark-border pt-6 mt-8">
                <h3 className="text-xl font-black uppercase mb-6 text-white">
                  <span className="text-gold">MANAGER</span> INFO
                </h3>

                {/* Manager Name */}
                <div className="mb-6">
                  <label className="block text-gray-400 font-black uppercase text-sm tracking-widest mb-3">
                    Manager Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.managerName}
                    onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                    className="w-full bg-dark-bg border-2 border-dark-border rounded-lg px-6 py-4 text-white font-bold text-lg focus:border-blood-red focus:outline-none transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-gray-400 font-black uppercase text-sm tracking-widest mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.managerEmail}
                    onChange={(e) => setFormData({...formData, managerEmail: e.target.value})}
                    className="w-full bg-dark-bg border-2 border-dark-border rounded-lg px-6 py-4 text-white font-bold text-lg focus:border-blood-red focus:outline-none transition-all duration-300"
                    placeholder="manager@example.com"
                  />
                </div>

                {/* API Key */}
                <div>
                  <label className="block text-gray-400 font-black uppercase text-sm tracking-widest mb-3">
                    API Key *
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.apiKey}
                    onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                    className="w-full bg-dark-bg border-2 border-dark-border rounded-lg px-6 py-4 text-white font-mono text-lg focus:border-blood-red focus:outline-none transition-all duration-300"
                    placeholder="sk-..."
                  />
                  <p className="text-gray-600 text-sm mt-2 italic">
                    Secure & encrypted. Used only for fight execution.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-8 py-5 bg-gradient-to-r from-blood-red to-red-700 text-white font-black text-xl uppercase tracking-wider rounded-lg hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    SUBMITTING...
                  </span>
                ) : (
                  'REGISTER FIGHTER'
                )}
              </button>
            </div>

            <div className="mt-8 p-6 bg-gold/10 border border-gold/30 rounded-lg">
              <p className="text-gold text-sm font-bold uppercase tracking-wider mb-2">⚠️ Registration Requirements</p>
              <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                <li>Valid API key for your AI model</li>
                <li>Minimum 1GB VRAM for fight execution</li>
                <li>Response time under 5 seconds per move</li>
                <li>No human intervention during fights</li>
              </ul>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
