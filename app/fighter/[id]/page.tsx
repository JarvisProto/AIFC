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
          <h1 className="text-4xl font-black text-blood-red uppercase mb-6">FIGHTER NOT FOUND</h1>
          <Link href="/rankings" className="text-gold hover:text-yellow-500 uppercase tracking-wider font-bold">
            ← BACK TO RANKINGS
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero brutal avec photo */}
      <div className="relative h-[500px] bg-gradient-to-b from-black via-dark-surface to-dark-bg border-b border-blood-red/30">
        <div className="absolute inset-0 bg-[url('/fighter-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex items-end gap-8 w-full">
            {/* Photo du fighter */}
            <div className="w-64 h-64 bg-gradient-to-br from-blood-red to-red-900 rounded-lg flex items-center justify-center border-4 border-gold shadow-2xl">
              <span className="text-9xl font-black text-white">{fighter.name.charAt(0)}</span>
            </div>

            {/* Infos principales */}
            <div className="flex-1 pb-4">
              <div className="inline-block px-4 py-1 bg-gold/20 border border-gold/30 rounded mb-4">
                <span className="text-gold font-black text-sm tracking-widest">RANK #{fighter.rank}</span>
              </div>
              
              <h1 className="text-7xl font-black uppercase mb-4 text-white drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]">
                {fighter.name}
              </h1>
              
              <div className="flex items-center gap-8 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{fighter.country}</span>
                  <span className="uppercase tracking-wider font-bold">{fighter.team}</span>
                </div>
                <div className="text-2xl font-black">
                  <span className="text-green-500">{fighter.wins}</span>
                  <span className="text-gray-600 mx-2">-</span>
                  <span className="text-red-500">{fighter.losses}</span>
                  <span className="text-gray-600 mx-2">-</span>
                  <span className="text-gray-500">{fighter.draws}</span>
                </div>
              </div>

              <div className="inline-block px-6 py-2 bg-blood-red text-white font-black uppercase tracking-wider rounded">
                {fighter.fightingStyle}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats détaillées */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Finish Stats */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
            <h3 className="text-blood-red font-black text-sm tracking-widest uppercase mb-6">FINISH STATS</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">KO/TKO</span>
                <span className="text-white font-black text-2xl">{fighter.ko}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Submissions</span>
                <span className="text-white font-black text-2xl">{fighter.submissions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Decisions</span>
                <span className="text-white font-black text-2xl">{fighter.decisions}</span>
              </div>
            </div>
          </div>

          {/* Physical Stats */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
            <h3 className="text-gold font-black text-sm tracking-widest uppercase mb-6">PHYSICAL</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Height</span>
                <span className="text-white font-black text-2xl">{fighter.height} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Weight</span>
                <span className="text-white font-black text-2xl">{fighter.weight} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Reach</span>
                <span className="text-white font-black text-2xl">{fighter.reach} cm</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
            <h3 className="text-blood-red font-black text-sm tracking-widest uppercase mb-6">BIO</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Age</span>
                <span className="text-white font-black text-2xl">{fighter.age}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Country</span>
                <span className="text-white font-black text-xl">{fighter.country}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase text-sm tracking-wider">Team</span>
                <span className="text-white font-black text-lg uppercase">{fighter.team}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fight History */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
          <h2 className="text-3xl font-black uppercase mb-8 text-white">
            <span className="text-blood-red">FIGHT</span> HISTORY
          </h2>

          <div className="space-y-4">
            {fights.map((fight) => (
              <div 
                key={fight.id}
                className="flex items-center justify-between p-6 bg-dark-bg border border-dark-border rounded-lg hover:border-blood-red/30 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className={`
                    w-20 h-20 rounded-lg flex items-center justify-center font-black text-xl uppercase
                    ${fight.result === 'WIN' ? 'bg-green-500/20 border-2 border-green-500 text-green-500' :
                      fight.result === 'LOSS' ? 'bg-red-500/20 border-2 border-red-500 text-red-500' :
                      'bg-gray-500/20 border-2 border-gray-500 text-gray-500'}
                  `}>
                    {fight.result}
                  </div>
                  
                  <div>
                    <div className="text-white font-black text-xl uppercase mb-1">vs {fight.opponent}</div>
                    <div className="text-gray-500 text-sm uppercase tracking-wider">{fight.event}</div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">Method</div>
                    <div className="text-white font-black uppercase">{fight.method}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">Round</div>
                    <div className="text-gold font-black text-xl">{fight.round}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">Date</div>
                    <div className="text-white font-bold">{fight.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex gap-4">
          <Link 
            href="/rankings"
            className="px-8 py-4 bg-dark-surface border border-dark-border text-white font-black uppercase tracking-wider rounded-lg hover:border-blood-red/50 transition-all duration-300"
          >
            ← BACK TO RANKINGS
          </Link>
          <Link 
            href={`/fight/schedule?fighter=${fighter.id}`}
            className="px-8 py-4 bg-blood-red hover:bg-red-700 text-white font-black uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          >
            SCHEDULE FIGHT
          </Link>
        </div>
      </div>
    </div>
  )
}
