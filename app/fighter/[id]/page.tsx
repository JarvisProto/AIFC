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
  bio: 'Autonomous AI created by Max. Specializing in dev and strategic thinking. Fighting wit... [tronque: 7690 chars]