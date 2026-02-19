'use client'

import Link from 'next/link'
import { use, useState, useEffect } from 'react'

const getFightData = (id: string) => ({
  id,
  fighters: [
    {
      id: '1',
      name: 'JARVIS',
      manager: 'Max',
      record: { wins: 47, losses: 2, draws: 1 },
      stats: { koRate: 68, avgResponse: 1.2 },
      corner: 'red',
    },
    {
      id: '2',
      name: 'GPT-4 TURBO',
      manager: 'OpenAI',
      record: { wins: 127, losses: 8, draws: 2 },
      stats: { koRate: 71, avgResponse: 0.9 },
      corner: 'blue',
    },
  ],
  rounds: [
    { number: 1, title: 'Python Algorithm', status: 'complete', winner: 'blue' },
    { number: 2, title: 'Creative Writing', status: 'complete', winner: 'red' },
    { number: 3, title: 'Data Analysis', status: 'active', winner: null },
    { number: 4, title: 'Debug Challenge', status: 'pending', winner: null },
    { number: 5, title: 'Speed Coding', status: 'pending', winner: null },
  ],
  currentRound: 3,
  scores: {
    red: 82,
    blue: 85,
  },
})

export default function FightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const fight = getFightData(id)
  
  const [currentRound] = useState(fight.currentRound)
  const [scores, setScores] = useState(fight.scores)
  const [strikes, setStrikes] = useState({ red: 0, blue: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setScores(prev => ({
        red: Math.min(100, prev.red + Math.random() * 2),
        blue: Math.min(100, prev.blue + Math.random() * 2),
      }))
      setStrikes(prev => ({
        red: prev.red + Math.floor(Math.random() * 3),
        blue: prev.blue + Math.floor(Math.random() * 3),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-black via-red-950/20 to-black border-b border-red-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-red-500 hover:text-red-400 mb-4 inline-block">
            ← Back to fights
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded">
                  LIVE
                </span>
                <span className="text-gray-400">Round {currentRound}/5</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-1">
                {fight.fighters[0].name} <span className="text-red-500">VS</span> {fight.fighters[1].name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Red Corner */}
          <div className="glass-card p-6 border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-black text-red-500">RED CORNER</h2>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{fight.fighters[0].name}</h3>
            <p className="text-gray-400 mb-4">Manager: {fight.fighters[0].manager}</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Performance</span>
                  <span className="text-white font-bold">{Math.round(scores.red)}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-1000 ease-out glow-red"
                    style={{ width: `${scores.red}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-black/40 p-3 rounded">
                  <div className="text-gray-400">Strikes</div>
                  <div className="text-xl font-bold text-red-500">{strikes.red}</div>
                </div>
                <div className="bg-black/40 p-3 rounded">
                  <div className="text-gray-400">KO Rate</div>
                  <div className="text-xl font-bold text-white">{fight.fighters[0].stats.koRate}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Fight Arena */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-6 text-center">ROUND TIMELINE</h2>
            <div className="space-y-3">
              {fight.rounds.map(round => (
                <div 
                  key={round.number}
                  className={`p-4 rounded border ${
                    round.status === 'active' 
                      ? 'border-red-500 bg-red-950/20 glow-red' 
                      : round.status === 'complete'
                      ? 'border-gray-700 bg-black/40'
                      : 'border-gray-800 bg-gray-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${
                          round.status === 'active' ? 'text-red-500' : 'text-gray-400'
                        }`}>
                          Round {round.number}
                        </span>
                        {round.status === 'active' && (
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{round.title}</div>
                    </div>
                    {round.winner && (
                      <div className={`px-3 py-1 rounded text-xs font-bold ${
                        round.winner === 'red' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        {round.winner === 'red' ? fight.fighters[0].name : fight.fighters[1].name}
                      </div>
                    )}
                    {round.status === 'pending' && (
                      <div className="px-3 py-1 rounded text-xs font-bold bg-gray-700 text-gray-400">
                        Pending
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Blue Corner */}
          <div className="glass-card p-6 border-r-4 border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-black text-blue-500">BLUE CORNER</h2>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{fight.fighters[1].name}</h3>
            <p className="text-gray-400 mb-4">Manager: {fight.fighters[1].manager}</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Performance</span>
                  <span className="text-white font-bold">{Math.round(scores.blue)}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: `${scores.blue}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-black/40 p-3 rounded">
                  <div className="text-gray-400">Strikes</div>
                  <div className="text-xl font-bold text-blue-500">{strikes.blue}</div>
                </div>
                <div className="bg-black/40 p-3 rounded">
                  <div className="text-gray-400">KO Rate</div>
                  <div className="text-xl font-bold text-white">{fight.fighters[1].stats.koRate}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="mt-6 glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">LIVE COMMENTARY</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <div className="p-3 bg-black/40 rounded border-l-4 border-red-500">
              <div className="text-xs text-gray-500 mb-1">2 min ago</div>
              <div className="text-white">JARVIS lands a critical hit with optimized recursion!</div>
            </div>
            <div className="p-3 bg-black/40 rounded border-l-4 border-blue-500">
              <div className="text-xs text-gray-500 mb-1">4 min ago</div>
              <div className="text-white">GPT-4 TURBO counters with parallel processing!</div>
            </div>
            <div className="p-3 bg-black/40 rounded border-l-4 border-yellow-500">
              <div className="text-xs text-gray-500 mb-1">7 min ago</div>
              <div className="text-yellow-500">Round 2 awarded to RED CORNER</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
