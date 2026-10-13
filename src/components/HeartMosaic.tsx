import React, { useEffect, useState } from 'react';
import type { HeartData, UIData } from '../types';

interface HeartMosaicProps {
  data: HeartData;
  ui: UIData;
  photos: string[];
  onNext: () => void;
}

const HEART_GRID = [
  [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
];

function pseudoRandom(val: number) {
  const t = 43758.5453 * Math.sin(val);
  return t - Math.floor(t);
}

const SPARKS = Array.from({ length: 12 }, (_, idx) => {
  const angle = (idx / 12) * Math.PI * 2 + 0.5 * pseudoRandom(idx);
  const dist = 70 + 70 * pseudoRandom(3.1 * idx);
  return {
    sx: `${Math.cos(angle) * dist}px`,
    sy: `${Math.sin(angle) * dist}px`,
    delay: `${1.62 + 0.18 * pseudoRandom(7.7 * idx)}s`,
  };
});

export const HeartMosaic: React.FC<HeartMosaicProps> = ({
  data,
  ui,
  photos,
  onNext,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Auto rotate lightbox photo
  useEffect(() => {
    if (!lightboxOpen || photos.length <= 1) return;
    const interval = window.setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [lightboxOpen, photos.length]);

  return (
    <section
      className="lovegift-fade-in relative flex w-full max-w-md flex-col items-center text-center"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '28rem',
      }}
    >
      {/* Heart Container */}
      <div
        className="relative"
        style={{ width: 'min(340px, 84vw)', margin: '0 auto', position: 'relative' }}
      >
        {/* Soft Pink Ambient Glow */}
        <div
          aria-hidden="true"
          className="lovegift-heart-glow absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '138%',
            height: '128%',
            background:
              'radial-gradient(circle, rgba(226,140,150,0.5) 0%, rgba(201,132,150,0.22) 45%, rgba(201,132,150,0) 72%)',
            zIndex: -1,
          }}
        />

        <div className="relative">
          {/* Mosaic Grid */}
          <div
            className="lovegift-heartbeat"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(11, 1fr)`,
              gap: 'clamp(1px, 0.5vw, 3px)',
            }}
          >
            {HEART_GRID.flatMap((row, r) =>
              row.map((cell, c) => {
                if (!cell) {
                  return (
                    <span
                      key={`${r}-${c}`}
                      style={{ aspectRatio: '1', display: 'block' }}
                    />
                  );
                }

                const n1 = pseudoRandom(3.7 * r + 19.1 * c + 5);
                const n2 = pseudoRandom(8.3 * r + 2.9 * c + 1);
                const photoIdx =
                  Math.floor(pseudoRandom(5.2 * r + 9.7 * c + 3) * photos.length) %
                  photos.length;
                const photoUrl = photos[photoIdx];

                const style: React.CSSProperties = {
                  backgroundImage: `url("${photoUrl}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow:
                    'inset 0 0 0 1px rgba(255,235,235,0.18), 0 1px 3px rgba(0,0,0,0.28)',
                  transformOrigin: `${50 + (5 - c) * 100}% ${
                    50 + (3.4 - r) * 100
                  }%`,
                  animationDelay: `${0.4 * n2}s`,
                  aspectRatio: '1',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  ['--spin' as any]: `${210 + 90 * n1}deg`,
                  ['--sc' as any]: `${1.55 + 0.7 * n1}`,
                };

                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    aria-label={ui.viewPhoto}
                    onClick={() => {
                      setActivePhotoIdx(photoIdx);
                      setLightboxOpen(true);
                    }}
                    className="lovegift-tile-spiral"
                    style={style}
                  />
                );
              })
            )}
          </div>

          {/* Golden Burst Animations */}
          <span
            aria-hidden="true"
            className="lovegift-heart-burst pointer-events-none absolute rounded-full"
            style={{
              left: '50%',
              top: '44%',
              transform: 'translate(-50%, -50%)',
              width: '72%',
              height: '72%',
              background:
                'radial-gradient(circle, rgba(255,246,214,0.95) 0%, rgba(255,214,140,0.6) 32%, rgba(255,200,110,0) 70%)',
            }}
          />
          <span
            aria-hidden="true"
            className="lovegift-heart-ring pointer-events-none absolute rounded-full"
            style={{
              left: '50%',
              top: '44%',
              transform: 'translate(-50%, -50%)',
              width: '48%',
              height: '48%',
              border: '2px solid rgba(255,224,160,0.9)',
            }}
          />

          {SPARKS.map((spark, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="lovegift-heart-spark pointer-events-none absolute rounded-full"
              style={
                {
                  left: '50%',
                  top: '44%',
                  width: 5,
                  height: 5,
                  marginLeft: -2.5,
                  marginTop: -2.5,
                  backgroundColor: '#ffe9bd',
                  boxShadow: '0 0 8px 2px rgba(255,214,130,0.8)',
                  animationDelay: spark.delay,
                  '--sx': spark.sx,
                  '--sy': spark.sy,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* Tap hint */}
        <p
          style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            color: 'rgba(246, 234, 216, 0.45)',
          }}
        >
          {ui.heartTapHint}
        </p>
      </div>

      {/* Caption & Title */}
      <p
        style={{
          marginTop: '1.75rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          color: 'rgba(246, 234, 216, 0.7)',
        }}
      >
        {data.caption}
      </p>

      <h2
        className="font-serif text-cream"
        style={{
          marginTop: '0.5rem',
          fontSize: 'clamp(28px, 7vw, 38px)',
          lineHeight: 1.15,
        }}
      >
        {data.title}
      </h2>

      <p
        style={{
          marginTop: '0.5rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          color: 'rgba(246, 234, 216, 0.7)',
        }}
      >
        {data.subtitle}
      </p>

      {/* Next Button */}
      <div style={{ marginTop: '2rem' }}>
        <button type="button" onClick={onNext} className="btn-gold-pill">
          {data.next}
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lovegift-fade-in"
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '1.5rem',
          }}
        >
          <div
            className="lovegift-lightbox-in"
            style={{
              position: 'relative',
              aspectRatio: '3 / 4',
              width: 'min(86vw, 400px)',
              overflow: 'hidden',
              borderRadius: '1.25rem',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
            }}
          >
            {photos.map((photo, i) => (
              <img
                key={photo + i}
                src={photo}
                alt=""
                aria-hidden="true"
                draggable={false}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: i === activePhotoIdx ? 1 : 0,
                  transition: 'opacity 1s ease',
                  animation:
                    i === activePhotoIdx
                      ? 'lovegiftKenBurns 7s ease-out both'
                      : 'none',
                }}
              />
            ))}

            {/* Inner Border Ring */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '1.25rem',
                border: '1px solid rgba(255,255,255,0.15)',
                pointerEvents: 'none',
              }}
            />

            {/* Pagination Dots */}
            <div
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px',
              }}
            >
              {photos.map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    height: '6px',
                    borderRadius: '999px',
                    transition: 'all 0.3s ease',
                    width: idx === activePhotoIdx ? '16px' : '6px',
                    backgroundColor:
                      idx === activePhotoIdx
                        ? 'var(--color-cream)'
                        : 'rgba(246, 234, 216, 0.4)',
                  }}
                />
              ))}
            </div>
          </div>

          <p
            style={{
              marginTop: '1.5rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'rgba(246, 234, 216, 0.6)',
            }}
          >
            {ui.tapToClose}
          </p>
        </div>
      )}
    </section>
  );
};
