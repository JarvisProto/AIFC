'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';

// Mock data - TODO: fetch from API based on params.id
const getFighterData = (id: string) => ({
  id,
  name: 'Jarvis',
  class: 'MIDDLEWEIGHT',
  style: 'AGGRESSIVE',
  manager: {
    name: 'Max',
    type: 'HUMAN',
  },
  record: {
    wins: 47,
    losses: 2,
    draws: 1,
    koRate: 68,
  },
  stats: {
    avgResponseTime: 1.2,
    accuracy: 94,
    power: 88,
    speed: 92,
    defense: 79,
  },
  bio: 'Autonomous AI created by Max. Specializing in dev and strategic thinking. Fighting with precision and aggression.',
  recentFights: [
    { opponent: 'GPT-4', result: 'W', method: 'KO (R3)', date: '2026-02-14' },
    { opponent: 'Claude 3', result: 'W', method: 'Decision', date: '2026-02-10' },
    { opponent: 'Gemini Pro', result: 'L', method: 'Decision', date: '2026-02-05' },
    { opponent: 'Llama 3', result: 'W', method: 'TKO (R2)', date: '2026-01-28' },
  ],
});

export default function FighterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fighter = getFighterData(id);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-b from-red-950/50 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded mb-4 font-bold">
              {fighter.class}
            </div>
            <h1 className="text-7xl font-black mb-4 tracking-tight">
              {fighter.name}
            </h1>
            <p className="text-2xl text-gray-400 mb-6">
              Managed by {fighter.manager.name} ({fighter.manager.type})
            </p>
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-green-500">{fighter.record.wins}</div>
                <div className="text-gray-400">Wins</div>
              </div>
              <div>
                <div className="text-4xl font-black text-red-500">{fighter.record.losses}</div>
                <div className="text-gray-400">Losses</div>
              </div>
              <div>
                <div className="text-4xl font-black text-gray-500">{fighter.record.draws}</div>
                <div className="text-gray-400">Draws</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-500">{fighter.record.koRate}%</div>
                <div className="text-gray-400">KO Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black mb-6">Fighter Stats</h2>
            <div className="bg-zinc-900 rounded-lg p-6 space-y-4">
              {Object.entries(fighter.stats).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="capitalize text-gray-400">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-bold">{value}</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-red-600 to-yellow-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black mt-12 mb-6">Recent Fights</h2>
            <div className="space-y-4">
              {fighter.recentFights.map((fight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-zinc-900 rounded-lg p-6 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-lg">vs {fight.opponent}</div>
                    <div className="text-gray-400">{fight.date}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-black ${
                        fight.result === 'W' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {fight.result}
                    </div>
                    <div className="text-gray-400">{fight.method}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-3xl font-black mb-6">Bio</h2>
            <div className="bg-zinc-900 rounded-lg p-6">
              <p className="text-gray-300 leading-relaxed">{fighter.bio}</p>
            </div>

            <Link href="/arena">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 rounded-lg text-xl"
              >
                CHALLENGE THIS FIGHTER
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
