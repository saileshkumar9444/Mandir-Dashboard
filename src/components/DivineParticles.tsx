import React, { useEffect, useRef, useState } from 'react';

const PARTICLE_TYPES = [
  { type: 'om', content: 'ॐ' },
  { type: 'temple', content: '🛕' },
  { type: 'jai', content: 'जय श्री राम' },
];
const PARTICLE_COUNT = 18;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomParticle() {
  const base = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
  return {
    ...base,
    key: Math.random().toString(36).slice(2),
    left: getRandom(2, 92),
    top: getRandom(5, 85),
    size: base.type === 'jai' ? getRandom(18, 32) : getRandom(20, 36),
    rotate: getRandom(-30, 30),
    duration: getRandom(3.5, 7),
    delay: getRandom(0, 2),
    driftX: getRandom(-20, 20),
    driftY: getRandom(-10, 10),
    color: base.type === 'om' ? '#FFA500' : base.type === 'temple' ? '#FFD700' : '#FFA500',
    glow: base.type === 'jai' ? '#FFD700' : '#fff8dc',
  };
}

const DivineParticles: React.FC = () => {
  const [particles, setParticles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, getRandomParticle)
  );
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Animate each particle independently
    particles.forEach((p, i) => {
      const respawn = () => {
        setParticles((prev) => {
          const next = [...prev];
          next[i] = getRandomParticle();
          return next;
        });
        // Schedule next respawn
        timeouts.current[i] = setTimeout(respawn, (particles[i].duration + particles[i].delay + getRandom(1, 2)) * 1000);
      };
      timeouts.current[i] = setTimeout(respawn, (p.duration + p.delay + getRandom(1, 2)) * 1000);
    });
    return () => timeouts.current.forEach(clearTimeout);
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 1000 }}>
      {particles.map((p, i) => (
        <span
          key={p.key}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: p.size,
            color: p.color,
            textShadow: `0 0 8px ${p.glow}, 0 0 2px #fff8dc` + (p.type === 'jai' ? ', 0 0 16px #FFD700' : ''),
            opacity: 0,
            fontFamily: p.type === 'jai' ? 'Noto Sans Devanagari, serif' : 'serif',
            fontWeight: p.type === 'jai' ? 700 : 400,
            letterSpacing: p.type === 'jai' ? 1 : undefined,
            transform: `rotate(${p.rotate}deg)`,
            animation: `divineFadeFloat${i} ${p.duration}s ${p.delay}s linear forwards`,
            userSelect: 'none',
            zIndex: 1000,
            whiteSpace: 'nowrap',
          }}
        >
          {p.type === 'temple' ? (
            <span role="img" aria-label="temple">🛕</span>
          ) : p.content}
          <style>{`
            @keyframes divineFadeFloat${i} {
              0% { opacity: 0; transform: rotate(${p.rotate}deg) translate(0, 0); }
              10% { opacity: 1; }
              80% { opacity: 1; transform: rotate(${p.rotate}deg) translate(${p.driftX}px, ${p.driftY}px); }
              100% { opacity: 0; transform: rotate(${p.rotate}deg) translate(${p.driftX}px, ${p.driftY}px); }
            }
          `}</style>
        </span>
      ))}
    </div>
  );
};

export default DivineParticles; 