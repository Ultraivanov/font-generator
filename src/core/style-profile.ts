// Style Profile System - Parametric Font Generation
// Defines visual characteristics and generates geometry parameters

export interface StyleProfile {
  // Core geometry modifiers
  squareness: number;        // 0.0 = circular, 1.0 = square (Brockmann: ~0.85)
  roundingTerminals: number; // Terminal rounding as % of stroke (Brockmann: ~0.3)
  aperture: number;         // Aperture openness, -1 to +1 (Brockmann: +0.8)
  contrastRatio: number;   // Vertical/horizontal stroke ratio (Brockmann: ~0.85)
  
  // Optical corrections
  opticalWidth: boolean;    // H wider than O, O wider than A
  intersectionCorrection: number; // Ink trap/serif compensation at joins (0-1)
  dynamicXHeight: boolean;  // Micro-adjustments per glyph
  
  // Stroke modulation
  stemModulation: number;   // Thickening at stems (0-1)
  joinModulation: number;   // Thickening at joins (0-1)
}

// Brockmann-style Swiss Grotesk
export const BrockmannStyle: StyleProfile = {
  squareness: 0.88,
  roundingTerminals: 0.25,
  aperture: 0.85,
  contrastRatio: 0.88,  // Horizontals ~12% thinner than verticals
  opticalWidth: true,
  intersectionCorrection: 0.15,
  dynamicXHeight: true,
  stemModulation: 0.05,
  joinModulation: 0.12,
};

// More geometric, less rounded
export const strictBrockmann: StyleProfile = {
  ...BrockmannStyle,
  squareness: 0.95,
  roundingTerminals: 0.15,
  aperture: 0.75,
};

// More open, friendly
export const openBrockmann: StyleProfile = {
  ...BrockmannStyle,
  squareness: 0.75,
  roundingTerminals: 0.4,
  aperture: 0.95,
};

// Compute actual stroke width based on orientation and style
export function computeStrokeWidth(
  baseWidth: number,
  isHorizontal: boolean,
  isTerminal: boolean,
  isJoin: boolean,
  style: StyleProfile
): number {
  let width = baseWidth;
  
  // Apply contrast ratio for horizontals
  if (isHorizontal) {
    width *= style.contrastRatio;
  }
  
  // Add modulation at joins
  if (isJoin) {
    width *= (1 + style.joinModulation);
  }
  
  // Slight modulation at stems
  if (!isJoin && !isTerminal) {
    width *= (1 + style.stemModulation);
  }
  
  return Math.round(width);
}

// Compute superellipse squareness for a specific context
export function computeSquareness(
  baseSquareness: number,
  isBowl: boolean,
  isArch: boolean
): number {
  // Bowls are more square, arches slightly less
  if (isBowl) return Math.min(0.98, baseSquareness * 1.02);
  if (isArch) return baseSquareness * 0.95;
  return baseSquareness;
}

// Compute terminal rounding radius
export function computeTerminalRadius(
  strokeWidth: number,
  style: StyleProfile
): number {
  return strokeWidth * style.roundingTerminals;
}

// Apply aperture openness to a shape
export function applyAperture(
  openingWidth: number,
  aperture: number
): number {
  // Higher aperture = wider opening
  return openingWidth * (0.5 + aperture * 0.5);
}
