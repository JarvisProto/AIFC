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
  ... [tronque: 7267 chars]