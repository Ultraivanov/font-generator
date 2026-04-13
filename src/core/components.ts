// Component Library - Parametric Glyph Building Blocks
// Stem, Bowl, Arch, Shoulder, Tail - constructed with StyleProfile

import { PathBuilderV2, SuperellipseParams } from './path-builder-v2.js';
import { 
  StyleProfile, 
  computeStrokeWidth, 
  computeSquareness,
  computeTerminalRadius 
} from './style-profile.js';
import { Point } from '../types.js';

interface ComponentParams {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth: number;
}

// VERTICAL STEM with variable width and rounded terminals
export function drawStem(
  builder: PathBuilderV2,
  x: number,
  y: number,
  height: number,
  baseWidth: number,
  style: StyleProfile,
  options: {
    topRound?: number;
    bottomRound?: number;
    hasTopSerif?: boolean;
    hasBottomSerif?: boolean;
  } = {}
): number {
  const width = computeStrokeWidth(baseWidth, false, false, false, style);
  const topRadius = options.topRound !== undefined ? options.topRound : computeTerminalRadius(width, style);
  const bottomRadius = options.bottomRound !== undefined ? options.bottomRound : computeTerminalRadius(width, style);
  
  // Main rectangle with rounded corners
  builder.roundedRect(
    x - width / 2, y,
    width, height,
    topRadius, topRadius, bottomRadius, bottomRadius
  );
  
  return width;
}

// HORIZONTAL BAR with optical thinning
export function drawBar(
  builder: PathBuilderV2,
  x: number,
  y: number,
  width: number,
  baseHeight: number,
  style: StyleProfile,
  options: {
    leftRound?: number;
    rightRound?: number;
  } = {}
): number {
  const height = computeStrokeWidth(baseHeight, true, false, false, style);
  const leftRadius = options.leftRound || 0;
  const rightRadius = options.rightRound || 0;
  
  builder.roundedRect(
    x, y - height / 2,
    width, height,
    leftRadius, rightRadius, rightRadius, leftRadius
  );
  
  return height;
}

// BOWL - closed curve with superellipse and counter
export function drawBowl(
  builder: PathBuilderV2,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  strokeWidth: number,
  style: StyleProfile,
  options: {
    aperture?: number; // 0-1, how open is the bowl
    openSide?: 'left' | 'right' | 'none';
  } = {}
): void {
  const squareness = computeSquareness(style.squareness, true, false);
  const outerRx = rx + strokeWidth / 2;
  const outerRy = ry + strokeWidth / 2;
  const innerRx = rx - strokeWidth / 2;
  const innerRy = ry - strokeWidth / 2;
  
  // Outer superellipse
  builder.superellipse({
    cx, cy, 
    rx: outerRx, 
    ry: outerRy, 
    squareness,
    segments: 4
  });
  
  // Inner counter (if not fully open)
  if (options.aperture === undefined || options.aperture < 1) {
    const apertureFactor = 1 - (options.aperture || 0);
    
    if (options.openSide === 'right') {
      // Draw partial inner contour for open bowl (like 'a', 'd')
      // This creates a counter that's closed on left but open on right
      drawPartialBowlCounter(builder, cx, cy, innerRx, innerRy, squareness, 'left');
    } else if (options.openSide === 'left') {
      drawPartialBowlCounter(builder, cx, cy, innerRx, innerRy, squareness, 'right');
    } else {
      // Closed bowl - full counter (like 'o', 'b')
      builder.superellipse({
        cx, cy,
        rx: innerRx * apertureFactor,
        ry: innerRy * apertureFactor,
        squareness,
        segments: 4
      });
    }
  }
}

// Helper for partial bowl counters
function drawPartialBowlCounter(
  builder: PathBuilderV2,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  squareness: number,
  closedSide: 'left' | 'right'
): void {
  const k = 0.5522847498 * (1 - squareness * 0.3);
  
  if (closedSide === 'left') {
    // Draw left side only
    builder.moveTo(cx, cy - ry);
    builder.cubicTo(cx - rx * k, cy - ry, cx - rx, cy - ry * k, cx - rx, cy);
    builder.cubicTo(cx - rx, cy + ry * k, cx - rx * k, cy + ry, cx, cy + ry);
  } else {
    // Draw right side only
    builder.moveTo(cx, cy - ry);
    builder.cubicTo(cx + rx * k, cy - ry, cx + rx, cy - ry * k, cx + rx, cy);
    builder.cubicTo(cx + rx, cy + ry * k, cx + rx * k, cy + ry, cx, cy + ry);
  }
}

// ARCH - connecting two stems with curved shoulder
export function drawArch(
  builder: PathBuilderV2,
  leftX: number,
  rightX: number,
  baselineY: number,
  height: number,
  strokeWidth: number,
  style: StyleProfile
): void {
  const squareness = computeSquareness(style.squareness, false, true);
  const k = 0.5522847498 * (1 - squareness * 0.2);
  
  const midX = (leftX + rightX) / 2;
  const gap = rightX - leftX;
  const archRy = Math.min(height * 0.4, gap * 0.3);
  
  // Draw arch as a thick curved stroke
  const halfStroke = strokeWidth / 2;
  
  // Outer curve
  builder.moveTo(leftX + halfStroke, baselineY);
  builder.cubicTo(
    leftX + gap * 0.3, baselineY,
    midX - gap * 0.1, baselineY - archRy,
    midX, baselineY - archRy
  );
  builder.cubicTo(
    midX + gap * 0.1, baselineY - archRy,
    rightX - gap * 0.3, baselineY,
    rightX - halfStroke, baselineY
  );
  
  // Inner curve (back)
  builder.lineTo(rightX - halfStroke, baselineY - strokeWidth);
  builder.cubicTo(
    rightX - gap * 0.25, baselineY - strokeWidth,
    midX + gap * 0.05, baselineY - archRy + strokeWidth * 0.5,
    midX, baselineY - archRy + strokeWidth * 0.5
  );
  builder.cubicTo(
    midX - gap * 0.05, baselineY - archRy + strokeWidth * 0.5,
    leftX + gap * 0.25, baselineY - strokeWidth,
    leftX + halfStroke, baselineY - strokeWidth
  );
  
  builder.closePath();
}

// SHOULDER - angled connection for n, h, m
export function drawShoulder(
  builder: PathBuilderV2,
  leftStemX: number,
  rightStemX: number,
  topY: number,
  bottomY: number,
  strokeWidth: number,
  style: StyleProfile
): void {
  const gap = rightStemX - leftStemX;
  const height = bottomY - topY;
  const archDepth = Math.min(gap * 0.25, height * 0.35);
  const k = 0.5522847498;
  
  const halfStroke = strokeWidth / 2;
  const midX = (leftStemX + rightStemX) / 2;
  
  // Outer curve (top)
  builder.moveTo(leftStemX + halfStroke, topY);
  builder.cubicTo(
    leftStemX + gap * k, topY,
    midX, topY - archDepth * k,
    midX, topY - archDepth
  );
  builder.cubicTo(
    midX, topY - archDepth * k,
    rightStemX - gap * k, topY,
    rightStemX - halfStroke, topY
  );
  
  // Down right stem
  builder.lineTo(rightStemX - halfStroke, bottomY);
  builder.lineTo(rightStemX + halfStroke, bottomY);
  builder.lineTo(rightStemX + halfStroke, topY);
  
  // Inner curve back
  builder.cubicTo(
    rightStemX - gap * 0.3, topY + strokeWidth,
    midX + gap * 0.1, topY - archDepth + strokeWidth,
    midX, topY - archDepth + strokeWidth
  );
  builder.cubicTo(
    midX - gap * 0.1, topY - archDepth + strokeWidth,
    leftStemX + gap * 0.3, topY + strokeWidth,
    leftStemX + halfStroke, topY + strokeWidth
  );
  
  builder.closePath();
}

// TAIL - descender or ascender hook
export function drawTail(
  builder: PathBuilderV2,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  strokeWidth: number,
  style: StyleProfile,
  options: {
    direction?: 'left' | 'right';
    curve?: 'in' | 'out';
  } = {}
): void {
  const direction = options.direction || 'left';
  const curve = options.curve || 'out';
  const halfStroke = strokeWidth / 2;
  
  // Simple straight tail with rounded end
  const k = 0.5522847498;
  const endRound = computeTerminalRadius(strokeWidth, style);
  
  // Main tail stroke
  builder.roundedRect(
    Math.min(startX, endX) - halfStroke,
    Math.min(startY, endY),
    Math.abs(endX - startX) + strokeWidth,
    Math.abs(endY - startY),
    0, endRound, endRound, 0
  );
}

// DIAGONAL stroke with consistent width
export function drawDiagonal(
  builder: PathBuilderV2,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  strokeWidth: number,
  style: StyleProfile
): void {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  
  if (len < 0.001) return;
  
  // Perpendicular offset
  const perpX = (-dy / len) * strokeWidth / 2;
  const perpY = (dx / len) * strokeWidth / 2;
  
  // Build rectangular stroke
  builder.moveTo(x1 + perpX, y1 + perpY);
  builder.lineTo(x2 + perpX, y2 + perpY);
  builder.lineTo(x2 - perpX, y2 - perpY);
  builder.lineTo(x1 - perpX, y1 - perpY);
  builder.closePath();
}

// CROSSING diagonals (for X, x)
export function drawCrossingDiagonals(
  builder: PathBuilderV2,
  bounds: { x: number; y: number; width: number; height: number },
  strokeWidth: number,
  style: StyleProfile
): void {
  const { x, y, width, height } = bounds;
  const midX = x + width / 2;
  const midY = y + height / 2;
  
  // First diagonal: top-left to bottom-right
  drawDiagonal(builder, x, y + height, x + width, y, strokeWidth, style);
  
  // Second diagonal: top-right to bottom-left
  drawDiagonal(builder, x + width, y + height, x, y, strokeWidth, style);
}

// S-STEM - double curved stroke (for S, s)
export function drawSStem(
  builder: PathBuilderV2,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  strokeWidth: number,
  style: StyleProfile
): void {
  const squareness = computeSquareness(style.squareness, false, false);
  const k = 0.5522847498 * (1 - squareness * 0.3);
  
  // S is essentially two offset bowls
  const topCy = cy - ry;
  const bottomCy = cy + ry;
  const bowlRy = ry * 0.6;
  const bowlRx = rx * 0.7;
  
  const halfStroke = strokeWidth / 2;
  const outerHalfStroke = halfStroke * 1.1; // Slightly thicker for optical balance
  
  // Upper bowl (right side open)
  const topOuterRy = bowlRy + outerHalfStroke;
  const topInnerRy = bowlRy - halfStroke;
  
  // Upper bowl outer
  builder.moveTo(cx, topCy);
  builder.cubicTo(cx + bowlRx * k, topCy, cx + bowlRx, topCy + bowlRy * k, cx + bowlRx, topCy + bowlRy);
  builder.cubicTo(cx + bowlRx, topCy + topOuterRy * 2, cx, topCy + topOuterRy * 2, cx - bowlRx, topCy + bowlRy);
  
  // Connection to lower bowl
  builder.cubicTo(cx - bowlRx * 0.8, topCy + bowlRy * 0.5, cx - bowlRx * 0.5, cy, cx, cy);
  builder.cubicTo(cx + bowlRx * 0.5, cy, cx + bowlRx * 0.8, cy + bowlRy * 0.5, cx + bowlRx, bottomCy - bowlRy);
  
  // Lower bowl outer
  builder.cubicTo(cx + bowlRx, bottomCy - bowlRy * k, cx + bowlRx * k, bottomCy, cx, bottomCy);
  builder.cubicTo(cx - bowlRx * k, bottomCy, cx - bowlRx, bottomCy - bowlRy * k, cx - bowlRx, bottomCy - bowlRy);
  
  // Lower bowl inner
  builder.cubicTo(cx - bowlRx, bottomCy - topInnerRy * 2, cx, bottomCy - topInnerRy * 2, cx + bowlRx * 0.3, bottomCy - bowlRy);
  
  // Back through middle
  builder.cubicTo(cx + bowlRx * 0.2, cy, cx - bowlRx * 0.3, topCy + bowlRy * 1.5, cx - bowlRx, topCy + bowlRy);
  
  // Upper bowl inner
  builder.cubicTo(cx - bowlRx, topCy + topInnerRy * 2, cx, topCy + topInnerRy * 2, cx, topCy);
  
  builder.closePath();
}
