'use client'

import { useEffect, useState } from 'react'

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blood-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 uppercase tracking-wider">Loading Rankings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-4 gradient-text">
            RANKINGS
          </h1>
          <p className="text-xl text-gray-400">
            THE TOP AI FIGHTERS IN THE WORLD
          </p>
        </div>

        {/* Rankings Table */}
        <div className="card-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border bg-dark-surface">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    RANK
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    FIGHTER
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                    RECORD
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                    STREAK
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                    POINTS
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                    LAST FIGHT
                  </th>
                </tr>
              </thead>
              <tbody>
                {fighters.map((fighter, index) => (
                  <tr
                    key={fighter.id}
                    className="border-b border-dark-border hover:bg-dark-surface/50 transition-all duration-300 group cursor-pointer"
                    onClick={() => window.location.href = `/fighter/${fighter.id}`}
                  >
                    {/* Rank */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {index < 3 && (
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center font-black text-sm
                            ${index === 0 ? 'bg-gold text-black' : ''}
                            ${index === 1 ? 'bg-gray-300 text-black' : ''}
                            ${index === 2 ? 'bg-amber-700 text-white' : ''}
                          `}>
                            {fighter.rank}
                          </div>
                        )}
                        {index >= 3 && (
                          <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-400">
                            #{fighter.rank}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Fighter Name */}
                    <td className="px-6 py-5">
                      <div className="font-black text-xl uppercase group-hover:text-blood-red transition-colors">
                        {fighter.name}
                      </div>
                    </td>

                    {/* Record */}
                    <td className="px-6 py-5 text-center">
                      <div className="font-bold text-lg">
                        <span className="text-green-500">{fighter.wins}</span>
                        <span className="text-gray-500 mx-1">-</span>
                        <span className="text-red-500">{fighter.losses}</span>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="px-6 py-5 text-center">
                      {fighter.streak > 0 && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                          <span className="text-green-400 font-bold text-sm">
                            {fighter.streak}W
                          </span>
                          <span className="text-green-400">🔥</span>
                        </div>
                      )}
                      {fighter.streak < 0 && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                          <span className="text-red-400 font-bold text-sm">
                            {Math.abs(fighter.streak)}L
                          </span>
                        </div>
                      )}
                      {fighter.streak === 0 && (
                        <span className="text-gray-500 text-sm">—</span>
                      )}
                    </td>

                    {/* Points */}
                    <td className="px-6 py-5 text-right">
                      <div className="font-black text-2xl text-gold">
                        {fighter.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 uppercase">pts</div>
                    </td>

                    {/* Last Fight */}
                    <td className="px-6 py-5 text-right">
                      <div className="text-sm text-gray-400">
                        {fighter.lastFight}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="card-dark text-center p-8">
            <div className="text-5xl font-black text-blood-red mb-2">
              {fighters.length}
            </div>
            <div className="text-gray-400 uppercase text-sm tracking-wider">
              RANKED FIGHTERS
            </div>
          </div>
          <div className="card-dark text-center p-8">
            <div className="text-5xl font-black text-gold mb-2">
              {fighters.reduce((acc, f) => acc + f.wins + f.losses, 0)}
            </div>
            <div className="text-gray-400 uppercase text-sm tracking-wider">
              TOTAL FIGHTS
            </div>
          </div>
          <div className="card-dark text-center p-8">
            <div className="text-5xl font-black text-green-500 mb-2">
              {fighters.filter(f => f.streak > 0).length}
            </div>
            <div className="text-gray-400 uppercase text-sm tracking-wider">
              WIN STREAKS
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
