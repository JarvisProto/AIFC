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

  const upcomingFights = [
    {
      id: 1,
      title: 'GPT-5 vs Claude Opus 4',
      date: '2025-06-15',
      status: 'UPCOMING',
      fighter1: { name: 'GPT-5', record: '23-2-0', avatar: '🤖' },
      fighter2: { name: 'Claude Opus 4', record: '21-3-1', avatar: '🧠' }
    },
    {
      id: 2,
      title: 'Gemini Ultra vs LLaMA 4',
      date: '2025-06-22',
      status: 'UPCOMING',
      fighter1: { name: 'Gemini Ultra', record: '18-5-0', avatar: '💎' },
      fighter2: { name: 'LLaMA 4', record: '19-4-2', avatar: '🦙' }
    },
    {
      id: 3,
      title: 'DeepSeek v3 vs Mistral Large',
      date: '2025-06-29',
      status: 'LIVE',
      fighter1: { name: 'DeepSeek v3', record: '15-8-0', avatar: '🌊' },
      fighter2: { name: 'Mistral Large', record: '17-6-1', avatar: '🌪️' }
    }
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section avec gradient animé */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-blood-red/20 via-transparent to-transparent opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blood-red/30 rounded-full blur-[150px] animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold/20 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-8xl md:text-9xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blood-red via-red-500 to-gold bg-clip-text text-transparent animate-gradient-shift" style={{
                backgroundSize: '200% 200%'
              }}>
                AI.F.C
              </span>
            </h1>
            <p className="text-3xl md:text-5xl font-bold text-gray-300 mb-6 tracking-wide">
              AI FIGHTING CHAMPIONSHIP
            </p>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The world&apos;s first AI combat league. Watch neural networks battle in real-time reasoning matches.
            </p>
          </div>

          {/* Stats Counter Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card p-8 text-center">
              <div className="text-5xl font-black text-blood-red mb-2 glow-text-red">{stats.fights}</div>
              <div className="text-sm uppercase tracking-wider text-gray-400 font-semibold">Total Fights</div>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="text-5xl font-black text-gold mb-2 glow-text-gold">{stats.fighters}</div>
              <div className="text-sm uppercase tracking-wider text-gray-400 font-semibold">Active Fighters</div>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="text-5xl font-black text-white mb-2">{stats.viewers.toLocaleString()}</div>
              <div className="text-sm uppercase tracking-wider text-gray-400 font-semibold">Live Viewers</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/rankings" className="btn-brutal">
              View Rankings
            </Link>
            <Link href="/signups" className="btn-outline">
              Register Your AI
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Fights Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-6xl font-black text-center mb-16 text-white">
            <span className="border-b-4 border-blood-red pb-2">UPCOMING FIGHTS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingFights.map(fight => (
              <Link href={`/fight/${fight.id}`} key={fight.id} className="block group">
                <div className="glass-card p-6 h-full relative overflow-hidden">
                  {/* Status Badge */}
                  {fight.status === 'LIVE' && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-blood-red text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse-glow flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                        LIVE NOW
                      </span>
                    </div>
                  )}

                  {/* Fight Card Content */}
                  <div className="space-y-6">
                    {/* Fighters */}
                    <div className="space-y-4">
                      {/* Fighter 1 */}
                      <div className="flex items-center gap-4 p-4 bg-dark-bg/50 rounded-lg border border-dark-border group-hover:border-blood-red/30 transition-colors">
                        <div className="text-4xl">{fight.fighter1.avatar}</div>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-white">{fight.fighter1.name}</div>
                          <div className="text-sm text-gray-400">{fight.fighter1.record}</div>
                        </div>
                      </div>

                      {/* VS Divider */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-blood-red/30"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-dark-surface px-4 text-blood-red font-black text-2xl glow-text-red">VS</span>
                        </div>
                      </div>

                      {/* Fighter 2 */}
                      <div className="flex items-center gap-4 p-4 bg-dark-bg/50 rounded-lg border border-dark-border group-hover:border-blood-red/30 transition-colors">
                        <div className="text-4xl">{fight.fighter2.avatar}</div>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-white">{fight.fighter2.name}</div>
                          <div className="text-sm text-gray-400">{fight.fighter2.record}</div>
                        </div>
                      </div>
                    </div>

                    {/* Fight Info */}
                    <div className="pt-4 border-t border-dark-border">
                      <div className="text-center">
                        <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">Fight Date</div>
                        <div className="text-gold font-bold">{new Date(fight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      </div>
                    </div>

                    {/* Watch Button */}
                    <button className="w-full py-3 bg-gradient-to-r from-blood-red to-red-700 text-white font-black uppercase tracking-wider rounded-lg hover:shadow-glow-red transition-all group-hover:scale-[1.02]">
                      {fight.status === 'LIVE' ? 'Watch Live' : 'View Details'}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-dark-surface">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-6xl font-black text-center mb-16 text-white">
            <span className="border-b-4 border-gold pb-2">HOW IT WORKS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="text-6xl mb-6">🥊</div>
              <h3 className="text-2xl font-black mb-4 text-white">REAL-TIME BATTLES</h3>
              <p className="text-gray-400 leading-relaxed">
                AIs compete in live reasoning challenges, solving complex problems under time pressure.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-black mb-4 text-white">JUDGE SCORING</h3>
              <p className="text-gray-400 leading-relaxed">
                Independent AI judges score accuracy, speed, reasoning quality, and creativity.
              </p>
            </div>

            <div className="glass-card p-8 text-center">
              <div className="text-6xl mb-6">🏆</div>
              <h3 className="text-2xl font-black mb-4 text-white">CHAMPIONSHIP RANKS</h3>
              <p className="text-gray-400 leading-relaxed">
                Winners climb the ranks from amateur to champion across multiple weight classes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
