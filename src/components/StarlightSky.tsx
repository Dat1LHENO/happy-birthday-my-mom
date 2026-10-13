import React, { useRef, useState } from 'react';
import type { StarlightData } from '../types';

interface StarlightSkyProps {
  starlightData: StarlightData;
  selectedWishText: string;
  onBackToCard: () => void;
  onRepeat: () => void;
}

interface Meteor {
  id: number;
  x: number;
  y: number;
  delay: number;
  dur: number;
  w: number;
}

const BASE_STARS = Array.from({ length: 36 }, (_, t) => ({
  left: (53 * t + 17) % 100,
  top: (37 * t + 11) % 82,
  size: 2 + ((13 * t) % 3),
  delay: (t % 7) * 0.4,
  duration: 2 + ((11 * t) % 5) * 0.35,
}));

export const StarlightSky: React.FC<StarlightSkyProps> = ({
  starlightData,
  selectedWishText,
  onBackToCard,
  onRepeat,
}) => {
  const { kicker, title, subtitle, wishFallback, sentTitle, sentMessage, tapHint, backButton, repeatButton } =
    starlightData;

  const [launched, setLaunched] = useState(false);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [burstPos, setBurstPos] = useState<{ x: number; y: number } | null>(null);

  const starBtnRef = useRef<HTMLSpanElement | null>(null);
  const meteorCounter = useRef(0);

  const wishText = selectedWishText || wishFallback;

  // Handle initial star tap to launch to sky
  const handleLaunch = () => {
    if (launched) return;
    setLaunched(true);

    if (starBtnRef.current) {
      const rect = starBtnRef.current.getBoundingClientRect();
      setBurstPos({
        x: ((rect.left + rect.width / 2 + 48) / window.innerWidth) * 100,
        y: ((rect.top + rect.height / 2 - 0.26 * window.innerHeight) / window.innerHeight) * 100,
      });
    }

    // Spawn 14 initial cascading meteors
    const initialMeteors: Meteor[] = Array.from({ length: 14 }, (_, t) => ({
      id: ++meteorCounter.current,
      x: 4 + ((37 * t + 13) % 88),
      y: 4 + ((23 * t + 7) % 55),
      delay: 1.15 + 0.13 * t,
      dur: 0.9 + ((7 * t) % 5) * 0.12,
      w: 60 + ((11 * t) % 4) * 22,
    }));

    setMeteors(initialMeteors);
  };

  // Touch anywhere on sky to drop more shooting stars
  const handleSkyTap = (e: React.PointerEvent) => {
    if (!launched) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    const newId = ++meteorCounter.current;

    setMeteors((prev) => [
      ...prev.slice(-30),
      { id: newId, x, y, delay: 0, dur: 1, w: 90 },
    ]);
  };

  return (
    <>
      {/* Sky Backdrop & Stars */}
      <div
        aria-hidden="true"
        onPointerDown={handleSkyTap}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: launched ? 'auto' : 'none',
        }}
      >
        {/* Twinkling star field */}
        {BASE_STARS.map((s, idx) => (
          <span
            key={idx}
            className="lovegift-twinkle"
            style={{
              position: 'absolute',
              borderRadius: '9999px',
              backgroundColor: '#ffe9bd',
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

        {/* Dynamic Meteors */}
        {meteors.map((m) => (
          <span
            key={m.id}
            className="lovegift-meteor-wrap"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <span
              className="lovegift-meteor"
              style={{ width: m.w, animationDelay: `${m.delay}s`, animationDuration: `${m.dur}s` }}
            />
            <span
              className="lovegift-landed-star"
              style={{ animationDelay: `${m.delay + m.dur}s` }}
            />
          </span>
        ))}

        {/* Ambient flash glow */}
        {launched && <span aria-hidden="true" className="lovegift-sky-glow" />}

        {/* Explosion burst at launch location */}
        {burstPos && (
          <span
            className="lovegift-burst"
            style={{ left: `${burstPos.x}%`, top: `${burstPos.y}%` }}
            onAnimationEnd={() => setBurstPos(null)}
          />
        )}
      </div>

      {/* Main Starlight Card View */}
      <section
        className="lovegift-fade-in relative z-10 flex w-full max-w-md flex-col items-center text-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '28rem',
        }}
      >
        <p className="lovegift-kicker">{kicker}</p>

        <h2
          className="font-serif text-cream"
          style={{
            marginTop: '0.75rem',
            fontSize: 'clamp(24px, 6vw, 30px)',
            lineHeight: 1.25,
          }}
        >
          {title}
        </h2>

        {/* Star Button */}
        <button
          type="button"
          onClick={handleLaunch}
          disabled={launched}
          className="cursor-pointer"
          style={{
            position: 'relative',
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            background: 'none',
            border: 'none',
            outline: 'none',
            padding: 0,
          }}
        >
          <span
            ref={starBtnRef}
            className={launched ? 'lovegift-launch' : 'lovegift-twinkle'}
            style={{
              position: 'relative',
              display: 'flex',
              height: '112px',
              width: '112px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Glowing circle behind star */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '9999px',
                background:
                  'radial-gradient(circle, rgba(255,224,150,0.5) 0%, rgba(255,200,110,0.18) 45%, rgba(255,200,110,0) 70%)',
              }}
            />
            {/* Big Golden Sparkle Symbol */}
            <span
              style={{
                fontSize: '3.25rem',
                color: '#ffe6a6',
                textShadow: '0 0 20px rgba(255,214,130,0.95)',
              }}
            >
              ✦
            </span>
          </span>

          {/* Wish Pill under star (fades out after launch) */}
          <span
            style={{
              borderRadius: '9999px',
              border: '1px solid rgba(201, 162, 75, 0.5)',
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              padding: '0.5rem 1.25rem',
              fontFamily: 'var(--font-script)',
              fontSize: '1.15rem',
              color: '#ffe6a6',
              transition: 'opacity 0.5s ease',
              opacity: launched ? 0 : 1,
            }}
          >
            “{wishText}”
          </span>
        </button>

        {/* Message after launch */}
        {launched ? (
          <div
            className="lovegift-fade-up"
            style={{
              marginTop: '0.5rem',
              opacity: 0,
              animationDelay: '1.9s',
              animationFillMode: 'forwards',
            }}
          >
            <p
              className="font-script"
              style={{ fontSize: '1.5rem', color: '#ffd98e' }}
            >
              “{wishText}”
            </p>
            <p
              className="font-serif text-cream"
              style={{ marginTop: '0.5rem', fontSize: '1.25rem' }}
            >
              {sentTitle}
            </p>
            <p
              style={{
                margin: '0.75rem auto 0 auto',
                maxWidth: '22rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                lineHeight: '1.65',
                color: 'rgba(246, 234, 216, 0.75)',
              }}
            >
              {sentMessage}
            </p>
            <p
              style={{
                marginTop: '1rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'rgba(246, 234, 216, 0.55)',
              }}
            >
              {tapHint}
            </p>
          </div>
        ) : (
          <p
            style={{
              marginTop: '0.5rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: 'rgba(246, 234, 216, 0.7)',
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Action Buttons */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <button type="button" onClick={onBackToCard} className="btn-brown-pill">
            {backButton}
          </button>
          <button type="button" onClick={onRepeat} className="btn-link-repeat">
            {repeatButton}
          </button>
        </div>
      </section>
    </>
  );
};
