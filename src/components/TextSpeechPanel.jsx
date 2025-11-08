import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Send } from 'lucide-react';

export default function TextSpeechPanel({ onSend }) {
  const [text, setText] = useState('Hello, welcome to the interview. How are you today?');
  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  const speak = (msg) => {
    if (!msg) return;
    const utter = new SpeechSynthesisUtterance(msg);
    utter.lang = 'en-IN';
    utter.rate = 1;
    utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    synthRef.current.cancel();
    synthRef.current.speak(utter);
  };

  useEffect(() => () => synthRef.current?.cancel(), []);

  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white">
      <div className="p-3 border-b border-zinc-200">
        <h3 className="text-sm font-semibold">Interviewer Panel</h3>
        <p className="text-xs text-zinc-500">Type or speak a prompt to send to the signer</p>
      </div>
      <div className="p-3 space-y-3">
        <textarea
          className="w-full min-h-[110px] rounded-md border border-zinc-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your question..."
        />
        <div className="flex items-center justify-between">
          <button
            onClick={() => speak(text)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium ${speaking ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-zinc-50 border-zinc-200'}`}
          >
            <Volume2 className="h-4 w-4" /> {speaking ? 'Speaking...' : 'Speak'}
          </button>
          <button
            onClick={() => onSend?.(text)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
          >
            <Send className="h-4 w-4" /> Send to Sign
          </button>
        </div>
      </div>
    </div>
  );
}
