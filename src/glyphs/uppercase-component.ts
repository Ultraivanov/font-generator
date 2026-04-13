// Uppercase Glyphs - Component-Based Construction
// Built from Stem, Bowl, Arch, Diagonal, Superellipse components

import { GlyphDefinition, GlyphParams } from '../types.js';
import { PathBuilderV2, createPathV2 } from '../core/path-builder-v2.js';
import { BrockmannStyle } from '../core/style-profile.js';
import { 
  drawStem, drawBar, drawBowl, drawDiagonal, 
  drawCrossingDiagonals 
} from '../core/components.js';
import { computeOpticalMetrics } from '../core/optical.js';
import { computeStrokeWidth } from '../core/style-profile.js';

const style = BrockmannStyle;

// H - Two stems + crossbar (with optical thinning on horizontal)
export const H: GlyphDefinition = {
  unicode: 0x0048,
  name: 'H',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('H', {
      width: p.capHeight * 0.95 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const stemWidth = p.weight;
    const barHeight = computeStrokeWidth(stemWidth, true, false, false, style);
    const barY = p.capHeight * 0.52;
    
    // Left stem
    drawStem(builder, metrics.leftSidebearing + stemWidth/2, 0, p.capHeight, stemWidth, style, {
      topRound: 0, bottomRound: 0
    });
    
    // Right stem
    drawStem(builder, metrics.width - metrics.rightSidebearing - stemWidth/2, 0, p.capHeight, stemWidth, style, {
      topRound: 0, bottomRound: 0
    });
    
    // Crossbar (thinner)
    drawBar(builder, 
      metrics.leftSidebearing + stemWidth, 
      barY, 
      metrics.width - metrics.leftSidebearing - metrics.rightSidebearing - stemWidth * 2,
      barHeight,
      style
    );
    
    H.advanceWidth = metrics.width;
    return builder.build();
  }
};

// O - Superellipse bowl with counter
export const O: GlyphDefinition = {
  unicode: 0x004f,
  name: 'O',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('O', {
      width: p.capHeight + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const bowlRx = (metrics.width - metrics.leftSidebearing - metrics.rightSidebearing) / 2 - p.weight/2;
    const bowlRy = p.capHeight / 2 - p.weight/2 + metrics.overshoot;
    
    drawBowl(builder, metrics.width/2, p.capHeight/2, bowlRx, bowlRy, p.weight, style);
    
    O.advanceWidth = metrics.width;
    return builder.build();
  }
};

// D - Straight stem + curved bowl
export const D: GlyphDefinition = {
  unicode: 0x0044,
  name: 'D',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('D', {
      width: p.capHeight * 0.92 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const stemWidth = p.weight;
    const stemX = metrics.leftSidebearing + stemWidth/2;
    
    // Left stem
    drawStem(builder, stemX, 0, p.capHeight, stemWidth, style);
    
    // Right bowl (partial - open on left)
    const bowlRx = (metrics.width - metrics.leftSidebearing - metrics.rightSidebearing - stemWidth) * 0.7;
    const bowlRy = p.capHeight/2 - p.weight/2 + metrics.overshoot;
    const bowlCx = stemX + stemWidth/2 + bowlRx;
    
    drawBowl(builder, bowlCx, p.capHeight/2, bowlRx, bowlRy, p.weight, style, {
      aperture: 0.3,
      openSide: 'left'
    });
    
    D.advanceWidth = metrics.width;
    return builder.build();
  }
};

// A - Two diagonals + crossbar
export const A: GlyphDefinition = {
  unicode: 0x0041,
  name: 'A',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('A', {
      width: p.capHeight * 0.85 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const stemWidth = p.weight;
    const barHeight = computeStrokeWidth(stemWidth, true, false, false, style);
    const barY = p.capHeight * 0.35;
    
    // Crossbar
    const barWidth = metrics.width * 0.4;
    drawBar(builder, (metrics.width - barWidth)/2, barY, barWidth, barHeight, style);
    
    // Left diagonal (with slight curve for Brockmann feel)
    const apexX = metrics.width / 2;
    const apexY = p.capHeight + metrics.overshoot;
    const baseY = 0;
    const leftBaseX = metrics.leftSidebearing;
    const rightBaseX = metrics.width - metrics.rightSidebearing;
    
    // Left stroke
    drawDiagonal(builder, leftBaseX, baseY, apexX, apexY, stemWidth, style);
    // Right stroke  
    drawDiagonal(builder, rightBaseX, baseY, apexX, apexY, stemWidth, style);
    
    A.advanceWidth = metrics.width;
    return builder.build();
  }
};

// V - Two diagonals meeting at bottom
export const V: GlyphDefinition = {
  unicode: 0x0056,
  name: 'V',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('V', {
      width: p.capHeight * 0.82 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const stemWidth = p.weight;
    const apexX = metrics.width / 2;
    const apexY = 0;
    const topY = p.capHeight;
    const leftTopX = metrics.leftSidebearing + stemWidth;
    const rightTopX = metrics.width - metrics.rightSidebearing - stemWidth;
    
    drawDiagonal(builder, leftTopX, topY, apexX, apexY, stemWidth, style);
    drawDiagonal(builder, rightTopX, topY, apexX, apexY, stemWidth, style);
    
    V.advanceWidth = metrics.width;
    return builder.build();
  }
};

// W - Double V
export const W: GlyphDefinition = {
  unicode: 0x0057,
  name: 'W',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('W', {
      width: p.capHeight * 1.25 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const stemWidth = p.weight;
    const topY = p.capHeight;
    const midY = p.capHeight * 0.45;
    const bottomY = 0;
    
    const x1 = metrics.leftSidebearing + stemWidth;
    const x2 = metrics.width * 0.28;
    const x3 = metrics.width * 0.5;
    const x4 = metrics.width * 0.72;
    const x5 = metrics.width - metrics.rightSidebearing - stemWidth;
    
    // Four diagonal strokes
    drawDiagonal(builder, x1, topY, x2, bottomY, stemWidth, style);
    drawDiagonal(builder, x2, bottomY, x3, midY, stemWidth, style);
    drawDiagonal(builder, x3, midY, x4, bottomY, stemWidth, style);
    drawDiagonal(builder, x4, bottomY, x5, topY, stemWidth, style);
    
    W.advanceWidth = metrics.width;
    return builder.build();
  }
};

// X - Crossing diagonals
export const X: GlyphDefinition = {
  unicode: 0x0058,
  name: 'X',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('X', {
      width: p.capHeight * 0.88 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const stemWidth = p.weight;
    
    drawCrossingDiagonals(builder, {
      x: metrics.leftSidebearing,
      y: 0,
      width: metrics.width - metrics.leftSidebearing - metrics.rightSidebearing,
      height: p.capHeight
    }, stemWidth, style);
    
    X.advanceWidth = metrics.width;
    return builder.build();
  }
};

// N - Two stems + diagonal
export const N: GlyphDefinition = {
  unicode: 0x004e,
  name: 'N',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('N', {
      width: p.capHeight * 0.9 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const stemWidth = p.weight;
    const leftX = metrics.leftSidebearing + stemWidth/2;
    const rightX = metrics.width - metrics.rightSidebearing - stemWidth/2;
    
    // Left stem
    drawStem(builder, leftX, 0, p.capHeight, stemWidth, style);
    // Right stem
    drawStem(builder, rightX, 0, p.capHeight, stemWidth, style);
    // Diagonal
    drawDiagonal(builder, leftX, p.capHeight, rightX, 0, stemWidth, style);
    
    N.advanceWidth = metrics.width;
    return builder.build();
  }
};

// M - Three stems + two diagonals
export const M: GlyphDefinition = {
  unicode: 0x004d,
  name: 'M',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPathV2();
    const metrics = computeOpticalMetrics('M', {
      width: p.capHeight * 1.05 + p.sidebearing * 2,
      sidebearing: p.sidebearing,
      xHeight: p.xHeight,
      capHeight: p.capHeight,
      ascender: p.ascender,
      descender: p.descender,
      overshoot: p.overshoot
    }, style, true);
    
    const stemWidth = p.weight;
    const leftX = metrics.leftSidebearing + stemWidth/2;
    const rightX = metrics.width - metrics.rightSidebearing - stemWidth/2;
    const midX = metrics.width / 2;
    const apexY = p.capHeight * 0.5;
    
    // Outer stems
    drawStem(builder, leftX, 0, p.capHeight, stemWidth, style);
    drawStem(builder, rightX, 0, p.capHeight, stemWidth, style);
    
    // Middle peak (as diagonal segments)
    drawDiagonal(builder, leftX, p.capHeight, midX, apexY, stemWidth, style);
    drawDiagonal(builder, midX, apexY, rightX, p.capHeight, stemWidth, style);
    
    M.advanceWidth = metrics.width;
    return builder.build();
  }
};

// Export all uppercase
export const uppercase: GlyphDefinition[] = [
  H, O, D, A, V, W, X, N, M
  // Placeholder for rest - would build full set
];
