import React from 'react';
type Cell = {
  num: string;
  sqm: number;
  color: string;
  alt?: string;
  ids?: string[];
  label?: string;
  wOverride?: number;
};

type StallShape = {
  num: string;
  alt?: string;
  label?: string;
  sqmText: string;
  color: string;
  w: number;
  h: number;
  x: number;
  y: number;
  ids: string[];
};

const COLORS = {
  green: '#00963F',
  orange: '#EF7C00',
  blue: '#009EE3',
  magenta: '#AD4482',
  yellow: '#FFED00',
  white: '#FFFFFF',
};

const wFor = (sqm: number, h: number) => Math.round((sqm * 100) / h);

const layoutRow = (cells: Cell[], x0: number, y: number, h: number): StallShape[] => {
  let x = x0;
  const out: StallShape[] = [];
  for (const c of cells) {
    const w = c.wOverride ?? wFor(c.sqm, h);
    out.push({
      num: c.num,
      alt: c.alt,
      label: c.label,
      sqmText: `${c.sqm} Sqm`,
      color: c.color,
      w,
      h,
      x,
      y,
      ids: c.ids ?? [c.num],
    });
    x += w;
  }
  return out;
};

const { green, orange, blue, magenta, yellow, white } = COLORS;

/* ─── Main grid, rows 1-4 (x0 = 330) ───────────────────────────────────── */
const row1 = layoutRow(
  [
    { num: '180', sqm: 9, color: green },
    { num: '179', alt: '(181)', sqm: 9, color: orange },
    { num: '178', sqm: 12, color: green },
    { num: '177', sqm: 6, color: green },
    { num: '177 A', sqm: 6, color: green, ids: ['177A'] },
    { num: '176', sqm: 6, color: green },
    { num: '175', sqm: 9, color: blue },
    { num: '174', sqm: 12, color: magenta },
    { num: '173', sqm: 9, color: green },
    { num: '172', sqm: 9, color: yellow },
    { num: '171', sqm: 9, color: green },
    { num: '170', sqm: 9, color: magenta },
  ],
  330, 110, 30,
);

const row2 = layoutRow(
  [
    { num: '159 A', sqm: 12, color: green, ids: ['159A'] },
    { num: '160', alt: '(59)', sqm: 9, color: orange },
    { num: '161', alt: '(188)', sqm: 9, color: orange },
    { num: '162', alt: '(47)', sqm: 9, color: orange },
    { num: '163', alt: '(45)', sqm: 9, color: orange },
    { num: '164', sqm: 9, color: green },
    { num: '165', sqm: 9, color: green },
    { num: '166', sqm: 9, color: green },
    { num: '167', alt: '(185)', sqm: 9, color: orange },
    { num: '168', sqm: 9, color: green },
    { num: '169', sqm: 12, color: green },
  ],
  330, 145, 30,
);

const row3 = layoutRow(
  [
    { num: '159', sqm: 12, color: white },
    { num: '158', alt: '(182)', sqm: 9, color: orange },
    { num: '157', alt: '(184)', sqm: 9, color: orange },
    { num: '156', sqm: 9, color: green },
    { num: '155', sqm: 9, color: green },
    { num: '154', sqm: 9, color: green },
    { num: '153', alt: '(53)', sqm: 9, color: orange },
    { num: '152', sqm: 9, color: green },
    { num: '151', sqm: 9, color: green },
    { num: '150', sqm: 9, color: green },
    { num: '149', sqm: 12, color: yellow },
  ],
  330, 195, 30,
);

const row4 = layoutRow(
  [
    { num: '138', sqm: 12, color: white },
    { num: '139', alt: '(183)', sqm: 9, color: orange },
    { num: '140', sqm: 9, color: green },
    { num: '141', sqm: 9, color: green },
    { num: '142', sqm: 9, color: green },
    { num: '143', sqm: 9, color: green },
    { num: '144', sqm: 9, color: green },
    { num: '145', sqm: 9, color: green },
    { num: '146', sqm: 9, color: green },
    { num: '147', sqm: 9, color: green },
    { num: '148', sqm: 12, color: green },
  ],
  330, 230, 30,
);

/* ─── Row 5 (double-height, two sub-rows bracketed by combo stalls) ───── */
const row5Combo1: StallShape = {
  num: '117, 118 & 137', sqmText: '24 Sqm', color: white, w: wFor(24, 60), h: 60, x: 330, y: 280,
  ids: ['117', '118', '137'],
};
const row5Top = layoutRow(
  [
    { num: '136 A', alt: '{186}', sqm: 9, color: orange, ids: ['136A'] },
    { num: '136', sqm: 9, color: green },
    { num: '135', sqm: 9, color: green },
    { num: '134', sqm: 9, color: green },
    { num: '133', sqm: 9, color: green },
    { num: '132', sqm: 9, color: green },
    { num: '131', sqm: 9, color: green },
    { num: '130', sqm: 9, color: green },
    { num: '129', sqm: 9, color: green },
  ],
  330 + row5Combo1.w, 280, 30,
);
const row5Bottom = layoutRow(
  [
    { num: '118 A', alt: '{167}', sqm: 9, color: orange, ids: ['118A'] },
    { num: '119', sqm: 9, color: green },
    { num: '120', sqm: 9, color: green },
    { num: '121', sqm: 9, color: green },
    { num: '122', sqm: 9, color: green },
    { num: '123', sqm: 9, color: green },
    { num: '124', sqm: 9, color: green },
    { num: '125', sqm: 9, color: green },
    { num: '126', sqm: 9, color: green },
  ],
  330 + row5Combo1.w, 310, 30,
);
const row5Combo2: StallShape = {
  num: '127 & 128', sqmText: '24 Sqm', color: green, w: wFor(24, 60), h: 60,
  x: 330 + row5Combo1.w + row5Top.reduce((s, c) => s + c.w, 0), y: 280,
  ids: ['127', '128'],
};

/* ─── Row 6 (double-height, two sub-rows bracketed by combo stalls) ───── */
const row6Combo1: StallShape = {
  num: '96, 97 & 116', sqmText: '36 Sqm', color: green, w: wFor(36, 60), h: 60, x: 330, y: 345,
  ids: ['96', '97', '116'],
};
const row6Top = layoutRow(
  [
    { num: '115 A', alt: '(187)', sqm: 9, color: orange, ids: ['115A'] },
    { num: '115', sqm: 9, color: green },
    { num: '114', sqm: 9, color: green },
    { num: '113', sqm: 9, color: green },
    { num: '112', sqm: 9, color: green },
    { num: '111', sqm: 9, color: green },
    { num: '110', sqm: 9, color: green },
    { num: '109', sqm: 9, color: green },
  ],
  330 + row6Combo1.w, 345, 30,
);
const row6Bottom = layoutRow(
  [
    { num: '97 A', alt: '(63)', sqm: 9, color: orange, ids: ['97A'] },
    { num: '98', sqm: 9, color: green },
    { num: '99', sqm: 9, color: green },
    { num: '100', sqm: 9, color: green },
    { num: '101', sqm: 9, color: green },
    { num: '102', sqm: 9, color: green },
    { num: '103', sqm: 9, color: green },
    { num: '104', sqm: 9, color: green },
  ],
  330 + row6Combo1.w, 375, 30,
);
const row6Combo2: StallShape = {
  num: '105, 106, 107 & 108', alt: '(75-78)', sqmText: '30 Sqm', color: orange, w: wFor(30, 60), h: 60,
  x: 330 + row6Combo1.w + row6Top.reduce((s, c) => s + c.w, 0), y: 345,
  ids: ['105', '106', '107', '108'],
};

/* ─── Bottom strip (row 7) ─────────────────────────────────────────────── */
const row7 = layoutRow(
  [
    { num: '94 & 95', sqm: 18, color: blue, ids: ['94', '95'] },
    { num: '92 & 93', sqm: 27, color: blue, ids: ['92', '93'] },
    { num: '91', sqm: 9, color: orange },
    { num: '90', sqm: 12, color: green },
    { num: '87, 88 & 89', sqm: 24, color: green, ids: ['87', '88', '89'] },
    { num: '86', alt: '(10)', sqm: 12, color: orange },
    { num: '84 & 85', sqm: 18, color: orange, ids: ['84', '85'] },
  ],
  330, 425, 30,
);

/* ─── Left column (Pantry / VIP Zone / Paper Presentation / stalls) ───── */
const leftColX = 100;
const leftColW = 150;
const leftStalls: StallShape[] = [
  { num: '181', label: 'Paper Presentation', sqmText: '18 Sqm', color: magenta, w: leftColW, h: 40, x: leftColX, y: 256, ids: ['181'] },
  { num: '182', sqmText: '09 Sqm', color: blue, w: 102, h: 45, x: leftColX + 48, y: 299, ids: ['182'] },
  { num: '183, 184 & 185', sqmText: '21 Sqm', color: blue, w: 102, h: 65, x: leftColX + 48, y: 347, ids: ['183', '184', '185'] },
  { num: '186, 187, 188 & 189', sqmText: '36 Sqm', color: yellow, w: leftColW, h: 75, x: leftColX, y: 415, ids: ['186', '187', '188', '189'] },
];

const allStalls: StallShape[] = [
  ...row1, ...row2, ...row3, ...row4,
  row5Combo1, ...row5Top, ...row5Bottom, row5Combo2,
  row6Combo1, ...row6Top, ...row6Bottom, row6Combo2,
  ...row7,
  ...leftStalls,
];

const normalizeStallNo = (value?: string) => {
  const raw = String(value || '').trim();
  if (!raw) return '';
  // Real stall values often arrive as "Hall 12 - 149A"; prefer the code after
  // a trailing dash (same convention StallInformation.tsx's getStallParts uses),
  // falling back to the whole trimmed value for plain inputs like "149A".
  const dashMatch = raw.match(/[–-]\s*([a-z0-9]+)\s*$/i);
  const token = dashMatch ? dashMatch[1] : raw;
  return token.toUpperCase().replace(/^0+(?=\d)/, '');
};

const isCurrentStall = (ids: string[], currentStallNo?: string) => {
  const current = normalizeStallNo(currentStallNo);
  if (!current) return false;
  return ids.some((id) => normalizeStallNo(id) === current);
};

const fitFontSize = (w: number, h: number, lines: string[]) => {
  const longest = Math.max(...lines.map((line) => line.length), 1);
  const widthFit = (w - 3) / (longest * 0.58);
  const heightFit = (h - 3) / Math.max(lines.length, 1);
  return Math.max(3.6, Math.min(6.5, widthFit, heightFit));
};

function StallRect({ stall, current }: { stall: StallShape; current: boolean }) {
  const lines = current
    ? ['YOUR', 'STALL', stall.num]
    : stall.label
      ? [stall.label, stall.num, stall.sqmText]
      : ['Stall No.', stall.num + (stall.alt ? ` ${stall.alt}` : ''), stall.sqmText];
  const fill = current ? '#10b981' : stall.color;
  const textFill = fill === '#FFFFFF' ? '#1e293b' : '#111827';
  const fontSize = current ? Math.min(7, Math.max(5, stall.w / 6)) : fitFontSize(stall.w, stall.h, lines);
  const lineHeight = fontSize + 1.1;

  return (
    <g>
      {current && (
        <rect
          x={stall.x - 4} y={stall.y - 4} width={stall.w + 8} height={stall.h + 8}
          rx="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5"
        />
      )}
      <rect
        x={stall.x} y={stall.y} width={stall.w} height={stall.h}
        fill={fill}
        stroke={current ? '#065f46' : 'rgba(0,0,0,0.35)'}
        strokeWidth={current ? 3 : 0.75}
      />
      <text
        x={stall.x + stall.w / 2}
        y={stall.y + stall.h / 2 - ((lines.length - 1) * lineHeight) / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight={current ? 900 : 700}
        fill={current ? '#ffffff' : textFill}
      >
        {lines.map((line, i) => (
          <tspan key={i} x={stall.x + stall.w / 2} dy={i === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export default function FloorPlanPreview({ currentStallNo }: { currentStallNo?: string }) {
  return (
    <svg viewBox="30 60 800 570" role="img" aria-label="Hall No. 12 floor layout with your stall highlighted" className="w-full h-full">
      <defs>
        <pattern id="h12-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.4" opacity="0.35" />
        </pattern>
        <pattern id="h12-wall" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#fef2e7" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#eb9a56" strokeWidth="2" />
        </pattern>
      </defs>

      {/* floor */}
      <rect x="40" y="95" width="765" height="470" fill="#ffffff" />
      <rect x="40" y="95" width="765" height="470" fill="url(#h12-grid)" />

      {/* outer wall (hatched), matching the hall outline incl. cargo-door notch top-left */}
      <g fill="url(#h12-wall)" stroke="#ea7f2e" strokeWidth="1.5">
        <rect x="40" y="95" width="765" height="5" />
        <rect x="40" y="95" width="5" height="470" />
        <rect x="800" y="95" width="5" height="365" />
        <rect x="40" y="560" width="765" height="5" />
        <rect x="60" y="70" width="5" height="30" />
        <rect x="60" y="70" width="40" height="5" />
      </g>
      {/* cargo notch chevron */}
      <path d="M 52 76 L 62 68" fill="none" stroke="#334155" strokeWidth="1.2" />

      {/* washroom doors on the top wall */}
      {[
        { x: 470, label: 'WASHROOM' },
        { x: 605, label: 'WASHROOM' },
      ].map((wr, i) => (
        <g key={i}>
          <path d={`M ${wr.x} 95 L ${wr.x} 65 L ${wr.x + 65} 65 L ${wr.x + 65} 95`} fill="none" stroke="#eb9a56" strokeWidth="3" />
          <path d={`M ${wr.x + 40} 95 A 15 15 0 0 0 ${wr.x + 55} 80`} fill="none" stroke="#6d28d9" strokeWidth="1.2" />
          <text x={wr.x + 20} y="80" fontSize="9" fontWeight="700" fill="#6d28d9">{wr.label}</text>
        </g>
      ))}

      {/* structural pillars along the walls */}
      <g fill="#111827">
        {[130, 200, 280, 360, 440, 520, 600, 680, 760].map((px) => <rect key={`pt${px}`} x={px} y="93" width="9" height="9" />)}
        {[60, 130, 200, 280, 360, 440, 520].map((py) => <rect key={`pl${py}`} x={36} y={py} width="9" height="9" />)}
        {[200, 350, 420].map((py) => <rect key={`pr${py}`} x={796} y={py} width="9" height="9" />)}
        {[130, 250, 380, 480, 630, 700, 770].map((px) => <rect key={`pb${px}`} x={px} y="557" width="9" height="9" />)}
      </g>

      {/* Pantry + VIP Zone (non-bookable service rooms above stall 181) */}
      <g>
        <rect x={leftColX} y="110" width={leftColW} height="45" fill={blue} stroke="#0284c7" strokeWidth="1" />
        <text x={leftColX + leftColW / 2} y="136" textAnchor="middle" fontSize="9" fontWeight="800" fill="#111827">PANTRY</text>
        <rect x={leftColX} y="158" width={leftColW} height="95" fill={blue} stroke="#0284c7" strokeWidth="1" />
        <text x={leftColX + leftColW / 2} y="209" textAnchor="middle" fontSize="10" fontWeight="800" fill="#111827">VIP Zone</text>
      </g>

      {/* decorative seating strip alongside stalls 182 / 183-185 */}
      <rect x={leftColX} y="299" width="46" height="113" fill={magenta} stroke="#8a3568" strokeWidth="1" />
      <rect x={leftColX + 34} y="299" width="12" height="113" fill="#f6b1b5" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={leftColX + 10} y={306 + i * 10.5} width="10" height="6" fill="#9ca3af" />
      ))}

      {/* Water Expo Entry + bottom-left Entry/Exit + Registration */}
      <g fill="#621563">
        <path d="M 100 500 L 80 500 L 80 490 L 65 505 L 80 520 L 80 510 L 100 510 Z" />
        <text x="30" y="495" fontSize="10" fontWeight="800">WATER EXPO</text>
        <text x="55" y="507" fontSize="10" fontWeight="800">ENTRY</text>

        <path d="M 150 545 L 150 590 L 142 590 L 158 605 L 174 590 L 166 590 L 166 545 Z" />
        <path d="M 190 605 L 190 560 L 182 560 L 198 545 L 214 560 L 206 560 L 206 605 Z" />
        <text x="140" y="618" fontSize="10" fontWeight="800">ENTRY/EXIT</text>
      </g>
      <g>
        <rect x="222" y="518" width="26" height="42" fill={blue} stroke="#0284c7" strokeWidth="1" />
        <rect x="248" y="518" width="13" height="42" fill={yellow} stroke="#c7a600" strokeWidth="1" />
        <text
          x="254.5" y="539" textAnchor="middle" dominantBaseline="middle"
          fontSize="5" fontWeight="800" fill="#111827" transform="rotate(-90 254.5 539)"
        >
          REGISTRATION
        </text>
      </g>

      {/* right-side mid-hall entry/exit marker */}
      <g fill="#621563">
        <rect x="785" y="278" width="10" height="24" fill="none" stroke="#621563" strokeWidth="1.5" />
      </g>

      {/* right-side bottom Entry/Exit + Registration */}
      <g fill="#621563">
        <path d="M 728 435 L 773 435 L 773 427 L 793 443 L 773 459 L 773 451 L 728 451 Z" />
        <text
          x="810" y="443" textAnchor="middle" dominantBaseline="middle"
          fontSize="9" fontWeight="800" transform="rotate(90 810 443)"
        >
          ENTRY/EXIT
        </text>
      </g>
      <g>
        <rect x="738" y="463" width="26" height="55" fill={blue} stroke="#0284c7" strokeWidth="1" />
        <rect x="764" y="463" width="14" height="55" fill={yellow} stroke="#c7a600" strokeWidth="1" />
        <text
          x="771" y="490.5" textAnchor="middle" dominantBaseline="middle"
          fontSize="6" fontWeight="800" fill="#111827" transform="rotate(-90 771 490.5)"
        >
          REGISTRATION
        </text>
      </g>

      {allStalls.map((stall, i) => (
        <StallRect key={`${stall.ids.join(',')}-${i}`} stall={stall} current={isCurrentStall(stall.ids, currentStallNo)} />
      ))}

      <text x="795" y="580" textAnchor="end" fontSize="13" fontWeight="900" fill="#111827">HALL NO. 12, HALL LAYOUT</text>
    </svg>
  );
}
