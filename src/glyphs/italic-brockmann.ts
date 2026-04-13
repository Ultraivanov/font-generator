// Italic latin glyphs — Brockmann style
// True italic: separate design with subtle slant (8-11°)
// Constructive geometry, not just obliqued romans

import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Italic slant angle in degrees
const ITALIC_SLANT = 9;
const SLANT_FACTOR = Math.tan((ITALIC_SLANT * Math.PI) / 180); // ~0.158

// Apply slant to x coordinate based on y
function slant(x: number, y: number, pivotY: number = 0): number {
  return x + (y - pivotY) * SLANT_FACTOR;
}

// H Italic — Single-story construction with slant
export const Hitalic: GlyphDefinition = {
  unicode: 0x0048,
  name: 'H.italic',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const innerSpace = stem * 2.5;
    const width = sb * 2 + stem * 2 + innerSpace;
    const pivotY = capHeight / 2;

    // Left stem (slanted)
    const leftStemX = slant(sb + stem / 2, 0, pivotY);
    builder.moveTo(leftStemX, round);
    builder.lineTo(leftStemX, capHeight - round);
    builder.lineTo(leftStemX + stem, capHeight - round);
    builder.lineTo(leftStemX + stem, round);
    builder.closePath();

    // Right stem (slanted)
    const rightStemX = slant(width - sb - stem / 2, 0, pivotY);
    builder.moveTo(rightStemX, round);
    builder.lineTo(rightStemX, capHeight - round);
    builder.lineTo(rightStemX + stem, capHeight - round);
    builder.lineTo(rightStemX + stem, round);
    builder.closePath();

    // Crossbar (slanted to match)
    const crossbarY = capHeight * 0.52;
    const leftX = slant(sb + stem / 2, crossbarY, pivotY);
    const rightX = slant(width - sb - stem / 2, crossbarY, pivotY) + stem;
    builder.hStem(leftX, crossbarY, rightX - leftX, stem);

    Hitalic.advanceWidth = width + stem; // Extra for slant
    return builder.build();
  },
};

// O Italic — Squarish circle with slant
export const Oitalic: GlyphDefinition = {
  unicode: 0x004f,
  name: 'O.italic',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlW = capHeight * 0.92;
    const bowlH = capHeight;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const pivotY = cy;

    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = bowlH / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.85;

    // Helper to slant points
    const sx = (x: number, y: number) => slant(x, y, pivotY);

    // Outer contour (slanted)
    builder
      .moveTo(sx(cx + rx * flatten, cy - ry), cy - ry)
      .curveTo(sx(cx + rx, cy - ry * k), cy - ry * k, sx(cx + rx, cy - ry * 0.3), cy - ry * 0.3, sx(cx + rx, cy), cy)
      .curveTo(sx(cx + rx, cy + ry * 0.3), cy + ry * 0.3, sx(cx + rx, cy + ry * k), cy + ry * k, sx(cx + rx * flatten, cy + ry), cy + ry)
      .curveTo(sx(cx + rx * k, cy + ry), cy + ry, sx(cx + rx * 0.3, cy + ry), cy + ry, sx(cx, cy + ry), cy + ry)
      .curveTo(sx(cx - rx * 0.3, cy + ry), cy + ry, sx(cx - rx * k, cy + ry), cy + ry, sx(cx - rx * flatten, cy + ry), cy + ry)
      .curveTo(sx(cx - rx, cy + ry * k), cy + ry * k, sx(cx - rx, cy + ry * 0.3), cy + ry * 0.3, sx(cx - rx, cy), cy)
      .curveTo(sx(cx - rx, cy - ry * 0.3), cy - ry * 0.3, sx(cx - rx, cy - ry * k), cy - ry * k, sx(cx - rx * flatten, cy - ry), cy - ry)
      .curveTo(sx(cx - rx * k, cy - ry), cy - ry, sx(cx - rx * 0.3, cy - ry), cy - ry, sx(cx, cy - ry), cy - ry)
      .curveTo(sx(cx + rx * 0.3, cy - ry), cy - ry, sx(cx + rx * k, cy - ry), cy - ry, sx(cx + rx * flatten, cy - ry), cy - ry)
      .closePath();

    // Inner counter
    const innerRx = rx - stem;
    const innerRy = ry - stem;

    builder
      .moveTo(sx(cx + innerRx * flatten, cy - innerRy), cy - innerRy)
      .curveTo(sx(cx + innerRx, cy - innerRy * k), cy - innerRy * k, sx(cx + innerRx, cy - innerRy * 0.3), cy - innerRy * 0.3, sx(cx + innerRx, cy), cy)
      .curveTo(sx(cx + innerRx, cy + innerRy * 0.3), cy + innerRy * 0.3, sx(cx + innerRx, cy + innerRy * k), cy + innerRy * k, sx(cx + innerRx * flatten, cy + innerRy), cy + innerRy)
      .curveTo(sx(cx + innerRx * k, cy + innerRy), cy + innerRy, sx(cx + innerRx * 0.3, cy + innerRy), cy + innerRy, sx(cx, cy + innerRy), cy + innerRy)
      .curveTo(sx(cx - innerRx * 0.3, cy + innerRy), cy + innerRy, sx(cx - innerRx * k, cy + innerRy), cy + innerRy, sx(cx - innerRx * flatten, cy + innerRy), cy + innerRy)
      .curveTo(sx(cx - innerRx, cy + innerRy * k), cy + innerRy * k, sx(cx - innerRx, cy + innerRy * 0.3), cy + innerRy * 0.3, sx(cx - innerRx, cy), cy)
      .curveTo(sx(cx - innerRx, cy - innerRy * 0.3), cy - innerRy * 0.3, sx(cx - innerRx, cy - innerRy * k), cy - innerRy * k, sx(cx - innerRx * flatten, cy - innerRy), cy - innerRy)
      .curveTo(sx(cx - innerRx * k, cy - innerRy), cy - innerRy, sx(cx - innerRx * 0.3, cy - innerRy), cy - innerRy, sx(cx, cy - innerRy), cy - innerRy)
      .curveTo(sx(cx + innerRx * 0.3, cy - innerRy), cy - innerRy, sx(cx + innerRx * k, cy - innerRy), cy - innerRy, sx(cx + innerRx * flatten, cy - innerRy), cy - innerRy)
      .closePath();

    Oitalic.advanceWidth = fullWidth + stem;
    return builder.build();
  },
};

// n Italic — Single story with slant, open form
export const nitalic: GlyphDefinition = {
  unicode: 0x006e,
  name: 'n.italic',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const fullWidth = xHeight * 0.9 + sb * 2;
    const pivotY = xHeight / 2;

    // Left stem (slanted)
    const stemX = slant(sb + stem / 2, 0, pivotY);
    builder.vStem(stemX, round, xHeight - round * 2, stem);
    builder.hStem(stemX, round, stem, stem);
    builder.hStem(stemX, xHeight - stem - round, stem, stem);

    // Right stem with connecting arch
    const archX = slant(fullWidth - sb - stem / 2, 0, pivotY);
    builder.vStem(archX, stem, xHeight - stem * 2, stem);

    nitalic.advanceWidth = fullWidth + stem / 2;
    return builder.build();
  },
};

// o Italic — Squarish with slant
export const oitalic: GlyphDefinition = {
  unicode: 0x006f,
  name: 'o.italic',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const bowlW = xHeight * 0.95;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const pivotY = cy;

    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = xHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.88;

    const sx = (x: number, y: number) => slant(x, y, pivotY);

    // Outer
    builder
      .moveTo(sx(cx + rx * flatten, cy - ry), cy - ry)
      .curveTo(sx(cx + rx, cy - ry * k), cy - ry * k, sx(cx + rx, cy - ry * 0.3), cy - ry * 0.3, sx(cx + rx, cy), cy)
      .curveTo(sx(cx + rx, cy + ry * 0.3), cy + ry * 0.3, sx(cx + rx, cy + ry * k), cy + ry * k, sx(cx + rx * flatten, cy + ry), cy + ry)
      .curveTo(sx(cx + rx * k, cy + ry), cy + ry, sx(cx + rx * 0.3, cy + ry), cy + ry, sx(cx, cy + ry), cy + ry)
      .curveTo(sx(cx - rx * 0.3, cy + ry), cy + ry, sx(cx - rx * k, cy + ry), cy + ry, sx(cx - rx * flatten, cy + ry), cy + ry)
      .curveTo(sx(cx - rx, cy + ry * k), cy + ry * k, sx(cx - rx, cy + ry * 0.3), cy + ry * 0.3, sx(cx - rx, cy), cy)
      .curveTo(sx(cx - rx, cy - ry * 0.3), cy - ry * 0.3, sx(cx - rx, cy - ry * k), cy - ry * k, sx(cx - rx * flatten, cy - ry), cy - ry)
      .curveTo(sx(cx - rx * k, cy - ry), cy - ry, sx(cx - rx * 0.3, cy - ry), cy - ry, sx(cx, cy - ry), cy - ry)
      .curveTo(sx(cx + rx * 0.3, cy - ry), cy - ry, sx(cx + rx * k, cy - ry), cy - ry, sx(cx + rx * flatten, cy - ry), cy - ry)
      .closePath();

    // Inner
    const innerRx = rx - stem;
    const innerRy = ry - stem;

    builder
      .moveTo(sx(cx + innerRx * flatten, cy - innerRy), cy - innerRy)
      .curveTo(sx(cx + innerRx, cy - innerRy * k), cy - innerRy * k, sx(cx + innerRx, cy - innerRy * 0.3), cy - innerRy * 0.3, sx(cx + innerRx, cy), cy)
      .curveTo(sx(cx + innerRx, cy + innerRy * 0.3), cy + innerRy * 0.3, sx(cx + innerRx, cy + innerRy * k), cy + innerRy * k, sx(cx + innerRx * flatten, cy + innerRy), cy + innerRy)
      .curveTo(sx(cx + innerRx * k, cy + innerRy), cy + innerRy, sx(cx + innerRx * 0.3, cy + innerRy), cy + innerRy, sx(cx, cy + innerRy), cy + innerRy)
      .curveTo(sx(cx - innerRx * 0.3, cy + innerRy), cy + innerRy, sx(cx - innerRx * k, cy + innerRy), cy + innerRy, sx(cx - innerRx * flatten, cy + innerRy), cy + innerRy)
      .curveTo(sx(cx - innerRx, cy + innerRy * k), cy + innerRy * k, sx(cx - innerRx, cy + innerRy * 0.3), cy + innerRy * 0.3, sx(cx - innerRx, cy), cy)
      .curveTo(sx(cx - innerRx, cy - innerRy * 0.3), cy - innerRy * 0.3, sx(cx - innerRx, cy - innerRy * k), cy - innerRy * k, sx(cx - innerRx * flatten, cy - innerRy), cy - innerRy)
      .curveTo(sx(cx - innerRx * k, cy - innerRy), cy - innerRy, sx(cx - innerRx * 0.3, cy - innerRy), cy - innerRy, sx(cx, cy - innerRy), cy - innerRy)
      .curveTo(sx(cx + innerRx * 0.3, cy - innerRy), cy - innerRy, sx(cx + innerRx * k, cy - innerRy), cy - innerRy, sx(cx + innerRx * flatten, cy - innerRy), cy - innerRy)
      .closePath();

    oitalic.advanceWidth = fullWidth + stem / 2;
    return builder.build();
  },
};

// Export all italic glyphs
export const italicUppercase: GlyphDefinition[] = [Hitalic, Oitalic];
export const italicLowercase: GlyphDefinition[] = [nitalic, oitalic];
export const italic: GlyphDefinition[] = [...italicUppercase, ...italicLowercase];
