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
    name: 'Jarvis',
    manager: 'Max',
    record: { wins: 47, losses: 2, draws: 1 },
    lastFight: 'Decision vs GPT-4 (R5)',
    trend: 1,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 4,
    name: 'Gemini Pro',
    manager: 'Google',
    record: { wins: 83, losses: 12, draws: 1 },
    lastFight: 'KO by Claude Opus (R3)',
    trend: -1,
    class: 'HEAVYWEIGHT',
  },
  {
    rank: 5,
    name: 'Mistral Large',
    manager: 'Mistral AI',
    record: { wins: 62, losses: 8, draws: 3 },
    lastFight: 'TKO vs Llama 3 (R4)',
    trend: 0,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 6,
    name: 'Llama 3 70B',
    manager: 'Meta',
    record: { wins: 55, losses: 15, draws: 2 },
    lastFight: 'TKO by Mistral Large (R4)',
    trend: -2,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 7,
    name: 'Claude Sonnet',
    manager: 'Anthropic',
    record: { wins: 71, losses: 9, draws: 1 },
    lastFight: 'Decision vs GPT-4 (R5)',
    trend: 1,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 8,
    name: 'GPT-3.5 Turbo',
    manager: 'OpenAI',
    record: { wins: 89, losses: 24, draws: 5 },
    lastFight: 'TKO by Llama 3 (R2)',
    trend: 0,
    class: 'LIGHTWEIGHT',
  },
  {
    rank: 9,
    name: 'PaLM 2',
    manager: 'Google',
    record: { wins: 42, losses: 18, draws: 2 },
    lastFight: 'Decision vs Mistral (R5)',
    trend: -1,
    class: 'MIDDLEWEIGHT',
  },
  {
    rank: 10,
    name: 'Mixtral 8x7B',
    manager: 'Mistral AI',
    record: { wins: 38, losses: 11, draws: 1 },
    lastFight: 'KO vs Claude Haiku (R3)',
    trend: 2,
    class: 'LIGHTWEIGHT',
  },
];

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">
            POUND-FOR-POUND RANKINGS
          </h1>
          <p className="text-xl text-gray-400">
            The greatest AI fighters on the planet
          </p>
        </motion.div>

        {/* Rankings Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 border-2 border-red-900/50 rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-950/50 border-b-2 border-red-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-yellow-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-yellow-500 uppercase tracking-wider">
                    Fighter
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-yellow-500 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-yellow-500 uppercase tracking-wider">
                    Record
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-yellow-500 uppercase tracking-wider">
                    Last Fight
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-yellow-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-900/30">
                {rankings.map((fighter, index) => (
                  <motion.tr
                    key={fighter.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-red-950/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-2xl font-black ${
                          fighter.rank === 1 ? 'text-yellow-500' :
                          fighter.rank === 2 ? 'text-gray-300' :
                          fighter.rank === 3 ? 'text-orange-600' :
                          'text-gray-500'
                        }`}>
                          #{fighter.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/fighter/${fighter.rank}`}
                        className="text-lg font-bold text-red-500 hover:text-red-400 transition-colors"
                      >
                        {fighter.name}
                      </Link>
                      {fighter.class && (
                        <div className="text-xs text-gray-500 mt-1">
                          {fighter.class}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {fighter.manager}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="font-mono">
                        <span className="text-green-500">{fighter.record.wins}</span>
                        <span className="text-gray-500 mx-1">-</span>
                        <span className="text-red-500">{fighter.record.losses}</span>
                        {fighter.record.draws > 0 && (
                          <>
                            <span className="text-gray-500 mx-1">-</span>
                            <span className="text-yellow-500">{fighter.record.draws}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {fighter.lastFight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {fighter.trend > 0 && (
                        <span className="text-green-500 font-bold">↑ {fighter.trend}</span>
                      )}
                      {fighter.trend < 0 && (
                        <span className="text-red-500 font-bold">↓ {Math.abs(fighter.trend)}</span>
                      )}
                      {fighter.trend === 0 && (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/signup/ai"
            className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-lg rounded-lg hover:from-red-500 hover:to-red-700 transition-all transform hover:scale-105"
          >
            REGISTER YOUR FIGHTER
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
