import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Hebrew alphabet (Aleph-Bet)
// Geometric construction with Constructivist/Swiss influence
// Note: Hebrew is RTL (right-to-left), but glyph coordinates are still LTR

// Aleph (א) - U+05D0
// Vertical strokes with diagonal connector
export const Aleph: GlyphDefinition = {
  unicode: 0x05D0,
  name: 'Aleph',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 3;
    const stem1X = sb + stem / 2;
    const stem2X = fullWidth - sb - stem / 2;

    // Left vertical stroke
    builder.vStem(stem1X, 0, capHeight * 0.7, stem);

    // Right vertical stroke
    builder.vStem(stem2X, capHeight * 0.3, capHeight, stem);

    // Diagonal connector
    builder.moveTo(stem1X + stem / 2, capHeight * 0.35);
    builder.lineTo(stem1X + stem, capHeight * 0.4);
    builder.lineTo(stem2X - stem / 2, capHeight * 0.65);
    builder.lineTo(stem2X - stem, capHeight * 0.6);
    builder.closePath();

    Aleph.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Bet (ב) - U+05D1
// Vertical stem with two bowls on right
export const Bet: GlyphDefinition = {
  unicode: 0x05D1,
  name: 'Bet',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.5;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;

    // Left vertical stem (full height with baseline extension)
    builder.vStem(stemX, -stem / 2, capHeight + stem / 2, stem);

    // Upper bowl
    const upperCy = capHeight * 0.75;
    const upperRx = bowlWidth * 0.4;
    const upperRy = capHeight * 0.2;
    const c = 0.5522847498;

    const outerRx = upperRx + stem / 2 + overshoot;
    const outerRy = upperRy + stem / 2 + overshoot;

    builder
      .moveTo(stemX + stem / 2, upperCy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, upperCy - outerRy, stemX + stem / 2 + outerRx, upperCy - outerRy * c, stemX + stem / 2 + outerRx, upperCy)
      .curveTo(stemX + stem / 2 + outerRx, upperCy + outerRy * c, stemX + stem / 2 + outerRx * c, upperCy + outerRy, stemX + stem / 2, upperCy + outerRy);

    // Lower bowl
    const lowerCy = capHeight * 0.35;
    const lowerRx = bowlWidth * 0.4;
    const lowerRy = capHeight * 0.15;

    const outerRx2 = lowerRx + stem / 2 + overshoot;
    const outerRy2 = lowerRy + stem / 2 + overshoot;

    builder
      .moveTo(stemX + stem / 2, lowerCy - outerRy2)
      .curveTo(stemX + stem / 2 + outerRx2 * c, lowerCy - outerRy2, stemX + stem / 2 + outerRx2, lowerCy - outerRy2 * c, stemX + stem / 2 + outerRx2, lowerCy)
      .curveTo(stemX + stem / 2 + outerRx2, lowerCy + outerRy2 * c, stemX + stem / 2 + outerRx2 * c, lowerCy + outerRy2, stemX + stem / 2, lowerCy + outerRy2);

    Bet.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Gimel (ג) - U+05D2
// Like a slanted L with hook
export const Gimel: GlyphDefinition = {
  unicode: 0x05D2,
  name: 'Gimel',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 3;
    const stemX = sb + stem / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Slanted top bar
    builder.moveTo(stemX + stem / 2, capHeight - stem / 2);
    builder.lineTo(stemX + stem * 2.5, capHeight - stem);
    builder.lineTo(fullWidth - sb, capHeight * 0.4);
    builder.lineTo(fullWidth - sb - stem, capHeight * 0.45);
    builder.closePath();

    Gimel.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Dalet (ד) - U+05D3
// Like a reversed L
export const Dalet: GlyphDefinition = {
  unicode: 0x05D3,
  name: 'Dalet',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 3;
    const stemX = sb + stem / 2;

    // Vertical stem
    builder.vStem(stemX, capHeight * 0.2, capHeight, stem);

    // Top horizontal extending right
    builder.hStem(stemX + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem * 1.5, stem);

    Dalet.advanceWidth = fullWidth;
    return builder.build();
  },
};

// He (ה) - U+05D4
// Like Dalet but with a bowl at top right
export const He: GlyphDefinition = {
  unicode: 0x05D4,
  name: 'He',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;
    const bowlCx = fullWidth - sb - stem * 1.5;
    const bowlCy = capHeight * 0.65;
    const bowlRx = stem * 2;
    const bowlRy = capHeight * 0.25;
    const c = 0.5522847498;

    // Vertical stem
    builder.vStem(stemX, capHeight * 0.2, capHeight, stem);

    // Top horizontal
    builder.hStem(stemX + stem / 2, capHeight - stem / 2, fullWidth / 2, stem);

    // Bowl on right
    const outerRx = bowlRx + stem / 2 + overshoot;
    const outerRy = bowlRy + stem / 2 + overshoot;

    builder
      .moveTo(bowlCx, bowlCy - outerRy)
      .curveTo(bowlCx + outerRx * c, bowlCy - outerRy, bowlCx + outerRx, bowlCy - outerRy * c, bowlCx + outerRx, bowlCy)
      .curveTo(bowlCx + outerRx, bowlCy + outerRy * c, bowlCx + outerRx * c, bowlCy + outerRy, bowlCx, bowlCy + outerRy);

    He.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Vav (ו) - U+05D5
// Simple vertical stroke
export const Vav: GlyphDefinition = {
  unicode: 0x05D5,
  name: 'Vav',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 2;
    const stemX = fullWidth / 2;

    // Single vertical stroke
    builder.vStem(stemX, 0, capHeight, stem);

    Vav.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Zayin (ז) - U+05D6
// Like Vav but with top stroke
export const Zayin: GlyphDefinition = {
  unicode: 0x05D6,
  name: 'Zayin',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 3;
    const stemX = fullWidth / 2;

    // Vertical stroke
    builder.vStem(stemX, 0, capHeight, stem);

    // Top horizontal stroke (short)
    builder.hStem(stemX - stem, capHeight - stem / 2, stem * 3, stem);

    Zayin.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Het (ח) - U+05D7
// Box shape like a square C
export const Het: GlyphDefinition = {
  unicode: 0x05D7,
  name: 'Het',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;

    // Left vertical
    builder.vStem(sb + stem / 2, 0, capHeight, stem);

    // Right vertical
    builder.vStem(fullWidth - sb - stem / 2, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(sb + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    Het.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Tet (ט) - U+05D8
// Like a rounded bowl with tail
export const Tet: GlyphDefinition = {
  unicode: 0x05D8,
  name: 'Tet',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.8;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight * 0.55;
    const rx = width / 2 - stem / 2;
    const ry = capHeight * 0.45;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Outer bowl
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Inner counter
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    Tet.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Yod (י) - U+05D9
// Small vertical stroke
export const Yod: GlyphDefinition = {
  unicode: 0x05D9,
  name: 'Yod',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 2;
    const stemX = fullWidth / 2;

    // Short vertical stroke at top
    builder.vStem(stemX, capHeight * 0.4, capHeight, stem);

    Yod.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Kaf (כ) - U+05DB
// Like reversed C with vertical stem
export const Kaf: GlyphDefinition = {
  unicode: 0x05DB,
  name: 'Kaf',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.7;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    // Left vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // C shape (open on left)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    builder.lineTo(stemX + stem / 2, cy + innerRy);

    builder
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    Kaf.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Kaf-final (ך) - U+05DA
// Like Kaf but with long descender
export const KafFinal: GlyphDefinition = {
  unicode: 0x05DA,
  name: 'KafFinal',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.6;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = capHeight * 0.4;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = cy;
    const c = 0.5522847498;

    // Left vertical stem (extends down)
    builder.vStem(stemX, descender, capHeight, stem);

    // C shape bowl
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    builder.lineTo(stemX + stem / 2, cy + innerRy);

    builder
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    KafFinal.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Lamed (ל) - U+05DC
// Tall letter with curved top going left
export const Lamed: GlyphDefinition = {
  unicode: 0x05DC,
  name: 'Lamed',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const ascender = p.ascender;

    const fullWidth = sb * 2 + stem * 3;
    const stemX = sb + stem * 1.5;

    // Vertical stem (goes above cap height)
    builder.vStem(stemX, 0, ascender * 0.9, stem);

    // Curved top going left
    const curveStartY = ascender * 0.85;
    const curveEndX = sb + stem / 2;

    builder.moveTo(stemX - stem / 2, curveStartY);
    builder.curveTo(
      stemX - stem * 2, curveStartY,
      curveEndX, capHeight * 0.7,
      curveEndX, capHeight * 0.5
    );
    builder.curveTo(
      curveEndX, capHeight * 0.4,
      stemX - stem, capHeight * 0.35,
      stemX, capHeight * 0.35
    );

    Lamed.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Mem (מ) - U+05DE
// Square shape open at bottom right
export const Mem: GlyphDefinition = {
  unicode: 0x05DE,
  name: 'Mem',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // Left vertical
    builder.vStem(leftX, 0, capHeight, stem);

    // Right vertical (stops short)
    builder.vStem(rightX, capHeight * 0.2, capHeight, stem);

    // Top horizontal
    builder.hStem(leftX + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem * 1.5, stem);

    // Bottom diagonal
    builder.moveTo(leftX + stem / 2, stem / 2);
    builder.lineTo(leftX + stem * 1.5, 0);
    builder.lineTo(rightX - stem / 2, capHeight * 0.2);
    builder.lineTo(rightX - stem * 1.5, capHeight * 0.2 + stem);
    builder.closePath();

    Mem.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Mem-final (ם) - U+05DD
// Square shape fully closed at bottom
export const MemFinal: GlyphDefinition = {
  unicode: 0x05DD,
  name: 'MemFinal',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // Left vertical
    builder.vStem(leftX, 0, capHeight, stem);

    // Right vertical
    builder.vStem(rightX, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(leftX + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Bottom horizontal
    builder.hStem(leftX + stem / 2, stem / 2, fullWidth - sb * 2 - stem, stem);

    MemFinal.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Nun (נ) - U+05E0
// Simple vertical like Vav but shorter
export const Nun: GlyphDefinition = {
  unicode: 0x05E0,
  name: 'Nun',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 2;
    const stemX = fullWidth / 2;

    // Short vertical stroke
    builder.vStem(stemX, 0, capHeight * 0.6, stem);

    Nun.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Nun-final (ן) - U+05DF
// Long descender
export const NunFinal: GlyphDefinition = {
  unicode: 0x05DF,
  name: 'NunFinal',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 2;
    const stemX = fullWidth / 2;

    // Long descender
    builder.vStem(stemX, descender, capHeight, stem);

    NunFinal.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Samekh (ס) - U+05E1
// Circle with opening on left
export const Samekh: GlyphDefinition = {
  unicode: 0x05E1,
  name: 'Samekh',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.85;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2 + stem; // Shift right to make opening on left
    const cy = capHeight / 2;
    const rx = width / 2 - stem;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Outer C-shape
    builder
      .moveTo(cx + outerRx * 0.5, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx + outerRx * 0.5, cy + outerRy);

    builder.lineTo(cx + innerRx * 0.5, cy + innerRy);

    builder
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx + innerRx * 0.5, cy - innerRy);

    builder.closePath();

    // Cap ends
    builder.rect(cx + rx * 0.2, cy - outerRy - stem / 2, stem, stem);
    builder.rect(cx + rx * 0.2, cy + outerRy - stem / 2, stem, stem);

    Samekh.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ayin (ע) - U+05E2
// Like a Y or forked shape
export const Ayin: GlyphDefinition = {
  unicode: 0x05E2,
  name: 'Ayin',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 4;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;
    const midX = fullWidth / 2;

    // Left descender
    builder.moveTo(leftX, capHeight * 0.3);
    builder.lineTo(leftX + stem, capHeight * 0.3);
    builder.lineTo(midX, descender * 0.4);
    builder.lineTo(midX - stem / 2, descender * 0.4 + stem);
    builder.closePath();

    // Right descender
    builder.moveTo(rightX, capHeight * 0.3);
    builder.lineTo(rightX - stem, capHeight * 0.3);
    builder.lineTo(midX, descender * 0.4);
    builder.lineTo(midX + stem / 2, descender * 0.4 + stem);
    builder.closePath();

    Ayin.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Pe (פ) - U+05E4
// Like Kaf but with diagonal descender
export const Pe: GlyphDefinition = {
  unicode: 0x05E4,
  name: 'Pe',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.7;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = capHeight * 0.45;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight * 0.45;
    const c = 0.5522847498;

    // Left vertical stem (extends down as descender)
    builder.vStem(stemX, descender * 0.4, capHeight, stem);

    // C shape bowl
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    builder.lineTo(stemX + stem / 2, cy + innerRy);

    builder
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    Pe.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Pe-final (ף) - U+05E3
// Like Pe but with very long descender and no bowl
export const PeFinal: GlyphDefinition = {
  unicode: 0x05E3,
  name: 'PeFinal',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 3;
    const stemX = sb + stem * 1.5;

    // Long vertical descender
    builder.vStem(stemX, descender, capHeight, stem);

    // Top stroke going right
    builder.hStem(stemX + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem * 2, stem);

    PeFinal.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Tsadi (צ) - U+05E6
// Like Yod with a tail going right then down
export const Tsadi: GlyphDefinition = {
  unicode: 0x05E6,
  name: 'Tsadi',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;
    const tailEndX = fullWidth - sb - stem / 2;

    // Short vertical (Yod-like)
    builder.vStem(stemX, capHeight * 0.4, capHeight, stem);

    // Tail going right and down
    builder.moveTo(stemX + stem / 2, capHeight * 0.5);
    builder.lineTo(stemX + stem, capHeight * 0.45);
    builder.lineTo(tailEndX, descender * 0.3);
    builder.lineTo(tailEndX - stem, descender * 0.3 + stem / 2);
    builder.closePath();

    Tsadi.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Tsadi-final (ץ) - U+05E5
// Like Tsadi with longer descender
export const TsadiFinal: GlyphDefinition = {
  unicode: 0x05E5,
  name: 'TsadiFinal',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 3;
    const stemX = sb + stem * 1.5;

    // Long vertical descender
    builder.vStem(stemX, descender, capHeight, stem);

    // Top hook going left
    builder.hStem(sb + stem / 2, capHeight - stem / 2, stemX - sb, stem);

    TsadiFinal.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Qof (ק) - U+05E7
// Like reversed P with long descender
export const Qof: GlyphDefinition = {
  unicode: 0x05E7,
  name: 'Qof',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.7;
    const fullWidth = bowlWidth + stem + sb;
    const stemX = fullWidth - sb - stem / 2;
    const cx = stemX - bowlWidth / 2;
    const cy = capHeight * 0.45;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight * 0.45;
    const c = 0.5522847498;

    // Right vertical stem (long descender)
    builder.vStem(stemX, descender * 0.5, capHeight, stem);

    // Bowl on left
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    builder
      .moveTo(stemX - stem / 2, cy - outerRy)
      .curveTo(stemX - stem / 2 - outerRx * c, cy - outerRy, stemX - stem / 2 - outerRx, cy - outerRy * c, stemX - stem / 2 - outerRx, cy)
      .curveTo(stemX - stem / 2 - outerRx, cy + outerRy * c, stemX - stem / 2 - outerRx * c, cy + outerRy, stemX - stem / 2, cy + outerRy);

    builder.lineTo(stemX - stem / 2, cy + innerRy);

    builder
      .curveTo(stemX - stem / 2 - innerRx * c, cy + innerRy, stemX - stem / 2 - innerRx, cy + innerRy * c, stemX - stem / 2 - innerRx, cy)
      .curveTo(stemX - stem / 2 - innerRx, cy - innerRy * c, stemX - stem / 2 - innerRx * c, cy - innerRy, stemX - stem / 2, cy - innerRy)
      .closePath();

    Qof.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Resh (ר) - U+05E8
// Like reversed P without the bowl closing
export const Resh: GlyphDefinition = {
  unicode: 0x05E8,
  name: 'Resh',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.6;
    const fullWidth = bowlWidth + stem + sb;
    const stemX = fullWidth - sb - stem / 2;
    const cy = capHeight * 0.55;
    const rx = bowlWidth / 2;
    const ry = capHeight * 0.35;
    const c = 0.5522847498;

    // Right vertical stem
    builder.vStem(stemX, capHeight * 0.2, capHeight, stem);

    // Open bowl on left
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;

    builder
      .moveTo(stemX - stem / 2, cy - outerRy)
      .curveTo(stemX - stem / 2 - outerRx * c, cy - outerRy, stemX - stem / 2 - outerRx, cy - outerRy * c, stemX - stem / 2 - outerRx, cy)
      .curveTo(stemX - stem / 2 - outerRx, cy + outerRy * c, stemX - stem / 2 - outerRx * c, cy + outerRy, stemX - stem / 2, cy + outerRy);

    Resh.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Shin (ש) - U+05E9
// W shape with three arms
export const Shin: GlyphDefinition = {
  unicode: 0x05E9,
  name: 'Shin',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const midX = fullWidth / 2;
    const rightX = fullWidth - sb - stem / 2;
    const topY = capHeight * 0.85;
    const midY = capHeight * 0.4;

    // Left arm
    builder.moveTo(leftX, topY);
    builder.lineTo(leftX + stem, topY);
    builder.lineTo(midX, midY + stem / 2);
    builder.lineTo(midX - stem / 2, midY);
    builder.closePath();

    // Right arm
    builder.moveTo(rightX, topY);
    builder.lineTo(rightX - stem, topY);
    builder.lineTo(midX, midY + stem / 2);
    builder.lineTo(midX + stem / 2, midY);
    builder.closePath();

    // Center stem down
    builder.vStem(midX - stem / 2, 0, midY + stem, stem);

    Shin.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Tav (ת) - U+05EA
// Like a cross or plus with extended horizontal
export const Tav: GlyphDefinition = {
  unicode: 0x05EA,
  name: 'Tav',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;
    const stemX = fullWidth / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top horizontal (long)
    builder.hStem(sb + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Middle horizontal (shorter)
    builder.hStem(stemX - stem * 1.5, capHeight * 0.5, stem * 4, stem);

    Tav.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Export all Hebrew glyphs
export const hebrew: GlyphDefinition[] = [
  Aleph, Bet, Gimel, Dalet, He, Vav, Zayin, Het, Tet, Yod,
  Kaf, KafFinal, Lamed, Mem, MemFinal, Nun, NunFinal, Samekh, Ayin,
  Pe, PeFinal, Tsadi, TsadiFinal, Qof, Resh, Shin, Tav
];
