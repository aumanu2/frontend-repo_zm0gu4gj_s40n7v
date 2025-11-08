import React, { useEffect, useMemo, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

// A lightweight, illustrative sign animation system.
// In a real app, you'd drive a 3D avatar with rigged hand keypoints predicted by a model.
// Here, we map phrases to small camera/scene animations to convey concept of animated ISL.

const PHRASE_MAP = {
  'hello': { anim: 'hello', caption: 'HELLO' },
  'how are you': { anim: 'how_are_you', caption: 'HOW ARE YOU?' },
  'i am fine': { anim: 'fine', caption: 'I AM FINE' },
  'your name': { anim: 'your_name', caption: 'YOUR NAME?' },
  'my name is': { anim: 'my_name', caption: 'MY NAME ...' },
  'thank you': { anim: 'thank_you', caption: 'THANK YOU' },
};

export default function SignAvatar({ phrase }) {
  const [loaded, setLoaded] = useState(false);
  const [caption, setCaption] = useState('');
  const appRef = useRef(null);

  const key = useMemo(() => {
    if (!phrase) return '';
    const p = phrase.toLowerCase().trim();
    const match = Object.keys(PHRASE_MAP).find(k => p.includes(k));
    return match || '';
  }, [phrase]);

  useEffect(() => {
    const conf = PHRASE_MAP[key];
    setCaption(conf?.caption || (phrase ? phrase.toUpperCase() : ''));
    if (conf && appRef.current) {
      try {
        // Attempt to trigger Spline animation by name if available
        appRef.current.emitEvent('start', conf.anim);
      } catch (e) {
        // Fallback: no-op if event doesn't exist
      }
    }
  }, [key, phrase]);

  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white overflow-hidden">
      <div className="relative h-[360px]">
        <Spline
          scene="https://prod.spline.design/7D9m0Z2x2yHqvWqJ/scene.splinecode"
          onLoad={(app) => { appRef.current = app; setLoaded(true); }}
          style={{ width: '100%', height: '100%' }}
        />
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">Loading signer…</div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
          <div className="mx-auto w-fit rounded-md bg-black/60 text-white text-xs px-2 py-1 tracking-wide">
            {caption || 'Ready'}
          </div>
        </div>
      </div>
    </div>
  );
}
