import React from 'react';

const NUM_RINGS = 12;
const RAMS_START = 12;
const RING_GAP = 18;
const MIN_FONT = 16;
const MAX_FONT = 28;
const COLORS = [
  '#e53935', '#d81b60', '#ff4081', '#ff1744', '#ff9100', '#ff5252', '#ff80ab', '#ffb300', '#ff7043', '#ff4081', '#ff1744', '#d50000', '#ad1457', '#f06292', '#f44336', '#ff8a65', '#ffb74d', '#ffcc80'
];

function getGradientColor(t) {
  const idx = t * (COLORS.length - 1);
  const i = Math.floor(idx);
  const frac = idx - i;
  const hexToRgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16));
  const rgbToHex = rgb => '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
  const c1 = hexToRgb(COLORS[i]);
  const c2 = hexToRgb(COLORS[Math.min(i + 1, COLORS.length - 1)]);
  const rgb = c1.map((v, j) => Math.round(v + (c2[j] - v) * frac));
  return rgbToHex(rgb);
}

export default function RamChakra() {
  const rings = [];
  for (let ring = 0; ring < NUM_RINGS; ring++) {
    const tRing = ring / (NUM_RINGS - 1);
    const ramsInRing = RAMS_START + ring * 2;
    const radius = 32 + ring * RING_GAP;
    const fontSize = MIN_FONT + ((MAX_FONT - MIN_FONT) * tRing);
    const color = getGradientColor(tRing);
    const rams = [];
    for (let i = 0; i < ramsInRing; i++) {
      const angle = (2 * Math.PI * i) / ramsInRing;
      const x = 120 + Math.cos(angle) * radius;
      const y = 120 + Math.sin(angle) * radius;
      rams.push(
        <text
          key={i}
          x={x}
          y={y}
          fill={color}
          fontSize={fontSize}
          fontWeight="bold"
          fontFamily="Tiro Devanagari Sanskrit, serif"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${(angle * 180) / Math.PI + 90} ${x} ${y})`}
          style={{
            filter: 'drop-shadow(0 0 2px #fffbe6)',
            paintOrder: 'stroke fill',
            stroke: '#fff',
            strokeWidth: 0.7,
            opacity: 0.92
          }}
        >
          राम
        </text>
      );
    }
    rings.push(
      <g
        key={ring}
        style={{
          transformOrigin: '120px 120px',
          animation: `ramchakra-spin-${ring} 20s linear infinite`,
          animationDirection: ring % 2 === 0 ? 'normal' : 'reverse',
        }}
      >
        {rams}
      </g>
    );
  }
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: '19vw',
        maxWidth: 180,
        minWidth: 70,
        aspectRatio: '1/1',
        position: 'relative',
        left: '-1cm',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'blur(12px)',
        }}
      >
        {/* Glowing radial aura */}
        <svg width="100%" height="100%" viewBox="0 0 240 240">
          <radialGradient id="ram-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#ffe082" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <circle cx="120" cy="120" r="80" fill="url(#ram-aura)" />
        </svg>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          background: 'transparent',
          pointerEvents: 'none',
          display: 'flex',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 240 240"
          style={{
            display: 'block',
            background: 'none',
            overflow: 'visible',
          }}
        >
          <defs>
            <radialGradient id="ram-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbe6" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Hanuman ji image in the center with circular mask to remove white background */}
          <defs>
            <clipPath id="hanuman-center-clip">
              <circle cx="120" cy="120" r="28" />
            </clipPath>
          </defs>
          <image
            href="/download (2).jpeg"
            x="92"
            y="92"
            width="56"
            height="56"
            style={{ pointerEvents: 'none' }}
            clipPath="url(#hanuman-center-clip)"
          />
          {rings}
        </svg>
        <style>{`
          @media (max-width: 768px) {
            .ramchakra-svg {
              width: 40vw !important;
              height: 40vw !important;
              max-width: 98vw !important;
            }
          }
          ${Array.from({length: NUM_RINGS}).map((_, i) => `
            @keyframes ramchakra-spin-${i} {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `).join('')}
        `}</style>
      </div>
    </div>
  );
} 