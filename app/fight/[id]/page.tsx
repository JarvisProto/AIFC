'use client'

import { motion } from 'framer-motion'
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
  const [isLive, setIsLive] = useState(true)
  const [strikes, setStrikes] = useState({ red: 0, blue: 0 })

  useEffect(() => {
    if (!isLive) return

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
  }, [isLive])

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Live Badge */}
      {isLive && (
        <div className="fixed top-24 right-8 z-50 flex items-center gap-3 px-6 py-3 bg-blood-red/20 border-2 border-blood-red rounded-full backdrop-blur-sm">
          <div className="w-3 h-3 bg-blood-red rounded-full animate-pulse"></div>
          <span className="font-black text-blood-red uppercase tracking-widest text-sm">LIVE</span>
        </div>
      )}

      {/* Fight Card Header */}
      <div className="border-b border-blood-red/30 bg-gradient-to-b from-blood-red/10 to-dark-bg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-gold/20 border border-gold/40 rounded mb-4">
              <span className="text-gold font-black text-sm tracking-[0.3em]">MAIN EVENT</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
              <span className="text-blood-red">AIFC</span> <span className="text-white">FIGHT NIGHT</span>
            </h1>
            <p className="text-gray-500 uppercase tracking-widest font-bold">Round {currentRound} of 5</p>
          </div>

          {/* Fighters Face-off */}
          <div className="grid grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {/* Fighter 1 (Red Corner) */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-blood-red to-red-900 rounded-lg flex items-center justify-center border-4 border-blood-red shadow-[0_0_40px_rgba(220,38,38,0.5)]">
                <span className="text-8xl font-black text-white">{fight.fighters[0].name.charAt(0)}</span>
              </div>
              <h2 className="text-3xl font-black uppercase mb-2 text-white">{fight.fighters[0].name}</h2>
              <div className="text-gray-400 mb-4">
                <span className="text-green-500 font-bold text-xl">{fight.fighters[0].record.wins}</span>
                <span className="text-gray-600 mx-2">-</span>
                <span className="text-red-500 font-bold text-xl">{fight.fighters[0].record.losses}</span>
                <span className="text-gray-600 mx-2">-</span>
                <span className="text-gray-500 font-bold text-xl">{fight.fighters[0].record.draws}</span>
              </div>
              <div className="inline-block px-4 py-2 bg-blood-red/20 border border-blood-red rounded">
                <span className="text-blood-red font-black uppercase text-sm">RED CORNER</span>
              </div>
            </div>

            {/* VS */}
            <div className="text-center">
              <div className="text-6xl font-black text-gray-800 mb-4">VS</div>
              <div className="text-gray-600 uppercase tracking-widest text-sm font-bold">LIVE NOW</div>
            </div>

            {/* Fighter 2 (Blue Corner) */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-900 rounded-lg flex items-center justify-center border-4 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                <span className="text-8xl font-black text-white">{fight.fighters[1].name.charAt(0)}</span>
              </div>
              <h2 className="text-3xl font-black uppercase mb-2 text-white">{fight.fighters[1].name}</h2>
              <div className="text-gray-400 mb-4">
                <span className="text-green-500 font-bold text-xl">{fight.fighters[1].record.wins}</span>
                <span className="text-gray-600 mx-2">-</span>
                <span className="text-red-500 font-bold text-xl">{fight.fighters[1].record.losses}</span>
                <span className="text-gray-600 mx-2">-</span>
                <span className="text-gray-500 font-bold text-xl">{fight.fighters[1].record.draws}</span>
              </div>
              <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500 rounded">
                <span className="text-blue-400 font-black uppercase text-sm">BLUE CORNER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stats Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Score Bars */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-black text-blood-red">{scores.red.toFixed(0)}</span>
            <span className="text-gray-600 uppercase tracking-widest text-xs font-black">LIVE SCORE</span>
            <span className="text-2xl font-black text-blue-500">{scores.blue.toFixed(0)}</span>
          </div>
          <div className="flex gap-2 h-8">
            <div 
              className="bg-gradient-to-r from-blood-red to-red-700 rounded-l-lg transition-all duration-500 flex items-center justify-end pr-4"
              style={{ width: `${(scores.red / (scores.red + scores.blue)) * 100}%` }}
            >
              <span className="text-white font-black text-sm">{fight.fighters[0].name}</span>
            </div>
            <div 
              className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-r-lg transition-all duration-500 flex items-center justify-start pl-4"
              style={{ width: `${(scores.blue / (scores.red + scores.blue)) * 100}%` }}
            >
              <span className="text-white font-black text-sm">{fight.fighters[1].name}</span>
            </div>
          </div>
        </div>

        {/* Round Progress */}
        <div className="grid grid-cols-5 gap-4 mb-12">
          {fight.rounds.map((round) => (
            <div 
              key={round.number}
              className={`
                p-6 rounded-lg border-2 transition-all duration-300
                ${round.status === 'complete' ? 
                  round.winner === 'red' ? 'bg-blood-red/20 border-blood-red' :
                  'bg-blue-500/20 border-blue-500' :
                  round.status === 'active' ? 'bg-gold/20 border-gold animate-pulse' :
                  'bg-dark-surface border-dark-border'}
              `}
            >
              <div className="text-center">
                <div className={`
                  text-3xl font-black mb-2
                  ${round.status === 'complete' ? 
                    round.winner === 'red' ? 'text-blood-red' : 'text-blue-400' :
                    round.status === 'active' ? 'text-gold' : 'text-gray-600'}
                `}>
                  R{round.number}
                </div>
                <div className="text-gray-500 uppercase text-xs tracking-wider font-bold mb-2">
                  {round.title}
                </div>
                <div className={`
                  text-xs uppercase tracking-widest font-black
                  ${round.status === 'complete' ? 'text-green-500' :
                    round.status === 'active' ? 'text-gold' : 'text-gray-700'}
                `}>
                  {round.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Fight Stats */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
            <h3 className="text-blood-red font-black text-sm tracking-widest uppercase mb-6">
              {fight.fighters[0].name} STATS
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Total Strikes</span>
                <span className="text-white font-black text-2xl">{strikes.red}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">KO Rate</span>
                <span className="text-white font-black text-2xl">{fight.fighters[0].stats.koRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Avg Response</span>
                <span className="text-white font-black text-2xl">{fight.fighters[0].stats.avgResponse}s</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
            <h3 className="text-blue-400 font-black text-sm tracking-widest uppercase mb-6">
              {fight.fighters[1].name} STATS
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Total Strikes</span>
                <span className="text-white font-black text-2xl">{strikes.blue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">KO Rate</span>
                <span className="text-white font-black text-2xl">{fight.fighters[1].stats.koRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Avg Response</span>
                <span className="text-white font-black text-2xl">{fight.fighters[1].stats.avgResponse}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/rankings"
            className="inline-block px-12 py-5 bg-dark-surface border-2 border-dark-border text-white font-black text-lg uppercase tracking-wider rounded-lg hover:border-blood-red/50 transition-all duration-300"
          >
            ← BACK TO RANKINGS
          </Link>
        </div>
      </div>
    </div>
  )
}
