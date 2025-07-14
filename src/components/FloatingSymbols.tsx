import React, { useEffect, useState } from 'react';

const SYMBOLS = [
  'ॐ', '🛕', 'ॐ', '🛕', 'ॐ', '🛕', 'ॐ', '🛕', 'ॐ', '🛕'
];

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const FloatingSymbols: React.FC = () => {
  const [positions, setPositions] = useState(
    SYMBOLS.map(() => ({
      top: getRandom(5, 85),
      left: getRandom(5, 85),
      duration: getRandom(10, 30),
      delay: getRandom(0, 10),
      size: getRandom(32, 64),
      direction: Math.random() > 0.5 ? 1 : -1
    }))
  );

  // Optionally, update positions every so often for more randomness
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(
        SYMBOLS.map(() => ({
          top: getRandom(5, 85),
          left: getRandom(5, 85),
          duration: getRandom(10, 30),
          delay: getRandom(0, 10),
          size: getRandom(32, 64),
          direction: Math.random() > 0.5 ? 1 : -1
        }))
      );
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 999 }}>
      {SYMBOLS.map((symbol, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: `${positions[i].top}%`,
            left: `${positions[i].left}%`,
            fontSize: positions[i].size,
            opacity: 0.5,
            animation: `floatY${i} ${positions[i].duration}s ease-in-out ${positions[i].delay}s infinite alternate`,
            filter: 'drop-shadow(0 2px 8px #fff)'
          }}
        >
          {symbol}
        </span>
      ))}
      <style>{`
        ${SYMBOLS.map((_, i) => `
          @keyframes floatY${i} {
            0% { transform: translateY(0px) scale(1); }
            100% { transform: translateY(${positions[i].direction * getRandom(60, 120)}px) scale(1.1); }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};

export default FloatingSymbols; 