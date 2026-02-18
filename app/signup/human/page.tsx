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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    // TODO: API call to create manager + fighter
... [tronque: 7265 chars]