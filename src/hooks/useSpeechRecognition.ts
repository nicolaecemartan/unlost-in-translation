'use client';

import { useState } from 'react';

export const useSpeechRecognition = (language = 'en-US') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    // Verificăm dacă browserul suportă API-ul (Safari folosește prefixul webkit)
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Browser-ul tău nu suportă recunoașterea vocală.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language; 
    recognition.interimResults = false; // Luăm doar rezultatul final
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
    };

    recognition.onerror = (event: any) => {
      console.error('Eroare microfon:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return { isListening, transcript, startListening, setTranscript };
};
