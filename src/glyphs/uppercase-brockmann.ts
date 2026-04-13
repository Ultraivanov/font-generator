// Uppercase latin glyphs — Brockmann style
// Josef Müller-Brockmann inspired: square proportions, open apertures, subtle rounding

import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// H — Clean geometric with consistent stroke
export const H: GlyphDefinition = {
  unicode: 0x0048,
  name: 'H',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const innerSpace = stem * 2.8;
    const width = sb * 2 + stem * 2 + innerSpace;

    // Left stem (simple rectangle)
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, capHeight);
    builder.lineTo(sb, capHeight);
    builder.closePath();

    // Right stem (simple rectangle)
    builder.moveTo(width - sb - stem, 0);
    builder.lineTo(width - sb, 0);
    builder.lineTo(width - sb, capHeight);
    builder.lineTo(width - sb - stem, capHeight);
    builder.closePath();

    // Crossbar at optical center
    const crossbarY = capHeight * 0.52;
    builder.moveTo(sb + stem, crossbarY);
    builder.lineTo(width - sb - stem, crossbarY);
    builder.lineTo(width - sb - stem, crossbarY + stem);
    builder.lineTo(sb + stem, crossbarY + stem);
    builder.closePath();

    H.advanceWidth = width;
    return builder.build();
  },
};

// O — Squarish circle (superellipse feel), not perfect circle
export const O: GlyphDefinition = {
  unicode: 0x004f,
  name: 'O',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;
    const round = p.terminalRound || 4;

    // Squarish proportions: width slightly less than height
    const bowlW = capHeight * 0.92;
    const bowlH = capHeight;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;

    // Superellipse-like: slightly squared circle
    // Outer contour — squarish with rounded corners
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = bowlH / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.85; // Makes sides straighter (square-like)

    builder
      .moveTo(cx + rx * flatten, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy - ry * 0.3, cx + rx, cy)
      .curveTo(cx + rx, cy + ry * 0.3, cx + rx, cy + ry * k, cx + rx * flatten, cy + ry)
      .curveTo(cx + rx * k, cy + ry, cx + rx * 0.3, cy + ry, cx, cy + ry)
      .curveTo(cx - rx * 0.3, cy + ry, cx - rx * k, cy + ry, cx - rx * flatten, cy + ry)
      .curveTo(cx - rx, cy + ry * k, cx - rx, cy + ry * 0.3, cx - rx, cy)
      .curveTo(cx - rx, cy - ry * 0.3, cx - rx, cy - ry * k, cx - rx * flatten, cy - ry)
      .curveTo(cx - rx * k, cy - ry, cx - rx * 0.3, cy - ry, cx, cy - ry)
      .curveTo(cx + rx * 0.3, cy - ry, cx + rx * k, cy - ry, cx + rx * flatten, cy - ry)
      .closePath();

    // Inner counter — maintain even thickness
    const innerRx = rx - stem;
    const innerRy = ry - stem;

    builder
      .moveTo(cx + innerRx * flatten, cy - innerRy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx, cy - innerRy * 0.3, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy + innerRy * 0.3, cx + innerRx, cy + innerRy * k, cx + innerRx * flatten, cy + innerRy)
      .curveTo(cx + innerRx * k, cy + innerRy, cx + innerRx * 0.3, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx - innerRx * 0.3, cy + innerRy, cx - innerRx * k, cy + innerRy, cx - innerRx * flatten, cy + innerRy)
      .curveTo(cx - innerRx, cy + innerRy * k, cx - innerRx, cy + innerRy * 0.3, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy - innerRy * 0.3, cx - innerRx, cy - innerRy * k, cx - innerRx * flatten, cy - innerRy)
      .curveTo(cx - innerRx * k, cy - innerRy, cx - innerRx * 0.3, cy - innerRy, cx, cy - innerRy)
      .curveTo(cx + innerRx * 0.3, cy - innerRy, cx + innerRx * k, cy - innerRy, cx + innerRx * flatten, cy - innerRy)
      .closePath();

    O.advanceWidth = fullWidth;
    return builder.build();
  },
};

// C — Open aperture, squarish curve
export const C: GlyphDefinition = {
  unicode: 0x0043,
  name: 'C',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    // Same proportions as O
    const bowlW = capHeight * 0.92;
    const bowlH = capHeight;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = bowlH / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.85;

    // Open on the right — start from top-right, go around
    builder
      .moveTo(cx + rx, cy - ry * 0.5)
      .curveTo(cx + rx, cy - ry * k, cx + rx * flatten, cy - ry, cx + rx * flatten * 0.5, cy - ry)
      .curveTo(cx + rx * k, cy - ry, cx + rx * 0.3, cy - ry, cx, cy - ry)
      .curveTo(cx - rx * 0.3, cy - ry, cx - rx * k, cy - ry, cx - rx * flatten, cy - ry)
      .curveTo(cx - rx, cy - ry * k, cx - rx, cy, cx - rx, cy)
      .curveTo(cx - rx, cy + ry * k, cx - rx * k, cy + ry, cx - rx * flatten, cy + ry)
      .curveTo(cx - rx * 0.3, cy + ry, cx + rx * k * 0.5, cy + ry, cx + rx * flatten * 0.5, cy + ry)
      .curveTo(cx + rx * flatten, cy + ry, cx + rx, cy + ry * k, cx + rx, cy + ry * 0.5);

    // Inner curve back
    const innerRx = rx - stem;
    const innerRy = ry - stem;

    builder
      .lineTo(cx + innerRx, cy + innerRy * 0.4)
      .curveTo(cx + innerRx, cy + innerRy * k, cx + innerRx * flatten, cy + innerRy, cx + innerRx * flatten * 0.5, cy + innerRy)
      .curveTo(cx + innerRx * 0.3, cy + innerRy, cx - innerRx * 0.3, cy + innerRy, cx - innerRx * flatten, cy + innerRy)
      .curveTo(cx - innerRx, cy + innerRy * k, cx - innerRx, cy, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy - innerRy * k, cx - innerRx * k, cy - innerRy, cx - innerRx * flatten, cy - innerRy)
      .curveTo(cx - innerRx * 0.3, cy - innerRy, cx + innerRx * k * 0.5, cy - innerRy, cx + innerRx * flatten * 0.5, cy - innerRy)
      .curveTo(cx + innerRx * flatten, cy - innerRy, cx + innerRx, cy - innerRy * k, cx + innerRx, cy - innerRy * 0.4)
      .closePath();

    C.advanceWidth = fullWidth;
    return builder.build();
  },
};

// G — With spur, open aperture
export const G: GlyphDefinition = {
  unicode: 0x0047,
  name: 'G',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    // Start with C shape
    const bowlW = capHeight * 0.92;
    const bowlH = capHeight;
    const fullWidth = bowlW + sb * 2 + stem; // Extra for crossbar
    const cx = (bowlW + sb * 2) / 2;
    const cy = capHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = bowlH / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.85;

    // Outer contour — similar to C but closed with crossbar/spur
    builder
      .moveTo(cx + rx, cy - ry * 0.5)
      .curveTo(cx + rx, cy - ry * k, cx + rx * flatten, cy - ry, cx + rx * flatten * 0.5, cy - ry)
      .curveTo(cx + rx * k, cy - ry, cx + rx * 0.3, cy - ry, cx, cy - ry)
      .curveTo(cx - rx * 0.3, cy - ry, cx - rx * k, cy - ry, cx - rx * flatten, cy - ry)
      .curveTo(cx - rx, cy - ry * k, cx - rx, cy, cx - rx, cy)
      .curveTo(cx - rx, cy + ry * k, cx - rx * k, cy + ry, cx - rx * flatten, cy + ry)
      .curveTo(cx - rx * 0.3, cy + ry, cx + rx * k * 0.5, cy + ry, cx + rx * flatten * 0.5, cy + ry)
      .curveTo(cx + rx * flatten, cy + ry, cx + rx, cy + ry * k, cx + rx, cy + ry * 0.3);

    // Crossbar/spur on right side
    const crossbarY = cy + stem;
    builder.lineTo(cx + rx, crossbarY);
    builder.lineTo(cx + stem, crossbarY);
    builder.lineTo(cx + stem, crossbarY - stem);
    builder.lineTo(cx + rx - stem, crossbarY - stem);

    // Inner counter
    const innerRx = rx - stem;
    const innerRy = ry - stem;

    builder
      .curveTo(cx + innerRx, cy + innerRy * k, cx + innerRx * flatten, cy + innerRy, cx + innerRx * flatten * 0.5, cy + innerRy)
      .curveTo(cx + innerRx * 0.3, cy + innerRy, cx - innerRx * 0.3, cy + innerRy, cx - innerRx * flatten, cy + innerRy)
      .curveTo(cx - innerRx, cy + innerRy * k, cx - innerRx, cy, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy - innerRy * k, cx - innerRx * k, cy - innerRy, cx - innerRx * flatten, cy - innerRy)
      .curveTo(cx - innerRx * 0.3, cy - innerRy, cx + innerRx * k * 0.5, cy - innerRy, cx + innerRx * flatten * 0.5, cy - innerRy)
      .curveTo(cx + innerRx * flatten, cy - innerRy, cx + innerRx, cy - innerRy * k, cx + innerRx, cy - innerRy * 0.4)
      .closePath();

    G.advanceWidth = fullWidth;
    return builder.build();
  },
};

// A — Triangular with flat top, open aperture
export const A: GlyphDefinition = {
  unicode: 0x0041,
  name: 'A',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const width = capHeight * 0.85 + sb * 2;
    const apexY = capHeight;
    const baseY = 0;
    const apexX = width / 2;

    // Left diagonal
    const leftBaseX = sb + stem;
    const leftTopX = apexX - stem / 2;
    builder.moveTo(leftBaseX, baseY);
    builder.lineTo(leftTopX, apexY);
    builder.lineTo(leftTopX + stem, apexY);
    builder.lineTo(leftBaseX + stem, baseY);
    builder.closePath();

    // Right diagonal
    const rightBaseX = width - sb - stem;
    const rightTopX = apexX + stem / 2;
    builder.moveTo(rightBaseX, baseY);
    builder.lineTo(rightTopX, apexY);
    builder.lineTo(rightTopX - stem, apexY);
    builder.lineTo(rightBaseX - stem, baseY);
    builder.closePath();

    // Crossbar
    const crossbarY = capHeight * 0.35;
    const barLeft = leftBaseX + (leftTopX - leftBaseX) * (crossbarY / apexY);
    const barRight = rightBaseX - (rightBaseX - rightTopX) * (crossbarY / apexY);
    builder.hStem(barLeft - stem / 2, crossbarY, barRight - barLeft + stem, stem);

    A.advanceWidth = width;
    return builder.build();
  },
};

// B — Two bowls, vertical stem
export const B: GlyphDefinition = {
  unicode: 0x0042,
  name: 'B',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.75 + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Upper bowl (squarish)
    const bowlRx = (width - sb * 2 - stem * 2) / 2;
    const bowlRy = (capHeight / 2 - stem) / 2;
    const cx = sb + stem + bowlRx;
    const cy = capHeight * 0.75;
    const k = 0.5522847498;

    builder
      .moveTo(cx + bowlRx * 0.3, cy - bowlRy)
      .curveTo(cx + bowlRx, cy - bowlRy * k, cx + bowlRx, cy + bowlRy * k, cx + bowlRx * 0.3, cy + bowlRy);
    builder.lineTo(sb + stem, cy + bowlRy);
    builder.lineTo(sb + stem, cy - bowlRy);
    builder.closePath();

    // Lower bowl
    const cy2 = capHeight * 0.25;
    builder
      .moveTo(cx + bowlRx * 0.3, cy2 - bowlRy)
      .curveTo(cx + bowlRx, cy2 - bowlRy * k, cx + bowlRx, cy2 + bowlRy * k, cx + bowlRx * 0.3, cy2 + bowlRy);
    builder.lineTo(sb + stem, cy2 + bowlRy);
    builder.lineTo(sb + stem, cy2 - bowlRy);
    builder.closePath();

    B.advanceWidth = width;
    return builder.build();
  },
};

// D — Left stem, right bowl (closed stroke)
export const D: GlyphDefinition = {
  unicode: 0x0044,
  name: 'D',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlW = capHeight * 0.88;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = capHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.85;

    // Left stem as rectangle
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, capHeight);
    builder.lineTo(sb, capHeight);
    builder.closePath();

    // Right bowl outer (squarish, open on left)
    builder.moveTo(sb + stem, cy - ry);
    builder.curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * flatten, cy + ry);
    builder.curveTo(cx, cy + ry, sb + stem + rx * 0.3, cy + ry, sb + stem, cy + ry * 0.6);

    // Right bowl inner
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder.lineTo(sb + stem, cy + innerRy * 0.6);
    builder.curveTo(sb + stem + innerRx * 0.3, cy + innerRy, cx, cy + innerRy, cx + innerRx * flatten, cy + innerRy);
    builder.curveTo(cx + innerRx, cy + innerRy * k, cx + innerRx, cy - innerRy * k, cx + innerRx * flatten, cy - innerRy);
    builder.lineTo(sb + stem, cy - innerRy);
    builder.closePath();

    D.advanceWidth = fullWidth;
    return builder.build();
  },
};

// E — Three horizontal bars
export const E: GlyphDefinition = {
  unicode: 0x0045,
  name: 'E',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.75 + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Top bar
    builder.hStem(sb + stem / 2, capHeight - stem / 2, width - sb * 2 - stem, stem);
    // Middle bar (slightly higher)
    builder.hStem(sb + stem / 2, capHeight * 0.52, width - sb * 2 - stem * 1.5, stem);
    // Bottom bar
    builder.hStem(sb + stem / 2, stem / 2, width - sb * 2 - stem, stem);

    E.advanceWidth = width;
    return builder.build();
  },
};

// F — Two horizontal bars, no bottom
export const F: GlyphDefinition = {
  unicode: 0x0046,
  name: 'F',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.7 + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Top bar
    builder.hStem(sb + stem / 2, capHeight - stem / 2, width - sb * 2 - stem, stem);
    // Middle bar
    builder.hStem(sb + stem / 2, capHeight * 0.52, width - sb * 2 - stem * 1.5, stem);

    F.advanceWidth = width;
    return builder.build();
  },
};

// I — Simple vertical stem
export const I: GlyphDefinition = {
  unicode: 0x0049,
  name: 'I',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = stem * 2 + sb * 2;

    builder.vStem(width / 2, round, capHeight - round * 2, stem);
    builder.hStem(width / 2 - stem / 2, round, stem, stem);
    builder.hStem(width / 2 - stem / 2, capHeight - stem - round, stem, stem);

    I.advanceWidth = width;
    return builder.build();
  },
};

// J — Hook shape with closed contour
export const J: GlyphDefinition = {
  unicode: 0x004a,
  name: 'J',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const width = capHeight * 0.55 + sb * 2;
    const stemX = width - sb - stem;
    const hookY = descender * 0.6;
    const k = 0.5522847498;

    // Vertical stem (top to bottom hook)
    builder.moveTo(stemX, capHeight);
    builder.lineTo(stemX + stem, capHeight);
    builder.lineTo(stemX + stem, hookY + stem * 2);

    // Hook curve outer
    const hookR = stem * 2.5;
    builder.curveTo(stemX + stem, hookY + hookR * k, stemX + stem - hookR * k, hookY + hookR, stemX + stem - hookR, hookY + hookR);
    builder.lineTo(stemX + stem - hookR, hookY);

    // Hook inner
    const innerR = hookR - stem;
    builder.lineTo(stemX + stem - hookR + stem, hookY);
    builder.curveTo(stemX + stem - hookR + stem + innerR * k, hookY, stemX + stem, hookY + innerR * k, stemX + stem, hookY + stem * 2 - stem);
    builder.lineTo(stemX, hookY + stem);
    builder.closePath();

    J.advanceWidth = width;
    return builder.build();
  },
};

// K — Diagonal legs
export const K: GlyphDefinition = {
  unicode: 0x004b,
  name: 'K',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.75 + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Upper diagonal
    const midY = capHeight * 0.55;
    const midX = sb + stem * 2;
    builder.moveTo(midX - stem / 2, midY);
    builder.lineTo(width - sb - stem, capHeight - round);
    builder.lineTo(width - sb, capHeight - round);
    builder.lineTo(midX + stem / 2, midY);
    builder.closePath();

    // Lower diagonal
    builder.moveTo(midX - stem / 2, midY);
    builder.lineTo(width - sb - stem, round);
    builder.lineTo(width - sb, round);
    builder.lineTo(midX + stem / 2, midY);
    builder.closePath();

    K.advanceWidth = width;
    return builder.build();
  },
};

// L — Vertical + horizontal base
export const L: GlyphDefinition = {
  unicode: 0x004c,
  name: 'L',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.75 + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Base bar
    builder.hStem(sb + stem / 2, stem / 2, width - sb * 2 - stem, stem);

    L.advanceWidth = width;
    return builder.build();
  },
};

// M — Four diagonal stems
export const M: GlyphDefinition = {
  unicode: 0x004d,
  name: 'M',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 1.1 + sb * 2;

    // Left outer stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Right outer stem
    builder.vStem(width - sb - stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(width - sb - stem * 1.5, round, stem, stem);
    builder.hStem(width - sb - stem * 1.5, capHeight - stem - round, stem, stem);

    // Inner V shape — apex at optical center (50%)
    const midX = width / 2;
    const midY = capHeight * 0.45; // Optical center for balance
    const innerLeftX = sb + stem * 3;
    const innerRightX = width - sb - stem * 3;

    builder.moveTo(innerLeftX - stem / 2, capHeight - round);
    builder.lineTo(midX - stem / 2, midY);
    builder.lineTo(midX + stem / 2, midY);
    builder.lineTo(innerLeftX + stem / 2, capHeight - round);
    builder.closePath();

    builder.moveTo(innerRightX + stem / 2, capHeight - round);
    builder.lineTo(midX + stem / 2, midY);
    builder.lineTo(midX - stem / 2, midY);
    builder.lineTo(innerRightX - stem / 2, capHeight - round);
    builder.closePath();

    M.advanceWidth = width;
    return builder.build();
  },
};

// N — Diagonal connection
export const N: GlyphDefinition = {
  unicode: 0x004e,
  name: 'N',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.9 + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Right stem
    builder.vStem(width - sb - stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(width - sb - stem * 1.5, round, stem, stem);
    builder.hStem(width - sb - stem * 1.5, capHeight - stem - round, stem, stem);

    // Diagonal
    builder.moveTo(sb + stem * 1.5, capHeight - round);
    builder.lineTo(width - sb - stem * 1.5, round);
    builder.lineTo(width - sb - stem * 0.5, round);
    builder.lineTo(sb + stem * 2.5, capHeight - round);
    builder.closePath();

    N.advanceWidth = width;
    return builder.build();
  },
};

// P — Left stem, upper bowl
export const P: GlyphDefinition = {
  unicode: 0x0050,
  name: 'P',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const bowlW = capHeight * 0.7;
    const fullWidth = bowlW + sb * 2;

    // Left stem (full height)
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Upper bowl (squarish)
    const bowlRx = (fullWidth - sb * 2 - stem * 2) / 2;
    const bowlRy = (capHeight * 0.6) / 2;
    const cx = sb + stem + bowlRx;
    const cy = capHeight * 0.7;
    const k = 0.5522847498;

    builder
      .moveTo(sb + stem, cy - bowlRy)
      .lineTo(cx + bowlRx * 0.3, cy - bowlRy)
      .curveTo(cx + bowlRx, cy - bowlRy * k, cx + bowlRx, cy + bowlRy * k, cx + bowlRx * 0.3, cy + bowlRy);
    builder.lineTo(sb + stem, cy + bowlRy);
    builder.closePath();

    P.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Q — O with tail (closed contour)
export const Q: GlyphDefinition = {
  unicode: 0x0051,
  name: 'Q',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;
    const overshoot = p.overshoot;

    // Same as O proportions
    const bowlW = capHeight * 0.92;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = capHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.85;

    // O outer
    builder
      .moveTo(cx + rx * flatten, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * flatten, cy + ry)
      .curveTo(cx + rx * k, cy + ry, cx - rx * 0.3, cy + ry, cx - rx * flatten, cy + ry)
      .curveTo(cx - rx, cy + ry * k, cx - rx, cy - ry * k, cx - rx * flatten, cy - ry)
      .curveTo(cx - rx * k, cy - ry, cx + rx * 0.3, cy - ry, cx + rx * flatten, cy - ry)
      .closePath();

    // O inner (counter)
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(cx + innerRx * flatten, cy - innerRy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx, cy + innerRy * k, cx + innerRx * flatten, cy + innerRy)
      .curveTo(cx + innerRx * k, cy + innerRy, cx - innerRx * 0.3, cy + innerRy, cx - innerRx * flatten, cy + innerRy)
      .curveTo(cx - innerRx, cy + innerRy * k, cx - innerRx, cy - innerRy * k, cx - innerRx * flatten, cy - innerRy)
      .curveTo(cx - innerRx * k, cy - innerRy, cx + innerRx * 0.3, cy - innerRy, cx + innerRx * flatten, cy - innerRy)
      .closePath();

    // Tail (slanted line descending from bottom right)
    const tailStartX = cx + rx * 0.6;
    const tailStartY = cy + ry * 0.4;
    const tailEndX = tailStartX + stem;
    const tailEndY = tailStartY + Math.abs(descender) * 0.6;

    builder.moveTo(tailStartX, tailStartY);
    builder.lineTo(tailStartX + stem * 0.8, tailStartY - stem * 0.3);
    builder.lineTo(tailEndX + stem * 0.5, tailEndY);
    builder.lineTo(tailEndX - stem * 0.3, tailEndY + stem);
    builder.lineTo(tailStartX - stem * 0.3, tailStartY + stem * 0.5);
    builder.closePath();

    Q.advanceWidth = fullWidth;
    return builder.build();
  },
};

// R — P with leg (closed contours)
export const R: GlyphDefinition = {
  unicode: 0x0052,
  name: 'R',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const bowlW = capHeight * 0.72;
    const fullWidth = bowlW + sb * 2;

    // Left stem (full height)
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, capHeight);
    builder.lineTo(sb, capHeight);
    builder.closePath();

    // Upper bowl outer
    const bowlRx = (fullWidth - sb * 2 - stem * 2) / 2;
    const bowlRy = (capHeight * 0.58) / 2;
    const cx = sb + stem + bowlRx;
    const cy = capHeight * 0.68;
    const k = 0.5522847498;

    builder
      .moveTo(sb + stem, cy - bowlRy)
      .lineTo(cx + bowlRx * 0.3, cy - bowlRy)
      .curveTo(cx + bowlRx, cy - bowlRy * k, cx + bowlRx, cy + bowlRy * k, cx + bowlRx * 0.3, cy + bowlRy);
    builder.lineTo(sb + stem, cy + bowlRy);
    builder.closePath();

    // Upper bowl inner (counter)
    const innerRx = bowlRx - stem;
    const innerRy = bowlRy - stem;
    builder
      .moveTo(sb + stem * 2, cy - innerRy)
      .lineTo(cx + innerRx * 0.3, cy - innerRy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx, cy + innerRy * k, cx + innerRx * 0.3, cy + innerRy);
    builder.lineTo(sb + stem * 2, cy + innerRy);
    builder.closePath();

    // Leg (diagonal from bowl to baseline)
    const legStartX = sb + stem + bowlRx * 0.75;
    const legStartY = cy + bowlRy * 0.3;
    const legEndX = fullWidth - sb - stem;
    const legEndY = stem;

    builder.moveTo(legStartX, legStartY);
    builder.lineTo(legStartX + stem * 0.7, legStartY - stem * 0.3);
    builder.lineTo(legEndX + stem, legEndY);
    builder.lineTo(legEndX, legEndY + stem);
    builder.lineTo(legStartX - stem * 0.3, legStartY + stem);
    builder.closePath();

    R.advanceWidth = fullWidth;
    return builder.build();
  },
};

// S — Two bowls with horizontal terminals, stroke geometry
export const S: GlyphDefinition = {
  unicode: 0x0053,
  name: 'S',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.72 + sb * 2;
    const cx = width / 2;
    const k = 0.5522847498;

    // Upper bowl dimensions
    const upperRx = (width - sb * 2 - stem * 1.5) / 2;
    const upperRy = (capHeight * 0.45 - stem) / 2 + overshoot * 0.5;
    const upperCy = capHeight - upperRy - stem / 2;

    // Lower bowl dimensions  
    const lowerRx = upperRx;
    const lowerRy = (capHeight * 0.45 - stem) / 2 + overshoot * 0.5;
    const lowerCy = lowerRy + stem / 2;

    // Upper bowl (opens on right)
    const topY = capHeight;
    const waistY = capHeight * 0.52;

    // Upper bowl outer - starts from top, goes around to waist
    builder
      .moveTo(cx - upperRx * 0.3, topY)
      .curveTo(cx - upperRx, topY, cx - upperRx, upperCy, cx - upperRx * 0.5, upperCy - upperRy * 0.3)
      .curveTo(cx, upperCy - upperRy, cx + upperRx * 0.5, upperCy - upperRy, cx + upperRx * 0.8, upperCy);
    builder.lineTo(cx + upperRx * 0.5, waistY);

    // Upper bowl inner
    const innerUpperRx = upperRx - stem;
    const innerUpperRy = upperRy - stem;
    builder
      .lineTo(cx + innerUpperRx * 0.6, waistY)
      .curveTo(cx + innerUpperRx, upperCy, cx, upperCy - innerUpperRy, cx - innerUpperRx * 0.5, upperCy - innerUpperRy * 0.3)
      .curveTo(cx - innerUpperRx, upperCy, cx - innerUpperRx, topY, cx - innerUpperRx * 0.3, topY);
    builder.lineTo(cx - upperRx * 0.3 + stem, topY);
    builder.closePath();

    // Lower bowl (opens on left, connects at waist)
    const botY = 0;

    // Lower bowl outer
    builder
      .moveTo(cx + lowerRx * 0.3, botY)
      .curveTo(cx + lowerRx, botY, cx + lowerRx, lowerCy, cx + lowerRx * 0.5, lowerCy + lowerRy * 0.3)
      .curveTo(cx, lowerCy + lowerRy, cx - lowerRx * 0.5, lowerCy + lowerRy, cx - lowerRx * 0.8, lowerCy);
    builder.lineTo(cx - lowerRx * 0.5, waistY);

    // Lower bowl inner
    const innerLowerRx = lowerRx - stem;
    const innerLowerRy = lowerRy - stem;
    builder
      .lineTo(cx - innerLowerRx * 0.6, waistY)
      .curveTo(cx - innerLowerRx, lowerCy, cx, lowerCy + innerLowerRy, cx + innerLowerRx * 0.5, lowerCy + innerLowerRy * 0.3)
      .curveTo(cx + innerLowerRx, lowerCy, cx + innerLowerRx, botY, cx + innerLowerRx * 0.3, botY);
    builder.lineTo(cx + lowerRx * 0.3 - stem, botY);
    builder.closePath();

    S.advanceWidth = width;
    return builder.build();
  },
};

// T — Top bar + center stem
export const T: GlyphDefinition = {
  unicode: 0x0054,
  name: 'T',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.85 + sb * 2;

    // Top bar
    builder.hStem(sb + stem / 2, capHeight - stem / 2, width - sb * 2 - stem, stem);

    // Center stem
    builder.vStem(width / 2, round, capHeight - stem - round * 2, stem);
    builder.hStem(width / 2 - stem / 2, round, stem, stem);

    T.advanceWidth = width;
    return builder.build();
  },
};

// U — Bowl shape, no left stem at baseline
export const U: GlyphDefinition = {
  unicode: 0x0055,
  name: 'U',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const bowlW = capHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Left stem (top only)
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Right stem (top only)
    builder.vStem(fullWidth - sb - stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(fullWidth - sb - stem * 1.5, capHeight - stem - round, stem, stem);

    // Bottom curve connecting stems
    builder
      .moveTo(sb + stem, cy)
      .curveTo(sb + stem, cy - rx * k, cx - rx * flatten, stem, cx, stem)
      .curveTo(cx + rx * flatten, stem, fullWidth - sb - stem, cy - rx * k, fullWidth - sb - stem, cy);

    U.advanceWidth = fullWidth;
    return builder.build();
  },
};

// V — Two diagonals meeting at bottom
export const V: GlyphDefinition = {
  unicode: 0x0056,
  name: 'V',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.9 + sb * 2;
    const apexX = width / 2;
    const apexY = 0;

    // Left diagonal
    const leftTopX = sb + stem;
    builder.moveTo(leftTopX, capHeight - round);
    builder.lineTo(apexX - stem / 2, apexY);
    builder.lineTo(apexX + stem / 2, apexY);
    builder.lineTo(leftTopX + stem, capHeight - round);
    builder.closePath();

    // Right diagonal
    const rightTopX = width - sb - stem;
    builder.moveTo(rightTopX, capHeight - round);
    builder.lineTo(apexX + stem / 2, apexY);
    builder.lineTo(apexX - stem / 2, apexY);
    builder.lineTo(rightTopX - stem, capHeight - round);
    builder.closePath();

    V.advanceWidth = width;
    return builder.build();
  },
};

// W — Double V with consistent stroke width
export const W: GlyphDefinition = {
  unicode: 0x0057,
  name: 'W',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const width = capHeight * 1.25 + sb * 2;
    const apexY = stem;
    const topY = capHeight;
    
    const leftX = sb;
    const midLeftX = width * 0.28;
    const centerX = width * 0.5;
    const midRightX = width * 0.72;
    const rightX = width - sb;

    // First left diagonal (left outer)
    builder.moveTo(leftX, topY);
    builder.lineTo(leftX + stem, topY);
    builder.lineTo(midLeftX + stem / 2, apexY);
    builder.lineTo(midLeftX - stem / 2, apexY);
    builder.closePath();

    // Second diagonal (inner left going up)
    builder.moveTo(midLeftX - stem / 2, apexY);
    builder.lineTo(midLeftX + stem / 2, apexY);
    builder.lineTo(centerX + stem / 2, topY * 0.45);
    builder.lineTo(centerX - stem / 2, topY * 0.45);
    builder.closePath();

    // Third diagonal (inner right going down)
    builder.moveTo(centerX - stem / 2, topY * 0.45);
    builder.lineTo(centerX + stem / 2, topY * 0.45);
    builder.lineTo(midRightX + stem / 2, apexY);
    builder.lineTo(midRightX - stem / 2, apexY);
    builder.closePath();

    // Fourth diagonal (right outer going up)
    builder.moveTo(midRightX - stem / 2, apexY);
    builder.lineTo(midRightX + stem / 2, apexY);
    builder.lineTo(rightX - stem, topY);
    builder.lineTo(rightX, topY);
    builder.closePath();

    W.advanceWidth = width;
    return builder.build();
  },
};

// X — Two crossing diagonals
export const X: GlyphDefinition = {
  unicode: 0x0058,
  name: 'X',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.85 + sb * 2;

    // First diagonal (top-left to bottom-right)
    builder.moveTo(sb + stem / 2, capHeight - round);
    builder.lineTo(width / 2 - stem / 2, capHeight / 2);
    builder.lineTo(width / 2 + stem / 2, capHeight / 2);
    builder.lineTo(sb + stem * 1.5, capHeight - round);
    builder.closePath();

    builder.moveTo(width - sb - stem / 2, round);
    builder.lineTo(width / 2 + stem / 2, capHeight / 2);
    builder.lineTo(width / 2 - stem / 2, capHeight / 2);
    builder.lineTo(width - sb - stem * 1.5, round);
    builder.closePath();

    // Second diagonal (top-right to bottom-left)
    builder.moveTo(width - sb - stem / 2, capHeight - round);
    builder.lineTo(width / 2 + stem / 2, capHeight / 2);
    builder.lineTo(width / 2 - stem / 2, capHeight / 2);
    builder.lineTo(width - sb - stem * 1.5, capHeight - round);
    builder.closePath();

    builder.moveTo(sb + stem / 2, round);
    builder.lineTo(width / 2 - stem / 2, capHeight / 2);
    builder.lineTo(width / 2 + stem / 2, capHeight / 2);
    builder.lineTo(sb + stem * 1.5, round);
    builder.closePath();

    X.advanceWidth = width;
    return builder.build();
  },
};

// Y — V with stem
export const Y: GlyphDefinition = {
  unicode: 0x0059,
  name: 'Y',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.85 + sb * 2;
    const midY = capHeight * 0.5;
    const apexX = width / 2;

    // Upper left diagonal
    builder.moveTo(sb + stem, capHeight - round);
    builder.lineTo(apexX - stem / 2, midY);
    builder.lineTo(apexX + stem / 2, midY);
    builder.lineTo(sb + stem * 2, capHeight - round);
    builder.closePath();

    // Upper right diagonal
    builder.moveTo(width - sb - stem, capHeight - round);
    builder.lineTo(apexX + stem / 2, midY);
    builder.lineTo(apexX - stem / 2, midY);
    builder.lineTo(width - sb - stem * 2, capHeight - round);
    builder.closePath();

    // Lower stem
    builder.vStem(width / 2, round, midY - round * 2, stem);
    builder.hStem(width / 2 - stem / 2, round, stem, stem);

    Y.advanceWidth = width;
    return builder.build();
  },
};

// Z — Horizontal-diagonal-horizontal
export const Z: GlyphDefinition = {
  unicode: 0x005a,
  name: 'Z',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 0.8 + sb * 2;

    // Top bar
    builder.hStem(sb + stem / 2, capHeight - stem / 2, width - sb * 2 - stem, stem);

    // Diagonal
    builder.moveTo(sb + stem / 2, capHeight - stem);
    builder.lineTo(width - sb - stem, round);
    builder.lineTo(width - sb, round);
    builder.lineTo(sb + stem * 1.5, capHeight - stem);
    builder.closePath();

    // Bottom bar
    builder.hStem(sb + stem / 2, stem / 2, width - sb * 2 - stem, stem);

    Z.advanceWidth = width;
    return builder.build();
  },
};

// Export all uppercase
export const uppercase: GlyphDefinition[] = [
  A, B, C, D, E, F, G, H, I, J, K, L, M,
  N, O, P, Q, R, S, T, U, V, W, X, Y, Z
];
