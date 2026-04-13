import { FontConfig, GlyphParams } from '../types.js';

// Brockmann-style Swiss Grotesk metrics
// Contemporary reinterpretation of 1950s International Typographic Style
// Reference: Josef Müller-Brockmann's Musica Viva posters

export const defaultMetrics = {
  unitsPerEm: 1000,
  ascender: 750,        // Slightly shorter for tighter line spacing
  descender: -200,
  xHeight: 520,         // Large x-height (74% of cap) for legibility
  capHeight: 700,
};

// Regular weight parameters — Brockmann style
export const regularParams: GlyphParams = {
  weight: 85,        // Stem width — slightly heavier for presence
  width: 600,        // Standard glyph width
  ascender: 750,     // Balanced with descender
  descender: -200,
  xHeight: 520,      // Large x-height (74% of cap)
  capHeight: 700,
  overshoot: 12,     // Optical correction for square-round shapes
  sidebearing: 45,   // Tight spacing for editorial use
  contrast: 1.0,     // Monolinear stroke
  stress: 0,         // Vertical axis (neutral)
  // Terminal rounding: subtle (3-5 units)
  terminalRound: 4,
};

// Bold weight parameters
export const boldParams: GlyphParams = {
  ...regularParams,
  weight: 160,
  sidebearing: 40,
};

// Light weight parameters
export const lightParams: GlyphParams = {
  ...regularParams,
  weight: 40,
  sidebearing: 55,
};

// Thin weight parameters (wght: 100)
export const thinParams: GlyphParams = {
  ...regularParams,
  weight: 20,
  sidebearing: 65,
  overshoot: 8,
};

// ExtraLight weight parameters (wght: 200)
export const extraLightParams: GlyphParams = {
  ...regularParams,
  weight: 30,
  sidebearing: 60,
  overshoot: 9,
};

// Medium weight parameters (wght: 500)
export const mediumParams: GlyphParams = {
  ...regularParams,
  weight: 110,
  sidebearing: 45,
  overshoot: 11,
};

// SemiBold weight parameters (wght: 600)
export const semiBoldParams: GlyphParams = {
  ...regularParams,
  weight: 130,
  sidebearing: 42,
  overshoot: 12,
};

// Black weight parameters (wght: 900)
export const blackParams: GlyphParams = {
  ...regularParams,
  weight: 200,
  sidebearing: 35,
  overshoot: 15,
};

export function createFontConfig(
  familyName: string,
  styleName: string,
  params: GlyphParams = regularParams,
  version: string = '0.1.0'
): FontConfig {
  return {
    familyName,
    styleName,
    version,
    metrics: {
      unitsPerEm: defaultMetrics.unitsPerEm,
      ascender: params.ascender,
      descender: params.descender,
      xHeight: params.xHeight,
      capHeight: params.capHeight,
    },
    params,
  };
}

// Preset configurations - 8 weights
export const presets = {
  thin: () => createFontConfig('Haifa', 'Thin', thinParams),
  extraLight: () => createFontConfig('Haifa', 'ExtraLight', extraLightParams),
  light: () => createFontConfig('Haifa', 'Light', lightParams),
  regular: () => createFontConfig('Haifa', 'Regular', regularParams),
  medium: () => createFontConfig('Haifa', 'Medium', mediumParams),
  semiBold: () => createFontConfig('Haifa', 'SemiBold', semiBoldParams),
  bold: () => createFontConfig('Haifa', 'Bold', boldParams),
  black: () => createFontConfig('Haifa', 'Black', blackParams),
};
