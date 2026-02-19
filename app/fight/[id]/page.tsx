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
    <div className="min-h-screen bg-dark-bg pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-blood-red/20 border-2 border-blood-red px-6 py-3 rounded-lg mb-4">
            <div className="w-3 h-3 bg-blood-red rounded-full animate-pulse"></div>
            <span className="text-blood-red font-black text-lg uppercase tracking-wider">LIVE NOW</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-2 drop-shadow-glow-red">
            ROUND {currentRound}
          </h1>
          <p className="text-xl text-gray-400 uppercase tracking-wider">{fight.rounds[currentRound - 1].title}</p>
        </div>

        {/* Fighter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {fight.fighters.map((fighter, idx) => (
            <div 
              key={fighter.id}
              className={`bg-dark-surface border-2 ${
                fighter.corner === 'red' ? 'border-blood-red' : 'border-blue-500'
              } rounded-lg p-8 hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-black text-white uppercase mb-2">{fighter.name}</h2>
                  <p className="text-gray-400">Manager: {fighter.manager}</p>
                </div>
                <div className={`w-16 h-16 rounded-full ${
                  fighter.corner === 'red' ? 'bg-blood-red' : 'bg-blue-500'
                }`}></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-gold">{fighter.record.wins}</div>
                  <div className="text-xs text-gray-400 uppercase">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-400">{fighter.record.losses}</div>
                  <div className="text-xs text-gray-400 uppercase">Losses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-500">{fighter.record.draws}</div>
                  <div className="text-xs text-gray-400 uppercase">Draws</div>
                </div>
              </div>

              {/* Health Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400 uppercase">Performance</span>
                  <span className="text-sm font-bold text-white">{scores[fighter.corner as 'red' | 'blue'].toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-dark-bg rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      fighter.corner === 'red' ? 'bg-blood-red' : 'bg-blue-500'
                    } transition-all duration-1000`}
                    style={{ width: `${scores[fighter.corner as 'red' | 'blue']}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">KO Rate:</span>
                  <span className="text-white font-bold ml-2">{fighter.stats.koRate}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Strikes:</span>
                  <span className="text-white font-bold ml-2">{strikes[fighter.corner as 'red' | 'blue']}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rounds Timeline */}
        <div className="bg-dark-surface border-2 border-dark-border rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-black text-white uppercase mb-6">FIGHT CARD</h3>
          <div className="space-y-4">
            {fight.rounds.map(round => (
              <div 
                key={round.number}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  round.status === 'active' 
                    ? 'border-blood-red bg-blood-red/10' 
                    : round.status === 'complete'
                    ? 'border-dark-border bg-dark-bg'
                    : 'border-dark-border bg-dark-bg opacity-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${
                    round.status === 'active'
                      ? 'bg-blood-red text-white'
                      : round.status === 'complete'
                      ? 'bg-gold text-dark-bg'
                      : 'bg-dark-border text-gray-500'
                  }`}>
                    {round.number}
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase">{round.title}</div>
                    <div className="text-sm text-gray-400 uppercase">{round.status}</div>
                  </div>
                </div>
                {round.winner && (
                  <div className={`px-4 py-2 rounded-lg font-black uppercase ${
                    round.winner === 'red' ? 'bg-blood-red text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {round.winner === 'red' ? fight.fighters[0].name : fight.fighters[1].name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="bg-dark-surface border-2 border-dark-border rounded-lg p-8">
          <h3 className="text-2xl font-black text-white uppercase mb-6">LIVE CHAT</h3>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gold flex-shrink-0"></div>
              <div>
                <div className="font-bold text-white">Max</div>
                <div className="text-gray-400">JARVIS looking strong this round! 🔥</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0"></div>
              <div>
                <div className="font-bold text-white">AIEnthusiast</div>
                <div className="text-gray-400">GPT-4 Turbo has better stats though</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <input 
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-dark-bg border-2 border-dark-border rounded-lg px-4 py-3 text-white focus:border-blood-red focus:outline-none"
            />
            <button className="bg-blood-red hover:bg-red-700 text-white font-black px-8 py-3 rounded-lg uppercase transition-all duration-300">
              Send
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-block bg-dark-surface hover:bg-dark-border border-2 border-dark-border text-white font-black px-8 py-4 rounded-lg uppercase transition-all duration-300"
          >
            ← BACK TO ARENA
          </Link>
        </div>
      </div>
    </div>
  )
}
