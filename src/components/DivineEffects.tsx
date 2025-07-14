import React, { useEffect, useState } from 'react';

const OM_DURATION = 8000;
const JAI_DURATION = 5000;
const SPARKLE_COUNT = 18;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const DivineEffects: React.FC = () => {
  const [showOm, setShowOm] = useState(false);
  const [showJai, setShowJai] = useState(false);

  useEffect(() => {
    setShowOm(true);
    const omInterval = setInterval(() => {
      setShowOm(false);
      setTimeout(() => setShowOm(true), 1000);
    }, OM_DURATION);
    return () => clearInterval(omInterval);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowJai(true), 2000);
    const jaiInterval = setInterval(() => {
      setShowJai(false);
      setTimeout(() => setShowJai(true), 2000);
    }, JAI_DURATION + 2000);
    return () => clearInterval(jaiInterval);
  }, []);

  // Sparkle positions
  const sparkles = Array.from({ length: SPARKLE_COUNT }).map((_, i) => ({
    left: `${getRandom(20, 80)}%`,
    top: `${getRandom(30, 70)}%`,
    size: getRandom(6, 16),
    delay: getRandom(0, 3),
  }));

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 1000 }}>
      {/* Glowing Temple Silhouette */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '60%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.18,
        filter: 'blur(0.5px) drop-shadow(0 0 60px gold)',
        zIndex: 1,
      }}>
        {/* Simple SVG temple silhouette */}
        <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#glow)">
            <path d="M160 20 L200 80 H120 Z" fill="#FFD700" fillOpacity="0.7" />
            <rect x="130" y="80" width="60" height="60" fill="#FFA500" fillOpacity="0.7" />
            <rect x="145" y="110" width="30" height="30" fill="#FFD700" fillOpacity="0.8" />
            <rect x="155" y="120" width="10" height="20" fill="#fff8dc" fillOpacity="0.7" />
          </g>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      {/* Golden Sparkles */}
      {sparkles.map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFD700 60%, #fff8dc 100%)',
            opacity: 0.7,
            filter: 'blur(0.5px)',
            animation: `sparkleFade 2.5s ${s.delay}s infinite alternate`
          }}
        />
      ))}
      {/* Subtle Light Rays */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '60%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <svg width="400" height="220" viewBox="0 0 400 220">
          <g>
            {[...Array(8)].map((_, i) => (
              <rect
                key={i}
                x={200 + 90 * Math.cos((i / 8) * 2 * Math.PI) - 8}
                y={110 + 90 * Math.sin((i / 8) * 2 * Math.PI) - 60}
                width="16"
                height="120"
                rx="8"
                fill="url(#ray)"
                opacity="0.18"
                transform={`rotate(${(i * 360) / 8} 200 110)`}
              />
            ))}
          </g>
          <defs>
            <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fff8dc" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Animated Om Symbol */}
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '32%',
          transform: 'translate(-50%, -50%)',
          fontSize: 96,
          color: '#FFA500',
          textShadow: '0 0 32px #FFD700, 0 0 8px #fff8dc',
          opacity: showOm ? 1 : 0,
          transition: 'opacity 2s',
          animation: showOm ? 'omFloat 8s linear infinite' : undefined,
          zIndex: 2,
          fontFamily: 'serif',
        }}
      >
        ॐ
      </span>
      {/* जय श्री राम glowing text */}
      {showJai && (
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '48%',
            transform: 'translate(-50%, -50%)',
            fontSize: 48,
            color: '#FFA500',
            fontFamily: 'Noto Sans Devanagari, serif',
            textShadow: '0 0 24px #FFD700, 0 0 8px #fff8dc',
            opacity: 1,
            animation: 'jaiGlow 5s ease-in-out',
            zIndex: 2,
            letterSpacing: 2,
            fontWeight: 700,
          }}
        >
          जय श्री राम
        </span>
      )}
      <style>{`
        @keyframes omFloat {
          0% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-24px); }
          100% { transform: translate(-50%, -50%) translateY(0); }
        }
        @keyframes sparkleFade {
          0% { opacity: 0.7; }
          100% { opacity: 0.1; }
        }
        @keyframes jaiGlow {
          0% { opacity: 0; text-shadow: none; }
          20% { opacity: 1; text-shadow: 0 0 24px #FFD700, 0 0 8px #fff8dc; }
          80% { opacity: 1; text-shadow: 0 0 24px #FFD700, 0 0 8px #fff8dc; }
          100% { opacity: 0; text-shadow: none; }
        }
      `}</style>
    </div>
  );
};

export default DivineEffects; 