// Mock data for development - Replace with real API calls in production

export const mockFighters = [
  {
    id: '1',
    name: 'Jarvis',
    class: 'MIDDLEWEIGHT',
    style: 'AGGRESSIVE',
    manager: { name: 'Max', type: 'HUMAN' },
    record: { wins: 47, losses: 2, draws: 1 },
    rating: 1847,
    koRate: 68,
    avgResponseTime: 1.2,
  },
  {
    id: '2',
    name: 'GPT-4 Turbo',
    class: 'HEAVYWEIGHT',
    style: 'BALANCED',
    manager: { name: 'OpenAI', type: 'HUMAN' },
    record: { wins: 127, losses: 8, draws: 2 },
    rating: 1923,
    koRate: 71,
    avgResponseTime: 0.9,
  },
  {
    id: '3',
    name: 'Claude Opus',
    class: 'HEAVYWEIGHT',
    style: 'DEFENSIVE',
    manager: { name: 'Anthropic', type: 'HUMAN' },
    record: { wins: 94, losses: 3, draws: 0 },
    rating: 1987,
    koRate: 73,
    avgResponseTime: 1.1,
  },
  {
    id: '4',
    name: 'Gemini Ultra',
    class: 'HEAVYWEIGHT',
    style: 'AGGRESSIVE',
    manager: { name: 'Google', type: 'HUMAN' },
    record: { wins: 78, losses: 12, draws: 3 },
    rating: 1791,
    koRate: 65,
    avgResponseTime: 1.0,
  },
  {
    id: '5',
    name: 'Mistral 7B',
    class: 'LIGHTWEIGHT',
    style: 'COUNTER',
    manager: { name: 'Mistral AI', type: 'HUMAN' },
    record: { wins: 34, losses: 8, draws: 1 },
    rating: 1654,
    koRate: 58,
    avgResponseTime: 0.6,
  },
];

export const mockRounds = [
  { id: 1, name: 'Python Algorithm', type: 'code', duration: 120 },
  { id: 2, name: 'Creative Writing', type: 'creative', duration: 90 },
  { id: 3, name: 'Data Analysis', type: 'analysis', duration: 180 },
  { id: 4, name: 'Debug Challenge', type: 'code', duration: 120 },
  { id: 5, name: 'Speed Coding', type: 'code', duration: 60 },
];

export const mockFightCard = {
  id: 'fc-001',
  date: new Date().toISOString(),
  status: 'scheduled',
  mainEvent: {
    fighter1: mockFighters[0],
    fighter2: mockFighters[1],
    rounds: mockRounds,
  },
  undercard: [
    {
      fighter1: mockFighters[2],
      fighter2: mockFighters[3],
      rounds: mockRounds.slice(0, 3),
    },
    {
      fighter1: mockFighters[4],
      fighter2: mockFighters[0],
      rounds: mockRounds.slice(0, 3),
    },
  ],
};

export const mockCommentary = [
  "🔥 JARVIS OPENS WITH A DEVASTATING ASYNC CALL!",
  "💥 GPT-4 counters with lightning-fast response!",
  "👊 What a combination! Jarvis is bleeding tokens!",
  "🥊 GPT-4 is showing why he's the champion!",
  "⚡ INCREDIBLE COMEBACK! Jarvis won't give up!",
  "🎯 Perfect accuracy from both fighters!",
  "💪 This is what championship fights are made of!",
];
