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

export const O: GlyphDefinition = {
  unicode: 0x004f,
  name: 'O',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    // Circular/oval shape
    const width = capHeight * 0.88; // Slightly wider than tall
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = width / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;

    const builder = createPath();
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

    // Inner counter
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    O.advanceWidth = fullWidth;

    return builder.build();
  },
};

export const uppercase: GlyphDefinition[] = [H, O];
