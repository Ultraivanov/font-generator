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

// Export all uppercase
export const uppercase: GlyphDefinition[] = [H, O, C, G];
