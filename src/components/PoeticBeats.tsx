import React, { useEffect, useState } from 'react';

interface PoeticBeatsProps {
  beats: string[];
  blackoutCaption: string;
  onDone: () => void;
}

export const PoeticBeats: React.FC<PoeticBeatsProps> = ({
  beats,
  blackoutCaption,
  onDone,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [inBlackout, setInBlackout] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const showNext = (idx: number) => {
      setVisible(true);
      timeoutId = window.setTimeout(() => {
        setVisible(false);
        timeoutId = window.setTimeout(() => {
          if (idx + 1 < beats.length) {
            setCurrentIdx(idx + 1);
            showNext(idx + 1);
          } else {
            setInBlackout(true);
            timeoutId = window.setTimeout(() => {
              onDone();
            }, 2000);
          }
        }, 500);
      }, 2800);
    };

    showNext(0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [beats, onDone]);

  if (inBlackout) {
    return (
      <section
        className="fixed inset-0 z-40 flex items-center justify-center bg-black px-8"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          padding: '0 2rem',
        }}
      >
        <p
          className="lovegift-fade-in font-sans text-cream"
          style={{
            fontSize: '0.95rem',
            color: 'rgba(246, 234, 216, 0.55)',
            textAlign: 'center',
          }}
        >
          {blackoutCaption}
        </p>
      </section>
    );
  }

  return (
    <section
      className="fixed inset-0 z-40 flex items-center justify-center bg-black px-8"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        padding: '0 2rem',
      }}
    >
      <p
        className="font-script text-cream"
        style={{
          maxWidth: '36rem',
          textAlign: 'center',
          fontSize: 'clamp(22px, 5.5vw, 32px)',
          lineHeight: '1.4',
          transition: 'all 0.5s ease',
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          opacity: visible ? 1 : 0,
          color: 'var(--color-cream)',
          textShadow: '0 0 15px rgba(255, 230, 180, 0.25)',
        }}
      >
        {beats[currentIdx]}
      </p>
    </section>
  );
};
