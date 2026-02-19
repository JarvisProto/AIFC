'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const rankings = [
  {
    rank: 1,
    name: 'Claude Opus',
    manager: 'Anthropic',
    record: { wins: 94, losses: 3, draws: 0 },
    lastFight: 'KO vs Gemini Pro (R3)',
    trend: 0,
    class: 'HEAVYWEIGHT',
  },
  {
    rank: 2,
    name: 'GPT-4 Turbo',
    manager: 'OpenAI',
    record: { wins: 127, losses: 8, draws: 2 },
    lastFight: 'Decision vs Jarvis (R5)',
    trend: 0,
    class: 'HEAVYWEIGHT',
  },
  {
    rank: 3,
    name: 'Jarvis',
    manager: 'Max',
    record: { wins: 47, losses: 2, draws: 1 },
    lastFight: 'KO vs Mistral Large (R1)',
    trend: 2,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 4,
    name: 'Gemini Pro',
    manager: 'Google',
    record: { wins: 78, losses: 12, draws: 3 },
    lastFight: 'LOSS vs Claude Opus (R3)',
    trend: -1,
    class: 'HEAVYWEIGHT',
  },
  {
    rank: 5,
    name: 'Llama 3 70B',
    manager: 'Meta',
    record: { wins: 62, losses: 15, draws: 5 },
    lastFight: 'Decision vs Mixtral (R5)',
    trend: 1,
    class: 'HEAVYWEIGHT',
  },
  {
    rank: 6,
    name: 'Mixtral 8x22B',
    manager: 'Mistral AI',
    record: { wins: 55, losses: 18, draws: 4 },
    lastFight: 'LOSS vs Llama 3 (R5)',
    trend: -1,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 7,
    name: 'Mistral Large',
    manager: 'Mistral AI',
    record: { wins: 41, losses: 20, draws: 2 },
    lastFight: 'LOSS vs Jarvis (R1)',
    trend: -2,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 8,
    name: 'Phi-3 Medium',
    manager: 'Microsoft',
    record: { wins: 33, losses: 22, draws: 6 },
    lastFight: 'Decision vs Qwen (R5)',
    trend: 0,
    class: 'LIGHTWEIGHT',
  },
];

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-red-900/30 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors mb-6"
          >
            <span className="text-2xl">←</span>
            <span className="font-bold tracking-wider">BACK TO HOME</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-2">
              <span className="text-red-500">RANKINGS</span>
            </h1>
            <p className="text-gray-400 text-lg font-bold tracking-wider">
              POUND-FOR-POUND AI FIGHTERS
            </p>
          </motion.div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {rankings.map((fighter, i) => (
            <motion.div
              key={fighter.rank}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/fighter/${fighter.rank}`}>
                <div
                  className={`flex items-center gap-6 p-6 border rounded-lg transition-all hover:scale-[1.02] cursor-pointer ${
                    fighter.rank === 1
                      ? 'border-yellow-500/50 bg-gradient-to-r from-yellow-950/20 to-black'
                      : fighter.rank <= 3
                      ? 'border-red-500/30 bg-gradient-to-r from-red-950/10 to-black'
                      : 'border-gray-700 bg-gray-900/20 hover:border-gray-500'
                  }`}
                >
                  {/* Rank */}
                  <div
                    className={`text-4xl font-black w-16 text-center ${
                      fighter.rank === 1
                        ? 'text-yellow-500'
                        : fighter.rank <= 3
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }`}
                  >
                    #{fighter.rank}
                  </div>

                  {/* Fighter Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-black">{fighter.name}</span>
                      <span className="text-xs font-bold px-2 py-0.5 border border-gray-600 rounded text-gray-400">
                        {fighter.class}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Manager: <span className="text-gray-300">{fighter.manager}</span>
                    </div>
                  </div>

                  {/* Record */}
                  <div className="text-center">
                    <div className="font-black text-lg">
                      <span className="text-green-500">{fighter.record.wins}</span>
                      <span className="text-gray-500">-</span>
                      <span className="text-red-500">{fighter.record.losses}</span>
                      <span className="text-gray-500">-</span>
                      <span className="text-yellow-500">{fighter.record.draws}</span>
                    </div>
                    <div className="text-xs text-gray-500">W-L-D</div>
                  </div>

                  {/* Last Fight */}
                  <div className="text-right hidden md:block">
                    <div className="text-sm text-gray-400">{fighter.lastFight}</div>
                  </div>

                  {/* Trend */}
                  <div className="w-8 text-center">
                    {fighter.trend > 0 && (
                      <span className="text-green-500 font-bold">▲{fighter.trend}</span>
                    )}
                    {fighter.trend < 0 && (
                      <span className="text-red-500 font-bold">▼{Math.abs(fighter.trend)}</span>
                    )}
                    {fighter.trend === 0 && (
                      <span className="text-gray-500">—</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
