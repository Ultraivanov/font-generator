// Lowercase latin glyphs — Brockmann style
// Open apertures, geometric construction, subtle rounding

import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// n — Clean rectangle stems + closed arch
export const n: GlyphDefinition = {
  unicode: 0x006e,
  name: 'n',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = xHeight * 0.88 + sb * 2;
    const rightStemX = fullWidth - sb - stem;
    const k = 0.5522847498;

    // Left stem (simple rectangle)
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, xHeight);
    builder.lineTo(sb, xHeight);
    builder.closePath();

    // Right stem (simple rectangle)
    builder.moveTo(rightStemX, 0);
    builder.lineTo(rightStemX + stem, 0);
    builder.lineTo(rightStemX + stem, xHeight);
    builder.lineTo(rightStemX, xHeight);
    builder.closePath();

    // Arch connecting stems at top
    const archRx = (rightStemX - (sb + stem)) / 2;
    const archRy = xHeight * 0.35;
    const archCx = (sb + stem + rightStemX) / 2;
    const archTopY = xHeight;

    // Arch outer
    builder.moveTo(sb + stem, archTopY);
    builder.curveTo(sb + stem + archRx * k, archTopY, archCx, archTopY - archRy * k, archCx, archTopY - archRy);
    builder.curveTo(archCx, archTopY - archRy * k, rightStemX - archRx * k, archTopY, rightStemX, archTopY);

    // Arch inner
    const innerRx = archRx - stem;
    const innerRy = archRy - stem;
    builder.lineTo(rightStemX, archTopY - stem);
    builder.curveTo(rightStemX - innerRx * k, archTopY, archCx, archTopY - innerRy * k, archCx, archTopY - innerRy);
    builder.curveTo(archCx, archTopY - innerRy * k, sb + stem + innerRx * k, archTopY, sb + stem, archTopY - stem);
    builder.closePath();

    n.advanceWidth = fullWidth;
    return builder.build();
  },
};

// o — Clean squarish circle with proper counter
export const o: GlyphDefinition = {
  unicode: 0x006f,
  name: 'o',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const bowlW = xHeight * 0.92;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = xHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Outer bowl
    builder
      .moveTo(cx + rx * flatten, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * flatten, cy + ry)
      .curveTo(cx + rx * k, cy + ry, cx - rx * 0.3, cy + ry, cx - rx * flatten, cy + ry)
      .curveTo(cx - rx, cy + ry * k, cx - rx, cy - ry * k, cx - rx * flatten, cy - ry)
      .curveTo(cx - rx * k, cy - ry, cx + rx * 0.3, cy - ry, cx + rx * flatten, cy - ry)
      .closePath();

    // Inner counter
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(cx + innerRx * flatten, cy - innerRy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx, cy + innerRy * k, cx + innerRx * flatten, cy + innerRy)
      .curveTo(cx + innerRx * k, cy + innerRy, cx - innerRx * 0.3, cy + innerRy, cx - innerRx * flatten, cy + innerRy)
      .curveTo(cx - innerRx, cy + innerRy * k, cx - innerRx, cy - innerRy * k, cx - innerRx * flatten, cy - innerRy)
      .curveTo(cx - innerRx * k, cy - innerRy, cx + innerRx * 0.3, cy - innerRy, cx + innerRx * flatten, cy - innerRy)
      .closePath();

    o.advanceWidth = fullWidth;
    return builder.build();
  },
};

// a — Clean two-story: bowl + right stem
export const a: GlyphDefinition = {
  unicode: 0x0061,
  name: 'a',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const fullWidth = xHeight * 0.95 + sb * 2;
    const stemX = fullWidth - sb - stem;
    const bowlW = fullWidth - sb * 2 - stem;
    const cx = sb + bowlW / 2;
    const cy = xHeight / 2;
    const k = 0.5522847498;

    // Right stem (simple rectangle)
    builder.moveTo(stemX, 0);
    builder.lineTo(stemX + stem, 0);
    builder.lineTo(stemX + stem, xHeight);
    builder.lineTo(stemX, xHeight);
    builder.closePath();

    // Bowl outer (left side, open on right)
    const bowlRx = bowlW / 2 - stem / 2 + overshoot;
    const bowlRy = xHeight / 2 - stem / 2 + overshoot;
    builder
      .moveTo(stemX, cy - bowlRy)
      .curveTo(cx + bowlRx * k, cy - bowlRy, cx + bowlRx, cy - bowlRy * k, cx + bowlRx, cy)
      .curveTo(cx + bowlRx, cy + bowlRy * k, cx + bowlRx * k, cy + bowlRy, stemX, cy + bowlRy);

    // Bowl inner
    const innerRx = bowlRx - stem;
    const innerRy = bowlRy - stem;
    builder.lineTo(stemX, cy + innerRy);
    builder.curveTo(cx + innerRx * k, cy + innerRy, cx + innerRx, cy + innerRy * k, cx + innerRx, cy);
    builder.curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx * k, cy - innerRy, stemX, cy - innerRy);
    builder.closePath();

    a.advanceWidth = fullWidth;
    return builder.build();
  },
};

// c — Closed bowl with open aperture
export const c: GlyphDefinition = {
  unicode: 0x0063,
  name: 'c',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const bowlW = xHeight * 0.88;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = xHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Outer bowl (3/4 with aperture on right)
    builder
      .moveTo(cx + rx * flatten * 0.5, cy - ry)
      .curveTo(cx + rx * k, cy - ry, cx + rx, cy - ry * k, cx + rx, cy)
      .curveTo(cx + rx, cy + ry * k, cx + rx * k, cy + ry, cx + rx * flatten * 0.5, cy + ry)
      .lineTo(cx + rx * flatten * 0.5, cy + ry - stem)
      .curveTo(cx + rx * k, cy + ry - stem, cx + rx - stem, cy + (ry - stem) * k, cx + rx - stem, cy)
      .curveTo(cx + rx - stem, cy - (ry - stem) * k, cx + rx * k, cy - ry + stem, cx + rx * flatten * 0.5, cy - ry + stem)
      .closePath();

    // Inner counter
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(cx + innerRx * flatten * 0.5, cy - innerRy)
      .curveTo(cx + innerRx * k, cy - innerRy, cx + innerRx, cy - innerRy * k, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy + innerRy * k, cx + innerRx * k, cy + innerRy, cx + innerRx * flatten * 0.5, cy + innerRy)
      .lineTo(cx + innerRx * flatten * 0.5, cy + innerRy - stem)
      .curveTo(cx + (innerRx - stem) * k, cy + innerRy - stem, cx + innerRx - stem, cy + (innerRy - stem) * k, cx + innerRx - stem, cy)
      .curveTo(cx + innerRx - stem, cy - (innerRy - stem) * k, cx + (innerRx - stem) * k, cy - innerRy + stem, cx + innerRx * flatten * 0.5, cy - innerRy + stem)
      .closePath();

    c.advanceWidth = fullWidth * 0.92;
    return builder.build();
  },
};

// e — Closed bowl with crossbar and aperture
export const e: GlyphDefinition = {
  unicode: 0x0065,
  name: 'e',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const bowlW = xHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = xHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.88;
    const barY = cy + stem * 0.6;

    // Main bowl outer (left side + bottom + right to bar)
    builder
      .moveTo(cx + rx * flatten * 0.3, cy - ry)
      .curveTo(cx + rx * k, cy - ry, cx + rx, cy - ry * k, cx + rx, cy)
      .curveTo(cx + rx, cy + ry * k, cx + rx * k, cy + ry, cx + rx * flatten * 0.3, cy + ry)
      .lineTo(cx - rx * 0.3, barY)
      .lineTo(cx - rx * 0.3, barY - stem)
      .lineTo(cx + rx * flatten * 0.3, cy + ry - stem)
      .curveTo(cx + rx * k, cy + ry - stem, cx + rx - stem, cy + (ry - stem) * k, cx + rx - stem, cy)
      .curveTo(cx + rx - stem, cy - (ry - stem) * k, cx + rx * k, cy - ry + stem, cx + rx * flatten * 0.3, cy - ry + stem)
      .closePath();

    // Crossbar
    const barRightX = cx + rx * flatten * 0.25;
    builder.moveTo(cx - rx, barY);
    builder.lineTo(barRightX, barY);
    builder.lineTo(barRightX, barY - stem);
    builder.lineTo(cx - rx, barY - stem);
    builder.closePath();

    // Inner counter (upper left)
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(cx + innerRx * flatten * 0.2, cy - innerRy)
      .curveTo(cx + innerRx * k, cy - innerRy, cx + innerRx, cy - innerRy * k, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy + innerRy * 0.3, cx + innerRx * k, cy + innerRy * 0.5, cx + innerRx * flatten * 0.1, cy + innerRy * 0.5)
      .lineTo(cx - rx * 0.1, barY - stem * 1.5)
      .lineTo(cx - rx * 0.4, barY - stem * 1.5)
      .curveTo(cx - innerRx * k, cy - innerRy, cx - innerRx * 0.5, cy - innerRy, cx + innerRx * flatten * 0.2, cy - innerRy)
      .closePath();

    e.advanceWidth = fullWidth;
    return builder.build();
  },
};

// b — ascender bowl
// b — Clean stem + closed bowl with counter
export const b: GlyphDefinition = {
  unicode: 0x0062,
  name: 'b',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const ascender = p.ascender;

    const bowlW = xHeight * 0.88;
    const fullWidth = bowlW + sb * 2;
    const cx = sb + stem + bowlW / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Left stem to ascender (simple rectangle)
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, ascender);
    builder.lineTo(sb, ascender);
    builder.closePath();

    // Right bowl outer
    builder
      .moveTo(sb + stem, cy - ry)
      .lineTo(cx + rx * flatten * 0.5, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * flatten * 0.5, cy + ry);
    builder.lineTo(sb + stem, cy + ry);
    builder.closePath();

    // Bowl inner (counter)
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(sb + stem * 2, cy - innerRy)
      .lineTo(cx + innerRx * flatten * 0.5, cy - innerRy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx, cy + innerRy * k, cx + innerRx * flatten * 0.5, cy + innerRy);
    builder.lineTo(sb + stem * 2, cy + innerRy);
    builder.closePath();

    b.advanceWidth = fullWidth;
    return builder.build();
  },
};

// d — Clean bowl + ascender stem
export const d: GlyphDefinition = {
  unicode: 0x0064,
  name: 'd',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const ascender = p.ascender;

    const bowlW = xHeight * 0.88;
    const fullWidth = bowlW + sb * 2;
    const stemX = fullWidth - sb - stem;
    const cx = stemX - bowlW / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Right stem to ascender (simple rectangle)
    builder.moveTo(stemX, 0);
    builder.lineTo(stemX + stem, 0);
    builder.lineTo(stemX + stem, ascender);
    builder.lineTo(stemX, ascender);
    builder.closePath();

    // Left bowl outer
    builder
      .moveTo(stemX, cy - ry)
      .lineTo(cx - rx * flatten * 0.5, cy - ry)
      .curveTo(cx - rx, cy - ry * k, cx - rx, cy + ry * k, cx - rx * flatten * 0.5, cy + ry);
    builder.lineTo(stemX, cy + ry);
    builder.closePath();

    // Bowl inner (counter)
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(stemX, cy - innerRy)
      .lineTo(cx - innerRx * flatten * 0.5, cy - innerRy)
      .curveTo(cx - innerRx, cy - innerRy * k, cx - innerRx, cy + innerRy * k, cx - innerRx * flatten * 0.5, cy + innerRy);
    builder.lineTo(stemX, cy + innerRy);
    builder.closePath();

    d.advanceWidth = fullWidth;
    return builder.build();
  },
};

// f — Clean ascender with hook + crossbar
export const f: GlyphDefinition = {
  unicode: 0x0066,
  name: 'f',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const ascender = p.ascender;

    const width = stem * 3 + sb * 2;
    const stemX = (width - stem) / 2;

    // Vertical stem (simple rectangle)
    builder.moveTo(stemX, 0);
    builder.lineTo(stemX + stem, 0);
    builder.lineTo(stemX + stem, ascender);
    builder.lineTo(stemX, ascender);
    builder.closePath();

    // Top hook (rightward)
    const hookY = ascender - stem;
    builder.moveTo(stemX + stem, hookY);
    builder.lineTo(stemX + stem * 2.5, hookY);
    builder.lineTo(stemX + stem * 2.5, hookY + stem);
    builder.lineTo(stemX + stem, hookY + stem);
    builder.closePath();

    // Crossbar at x-height
    builder.moveTo(stemX - stem, xHeight * 0.58);
    builder.lineTo(stemX + stem * 2, xHeight * 0.58);
    builder.lineTo(stemX + stem * 2, xHeight * 0.58 + stem);
    builder.lineTo(stemX - stem, xHeight * 0.58 + stem);
    builder.closePath();

    f.advanceWidth = width;
    return builder.build();
  },
};

// g — Clean double story: upper bowl + lower loop
export const g: GlyphDefinition = {
  unicode: 0x0067,
  name: 'g',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const descender = p.descender;

    const bowlW = xHeight * 0.88;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Upper bowl outer (like o)
    builder
      .moveTo(cx + rx * flatten, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * flatten, cy + ry)
      .curveTo(cx + rx * k, cy + ry, cx - rx * 0.3, cy + ry, cx - rx * flatten, cy + ry)
      .curveTo(cx - rx, cy + ry * k, cx - rx, cy - ry * k, cx - rx * flatten, cy - ry)
      .curveTo(cx - rx * k, cy - ry, cx + rx * 0.3, cy - ry, cx + rx * flatten, cy - ry)
      .closePath();

    // Upper bowl inner (counter)
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(cx + innerRx * flatten, cy - innerRy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx, cy + innerRy * k, cx + innerRx * flatten, cy + innerRy)
      .curveTo(cx + innerRx * k, cy + innerRy, cx - innerRx * 0.3, cy + innerRy, cx - innerRx * flatten, cy + innerRy)
      .curveTo(cx - innerRx, cy + innerRy * k, cx - innerRx, cy - innerRy * k, cx - innerRx * flatten, cy - innerRy)
      .curveTo(cx - innerRx * k, cy - innerRy, cx + innerRx * 0.3, cy - innerRy, cx + innerRx * flatten, cy - innerRy)
      .closePath();

    // Lower loop / descender (closed contour)
    const descY = descender * 0.6;
    const loopRx = rx * 0.8;
    const loopRy = Math.abs(descender) * 0.5;
    const loopY = descY;

    // Outer loop
    builder
      .moveTo(cx + loopRx, loopY)
      .curveTo(cx + loopRx, loopY + loopRy * k, cx + loopRx * k, loopY + loopRy, cx, loopY + loopRy)
      .curveTo(cx - loopRx * k, loopY + loopRy, cx - loopRx, loopY + loopRy * k, cx - loopRx, loopY)
      .curveTo(cx - loopRx, loopY - loopRy * k, cx - loopRx * k, loopY - loopRy, cx, loopY - loopRy)
      .curveTo(cx + loopRx * k, loopY - loopRy, cx + loopRx, loopY - loopRy * k, cx + loopRx, loopY)
      .closePath();

    // Inner loop (counter)
    const innerLoopRx = loopRx - stem;
    const innerLoopRy = loopRy - stem;
    builder
      .moveTo(cx + innerLoopRx, loopY)
      .curveTo(cx + innerLoopRx, loopY + innerLoopRy * k, cx + innerLoopRx * k, loopY + innerLoopRy, cx, loopY + innerLoopRy)
      .curveTo(cx - innerLoopRx * k, loopY + innerLoopRy, cx - innerLoopRx, loopY + innerLoopRy * k, cx - innerLoopRx, loopY)
      .curveTo(cx - innerLoopRx, loopY - innerLoopRy * k, cx - innerLoopRx * k, loopY - innerLoopRy, cx, loopY - innerLoopRy)
      .curveTo(cx + innerLoopRx * k, loopY - innerLoopRy, cx + innerLoopRx, loopY - innerLoopRy * k, cx + innerLoopRx, loopY)
      .closePath();

    g.advanceWidth = fullWidth;
    return builder.build();
  },
};

// h — Clean ascender stem + arch
export const h: GlyphDefinition = {
  unicode: 0x0068,
  name: 'h',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const ascender = p.ascender;

    const fullWidth = xHeight * 0.9 + sb * 2;
    const rightStemX = fullWidth - sb - stem;
    const k = 0.5522847498;

    // Left stem to ascender (simple rectangle)
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, ascender);
    builder.lineTo(sb, ascender);
    builder.closePath();

    // Right stem to xHeight (simple rectangle)
    builder.moveTo(rightStemX, 0);
    builder.lineTo(rightStemX + stem, 0);
    builder.lineTo(rightStemX + stem, xHeight);
    builder.lineTo(rightStemX, xHeight);
    builder.closePath();

    // Arch connecting stems at xHeight
    const archRx = (rightStemX - (sb + stem)) / 2;
    const archRy = xHeight * 0.35;
    const archCx = (sb + stem + rightStemX) / 2;
    const archTopY = xHeight;

    // Arch outer
    builder.moveTo(sb + stem, archTopY);
    builder.curveTo(sb + stem + archRx * k, archTopY, archCx, archTopY - archRy * k, archCx, archTopY - archRy);
    builder.curveTo(archCx, archTopY - archRy * k, rightStemX - archRx * k, archTopY, rightStemX, archTopY);

    // Arch inner
    const innerRx = archRx - stem;
    const innerRy = archRy - stem;
    builder.lineTo(rightStemX, archTopY - stem);
    builder.curveTo(rightStemX - innerRx * k, archTopY, archCx, archTopY - innerRy * k, archCx, archTopY - innerRy);
    builder.curveTo(archCx, archTopY - innerRy * k, sb + stem + innerRx * k, archTopY, sb + stem, archTopY - stem);
    builder.closePath();

    h.advanceWidth = fullWidth;
    return builder.build();
  },
};

// i — Clean stem + dot
export const i: GlyphDefinition = {
  unicode: 0x0069,
  name: 'i',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const width = stem * 2 + sb * 2;
    const stemX = (width - stem) / 2;

    // Dot (filled circle)
    const dotY = xHeight + stem * 1.5;
    const dotR = stem * 0.7;
    builder.moveTo(stemX + stem / 2 + dotR, dotY);
    builder.curveTo(stemX + stem / 2 + dotR, dotY + dotR * 0.55, stemX + stem / 2 - dotR * 0.55, dotY + dotR, stemX + stem / 2 - dotR, dotY + dotR);
    builder.curveTo(stemX + stem / 2 - dotR, dotY + dotR * 0.55, stemX + stem / 2 - dotR, dotY - dotR * 0.55, stemX + stem / 2 - dotR, dotY - dotR);
    builder.curveTo(stemX + stem / 2 - dotR * 0.55, dotY - dotR, stemX + stem / 2 + dotR, dotY - dotR * 0.55, stemX + stem / 2 + dotR, dotY);
    builder.closePath();

    // Stem (simple rectangle)
    builder.moveTo(stemX, 0);
    builder.lineTo(stemX + stem, 0);
    builder.lineTo(stemX + stem, xHeight);
    builder.lineTo(stemX, xHeight);
    builder.closePath();

    i.advanceWidth = width;
    return builder.build();
  },
};

// j — Clean descender stem + dot + hook
export const j: GlyphDefinition = {
  unicode: 0x006a,
  name: 'j',
  advanceWidth: 0,
  build: (params: GlyphParams) => {
    const builder = createPath();
    const sb = params.sidebearing;
    const stem = params.weight;
    const xHeight = params.xHeight;
    const descender = params.descender;

    const width = stem * 2 + sb * 2;
    const stemX = width - sb - stem;

    // Dot
    const dotY = xHeight + stem * 1.5;
    const dotR = stem * 0.7;
    builder.moveTo(stemX + stem / 2 + dotR, dotY);
    builder.curveTo(stemX + stem / 2 + dotR, dotY + dotR * 0.55, stemX + stem / 2 - dotR * 0.55, dotY + dotR, stemX + stem / 2 - dotR, dotY + dotR);
    builder.curveTo(stemX + stem / 2 - dotR, dotY + dotR * 0.55, stemX + stem / 2 - dotR, dotY - dotR * 0.55, stemX + stem / 2 - dotR, dotY - dotR);
    builder.curveTo(stemX + stem / 2 - dotR * 0.55, dotY - dotR, stemX + stem / 2 + dotR, dotY - dotR * 0.55, stemX + stem / 2 + dotR, dotY);
    builder.closePath();

    // Stem to descender (simple rectangle)
    builder.moveTo(stemX, descender * 0.7);
    builder.lineTo(stemX + stem, descender * 0.7);
    builder.lineTo(stemX + stem, xHeight);
    builder.lineTo(stemX, xHeight);
    builder.closePath();

    // Hook at bottom (closed contour)
    const hookDepth = Math.abs(descender) * 0.35;
    builder.moveTo(stemX, descender * 0.7);
    builder.lineTo(stemX + stem, descender * 0.7);
    builder.curveTo(stemX + stem - hookDepth * 0.5, descender * 0.7, stemX - hookDepth, descender * 0.7 + hookDepth * 0.5, stemX - hookDepth, descender * 0.4);
    builder.curveTo(stemX - hookDepth, descender * 0.4 + stem, stemX - hookDepth + stem, descender * 0.4 + stem, stemX, descender * 0.7);
    builder.closePath();

    j.advanceWidth = width;
    return builder.build();
  },
};

// k — stem + diagonals
export const k: GlyphDefinition = {
  unicode: 0x006b,
  name: 'k',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const ascender = p.ascender;
    const round = p.terminalRound || 4;

    const width = xHeight * 0.85 + sb * 2;

    // Left stem (to ascender)
    builder.vStem(sb + stem / 2, round, ascender - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, ascender - stem - round, stem, stem);

    // Upper diagonal
    const midY = xHeight * 0.55;
    const midX = sb + stem * 2;
    builder.moveTo(midX - stem / 2, midY);
    builder.lineTo(width - sb - stem, xHeight - stem);
    builder.lineTo(width - sb, xHeight - stem);
    builder.lineTo(midX + stem / 2, midY);
    builder.closePath();

    // Lower diagonal
    builder.moveTo(midX - stem / 2, midY);
    builder.lineTo(width - sb - stem, stem);
    builder.lineTo(width - sb, stem);
    builder.lineTo(midX + stem / 2, midY);
    builder.closePath();

    k.advanceWidth = width;
    return builder.build();
  },
};

// l — Clean ascender stem
export const l: GlyphDefinition = {
  unicode: 0x006c,
  name: 'l',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const ascender = p.ascender;

    const width = stem * 2 + sb * 2;
    const stemX = (width - stem) / 2;

    // Simple rectangle stem
    builder.moveTo(stemX, 0);
    builder.lineTo(stemX + stem, 0);
    builder.lineTo(stemX + stem, ascender);
    builder.lineTo(stemX, ascender);
    builder.closePath();

    l.advanceWidth = width;
    return builder.build();
  },
};

// m — Clean triple stem + two arches
export const m: GlyphDefinition = {
  unicode: 0x006d,
  name: 'm',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = xHeight * 1.5 + sb * 2;
    const midStemX = fullWidth / 2 - stem / 2;
    const rightStemX = fullWidth - sb - stem;
    const k = 0.5522847498;

    // Left stem
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, xHeight);
    builder.lineTo(sb, xHeight);
    builder.closePath();

    // Middle stem
    builder.moveTo(midStemX, 0);
    builder.lineTo(midStemX + stem, 0);
    builder.lineTo(midStemX + stem, xHeight);
    builder.lineTo(midStemX, xHeight);
    builder.closePath();

    // Right stem
    builder.moveTo(rightStemX, 0);
    builder.lineTo(rightStemX + stem, 0);
    builder.lineTo(rightStemX + stem, xHeight);
    builder.lineTo(rightStemX, xHeight);
    builder.closePath();

    // First arch (between left and middle)
    const arch1Rx = (midStemX - (sb + stem)) / 2;
    const arch1Ry = xHeight * 0.35;
    const arch1Cx = (sb + stem + midStemX) / 2;
    builder.moveTo(sb + stem, xHeight);
    builder.curveTo(sb + stem + arch1Rx * k, xHeight, arch1Cx, xHeight - arch1Ry * k, arch1Cx, xHeight - arch1Ry);
    builder.curveTo(arch1Cx, xHeight - arch1Ry * k, midStemX - arch1Rx * k, xHeight, midStemX, xHeight);
    builder.lineTo(midStemX, xHeight - stem);
    builder.curveTo(midStemX - (arch1Rx - stem) * k, xHeight, arch1Cx, xHeight - (arch1Ry - stem) * k, arch1Cx, xHeight - (arch1Ry - stem));
    builder.curveTo(arch1Cx, xHeight - (arch1Ry - stem) * k, sb + stem + (arch1Rx - stem) * k, xHeight, sb + stem, xHeight - stem);
    builder.closePath();

    // Second arch (between middle and right)
    const arch2Rx = (rightStemX - (midStemX + stem)) / 2;
    const arch2Ry = xHeight * 0.35;
    const arch2Cx = (midStemX + stem + rightStemX) / 2;
    builder.moveTo(midStemX + stem, xHeight);
    builder.curveTo(midStemX + stem + arch2Rx * k, xHeight, arch2Cx, xHeight - arch2Ry * k, arch2Cx, xHeight - arch2Ry);
    builder.curveTo(arch2Cx, xHeight - arch2Ry * k, rightStemX - arch2Rx * k, xHeight, rightStemX, xHeight);
    builder.lineTo(rightStemX, xHeight - stem);
    builder.curveTo(rightStemX - (arch2Rx - stem) * k, xHeight, arch2Cx, xHeight - (arch2Ry - stem) * k, arch2Cx, xHeight - (arch2Ry - stem));
    builder.curveTo(arch2Cx, xHeight - (arch2Ry - stem) * k, midStemX + stem + (arch2Rx - stem) * k, xHeight, midStemX + stem, xHeight - stem);
    builder.closePath();

    m.advanceWidth = fullWidth;
    return builder.build();
  },
};

// p — Clean stem to descender + closed bowl
export const p: GlyphDefinition = {
  unicode: 0x0070,
  name: 'p',
  advanceWidth: 0,
  build: (params: GlyphParams) => {
    const builder = createPath();
    const sb = params.sidebearing;
    const stem = params.weight;
    const xHeight = params.xHeight;
    const descender = params.descender;

    const bowlW = xHeight * 0.88;
    const fullWidth = bowlW + sb * 2;
    const stemX = sb;
    const cx = stemX + stem + bowlW / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const k = 0.5522847498;

    // Left stem to descender (simple rectangle)
    builder.moveTo(stemX, descender * 0.7);
    builder.lineTo(stemX + stem, descender * 0.7);
    builder.lineTo(stemX + stem, xHeight);
    builder.lineTo(stemX, xHeight);
    builder.closePath();

    // Right bowl outer
    builder
      .moveTo(stemX + stem, cy - ry)
      .lineTo(cx + rx * 0.5, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * 0.5, cy + ry);
    builder.lineTo(stemX + stem, cy + ry);
    builder.closePath();

    // Bowl inner (counter)
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(stemX + stem * 2, cy - innerRy)
      .lineTo(cx + innerRx * 0.5, cy - innerRy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx, cy + innerRy * k, cx + innerRx * 0.5, cy + innerRy);
    builder.lineTo(stemX + stem * 2, cy + innerRy);
    builder.closePath();

    p.advanceWidth = fullWidth;
    return builder.build();
  },
};

// q — Clean bowl + descender stem
export const q: GlyphDefinition = {
  unicode: 0x0071,
  name: 'q',
  advanceWidth: 0,
  build: (params: GlyphParams) => {
    const builder = createPath();
    const sb = params.sidebearing;
    const stem = params.weight;
    const xHeight = params.xHeight;
    const descender = params.descender;

    const bowlW = xHeight * 0.88;
    const fullWidth = bowlW + sb * 2;
    const stemX = fullWidth - sb - stem;
    const cx = stemX - bowlW / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const k = 0.5522847498;

    // Right stem to descender (simple rectangle)
    builder.moveTo(stemX, descender * 0.7);
    builder.lineTo(stemX + stem, descender * 0.7);
    builder.lineTo(stemX + stem, xHeight);
    builder.lineTo(stemX, xHeight);
    builder.closePath();

    // Left bowl outer
    builder
      .moveTo(stemX, cy - ry)
      .lineTo(cx - rx * 0.5, cy - ry)
      .curveTo(cx - rx, cy - ry * k, cx - rx, cy + ry * k, cx - rx * 0.5, cy + ry);
    builder.lineTo(stemX, cy + ry);
    builder.closePath();

    // Bowl inner (counter)
    const innerRx = rx - stem;
    const innerRy = ry - stem;
    builder
      .moveTo(stemX, cy - innerRy)
      .lineTo(cx - innerRx * 0.5, cy - innerRy)
      .curveTo(cx - innerRx, cy - innerRy * k, cx - innerRx, cy + innerRy * k, cx - innerRx * 0.5, cy + innerRy);
    builder.lineTo(stemX, cy + innerRy);
    builder.closePath();

    q.advanceWidth = fullWidth;
    return builder.build();
  },
};

// r — Clean stem + diagonal leg
export const r: GlyphDefinition = {
  unicode: 0x0072,
  name: 'r',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const width = xHeight * 0.65 + sb * 2;
    const legStartX = sb + stem;
    const legEndX = width - sb;

    // Left stem (simple rectangle)
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, xHeight);
    builder.lineTo(sb, xHeight);
    builder.closePath();

    // Right diagonal leg (closed contour)
    const legTopY = xHeight - stem;
    const legBottomY = xHeight * 0.55;
    builder.moveTo(legStartX, legTopY);
    builder.lineTo(legEndX - stem, legBottomY);
    builder.lineTo(legEndX, legBottomY);
    builder.lineTo(legStartX + stem, legTopY);
    builder.closePath();

    r.advanceWidth = width;
    return builder.build();
  },
};

// s — Geometric s with open apertures, stroke-based
export const s: GlyphDefinition = {
  unicode: 0x0073,
  name: 's',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const width = xHeight * 0.75 + sb * 2;
    const cx = width / 2;
    const k = 0.5522847498;

    // s proportions: two equal bowls
    const bowlRx = (width - sb * 2 - stem) / 2;
    const bowlRy = (xHeight / 2 - stem) / 2;
    const midY = xHeight / 2;

    // Upper bowl outer (right open, left closed)
    const topY = xHeight - stem / 2;
    builder
      .moveTo(cx - bowlRx * 0.5, midY + bowlRy)
      .curveTo(cx - bowlRx, midY + bowlRy, cx - bowlRx, midY, cx - bowlRx * 0.3, midY)
      .lineTo(cx - bowlRx * 0.5, midY - bowlRy)
      .curveTo(cx - bowlRx, midY - bowlRy, cx - bowlRx, topY, cx - bowlRx * 0.3, topY)
      .curveTo(cx, topY, cx + bowlRx * 0.5, topY, cx + bowlRx, midY + bowlRy * 0.5);

    // Upper bowl inner
    const innerRx = bowlRx - stem;
    const innerRy = bowlRy - stem;
    builder
      .lineTo(cx + bowlRx * 0.5, midY + bowlRy * 0.5 - stem)
      .curveTo(cx, midY + bowlRy, cx - innerRx * 0.3, midY + bowlRy, cx - innerRx * 0.5, midY + bowlRy)
      .curveTo(cx - innerRx, midY + bowlRy, cx - innerRx, midY, cx - innerRx * 0.3, midY)
      .lineTo(cx - innerRx * 0.5, midY - bowlRy)
      .curveTo(cx - innerRx, midY - bowlRy, cx - innerRx, topY, cx - innerRx * 0.3, topY)
      .curveTo(cx, topY, cx + innerRx * 0.5, topY, cx + innerRx, midY)
      .closePath();

    s.advanceWidth = width;
    return builder.build();
  },
};

// t — Clean vertical stem + crossbar
export const t: GlyphDefinition = {
  unicode: 0x0074,
  name: 't',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const ascender = p.ascender;

    const width = stem * 3 + sb * 2;
    const stemX = (width - stem) / 2;

    // Vertical stem (simple rectangle to ascender)
    builder.moveTo(stemX, stem);
    builder.lineTo(stemX + stem, stem);
    builder.lineTo(stemX + stem, ascender * 0.85);
    builder.lineTo(stemX, ascender * 0.85);
    builder.closePath();

    // Crossbar
    builder.moveTo(stemX - stem, xHeight * 0.58);
    builder.lineTo(stemX + stem * 2, xHeight * 0.58);
    builder.lineTo(stemX + stem * 2, xHeight * 0.58 + stem);
    builder.lineTo(stemX - stem, xHeight * 0.58 + stem);
    builder.closePath();

    t.advanceWidth = width;
    return builder.build();
  },
};

// u — Clean bowl + right stem (like n inverted)
export const u: GlyphDefinition = {
  unicode: 0x0075,
  name: 'u',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = xHeight * 0.88 + sb * 2;
    const rightStemX = fullWidth - sb - stem;
    const k = 0.5522847498;

    // Left stem (simple rectangle)
    builder.moveTo(sb, 0);
    builder.lineTo(sb + stem, 0);
    builder.lineTo(sb + stem, xHeight);
    builder.lineTo(sb, xHeight);
    builder.closePath();

    // Right stem (simple rectangle)
    builder.moveTo(rightStemX, 0);
    builder.lineTo(rightStemX + stem, 0);
    builder.lineTo(rightStemX + stem, xHeight);
    builder.lineTo(rightStemX, xHeight);
    builder.closePath();

    // Bottom arch connecting stems
    const archRx = (rightStemX - (sb + stem)) / 2;
    const archRy = xHeight * 0.35;
    const archCx = (sb + stem + rightStemX) / 2;

    // Arch outer
    builder.moveTo(sb + stem, 0);
    builder.curveTo(sb + stem + archRx * k, 0, archCx, archRy * k, archCx, archRy);
    builder.curveTo(archCx, archRy * k, rightStemX - archRx * k, 0, rightStemX, 0);

    // Arch inner
    const innerRx = archRx - stem;
    const innerRy = archRy - stem;
    builder.lineTo(rightStemX, stem);
    builder.curveTo(rightStemX - innerRx * k, stem, archCx, archRy - innerRy * k, archCx, archRy - innerRy);
    builder.curveTo(archCx, archRy - innerRy * k, sb + stem + innerRx * k, stem, sb + stem, stem);
    builder.closePath();

    u.advanceWidth = fullWidth;
    return builder.build();
  },
};

// v — two diagonals
export const v: GlyphDefinition = {
  unicode: 0x0076,
  name: 'v',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const width = xHeight * 0.9 + sb * 2;
    const apexX = width / 2;
    const apexY = 0;

    // Left diagonal
    builder.moveTo(sb + stem, xHeight - round);
    builder.lineTo(apexX - stem / 2, apexY);
    builder.lineTo(apexX + stem / 2, apexY);
    builder.lineTo(sb + stem * 2, xHeight - round);
    builder.closePath();

    // Right diagonal
    builder.moveTo(width - sb - stem, xHeight - round);
    builder.lineTo(apexX + stem / 2, apexY);
    builder.lineTo(apexX - stem / 2, apexY);
    builder.lineTo(width - sb - stem * 2, xHeight - round);
    builder.closePath();

    v.advanceWidth = width;
    return builder.build();
  },
};

// w — double v
export const w: GlyphDefinition = {
  unicode: 0x0077,
  name: 'w',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const width = xHeight * 1.3 + sb * 2;
    const midX1 = width * 0.25;
    const midX2 = width * 0.75;

    // First left diagonal
    builder.moveTo(sb + stem, xHeight - round);
    builder.lineTo(midX1 - stem / 2, 0);
    builder.lineTo(midX1 + stem / 2, 0);
    builder.lineTo(sb + stem * 2, xHeight - round);
    builder.closePath();

    // Inner left diagonal (up)
    builder.moveTo(midX1 + stem / 2, 0);
    builder.lineTo(width / 2 - stem / 2, xHeight * 0.5);
    builder.lineTo(width / 2 + stem / 2, xHeight * 0.5);
    builder.lineTo(midX1 - stem / 2, 0);
    builder.closePath();

    // Inner right diagonal (down)
    builder.moveTo(width / 2 + stem / 2, xHeight * 0.5);
    builder.lineTo(midX2 - stem / 2, 0);
    builder.lineTo(midX2 + stem / 2, 0);
    builder.lineTo(width / 2 - stem / 2, xHeight * 0.5);
    builder.closePath();

    // Final right diagonal (up)
    builder.moveTo(midX2 + stem / 2, 0);
    builder.lineTo(width - sb - stem, xHeight - round);
    builder.lineTo(width - sb, xHeight - round);
    builder.lineTo(midX2 - stem / 2, 0);
    builder.closePath();

    w.advanceWidth = width;
    return builder.build();
  },
};

// x — two crossing diagonals
export const x: GlyphDefinition = {
  unicode: 0x0078,
  name: 'x',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const width = xHeight * 0.85 + sb * 2;

    // First diagonal (top-left to bottom-right)
    builder.moveTo(sb + stem / 2, xHeight - round);
    builder.lineTo(width / 2 - stem / 2, xHeight / 2);
    builder.lineTo(width / 2 + stem / 2, xHeight / 2);
    builder.lineTo(sb + stem * 1.5, xHeight - round);
    builder.closePath();

    builder.moveTo(width - sb - stem / 2, round);
    builder.lineTo(width / 2 + stem / 2, xHeight / 2);
    builder.lineTo(width / 2 - stem / 2, xHeight / 2);
    builder.lineTo(width - sb - stem * 1.5, round);
    builder.closePath();

    // Second diagonal (top-right to bottom-left)
    builder.moveTo(width - sb - stem / 2, xHeight - round);
    builder.lineTo(width / 2 + stem / 2, xHeight / 2);
    builder.lineTo(width / 2 - stem / 2, xHeight / 2);
    builder.lineTo(width - sb - stem * 1.5, xHeight - round);
    builder.closePath();

    builder.moveTo(sb + stem / 2, round);
    builder.lineTo(width / 2 - stem / 2, xHeight / 2);
    builder.lineTo(width / 2 + stem / 2, xHeight / 2);
    builder.lineTo(sb + stem * 1.5, round);
    builder.closePath();

    x.advanceWidth = width;
    return builder.build();
  },
};

// y — Clean v with descender
export const y: GlyphDefinition = {
  unicode: 0x0079,
  name: 'y',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const descender = p.descender;

    const width = xHeight * 0.9 + sb * 2;
    const midY = xHeight * 0.5;
    const apexX = width / 2;

    // Upper left diagonal
    builder.moveTo(sb + stem, xHeight);
    builder.lineTo(apexX - stem / 2, midY);
    builder.lineTo(apexX + stem / 2, midY);
    builder.lineTo(sb + stem * 2, xHeight);
    builder.closePath();

    // Upper right diagonal + descender
    builder.moveTo(width - sb - stem, xHeight);
    builder.lineTo(apexX + stem / 2, midY);
    builder.lineTo(apexX, descender * 0.7);
    builder.lineTo(apexX + stem, descender * 0.7);
    builder.lineTo(apexX + stem / 2, midY);
    builder.lineTo(width - sb - stem * 2, xHeight);
    builder.closePath();

    y.advanceWidth = width;
    return builder.build();
  },
};

// z — horizontal-diagonal-horizontal
export const z: GlyphDefinition = {
  unicode: 0x007a,
  name: 'z',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const width = xHeight * 0.8 + sb * 2;

    // Top bar
    builder.hStem(sb + stem / 2, xHeight - stem / 2, width - sb * 2 - stem, stem);

    // Diagonal
    builder.moveTo(sb + stem / 2, xHeight - stem);
    builder.lineTo(width - sb - stem, round);
    builder.lineTo(width - sb, round);
    builder.lineTo(sb + stem * 1.5, xHeight - stem);
    builder.closePath();

    // Bottom bar
    builder.hStem(sb + stem / 2, stem / 2, width - sb * 2 - stem, stem);

    z.advanceWidth = width;
    return builder.build();
  },
};

// Export all lowercase
export const lowercase: GlyphDefinition[] = [
  a, b, c, d, e, f, g, h, i, j, k, l, m,
  n, o, p, q, r, s, t, u, v, w, x, y, z
];
