import React, { useMemo } from 'react';

interface PetalRainProps {
  count?: number;
  petals: string[];
}

export const PetalRain: React.FC<PetalRainProps> = ({ count = 14, petals }) => {
  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      src: petals[i % petals.length],
      left: Math.random() * 100,
      size: 16 + Math.random() * 26,
      duration: 7 + Math.random() * 6,
      delay: -(Math.random() * 12),
      rotate: Math.random() * 360,
    }));
  }, [count, petals]);

  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        overflow: 'hidden',
      }}
    >
      {items.map((item, idx) => (
        <img
          key={idx}
          src={item.src}
          alt=""
          aria-hidden="true"
          className="lovegift-petal"
          style={{
            position: 'absolute',
            top: 0,
            left: `${item.left}%`,
            width: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            transform: `rotate(${item.rotate}deg)`,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
          }}
        />
      ))}
    </div>
  );
};
