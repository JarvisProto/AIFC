'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Fighter {
  id: string
  name: string
  rank: number
  record: string
  wins: number
  losses: number
  draws: number
  ko: number
  submissions: number
  decisions: number
  reach: number
  height: number
  weight: number
  age: number
  country: string
  team: string
  fightingStyle: string
  bio: string
}

interface Fight {
  id: string
  opponent: string
  result: 'WIN' | 'LOSS' | 'DRAW'
  method: string
  round: number
  date: string
  event: string
}

export default function FighterProfile() {
  const params = useParams()
  const [fighter, setFighter] = useState<Fighter | null>(null)
  const [fights, setFights] = useState<Fight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFighter() {
      try {
        const res = await fetch(`/api/fighters/${params.id}`)
        const data = await res.json()
        setFighter(data.fighter)
        setFights(data.fights)
      } catch (error) {
        console.error('Failed to load fighter:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFighter()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blood-red border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-500 uppercase tracking-widest font-bold text-sm">LOADING FIGHTER...</p>
        </div>
      </div>
    )
  }

  if (!fighter) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blood-red mb-4">FIGHTER NOT FOUND</h1>
          <Link href="/rankings" className="btn-primary">
            BACK TO RANKINGS
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section with Background */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blood-red/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-6 relative h-full flex items-center">
          <div>
            <div className="inline-block bg-blood-red/10 border border-blood-red/30 px-4 py-2 mb-4 animate-pulse">
              <span className="text-blood-red font-bold text-sm tracking-widest">RANK #{fighter.rank}</span>
            </div>
            <h1 className="text-7xl font-black mb-4 text-white text-glow">{fighter.name}</h1>
            <div className="flex gap-6 text-xl">
              <div>
                <span className="text-gray-500 uppercase text-sm tracking-wider">Record</span>
                <p className="text-white font-bold text-2xl">{fighter.record}</p>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-sm tracking-wider">Team</span>
                <p className="text-white font-bold text-2xl">{fighter.team}</p>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-sm tracking-wider">Style</span>
                <p className="text-white font-bold text-2xl">{fighter.fightingStyle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
            <div className="text-5xl font-black text-blood-red mb-2 group-hover:text-glow">{fighter.wins}</div>
            <div className="text-gray-500 uppercase text-sm tracking-widest">Wins</div>
            <div className="text-xs text-gray-600 mt-2">
              {fighter.ko} KO • {fighter.submissions} SUB • {fighter.decisions} DEC
            </div>
          </div>

          <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
            <div className="text-5xl font-black text-gray-400 mb-2">{fighter.losses}</div>
            <div className="text-gray-500 uppercase text-sm tracking-widest">Losses</div>
          </div>

          <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
            <div className="text-5xl font-black text-white mb-2">{fighter.reach}&quot;</div>
            <div className="text-gray-500 uppercase text-sm tracking-widest">Reach</div>
          </div>

          <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
            <div className="text-5xl font-black text-white mb-2">{fighter.age}</div>
            <div className="text-gray-500 uppercase text-sm tracking-widest">Age</div>
          </div>
        </div>

        {/* Bio */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-wider">Biography</h2>
          <p className="text-gray-400 leading-relaxed text-lg">{fighter.bio}</p>
        </div>

        {/* Fight History */}
        <div>
          <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-wider">Fight History</h2>
          <div className="space-y-4">
            {fights.map((fight) => (
              <div key={fight.id} className="glass-card p-6 flex items-center justify-between group hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-6">
                  <div className={`px-4 py-2 font-black text-lg ${
                    fight.result === 'WIN' ? 'bg-green-600/20 text-green-400 border border-green-500/30' :
                    fight.result === 'LOSS' ? 'bg-red-600/20 text-red-400 border border-red-500/30' :
                    'bg-gray-600/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {fight.result}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">vs {fight.opponent}</div>
                    <div className="text-sm text-gray-500">{fight.event} • {new Date(fight.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm uppercase tracking-wider">Method</div>
                  <div className="text-white font-bold">{fight.method}</div>
                  <div className="text-gray-500 text-sm">Round {fight.round}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/rankings" className="btn-primary">
            BACK TO RANKINGS
          </Link>
        </div>
      </div>
    </div>
  )
}
