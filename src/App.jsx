import React, { useCallback, useMemo, useState } from 'react';
import Header from './components/Header';
import WebcamFeed from './components/WebcamFeed';
import TextSpeechPanel from './components/TextSpeechPanel';
import SignAvatar from './components/SignAvatar';

// This demo focuses on an interview scenario with bidirectional translation scaffolding.
// No backend calls are needed for this visual prototype; realtime ML would live server-side.

export default function App() {
  const [recognizedText, setRecognizedText] = useState('');
  const [toSign, setToSign] = useState('');

  // Mock recognizer: periodically "recognizes" simple gestures by sampling frames.
  const onFrame = useCallback((videoEl) => {
    // Placeholder for future ML: capture frames and send to backend for ISL recognition.
    // For the visual demo, we do nothing here to keep it performant and stable.
    return videoEl;
  }, []);

  const handleSendToSign = useCallback((text) => {
    setToSign(text);
  }, []);

  const transcript = useMemo(() => recognizedText || 'Try common phrases like "Hello", "How are you?", "Thank you"', [recognizedText]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-zinc-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-2 gap-6">
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Signer → Text/Audio</h2>
          <WebcamFeed onFrame={onFrame} />
          <div className="rounded-xl border border-zinc-200 bg-white p-3">
            <div className="text-xs text-zinc-500 mb-1">Recognized Transcript</div>
            <div className="min-h-[64px] text-sm">{transcript}</div>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold">Text/Audio → Animated ISL</h2>
          <TextSpeechPanel onSend={handleSendToSign} />
          <SignAvatar phrase={toSign} />
        </section>
      </main>
      <footer className="py-8 text-center text-xs text-zinc-500">
        Built for an interview context. This is a visual prototype; model-backed recognition and ISL animation can be integrated next.
      </footer>
    </div>
  );
}
