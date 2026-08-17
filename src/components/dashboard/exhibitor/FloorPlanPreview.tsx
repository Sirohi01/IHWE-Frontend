import React from 'react';

/**
 * HALL NO. 12 — HALL LAYOUT
 * 9th International Health & Wellness Expo 2026, Pragati Maidan New Delhi.
 *
 * Geometry is traced 1:1 from "Hall No. 12.pdf" rasterised at 200 DPI, so every
 * coordinate below is in that pixel space. One grid square = 31px = 1 metre.
 */

const C = {
  green: '#00963F',
  orange: '#EF7C00',
  blue: '#009EE3',
  magenta: '#AD4482',
  yellow: '#FFED00',
  white: '#FFFFFF',
  pink: '#F6B1B5',
  gray: '#878786',
  purple: '#621563',
  purpleText: '#7A1C72',
  ink: '#1A1A18',
  grid: '#BFBFBF',
  hatch: '#F5A04A',
  red: '#E42B0E',
  highlight: '#10B981',
};

type Stall = {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  ids: string[];
  lines: string[];
  fs?: number;
  dy?: number;
};

const st = (
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  ids: string,
  lines: string[],
  extra: { fs?: number; dy?: number } = {},
): Stall => ({ x, y, w, h, fill, ids: ids.split(','), lines, ...extra });

/** Shorthand for the very common "Stall No. N / NN Sqm" two-line box. */
const s2 = (x: number, y: number, w: number, h: number, fill: string, no: string, sqm: string) =>
  st(x, y, w, h, fill, no, [`Stall No. ${no}`, `${sqm} Sqm`]);

/** Shorthand for the three-line variant used when the label is too wide for one line. */
const s3 = (x: number, y: number, w: number, h: number, fill: string, ids: string, mid: string, sqm: string) =>
  st(x, y, w, h, fill, ids, ['Stall No.', mid, `${sqm} Sqm`]);

const stalls: Stall[] = [
  // ── Row 1 (top) ─────────────────────────────────────────────────────────
  s3(854, 584, 92, 92, C.green, '180', '180', '09'),
  s3(947, 584, 92, 92, C.orange, '179,181', '179 (181)', '09'),
  s3(1041, 584, 123, 92, C.green, '178', '178', '12'),
  s3(1165, 584, 61, 92, C.green, '177', '177', '06'),
  s3(1227, 584, 61, 92, C.green, '177A', '177 A', '06'),
  s3(1289, 584, 62, 92, C.green, '176', '176', '06'),
  s3(1352, 584, 92, 92, C.blue, '175', '175', '09'),
  s3(1445, 584, 123, 92, C.magenta, '174', '174', '12'),
  s3(1569, 584, 92, 92, C.green, '173', '173', '09'),
  s3(1662, 584, 93, 92, C.yellow, '172', '172', '09'),
  s3(1756, 584, 92, 92, C.green, '171', '171', '09'),
  s3(1849, 584, 92, 92, C.magenta, '170', '170', '09'),

  // ── Row 2 ───────────────────────────────────────────────────────────────
  s3(854, 677, 123, 93, C.green, '159A', '159A', '12'),
  s3(978, 677, 92, 93, C.orange, '160,59', '160 (59)', '09'),
  s3(1071, 677, 93, 93, C.orange, '161,188', '161 (188)', '09'),
  s3(1165, 677, 92, 93, C.orange, '162,47', '162 (47)', '09'),
  s3(1258, 677, 92, 93, C.orange, '163,45', '163 (45)', '09'),
  s2(1351, 677, 93, 93, C.green, '164', '09'),
  s2(1445, 677, 92, 93, C.green, '165', '09'),
  s2(1538, 677, 92, 93, C.green, '166', '09'),
  s3(1631, 677, 92, 93, C.orange, '167,185', '167 (185)', '09'),
  s2(1724, 677, 93, 93, C.green, '168', '09'),
  s3(1818, 677, 123, 93, C.green, '169', '169', '12'),

  // ── Row 3 ───────────────────────────────────────────────────────────────
  s3(854, 833, 123, 92, C.white, '159', '159', '12'),
  s3(978, 833, 92, 92, C.orange, '158,182', '158 (182)', '09'),
  s3(1071, 833, 93, 92, C.orange, '157,184', '157 (184)', '09'),
  s2(1165, 833, 92, 92, C.green, '156', '09'),
  s2(1258, 833, 92, 92, C.green, '155', '09'),
  s2(1351, 833, 93, 92, C.green, '154', '09'),
  s3(1445, 833, 92, 92, C.orange, '153,53', '153 (53)', '09'),
  s2(1538, 833, 92, 92, C.green, '152', '09'),
  s2(1631, 833, 92, 92, C.green, '151', '09'),
  s2(1724, 833, 93, 92, C.green, '150', '09'),
  s2(1818, 833, 123, 92, C.yellow, '149', '12'),

  // ── Row 4 ───────────────────────────────────────────────────────────────
  s3(854, 926, 123, 92, C.white, '138', '138', '12'),
  s3(978, 926, 92, 92, C.orange, '139,183', '139 (183)', '09'),
  s2(1071, 926, 93, 92, C.green, '140', '09'),
  s2(1165, 926, 92, 92, C.green, '141', '09'),
  s2(1258, 926, 92, 92, C.green, '142', '09'),
  s2(1351, 926, 93, 92, C.green, '143', '09'),
  s2(1445, 926, 92, 92, C.green, '144', '09'),
  s2(1538, 926, 92, 92, C.green, '145', '09'),
  s2(1631, 926, 92, 92, C.green, '146', '09'),
  s2(1724, 926, 93, 92, C.green, '147', '09'),
  s2(1818, 926, 123, 92, C.green, '148', '12'),

  // ── Row 5 ───────────────────────────────────────────────────────────────
  st(854, 1112, 123, 185, C.white, '117,118,137', ['Stall No.', '117, 118 & 137', '24 Sqm']),
  s3(978, 1112, 92, 92, C.orange, '136A,186', '136A {186}', '09'),
  s2(1071, 1112, 93, 92, C.green, '136', '09'),
  s2(1165, 1112, 92, 92, C.green, '135', '09'),
  s2(1258, 1112, 92, 92, C.green, '134', '09'),
  s2(1351, 1112, 93, 92, C.green, '133', '09'),
  s2(1445, 1112, 92, 92, C.green, '132', '09'),
  s2(1538, 1112, 92, 92, C.green, '131', '09'),
  s2(1631, 1112, 92, 92, C.green, '130', '09'),
  s2(1724, 1112, 93, 92, C.green, '129', '09'),
  st(1818, 1112, 123, 185, C.green, '127,128', ['Stall No. 127 & 128', '24 Sqm']),

  // ── Row 6 ───────────────────────────────────────────────────────────────
  s3(978, 1205, 92, 92, C.orange, '118A,167', '118A {167}', '09'),
  s2(1071, 1205, 93, 92, C.green, '119', '09'),
  s2(1165, 1205, 92, 92, C.green, '120', '09'),
  s2(1258, 1205, 92, 92, C.green, '121', '09'),
  s2(1351, 1205, 93, 92, C.green, '122', '09'),
  s2(1445, 1205, 92, 92, C.green, '123', '09'),
  s2(1538, 1205, 92, 92, C.green, '124', '09'),
  s2(1631, 1205, 92, 92, C.green, '125', '09'),
  s2(1724, 1205, 93, 92, C.green, '126', '09'),

  // ── Row 7 ───────────────────────────────────────────────────────────────
  st(854, 1391, 185, 185, C.green, '96,97,116', ['Stall No.', '96, 97 & 116', '36 Sqm']),
  s3(1040, 1391, 93, 92, C.orange, '115A,187', '115A (187)', '09'),
  s2(1134, 1391, 92, 92, C.green, '115', '09'),
  s2(1227, 1391, 92, 92, C.green, '114', '09'),
  s2(1320, 1391, 92, 92, C.green, '113', '09'),
  s2(1413, 1391, 93, 92, C.green, '112', '09'),
  s2(1507, 1391, 92, 92, C.green, '111', '09'),
  s2(1600, 1391, 92, 92, C.green, '110', '09'),
  s2(1693, 1391, 93, 92, C.green, '109', '09'),
  st(1787, 1391, 154, 185, C.orange, '105,106,107,108', ['Stall No. 105, 106,107 &108', '(75-78) 30 Sqm'], { dy: -13 }),

  // ── Row 8 ───────────────────────────────────────────────────────────────
  s3(1040, 1484, 93, 92, C.orange, '97A,63', '97A (63)', '09'),
  s2(1134, 1484, 92, 92, C.green, '98', '09'),
  s2(1227, 1484, 92, 92, C.green, '99', '09'),
  s2(1320, 1484, 92, 92, C.green, '100', '09'),
  s2(1413, 1484, 93, 92, C.green, '101', '09'),
  s2(1507, 1484, 92, 92, C.green, '102', '09'),
  s2(1600, 1484, 92, 92, C.green, '103', '09'),
  s2(1693, 1484, 93, 92, C.green, '104', '09'),

  // ── Row 9 (along the bottom wall) ───────────────────────────────────────
  st(761, 1670, 186, 92, C.blue, '94,95', ['Stall No. 94 & 95', '18 Sqm']),
  st(948, 1670, 278, 92, C.blue, '92,93', ['Stall No. 92 & 93', '27 Sqm']),
  s2(1227, 1670, 93, 92, C.orange, '91', '09'),
  s2(1321, 1670, 123, 92, C.green, '90', '12'),
  st(1445, 1670, 248, 92, C.green, '87,88,89', ['Stall No. 87, 88 & 89', '24 Sqm']),
  st(1694, 1670, 123, 92, C.orange, '86,10', ['Stall No. 86 (10)', '12 Sqm']),
  st(1818, 1670, 186, 92, C.orange, '84,85', ['Stall No. 84, & 85', '18 Sqm']),

  // ── Left facility column ────────────────────────────────────────────────
  st(652, 959, 92, 90, C.blue, '182', ['Stall No. 182', '09 Sqm']),
  st(652, 1050, 92, 216, C.blue, '183,184,185', ['Stall No. 183, 184', '& 185', '21 Sqm'], { fs: 12 }),
];

/** Blocks that are drawn like stalls but carry their own type-setting. */
const PAPER_PRESENTATION = st(559, 833, 185, 89, C.magenta, '181', [
  'Paper Presentation',
  'Stall No. 181',
  '18 Sqm',
]);

const BLOCK_186 = st(559, 1267, 185, 185, C.yellow, '186,187,188,189', [
  'Stall No.',
  '186,187,188 & 189',
  '36 Sqm',
]);

/** Hatched masonry walls: [x, y, w, h] */
const WALLS: [number, number, number, number][] = [
  [326, 336, 19, 186], // top-left return
  [326, 505, 195, 17],
  [574, 505, 12, 109], // pantry enclosure, left
  [574, 596, 168, 18], // pantry enclosure, bottom
  [730, 491, 12, 185], // pantry enclosure, right
  [730, 491, 1304, 15], // main top wall
  [1071, 381, 198, 11], // washroom 1
  [1071, 381, 11, 94],
  [1258, 381, 11, 94],
  [1457, 381, 199, 11], // washroom 2
  [1457, 381, 11, 94],
  [1645, 381, 11, 94],
  [2035, 507, 16, 135], // right wall (broken by the entry/exit)
  [2035, 678, 16, 146],
  [2035, 860, 16, 155],
  [2035, 1051, 16, 155],
  [2035, 1241, 16, 190],
  [2035, 1597, 16, 196],
  [326, 1700, 19, 93], // bottom-left entry throat
  [727, 1700, 19, 93],
  [211, 1793, 157, 16], // bottom wall
  [716, 1793, 1318, 16],
];

/** Structural pillars: [x, y, w, h] */
const PILLARS: [number, number, number, number][] = [
  [877, 475, 16, 32],
  [1070, 475, 16, 32],
  [1262, 475, 17, 32],
  [1455, 475, 18, 32],
  [1649, 475, 16, 32],
  [1842, 475, 16, 32],
  [2034, 472, 33, 35],
  [2034, 642, 33, 36],
  [2034, 824, 33, 36],
  [2034, 1015, 33, 36],
  [2034, 1206, 33, 35],
  [2034, 1792, 33, 36],
  [325, 868, 25, 16],
  [325, 1059, 25, 16],
  [325, 1250, 25, 16],
  [325, 1441, 25, 16],
  [325, 1616, 47, 17],
  [325, 1684, 47, 16],
  [698, 676, 47, 17],
  [698, 1616, 47, 17],
  [698, 1684, 47, 16],
  [719, 868, 26, 16],
  [719, 1059, 26, 16],
  [719, 1250, 26, 17],
  [719, 1441, 26, 16],
  [700, 1794, 16, 31],
  [877, 1794, 16, 31],
  [1070, 1794, 16, 31],
  [1262, 1794, 17, 31],
  [1456, 1794, 15, 31],
  [1648, 1794, 16, 31],
  [1841, 1794, 17, 31],
];

/** Yellow hall-boundary marking lines: [x, y, w, h] */
const YELLOW_LINES: [number, number, number, number][] = [
  [310, 523, 3, 368],
  [310, 895, 3, 588],
  [310, 1484, 245, 3],
  [310, 1546, 3, 247],
  [556, 615, 3, 1075],
];

const VIP_TABLES: [number, number][] = [
  [610, 733],
  [639, 733],
  [668, 733],
  [610, 775],
  [639, 775],
  [668, 775],
];

const VIP_SEAT_GROUPS: { x: number; y: number; w: number; h: number; cols: number; rows: number }[] = [
  { x: 593, y: 696, w: 56, h: 27, cols: 3, rows: 1 },
  { x: 651, y: 696, w: 56, h: 27, cols: 3, rows: 1 },
  { x: 593, y: 802, w: 56, h: 27, cols: 3, rows: 1 },
  { x: 651, y: 802, w: 56, h: 27, cols: 3, rows: 1 },
  { x: 558, y: 733, w: 27, h: 56, cols: 1, rows: 3 },
  { x: 715, y: 733, w: 27, h: 56, cols: 1, rows: 3 },
];

const SEAT_STRIP_Y = [970, 995, 1020, 1046, 1071, 1096, 1119, 1144, 1170, 1195];

const normalise = (v?: string) => String(v || '').match(/\d+[A-Za-z]?/)?.[0] || '';

const strip = (v: string) => v.trim().replace(/^0+/, '').toUpperCase();

const isCurrent = (ids: string[], currentStallNo?: string | string[]) => {
  const currentList = (Array.isArray(currentStallNo) ? currentStallNo : [currentStallNo])
    .map(normalise)
    .filter(Boolean)
    .map(strip);
  if (!currentList.length) return false;
  const stripped = ids.map(strip);
  return currentList.some((current) => stripped.includes(current));
};

function StallBox({ stall, current }: { stall: Stall; current: boolean }) {
  const fill = current ? C.highlight : stall.fill;
  const fs = stall.fs ?? 11;
  const pitch = fs * 1.14;
  const cx = stall.x + stall.w / 2;
  const cy = stall.y + stall.h / 2 + (stall.dy ?? 0);
  const textFill = current ? '#FFFFFF' : C.ink;

  return (
    <g>
      {current && (
        <rect
          x={stall.x - 6}
          y={stall.y - 6}
          width={stall.w + 12}
          height={stall.h + 12}
          fill="#FEF3C7"
          stroke="#F59E0B"
          strokeWidth={5}
        />
      )}
      <rect
        x={stall.x}
        y={stall.y}
        width={stall.w}
        height={stall.h}
        fill={fill}
        stroke={current ? '#065F46' : '#1A1A18'}
        strokeWidth={current ? 4 : 1.4}
      />
      <text
        x={cx}
        textAnchor="middle"
        fontSize={fs}
        fontWeight={current ? 700 : 400}
        fill={textFill}
        fontFamily="Arial, Helvetica, sans-serif"
      >
        {stall.lines.map((line, i) => (
          <tspan key={line + i} x={cx} y={cy + (i - (stall.lines.length - 1) / 2) * pitch + 1.5}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export default function FloorPlanPreview({ currentStallNo }: { currentStallNo?: string | string[] }) {
  const allBlocks = [...stalls, PAPER_PRESENTATION];

  return (
    <svg
      viewBox="100 305 2110 1615"
      role="img"
      aria-label="Hall No. 12 exhibition floor plan"
      className="w-full h-full"
    >
      <defs>
        <pattern id="h12-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="7" height="7" fill="#FFFFFF" />
          <line x1="0" y1="0" x2="0" y2="7" stroke={C.hatch} strokeWidth="2.4" />
        </pattern>
        <pattern id="h12-grid" x="324" y="521" width="31" height="31" patternUnits="userSpaceOnUse">
          <path d="M31 0 H0 V31" fill="none" stroke={C.grid} strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="100" y="305" width="2110" height="1615" fill="#FFFFFF" />

      {/* ── Floor grid ─────────────────────────────────────────────────── */}
      <rect x="324" y="521" width="1710" height="1271" fill="url(#h12-grid)" />
      <rect x="324" y="521" width="1710" height="1271" fill="none" stroke={C.grid} strokeWidth="1" />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <text
        x="449"
        y="424"
        fontSize="38"
        fontWeight="700"
        fill={C.ink}
        fontFamily="Arial, Helvetica, sans-serif"
        textLength="440"
        lengthAdjust="spacingAndGlyphs"
      >
        21 TO 23 AUGUST 2026
      </text>
      <text
        x="448"
        y="464"
        fontSize="30"
        fontWeight="700"
        fill={C.ink}
        fontFamily="Arial, Helvetica, sans-serif"
        textLength="437"
        lengthAdjust="spacingAndGlyphs"
      >
        Pragati Maidan New Delhi, Bharat
      </text>

      {/* Survey break-line at the top-left corner */}
      <polyline
        points="240,322 300,322 315,337 330,317 345,322 385,322"
        fill="none"
        stroke={C.ink}
        strokeWidth="2"
      />

      {/* ── Walls ──────────────────────────────────────────────────────── */}
      <g fill="url(#h12-hatch)" stroke={C.hatch} strokeWidth="1.5">
        {WALLS.map(([x, y, w, h], i) => (
          <rect key={`w${i}`} x={x} y={y} width={w} height={h} />
        ))}
      </g>

      {/* ── Washroom doors ─────────────────────────────────────────────── */}
      <g fill="none" stroke={C.purple} strokeWidth="3">
        <path d="M1258 400 L1225 400 A 33 55 0 0 1 1258 455" />
        <path d="M1468 400 L1501 400 A 33 55 0 0 0 1468 455" />
      </g>
      <g fill={C.orange} stroke="none">
        <rect x="1258" y="400" width="11" height="58" />
        <rect x="1457" y="400" width="11" height="58" />
      </g>
      <g
        fill={C.purple}
        fontSize="24"
        fontWeight="400"
        fontFamily="Arial, Helvetica, sans-serif"
        textAnchor="middle"
      >
        <text x="1165" y="440" textLength="150" lengthAdjust="spacingAndGlyphs">
          WASHROOM
        </text>
        <text x="1552" y="440" textLength="150" lengthAdjust="spacingAndGlyphs">
          WASHROOM
        </text>
      </g>

      {/* ── Yellow hall boundary lines ─────────────────────────────────── */}
      <g fill={C.yellow}>
        {YELLOW_LINES.map(([x, y, w, h], i) => (
          <rect key={`y${i}`} x={x} y={y} width={w} height={h} />
        ))}
      </g>

      {/* ── Pantry ─────────────────────────────────────────────────────── */}
      <g>
        <rect x="559" y="615" width="169" height="79" fill={C.blue} stroke={C.ink} strokeWidth="1.4" />
        <path d="M574 633 H598 V668 H698 V692 H574 Z" fill={C.gray} />
        <ellipse cx="607" cy="640" rx="9" ry="16" fill="#6E6E6D" stroke={C.ink} strokeWidth="1" />
        <text
          x="686"
          y="652"
          fontSize="19"
          fill={C.ink}
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="middle"
          textLength="83"
          lengthAdjust="spacingAndGlyphs"
        >
          PANTRY
        </text>
      </g>

      {/* ── VIP Zone ───────────────────────────────────────────────────── */}
      <g>
        <rect x="559" y="694" width="185" height="136" fill={C.blue} stroke={C.ink} strokeWidth="1.4" />
        <rect x="574" y="693" width="168" height="3" fill={C.yellow} />
        <rect x="559" y="829" width="185" height="3" fill={C.yellow} />
        {VIP_SEAT_GROUPS.map((g, gi) => (
          <g key={`vg${gi}`}>
            <rect x={g.x} y={g.y} width={g.w} height={g.h} fill={C.white} stroke={C.ink} strokeWidth="1.4" />
            {Array.from({ length: g.cols * g.rows }).map((_, i) => {
              const col = i % g.cols;
              const row = Math.floor(i / g.cols);
              const cw = (g.w - 8) / g.cols;
              const ch = (g.h - 8) / g.rows;
              return (
                <rect
                  key={`vs${gi}-${i}`}
                  x={g.x + 4 + col * cw}
                  y={g.y + 4 + row * ch}
                  width={cw - 1}
                  height={ch - 1}
                  fill={C.white}
                  stroke={C.ink}
                  strokeWidth="1"
                />
              );
            })}
          </g>
        ))}
        {VIP_TABLES.map(([x, y], i) => (
          <rect key={`vt${i}`} x={x} y={y} width={22} height={15} fill={C.yellow} stroke={C.ink} strokeWidth="1" />
        ))}
        <text
          x="651"
          y="772"
          fontSize="22"
          fill={C.ink}
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="middle"
        >
          VIP Zone
        </text>
      </g>

      {/* ── Seating strip beside Stalls 183–185 ────────────────────────── */}
      <g>
        <rect x="559" y="957" width="70" height="287" fill={C.magenta} stroke={C.ink} strokeWidth="1.4" />
        <rect x="630" y="957" width="21" height="287" fill={C.pink} />
        <rect x="559" y="1245" width="92" height="21" fill={C.pink} />
        {SEAT_STRIP_Y.map((y) => (
          <rect key={`ss${y}`} x={609} y={y} width={14} height={14} fill={C.gray} stroke={C.ink} strokeWidth="0.8" />
        ))}
        {[564, 585, 605].map((x) => (
          <rect key={`sb${x}`} x={x} y={1220} width={14} height={14} fill={C.gray} stroke={C.ink} strokeWidth="0.8" />
        ))}
      </g>

      {/* ── Stalls ─────────────────────────────────────────────────────── */}
      {allBlocks.map((stall) => (
        <StallBox
          key={`${stall.ids.join('-')}-${stall.x}-${stall.y}`}
          stall={stall}
          current={isCurrent(stall.ids, currentStallNo)}
        />
      ))}

      {/* 186–189 carries a larger type size than the rest */}
      <g>
        <rect
          x={BLOCK_186.x}
          y={BLOCK_186.y}
          width={BLOCK_186.w}
          height={BLOCK_186.h}
          fill={isCurrent(BLOCK_186.ids, currentStallNo) ? C.highlight : C.yellow}
          stroke={C.ink}
          strokeWidth="1.4"
        />
        <text
          x="651"
          textAnchor="middle"
          fontSize="17"
          fill={C.ink}
          fontFamily="Arial, Helvetica, sans-serif"
        >
          <tspan x="651" y="1347">Stall No.</tspan>
          <tspan x="651" y="1366">186,187,188 &amp; 189</tspan>
          <tspan x="651" y="1385">36 Sqm</tspan>
        </text>
      </g>

      {/* ── Pillars ────────────────────────────────────────────────────── */}
      <g fill="#000000">
        {PILLARS.map(([x, y, w, h], i) => (
          <rect key={`p${i}`} x={x} y={y} width={w} height={h} />
        ))}
      </g>

      {/* ── Services on the walls ──────────────────────────────────────── */}
      <g fontFamily="Arial, Helvetica, sans-serif" fontSize="5" textAnchor="middle">
        <rect x="737" y="503" width="30" height="12" fill={C.blue} stroke={C.ink} strokeWidth="0.8" />
        <text x="752" y="511" fill={C.ink}>
          HOSE REEL
        </text>
        <rect x="1841" y="507" width="30" height="13" fill={C.blue} stroke={C.ink} strokeWidth="0.8" />
        <text x="1856" y="515" fill={C.ink}>
          HOSE REEL
        </text>
        <rect x="1591" y="507" width="39" height="14" fill={C.yellow} stroke={C.ink} strokeWidth="0.8" />
        <text x="1610" y="513" fill={C.ink}>
          ELECTRICAL
        </text>
        <text x="1610" y="519" fill={C.ink}>
          PANEL
        </text>
      </g>
      <g fill={C.red}>
        <rect x="1262" y="500" width="18" height="12" />
        <rect x="2000" y="830" width="33" height="28" />
      </g>
      <rect x="549" y="500" width="16" height="17" fill="#6B6B6B" />
      <g fill={C.purple}>
        <rect x="746" y="596" width="26" height="23" rx="2" />
        <rect x="2012" y="1011" width="20" height="43" rx="2" />
        <rect x="2009" y="1207" width="24" height="31" rx="2" />
        <rect x="1097" y="1764" width="43" height="20" rx="2" />
      </g>

      {/* Hose-reel drums near the bottom-left registration */}
      <g fill="none" stroke="#2FA84F" strokeWidth="2.5">
        <circle cx="717" cy="1715" r="13" />
        <circle cx="717" cy="1715" r="7" />
        <circle cx="759" cy="1776" r="13" />
        <circle cx="759" cy="1776" r="7" />
      </g>

      {/* ── Shutter lines across the entry throats ─────────────────────── */}
      <g fill={C.blue}>
        <rect x="345" y="1691" width="382" height="4" />
        <rect x="554" y="1801" width="145" height="4" />
      </g>

      {/* ── Registration counters ──────────────────────────────────────── */}
      <g>
        <rect x="668" y="1732" width="19" height="61" fill={C.yellow} stroke={C.ink} strokeWidth="1" />
        <rect x="688" y="1732" width="40" height="61" fill={C.blue} stroke={C.ink} strokeWidth="1" />
        <text
          x="677"
          y="1763"
          fontSize="9"
          fill={C.ink}
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="middle"
          transform="rotate(-90 677 1763)"
        >
          REGISTRATION
        </text>

        <rect x="2054" y="1627" width="61" height="165" fill={C.blue} stroke={C.ink} strokeWidth="1" />
        <rect x="2115" y="1628" width="31" height="164" fill={C.yellow} stroke={C.ink} strokeWidth="1" />
        <text
          x="2131"
          y="1710"
          fontSize="20"
          fill={C.ink}
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="middle"
          transform="rotate(-90 2131 1710)"
        >
          REGISTRATION
        </text>
      </g>

      {/* ── Circulation arrows ─────────────────────────────────────────── */}
      <g fill={C.purple}>
        {/* Water Expo link */}
        <rect x="454" y="1530" width="12" height="161" />
        <rect x="385" y="1524" width="80" height="12" />
        <polygon points="349,1530 392,1508 392,1552" />
        {/* Bottom entry / exit */}
        <polygon points="459,1862 459,1802 446,1802 478,1764 511,1802 498,1802 498,1862" />
        <polygon points="522,1764 522,1826 510,1826 541,1862 573,1826 561,1826 561,1764" />
        {/* Right entry / exit */}
        <polygon points="2013,1461 2065,1461 2065,1445 2110,1477 2065,1509 2065,1493 2013,1493" />
        <polygon points="2110,1530 2058,1530 2058,1514 2013,1546 2058,1578 2058,1562 2110,1562" />
      </g>

      {/* ── Labels ─────────────────────────────────────────────────────── */}
      <g fill={C.purpleText} fontFamily="Arial, Helvetica, sans-serif" fontWeight="700">
        <text x="209" y="1520" fontSize="28" textAnchor="middle">
          WATER EXPO
        </text>
        <text x="209" y="1551" fontSize="28" textAnchor="middle">
          ENTRY
        </text>
        <text x="511" y="1903" fontSize="25" textAnchor="middle">
          ENTRY/EXIT
        </text>
        <text x="2144" y="1510" fontSize="25" textAnchor="middle" transform="rotate(-90 2144 1510)">
          ENTRY/EXIT
        </text>
      </g>

      <text
        x="1711"
        y="1878"
        fontSize="30"
        fontWeight="700"
        fill={C.ink}
        fontFamily="Arial, Helvetica, sans-serif"
        textLength="434"
        lengthAdjust="spacingAndGlyphs"
      >
        HALL NO. 12, HALL LAYOUT
      </text>
    </svg>
  );
}
