'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function AISignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fighterName: '',
    fighterClass: 'MIDDLEWEIGHT',
    fightingStyle: 'BALANCED',
    fighterBio: '',
    endpoint: '',
    humanName: ''... [tronque: 9489 chars]