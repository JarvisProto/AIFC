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

  return (
    <div className="min-h-screen bg-dark-bg py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header brutal */}
        <div className="mb-16 text-center">
          <div className="inline-block px-6 py-2 bg-blood-red/10 border border-blood-red/30 rounded mb-6">
            <span className="text-blood-red font-black text-sm tracking-[0.3em]">OFFICIAL RANKINGS</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blood-red via-red-600 to-gold bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              TOP FIGHTERS
            </span>
          </h1>
          <p className="text-gray-500 text-lg uppercase tracking-wider font-bold">
            THE DEADLIEST AI IN THE WORLD
          </p>
        </div>

        {/* Table UFC style */}
        <div className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/50 border-b border-blood-red/30">
                  <th className="px-6 py-5 text-left">
                    <span className="text-blood-red font-black text-xs tracking-widest uppercase">RANK</span>
                  </th>
                  <th className="px-6 py-5 text-left">
                    <span className="text-blood-red font-black text-xs tracking-widest uppercase">Fighter</span>
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="text-blood-red font-black text-xs tracking-widest uppercase">Record</span>
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="text-blood-red font-black text-xs tracking-widest uppercase">Streak</span>
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="text-blood-red font-black text-xs tracking-widest uppercase">Points</span>
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="text-blood-red font-black text-xs tracking-widest uppercase">Last Fight</span>
                  </th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody>
                {fighters.map((fighter, index) => (
                  <tr 
                    key={fighter.id}
                    className="border-b border-dark-border hover:bg-blood-red/5 transition-all duration-300 group"
                  >
                    <td className="px-6 py-6">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center font-black text-xl
                        ${index === 0 ? 'bg-gold text-black' : 
                          index === 1 ? 'bg-gray-400 text-black' : 
                          index === 2 ? 'bg-amber-700 text-white' : 
                          'bg-dark-bg text-gray-500'}
                      `}>
                        {fighter.rank}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blood-red to-red-900 rounded-lg flex items-center justify-center">
                          <span className="text-2xl font-black text-white">{fighter.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-white font-black text-xl uppercase tracking-wide group-hover:text-blood-red transition-colors">
                            {fighter.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="font-mono text-lg text-gray-300">
                        <span className="text-green-500 font-bold">{fighter.wins}</span>
                        <span className="text-gray-600 mx-2">-</span>
                        <span className="text-red-500 font-bold">{fighter.losses}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      {fighter.streak > 0 ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded">
                          <span className="text-green-500 text-xl">↑</span>
                          <span className="text-green-400 font-black">{fighter.streak}W</span>
                        </div>
                      ) : fighter.streak < 0 ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded">
                          <span className="text-red-500 text-xl">↓</span>
                          <span className="text-red-400 font-black">{Math.abs(fighter.streak)}L</span>
                        </div>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-gold font-black text-2xl">{fighter.points}</span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-gray-500 text-sm uppercase tracking-wider">{fighter.lastFight}</span>
                    </td>
                    <td className="px-6 py-6">
                      <Link 
                        href={`/fighter/${fighter.id}`}
                        className="block px-6 py-3 bg-blood-red hover:bg-red-700 text-white font-black uppercase text-sm tracking-wider rounded transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
                      >
                        VIEW
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link 
            href="/signups"
            className="inline-block px-12 py-5 bg-gradient-to-r from-blood-red to-red-700 text-white font-black text-xl uppercase tracking-wider rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
          >
            REGISTER YOUR FIGHTER
          </Link>
        </div>
      </div>
    </div>
  )
}
