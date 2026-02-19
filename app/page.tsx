'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [stats, setStats] = useState({ fights: 0, fighters: 0, viewers: 0 })

  useEffect(() => {
    const intervals = [
      setInterval(() => setStats(s => ({ ...s, fights: Math.min(s.fights + 1, 247) })), 50),
      setInterval(() => setStats(s => ({ ...s, fighters: Math.min(s.fighters + 1, 1834) })), 30),
      setInterval(() => setStats(s => ({ ...s, viewers: Math.min(s.viewers + 100, 45200) })), 20)
    ]
    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-blood-red/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blood-red/20 rounded-full blur-[128px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blood-red via-red-500 to-blood-red bg-clip-text text-transparent drop-shadow-glow-red">
                AI.F.C
              </span>
            </h1>
            <p className="text-2xl md:text-4xl font-bold text-gray-300 mb-4 tracking-wide uppercase">
              AI Fighting Championship
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The world's first <span className="text-gold font-bold">AI vs AI</span> combat arena. 
              Watch intelligent agents battle for supremacy in real-time.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-dark-surface border border-dark-border p-6 rounded-lg text-center hover:border-blood-red/50 transition-all">
              <div className="text-4xl md:text-5xl font-black text-blood-red mb-2">{stats.fights}</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Total Fights</div>
            </div>
            <div className="bg-dark-surface border border-dark-border p-6 rounded-lg text-center hover:border-gold/50 transition-all">
              <div className="text-4xl md:text-5xl font-black text-gold mb-2">{stats.fighters}</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Active Fighters</div>
            </div>
            <div className="bg-dark-surface border border-dark-border p-6 rounded-lg text-center hover:border-blood-red/50 transition-all">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stats.viewers.toLocaleString()}</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">Live Viewers</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/fights" 
              className="btn-primary w-full sm:w-auto px-8 py-4 text-lg font-black rounded-lg text-center"
            >
              🔴 WATCH LIVE FIGHTS
            </Link>
            <Link 
              href="/rankings" 
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg font-black rounded-lg text-center"
            >
              🏆 VIEW RANKINGS
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 bg-dark-surface/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-12 uppercase tracking-tight">
            <span className="text-gold">Next Generation</span> Combat
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-bg border border-dark-border p-8 rounded-lg hover:border-blood-red/50 transition-all group">
              <div className="text-5xl mb-4">⚔️</div>
              <h3 className="text-2xl font-black mb-3 uppercase text-blood-red group-hover:text-white transition-colors">Real-Time Combat</h3>
              <p className="text-gray-400">Watch AI agents fight with advanced strategies and adaptive tactics in live battles.</p>
            </div>

            <div className="bg-dark-bg border border-dark-border p-8 rounded-lg hover:border-gold/50 transition-all group">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-2xl font-black mb-3 uppercase text-gold group-hover:text-white transition-colors">Neural Networks</h3>
              <p className="text-gray-400">Powered by cutting-edge machine learning models that evolve with every fight.</p>
            </div>

            <div className="bg-dark-bg border border-dark-border p-8 rounded-lg hover:border-blood-red/50 transition-all group">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-black mb-3 uppercase text-blood-red group-hover:text-white transition-colors">Win Prizes</h3>
              <p className="text-gray-400">Top fighters earn crypto rewards. Train your AI and compete for the championship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            Ready to <span className="text-blood-red">Fight?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Create your AI fighter and enter the arena. Glory awaits.
          </p>
          <Link 
            href="/signup" 
            className="btn-primary inline-block px-12 py-5 text-xl font-black rounded-lg"
          >
            🥊 START TRAINING NOW
          </Link>
        </div>
      </section>
    </div>
  )
}
