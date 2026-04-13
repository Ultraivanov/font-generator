import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Uppercase latin glyphs
// Swiss/Geometric style: strict geometry, uniform weight

export const H: GlyphDefinition = {
  unicode: 0x0048,
  name: 'H',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    // Calculate width based on proportions
    const innerSpace = stem * 2.5; // Space between stems
    const width = sb * 2 + stem * 2 + innerSpace;

    // Left stem
    builder.vStem(sb + stem / 2, 0, capHeight, stem);

    // Right stem
    builder.vStem(width - sb - stem / 2, 0, capHeight, stem);

    // Crossbar at x-height (optical center)
    const crossbarY = p.xHeight / 2;
    builder.hStem(sb + stem / 2, crossbarY, width - sb * 2 - stem, stem);

    H.advanceWidth = width;

    return builder.build();
  },
};

// O - Brockmann: perfect circle
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

    // Perfect circle: diameter = capHeight
    const bowlD = capHeight;
    const r = bowlD / 2 - stem / 2;
    const cx = sb + bowlD / 2;
    const cy = capHeight / 2;
    const k = 0.5522847498;

    // Outer circle
    const outerR = r + stem / 2 + overshoot;
    builder.circle(cx, cy, outerR, overshoot);

    // Inner circle (counter)
    const innerR = r - stem / 2;
    builder
      .moveTo(cx + innerR, cy)
      .curveTo(cx + innerR, cy + innerR * k, cx + innerR * k, cy + innerR, cx, cy + innerR)
      .curveTo(cx - innerR * k, cy + innerR, cx - innerR, cy + innerR * k, cx - innerR, cy)
      .curveTo(cx - innerR, cy - innerR * k, cx - innerR * k, cy - innerR, cx, cy - innerR)
      .curveTo(cx + innerR * k, cy - innerR, cx + innerR, cy - innerR * k, cx + innerR, cy)
      .closePath();

    O.advanceWidth = sb + bowlD + sb;
    return builder.build();
  },
};

export const uppercase: GlyphDefinition[] = [H, O];
