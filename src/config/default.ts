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
  sidebearing: 60,
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

// Preset configurations
export const presets = {
  regular: () => createFontConfig('Haifa', 'Regular', regularParams),
  bold: () => createFontConfig('Haifa', 'Bold', boldParams),
  light: () => createFontConfig('Haifa', 'Light', lightParams),
};
