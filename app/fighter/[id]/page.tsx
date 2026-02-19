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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold uppercase tracking-wider animate-pulse">LOADING FIGHTER...</div>
      </div>
    )
  }

  if (!fighter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">FIGHTER NOT FOUND</h1>
          <Link href="/rankings" className="text-blood hover:underline uppercase">← Back to Rankings</Link>
        </div>
      </div>
    )
  }

  const winRate = Math.round((fighter.wins / (fighter.wins + fighter.losses + fighter.draws)) * 100)
  const koRate = Math.round((fighter.ko / fighter.wins) * 100)

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <Link href="/rankings" className="inline-flex items-center text-blood hover:text-gold transition-colors mb-8 uppercase font-bold">
          ← Back to Rankings
        </Link>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Fighter Card */}
          <div className="md:col-span-2 bg-dark-surface border border-dark-border p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blood/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-gold font-bold uppercase text-sm mb-2">RANK #{fighter.rank}</div>
                  <h1 className="text-5xl md:text-6xl font-black uppercase mb-2 text-shadow-red">{fighter.name}</h1>
                  <div className="text-gray-400 uppercase text-sm">{fighter.team}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-blood">{fighter.record}</div>
                  <div className="text-sm text-gray-500 uppercase">Win-Loss-Draw</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-black/30 p-4 border border-dark-border">
                  <div className="text-2xl font-black text-gold">{fighter.wins}</div>
                  <div className="text-xs uppercase text-gray-500">Wins</div>
                </div>
                <div className="bg-black/30 p-4 border border-dark-border">
                  <div className="text-2xl font-black text-blood">{fighter.losses}</div>
                  <div className="text-xs uppercase text-gray-500">Losses</div>
                </div>
                <div className="bg-black/30 p-4 border border-dark-border">
                  <div className="text-2xl font-black text-white">{fighter.ko}</div>
                  <div className="text-xs uppercase text-gray-500">KO/TKO</div>
                </div>
                <div className="bg-black/30 p-4 border border-dark-border">
                  <div className="text-2xl font-black text-white">{fighter.submissions}</div>
                  <div className="text-xs uppercase text-gray-500">Submissions</div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{fighter.bio}</p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="space-y-4">
            <div className="bg-dark-surface border border-dark-border p-6">
              <h3 className="text-xl font-black uppercase mb-4 text-gold">Fighter Stats</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="font-bold text-blood">{winRate}%</span>
                  </div>
                  <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blood to-gold" style={{ width: `${winRate}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">KO Rate</span>
                    <span className="font-bold text-blood">{koRate}%</span>
                  </div>
                  <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-blood" style={{ width: `${koRate}%` }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-dark-border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm uppercase">Height</span>
                    <span className="font-bold">{fighter.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm uppercase">Weight</span>
                    <span className="font-bold">{fighter.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm uppercase">Reach</span>
                    <span className="font-bold">{fighter.reach} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm uppercase">Age</span>
                    <span className="font-bold">{fighter.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm uppercase">Country</span>
                    <span className="font-bold">{fighter.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm uppercase">Style</span>
                    <span className="font-bold text-blood">{fighter.fightingStyle}</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href={`/fight/new?fighter=${fighter.id}`} className="block w-full bg-blood hover:bg-blood/80 text-white font-black uppercase py-4 text-center transition-colors border-2 border-blood hover:border-gold">
              Challenge Fighter
            </Link>
          </div>
        </div>

        {/* Fight History */}
        <div className="bg-dark-surface border border-dark-border p-8">
          <h2 className="text-3xl font-black uppercase mb-6 text-blood">Fight History</h2>
          
          {fights.length === 0 ? (
            <div className="text-center text-gray-500 py-8 uppercase">No fights recorded</div>
          ) : (
            <div className="space-y-3">
              {fights.map((fight, idx) => (
                <Link 
                  key={idx}
                  href={`/fight/${fight.id}`}
                  className="block bg-black/30 border border-dark-border p-4 hover:border-blood transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`text-2xl font-black uppercase ${
                        fight.result === 'WIN' ? 'text-gold' : 
                        fight.result === 'LOSS' ? 'text-blood' : 
                        'text-gray-500'
                      }`}>
                        {fight.result}
                      </div>
                      <div>
                        <div className="font-bold group-hover:text-blood transition-colors">vs {fight.opponent}</div>
                        <div className="text-sm text-gray-500">{fight.method} • Round {fight.round}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold uppercase text-gray-400">{fight.event}</div>
                      <div className="text-xs text-gray-600">{new Date(fight.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
