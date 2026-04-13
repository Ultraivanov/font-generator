import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Lowercase latin glyphs
// Swiss/Geometric style: clean, functional, minimal contrast

export const n: GlyphDefinition = {
  unicode: 0x006e,
  name: 'n',
  advanceWidth: 0, // Will be calculated
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;

    // Calculate advance width
    const width = sb * 2 + stem * 3; // Left stem + arch + right stem approximation

    // Left stem
    builder.vStem(sb + stem / 2, 0, xHeight, stem);

    // Right stem
    builder.vStem(width - sb - stem / 2, 0, xHeight, stem);

    // Arch (shoulder) connecting the stems
    // Using bezier curves for smooth arch
    const archStart = sb + stem;
    const archEnd = width - sb - stem;
    const archHeight = xHeight - stem / 2;
    const archY = xHeight;

    builder
      .moveTo(archStart, archY)
      .curveTo(
        archStart + (archEnd - archStart) * 0.3,
        archY,
        archStart + (archEnd - archStart) * 0.3,
        archHeight,
        archStart + (archEnd - archStart) * 0.5,
        archHeight
      )
      .curveTo(
        archStart + (archEnd - archStart) * 0.7,
        archHeight,
        archStart + (archEnd - archStart) * 0.7,
        archY,
        archEnd,
        archY
      );

    // Set advance width
    n.advanceWidth = width;

    return builder.build();
  },
};

// o - Brockmann: perfect circle
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

    // Perfect circle: diameter = x-height
    const bowlD = xHeight;
    const r = bowlD / 2 - stem / 2;
    const cx = sb + bowlD / 2;
    const cy = xHeight / 2;
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

    o.advanceWidth = sb + bowlD + sb;
    return builder.build();
  },
};

export const lowercase: GlyphDefinition[] = [n, o];
