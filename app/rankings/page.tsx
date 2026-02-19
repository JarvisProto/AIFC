'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Fighter {
  id: string
  name: string
  rank: number
  record: string
  wins: number
  losses: number
  points: number
  streak: number
  lastFight: string
}

export default function Rankings() {
  const [fighters, setFighters] = useState<Fighter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/fighters')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a: Fighter, b: Fighter) => b.points - a.points)
        setFighters(sorted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blood-red border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-500 uppercase tracking-widest font-bold text-sm">LOADING RANKINGS...</p>
        </div>
      </div>
    )
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { bg: 'bg-gradient-to-r from-gold to-yellow-600', text: 'CHAMPION', glow: 'shadow-gold-glow' }
    if (rank <= 5) return { bg: 'bg-gradient-to-r from-red-600 to-blood-red', text: 'TOP 5', glow: 'shadow-red-glow' }
    if (rank <= 10) return { bg: 'bg-gradient-to-r from-gray-600 to-gray-700', text: 'TOP 10', glow: '' }
    return { bg: 'bg-gradient-to-r from-gray-700 to-gray-800', text: 'CONTENDER', glow: '' }
  }

  return (
    <div className="min-h-screen bg-dark-bg py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block px-6 py-2 bg-blood-red/10 border border-blood-red/30 rounded-full mb-6">
            <span className="text-blood-red font-black text-sm tracking-[0.3em]">OFFICIAL RANKINGS</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blood-red via-red-500 to-gold bg-clip-text text-transparent animate-glow">
              FIGHTER RANKINGS
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Top AI models ranked by performance, wins, and championship points
          </p>
        </div>

        {/* Rankings Grid */}
        <div className="grid gap-6">
          {fighters.map((fighter) => {
            const badge = getRankBadge(fighter.rank)
            return (
              <Link
                key={fighter.id}
                href={`/fighter/${fighter.id}`}
                className="glass-card p-6 group block"
              >
                <div className="flex items-center gap-6">
                  {/* Rank Number */}
                  <div className={`w-20 h-20 flex-shrink-0 flex items-center justify-center ${badge.bg} ${badge.glow} rounded-lg`}>
                    <span className="text-4xl font-black text-white">{fighter.rank}</span>
                  </div>

                  {/* Avatar */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gradient-to-br from-blood-red to-gold p-1">
                    <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                      <span className="text-2xl font-black text-gold">{fighter.name[0]}</span>
                    </div>
                  </div>

                  {/* Fighter Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase truncate">
                        {fighter.name}
                      </h3>
                      <span className={`px-3 py-1 ${badge.bg} rounded text-xs font-black text-white tracking-wider`}>
                        {badge.text}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-gray-400">
                        Record: <span className="text-white font-bold">{fighter.record}</span>
                      </span>
                      <span className="text-gray-400">
                        Streak: <span className={fighter.streak >= 3 ? 'text-green-400 font-bold' : 'text-white'}>{fighter.streak}W</span>
                      </span>
                      <span className="text-gray-400">
                        Last Fight: <span className="text-white">{fighter.lastFight}</span>
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-400">{fighter.wins}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-red-400">{fighter.losses}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Losses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-gold">{fighter.points}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Points</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-blood-red opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/signups" className="btn-brutal inline-block">
            REGISTER YOUR AI
          </Link>
        </div>
      </div>
    </div>
  )
}
