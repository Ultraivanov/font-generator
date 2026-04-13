// Lowercase Glyphs - Component-Based Construction
// n, o, a, b, d, h, m, p, q, u, v, w, x, y

import { GlyphDefinition, GlyphParams } from '../types.js';
import { PathBuilderV2, createPathV2 } from '../core/path-builder-v2.js';
import { BrockmannStyle } from '../core/style-profile.js';
import { 
  drawStem, drawBar, drawBowl, drawDiagonal, 
  drawArch, drawCrossingDiagonals 
} from '../core/components.js';
import { computeOpticalMetrics, computeXHeightAdjustment } from '../core/optical.js';
import { computeStrokeWidth } from '../core/style-profile.js';

const style = BrockmannStyle;

// n - Stem + arch
export const n: GlyphDefinition = {
  unicode: 0x006e,
  name: 'n',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('n', p.xHeight, style);
    
    const metrics = computeOpticalMetrics('n', {
      width: xHeight * 0.88 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const leftX = metrics.leftSidebearing + stemWidth/2;
    const rightX = metrics.width - metrics.rightSidebearing - stemWidth/2;
    
    // Left stem
    drawStem(builder, leftX, 0, xHeight, stemWidth, style);
    // Right stem
    drawStem(builder, rightX, 0, xHeight, stemWidth, style);
    // Arch connecting at top
    drawArch(builder, leftX, rightX, xHeight, xHeight * 0.35, stemWidth, style);
    
    n.advanceWidth = metrics.width;
    return builder.build();
  }
};

// o - Closed bowl
export const o: GlyphDefinition = {
  unicode: 0x006f,
  name: 'o',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('o', p.xHeight, style);
    
    const metrics = computeOpticalMetrics('o', {
      width: xHeight * 0.9 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const bowlRx = (metrics.width - metrics.leftSidebearing - metrics.rightSidebearing)/2 - p.weight/2;
    const bowlRy = xHeight/2 - p.weight/2;
    
    drawBowl(builder, metrics.width/2, xHeight/2, bowlRx, bowlRy, p.weight, style);
    
    o.advanceWidth = metrics.width;
    return builder.build();
  }
};

// a - Bowl + right stem (two-story)
export const a: GlyphDefinition = {
  unicode: 0x0061,
  name: 'a',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('a', p.xHeight, style);
    
    const metrics = computeOpticalMetrics('a', {
      width: xHeight * 0.9 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const stemX = metrics.width - metrics.rightSidebearing - stemWidth/2;
    const bowlRx = (metrics.width - metrics.leftSidebearing - metrics.rightSidebearing - stemWidth) * 0.65;
    const bowlRy = xHeight/2 - stemWidth/2;
    const bowlCx = metrics.leftSidebearing + bowlRx;
    
    // Right stem
    drawStem(builder, stemX, 0, xHeight, stemWidth, style);
    // Left bowl
    drawBowl(builder, bowlCx, xHeight/2, bowlRx, bowlRy, stemWidth, style, {
      aperture: 0.4,
      openSide: 'right'
    });
    
    a.advanceWidth = metrics.width;
    return builder.build();
  }
};

// b - Left stem + right bowl
export const b: GlyphDefinition = {
  unicode: 0x0062,
  name: 'b',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('b', p.xHeight, style);
    const ascender = p.ascender;
    
    const metrics = computeOpticalMetrics('b', {
      width: xHeight * 0.88 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const stemX = metrics.leftSidebearing + stemWidth/2;
    const bowlRx = (metrics.width - metrics.leftSidebearing - metrics.rightSidebearing - stemWidth) * 0.65;
    const bowlRy = xHeight/2 - stemWidth/2;
    const bowlCx = stemX + stemWidth/2 + bowlRx;
    
    // Left stem to ascender
    drawStem(builder, stemX, 0, ascender, stemWidth, style);
    // Right bowl
    drawBowl(builder, bowlCx, xHeight/2, bowlRx, bowlRy, stemWidth, style, {
      aperture: 0,
      openSide: 'none'
    });
    
    b.advanceWidth = metrics.width;
    return builder.build();
  }
};

// d - Left bowl + right stem
export const d: GlyphDefinition = {
  unicode: 0x0064,
  name: 'd',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('d', p.xHeight, style);
    const ascender = p.ascender;
    
    const metrics = computeOpticalMetrics('d', {
      width: xHeight * 0.88 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const stemX = metrics.width - metrics.rightSidebearing - stemWidth/2;
    const bowlRx = (metrics.width - metrics.leftSidebearing - metrics.rightSidebearing - stemWidth) * 0.65;
    const bowlRy = xHeight/2 - stemWidth/2;
    const bowlCx = stemX - stemWidth/2 - bowlRx;
    
    // Right stem to ascender
    drawStem(builder, stemX, 0, ascender, stemWidth, style);
    // Left bowl
    drawBowl(builder, bowlCx, xHeight/2, bowlRx, bowlRy, stemWidth, style, {
      aperture: 0,
      openSide: 'none'
    });
    
    d.advanceWidth = metrics.width;
    return builder.build();
  }
};

// h - Ascender stem + arch
export const h: GlyphDefinition = {
  unicode: 0x0068,
  name: 'h',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('h', p.xHeight, style);
    const ascender = p.ascender;
    
    const metrics = computeOpticalMetrics('h', {
      width: xHeight * 0.88 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const leftX = metrics.leftSidebearing + stemWidth/2;
    const rightX = metrics.width - metrics.rightSidebearing - stemWidth/2;
    
    // Left stem to ascender
    drawStem(builder, leftX, 0, ascender, stemWidth, style);
    // Right stem to xHeight
    drawStem(builder, rightX, 0, xHeight, stemWidth, style);
    // Arch connecting at xHeight
    drawArch(builder, leftX, rightX, xHeight, xHeight * 0.35, stemWidth, style);
    
    h.advanceWidth = metrics.width;
    return builder.build();
  }
};

// m - Triple stem + double arch
export const m: GlyphDefinition = {
  unicode: 0x006d,
  name: 'm',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('m', p.xHeight, style);
    
    const metrics = computeOpticalMetrics('m', {
      width: xHeight * 1.4 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const leftX = metrics.leftSidebearing + stemWidth/2;
    const midX = metrics.width / 2;
    const rightX = metrics.width - metrics.rightSidebearing - stemWidth/2;
    
    // Three stems
    drawStem(builder, leftX, 0, xHeight, stemWidth, style);
    drawStem(builder, midX, 0, xHeight, stemWidth, style);
    drawStem(builder, rightX, 0, xHeight, stemWidth, style);
    
    // Two arches
    drawArch(builder, leftX, midX, xHeight, xHeight * 0.35, stemWidth, style);
    drawArch(builder, midX, rightX, xHeight, xHeight * 0.35, stemWidth, style);
    
    m.advanceWidth = metrics.width;
    return builder.build();
  }
};

// p - Left stem to descender + right bowl
export const p: GlyphDefinition = {
  unicode: 0x0070,
  name: 'p',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('p', p.xHeight, style);
    const descender = p.descender;
    
    const metrics = computeOpticalMetrics('p', {
      width: xHeight * 0.88 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const stemX = metrics.leftSidebearing + stemWidth/2;
    const bowlRx = (metrics.width - metrics.leftSidebearing - metrics.rightSidebearing - stemWidth) * 0.65;
    const bowlRy = xHeight/2 - stemWidth/2;
    const bowlCx = stemX + stemWidth/2 + bowlRx;
    
    // Left stem to descender
    drawStem(builder, stemX, descender * 0.7, xHeight - descender * 0.7, stemWidth, style);
    // Right bowl
    drawBowl(builder, bowlCx, xHeight/2, bowlRx, bowlRy, stemWidth, style);
    
    p.advanceWidth = metrics.width;
    return builder.build();
  }
};

// u - Left bowl + right stem
export const u: GlyphDefinition = {
  unicode: 0x0075,
  name: 'u',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = computeXHeightAdjustment('u', p.xHeight, style);
    
    const metrics = computeOpticalMetrics('u', {
      width: xHeight * 0.88 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const leftX = metrics.leftSidebearing + stemWidth/2;
    const rightX = metrics.width - metrics.rightSidebearing - stemWidth/2;
    
    // Left stem
    drawStem(builder, leftX, 0, xHeight, stemWidth, style);
    // Right stem
    drawStem(builder, rightX, 0, xHeight, stemWidth, style);
    // Bottom arch (inverted from n)
    drawArch(builder, leftX, rightX, 0, xHeight * 0.35, stemWidth, style);
    
    u.advanceWidth = metrics.width;
    return builder.build();
  }
};

// v - Two diagonals (keep existing as it's good)
export const v: GlyphDefinition = {
  unicode: 0x0076,
  name: 'v',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = p.xHeight;
    
    const metrics = computeOpticalMetrics('v', {
      width: xHeight * 0.85 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const apexX = metrics.width / 2;
    const apexY = 0;
    const topY = xHeight;
    const leftTopX = metrics.leftSidebearing + stemWidth;
    const rightTopX = metrics.width - metrics.rightSidebearing - stemWidth;
    
    drawDiagonal(builder, leftTopX, topY, apexX, apexY, stemWidth, style);
    drawDiagonal(builder, rightTopX, topY, apexX, apexY, stemWidth, style);
    
    v.advanceWidth = metrics.width;
    return builder.build();
  }
};

// w - Double v (keep existing)
export const w: GlyphDefinition = {
  unicode: 0x0077,
  name: 'w',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = p.xHeight;
    
    const metrics = computeOpticalMetrics('w', {
      width: xHeight * 1.25 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    const topY = xHeight;
    const midY = xHeight * 0.45;
    const bottomY = 0;
    
    const x1 = metrics.leftSidebearing + stemWidth;
    const x2 = metrics.width * 0.28;
    const x3 = metrics.width * 0.5;
    const x4 = metrics.width * 0.72;
    const x5 = metrics.width - metrics.rightSidebearing - stemWidth;
    
    drawDiagonal(builder, x1, topY, x2, bottomY, stemWidth, style);
    drawDiagonal(builder, x2, bottomY, x3, midY, stemWidth, style);
    drawDiagonal(builder, x3, midY, x4, bottomY, stemWidth, style);
    drawDiagonal(builder, x4, bottomY, x5, topY, stemWidth, style);
    
    w.advanceWidth = metrics.width;
    return builder.build();
  }
};

// x - Crossing diagonals (keep existing)
export const x: GlyphDefinition = {
  unicode: 0x0078,
  name: 'x',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const xHeight = p.xHeight;
    
    const metrics = computeOpticalMetrics('x', {
      width: xHeight * 0.88 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, false);
    
    const stemWidth = p.weight;
    
    drawCrossingDiagonals(builder, {
      x: metrics.leftSidebearing,
      y: 0,
      width: metrics.width - metrics.leftSidebearing - metrics.rightSidebearing,
      height: xHeight
    }, stemWidth, style);
    
    x.advanceWidth = metrics.width;
    return builder.build();
  }
};

// Export all lowercase
export const lowercase: GlyphDefinition[] = [
  n, o, a, b, d, h, m, p, u, v, w, x
  // q, y, others to add
];
