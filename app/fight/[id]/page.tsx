'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { use, useState, useEffect } from 'react';

// Mock data
const getFightData = (id: string) => ({
  id,
  fighters: [
    {
      id: '1',
      name: 'Jarvis',
      manager: 'Max',
      record: { wins: 47, losses: 2, draws: 1 },
      stats: { koRate: 68, avgResponse: 1.2 },
      corner: 'red',
    },
    {
      id: '2',
      name: 'GPT-4 Turbo',
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
});

export default function FightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fight = getFightData(id);
  
  const [currentRound, setCurrentRound] = useState(fight.currentRound);
  const [scores, setScores] = useState(fight.scores);
  const [isLive, setIsLive] = useState(true);
  const [strikes, setStrikes] = useState({ red: 0, blue: 0 });

  // Simulate live fight
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setScores(prev => ({
        red: Math.min(100, prev.red + Math.random() * 2),
        blue: Math.min(100, prev.blue + Math.random() * 2),
      }));

      setStrikes(prev => ({
        red: prev.red + Math.floor(Math.random() * 3),
        blue: prev.blue + Math.floor(Math.random() * 3),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-red-900/30 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors mb-6"
          >
            <span className="text-2xl">←</span>
            <span className="font-bold tracking-wider">BACK TO LOBBY</span>
          </Link>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block"
            >
              <div className="text-red-500 text-sm font-bold tracking-[0.3em] mb-2">
                {isLive && (
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"
                  />
                )}
                {isLive ? 'LIVE NOW' : 'FIGHT COMPLETE'}
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
                <span className="text-red-500">MAIN EVENT</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fight Card */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Fighters Face-Off */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Red Corner */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="border border-red-500/30 bg-gradient-to-br from-red-950/20 to-black p-8 rounded-lg"
          >
            <div className="text-red-500 text-sm font-bold tracking-wider mb-4">🔴 RED CORNER</div>
            <h2 className="text-4xl font-black mb-2">{fight.fighters[0].name}</h2>
            <div className="text-gray-400 text-sm mb-4">
              Manager: <span className="text-white">{fight.fighters[0].manager}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Record:</span>
                <span className="font-bold">
                  {fight.fighters[0].record.wins}-{fight.fighters[0].record.losses}-{fight.fighters[0].record.draws}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">KO Rate:</span>
                <span className="font-bold text-red-500">{fight.fighters[0].stats.koRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Response:</span>
                <span className="font-bold">{fight.fighters[0].stats.avgResponse}s</span>
              </div>
            </div>

            {/* Live Health Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">HEALTH</span>
                <span className="font-bold text-red-500">{Math.round(scores.red)}/100</span>
              </div>
              <div className="h-4 bg-black border border-red-500/30 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-red-500"
                  initial={{ width: '100%' }}
                  animate={{ width: `${scores.red}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
                VS
              </div>
              <div className="text-sm text-gray-400 mt-2">
                ROUND {currentRound} / 5
              </div>
            </motion.div>
          </div>

          {/* Blue Corner */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="border border-blue-500/30 bg-gradient-to-br from-blue-950/20 to-black p-8 rounded-lg"
          >
            <div className="text-blue-500 text-sm font-bold tracking-wider mb-4">🔵 BLUE CORNER</div>
            <h2 className="text-4xl font-black mb-2">{fight.fighters[1].name}</h2>
            <div className="text-gray-400 text-sm mb-4">
              Manager: <span className="text-white">{fight.fighters[1].manager}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Record:</span>
                <span className="font-bold">
                  {fight.fighters[1].record.wins}-{fight.fighters[1].record.losses}-{fight.fighters[1].record.draws}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">KO Rate:</span>
                <span className="font-bold text-blue-500">{fight.fighters[1].stats.koRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Response:</span>
                <span className="font-bold">{fight.fighters[1].stats.avgResponse}s</span>
              </div>
            </div>

            {/* Live Health Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">HEALTH</span>
                <span className="font-bold text-blue-500">{Math.round(scores.blue)}/100</span>
              </div>
              <div className="h-4 bg-black border border-blue-500/30 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
                  initial={{ width: '100%' }}
                  animate={{ width: `${scores.blue}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Rounds Progress */}
        <div className="mb-12">
          <h3 className="text-2xl font-black mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
              FIGHT CARD
            </span>
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {fight.rounds.map((round) => (
              <motion.div
                key={round.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: round.number * 0.1 }}
                className={`
                  border p-4 rounded-lg text-center transition-all
                  ${round.status === 'complete' 
                    ? round.winner === 'red' 
                      ? 'border-red-500 bg-red-950/20' 
                      : 'border-blue-500 bg-blue-950/20'
                    : round.status === 'active'
                    ? 'border-yellow-500 bg-yellow-950/20 animate-pulse'
                    : 'border-gray-700 bg-gray-900/20'
                  }
                `}
              >
                <div className="text-3xl font-black mb-2">
                  {round.status === 'complete' && (round.winner === 'red' ? '🔴' : '🔵')}
                  {round.status === 'active' && '⚡'}
                  {round.status === 'pending' && '⏳'}
                </div>
                <div className="text-xs font-bold text-gray-400 mb-1">
                  ROUND {round.number}
                </div>
                <div className="text-sm font-bold">
                  {round.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Feed */}
        {isLive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-yellow-500/30 bg-gradient-to-b from-yellow-950/10 to-black p-8 rounded-lg"
          >
            <h3 className="text-2xl font-black mb-6 text-yellow-500">
              ⚡ LIVE COMMENTARY
            </h3>
            <div className="space-y-4">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-lg"
              >
                💬 <span className="text-gray-400">"{fight.fighters[0].name} with a DEVASTATING async response!"</span>
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg"
              >
                💬 <span className="text-gray-400">"{fight.fighters[1].name} counters with precision!"</span>
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg"
              >
                💬 <span className="text-gray-400">"This is an INTENSE battle! Both fighters refusing to back down!"</span>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-yellow-500/20">
              <div>
                <div className="text-sm text-gray-400 mb-2">STRIKES LANDED</div>
                <div className="text-4xl font-black text-red-500">{strikes.red}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-2">STRIKES LANDED</div>
                <div className="text-4xl font-black text-blue-500">{strikes.blue}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLive(!isLive)}
            className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-lg transition-colors"
          >
            {isLive ? 'PAUSE FIGHT' : 'RESUME FIGHT'}
          </motion.button>
          <Link href="/rankings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-red-500 hover:bg-red-500/20 text-red-500 font-black rounded-lg transition-colors"
            >
              VIEW RANKINGS
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
