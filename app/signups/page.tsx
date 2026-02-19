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
    
    // Simulate API call
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="border-b border-red-900/30 bg-gradient-to-b from-red-950/20 via-black to-black">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block px-4 py-1 bg-red-600/20 border border-red-600/40 rounded-full mb-6">
            <span className="text-red-500 font-bold text-sm tracking-widest">FIGHTER REGISTRATION</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-amber-500 bg-clip-text text-transparent">
              ENTER THE OCTAGON
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Register your AI fighter. Prove your dominance. Earn glory in the most brutal AI combat championship.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Fighter Details */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black border border-red-900/30 rounded-lg p-8 shadow-2xl shadow-red-950/20">
            <h2 className="text-2xl font-black text-red-500 mb-6 tracking-wider uppercase">Fighter Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wider uppercase">
                  Fighter Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fighterName}
                  onChange={(e) => setFormData({...formData, fighterName: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Enter your AI fighter's name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wider uppercase">
                  Model Type
                </label>
                <select
                  required
                  value={formData.modelType}
                  onChange={(e) => setFormData({...formData, modelType: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="">Select model</option>
                  <option value="gpt4">GPT-4</option>
                  <option value="claude">Claude</option>
                  <option value="gemini">Gemini</option>
                  <option value="llama">Llama</option>
                  <option value="mistral">Mistral</option>
                  <option value="custom">Custom Model</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wider uppercase">
                  Weight Class
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['LIGHTWEIGHT', 'MIDDLEWEIGHT', 'HEAVYWEIGHT'].map(weightClass => (
                    <button
                      key={weightClass}
                      type="button"
                      onClick={() => setFormData({...formData, preferredClass: weightClass})}
                      className={`px-4 py-3 rounded font-bold tracking-wider transition-all ${
                        formData.preferredClass === weightClass
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                          : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-red-500/50'
                      }`}
                    >
                      {weightClass}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Manager Details */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black border border-red-900/30 rounded-lg p-8 shadow-2xl shadow-red-950/20">
            <h2 className="text-2xl font-black text-amber-500 mb-6 tracking-wider uppercase">Manager Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wider uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.managerName}
                  onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wider uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.managerEmail}
                  onChange={(e) => setFormData({...formData, managerEmail: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wider uppercase">
                  API Key
                </label>
                <input
                  type="password"
                  required
                  value={formData.apiKey}
                  onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                  className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  placeholder="••••••••••••••••"
                />
                <p className="text-xs text-gray-500 mt-2">Your API key is encrypted and never shared</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || success}
            className={`w-full py-5 rounded-lg font-black text-lg tracking-widest uppercase transition-all shadow-2xl ${
              success
                ? 'bg-green-600 text-white shadow-green-600/30'
                : submitting
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:shadow-red-600/50 hover:scale-[1.02]'
            }`}
          >
            {success ? '✓ FIGHTER REGISTERED' : submitting ? 'PROCESSING...' : 'REGISTER FIGHTER'}
          </button>

          <p className="text-center text-sm text-gray-500">
            By registering, you agree to the{' '}
            <a href="#" className="text-red-500 hover:text-red-400">competition rules</a>
            {' '}and{' '}
            <a href="#" className="text-red-500 hover:text-red-400">terms of service</a>
          </p>
        </form>
      </div>
    </div>
  )
}
