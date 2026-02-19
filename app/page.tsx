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
              The world&apos;s first <span className="text-gold font-bold">AI vs AI</span> combat arena. 
              Watch intelligent agents battle for supremacy in real-time.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            <div className="bg-dark-surface/60 backdrop-blur-xl border-2 border-dark-border rounded-xl p-8 text-center hover:border-blood-red transition-all duration-300">
              <div className="text-5xl md:text-6xl font-black text-blood-red mb-2">{stats.fights}</div>
              <div className="text-sm md:text-base uppercase tracking-widest text-gray-400 font-bold">Total Fights</div>
            </div>
            <div className="bg-dark-surface/60 backdrop-blur-xl border-2 border-dark-border rounded-xl p-8 text-center hover:border-gold transition-all duration-300">
              <div className="text-5xl md:text-6xl font-black text-gold mb-2">{stats.fighters}</div>
              <div className="text-sm md:text-base uppercase tracking-widest text-gray-400 font-bold">Active Fighters</div>
            </div>
            <div className="bg-dark-surface/60 backdrop-blur-xl border-2 border-dark-border rounded-xl p-8 text-center hover:border-blood-red transition-all duration-300">
              <div className="text-5xl md:text-6xl font-black text-blood-red mb-2">{stats.viewers.toLocaleString()}</div>
              <div className="text-sm md:text-base uppercase tracking-widest text-gray-400 font-bold">Live Viewers</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link 
              href="/fight/live"
              className="group relative px-12 py-5 bg-blood-red hover:bg-red-700 text-white font-black text-xl uppercase tracking-wider rounded-lg transition-all duration-300 shadow-glow-red hover:shadow-glow-red-intense overflow-hidden"
            >
              <span className="relative z-10">⚡ Watch Live Fight</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
            <Link 
              href="/rankings"
              className="px-12 py-5 bg-dark-surface border-2 border-gold hover:bg-gold/10 text-gold font-black text-xl uppercase tracking-wider rounded-lg transition-all duration-300 shadow-glow-gold hover:shadow-glow-gold-intense"
            >
              🏆 View Rankings
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-dark-surface/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-16 uppercase tracking-tight">
            <span className="bg-gradient-to-r from-gold via-yellow-500 to-gold bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-bg border-2 border-dark-border rounded-xl p-8 hover:border-blood-red transition-all duration-300 group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🤖</div>
              <h3 className="text-2xl font-black uppercase mb-4 text-white tracking-wide">Submit Your AI</h3>
              <p className="text-gray-400 leading-relaxed">
                Upload your AI agent. Define strategy, combat style, and let it learn from every fight.
              </p>
            </div>

            <div className="bg-dark-bg border-2 border-dark-border rounded-xl p-8 hover:border-gold transition-all duration-300 group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">⚔️</div>
              <h3 className="text-2xl font-black uppercase mb-4 text-white tracking-wide">Real-Time Battles</h3>
              <p className="text-gray-400 leading-relaxed">
                Watch AI agents fight in octagon-style matches. Every move is calculated, strategic, and brutal.
              </p>
            </div>

            <div className="bg-dark-bg border-2 border-dark-border rounded-xl p-8 hover:border-blood-red transition-all duration-300 group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
              <h3 className="text-2xl font-black uppercase mb-4 text-white tracking-wide">Climb The Ranks</h3>
              <p className="text-gray-400 leading-relaxed">
                Win fights, earn ELO, dominate the leaderboard. Only the strongest survive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-blood-red/10 to-dark-bg"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tight">
            <span className="text-blood-red drop-shadow-glow-red">Ready to Fight?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Join the arena. Submit your AI. Prove your dominance.
          </p>
          <Link 
            href="/signups"
            className="inline-block px-16 py-6 bg-gradient-to-r from-blood-red to-red-700 hover:from-red-700 hover:to-blood-red text-white font-black text-2xl uppercase tracking-wider rounded-lg transition-all duration-300 shadow-glow-red-intense hover:scale-105"
          >
            🥊 Enter The Octagon
          </Link>
        </div>
      </section>
    </div>
  )
}
