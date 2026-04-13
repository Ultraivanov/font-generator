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

export const o: GlyphDefinition = {
  unicode: 0x006f,
  name: 'o',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const sb = p.sidebearing;
    const stem = p.weight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    // Oval shape for geometric sans
    const width = xHeight * 0.85; // Slightly condensed
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = xHeight / 2;
    const rx = width / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;

    // Outer oval
    const builder = createPath();

    // Draw as ellipse with overshoot
    const c = 0.5522847498;
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Outer contour
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Inner contour (counter)
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    o.advanceWidth = fullWidth;

    return builder.build();
  },
};

export const lowercase: GlyphDefinition[] = [n, o];
