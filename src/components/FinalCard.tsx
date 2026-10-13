import React from 'react';
import type { FinalData } from '../types';

interface FinalCardProps {
  finalData: FinalData;
  onSendToSky: () => void;
  onRepeat: () => void;
}

export const FinalCard: React.FC<FinalCardProps> = ({
  finalData,
  onSendToSky,
  onRepeat,
}) => {
  const { kicker, title, from, message, starButton, repeatButton } = finalData;

  const corners = [
    { top: 12, left: 12, transform: 'none' },
    { top: 12, right: 12, transform: 'rotate(90deg)' },
    { bottom: 12, right: 12, transform: 'rotate(180deg)' },
    { bottom: 12, left: 12, transform: 'rotate(-90deg)' },
  ];

  return (
    <section
      className="lovegift-fade-up relative flex w-full max-w-md flex-col items-center"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '28rem',
      }}
    >
      {/* Golden Frame Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          borderRadius: '1.5rem',
          border: '1px solid rgba(201, 162, 75, 0.45)',
          backgroundColor: 'rgba(0, 0, 0, 0.42)',
          padding: '3rem 2rem',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Ornate Golden Corners */}
        {corners.map((pos, idx) => (
          <span
            key={idx}
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderLeft: '1.5px solid rgba(201, 162, 75, 0.75)',
              borderTop: '1.5px solid rgba(201, 162, 75, 0.75)',
              ...pos,
            }}
          />
        ))}

        <p className="lovegift-kicker">{kicker}</p>

        <h2
          className="font-serif text-cream"
          style={{
            marginTop: '0.75rem',
            fontSize: 'clamp(26px, 6.5vw, 32px)',
            lineHeight: '1.2',
          }}
        >
          {title}
        </h2>

        <p
          className="font-script"
          style={{
            marginTop: '0.35rem',
            fontSize: '1.35rem',
            color: 'var(--color-gold)',
          }}
        >
          {from}
        </p>

        {/* Golden Divider */}
        <div
          style={{
            margin: '1.25rem auto',
            height: '1px',
            width: '64px',
            backgroundColor: 'rgba(201, 162, 75, 0.5)',
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            color: 'rgba(246, 234, 216, 0.75)',
          }}
        >
          {message}
        </p>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <button type="button" onClick={onSendToSky} className="btn-gold-glow">
          {starButton}
        </button>

        <button type="button" onClick={onRepeat} className="btn-link-repeat">
          {repeatButton}
        </button>
      </div>
    </section>
  );
};
