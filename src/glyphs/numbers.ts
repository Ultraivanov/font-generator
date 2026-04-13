import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Numbers 0-9
// Geometric construction, monospaced-friendly widths

// 0 - circle
export const zero: GlyphDefinition = {
  unicode: 0x0030,
  name: 'zero',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.85;
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

    // Outer circle
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

    // Diagonal cut for zero (distinguish from O)
    const cutWidth = stem * 0.8;
    builder.moveTo(cx - cutWidth, cy - ry * 0.5);
    builder.lineTo(cx + cutWidth, cy - ry * 0.5 - cutWidth);
    builder.lineTo(cx + cutWidth, cy + ry * 0.5);
    builder.lineTo(cx - cutWidth, cy + ry * 0.5 + cutWidth);
    builder.closePath();

    zero.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 1 - simple vertical with serif
export const one: GlyphDefinition = {
  unicode: 0x0031,
  name: 'one',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 2.5;
    const stemX = fullWidth / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top serif (angled)
    builder.moveTo(stemX - stem, capHeight);
    builder.lineTo(stemX + stem / 2, capHeight);
    builder.lineTo(stemX, capHeight - stem * 2);
    builder.closePath();

    // Base serif
    builder.hStem(stemX - stem, stem / 2, stem * 3, stem);

    one.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 2 - curved top, diagonal, horizontal base
export const two: GlyphDefinition = {
  unicode: 0x0032,
  name: 'two',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.8;
    const fullWidth = width + sb * 2;
    const c = 0.5522847498;

    const topRy = capHeight * 0.35;
    const topRx = width / 2 - stem;
    const cx = fullWidth / 2;
    const topCy = capHeight - topRy;

    // Upper curve
    const outerRx = topRx + stem / 2 + overshoot;
    const outerRy = topRy + stem / 2 + overshoot;

    builder
      .moveTo(sb + stem / 2, topCy)
      .curveTo(sb + stem / 2 + outerRx * c, topCy - outerRy, sb + stem / 2 + outerRx, topCy - outerRy * c, sb + stem / 2 + outerRx, topCy)
      .curveTo(sb + stem / 2 + outerRx, topCy + outerRy * c, sb + stem / 2 + outerRx * c, topCy + outerRy, sb + stem / 2, topCy + outerRy);

    // Diagonal to bottom
    builder.moveTo(sb + stem / 2, topCy + topRy);
    builder.lineTo(sb + stem * 1.5, topCy + topRy);
    builder.lineTo(fullWidth - sb - stem / 2, stem);
    builder.lineTo(fullWidth - sb - stem * 1.5, 0);
    builder.closePath();

    // Bottom horizontal
    builder.hStem(sb + stem / 2, stem / 2, fullWidth - sb * 2 - stem, stem);

    two.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 3 - two curves
export const three: GlyphDefinition = {
  unicode: 0x0033,
  name: 'three',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.75;
    const fullWidth = width + sb * 2;
    const c = 0.5522847498;

    const bowlHeight = capHeight * 0.45;
    const upperCy = capHeight - bowlHeight / 2;
    const lowerCy = bowlHeight / 2;
    const rx = width / 2 - stem;
    const ry = bowlHeight / 2 - stem / 2;

    // Upper bowl (left side open)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;

    builder
      .moveTo(fullWidth - sb - stem / 2, upperCy - outerRy)
      .curveTo(fullWidth - sb - stem / 2 - outerRx * c, upperCy - outerRy, fullWidth - sb - stem / 2 - outerRx, upperCy - outerRy * c, fullWidth - sb - stem / 2 - outerRx, upperCy)
      .curveTo(fullWidth - sb - stem / 2 - outerRx, upperCy + outerRy * c, fullWidth - sb - stem / 2 - outerRx * c, upperCy + outerRy, fullWidth - sb - stem / 2, upperCy + outerRy);

    // Lower bowl (left side open)
    builder
      .moveTo(fullWidth - sb - stem / 2, lowerCy - outerRy)
      .curveTo(fullWidth - sb - stem / 2 - outerRx * c, lowerCy - outerRy, fullWidth - sb - stem / 2 - outerRx, lowerCy - outerRy * c, fullWidth - sb - stem / 2 - outerRx, lowerCy)
      .curveTo(fullWidth - sb - stem / 2 - outerRx, lowerCy + outerRy * c, fullWidth - sb - stem / 2 - outerRx * c, lowerCy + outerRy, fullWidth - sb - stem / 2, lowerCy + outerRy);

    three.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 4 - vertical stem with crossbar
export const four: GlyphDefinition = {
  unicode: 0x0034,
  name: 'four',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = fullWidth - sb - stem * 1.5;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Horizontal crossbar
    builder.hStem(sb + stem / 2, xHeight * 0.55, fullWidth - sb * 2 - stem * 2, stem);

    // Diagonal from top left
    builder.moveTo(sb + stem / 2, capHeight);
    builder.lineTo(sb + stem * 1.5, capHeight);
    builder.lineTo(stemX - stem, xHeight * 0.55 + stem / 2);
    builder.lineTo(stemX - stem * 2, xHeight * 0.55 - stem / 2);
    builder.closePath();

    four.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 5 - horizontal, vertical, curve
export const five: GlyphDefinition = {
  unicode: 0x0035,
  name: 'five',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.75;
    const fullWidth = width + sb * 2;
    const c = 0.5522847498;

    // Top horizontal
    builder.hStem(sb + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Vertical stem down
    builder.vStem(sb + stem / 2, xHeight * 0.5, capHeight - xHeight * 0.5, stem);

    // Lower bowl (curve)
    const bowlCy = xHeight * 0.25;
    const bowlRx = width / 2 - stem;
    const bowlRy = xHeight * 0.25 - stem / 2;

    const outerRx = bowlRx + stem / 2 + overshoot;
    const outerRy = bowlRy + stem / 2 + overshoot;

    builder
      .moveTo(sb + stem / 2, bowlCy - outerRy)
      .curveTo(sb + stem / 2 + outerRx * c, bowlCy - outerRy, sb + stem / 2 + outerRx, bowlCy - outerRy * c, sb + stem / 2 + outerRx, bowlCy)
      .curveTo(sb + stem / 2 + outerRx, bowlCy + outerRy * c, sb + stem / 2 + outerRx * c, bowlCy + outerRy, sb + stem / 2, bowlCy + outerRy);

    five.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 6 - circle with ascender
export const six: GlyphDefinition = {
  unicode: 0x0036,
  name: 'six',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.85;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight * 0.4;
    const rx = width / 2 - stem / 2;
    const ry = capHeight * 0.4 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Circle
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Counter
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    // Ascender stem
    builder.vStem(cx - stem / 2, cy, capHeight - cy, stem);

    six.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 7 - horizontal with diagonal
export const seven: GlyphDefinition = {
  unicode: 0x0037,
  name: 'seven',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;

    // Top horizontal
    builder.hStem(sb + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Diagonal down
    builder.moveTo(fullWidth - sb - stem * 1.5, capHeight - stem);
    builder.lineTo(fullWidth - sb - stem / 2, capHeight);
    builder.lineTo(sb + stem * 2, 0);
    builder.lineTo(sb + stem / 2, 0);
    builder.closePath();

    seven.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 8 - two circles stacked
export const eight: GlyphDefinition = {
  unicode: 0x0038,
  name: 'eight',
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
    const c = 0.5522847498;

    const upperCy = capHeight * 0.7;
    const lowerCy = capHeight * 0.3;
    const ry = capHeight * 0.28;
    const rx = width / 2 - stem / 2;

    // Upper circle
    const outerRx1 = rx + stem / 2 + overshoot;
    const outerRy1 = ry + stem / 2 + overshoot;
    const innerRx1 = rx - stem / 2;
    const innerRy1 = ry - stem / 2;

    builder
      .moveTo(cx, upperCy - outerRy1)
      .curveTo(cx + outerRx1 * c, upperCy - outerRy1, cx + outerRx1, upperCy - outerRy1 * c, cx + outerRx1, upperCy)
      .curveTo(cx + outerRx1, upperCy + outerRy1 * c, cx + outerRx1 * c, upperCy + outerRy1, cx, upperCy + outerRy1)
      .curveTo(cx - outerRx1 * c, upperCy + outerRy1, cx - outerRx1, upperCy + outerRy1 * c, cx - outerRx1, upperCy)
      .curveTo(cx - outerRx1, upperCy - outerRy1 * c, cx - outerRx1 * c, upperCy - outerRy1, cx, upperCy - outerRy1)
      .closePath();

    // Upper counter
    builder
      .moveTo(cx, upperCy - innerRy1)
      .curveTo(cx - innerRx1 * c, upperCy - innerRy1, cx - innerRx1, upperCy - innerRy1 * c, cx - innerRx1, upperCy)
      .curveTo(cx - innerRx1, upperCy + innerRy1 * c, cx - innerRx1 * c, upperCy + innerRy1, cx, upperCy + innerRy1)
      .curveTo(cx + innerRx1 * c, upperCy + innerRy1, cx + innerRx1, upperCy + innerRy1 * c, cx + innerRx1, upperCy)
      .curveTo(cx + innerRx1, upperCy - innerRy1 * c, cx + innerRx1 * c, upperCy - innerRy1, cx, upperCy - innerRy1)
      .closePath();

    // Lower circle
    const outerRx2 = rx + stem / 2 + overshoot;
    const outerRy2 = ry + stem / 2 + overshoot;
    const innerRx2 = rx - stem / 2;
    const innerRy2 = ry - stem / 2;

    builder
      .moveTo(cx, lowerCy - outerRy2)
      .curveTo(cx + outerRx2 * c, lowerCy - outerRy2, cx + outerRx2, lowerCy - outerRy2 * c, cx + outerRx2, lowerCy)
      .curveTo(cx + outerRx2, lowerCy + outerRy2 * c, cx + outerRx2 * c, lowerCy + outerRy2, cx, lowerCy + outerRy2)
      .curveTo(cx - outerRx2 * c, lowerCy + outerRy2, cx - outerRx2, lowerCy + outerRy2 * c, cx - outerRx2, lowerCy)
      .curveTo(cx - outerRx2, lowerCy - outerRy2 * c, cx - outerRx2 * c, lowerCy - outerRy2, cx, lowerCy - outerRy2)
      .closePath();

    // Lower counter
    builder
      .moveTo(cx, lowerCy - innerRy2)
      .curveTo(cx - innerRx2 * c, lowerCy - innerRy2, cx - innerRx2, lowerCy - innerRy2 * c, cx - innerRx2, lowerCy)
      .curveTo(cx - innerRx2, lowerCy + innerRy2 * c, cx - innerRx2 * c, lowerCy + innerRy2, cx, lowerCy + innerRy2)
      .curveTo(cx + innerRx2 * c, lowerCy + innerRy2, cx + innerRx2, lowerCy + innerRy2 * c, cx + innerRx2, lowerCy)
      .curveTo(cx + innerRx2, lowerCy - innerRy2 * c, cx + innerRx2 * c, lowerCy - innerRy2, cx, lowerCy - innerRy2)
      .closePath();

    eight.advanceWidth = fullWidth;
    return builder.build();
  },
};

// 9 - circle with descender (inverted 6)
export const nine: GlyphDefinition = {
  unicode: 0x0039,
  name: 'nine',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.85;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight * 0.6;
    const rx = width / 2 - stem / 2;
    const ry = capHeight * 0.4 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Circle
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Counter
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    // Descender stem
    builder.vStem(cx - stem / 2, 0, cy, stem);

    nine.advanceWidth = fullWidth;
    return builder.build();
  },
};

export const numbers: GlyphDefinition[] = [
  zero, one, two, three, four, five, six, seven, eight, nine
];
