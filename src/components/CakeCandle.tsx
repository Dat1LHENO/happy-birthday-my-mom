import React from 'react';

interface CakeCandleProps {
  cakeImg: string;
  progress: number;
  holding: boolean;
  extinguished: boolean;
  lit: boolean;
}

export const CakeCandle: React.FC<CakeCandleProps> = ({
  cakeImg,
  progress,
  holding,
  extinguished,
  lit,
}) => {
  const CIRCLE_RADIUS = 46;
  const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const flameOpacity = lit && !extinguished ? 1 : 0;

  return (
    <div
      className="lovegift-sway relative"
      style={{
        width: 'clamp(230px, 66vw, 310px)',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {/* Candle Top Group */}
      <div
        className="absolute z-30"
        style={{
          left: '50%',
          top: '-86px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Ambient flame halo glow */}
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            left: '50%',
            top: '6px',
            transform: 'translate(-50%, -50%)',
            width: 160,
            height: 160,
            background:
              'radial-gradient(circle, rgba(255,180,90,0.55) 0%, rgba(255,150,60,0.22) 32%, rgba(255,140,50,0) 68%)',
            opacity: !lit || extinguished ? 0 : holding ? 0.9 : 0.75,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Circular Hold Progress Ring */}
        <svg
          className="absolute pointer-events-none"
          width={104}
          height={104}
          style={{
            left: '50%',
            top: '6px',
            transform: 'rotate(-90deg)',
            opacity: lit ? (holding ? 1 : 0.28) : 0,
            transition: 'opacity 0.3s ease',
          }}
          aria-hidden="true"
        >
          {/* Base track */}
          <circle
            cx={52}
            cy={52}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="rgba(255, 214, 150, 0.28)"
            strokeWidth={2}
          />
          {/* Active progress */}
          <circle
            cx={52}
            cy={52}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="rgba(255, 214, 150, 0.95)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            style={{
              transition: holding ? 'none' : 'stroke-dashoffset 0.4s ease',
            }}
          />
        </svg>

        {/* Flame element */}
        <div
          aria-hidden="true"
          className="relative"
          style={{
            width: 17,
            height: 30,
            opacity: flameOpacity,
            transform: `rotate(${holding ? 22 * progress : 0}deg) scaleY(${extinguished ? 0.2 : 1 - 0.35 * progress
              })`,
            transformOrigin: '50% 100%',
            transition: extinguished
              ? 'opacity 0.4s ease, transform 0.4s ease'
              : holding
                ? 'none'
                : 'opacity 0.45s ease',
          }}
        >
          <div
            className={`absolute inset-0 ${lit && !extinguished
              ? holding
                ? 'lovegift-blowing'
                : 'lovegift-flame'
              : ''
              } ${extinguished ? 'lovegift-blowout' : ''}`}
            style={{ position: 'absolute', inset: 0 }}
          >
            {/* Main flame gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(60% 55% at 50% 68%, #fff3c4 0%, #ffb347 45%, #ff7a1a 78%, rgba(255,90,10,0.2) 100%)',
                borderRadius: '50% 50% 50% 50% / 62% 62% 40% 40%',
                boxShadow: '0 0 14px 4px rgba(255,150,60,0.6)',
              }}
            />
            {/* Inner blue oxygen core */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 7,
                height: 12,
                background:
                  'radial-gradient(50% 60% at 50% 70%, #7db6ff 0%, rgba(125,182,255,0) 75%)',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>

        {/* Candle Wax Body */}
        <div
          className="relative"
          style={{
            width: 16,
            height: 56,
            marginTop: 2,
            clipPath: 'polygon(30% 0, 70% 0, 92% 100%, 8% 100%)',
            background:
              'repeating-linear-gradient(-58deg, rgba(201,162,75,0.75) 0 2px, rgba(201,162,75,0) 2px 7px), linear-gradient(90deg, #c9ad78 0%, #f6ecd4 32%, #fffaf0 50%, #ead6ac 76%, #c3a670 100%)',
            boxShadow:
              'inset -2px 0 4px rgba(120,90,40,0.28), inset 2px 0 3px rgba(255,250,235,0.55)',
            filter: lit ? 'brightness(1)' : 'brightness(0.5)',
            transition: 'filter 1.1s ease',
          }}
        >
          {/* Black wick */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '-5px',
              width: 2,
              height: 6,
              transform: 'translateX(-50%)',
              borderRadius: '9999px',
              backgroundColor: '#3a2a1a',
            }}
          />
        </div>

        {/* Smoke after blowing out */}
        {extinguished && (
          <span
            aria-hidden="true"
            className="lovegift-smoke absolute"
            style={{
              left: '50%',
              top: '22px',
              zIndex: 40,
            }}
          />
        )}

        {/* Initial match lighting animation */}
        {!lit && !extinguished && (
          <div
            className="lovegift-match absolute z-40"
            aria-hidden="true"
            style={{ left: '50%', top: '18px' }}
          >
            <div
              style={{
                width: 54,
                height: 4,
                borderRadius: 2,
                transform: 'rotate(24deg)',
                transformOrigin: '0 50%',
                background: 'linear-gradient(90deg, #cf9f61 0%, #6f4a29 100%)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.35)',
                position: 'relative',
              }}
            >
              <div
                className="lovegift-flame"
                style={{
                  position: 'absolute',
                  left: -3,
                  top: -4,
                  width: 7,
                  height: 11,
                  transformOrigin: '50% 100%',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  background:
                    'radial-gradient(60% 55% at 50% 68%, #fff3c4 0%, #ffb347 45%, #ff6a1a 85%, rgba(255,90,10,0.2) 100%)',
                  boxShadow: '0 0 9px 3px rgba(255,140,50,0.7)',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Birthday Cake Image */}
      <img
        src={cakeImg}
        alt="Bánh sinh nhật"
        draggable={false}
        className="select-none pointer-events-none"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'block',
          opacity: 1 - 0.92 * progress,
          filter: lit ? 'brightness(1)' : 'brightness(0.42)',
          transition: holding ? 'none' : 'opacity 0.4s ease, filter 1.1s ease',
        }}
      />

      {/* Floating golden motes */}
      {lit &&
        !extinguished &&
        [0, 1, 2, 3].map((idx) => (
          <span
            key={idx}
            className="lovegift-mote"
            style={{
              zIndex: 20,
              left: `${46 + 3 * idx}%`,
              top: -40,
              animationDelay: `${0.9 * idx}s`,
              animationDuration: `${4 + 0.6 * idx}s`,
            }}
          />
        ))}
    </div>
  );
};
