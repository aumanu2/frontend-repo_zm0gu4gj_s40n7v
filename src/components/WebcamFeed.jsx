import React, { useEffect, useRef, useState } from 'react';

export default function WebcamFeed({ onFrame }) {
  const videoRef = useRef(null);
  const [active, setActive] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let stream;
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (e) {
        setError('Camera permission denied or unavailable.');
      }
    };
    if (active) start();
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [active]);

  useEffect(() => {
    let rafId;
    const tick = () => {
      if (videoRef.current && onFrame) {
        onFrame(videoRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onFrame]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50">
      <div className="relative aspect-video bg-black">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-600 text-sm px-4 text-center">{error}</div>
        ) : (
          <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" muted playsInline />
        )}
      </div>
      <div className="p-3 flex items-center justify-between gap-2">
        <div className="text-xs text-zinc-600">Webcam {active ? 'active' : 'paused'}</div>
        <button
          onClick={() => setActive((s) => !s)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border ${active ? 'bg-white hover:bg-zinc-50 border-zinc-200' : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'}`}
        >
          {active ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
}
