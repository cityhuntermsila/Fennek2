// Kid-friendly Text-to-Speech & Speech Recognition helper

export function speakText(text: string, lang: 'en-US' | 'ar-DZ' | 'fr-FR' = 'en-US', rate = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }

    // Cancel current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate; // slightly slower for young learners (8-9 years old)
    utterance.pitch = 1.1; // friendly, slightly higher pitch for kids

    // Find best matching voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      if (lang === 'en-US') {
        const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
        if (preferred) utterance.voice = preferred;
      }
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// Local SpeechRecognition fallback (Web Speech API)
export function getLocalSpeechRecognition(): any {
  if (typeof window === 'undefined') return null;
  const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRec) return null;
  return new SpeechRec();
}
