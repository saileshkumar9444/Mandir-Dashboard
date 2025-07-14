import React, { useEffect, useRef, useState } from 'react';

const SYMBOLS = [
  { type: 'om', content: 'ॐ' },
  { type: 'temple', content: '🛕' },
  { type: 'jai', content: 'जय श्री राम' },
];
const COLORS = ['#FF4500', '#FFA500'];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomSymbol() {
  const base = SYMBOLS[getRandomInt(SYMBOLS.length)];
  return {
    ...base,
    key: Math.random().toString(36).slice(2),
    top: `${getRandomInt(85)}%`,
    left: `${getRandomInt(85)}%`,
    size: base.type === 'jai' ? 28 + getRandomInt(10) : 28 + getRandomInt(18),
    opacity: 0.33 + Math.random() * 0.22,
    rotate: getRandomInt(2) ? getRandomInt(30) - 15 : 0,
    duration: 6 + Math.random() * 4,
    delay: Math.random() * 2,
    color: COLORS[getRandomInt(COLORS.length)],
    glow: '#FFD700',
  };
}

// Randomly choose between 3 and 4 visible symbols
function getVisibleCount() {
  return 3 + getRandomInt(2); // 3 or 4
}

const SubtleDivineBackground: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [visible, setVisible] = useState(() =>
    Array.from({ length: getVisibleCount() }, getRandomSymbol)
  );
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // If visibleCount changes, update the array size
    setVisible((prev) => {
      if (prev.length === visibleCount) return prev;
      if (prev.length < visibleCount) {
        return [...prev, ...Array.from({ length: visibleCount - prev.length }, getRandomSymbol)];
      } else {
        return prev.slice(0, visibleCount);
      }
    });
  }, [visibleCount]);

  useEffect(() => {
    visible.forEach((s, i) => {
      const respawn = () => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = getRandomSymbol();
          return next;
        });
        // Occasionally randomize the visible count
        if (Math.random() < 0.2) setVisibleCount(getVisibleCount());
        timeouts.current[i] = setTimeout(respawn, (visible[i].duration + visible[i].delay + 1.5) * 1000);
      };
      timeouts.current[i] = setTimeout(respawn, (s.duration + s.delay + 1.5) * 1000);
    });
    return () => timeouts.current.forEach(clearTimeout);
    // eslint-disable-next-line
  }, [visible]);

  return (
    <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}>
      {visible.map((s, i) => (
        <span
          key={s.key}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            fontSize: s.size,
            opacity: 0,
            fontFamily: s.type === 'jai' ? 'Noto Sans Devanagari, serif' : 'serif',
            fontWeight: s.type === 'jai' ? 700 : 400,
            letterSpacing: s.type === 'jai' ? 1 : undefined,
            transform: `rotate(${s.rotate}deg)` + (s.type === 'jai' ? ' scale(1.1)' : ''),
            animation: `subtleFadeFloat${i} ${s.duration}s ${s.delay}s linear forwards`,
            userSelect: 'none',
            zIndex: 0,
            whiteSpace: 'nowrap',
            color: s.color,
            textShadow: `0 0 16px ${s.glow}, 0 0 2px #fff8dc` + (s.type === 'jai' ? ', 0 0 24px #FFD700' : ''),
            background: 'transparent',
          }}
        >
          {s.type === 'temple' ? (
            <span role="img" aria-label="temple">🛕</span>
          ) : s.content}
          <style>{`
            @keyframes subtleFadeFloat${i} {
              0% { opacity: 0; transform: rotate(${s.rotate}deg) scale(0.95); }
              10% { opacity: ${s.opacity}; }
              80% { opacity: ${s.opacity}; transform: rotate(${s.rotate}deg) scale(1.05); }
              100% { opacity: 0; transform: rotate(${s.rotate}deg) scale(1.1); }
            }
          `}</style>
        </span>
      ))}
    </div>
  );
};

export default SubtleDivineBackground; 