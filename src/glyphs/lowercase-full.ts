import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Complete lowercase latin alphabet
// Geometric sans style: uniform stems, minimal modulation

// a - Brockmann: pure circle bowl + straight stem, minimal
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

    // Brockmann: perfect circle, bowl = x-height
    const bowlD = xHeight;
    const r = bowlD / 2 - stem / 2;
    const cx = sb + bowlD / 2;
    const cy = xHeight / 2;
    const k = 0.5522847498;

    // Circle bowl (outer) - true circle, not oval
    const outerR = r + stem / 2 + overshoot;
    builder.circle(cx, cy, outerR, overshoot);

    // Circle counter (inner)
    const innerR = r - stem / 2;
    builder
      .moveTo(cx + innerR, cy)
      .curveTo(cx + innerR, cy + innerR * k, cx + innerR * k, cy + innerR, cx, cy + innerR)
      .curveTo(cx - innerR * k, cy + innerR, cx - innerR, cy + innerR * k, cx - innerR, cy)
      .curveTo(cx - innerR, cy - innerR * k, cx - innerR * k, cy - innerR, cx, cy - innerR)
      .curveTo(cx + innerR * k, cy - innerR, cx + innerR, cy - innerR * k, cx + innerR, cy)
      .closePath();

    // Stem positioned at right edge of bowl
    const fullWidth = sb + bowlD + stem * 0.5;
    const stemX = fullWidth - stem / 2;
    builder.vStem(stemX, 0, xHeight, stem);

    a.advanceWidth = fullWidth + sb;
    return builder.build();
  },
};

// b - Brockmann: straight ascender + pure circle bowl
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
    const overshoot = p.overshoot;

    // Bowl = x-height, true circle
    const bowlD = xHeight;
    const r = bowlD / 2 - stem / 2;
    const cx = sb + stem + bowlD / 2;
    const cy = xHeight / 2;
    const k = 0.5522847498;

    // Left stem - straight, full ascender
    builder.vStem(sb + stem / 2, 0, ascender, stem);

    // Circle bowl (outer)
    const outerR = r + stem / 2 + overshoot;
    builder.circle(cx, cy, outerR, overshoot);

    // Circle counter (inner)
    const innerR = r - stem / 2;
    builder
      .moveTo(cx + innerR, cy)
      .curveTo(cx + innerR, cy + innerR * k, cx + innerR * k, cy + innerR, cx, cy + innerR)
      .curveTo(cx - innerR * k, cy + innerR, cx - innerR, cy + innerR * k, cx - innerR, cy)
      .curveTo(cx - innerR, cy - innerR * k, cx - innerR * k, cy - innerR, cx, cy - innerR)
      .curveTo(cx + innerR * k, cy - innerR, cx + innerR, cy - innerR * k, cx + innerR, cy)
      .closePath();

    b.advanceWidth = sb + stem + bowlD + sb;
    return builder.build();
  },
};

// c - Brockmann: 3/4 circle, open on right, clean
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

    // True circle, 3/4 arc
    const bowlD = xHeight;
    const r = bowlD / 2 - stem / 2;
    const cx = sb + bowlD / 2;
    const cy = xHeight / 2;
    const k = 0.5522847498;

    const outerR = r + stem / 2 + overshoot;
    const innerR = r - stem / 2;

    // Outer arc: from top, around left, to bottom-right opening
    builder
      .moveTo(cx + outerR * 0.4, cy - outerR)
      .curveTo(cx + outerR * k, cy - outerR, cx + outerR, cy - outerR * k, cx + outerR, cy)
      .curveTo(cx + outerR, cy + outerR * k, cx + outerR * k, cy + outerR, cx + outerR * 0.4, cy + outerR);

    // Straight cut across to inner
    builder.lineTo(cx + innerR * 0.4, cy + innerR);

    // Inner arc back up
    builder
      .curveTo(cx + innerR * k, cy + innerR, cx + innerR, cy + innerR * k, cx + innerR, cy)
      .curveTo(cx + innerR, cy - innerR * k, cx + innerR * k, cy - innerR, cx + innerR * 0.4, cy - innerR);

    builder.closePath();

    c.advanceWidth = sb + bowlD + sb * 0.5;
    return builder.build();
  },
};

// d - Brockmann: pure circle bowl + right ascender
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
    const overshoot = p.overshoot;

    // Bowl = x-height, true circle
    const bowlD = xHeight;
    const r = bowlD / 2 - stem / 2;
    const cx = sb + bowlD / 2;
    const cy = xHeight / 2;
    const k = 0.5522847498;

    // Right stem - straight to ascender
    const fullWidth = sb + bowlD + stem * 0.5;
    const stemX = fullWidth - stem / 2;
    builder.vStem(stemX, 0, ascender, stem);

    // Circle bowl (outer)
    const outerR = r + stem / 2 + overshoot;
    builder.circle(cx, cy, outerR, overshoot);

    // Circle counter (inner)
    const innerR = r - stem / 2;
    builder
      .moveTo(cx + innerR, cy)
      .curveTo(cx + innerR, cy + innerR * k, cx + innerR * k, cy + innerR, cx, cy + innerR)
      .curveTo(cx - innerR * k, cy + innerR, cx - innerR, cy + innerR * k, cx - innerR, cy)
      .curveTo(cx - innerR, cy - innerR * k, cx - innerR * k, cy - innerR, cx, cy - innerR)
      .curveTo(cx + innerR * k, cy - innerR, cx + innerR, cy - innerR * k, cx + innerR, cy)
      .closePath();

    d.advanceWidth = fullWidth + sb;
    return builder.build();
  },
};

// e - Brockmann: circle with horizontal opening (eye shape)
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

    // True circle with eye opening
    const bowlD = xHeight;
    const r = bowlD / 2 - stem / 2;
    const cx = sb + bowlD / 2;
    const cy = xHeight / 2;
    const k = 0.5522847498;

    const outerR = r + stem / 2 + overshoot;
    const innerR = r - stem / 2;

    // Outer circle (left and bottom arcs)
    builder
      .moveTo(cx + outerR * 0.3, cy - outerR)
      .curveTo(cx + outerR * k, cy - outerR, cx + outerR, cy - outerR * k, cx + outerR, cy)
      .curveTo(cx + outerR, cy + outerR * k, cx + outerR * k, cy + outerR, cx + outerR * 0.3, cy + outerR);

    // Horizontal cut
    builder.lineTo(cx + innerR * 0.3, cy + innerR);

    // Inner circle back
    builder
      .curveTo(cx + innerR, cy + innerR * k, cx + innerR, cy - innerR * k, cx + innerR * 0.5, cy - innerR)
      .curveTo(cx - innerR * k, cy - innerR, cx - innerR, cy - innerR * k, cx - innerR, cy)
      .curveTo(cx - innerR, cy + innerR * k, cx - innerR * k, cy + innerR, cx - innerR * 0.2, cy + innerR);

    // Close at crossbar height
    builder.lineTo(cx - outerR * 0.2, cy + outerR - stem * 1.5);
    builder.closePath();

    e.advanceWidth = sb + bowlD + sb * 0.3;
    return builder.build();
  },
};

// f - ascender with hook
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

    const fullWidth = sb * 2 + stem * 2;
    const stemX = sb + stem;

    // Stem from baseline to ascender
    builder.vStem(stemX, 0, ascender, stem);

    // Crossbar at x-height
    builder.hStem(stemX - stem / 2, xHeight, stem * 2.5, stem);

    // Hook at top (right side curve)
    const hookWidth = stem * 2;
    const hookHeight = ascender - xHeight;
    builder.moveTo(stemX + stem / 2, xHeight + stem / 2);
    builder.curveTo(
      stemX + stem / 2 + hookWidth * 0.5, xHeight + stem / 2,
      stemX + stem / 2 + hookWidth, xHeight + stem / 2 + hookHeight * 0.3,
      stemX + stem / 2 + hookWidth, ascender
    );

    f.advanceWidth = fullWidth;
    return builder.build();
  },
};

// g - double-story with descender
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
    const overshoot = p.overshoot;

    const bowlWidth = xHeight * 0.9;
    const fullWidth = bowlWidth + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const c = 0.5522847498;

    // Upper bowl (outer)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Upper bowl (inner)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    // Descender stem
    builder.vStem(fullWidth - sb - stem / 2, 0, xHeight + Math.abs(descender) * 0.7, stem);

    // Lower bowl (descender)
    const lowerCy = descender * 0.5;
    const lowerRy = Math.abs(descender) * 0.4;
    const lowerRx = bowlWidth * 0.4;

    builder
      .moveTo(cx + lowerRx, lowerCy)
      .curveTo(cx + lowerRx, lowerCy + lowerRy * c, cx + lowerRx * c, lowerCy + lowerRy, cx, lowerCy + lowerRy)
      .curveTo(cx - lowerRx * c, lowerCy + lowerRy, cx - lowerRx, lowerCy + lowerRy * c, cx - lowerRx, lowerCy)
      .curveTo(cx - lowerRx, lowerCy - lowerRy * c, cx - lowerRx * c, lowerCy - lowerRy, cx, lowerCy - lowerRy)
      .curveTo(cx + lowerRx * c, lowerCy - lowerRy, cx + lowerRx, lowerCy - lowerRy * c, cx + lowerRx, lowerCy)
      .closePath();

    g.advanceWidth = fullWidth;
    return builder.build();
  },
};

// h - two stems with arch
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

    const innerSpace = stem * 2.5;
    const fullWidth = sb * 2 + stem * 2 + innerSpace;

    // Left stem (to ascender)
    builder.vStem(sb + stem / 2, 0, ascender, stem);

    // Right stem (to x-height)
    builder.vStem(fullWidth - sb - stem / 2, 0, xHeight, stem);

    // Shoulder connecting stems
    const archStart = sb + stem;
    const archEnd = fullWidth - sb - stem;
    const archY = xHeight;
    const archHeight = xHeight - stem / 2;

    builder
      .moveTo(archStart, archY)
      .curveTo(
        archStart + (archEnd - archStart) * 0.3, archY,
        archStart + (archEnd - archStart) * 0.3, archHeight,
        archStart + (archEnd - archStart) * 0.5, archHeight
      )
      .curveTo(
        archStart + (archEnd - archStart) * 0.7, archHeight,
        archStart + (archEnd - archStart) * 0.7, archY,
        archEnd, archY
      );

    h.advanceWidth = fullWidth;
    return builder.build();
  },
};

// i - simple stem with dot
export const i: GlyphDefinition = {
  unicode: 0x0069,
  name: 'i',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const ascender = p.ascender;

    const fullWidth = sb * 2 + stem;
    const stemX = fullWidth / 2;

    // Stem
    builder.vStem(stemX, 0, xHeight, stem);

    // Dot (circle above x-height)
    const dotSize = stem * 1.2;
    const dotY = ascender * 0.85;
    builder.circle(stemX, dotY, dotSize / 2, 0);

    i.advanceWidth = fullWidth;
    return builder.build();
  },
};

// j - stem with descender and dot
export const j: GlyphDefinition = {
  unicode: 0x006a,
  name: 'j',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const ascender = p.ascender;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem;
    const stemX = fullWidth / 2;

    // Stem
    builder.vStem(stemX, 0, xHeight + Math.abs(descender), stem);

    // Dot
    const dotSize = stem * 1.2;
    const dotY = ascender * 0.85;
    builder.circle(stemX, dotY, dotSize / 2, 0);

    // Curve at bottom
    const curveX = stemX - stem * 1.5;
    const curveY = descender * 0.5;
    builder
      .moveTo(stemX - stem / 2, curveY + stem / 2)
      .curveTo(curveX, curveY + stem / 2, curveX, curveY, curveX, curveY - stem / 2);

    j.advanceWidth = fullWidth;
    return builder.build();
  },
};

// k - stem with diagonals
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

    const fullWidth = sb * 2 + stem * 3;
    const stemX = sb + stem / 2;

    // Main stem
    builder.vStem(stemX, 0, ascender, stem);

    // Upper diagonal
    const diagStartX = stemX + stem / 2;
    const diagStartY = xHeight * 0.5;
    const diagEndX = fullWidth - sb - stem / 2;
    const diagEndY = ascender * 0.9;

    builder.moveTo(diagStartX, diagStartY);
    builder.lineTo(diagEndX, diagEndY);
    builder.lineTo(diagEndX - stem / 2, diagEndY + stem);
    builder.lineTo(diagStartX - stem / 2, diagStartY + stem);
    builder.closePath();

    // Lower diagonal
    builder.moveTo(diagStartX, diagStartY + stem);
    builder.lineTo(fullWidth - sb - stem, 0);
    builder.lineTo(fullWidth - sb, 0);
    builder.lineTo(diagStartX + stem / 2, diagStartY + stem);
    builder.closePath();

    k.advanceWidth = fullWidth;
    return builder.build();
  },
};

// l - simple ascender
export const l: GlyphDefinition = {
  unicode: 0x006c,
  name: 'l',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const ascender = p.ascender;

    const fullWidth = sb * 2 + stem;
    const stemX = fullWidth / 2;

    builder.vStem(stemX, 0, ascender, stem);

    l.advanceWidth = fullWidth;
    return builder.build();
  },
};

// m - three stems with two arches
export const m: GlyphDefinition = {
  unicode: 0x006d,
  name: 'm',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const innerSpace = stem * 1.8;
    const fullWidth = sb * 2 + stem * 3 + innerSpace * 2;

    // Three stems
    const stem1X = sb + stem / 2;
    const stem2X = stem1X + stem + innerSpace;
    const stem3X = stem2X + stem + innerSpace;

    builder.vStem(stem1X, 0, xHeight, stem);
    builder.vStem(stem2X, 0, xHeight, stem);
    builder.vStem(stem3X, 0, xHeight, stem);

    // First arch
    const arch1Start = stem1X + stem / 2;
    const arch1End = stem2X - stem / 2;
    const archY = xHeight;
    const archHeight = xHeight - stem / 2;

    builder
      .moveTo(arch1Start, archY)
      .curveTo(
        arch1Start + (arch1End - arch1Start) * 0.3, archY,
        arch1Start + (arch1End - arch1Start) * 0.3, archHeight,
        arch1Start + (arch1End - arch1Start) * 0.5, archHeight
      )
      .curveTo(
        arch1Start + (arch1End - arch1Start) * 0.7, archHeight,
        arch1Start + (arch1End - arch1Start) * 0.7, archY,
        arch1End, archY
      );

    // Second arch
    const arch2Start = stem2X + stem / 2;
    const arch2End = stem3X - stem / 2;

    builder
      .moveTo(arch2Start, archY)
      .curveTo(
        arch2Start + (arch2End - arch2Start) * 0.3, archY,
        arch2Start + (arch2End - arch2Start) * 0.3, archHeight,
        arch2Start + (arch2End - arch2Start) * 0.5, archHeight
      )
      .curveTo(
        arch2Start + (arch2End - arch2Start) * 0.7, archHeight,
        arch2Start + (arch2End - arch2Start) * 0.7, archY,
        arch2End, archY
      );

    m.advanceWidth = fullWidth;
    return builder.build();
  },
};

// p - Brockmann: bowl with descender stem
export const p: GlyphDefinition = {
  unicode: 0x0070,
  name: 'p',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const descender = p.descender;
    const overshoot = p.overshoot;

    const bowlWidth = xHeight * 0.95;
    const fullWidth = sb + stem + bowlWidth + sb;
    const cx = sb + stem + bowlWidth / 2;
    const cy = xHeight / 2;
    const r = bowlWidth / 2 - stem / 2;
    const k = 0.5522847498;

    // Stem with descender
    builder.vStem(sb + stem / 2, descender, xHeight + Math.abs(descender) * 0.5, stem);

    // Perfect circle bowl (outer)
    const outerR = r + stem / 2 + overshoot;
    builder
      .moveTo(cx, cy - outerR)
      .curveTo(cx + outerR * k, cy - outerR, cx + outerR, cy - outerR * k, cx + outerR, cy)
      .curveTo(cx + outerR, cy + outerR * k, cx + outerR * k, cy + outerR, cx, cy + outerR)
      .curveTo(cx - outerR * k, cy + outerR, cx - outerR, cy + outerR * k, cx - outerR, cy)
      .curveTo(cx - outerR, cy - outerR * k, cx - outerR * k, cy - outerR, cx, cy - outerR)
      .closePath();

    // Counter (inner circle)
    const innerR = r - stem / 2;
    builder
      .moveTo(cx, cy - innerR)
      .curveTo(cx - innerR * k, cy - innerR, cx - innerR, cy - innerR * k, cx - innerR, cy)
      .curveTo(cx - innerR, cy + innerR * k, cx - innerR * k, cy + innerR, cx, cy + innerR)
      .curveTo(cx + innerR * k, cy + innerR, cx + innerR, cy + innerR * k, cx + innerR, cy)
      .curveTo(cx + innerR, cy - innerR * k, cx + innerR * k, cy - innerR, cx, cy - innerR)
      .closePath();

    p.advanceWidth = fullWidth;
    return builder.build();
  },
};

// q - Brockmann: bowl with right descender stem (mirror of p)
export const q: GlyphDefinition = {
  unicode: 0x0071,
  name: 'q',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const descender = p.descender;
    const overshoot = p.overshoot;

    const bowlWidth = xHeight * 0.95;
    const fullWidth = sb + bowlWidth + stem + sb;
    const cx = sb + bowlWidth / 2;
    const cy = xHeight / 2;
    const r = bowlWidth / 2 - stem / 2;
    const k = 0.5522847498;

    // Right stem with descender
    builder.vStem(fullWidth - sb - stem / 2, descender, xHeight + Math.abs(descender) * 0.5, stem);

    // Perfect circle bowl (outer)
    const outerR = r + stem / 2 + overshoot;
    builder
      .moveTo(cx, cy - outerR)
      .curveTo(cx + outerR * k, cy - outerR, cx + outerR, cy - outerR * k, cx + outerR, cy)
      .curveTo(cx + outerR, cy + outerR * k, cx + outerR * k, cy + outerR, cx, cy + outerR)
      .curveTo(cx - outerR * k, cy + outerR, cx - outerR, cy + outerR * k, cx - outerR, cy)
      .curveTo(cx - outerR, cy - outerR * k, cx - outerR * k, cy - outerR, cx, cy - outerR)
      .closePath();

    // Counter (inner circle)
    const innerR = r - stem / 2;
    builder
      .moveTo(cx, cy - innerR)
      .curveTo(cx - innerR * k, cy - innerR, cx - innerR, cy - innerR * k, cx - innerR, cy)
      .curveTo(cx - innerR, cy + innerR * k, cx - innerR * k, cy + innerR, cx, cy + innerR)
      .curveTo(cx + innerR * k, cy + innerR, cx + innerR, cy + innerR * k, cx + innerR, cy)
      .curveTo(cx + innerR, cy - innerR * k, cx + innerR * k, cy - innerR, cx, cy - innerR)
      .closePath();

    q.advanceWidth = fullWidth;
    return builder.build();
  },
};

// r - stem with shoulder
export const r: GlyphDefinition = {
  unicode: 0x0072,
  name: 'r',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 3;
    const stemX = sb + stem / 2;

    // Stem
    builder.vStem(stemX, 0, xHeight, stem);

    // Shoulder (curved top right)
    const shoulderStart = stemX + stem / 2;
    const shoulderEnd = fullWidth - sb;
    const shoulderHeight = xHeight - stem / 2;

    builder
      .moveTo(shoulderStart, xHeight)
      .curveTo(
        shoulderStart + (shoulderEnd - shoulderStart) * 0.5, xHeight,
        shoulderEnd, xHeight,
        shoulderEnd, shoulderHeight * 0.8
      );

    r.advanceWidth = fullWidth;
    return builder.build();
  },
};

// s - double curve
export const s: GlyphDefinition = {
  unicode: 0x0073,
  name: 's',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const width = xHeight * 0.75;
    const fullWidth = width + sb * 2;
    const c = 0.5522847498;

    // Upper curve
    const upperY = xHeight * 0.75;
    const upperCx = fullWidth / 2;
    const upperRx = width / 2;

    // Lower curve
    const lowerY = xHeight * 0.25;
    const lowerCx = fullWidth / 2;
    const lowerRx = width / 2;

    // Draw S shape using two curves
    builder.moveTo(fullWidth - sb - stem / 2, upperY);

    // Top curve (backwards C)
    builder.curveTo(
      upperCx + upperRx * c, upperY,
      upperCx + upperRx, upperY + stem * 0.5,
      upperCx + upperRx * 0.5, xHeight - stem / 2
    );

    // Middle connection
    builder.curveTo(
      upperCx, upperY,
      lowerCx, lowerY,
      sb + stem / 2, lowerY
    );

    // Bottom curve (C shape)
    builder.curveTo(
      lowerCx - lowerRx * c, lowerY,
      lowerCx - lowerRx, lowerY - stem * 0.5,
      lowerCx - lowerRx * 0.5, stem / 2
    );

    s.advanceWidth = fullWidth;
    return builder.build();
  },
};

// t - cross with short stem
export const t: GlyphDefinition = {
  unicode: 0x0074,
  name: 't',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 3;
    const stemX = fullWidth / 2;

    // Vertical stem (slightly above x-height, shorter)
    builder.vStem(stemX, xHeight * 0.15, xHeight * 0.95, stem);

    // Horizontal crossbar
    builder.hStem(sb + stem / 2, xHeight * 0.6, fullWidth - sb * 2 - stem, stem);

    t.advanceWidth = fullWidth;
    return builder.build();
  },
};

// u - two stems with bottom arch (inverted n)
export const u: GlyphDefinition = {
  unicode: 0x0075,
  name: 'u',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const innerSpace = stem * 2.5;
    const fullWidth = sb * 2 + stem * 2 + innerSpace;

    const stem1X = sb + stem / 2;
    const stem2X = fullWidth - sb - stem / 2;

    // Two stems
    builder.vStem(stem1X, 0, xHeight, stem);
    builder.vStem(stem2X, 0, xHeight, stem);

    // Bottom arch
    const archStart = stem1X + stem / 2;
    const archEnd = stem2X - stem / 2;
    const archY = 0;
    const archDepth = stem / 2;

    builder
      .moveTo(archStart, archY)
      .curveTo(
        archStart + (archEnd - archStart) * 0.3, archY,
        archStart + (archEnd - archStart) * 0.3, archDepth,
        archStart + (archEnd - archStart) * 0.5, archDepth
      )
      .curveTo(
        archStart + (archEnd - archStart) * 0.7, archDepth,
        archStart + (archEnd - archStart) * 0.7, archY,
        archEnd, archY
      );

    u.advanceWidth = fullWidth;
    return builder.build();
  },
};

// v - two diagonals
export const v: GlyphDefinition = {
  unicode: 0x0076,
  name: 'v',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 4;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;
    const bottomY = 0;
    const topY = xHeight;

    // Left diagonal
    builder.moveTo(leftX, topY);
    builder.lineTo(leftX + stem, topY);
    builder.lineTo(fullWidth / 2, bottomY + stem);
    builder.lineTo(fullWidth / 2 - stem / 2, bottomY);
    builder.closePath();

    // Right diagonal
    builder.moveTo(rightX, topY);
    builder.lineTo(rightX - stem, topY);
    builder.lineTo(fullWidth / 2, bottomY + stem);
    builder.lineTo(fullWidth / 2 + stem / 2, bottomY);
    builder.closePath();

    v.advanceWidth = fullWidth;
    return builder.build();
  },
};

// w - four diagonals (double v)
export const w: GlyphDefinition = {
  unicode: 0x0077,
  name: 'w',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 6;
    const step = (fullWidth - sb * 2) / 4;

    const x1 = sb + stem / 2;
    const x2 = sb + step;
    const x3 = sb + step * 2;
    const x4 = sb + step * 3;
    const x5 = fullWidth - sb - stem / 2;

    const midY = xHeight * 0.5;

    // First V
    builder.moveTo(x1, xHeight);
    builder.lineTo(x1 + stem, xHeight);
    builder.lineTo(x2, midY + stem);
    builder.lineTo(x2 - stem / 2, midY);
    builder.closePath();

    builder.moveTo(x2 + stem / 2, midY);
    builder.lineTo(x2 + stem, midY + stem);
    builder.lineTo(x3 - stem / 2, 0 + stem);
    builder.lineTo(x3 - stem, 0);
    builder.closePath();

    // Second V
    builder.moveTo(x3, 0);
    builder.lineTo(x3 + stem / 2, 0 + stem);
    builder.lineTo(x4, midY + stem);
    builder.lineTo(x4 - stem / 2, midY);
    builder.closePath();

    builder.moveTo(x4 + stem / 2, midY);
    builder.lineTo(x4 + stem, midY + stem);
    builder.lineTo(x5 - stem, xHeight);
    builder.lineTo(x5, xHeight);
    builder.closePath();

    w.advanceWidth = fullWidth;
    return builder.build();
  },
};

// x - crossing diagonals
export const x: GlyphDefinition = {
  unicode: 0x0078,
  name: 'x',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 4;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // First diagonal (top-left to bottom-right)
    builder.moveTo(leftX, xHeight);
    builder.lineTo(leftX + stem, xHeight);
    builder.lineTo(rightX, 0);
    builder.lineTo(rightX - stem, 0);
    builder.closePath();

    // Second diagonal (top-right to bottom-left)
    builder.moveTo(rightX, xHeight);
    builder.lineTo(rightX - stem, xHeight);
    builder.lineTo(leftX, 0);
    builder.lineTo(leftX + stem, 0);
    builder.closePath();

    x.advanceWidth = fullWidth;
    return builder.build();
  },
};

// y - v with descender
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

    const fullWidth = sb * 2 + stem * 4;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // Upper part (V shape)
    builder.moveTo(leftX, xHeight);
    builder.lineTo(leftX + stem, xHeight);
    builder.lineTo(fullWidth / 2, stem);
    builder.lineTo(fullWidth / 2 - stem / 2, 0);
    builder.closePath();

    builder.moveTo(rightX, xHeight);
    builder.lineTo(rightX - stem, xHeight);
    builder.lineTo(fullWidth / 2, stem);

    // Descender
    const descenderY = descender * 0.8;
    builder.lineTo(fullWidth / 2 - stem, descenderY);
    builder.lineTo(fullWidth / 2, descenderY);
    builder.lineTo(fullWidth / 2 + stem / 2, 0);
    builder.closePath();

    y.advanceWidth = fullWidth;
    return builder.build();
  },
};

// z - horizontal with diagonal
export const z: GlyphDefinition = {
  unicode: 0x007a,
  name: 'z',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const fullWidth = sb * 2 + stem * 4;

    // Top bar
    builder.hStem(sb + stem / 2, xHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Bottom bar
    builder.hStem(sb + stem / 2, stem / 2, fullWidth - sb * 2 - stem, stem);

    // Diagonal
    builder.moveTo(sb + stem / 2, xHeight - stem);
    builder.lineTo(sb + stem * 1.5, xHeight);
    builder.lineTo(fullWidth - sb - stem / 2, stem);
    builder.lineTo(fullWidth - sb - stem * 1.5, 0);
    builder.closePath();

    z.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Export all additional lowercase
export const lowercaseFull: GlyphDefinition[] = [
  a, b, c, d, e, f, g, h, i, j, k, l, m,
  p, q, r, s, t, u, v, w, x, y, z
];
