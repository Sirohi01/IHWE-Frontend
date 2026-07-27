import React from 'react';

type StallStatus = 'available' | 'booked' | 'hold' | 'premium';

type StallShape = {
  id: string;
  backendId: string;
  w: number;
  h: number;
  x: number;
  y: number;
  defaultStatus?: StallStatus;
};

const cs = (
  idText: string,
  backendId: string,
  w: number,
  h: number,
  x: number,
  y: number,
  defaultStatus: StallStatus = 'available',
): StallShape => ({ id: idText, backendId, w, h, x, y, defaultStatus });

const seq = (
  start: number,
  count: number,
  sqm: string,
  w: number,
  h: number,
  startX: number,
  startY: number,
  dx: number,
  dy: number,
  decrement = true,
  defaultStatus: StallStatus = 'available',
) => {
  const arr: StallShape[] = [];
  for (let i = 0; i < count; i++) {
    const num = decrement ? start - i : start + i;
    arr.push(cs(`Stall No. ${num}\n${sqm} Sqm`, num.toString(), w, h, startX + i * dx, startY + i * dy, defaultStatus));
  }
  return arr;
};

const HALL9_OFFSET = -20;
const AISLE_GAP = 40;
const BLOCK_82_X = 540 + HALL9_OFFSET + AISLE_GAP;
const BLOCK_70_X = 760;

const stalls: StallShape[] = [
  cs('Stall No. 180\n15 Sqm', '180', 30, 50, 100, 100, 'premium'),
  ...seq(181, 7, '09', 30, 30, 100, 150, 0, 30, false),
  ...seq(188, 3, '09', 30, 30, 100, 360, 0, 30, false),
  cs('Stall No.\n159, 160 & 179\n24 Sqm', '159,160,179', 40, 60, 160, 100, 'premium'),
  ...seq(178, 8, '09', 30, 30, 200, 100, 30, 0),
  ...seq(161, 8, '09', 30, 30, 200, 130, 30, 0, false),
  cs('Stall No.\n169 & 170\n18 Sqm', '169,170', 30, 60, 440, 100, 'premium'),
  cs('Stall No.\n138, 139 & 158\n24 Sqm', '138,139,158', 40, 60, 160, 190, 'premium'),
  ...seq(157, 7, '09', 30, 30, 200, 190, 30, 0),
  ...seq(140, 5, '09', 30, 30, 200, 220, 30, 0, false),
  ...seq(145, 2, '09', 30, 30, 350, 220, 30, 0, false),
  cs('Stall No.\n147, 148, 149 & 150\n36 Sqm', '147,148,149,150', 60, 60, 410, 190, 'premium'),
  cs('Stall No.\n117, 118 & 137\n24 Sqm', '117,118,137', 40, 60, 160, 280, 'premium'),
  ...seq(136, 2, '09', 30, 30, 200, 280, 30, 0),
  ...seq(134, 2, '09', 30, 30, 260, 280, 30, 0),
  ...seq(132, 3, '09', 30, 30, 320, 280, 30, 0),
  ...seq(119, 1, '09', 30, 30, 200, 310, 30, 0, false),
  ...seq(120, 6, '09', 30, 30, 230, 310, 30, 0, false),
  cs('Stall No.\n126, 127, 128 & 129\n36 Sqm', '126,127,128,129', 60, 60, 410, 280, 'premium'),
  cs('Stall No.\n96, 97 & 116\n24 Sqm', '96,97,116', 40, 60, 160, 370, 'premium'),
  ...seq(115, 6, '09', 30, 30, 200, 370, 30, 0),
  ...seq(109, 1, '09', 30, 30, 380, 370, 30, 0),
  ...seq(98, 7, '09', 30, 30, 200, 400, 30, 0, false),
  cs('Stall No.\n105, 106, 107 & 108\n36 Sqm', '105,106,107,108', 60, 60, 410, 370, 'premium'),
  cs('Stall No.\n94 & 95\n18 Sqm', '94,95', 60, 30, 100, 460, 'premium'),
  ...seq(93, 3, '12', 40, 30, 160, 460, 40, 0),
  ...seq(90, 2, '12', 40, 30, 280, 460, 40, 0),
  cs('Stall No. 88\n12 Sqm', '88', 40, 30, 360, 460),
  cs('Stall No. 87\n12 Sqm', '87', 40, 30, 400, 460),
  cs('Stall No.\n85 & 86\n18 Sqm', '85,86', 60, 30, 440, 460, 'premium'),
  cs('Stall No.\n82, 83 & 84\n27 Sqm', '82,83,84', 90, 30, BLOCK_82_X, 190),
  cs('Stall No.\n79, 80 & 81\n24 Sqm', '79,80,81', 80, 30, BLOCK_82_X, 280, 'premium'),
  cs('Stall No.\n75, 76, 77 & 78\n32 Sqm', '75,76,77,78', 80, 40, BLOCK_82_X, 310, 'premium'),
  cs('Stall No.\n72, 73 & 74\n24 Sqm', '72,73,74', 60, 40, BLOCK_82_X + 80, 310, 'premium'),
  cs('Stall No.\n70 & 71\n18 Sqm', '70,71', 60, 30, BLOCK_70_X, 190, 'premium'),
  ...seq(69, 6, '09', 30, 30, BLOCK_70_X + 60, 190, 30, 0),
  cs('Stall No. 63\n09 Sqm', '63', 30, 30, BLOCK_70_X + 240, 190),
  cs('Stall No.\n61 & 62\n18 Sqm', '61,62', 60, 30, BLOCK_70_X + 270, 190, 'premium'),
  cs('Stall No.\n40, 41 & 60\n24 Sqm', '40,41,60', 60, 60, BLOCK_70_X, 280, 'premium'),
  cs('Stall No. 59\n09 Sqm', '59', 30, 30, BLOCK_70_X + 60, 280),
  ...seq(58, 5, '09', 30, 30, BLOCK_70_X + 90, 280, 30, 0),
  cs('Stall No. 53\n09 Sqm', '53', 30, 30, BLOCK_70_X + 240, 280),
  cs('Stall No. 42\n09 Sqm', '42', 30, 30, BLOCK_70_X + 60, 310),
  cs('Stall No. 43\n09 Sqm', '43', 30, 30, BLOCK_70_X + 90, 310),
  cs('Stall No. 44\n09 Sqm', '44', 30, 30, BLOCK_70_X + 120, 310),
  ...seq(45, 3, '09', 30, 30, BLOCK_70_X + 150, 310, 30, 0, false),
  cs('Stall No. 48\n09 Sqm', '48', 30, 30, BLOCK_70_X + 240, 310),
  cs('Stall No.\n51 & 52\n18 Sqm', '51,52', 60, 30, BLOCK_70_X + 270, 280, 'premium'),
  cs('Stall No.\n49 & 50\n18 Sqm', '49,50', 60, 30, BLOCK_70_X + 270, 310, 'premium'),
  cs('Stall No.\n13, 14 & 39\n28 Sqm', '13,14,39', 60, 60, BLOCK_70_X, 370, 'premium'),
  cs('Stall No.\n37 & 38\n15 Sqm', '37,38', 50, 30, BLOCK_70_X + 60, 370),
  cs('Stall No.\n35 & 36\n12 Sqm', '35,36', 40, 30, BLOCK_70_X + 110, 370),
  cs('Stall No.\n33 & 34\n12 Sqm', '33,34', 40, 30, BLOCK_70_X + 150, 370),
  cs('Stall No.\n31 & 32\n12 Sqm', '31,32', 40, 30, BLOCK_70_X + 190, 370),
  cs('Stall No.\n29 & 30\n12 Sqm', '29,30', 40, 30, BLOCK_70_X + 230, 370),
  cs('Stall No.\n15 & 16\n20 Sqm', '15,16', 50, 30, BLOCK_70_X + 60, 400),
  cs('Stall No.\n17 & 18\n16 Sqm', '17,18', 40, 30, BLOCK_70_X + 110, 400),
  cs('Stall No.\n19 & 20\n16 Sqm', '19,20', 40, 30, BLOCK_70_X + 150, 400),
  cs('Stall No.\n21 & 22\n16 Sqm', '21,22', 40, 30, BLOCK_70_X + 190, 400),
  cs('Stall No.\n23 & 24\n16 Sqm', '23,24', 40, 30, BLOCK_70_X + 230, 400),
  cs('Stall No.\n27 & 28\n18 Sqm', '27,28', 60, 30, BLOCK_70_X + 270, 370, 'premium'),
  cs('Stall No.\n25 & 26\n20 Sqm', '25,26', 60, 30, BLOCK_70_X + 270, 400, 'premium'),
  cs('Stall No.\n11 & 12\n18 Sqm', '11,12', 60, 30, BLOCK_70_X, 460, 'premium'),
  cs('Stall No. 10\n12 Sqm', '10', 40, 30, BLOCK_70_X + 60, 460),
  cs('Stall No. 09\n12 Sqm', '09', 40, 30, BLOCK_70_X + 100, 460),
  cs('Stall No. 08\n12 Sqm', '08', 40, 30, BLOCK_70_X + 140, 460),
  ...seq(7, 5, '12', 40, 30, BLOCK_70_X + 180, 460, 40, 0),
  cs('Stall No.\n01 & 02\n20 Sqm', '01,02', 50, 30, BLOCK_70_X + 380, 460, 'premium'),
];

const colorForStatus = (status?: StallStatus) => {
  if (status === 'premium') return '#0284c7';
  if (status === 'booked') return '#16a34a';
  if (status === 'hold') return '#eab308';
  return '#cbd5e1';
};

const normalizeStallNo = (value?: string) => String(value || '').match(/\d+/)?.[0] || '';

const isCurrentStall = (backendId: string, currentStallNo?: string) => {
  const current = normalizeStallNo(currentStallNo);
  if (!current) return false;
  return backendId.split(',').map((id) => id.trim().replace(/^0+/, '')).includes(current.replace(/^0+/, ''));
};

const stallLabelLines = (stall: StallShape, current: boolean, currentStallLabel: string) => {
  if (current && currentStallLabel) return ['STALL', currentStallLabel];
  const ids = stall.backendId.split(',').map((id) => id.trim()).filter(Boolean);
  if (ids.length <= 2) return [ids.join(', ')];
  return [ids.slice(0, 2).join(', '), ids.slice(2).join(', ')];
};

const fitFontSize = (stall: StallShape, lines: string[], current: boolean) => {
  if (current) return Math.min(8, Math.max(6, stall.w / 5));
  const longest = Math.max(...lines.map((line) => line.length), 1);
  const widthFit = (stall.w - 4) / (longest * 0.58);
  const heightFit = (stall.h - 4) / Math.max(lines.length, 1);
  return Math.max(4.5, Math.min(7, widthFit, heightFit));
};

export default function FloorPlanPreview({ currentStallNo }: { currentStallNo?: string }) {
  const currentStallLabel = normalizeStallNo(currentStallNo);

  return (
    <svg viewBox="70 40 1650 540" role="img" aria-label="Exhibition floor plan with your stall highlighted" className="w-full h-full">
      <defs>
        <pattern id="floor-grid" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.22" />
        </pattern>
        <pattern id="hatched-wall" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="#fff7ed" />
          <line x1="0" y1="0" x2="0" y2="8" stroke="#fdba74" strokeWidth="2" />
        </pattern>
      </defs>

      <rect x="70" y="40" width="1650" height="540" rx="8" fill="#ffffff" />
      <rect x="70" y="40" width="1650" height="540" fill="url(#floor-grid)" />

      <g fill="url(#hatched-wall)" stroke="#ea580c" strokeWidth="2">
        <rect x="88" y="88" width="436" height="4" />
        <rect x="520" y="88" width="4" height="76" />
        <rect x="520" y="160" width="44" height="4" />
        <rect x="560" y="88" width="4" height="76" />
        <rect x="560" y="88" width="634" height="4" />
        <rect x="1190" y="88" width="4" height="76" />
        <rect x="1190" y="160" width="44" height="4" />
        <rect x="1230" y="88" width="4" height="76" />
        <rect x="1230" y="88" width="250" height="4" />
        <rect x="88" y="498" width="436" height="4" />
        <rect x="520" y="410" width="4" height="92" />
        <rect x="520" y="410" width="44" height="4" />
        <rect x="560" y="410" width="4" height="92" />
        <rect x="560" y="498" width="634" height="4" />
        <rect x="1190" y="450" width="4" height="52" />
        <rect x="1190" y="450" width="480" height="4" />
        <rect x="88" y="88" width="4" height="414" />
        <rect x="1478" y="290" width="250" height="4" transform="rotate(56 1478 290)" />
      </g>

      <g fill="#000">
        {[90, 200, 300, 400, 500].map((py) => <rect key={`pl${py}`} x="84" y={py} width="12" height="12" />)}
        {[90, 250, 400, 500, 720, 890, 1040, 1190, 1340, 1490, 1590].map((px) => <rect key={`pt${px}`} x={px} y="84" width="12" height="12" />)}
        {[90, 250, 400, 500, 720, 890, 1040, 1190].map((px) => <rect key={`pb${px}`} x={px} y="496" width="12" height="12" />)}
      </g>

      <g>
        <rect x={1210 + HALL9_OFFSET + AISLE_GAP} y="200" width="120" height="160" fill="#fff" stroke="#000" strokeWidth="2" />
        <rect x={1330 + HALL9_OFFSET + AISLE_GAP} y="150" width="80" height="210" fill="#fff" stroke="#000" strokeWidth="2" />
        <rect x={1190 + HALL9_OFFSET + AISLE_GAP} y="360" width="260" height="80" fill="#fde047" stroke="#000" strokeWidth="2" />
        <rect x={1410 + HALL9_OFFSET + AISLE_GAP} y="150" width="220" height="290" fill="#fde047" stroke="#000" strokeWidth="2" />
        <text x={1520 + HALL9_OFFSET + AISLE_GAP} y="306" textAnchor="middle" fontSize="16" fontWeight="900" fill="#000">SEMINAR HALL</text>
        <text x={1320 + HALL9_OFFSET + AISLE_GAP} y="405" textAnchor="middle" fontSize="14" fontWeight="900" fill="#000">BUYER MEET</text>
      </g>

      {stalls.map((stall) => {
        const current = isCurrentStall(stall.backendId, currentStallNo);
        const fill = current ? '#10b981' : colorForStatus(stall.defaultStatus);
        const textFill = fill === '#cbd5e1' ? '#1e293b' : '#ffffff';
        const lines = stallLabelLines(stall, current, currentStallLabel);
        const fontSize = fitFontSize(stall, lines, current);
        const lineHeight = fontSize + 1.5;
        return (
          <g key={`${stall.backendId}-${stall.x}-${stall.y}`}>
            {current && (
              <rect
                x={stall.x - 5}
                y={stall.y - 5}
                width={stall.w + 10}
                height={stall.h + 10}
                rx="4"
                fill="#fef3c7"
                stroke="#f59e0b"
                strokeWidth="3"
              />
            )}
            <rect
              x={stall.x}
              y={stall.y}
              width={stall.w}
              height={stall.h}
              fill={fill}
              stroke={current ? '#065f46' : 'rgba(0,0,0,0.35)'}
              strokeWidth={current ? 4 : 1}
            />
            <text
              x={stall.x + stall.w / 2}
              y={stall.y + stall.h / 2 - ((lines.length - 1) * lineHeight) / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={fontSize}
              fontWeight={current ? 900 : 700}
              fill={textFill}
            >
              {lines.map((line, index) => (
                <tspan key={line + index} x={stall.x + stall.w / 2} dy={index === 0 ? 0 : lineHeight}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      <g fontWeight="900" fill="#111827">
        <text x="200" y="555" fontSize="50">HALL 10</text>
        <text x="800" y="555" fontSize="50">HALL 9</text>
        <text x="1260" y="555" fontSize="50">HALL 8</text>
      </g>

      <g fontSize="18" fontWeight="800" fill="#111827">
        <text x="280" y="62" textAnchor="middle">CARGO</text>
        <text x="280" y="80" textAnchor="middle">ENTRY/EXIT</text>
        <text x="1180" y="62" textAnchor="middle">CARGO</text>
        <text x="1180" y="80" textAnchor="middle">ENTRY/EXIT</text>
      </g>
    </svg>
  );
}
