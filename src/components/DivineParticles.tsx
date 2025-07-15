import React, { useEffect, useRef, useState } from 'react';

const PARTICLE_TYPES = [
  { type: 'om', content: 'ॐ' },
  { type: 'temple', content: '🛕' },
  { type: 'jai', content: 'जय श्री राम' },
];
const PARTICLE_COUNT = 1;

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

  // Show a few (3) subtle spiritual emojis in different corners
  return (
    <>
      <div style={{ pointerEvents: 'none', position: 'absolute', left: 24, bottom: 24, zIndex: 1000, opacity: 0.18 }}>
        <span style={{ fontSize: 64, color: '#FFA500', fontFamily: 'Tiro Devanagari Sanskrit, serif', textShadow: '0 0 12px #FFD700' }}>ॐ</span>
      </div>
      <div style={{ pointerEvents: 'none', position: 'absolute', right: 32, top: 32, zIndex: 1000, opacity: 0.15 }}>
        <span style={{ fontSize: 48, color: '#FFD700', fontFamily: 'Noto Sans Devanagari, serif', textShadow: '0 0 8px #FFA500' }}>जय श्री राम</span>
      </div>
      <div style={{ pointerEvents: 'none', position: 'absolute', right: 40, bottom: 40, zIndex: 1000, opacity: 0.13 }}>
        <span style={{ fontSize: 56, color: '#FFD700', textShadow: '0 0 10px #FFA500' }}>🛕</span>
    </div>
    </>
  );
};

export default DivineParticles; 