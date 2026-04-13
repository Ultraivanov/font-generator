// Lowercase latin glyphs — Brockmann style
// Open apertures, geometric construction, subtle rounding

import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// n — Single story, open arch
export const n: GlyphDefinition = {
  unicode: 0x006e,
  name: 'n',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const fullWidth = xHeight * 0.9 + sb * 2;
    const stemX = sb + stem / 2;

    // Left stem with rounded terminals
    builder.vStem(stemX, round, xHeight - round * 2, stem);
    // Rounded caps
    builder.hStem(stemX, round, stem, stem);
    builder.hStem(stemX, xHeight - stem - round, stem, stem);

    // Right arch — open, not touching baseline
    const archCenterX = fullWidth - sb - stem;
    const archCenterY = xHeight / 2 + stem / 2;
    const archRx = (fullWidth - sb * 2 - stem * 2) / 2;
    const archRy = (xHeight - stem) / 2;
    const k = 0.5522847498;

    // Right stem
    builder.vStem(archCenterX, stem, xHeight - stem * 2, stem);

    // Arch connecting to left stem
    builder
      .moveTo(stemX + stem / 2, xHeight - stem - round)
      .curveTo(stemX + stem / 2 + archRx * k, xHeight, stemX + stem / 2 + archRx, xHeight - archRy * k, archCenterX, xHeight - stem / 2);

    n.advanceWidth = fullWidth;
    return builder.build();
  },
};

// o — Squarish circle, open counters
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

    // Squarish proportions like uppercase O
    const bowlW = xHeight * 0.95;
    const bowlH = xHeight;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = bowlH / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.88; // Slightly less square than caps

    // Outer contour
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

    // Inner counter
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

    o.advanceWidth = fullWidth;
    return builder.build();
  },
};

// a — Two-story, open bowl and aperture
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
    const round = p.terminalRound || 4;

    const fullWidth = xHeight * 1.0 + sb * 2;
    const bowlW = xHeight * 0.75;
    const bowlH = xHeight;
    const cx = sb + bowlW / 2;
    const cy = xHeight / 2;
    const k = 0.5522847498;

    // Right stem (vertical, goes to ascender height for two-story)
    const stemX = fullWidth - sb - stem / 2;
    builder.vStem(stemX, round, xHeight - round * 2, stem);
    // Rounded caps
    builder.hStem(stemX - stem / 2, round, stem, stem);
    builder.hStem(stemX - stem / 2, xHeight - stem - round, stem, stem);

    // Bowl (left side) — open aperture
    const bowlRx = bowlW / 2 - stem / 2 + overshoot;
    const bowlRy = bowlH / 2 - stem / 2 + overshoot;

    // Outer bowl (left half-circle feel)
    builder
      .moveTo(cx + bowlRx * 0.3, cy - bowlRy)
      .curveTo(cx + bowlRx * k, cy - bowlRy, cx + bowlRx, cy - bowlRy * k, cx + bowlRx, cy)
      .curveTo(cx + bowlRx, cy + bowlRy * k, cx + bowlRx * k, cy + bowlRy, cx + bowlRx * 0.3, cy + bowlRy);

    // Bowl inner
    const innerRx = bowlRx - stem;
    const innerRy = bowlRy - stem;

    builder
      .lineTo(cx + innerRx * 0.3, cy + innerRy)
      .curveTo(cx + innerRx * k, cy + innerRy, cx + innerRx, cy + innerRy * k, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * k, cx + innerRx * k, cy - innerRy, cx + innerRx * 0.3, cy - innerRy);

    // Close at top
    builder.lineTo(cx + bowlRx * 0.3, cy - bowlRy);
    builder.closePath();

    a.advanceWidth = fullWidth;
    return builder.build();
  },
};

// c — Open aperture, almost 3/4 circle
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

    const bowlW = xHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = xHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Open C — generous aperture
    builder
      .moveTo(cx + rx * flatten * 0.5, cy - ry)
      .curveTo(cx + rx * k, cy - ry, cx + rx, cy - ry * k, cx + rx, cy)
      .curveTo(cx + rx, cy + ry * k, cx + rx * k, cy + ry, cx + rx * flatten * 0.5, cy + ry);

    // Inner back
    const innerRx = rx - stem;
    const innerRy = ry - stem;

    builder
      .lineTo(cx + innerRx * flatten * 0.5, cy + innerRy)
      .curveTo(cx + innerRx, cy + innerRy * k, cx + innerRx, cy - innerRy * k, cx + innerRx * flatten * 0.5, cy - innerRy);

    builder.closePath();

    c.advanceWidth = fullWidth * 0.95;
    return builder.build();
  },
};

// e — Open aperture, horizontal bar higher
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

    const bowlW = xHeight * 0.95;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2 + overshoot;
    const ry = xHeight / 2 - stem / 2 + overshoot;
    const k = 0.5522847498;
    const flatten = 0.88;

    const barY = cy + stem * 0.8; // Bar slightly above center

    // Left side and bottom arc
    builder
      .moveTo(cx + rx * flatten * 0.4, cy - ry)
      .curveTo(cx + rx * k, cy - ry, cx + rx, cy - ry * k, cx + rx, cy)
      .curveTo(cx + rx, cy + ry * k, cx + rx * k, cy + ry, cx + rx * flatten * 0.4, cy + ry);

    // To bar
    builder.lineTo(cx + rx * 0.2, barY);
    builder.lineTo(cx - rx, barY);

    // Inner contour back
    const innerRx = rx - stem;
    const innerRy = ry - stem;

    builder
      .curveTo(cx - innerRx, cy - innerRy * k, cx - innerRx, cy, cx - innerRx * k, cy - innerRy)
      .curveTo(cx - innerRx * k, cy - innerRy, cx - innerRx * 0.3, cy - innerRy, cx + innerRx * flatten * 0.4, cy - innerRy);

    builder.closePath();

    e.advanceWidth = fullWidth;
    return builder.build();
  },
};

// b — ascender bowl
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
    const round = p.terminalRound || 4;

    const bowlW = xHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = sb + stem + bowlW / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Left stem (to ascender)
    builder.vStem(sb + stem / 2, round, ascender - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, ascender - stem - round, stem, stem);

    // Right bowl
    builder
      .moveTo(sb + stem, cy - ry)
      .lineTo(cx + rx * flatten * 0.5, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * flatten * 0.5, cy + ry);
    builder.lineTo(sb + stem, cy + ry);
    builder.closePath();

    b.advanceWidth = fullWidth;
    return builder.build();
  },
};

// d — bowl + ascender
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
    const round = p.terminalRound || 4;

    const bowlW = xHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth - stem - bowlW / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Left bowl
    builder
      .moveTo(cx - rx * flatten * 0.5, cy - ry)
      .curveTo(cx - rx, cy - ry * k, cx - rx, cy + ry * k, cx - rx * flatten * 0.5, cy + ry);
    builder.lineTo(fullWidth - sb - stem, cy + ry);
    builder.lineTo(fullWidth - sb - stem, cy - ry);
    builder.closePath();

    // Right stem (to ascender)
    const stemX = fullWidth - sb - stem / 2;
    builder.vStem(stemX, round, ascender - round * 2, stem);
    builder.hStem(stemX - stem / 2, round, stem, stem);
    builder.hStem(stemX - stem / 2, ascender - stem - round, stem, stem);

    d.advanceWidth = fullWidth;
    return builder.build();
  },
};

// f — ascender with hook
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
    const round = p.terminalRound || 4;

    const width = stem * 3 + sb * 2;
    const stemX = width / 2;

    // Vertical stem
    builder.vStem(stemX, 0, ascender - round * 2, stem);
    builder.hStem(stemX - stem / 2, ascender - stem - round, stem, stem);

    // Top hook (to the right)
    const hookY = ascender - stem - round;
    builder.hStem(stemX, hookY, stem * 2, stem);

    // Crossbar at x-height
    builder.hStem(stemX - stem, xHeight - stem / 2, stem * 3, stem);

    f.advanceWidth = width;
    return builder.build();
  },
};

// g — double story with descender
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
    const round = p.terminalRound || 4;

    const bowlW = xHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Upper bowl (like o)
    builder
      .moveTo(cx + rx * flatten, cy - ry)
      .curveTo(cx + rx, cy - ry * k, cx + rx, cy + ry * k, cx + rx * flatten, cy + ry)
      .curveTo(cx + rx * k, cy + ry, cx - rx * 0.3, cy + ry, cx - rx * flatten, cy + ry)
      .curveTo(cx - rx, cy + ry * k, cx - rx, cy - ry * k, cx - rx * flatten, cy - ry)
      .curveTo(cx - rx * k, cy - ry, cx + rx * 0.3, cy - ry, cx + rx * flatten, cy - ry)
      .closePath();

    // Lower bowl / loop with descender
    const descY = descender * 0.6;
    const loopRx = rx * 0.8;
    const loopRy = Math.abs(descender) * 0.5;

    builder
      .moveTo(cx + loopRx, descY)
      .curveTo(cx + loopRx, descY + loopRy * k, cx + loopRx * k, descY + loopRy, cx, descY + loopRy)
      .curveTo(cx - loopRx * k, descY + loopRy, cx - loopRx, descY + loopRy * k, cx - loopRx, descY)
      .curveTo(cx - loopRx, descY - loopRy * k, cx - loopRx * k, descY - loopRy, cx, descY - loopRy);

    g.advanceWidth = fullWidth;
    return builder.build();
  },
};

// h — ascender + arch
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
    const round = p.terminalRound || 4;

    const fullWidth = xHeight * 0.95 + sb * 2;

    // Left stem (to ascender)
    builder.vStem(sb + stem / 2, round, ascender - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);
    builder.hStem(sb + stem / 2, ascender - stem - round, stem, stem);

    // Right arch
    const archCenterX = fullWidth - sb - stem;
    builder.vStem(archCenterX, stem, xHeight - stem * 2, stem);

    h.advanceWidth = fullWidth;
    return builder.build();
  },
};

// i — simple dot + stem
export const i: GlyphDefinition = {
  unicode: 0x0069,
  name: 'i',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const width = stem * 2 + sb * 2;
    const stemX = width / 2;

    // Dot
    const dotY = xHeight + stem * 2;
    builder.circle(stemX, dotY, stem * 0.6, 0);

    // Stem
    builder.vStem(stemX, round, xHeight - round * 2, stem);
    builder.hStem(stemX - stem / 2, round, stem, stem);

    i.advanceWidth = width;
    return builder.build();
  },
};

// j — dot + descender stem
export const j: GlyphDefinition = {
  unicode: 0x006a,
  name: 'j',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const descender = p.descender;
    const round = p.terminalRound || 4;

    const width = stem * 2 + sb * 2;
    const stemX = width - sb - stem / 2;

    // Dot
    const dotY = xHeight + stem * 2;
    builder.circle(stemX, dotY, stem * 0.6, 0);

    // Stem with descender hook
    builder.vStem(stemX, descender * 0.5, xHeight - round * 2, stem);

    // Hook
    const hookY = descender * 0.5;
    const hookDepth = Math.abs(descender) * 0.4;
    builder
      .moveTo(stemX - stem / 2, hookY)
      .curveTo(stemX - stem / 2 - hookDepth * 0.5, hookY, stemX - stem / 2 - hookDepth, hookY + hookDepth * 0.5, stemX - stem / 2 - hookDepth, hookY + hookDepth);

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

// l — simple ascender
export const l: GlyphDefinition = {
  unicode: 0x006c,
  name: 'l',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const ascender = p.ascender;
    const round = p.terminalRound || 4;

    const width = stem * 2 + sb * 2;

    builder.vStem(width / 2, round, ascender - round * 2, stem);
    builder.hStem(width / 2 - stem / 2, round, stem, stem);
    builder.hStem(width / 2 - stem / 2, ascender - stem - round, stem, stem);

    l.advanceWidth = width;
    return builder.build();
  },
};

// m — triple arch
export const m: GlyphDefinition = {
  unicode: 0x006d,
  name: 'm',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const fullWidth = xHeight * 1.5 + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, xHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);

    // Middle stem
    builder.vStem(fullWidth / 2, round, xHeight - round * 2, stem);

    // Right stem
    builder.vStem(fullWidth - sb - stem / 2, round, xHeight - round * 2, stem);

    m.advanceWidth = fullWidth;
    return builder.build();
  },
};

// p — descender bowl
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
    const round = p.terminalRound || 4;

    const bowlW = xHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = sb + stem + bowlW / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;

    // Left stem (to descender)
    builder.vStem(sb + stem / 2, descender * 0.6, xHeight - round * 2, stem);

    // Right bowl
    builder
      .moveTo(sb + stem, cy - ry)
      .lineTo(cx + rx * 0.5, cy - ry)
      .curveTo(cx + rx, cy - ry * 0.552, cx + rx, cy + ry * 0.552, cx + rx * 0.5, cy + ry);
    builder.lineTo(sb + stem, cy + ry);
    builder.closePath();

    p.advanceWidth = fullWidth;
    return builder.build();
  },
};

// q — bowl + descender
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
    const round = p.terminalRound || 4;

    const bowlW = xHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth - stem - bowlW / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;

    // Left bowl
    builder
      .moveTo(cx - rx * 0.5, cy - xHeight / 2 + stem / 2)
      .curveTo(cx - rx, cy - xHeight / 2 + stem / 2, cx - rx, cy + xHeight / 2 - stem / 2, cx - rx * 0.5, cy + xHeight / 2 - stem / 2);
    builder.lineTo(fullWidth - sb - stem, cy + xHeight / 2 - stem / 2);
    builder.lineTo(fullWidth - sb - stem, cy - xHeight / 2 + stem / 2);
    builder.closePath();

    // Right stem (to descender)
    builder.vStem(fullWidth - sb - stem / 2, descender * 0.6, xHeight - round * 2, stem);

    q.advanceWidth = fullWidth;
    return builder.build();
  },
};

// r — simple stem with leg
export const r: GlyphDefinition = {
  unicode: 0x0072,
  name: 'r',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const width = xHeight * 0.7 + sb * 2;

    // Left stem
    builder.vStem(sb + stem / 2, round, xHeight - round * 2, stem);
    builder.hStem(sb + stem / 2, round, stem, stem);

    // Right leg
    builder.moveTo(sb + stem * 1.5, xHeight - stem);
    builder.lineTo(width - sb - stem, xHeight * 0.6);
    builder.lineTo(width - sb, xHeight * 0.6);
    builder.lineTo(sb + stem * 2.5, xHeight);
    builder.closePath();

    r.advanceWidth = width;
    return builder.build();
  },
};

// s — S-curve
export const s: GlyphDefinition = {
  unicode: 0x0073,
  name: 's',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    const width = xHeight * 0.8 + sb * 2;
    const cx = width / 2;
    const cy = xHeight / 2;
    const k = 0.5522847498;

    // Upper bowl
    const topY = xHeight - stem / 2;
    const midY = xHeight / 2;
    const botY = stem / 2;

    builder
      .moveTo(cx, topY)
      .curveTo(cx + (width - sb * 2) / 2 * k, topY, cx + (width - sb * 2) / 2, topY - (topY - midY) * k, cx + (width - sb * 2) / 2, midY)
      .curveTo(cx + (width - sb * 2) / 2, midY - (midY - botY) * k, cx + (width - sb * 2) / 2 * k, botY, cx, botY)
      .curveTo(cx - (width - sb * 2) / 2 * k, botY, cx - (width - sb * 2) / 2, botY + (midY - botY) * k, cx - (width - sb * 2) / 2, midY)
      .curveTo(cx - (width - sb * 2) / 2, midY + (topY - midY) * k, cx - (width - sb * 2) / 2 * k, topY, cx, topY);

    s.advanceWidth = width;
    return builder.build();
  },
};

// t — vertical + crossbar
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
    const round = p.terminalRound || 4;

    const width = stem * 3 + sb * 2;
    const stemX = width / 2;

    // Vertical stem
    builder.vStem(stemX, round, ascender * 0.8 - round * 2, stem);

    // Crossbar
    builder.hStem(stemX - stem, xHeight * 0.6, stem * 3, stem);

    t.advanceWidth = width;
    return builder.build();
  },
};

// u — bowl with right stem
export const u: GlyphDefinition = {
  unicode: 0x0075,
  name: 'u',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const round = p.terminalRound || 4;

    const bowlW = xHeight * 0.9;
    const fullWidth = bowlW + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlW / 2 - stem / 2;
    const k = 0.5522847498;
    const flatten = 0.88;

    // Left stem
    builder.vStem(sb + stem / 2, round, xHeight - round * 2, stem);

    // Bottom curve
    builder
      .moveTo(sb + stem, cy)
      .curveTo(sb + stem, cy - rx * k, cx - rx * flatten, stem, cx, stem)
      .curveTo(cx + rx * flatten, stem, fullWidth - sb - stem, cy - rx * k, fullWidth - sb - stem, cy);

    // Right stem
    builder.vStem(fullWidth - sb - stem / 2, round, xHeight - round * 2, stem);

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

// y — v with descender
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
    const round = p.terminalRound || 4;

    const width = xHeight * 0.9 + sb * 2;
    const midY = xHeight * 0.5;
    const apexX = width / 2;

    // Upper left diagonal
    builder.moveTo(sb + stem, xHeight - round);
    builder.lineTo(apexX - stem / 2, midY);
    builder.lineTo(apexX + stem / 2, midY);
    builder.lineTo(sb + stem * 2, xHeight - round);
    builder.closePath();

    // Upper right diagonal
    builder.moveTo(width - sb - stem, xHeight - round);
    builder.lineTo(apexX + stem / 2, midY);
    builder.lineTo(apexX - stem / 2, midY);
    builder.lineTo(width - sb - stem * 2, xHeight - round);
    builder.closePath();

    // Lower stem with descender
    builder.vStem(width / 2, descender * 0.5, midY - round * 2, stem);

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
