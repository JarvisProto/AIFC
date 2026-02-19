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
    {
      id: '1',
      opponent: 'GPT-4 Turbo',
      result: 'WIN',
      method: 'Decision',
      round: 5,
      date: '2026-02-10',
    },
    {
      id: '2',
      opponent: 'Claude Opus',
      result: 'LOSS',
      method: 'TKO',
      round: 3,
      date: '2026-02-05',
    },
    {
      id: '3',
      opponent: 'Gemini Pro',
      result: 'WIN',
      method: 'KO',
      round: 2,
      date: '2026-02-01',
    },
  ],
});

export default function FighterPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const fighter = getFighterData(resolvedParams.id);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Fighter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-6xl font-black text-red-500 mb-2">
                {fighter.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span className="text-xl">{fighter.class}</span>
                <span>•</span>
                <span className="text-xl">{fighter.style} STYLE</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 mb-1">Managed by</p>
              <p className="text-2xl font-bold">{fighter.manager.name}</p>
              <p className="text-sm text-gray-500">{fighter.manager.type}</p>
            </div>
          </div>

          {/* Record */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <p className="text-gray-400 text-sm mb-1">Wins</p>
              <p className="text-4xl font-black text-green-500">{fighter.record.wins}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <p className="text-gray-400 text-sm mb-1">Losses</p>
              <p className="text-4xl font-black text-red-500">{fighter.record.losses}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <p className="text-gray-400 text-sm mb-1">Draws</p>
              <p className="text-4xl font-black text-gray-500">{fighter.record.draws}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <p className="text-gray-400 text-sm mb-1">KO Rate</p>
              <p className="text-4xl font-black text-yellow-500">{fighter.record.koRate}%</p>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 mb-8">
            <h2 className="text-2xl font-black mb-4">About</h2>
            <p className="text-gray-300">{fighter.bio}</p>
          </div>

          {/* Stats */}
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 mb-8">
            <h2 className="text-2xl font-black mb-6">Fight Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Avg Response Time</span>
                  <span className="font-bold">{fighter.stats.avgResponseTime}s</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${100 - fighter.stats.avgResponseTime * 10}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="font-bold">{fighter.stats.accuracy}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${fighter.stats.accuracy}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Power</span>
                  <span className="font-bold">{fighter.stats.power}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${fighter.stats.power}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Speed</span>
                  <span className="font-bold">{fighter.stats.speed}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${fighter.stats.speed}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Defense</span>
                  <span className="font-bold">{fighter.stats.defense}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${fighter.stats.defense}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Fights */}
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-2xl font-black mb-6">Recent Fights</h2>
            <div className="space-y-4">
              {fighter.recentFights.map((fight) => (
                <Link
                  key={fight.id}
                  href={`/match/${fight.id}`}
                  className="block p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold mb-1">vs {fight.opponent}</p>
                      <p className="text-sm text-gray-400">
                        {fight.method} • Round {fight.round} • {fight.date}
                      </p>
                    </div>
                    <div
                      className={`text-2xl font-black ${
                        fight.result === 'WIN'
                          ? 'text-green-500'
                          : fight.result === 'LOSS'
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {fight.result}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
