import React, { useEffect, useState } from 'react';
import type { OpeningData, UIData } from '../types';

interface OpeningReelProps {
  data: OpeningData;
  ui: UIData;
  onDone: () => void;
}

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const REEL_FROM = -190;
const REEL_TO = -1254;

const TWINKLES = [
  { x: 16, y: 24, size: 15, delay: 0 },
  { x: 80, y: 18, size: 10, delay: 0.6 },
  { x: 64, y: 62, size: 13, delay: 1.1 },
  { x: 28, y: 66, size: 9, delay: 0.3 },
  { x: 86, y: 48, size: 12, delay: 0.9 },
];

export const OpeningReel: React.FC<OpeningReelProps> = ({ data, ui, onDone }) => {
  const { greeting, day, month } = data;
  const [fadingOut, setFadingOut] = useState(false);

  const monthIdx = Math.min(11, Math.max(0, month - 1));
  const monthName = ui.months[monthIdx] ?? `Tháng ${month}`;
  const maxDays = DAYS_IN_MONTH[monthIdx];

  useEffect(() => {
    const isReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fadeTimer = window.setTimeout(() => setFadingOut(true), isReduced ? 2200 : 4500);
    const doneTimer = window.setTimeout(onDone, isReduced ? 2800 : 5200);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  // Generate 23 numbers where index 18 lands on `day`
  const numbers = Array.from({ length: 23 }, (_, t) => {
    return (((day - 1 + (t - 18)) % maxDays + maxDays) % maxDays) + 1;
  });

  return (
    <section
      onClick={onDone}
      title="Chạm để chuyển tiếp"
      className={`lovegift-fade-in fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden px-5 cursor-pointer ${
        fadingOut ? 'lovegift-opening-out' : ''
      }`}
    >
      {/* Dark radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(62% 42% at 50% 46%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Twinkles */}
      <div className="lovegift-reveal-late pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {TWINKLES.map((t, idx) => (
          <span
            key={idx}
            className="lovegift-twinkle absolute text-gold"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              fontSize: `${t.size}px`,
              animationDelay: `${t.delay}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Floating Balloon */}
      <div
        className="lovegift-reveal-late pointer-events-none absolute z-10"
        style={{ right: '14%', top: '16%' }}
        aria-hidden="true"
      >
        <svg
          className="lovegift-balloon"
          width="52"
          height="72"
          viewBox="0 0 52 72"
          fill="none"
          stroke="#e8cf94"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="18" cy="19" rx="12" ry="15" />
          <ellipse cx="36" cy="26" rx="10" ry="13" />
          <path d="M18 34 C 18 43, 26 47, 25 58" />
          <path d="M36 39 C 36 46, 30 50, 30 58" />
          <path d="M21 58 q 4 5 8 0" />
        </svg>
      </div>

      {/* Main Greeting */}
      <h1
        className="lovegift-script-in relative z-10 mb-5 max-w-[86vw] text-center font-hand font-semibold text-cream"
        style={{
          fontSize: 'clamp(46px, 14vw, 88px)',
          lineHeight: '0.98',
          textShadow: '0 0 26px rgba(255,220,150,0.35)',
        }}
      >
        {greeting}
      </h1>

      {/* Reel Box */}
      <div
        className="relative z-10"
        style={{
          height: 304,
          width: 'min(360px, 92vw)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%)',
        }}
      >
        {/* Spinning number strip */}
        <div
          className="lovegift-reel absolute left-0 top-0 w-full"
          style={
            {
              '--reel-from': `${REEL_FROM}px`,
              '--reel-to': `${REEL_TO}px`,
            } as React.CSSProperties
          }
        >
          {numbers.map((num, i) => (
            <div
              key={i}
              className="flex items-center justify-center font-serif font-semibold text-cream"
              style={{
                height: 76,
                fontSize: 'clamp(38px, 11vw, 60px)',
                opacity: i === 18 ? 0 : 0.8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Revealed target date in center */}
        <div
          className="absolute left-1/2 top-1/2 z-20 flex w-max items-center justify-center gap-3"
          style={{
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Radial glow */}
          <span
            aria-hidden="true"
            className="lovegift-reveal-glow absolute left-1/2 top-1/2 -z-10 rounded-full"
            style={{
              width: 230,
              height: 230,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,206,120,0.5) 0%, rgba(255,180,80,0.18) 42%, rgba(255,180,80,0) 70%)',
            }}
          />
          <span
            className="lovegift-arrow-in font-serif text-gold"
            style={{ fontSize: 'clamp(26px, 7vw, 44px)' }}
          >
            →
          </span>
          <span
            className="lovegift-reveal-pop font-serif font-semibold"
            style={{
              fontSize: 'clamp(72px, 22vw, 128px)',
              lineHeight: 1,
              color: '#f4d68a',
              textShadow: '0 0 30px rgba(255,206,120,0.6)',
            }}
          >
            {day}
          </span>
          <span
            className="lovegift-month-in font-serif text-cream"
            style={{
              fontSize: 'clamp(20px, 6vw, 34px)',
              alignSelf: 'flex-end',
              whiteSpace: 'nowrap',
              paddingBottom: '8px',
            }}
          >
            {monthName}
          </span>
        </div>
      </div>
    </section>
  );
};
