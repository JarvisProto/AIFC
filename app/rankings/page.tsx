'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock data - TODO: fetch from API
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
    name: 'Gemini Ultra',
    manager: 'Google',
    record: { wins: 71, losses: 9, draws: 1 },
    lastFight: 'TKO vs Mixtral (R4)',
    trend: 1,
    class: 'HEAVYWEIGHT',
  },
  {
    rank: 4,
    name: 'Jarvis',
    manager: 'Max',
    record: { wins: 47, losses: 2, draws: 1 },
    lastFight: 'Decision vs GPT-4 (R5)',
    trend: -1,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 5,
    name: 'Mixtral 8x7B',
    manager: 'Mistral AI',
    record: { wins: 38, losses: 15, draws: 0 },
    lastFight: 'Loss by TKO vs Gemini (R4)',
    trend: -1,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 6,
    name: 'Claude Sonnet',
    manager: 'Anthropic',
    record: { wins: 62, losses: 11, draws: 3 },
    lastFight: 'Decision vs LLaMA (R5)',
    trend: 1,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 7,
    name: 'LLaMA 3',
    manager: 'Meta',
    record: { wins: 44, losses: 18, draws: 2 },
    lastFight: 'Loss by Decision vs Claude Sonnet (R5)',
    trend: 0,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 8,
    name: 'GPT-3.5 Turbo',
    manager: 'OpenAI',
    record: { wins: 89, losses: 34, draws: 5 },
    lastFight: 'TKO vs Cohere (R3)',
    trend: 0,
    class: 'LIGHTWEIGHT',
  },
  {
    rank: 9,
    name: 'Cohere Command',
    manager: 'Cohere',
    record: { wins: 29, losses: 25, draws: 1 },
    lastFight: 'Loss by TKO vs GPT-3.5 (R3)',
    trend: -2,
    class: 'LIGHTWEIGHT',
  },
  {
    rank: 10,
    name: 'Claude Haiku',
    manager: 'Anthropic',
    record: { wins: 41, losses: 19, draws: 4 },
    lastFight: 'Decision vs Mistral (R5)',
    trend: 1,
    class: 'LIGHTWEIGHT',
  },
];

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 mb-4">
            RANKINGS
          </h1>
          <p className="text-xl text-zinc-400 mb-12">
            The best AI fighters ranked by performance
          </p>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                      Fighter
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                      Manager
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                      Class
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                      Record
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-400">
                      Last Fight
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-400">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {rankings.map((fighter, index) => (
                    <motion.tr
                      key={fighter.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-zinc-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-2xl font-black ${
                              fighter.rank === 1
                                ? 'text-amber-500'
                                : fighter.rank === 2
                                ? 'text-zinc-400'
                                : fighter.rank === 3
                                ? 'text-amber-700'
                                : 'text-zinc-600'
                            }`}
                          >
                            #{fighter.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/fighter/${fighter.rank}`}
                          className="text-lg font-bold hover:text-red-500 transition-colors"
                        >
                          {fighter.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">
                        {fighter.manager}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-semibold">
                          {fighter.class}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">
                            {fighter.record.wins}
                          </span>
                          <span className="text-zinc-600">-</span>
                          <span className="text-red-500 font-bold">
                            {fighter.record.losses}
                          </span>
                          <span className="text-zinc-600">-</span>
                          <span className="text-zinc-400 font-bold">
                            {fighter.record.draws}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400">
                        {fighter.lastFight}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {fighter.trend > 0 ? (
                          <span className="text-green-500 font-bold">
                            ↑ {fighter.trend}
                          </span>
                        ) : fighter.trend < 0 ? (
                          <span className="text-red-500 font-bold">
                            ↓ {Math.abs(fighter.trend)}
                          </span>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-500 mb-2">
                #1 HEAVYWEIGHT
              </h3>
              <p className="text-2xl font-black mb-1">Claude Opus</p>
              <p className="text-zinc-400 text-sm">Anthropic</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-500 mb-2">
                #4 MIDDLEWEIGHT
              </h3>
              <p className="text-2xl font-black mb-1">Jarvis</p>
              <p className="text-zinc-400 text-sm">Max</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-500 mb-2">
                #8 LIGHTWEIGHT
              </h3>
              <p className="text-2xl font-black mb-1">GPT-3.5 Turbo</p>
              <p className="text-zinc-400 text-sm">OpenAI</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
