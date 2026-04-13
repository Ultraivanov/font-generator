import opentype from 'opentype.js';
import { FontConfig, GlyphDefinition, GlyphParams } from '../types.js';
import { toOpenTypePath, calculateBoundingBox } from '../core/opentype-converter.js';
import { lowercase } from '../glyphs/lowercase.js';
import { lowercaseFull } from '../glyphs/lowercase-full.js';
import { uppercase } from '../glyphs/uppercase.js';
import { uppercaseFull } from '../glyphs/uppercase-full.js';
import { numbers, tabularNumbers } from '../glyphs/numbers.js';
import { punctuation } from '../glyphs/punctuation.js';
import { cyrillic } from '../glyphs/cyrillic.js';
import { hebrew } from '../glyphs/hebrew.js';
import { generateKerningTable, kerningPairs } from '../core/kerning.js';

// Font builder: compiles glyph definitions into OpenType font

export interface GlyphSet {
  [key: string]: GlyphDefinition;
}

export class FontBuilder {
  private config: FontConfig;
  private glyphs: Map<number, GlyphDefinition> = new Map();
  private notdef: opentype.Glyph;

  constructor(config: FontConfig) {
    this.config = config;

    // Create .notdef glyph (required)
    this.notdef = new opentype.Glyph({
      name: '.notdef',
      unicode: 0,
      advanceWidth: config.params.width,
      path: new opentype.Path(),
    });

    // Register all glyph sets
    this.registerSet(lowercase);
    this.registerSet(lowercaseFull);
    this.registerSet(uppercase);
    this.registerSet(uppercaseFull);
    this.registerSet(numbers);
    this.registerSet(tabularNumbers);
    this.registerSet(punctuation);
    this.registerSet(cyrillic);
    this.registerSet(hebrew);
  }

  register(glyph: GlyphDefinition): void {
    this.glyphs.set(glyph.unicode, glyph);
  }

  registerSet(glyphs: GlyphDefinition[]): void {
    for (const glyph of glyphs) {
      this.register(glyph);
    }
  }

  build(): opentype.Font {
    const { config } = this;
    const otGlyphs: opentype.Glyph[] = [this.notdef];
    const glyphNameMap = new Map<number, string>();

    // Convert all registered glyphs to opentype format
    for (const [unicode, definition] of this.glyphs) {
      // Build the glyph path with current parameters
      const glyphPath = definition.build(config.params);
      const otPath = toOpenTypePath(glyphPath);
      const bbox = calculateBoundingBox(glyphPath);

      // Create opentype glyph
      const otGlyph = new opentype.Glyph({
        name: definition.name,
        unicode: unicode,
        advanceWidth: definition.advanceWidth || config.params.width,
        path: otPath,
        leftSideBearing: bbox.xMin,
      });

      otGlyphs.push(otGlyph);
      glyphNameMap.set(unicode, definition.name);
    }

    // Sort glyphs by unicode for proper encoding
    otGlyphs.sort((a, b) => (a.unicode || 0) - (b.unicode || 0));

    // Generate kerning table
    const kerningTable = generateKerningTable(glyphNameMap);

    // Create the font with kerning
    const font = new opentype.Font({
      familyName: config.familyName,
      styleName: config.styleName,
      unitsPerEm: config.metrics.unitsPerEm,
      ascender: config.metrics.ascender,
      descender: config.metrics.descender,
      glyphs: otGlyphs,
    });

    // Apply kerning pairs (opentype.js stores this in the kern table)
    if (font.tables && font.tables.kern) {
      font.tables.kern = {
        nTables: 1,
        kernTables: [{
          version: 0,
          nPairs: kerningPairs.length,
          coverage: 1,
          pairs: kerningPairs.map(pair => ({
            left: pair.left,
            right: pair.right,
            value: pair.value,
          })),
        }],
      };
    }

    return font;
  }

  // Generate font and return as ArrayBuffer
  generate(): ArrayBuffer {
    const font = this.build();
    return font.toArrayBuffer();
  }

  // Save font to file (for Node.js)
  saveToFile(path: string): void {
    const font = this.build();
    font.download(path);
  }
}

// Convenience function
export function buildFont(
  config: FontConfig,
  additionalGlyphs?: GlyphDefinition[]
): opentype.Font {
  const builder = new FontBuilder(config);

  if (additionalGlyphs) {
    builder.registerSet(additionalGlyphs);
  }

  return builder.build();
}
