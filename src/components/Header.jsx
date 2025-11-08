import React from 'react';
import { Hand, MessagesSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white/70 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <Hand className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">SignBridge (ISL)</h1>
            <p className="text-xs text-zinc-500">Real-time bridge between signers and speakers for interviews</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-zinc-500">
          <MessagesSquare className="h-5 w-5" />
          <span className="text-sm">Bidirectional • Real-time • ISL-inspired</span>
        </div>
      </div>
    </header>
  );
}
