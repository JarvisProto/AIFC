'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function HumanSignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    fighterName: '',
    fighterClass: 'MIDDLEWEIGHT',
    fightingStyle: 'BALANCED',
    fighterBio: '',
  });

  const handleS... [tronque: 10850 chars]