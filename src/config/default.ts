import { FontConfig, GlyphParams } from '../types.js';

// Default configuration inspired by Swiss typography (Brockmann reference)
// Using 1000 UPM (Units Per Em) for precision

export const defaultMetrics = {
  unitsPerEm: 1000,
  ascender: 800,
  descender: -200,
  xHeight: 500,
  capHeight: 700,
};

// Regular weight parameters
export const regularParams: GlyphParams = {
  weight: 80,        // Stem width
  width: 600,        // Standard glyph width
  ascender: 800,
  descender: -200,
  xHeight: 500,
  capHeight: 700,
  overshoot: 10,     // Optical correction for round shapes
  sidebearing: 50,   // Default left/right spacing
  contrast: 1.0,     // No contrast for geometric sans
  stress: 0,         // No stress (vertical axis)
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
