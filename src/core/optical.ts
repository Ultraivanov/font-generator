// Optical Corrections System
// Width, intersection, and visual balance adjustments

import { StyleProfile } from './style-profile.js';

// Optical width categories for letters
export type WidthCategory = 'wide' | 'normal' | 'narrow' | 'v-shaped';

// Letter width modifiers (relative to base width)
const widthModifiers: Record<WidthCategory, number> = {
  wide: 1.08,      // H, O — appear wider
  normal: 1.0,     // Default
  narrow: 0.94,    // A, V — pointy, need less space
  'v-shaped': 0.88 // W, Y — very pointy
};

// Categorize letters by their optical width needs
export function getWidthCategory(char: string): WidthCategory {
  const wide = ['H', 'O', 'Q', 'G', 'U', 'C', 'D', 'b', 'd', 'o', 'p', 'q', 'h', 'n', 'u', 'm'];
  const narrow = ['A', 'T', 'L', 'F', 'E', 'Z', 't', 'f', 'l', 'r'];
  const vShaped = ['V', 'W', 'Y', 'M', 'v', 'w', 'y'];
  
  if (wide.includes(char)) return 'wide';
  if (narrow.includes(char)) return 'narrow';
  if (vShaped.includes(char)) return 'v-shaped';
  return 'normal';
}

// Compute optical width for a glyph
export function computeOpticalWidth(
  baseWidth: number,
  char: string,
  style: StyleProfile
): number {
  if (!style.opticalWidth) return baseWidth;
  
  const category = getWidthCategory(char);
  const modifier = widthModifiers[category];
  
  return Math.round(baseWidth * modifier);
}

// Sidebearing adjustments based on letter shape
export function computeSidebearings(
  baseSidebearing: number,
  char: string,
  isLeft: boolean
): number {
  // Letters with open sides need more space
  const openLeft = ['C', 'G', 'Q', 'S', 'c', 'e', 's', 'a'];
  const openRight = ['C', 'G', 'Q', 'S', 'f', 'r', 't'];
  const pointyLeft = ['A', 'V', 'W', 'Y', 'v', 'w', 'y'];
  const pointyRight = ['A', 'V', 'W', 'Y', 'v', 'w', 'y'];
  
  let adjustment = 1.0;
  
  if (isLeft) {
    if (openLeft.includes(char)) adjustment = 1.05;
    if (pointyLeft.includes(char)) adjustment = 0.92;
  } else {
    if (openRight.includes(char)) adjustment = 1.05;
    if (pointyRight.includes(char)) adjustment = 0.92;
  }
  
  return Math.round(baseSidebearing * adjustment);
}

// Intersection correction at stroke joins
// Creates subtle ink traps or serif-like compensation
export function computeIntersectionCorrection(
  strokeWidth: number,
  angle: number, // Angle of intersection in degrees
  style: StyleProfile
): number {
  if (style.intersectionCorrection === 0) return 0;
  
  // More correction for sharper angles
  const sharpness = Math.abs(90 - (angle % 90));
  const correctionFactor = (sharpness / 90) * style.intersectionCorrection;
  
  return strokeWidth * correctionFactor;
}

// Dynamic x-height micro-adjustments
// Certain lowercase letters need subtle height adjustments
export function computeXHeightAdjustment(
  char: string,
  baseXHeight: number,
  style: StyleProfile
): number {
  if (!style.dynamicXHeight) return baseXHeight;
  
  // Letters that appear too tall or short optically
  const adjustments: Record<string, number> = {
    's': -0.015,    // S appears taller, lower slightly
    'o': 0,         // Reference
    'e': 0.008,     // E appears shorter
    'a': 0.005,     // A bowl needs slight boost
    'c': 0.012,     // C appears shorter
    'x': -0.008,    // X appears taller
    'z': 0.010,     // Z appears shorter
  };
  
  const adjustment = adjustments[char] || 0;
  return Math.round(baseXHeight * (1 + adjustment));
}

// Overshoot for round letters (optical correction to appear same height)
export function computeOvershoot(
  baseOvershoot: number,
  char: string,
  isCap: boolean
): number {
  // Round letters need more overshoot than pointy ones
  const round = ['O', 'Q', 'C', 'G', 'U', 'o', 'c', 'e', 's'];
  const slightlyRound = ['D', 'b', 'd', 'p', 'q'];
  
  let multiplier = 1.0;
  if (round.includes(char)) multiplier = 1.2;
  if (slightlyRound.includes(char)) multiplier = 1.1;
  
  // Caps need slightly less relative overshoot
  if (isCap) multiplier *= 0.9;
  
  return Math.round(baseOvershoot * multiplier);
}

// Cap height adjustments for specific letters
export function computeCapHeight(
  baseCapHeight: number,
  char: string
): number {
  // Some caps appear shorter/taller
  const taller = ['A', 'V', 'W', 'Y'];
  const shorter = ['G', 'S', 'C'];
  
  if (taller.includes(char)) return Math.round(baseCapHeight * 1.01);
  if (shorter.includes(char)) return Math.round(baseCapHeight * 0.995);
  
  return baseCapHeight;
}

// Ascender height (b, d, f, h, k, l) adjustments
export function computeAscenderHeight(
  baseAscender: number,
  char: string
): number {
  // f and t have shorter ascenders usually
  const shortAscenders = ['f', 't'];
  
  if (shortAscenders.includes(char)) {
    return Math.round(baseAscender * 0.92);
  }
  
  return baseAscender;
}

// Descender depth (g, j, p, q, y) adjustments
export function computeDescenderDepth(
  baseDescender: number,
  char: string
): number {
  // Some descenders need to go deeper for visual balance
  const deeper = ['j', 'y'];
  const shallower = ['p'];
  
  if (deeper.includes(char)) return Math.round(baseDescender * 1.05);
  if (shallower.includes(char)) return Math.round(baseDescender * 0.98);
  
  return baseDescender;
}

// Complete optical metrics for a glyph
export interface OpticalMetrics {
  width: number;
  leftSidebearing: number;
  rightSidebearing: number;
  xHeight?: number;
  capHeight?: number;
  ascender?: number;
  descender?: number;
  overshoot: number;
}

export function computeOpticalMetrics(
  char: string,
  baseMetrics: {
    width: number;
    sidebearing: number;
    xHeight: number;
    capHeight: number;
    ascender: number;
    descender: number;
    overshoot: number;
  },
  style: StyleProfile,
  isCap: boolean
): OpticalMetrics {
  const width = computeOpticalWidth(baseMetrics.width, char, style);
  const leftSB = computeSidebearings(baseMetrics.sidebearing, char, true);
  const rightSB = computeSidebearings(baseMetrics.sidebearing, char, false);
  
  const result: OpticalMetrics = {
    width,
    leftSidebearing: leftSB,
    rightSidebearing: rightSB,
    overshoot: computeOvershoot(baseMetrics.overshoot, char, isCap)
  };
  
  if (isCap) {
    result.capHeight = computeCapHeight(baseMetrics.capHeight, char);
  } else {
    result.xHeight = computeXHeightAdjustment(char, baseMetrics.xHeight, style);
    result.ascender = computeAscenderHeight(baseMetrics.ascender, char);
    result.descender = computeDescenderDepth(baseMetrics.descender, char);
  }
  
  return result;
}
