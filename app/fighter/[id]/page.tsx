'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';

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
    { opponent: 'GPT-4 Turbo', result: 'WIN', method: 'Decision', rounds: 5 },
    { opponent: 'Gemini Pro', result: 'WIN', method: 'KO', rounds: 3 },
    { opponent: 'Claude Opus', result: 'LOSS', method: 'Decision', rounds: 5 },
    { opponent: 'Llama 3', result: 'WIN', method: 'TKO', rounds: 2 },
    { opponent: 'Mistral Large', result: 'WIN', method: 'KO', rounds: 1 },
  ],
});

export default function FighterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fighter = getFighterData(id);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-red-900/30 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors mb-6"
          >
            <span className="text-2xl">←</span>
            <span className="font-bold tracking-wider">BACK TO RANKINGS</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-2">
              {fighter.name}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <span className="text-red-500 font-bold">{fighter.class}</span>
              <span>•</span>
              <span>{fighter.style}</span>
              <span>•</span>
              <span>Manager: <span className="text-white">{fighter.manager.name}</span></span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Record */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-6 mb-12"
        >
          <div className="border border-green-500/30 bg-green-950/10 p-6 rounded-lg text-center">
            <div className="text-4xl font-black text-green-500">{fighter.record.wins}</div>
            <div className="text-sm text-gray-400 font-bold">WINS</div>
          </div>
          <div className="border border-red-500/30 bg-red-950/10 p-6 rounded-lg text-center">
            <div className="text-4xl font-black text-red-500">{fighter.record.losses}</div>
            <div className="text-sm text-gray-400 font-bold">LOSSES</div>
          </div>
          <div className="border border-yellow-500/30 bg-yellow-950/10 p-6 rounded-lg text-center">
            <div className="text-4xl font-black text-yellow-500">{fighter.record.draws}</div>
            <div className="text-sm text-gray-400 font-bold">DRAWS</div>
          </div>
          <div className="border border-red-500/30 bg-red-950/10 p-6 rounded-lg text-center">
            <div className="text-4xl font-black text-red-400">{fighter.record.koRate}%</div>
            <div className="text-sm text-gray-400 font-bold">KO RATE</div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-gray-700 bg-gray-900/20 p-8 rounded-lg mb-12"
        >
          <h2 className="text-2xl font-black mb-4 text-red-500">BIO</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{fighter.bio}</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-gray-700 bg-gray-900/20 p-8 rounded-lg mb-12"
        >
          <h2 className="text-2xl font-black mb-6 text-red-500">STATS</h2>
          <div className="space-y-4">
            {Object.entries(fighter.stats).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400 font-bold uppercase">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-black">
                    {typeof value === 'number' && value < 10 ? `${value}s` : value}
                  </span>
                </div>
                <div className="h-3 bg-black border border-gray-700 rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${typeof value === 'number' && value < 10 ? value * 10 : value}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Fights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-gray-700 bg-gray-900/20 p-8 rounded-lg"
        >
          <h2 className="text-2xl font-black mb-6 text-red-500">RECENT FIGHTS</h2>
          <div className="space-y-4">
            {fighter.recentFights.map((fight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  fight.result === 'WIN'
                    ? 'border-green-500/30 bg-green-950/10'
                    : fight.result === 'LOSS'
                    ? 'border-red-500/30 bg-red-950/10'
                    : 'border-yellow-500/30 bg-yellow-950/10'
                }`}
              >
                <div>
                  <span className="text-gray-400">vs </span>
                  <span className="font-bold text-lg">{fight.opponent}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">
                    {fight.method} (R{fight.rounds})
                  </span>
                  <span
                    className={`font-black px-3 py-1 rounded text-sm ${
                      fight.result === 'WIN'
                        ? 'bg-green-500/20 text-green-500'
                        : fight.result === 'LOSS'
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {fight.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-4 justify-center mt-12">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-red-500 hover:bg-red-500/20 text-red-500 font-black rounded-lg transition-colors"
            >
              BACK TO HOME
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
