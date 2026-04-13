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

// Export all lowercase
export const lowercase: GlyphDefinition[] = [n, o, a, c, e];
