// Uppercase latin glyphs — Brockmann style
// Josef Müller-Brockmann inspired: square proportions, open apertures, subtle rounding

import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// H — Geometric sans, crossbar at optical center
export const H: GlyphDefinition = {
  unicode: 0x0048,
  name: 'H',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const innerSpace = stem * 2.8;
    const width = sb * 2 + stem * 2 + innerSpace;

    // Left stem with subtle terminal rounding
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    // Top/bottom serifs (rounded caps)
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Right stem
    builder.vStem(width - sb - stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(width - sb - stem * 1.5, round, stem, stem);
    builder.hStem(width - sb - stem * 1.5, capHeight - stem - round, stem, stem);

    // Crossbar at optical center (slightly above geometric center)
    const crossbarY = capHeight * 0.52;
    builder.hStem(sb + stem / 2, crossbarY, width - sb * 2 - stem, stem);

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

// D — Left stem, right bowl
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
    const round = p.terminalRound || 4;

    const bowlW = capHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = capHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.85;

    // Left stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Right bowl (open on left)
    builder
      .moveTo(cx + rx * flatten, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * flatten, cy + ry)
      .curveTo(cx + rx * k, cy + ry, cx, cy + ry, cx - rx * flatten * 0.5, cy + ry)
      .lineTo(sb + stem * 1.5, cy + ry * 0.8);

    // Inner counter
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder.lineTo(sb + stem * 1.5, cy - innerRy * 0.8);
    builder.lineTo(cx - innerRx * flatten * 0.5, cy - innerRy);
    builder
      .curveTo(cx + innerRx * k, cy - innerRy, cx + innerRx, cy - innerRy * k, cx + innerRx * flatten, cy - innerRy)
      .curveTo(cx + innerRx, cy, cx + innerRx, cy, cx + innerRx * flatten, cy);
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

// J — Hook shape
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
    const round = p.terminalRound || 4;

    const width = capHeight * 0.5 + sb * 2;
    const stemX = width - sb - stem / 2;

    // Vertical stem with descender hook
    builder.vStem(stemX, descender * 0.3, capHeight - round * 2, stem);
    builder.hStem(stemX - stem / 2, capHeight - stem - round, stem, stem);

    // Bottom hook curve
    const hookDepth = Math.abs(descender) * 0.7;
    const cx = stemX - hookDepth / 2;
    const cy = descender * 0.3;
    const r = hookDepth / 2;
    const k = 0.5522847498;

    builder
      .moveTo(stemX - stem / 2, cy)
      .curveTo(stemX - stem / 2 - r * k, cy, stemX - stem / 2 - r, cy + r * k, stemX - stem / 2 - r, cy + r)
      .lineTo(stemX - stem / 2 - r, cy + hookDepth);

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

    // Inner V shape
    const midX = width / 2;
    const midY = capHeight * 0.3;
    const innerLeftX = sb + stem * 3;
    const innerRightX = width - sb - stem * 3;

    builder.moveTo(innerLeftX - stem / 2, capHeight);
    builder.lineTo(midX - stem / 2, midY);
    builder.lineTo(midX + stem / 2, midY);
    builder.lineTo(innerLeftX + stem / 2, capHeight);
    builder.closePath();

    builder.moveTo(innerRightX + stem / 2, capHeight);
    builder.lineTo(midX + stem / 2, midY);
    builder.lineTo(midX - stem / 2, midY);
    builder.lineTo(innerRightX - stem / 2, capHeight);
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

// Q — O with tail
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

    // Start with O shape
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

    // O inner
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(cx + innerRx * flatten, cy - innerRy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx, cy + innerRy * k, cx + innerRx * flatten, cy + innerRy)
      .curveTo(cx + innerRx * k, cy + innerRy, cx - innerRx * 0.3, cy + innerRy, cx - innerRx * flatten, cy + innerRy)
      .curveTo(cx - innerRx, cy + innerRy * k, cx - innerRx, cy - innerRy * k, cx - innerRx * flatten, cy - innerRy)
      .curveTo(cx - innerRx * k, cy - innerRy, cx + innerRx * 0.3, cy - innerRy, cx + innerRx * flatten, cy - innerRy)
      .closePath();

    // Tail
    const tailStartX = cx + rx * 0.5;
    const tailStartY = cy + ry * 0.5;
    builder.moveTo(tailStartX, tailStartY);
    builder.lineTo(tailStartX + stem * 2, tailStartY + Math.abs(descender) * 0.5);
    builder.lineTo(tailStartX + stem * 2 + stem, tailStartY + Math.abs(descender) * 0.5 - stem);
    builder.lineTo(tailStartX + stem, tailStartY);
    builder.closePath();

    Q.advanceWidth = fullWidth;
    return builder.build();
  },
};

// R — P with leg
export const R: GlyphDefinition = {
  unicode: 0x0052,
  name: 'R',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const bowlW = capHeight * 0.75;
    const fullWidth = bowlW + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, capHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, capHeight - stem - round, stem, stem);

    // Upper bowl
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

    // Leg
    const legStartX = sb + stem + bowlRx * 0.8;
    const legStartY = cy;
    builder.moveTo(legStartX, legStartY);
    builder.lineTo(fullWidth - sb - stem, round);
    builder.lineTo(fullWidth - sb, round);
    builder.lineTo(legStartX + stem, legStartY);
    builder.closePath();

    R.advanceWidth = fullWidth;
    return builder.build();
  },
};

// S — S-curve, balanced
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

    const width = capHeight * 0.8 + sb * 2;
    const cx = width / 2;
    const cy = capHeight / 2;
    const k = 0.5522847498;

    // Upper bowl
    const topY = capHeight - stem / 2;
    const midY = capHeight / 2;
    const botY = stem / 2;

    builder
      .moveTo(cx, topY)
      .curveTo(cx + (width - sb * 2) / 2 * k, topY, cx + (width - sb * 2) / 2, topY - (topY - midY) * k, cx + (width - sb * 2) / 2, midY);

    // Lower bowl
    builder
      .curveTo(cx + (width - sb * 2) / 2, midY - (midY - botY) * k, cx + (width - sb * 2) / 2 * k, botY, cx, botY)
      .curveTo(cx - (width - sb * 2) / 2 * k, botY, cx - (width - sb * 2) / 2, botY + (midY - botY) * k, cx - (width - sb * 2) / 2, midY)
      .curveTo(cx - (width - sb * 2) / 2, midY + (topY - midY) * k, cx - (width - sb * 2) / 2 * k, topY, cx, topY);

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

// W — Double V
export const W: GlyphDefinition = {
  unicode: 0x0057,
  name: 'W',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const round = p.terminalRound || 4;

    const width = capHeight * 1.3 + sb * 2;
    const midX1 = width * 0.25;
    const midX2 = width * 0.75;
    const apexY = 0;

    // First left diagonal
    builder.moveTo(sb + stem, capHeight - round);
    builder.lineTo(midX1 - stem / 2, apexY);
    builder.lineTo(midX1 + stem / 2, apexY);
    builder.lineTo(sb + stem * 2, capHeight - round);
    builder.closePath();

    // Inner left diagonal (up)
    builder.moveTo(midX1 + stem / 2, apexY);
    builder.lineTo(width / 2 - stem / 2, capHeight * 0.5);
    builder.lineTo(width / 2 + stem / 2, capHeight * 0.5);
    builder.lineTo(midX1 - stem / 2, apexY);
    builder.closePath();

    // Inner right diagonal (down)
    builder.moveTo(width / 2 + stem / 2, capHeight * 0.5);
    builder.lineTo(midX2 - stem / 2, apexY);
    builder.lineTo(midX2 + stem / 2, apexY);
    builder.lineTo(width / 2 - stem / 2, capHeight * 0.5);
    builder.closePath();

    // Final right diagonal (up)
    builder.moveTo(midX2 + stem / 2, apexY);
    builder.lineTo(width - sb - stem, capHeight - round);
    builder.lineTo(width - sb, capHeight - round);
    builder.lineTo(midX2 - stem / 2, apexY);
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
