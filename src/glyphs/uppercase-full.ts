import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Complete uppercase latin alphabet
// Geometric construction following Swiss principles

// A - triangle with crossbar
export const A: GlyphDefinition = {
  unicode: 0x0041,
  name: 'A',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 6;
    const apexX = fullWidth / 2;
    const apexY = capHeight;

    // Left diagonal
    builder.moveTo(sb + stem / 2, 0);
    builder.lineTo(sb + stem * 1.5, 0);
    builder.lineTo(apexX - stem / 4, apexY - stem / 2);
    builder.lineTo(apexX - stem, apexY);
    builder.closePath();

    // Right diagonal
    builder.moveTo(fullWidth - sb - stem / 2, 0);
    builder.lineTo(fullWidth - sb - stem * 1.5, 0);
    builder.lineTo(apexX + stem / 4, apexY - stem / 2);
    builder.lineTo(apexX + stem, apexY);
    builder.closePath();

    // Crossbar
    const crossbarY = capHeight * 0.35;
    const crossbarWidth = (fullWidth - sb * 2) * 0.5;
    builder.hStem(apexX - crossbarWidth / 2, crossbarY, crossbarWidth, stem);

    A.advanceWidth = fullWidth;
    return builder.build();
  },
};

// B - stem with two bowls
export const B: GlyphDefinition = {
  unicode: 0x0042,
  name: 'B',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const stemX = sb + stem / 2;
    const bowlWidth = (capHeight - stem) * 0.45;
    const fullWidth = sb + stem + bowlWidth + sb;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Upper bowl
    const upperCy = capHeight * 0.75;
    const upperRy = capHeight * 0.22;
    const upperRx = bowlWidth * 0.9;
    const c = 0.5522847498;

    const outerRx1 = upperRx + stem / 2 + overshoot;
    const outerRy1 = upperRy + stem / 2 + overshoot;

    builder
      .moveTo(stemX + stem / 2, upperCy - outerRy1)
      .curveTo(stemX + stem / 2 + outerRx1 * c, upperCy - outerRy1, stemX + stem / 2 + outerRx1, upperCy - outerRy1 * c, stemX + stem / 2 + outerRx1, upperCy)
      .curveTo(stemX + stem / 2 + outerRx1, upperCy + outerRy1 * c, stemX + stem / 2 + outerRx1 * c, upperCy + outerRy1, stemX + stem / 2, upperCy + outerRy1);

    // Lower bowl
    const lowerCy = capHeight * 0.25;
    const lowerRy = capHeight * 0.22;
    const lowerRx = bowlWidth * 0.9;

    const outerRx2 = lowerRx + stem / 2 + overshoot;
    const outerRy2 = lowerRy + stem / 2 + overshoot;

    builder
      .moveTo(stemX + stem / 2, lowerCy - outerRy2)
      .curveTo(stemX + stem / 2 + outerRx2 * c, lowerCy - outerRy2, stemX + stem / 2 + outerRx2, lowerCy - outerRy2 * c, stemX + stem / 2 + outerRx2, lowerCy)
      .curveTo(stemX + stem / 2 + outerRx2, lowerCy + outerRy2 * c, stemX + stem / 2 + outerRx2 * c, lowerCy + outerRy2, stemX + stem / 2, lowerCy + outerRy2);

    B.advanceWidth = fullWidth;
    return builder.build();
  },
};

// C - open circle
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

    const width = capHeight * 0.9;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = width / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // C shape (open on right)
    builder
      .moveTo(cx + outerRx * 0.6, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx + outerRx * 0.6, cy + outerRy);

    builder.lineTo(cx + innerRx * 0.6, cy + innerRy);

    builder
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx + innerRx * 0.6, cy - innerRy);

    builder.closePath();

    // Cap ends
    builder.rect(cx + rx * 0.4, cy - outerRy - stem / 2, stem, stem);
    builder.rect(cx + rx * 0.4, cy + outerRy - stem / 2, stem, stem);

    C.advanceWidth = fullWidth;
    return builder.build();
  },
};

// D - stem with bowl
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

    const bowlWidth = capHeight * 0.9;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Bowl (outer)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    // Bowl (inner)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(stemX + stem / 2, cy + innerRy)
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    D.advanceWidth = fullWidth;
    return builder.build();
  },
};

// E - vertical stem with three horizontals
export const E: GlyphDefinition = {
  unicode: 0x0045,
  name: 'E',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(stemX, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Middle horizontal
    builder.hStem(stemX, capHeight * 0.5, (fullWidth - sb * 2 - stem) * 0.75, stem);

    // Bottom horizontal
    builder.hStem(stemX, stem / 2, fullWidth - sb * 2 - stem, stem);

    E.advanceWidth = fullWidth;
    return builder.build();
  },
};

// F - vertical stem with two horizontals
export const F: GlyphDefinition = {
  unicode: 0x0046,
  name: 'F',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(stemX, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Middle horizontal
    builder.hStem(stemX, capHeight * 0.5, (fullWidth - sb * 2 - stem) * 0.75, stem);

    F.advanceWidth = fullWidth;
    return builder.build();
  },
};

// G - C shape with crossbar
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

    const width = capHeight * 0.95;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = width / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Main bowl (C shape)
    builder
      .moveTo(cx + outerRx * 0.6, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx + outerRx * 0.6, cy + outerRy);

    builder.lineTo(cx + innerRx * 0.6, cy + innerRy);

    builder
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx + innerRx * 0.6, cy - innerRy);

    builder.closePath();

    // Horizontal crossbar
    const crossbarY = cy;
    const crossbarX = cx + rx * 0.3;
    builder.hStem(crossbarX, crossbarY, rx * 0.7, stem);

    // Cap top
    builder.rect(cx + rx * 0.4, cy - outerRy - stem / 2, stem, stem);

    G.advanceWidth = fullWidth;
    return builder.build();
  },
};

// H - vertical stems with crossbar
// Already defined in uppercase.ts

// I - simple vertical stem
export const I: GlyphDefinition = {
  unicode: 0x0049,
  name: 'I',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 2;
    const stemX = fullWidth / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top serif
    builder.hStem(stemX - stem, capHeight - stem / 2, stem * 3, stem);

    // Bottom serif
    builder.hStem(stemX - stem, stem / 2, stem * 3, stem);

    I.advanceWidth = fullWidth;
    return builder.build();
  },
};

// J - stem with curve
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
    const overshoot = p.overshoot;

    const fullWidth = sb * 2 + stem * 2;
    const stemX = sb + stem;

    // Vertical stem
    builder.vStem(stemX, descender, capHeight + Math.abs(descender), stem);

    // Curve at bottom
    const curveY = descender * 0.5;
    const curveX = stemX - stem * 1.5;

    builder
      .moveTo(stemX - stem / 2, curveY + stem)
      .curveTo(curveX, curveY + stem, curveX, curveY, curveX, curveY - stem / 2);

    J.advanceWidth = fullWidth;
    return builder.build();
  },
};

// K - vertical stem with diagonals
// Already defined in uppercase.ts (similar to lowercase k)

// L - vertical stem with horizontal
export const L: GlyphDefinition = {
  unicode: 0x004c,
  name: 'L',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Bottom horizontal
    builder.hStem(stemX, stem / 2, fullWidth - sb * 2 - stem, stem);

    L.advanceWidth = fullWidth;
    return builder.build();
  },
};

// M - four diagonals
export const M: GlyphDefinition = {
  unicode: 0x004d,
  name: 'M',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 6;
    const step = (fullWidth - sb * 2) / 4;

    const x1 = sb + stem / 2;
    const x2 = sb + step;
    const x3 = sb + step * 2;
    const x4 = sb + step * 3;
    const x5 = fullWidth - sb - stem / 2;

    // Left outer
    builder.moveTo(x1, 0);
    builder.lineTo(x1 + stem, 0);
    builder.lineTo(x3 - stem / 2, capHeight - stem);
    builder.lineTo(x3 - stem, capHeight);
    builder.closePath();

    // Left inner
    builder.moveTo(x2 + stem / 2, 0);
    builder.lineTo(x2 + stem, 0);
    builder.lineTo(x3, capHeight - stem * 1.5);
    builder.lineTo(x3 - stem / 2, capHeight - stem * 2);
    builder.closePath();

    // Right inner
    builder.moveTo(x4 - stem / 2, 0);
    builder.lineTo(x4, 0);
    builder.lineTo(x3 + stem / 2, capHeight - stem * 2);
    builder.lineTo(x3, capHeight - stem * 1.5);
    builder.closePath();

    // Right outer
    builder.moveTo(x5 - stem, 0);
    builder.lineTo(x5, 0);
    builder.lineTo(x3 + stem, capHeight);
    builder.lineTo(x3 + stem / 2, capHeight - stem);
    builder.closePath();

    M.advanceWidth = fullWidth;
    return builder.build();
  },
};

// N - vertical stems with diagonal
export const N: GlyphDefinition = {
  unicode: 0x004e,
  name: 'N',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // Left stem
    builder.vStem(leftX, 0, capHeight, stem);

    // Right stem
    builder.vStem(rightX, 0, capHeight, stem);

    // Diagonal
    builder.moveTo(leftX + stem / 2, capHeight);
    builder.lineTo(leftX + stem * 1.5, capHeight);
    builder.lineTo(rightX - stem / 2, 0);
    builder.lineTo(rightX - stem * 1.5, 0);
    builder.closePath();

    N.advanceWidth = fullWidth;
    return builder.build();
  },
};

// O - circle
// Already defined in uppercase.ts

// P - stem with bowl
export const P: GlyphDefinition = {
  unicode: 0x0050,
  name: 'P',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.9;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = capHeight * 0.7;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight * 0.3 - stem / 2;
    const c = 0.5522847498;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Upper bowl (outer)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    // Bowl (inner)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(stemX + stem / 2, cy + innerRy)
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    P.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Q - O with tail
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

    const width = capHeight * 0.9;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = width / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Circle (outer)
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Circle (inner counter)
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    // Tail (descending from bottom right)
    const tailStartX = cx + outerRx * 0.6;
    const tailStartY = cy - outerRy * 0.3;
    const tailEndX = cx;
    const tailEndY = descender * 0.5;

    builder.moveTo(tailStartX, tailStartY);
    builder.lineTo(tailStartX + stem, tailStartY - stem / 2);
    builder.lineTo(tailEndX + stem / 2, tailEndY);
    builder.lineTo(tailEndX - stem / 2, tailEndY + stem);
    builder.closePath();

    Q.advanceWidth = fullWidth;
    return builder.build();
  },
};

// R - P with leg
export const R: GlyphDefinition = {
  unicode: 0x0052,
  name: 'R',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.9;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = capHeight * 0.7;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight * 0.3 - stem / 2;
    const c = 0.5522847498;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Upper bowl (outer)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    // Bowl (inner)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(stemX + stem / 2, cy + innerRy)
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    // Diagonal leg
    const legStartX = stemX + stem / 2 + innerRx * 0.5;
    const legStartY = cy;
    const legEndX = fullWidth - sb - stem / 2;

    builder.moveTo(legStartX, legStartY);
    builder.lineTo(legStartX + stem, legStartY + stem / 2);
    builder.lineTo(legEndX, 0);
    builder.lineTo(legEndX - stem, 0);
    builder.closePath();

    R.advanceWidth = fullWidth;
    return builder.build();
  },
};

// S - double curve
export const S: GlyphDefinition = {
  unicode: 0x0053,
  name: 'S',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const width = capHeight * 0.75;
    const fullWidth = width + sb * 2;
    const c = 0.5522847498;

    // Upper curve
    const upperCy = capHeight * 0.75;
    const upperRy = capHeight * 0.22;

    // Lower curve
    const lowerCy = capHeight * 0.25;
    const lowerRy = capHeight * 0.22;

    // Draw simplified S
    const cx = fullWidth / 2;
    const rx = width / 2;

    builder.moveTo(fullWidth - sb - stem / 2, upperCy);
    builder.curveTo(
      cx + rx * c, upperCy,
      cx + rx, upperCy + stem * 0.5,
      cx + rx * 0.5, capHeight - stem / 2
    );

    builder.curveTo(
      cx, upperCy,
      cx, lowerCy,
      sb + stem / 2, lowerCy
    );

    builder.curveTo(
      cx - rx * c, lowerCy,
      cx - rx, lowerCy - stem * 0.5,
      cx - rx * 0.5, stem / 2
    );

    S.advanceWidth = fullWidth;
    return builder.build();
  },
};

// T - vertical with horizontal
export const T: GlyphDefinition = {
  unicode: 0x0054,
  name: 'T',
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

    // Top horizontal
    builder.hStem(sb + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    T.advanceWidth = fullWidth;
    return builder.build();
  },
};

// U - vertical stems with bottom curve
export const U: GlyphDefinition = {
  unicode: 0x0055,
  name: 'U',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const innerSpace = stem * 2.5;
    const fullWidth = sb * 2 + stem * 2 + innerSpace;

    const stem1X = sb + stem / 2;
    const stem2X = fullWidth - sb - stem / 2;

    // Two vertical stems
    builder.vStem(stem1X, stem / 2, capHeight - stem / 2, stem);
    builder.vStem(stem2X, stem / 2, capHeight - stem / 2, stem);

    // Bottom curve
    const cx = fullWidth / 2;
    const cy = stem / 2;
    const rx = innerSpace / 2 + stem / 2;
    const ry = stem;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;

    builder
      .moveTo(stem1X + stem / 2, cy + outerRy)
      .curveTo(stem1X + stem / 2 + outerRx * c, cy + outerRy, stem1X + stem / 2 + outerRx, cy + outerRy * c, stem1X + stem / 2 + outerRx, cy)
      .curveTo(stem1X + stem / 2 + outerRx, cy - outerRy * c, stem1X + stem / 2 + outerRx * c, cy - outerRy, stem1X + stem / 2, cy - outerRy);

    U.advanceWidth = fullWidth;
    return builder.build();
  },
};

// V - two diagonals
export const V: GlyphDefinition = {
  unicode: 0x0056,
  name: 'V',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;
    const apexX = fullWidth / 2;

    // Left diagonal
    builder.moveTo(leftX, capHeight);
    builder.lineTo(leftX + stem, capHeight);
    builder.lineTo(apexX, stem / 2);
    builder.lineTo(apexX - stem / 2, 0);
    builder.closePath();

    // Right diagonal
    builder.moveTo(rightX, capHeight);
    builder.lineTo(rightX - stem, capHeight);
    builder.lineTo(apexX, stem / 2);
    builder.lineTo(apexX + stem / 2, 0);
    builder.closePath();

    V.advanceWidth = fullWidth;
    return builder.build();
  },
};

// W - double V
export const W: GlyphDefinition = {
  unicode: 0x0057,
  name: 'W',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 8;
    const step = (fullWidth - sb * 2) / 4;

    const x1 = sb + stem / 2;
    const x2 = sb + step;
    const x3 = sb + step * 2;
    const x4 = sb + step * 3;
    const x5 = fullWidth - sb - stem / 2;

    const midY = capHeight * 0.5;

    // First V
    builder.moveTo(x1, capHeight);
    builder.lineTo(x1 + stem, capHeight);
    builder.lineTo(x2 + stem / 2, midY + stem);
    builder.lineTo(x2, midY);
    builder.closePath();

    builder.moveTo(x2 + stem, midY);
    builder.lineTo(x2 + stem * 1.5, midY + stem);
    builder.lineTo(x3 - stem / 2, stem);
    builder.lineTo(x3 - stem, 0);
    builder.closePath();

    // Second V
    builder.moveTo(x3, 0);
    builder.lineTo(x3 + stem / 2, stem);
    builder.lineTo(x4, midY + stem);
    builder.lineTo(x4 - stem / 2, midY);
    builder.closePath();

    builder.moveTo(x4 + stem / 2, midY);
    builder.lineTo(x4 + stem, midY + stem);
    builder.lineTo(x5 - stem, capHeight);
    builder.lineTo(x5, capHeight);
    builder.closePath();

    W.advanceWidth = fullWidth;
    return builder.build();
  },
};

// X - crossing diagonals
export const X: GlyphDefinition = {
  unicode: 0x0058,
  name: 'X',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // First diagonal
    builder.moveTo(leftX, capHeight);
    builder.lineTo(leftX + stem, capHeight);
    builder.lineTo(rightX, 0);
    builder.lineTo(rightX - stem, 0);
    builder.closePath();

    // Second diagonal
    builder.moveTo(rightX, capHeight);
    builder.lineTo(rightX - stem, capHeight);
    builder.lineTo(leftX, 0);
    builder.lineTo(leftX + stem, 0);
    builder.closePath();

    X.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Y - V with stem
export const Y: GlyphDefinition = {
  unicode: 0x0059,
  name: 'Y',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;
    const stemX = fullWidth / 2;

    // Upper diagonals
    builder.moveTo(leftX, capHeight);
    builder.lineTo(leftX + stem, capHeight);
    builder.lineTo(stemX, xHeight);
    builder.lineTo(stemX - stem / 2, xHeight - stem / 2);
    builder.closePath();

    builder.moveTo(rightX, capHeight);
    builder.lineTo(rightX - stem, capHeight);
    builder.lineTo(stemX, xHeight);
    builder.lineTo(stemX + stem / 2, xHeight - stem / 2);
    builder.closePath();

    // Lower stem
    builder.vStem(stemX, 0, xHeight, stem);

    Y.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Z - horizontal-diagonal-horizontal
export const Z: GlyphDefinition = {
  unicode: 0x005a,
  name: 'Z',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;

    // Top horizontal
    builder.hStem(sb + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Bottom horizontal
    builder.hStem(sb + stem / 2, stem / 2, fullWidth - sb * 2 - stem, stem);

    // Diagonal
    builder.moveTo(sb + stem / 2, capHeight - stem);
    builder.lineTo(sb + stem * 1.5, capHeight);
    builder.lineTo(fullWidth - sb - stem / 2, stem);
    builder.lineTo(fullWidth - sb - stem * 1.5, 0);
    builder.closePath();

    Z.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Export all additional uppercase
export const uppercaseFull: GlyphDefinition[] = [
  A, B, C, D, E, F, G, I, J, L, M, N, P, Q, R, S, T, U, V, W, X, Y, Z
];
