// Core types for parametric font generation

export interface Point {
  x: number;
  y: number;
}

export interface CurveCommand {
  type: 'M' | 'L' | 'C' | 'Q' | 'Z';
  points: Point[];
}

export interface GlyphPath {
  commands: CurveCommand[];
}

export interface GlyphDefinition {
  unicode: number;
  advanceWidth: number;
  name: string;
  build: (params: GlyphParams) => GlyphPath;
}

export interface GlyphParams {
  // Stem thickness
  weight: number;
  // Width of the glyph
  width: number;
  // Height metrics
  ascender: number;
  descender: number;
  xHeight: number;
  capHeight: number;
  // Optical corrections
  overshoot: number;
  // Spacing
  sidebearing: number;
  // Geometric parameters
  contrast: number;
  stress: number;
}

export interface FontMetrics {
  unitsPerEm: number;
  ascender: number;
  descender: number;
  xHeight: number;
  capHeight: number;
}

export interface FontConfig {
  familyName: string;
  styleName: string;
  version: string;
  metrics: FontMetrics;
  params: GlyphParams;
}
