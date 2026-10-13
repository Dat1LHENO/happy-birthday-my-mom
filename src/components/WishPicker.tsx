import React, { useState } from 'react';
import type { WishData } from '../types';

interface WishPickerProps {
  wishData: WishData;
  wishTagImg: string;
  onSelectWish: (index: number) => void;
}

export const WishPicker: React.FC<WishPickerProps> = ({
  wishData,
  wishTagImg,
  onSelectWish,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(idx);
    window.setTimeout(() => {
      onSelectWish(idx);
    }, 2500);
  };

  return (
    <section
      className="relative flex w-full max-w-md flex-col items-center text-center"
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
      <p
        className={`lovegift-kicker ${
          selectedIndex !== null ? 'opacity-0' : ''
        }`}
        style={{
          transition: 'opacity 0.5s ease',
          opacity: selectedIndex !== null ? 0 : 1,
        }}
      >
        {wishData.kicker}
      </p>

      <h2
        className="font-serif text-cream"
        style={{
          marginTop: '0.75rem',
          fontSize: 'clamp(24px, 6vw, 30px)',
          lineHeight: '1.3',
          transition: 'opacity 0.5s ease',
          opacity: selectedIndex !== null ? 0 : 1,
        }}
      >
        {wishData.question}
      </h2>

      {/* Grid 2x2 of Wish Tags */}
      <div
        style={{
          marginTop: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '1.25rem 2rem',
          placeItems: 'center',
        }}
      >
        {wishData.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isOther = selectedIndex !== null && !isSelected;

          return (
            <button
              key={idx}
              type="button"
              disabled={selectedIndex !== null}
              onClick={() => handleSelect(idx)}
              className={`group relative cursor-pointer ${
                isSelected ? 'lovegift-wish-fly' : ''
              }`}
              style={{
                aspectRatio: '351 / 760',
                width: 'clamp(95px, 28vw, 125px)',
                position: 'relative',
                background: 'none',
                border: 'none',
                padding: 0,
                outline: 'none',
                transform: isOther ? 'scale(0.85)' : 'none',
                opacity: isOther ? 0 : 1,
                transition: 'all 0.5s ease',
                zIndex: isSelected ? 20 : 1,
              }}
            >
              {/* Golden burst aura on selection */}
              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '185%',
                    height: '125%',
                    background:
                      'radial-gradient(circle, rgba(255,224,150,0.8) 0%, rgba(255,200,110,0.32) 45%, rgba(255,200,110,0) 72%)',
                    zIndex: -1,
                  }}
                />
              )}

              {/* Tag texture */}
              <img
                src={wishTagImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: isSelected
                    ? 'drop-shadow(0 0 16px rgba(255,220,140,0.95)) brightness(1.15)'
                    : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
                  transition: 'filter 0.3s ease',
                }}
              />

              {/* Tag text */}
              <span
                style={{
                  position: 'absolute',
                  inset: '36% 14% 13% 14%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(11px, 3.2vw, 13px)',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  color: '#4a2a1c',
                }}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <p
          className="lovegift-fade-in font-script text-cream"
          style={{
            marginTop: '1.75rem',
            fontSize: '1.25rem',
            color: 'rgba(246, 234, 216, 0.9)',
          }}
        >
          {wishData.reply}
        </p>
      )}
    </section>
  );
};
