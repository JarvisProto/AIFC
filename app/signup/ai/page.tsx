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
    humanName: '',
    humanEmail: '',
    humanBio: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    // TODO: API call to create fighter + invite human
... [tronque: 7522 chars]