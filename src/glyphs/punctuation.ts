import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Basic punctuation and symbols

// Space (empty glyph)
export const space: GlyphDefinition = {
  unicode: 0x0020,
  name: 'space',
  advanceWidth: 300,
  build: () => {
    return { commands: [] };
  },
};

// Period
export const period: GlyphDefinition = {
  unicode: 0x002e,
  name: 'period',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;

    const fullWidth = sb * 2 + stem * 2;
    const dotSize = stem * 0.8;

    builder.circle(fullWidth / 2, dotSize, dotSize / 2, 0);

    period.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Comma
export const comma: GlyphDefinition = {
  unicode: 0x002c,
  name: 'comma',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 2;
    const dotSize = stem * 0.8;

    // Round part
    const cx = fullWidth / 2;
    const cy = dotSize;
    builder.circle(cx, cy, dotSize / 2, 0);

    // Tail
    builder.moveTo(cx + dotSize / 2, cy - dotSize / 2);
    builder.lineTo(cx + dotSize, cy);
    builder.lineTo(cx + dotSize * 0.5, descender * 0.5);
    builder.closePath();

    comma.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Colon
export const colon: GlyphDefinition = {
  unicode: 0x003a,
  name: 'colon',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 2;
    const dotSize = stem * 0.8;
    const cx = fullWidth / 2;

    // Top dot
    builder.circle(cx, xHeight * 0.75, dotSize / 2, 0);

    // Bottom dot
    builder.circle(cx, xHeight * 0.25, dotSize / 2, 0);

    colon.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Semicolon
export const semicolon: GlyphDefinition = {
  unicode: 0x003b,
  name: 'semicolon',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 2;
    const dotSize = stem * 0.8;
    const cx = fullWidth / 2;

    // Top dot
    builder.circle(cx, xHeight * 0.75, dotSize / 2, 0);

    // Bottom comma
    const cy = xHeight * 0.25;
    builder.circle(cx, cy, dotSize / 2, 0);

    // Comma tail
    builder.moveTo(cx + dotSize / 2, cy - dotSize / 2);
    builder.lineTo(cx + dotSize, cy);
    builder.lineTo(cx + dotSize * 0.5, descender * 0.5);
    builder.closePath();

    semicolon.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Hyphen
export const hyphen: GlyphDefinition = {
  unicode: 0x002d,
  name: 'hyphen',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 3;

    builder.hStem(sb + stem / 2, xHeight * 0.5, fullWidth - sb * 2 - stem, stem);

    hyphen.advanceWidth = fullWidth;
    return builder.build();
  },
};

// En dash
export const endash: GlyphDefinition = {
  unicode: 0x2013,
  name: 'endash',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;

    builder.hStem(sb + stem / 2, capHeight * 0.45, fullWidth - sb * 2 - stem, stem);

    endash.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Em dash
export const emdash: GlyphDefinition = {
  unicode: 0x2014,
  name: 'emdash',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = (sb + stem) * 3;

    builder.hStem(sb + stem / 2, capHeight * 0.45, fullWidth - sb * 2 - stem, stem);

    emdash.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Exclamation mark
export const exclam: GlyphDefinition = {
  unicode: 0x0021,
  name: 'exclam',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 2;
    const stemX = fullWidth / 2;

    // Vertical stem
    builder.vStem(stemX, xHeight * 0.2, capHeight - stem * 2, stem);

    // Bottom dot
    builder.circle(stemX, stem, stem * 0.6, 0);

    exclam.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Question mark
export const question: GlyphDefinition = {
  unicode: 0x003f,
  name: 'question',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.7;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const c = 0.5522847498;

    // Upper curve
    const curveY = capHeight * 0.75;
    const rx = width / 2 - stem;
    const ry = capHeight * 0.2;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;

    builder
      .moveTo(cx - outerRx * 0.5, curveY - outerRy)
      .curveTo(cx + outerRx * c, curveY - outerRy, cx + outerRx, curveY - outerRy * c, cx + outerRx, curveY)
      .curveTo(cx + outerRx, curveY + outerRy * c, cx + outerRx * c, curveY + outerRy, cx + outerRx * 0.5, curveY + outerRy);

    // Stem down
    builder.vStem(cx, xHeight * 0.4, curveY - outerRy, stem);

    // Bottom dot
    builder.circle(cx, stem, stem * 0.6, 0);

    question.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Apostrophe / single quote
export const quotesingle: GlyphDefinition = {
  unicode: 0x0027,
  name: 'quotesingle',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 1.5;
    const cx = fullWidth / 2;
    const topY = capHeight + stem;

    // Vertical stem
    builder.vStem(cx, capHeight, stem * 2.5, stem);

    quotesingle.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Double quote
export const quotedbl: GlyphDefinition = {
  unicode: 0x0022,
  name: 'quotedbl',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 3.5;
    const gap = stem;
    const leftX = (fullWidth - stem - gap) / 2;
    const rightX = leftX + stem + gap;

    // Left quote
    builder.vStem(leftX, capHeight, stem * 2.5, stem);

    // Right quote
    builder.vStem(rightX, capHeight, stem * 2.5, stem);

    quotedbl.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Left parenthesis
export const parenleft: GlyphDefinition = {
  unicode: 0x0028,
  name: 'parenleft',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;
    const ascender = p.ascender;
    const overshoot = p.overshoot;

    const fullWidth = sb * 2 + stem * 3;
    const rx = stem * 1.5;
    const ry = (ascender - descender) / 2;
    const cx = fullWidth - sb - stem;
    const cy = (ascender + descender) / 2;
    const c = 0.5522847498;

    // Left arc
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;

    builder
      .moveTo(cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy);

    parenleft.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Right parenthesis
export const parenright: GlyphDefinition = {
  unicode: 0x0029,
  name: 'parenright',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;
    const ascender = p.ascender;
    const overshoot = p.overshoot;

    const fullWidth = sb * 2 + stem * 3;
    const rx = stem * 1.5;
    const ry = (ascender - descender) / 2;
    const cx = sb + stem;
    const cy = (ascender + descender) / 2;
    const c = 0.5522847498;

    // Right arc
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;

    builder
      .moveTo(cx, cy + outerRy)
      .curveTo(cx + outerRx * c, cy + outerRy, cx + outerRx, cy + outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy - outerRy * c, cx + outerRx * c, cy - outerRy, cx, cy - outerRy);

    parenright.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Euro (€)
export const euro: GlyphDefinition = {
  unicode: 0x20ac,
  name: 'euro',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const fullWidth = capHeight * 0.8 + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const r = fullWidth / 2 - stem;
    const k = 0.5522847498;

    // C-shape arc (outer)
    const outerR = r + stem / 2 + overshoot;
    builder
      .moveTo(cx + outerR, cy - outerR * 0.5)
      .curveTo(cx + outerR, cy + outerR * k, cx + outerR * k, cy + outerR, cx, cy + outerR)
      .curveTo(cx - outerR * k, cy + outerR, cx - outerR, cy + outerR * k, cx - outerR, cy + outerR * 0.5);

    // Inner arc back
    const innerR = r - stem / 2;
    builder.lineTo(cx - innerR, cy + innerR * 0.3);
    builder
      .curveTo(cx - innerR, cy - innerR * k, cx - innerR * k, cy - innerR, cx, cy - innerR)
      .curveTo(cx + innerR * k, cy - innerR, cx + innerR * 0.3, cy - innerR * k, cx + innerR * 0.5, cy);

    builder.closePath();

    // Two horizontal bars
    const barY1 = cy + stem;
    const barY2 = cy - stem * 0.5;
    const barLeft = cx - outerR * 0.6;
    const barRight = cx + stem;
    builder.hStem(barLeft, barY1, barRight - barLeft, stem * 0.8);
    builder.hStem(barLeft, barY2, barRight - barLeft, stem * 0.8);

    euro.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Dollar ($)
export const dollar: GlyphDefinition = {
  unicode: 0x0024,
  name: 'dollar',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const fullWidth = capHeight * 0.7 + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const r = fullWidth / 2 - stem;
    const k = 0.5522847498;

    // S-shape: upper curve
    const outerR = r + stem / 2 + overshoot;
    builder
      .moveTo(cx + outerR * 0.5, cy - outerR)
      .curveTo(cx + outerR * k, cy - outerR, cx + outerR, cy - outerR * k, cx + outerR, cy)
      .curveTo(cx + outerR, cy + outerR * k, cx + outerR * 0.5, cy + outerR, cx, cy + outerR);

    // Lower curve back
    const innerR = r - stem / 2;
    builder
      .curveTo(cx - innerR * k, cy + innerR, cx - innerR, cy + innerR * k, cx - innerR, cy)
      .curveTo(cx - innerR, cy - innerR * k, cx - innerR * 0.5, cy - innerR, cx - innerR * 0.5, cy - innerR * 0.8);

    // Vertical stem through middle
    builder.vStem(cx, stem, capHeight - stem * 2, stem);

    dollar.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Currency: £ ¥ ¢ — simplified basic versions
// Pound (£) - simplified as L with crossbars
export const sterling: GlyphDefinition = {
  unicode: 0x00a3,
  name: 'sterling',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = capHeight * 0.6 + sb * 2;
    const stemX = sb + stem;

    // L shape
    builder.vStem(stemX, 0, capHeight, stem);
    builder.hStem(stemX, capHeight / 2, fullWidth - sb - stemX, stem);

    // Top hook
    builder.hStem(stemX, capHeight - stem, stem * 2, stem);

    sterling.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Arrows
export const arrowleft: GlyphDefinition = {
  unicode: 0x2190,
  name: 'arrowleft',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = xHeight * 1.2 + sb * 2;
    const cy = xHeight / 2;
    const headSize = xHeight * 0.3;

    // Arrow head (left)
    builder.moveTo(sb, cy);
    builder.lineTo(sb + headSize, cy + headSize);
    builder.lineTo(sb + headSize, cy - headSize);
    builder.closePath();

    // Shaft
    builder.hStem(sb + headSize * 0.8, cy - stem / 2, fullWidth - sb - headSize * 2, stem);

    arrowleft.advanceWidth = fullWidth;
    return builder.build();
  },
};

export const arrowright: GlyphDefinition = {
  unicode: 0x2192,
  name: 'arrowright',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = xHeight * 1.2 + sb * 2;
    const cy = xHeight / 2;
    const headSize = xHeight * 0.3;

    // Arrow head (right)
    builder.moveTo(fullWidth - sb, cy);
    builder.lineTo(fullWidth - sb - headSize, cy + headSize);
    builder.lineTo(fullWidth - sb - headSize, cy - headSize);
    builder.closePath();

    // Shaft
    builder.hStem(sb, cy - stem / 2, fullWidth - sb - headSize * 2, stem);

    arrowright.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Export all punctuation
export const punctuation: GlyphDefinition[] = [
  space, period, comma, colon, semicolon,
  hyphen, endash, emdash,
  exclam, question,
  quotesingle, quotedbl,
  parenleft, parenright,
  euro, dollar, sterling,
  arrowleft, arrowright
];
