#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { buildFont } from './builder/font-builder.js';
import { createFontConfig, regularParams } from './config/default.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Output directory
const outputDir = join(__dirname, '..', 'output');

try {
  mkdirSync(outputDir, { recursive: true });
} catch {
  // Directory already exists
}

console.log('🛠  Generating Brockmann-style typeface\n');
console.log('   Josef Müller-Brockmann inspired\n');
console.log('   Reference: Musica Viva posters (1950s)\n');

// Generate Regular (core design)
const regularConfig = createFontConfig('Brockmann', 'Regular', regularParams, '1.0.0');
const regularFont = buildFont(regularConfig);
const regularBuffer = Buffer.from(regularFont.toArrayBuffer());
writeFileSync(join(outputDir, 'Brockmann-Regular.otf'), regularBuffer);
console.log('✓ Brockmann-Regular.otf generated (400)');

// Generate Italic (true italic, ~9° slant)
const italicParams = { ...regularParams };
const italicConfig = createFontConfig('Brockmann', 'Italic', italicParams, '1.0.0');
const italicFont = buildFont(italicConfig);
const italicBuffer = Buffer.from(italicFont.toArrayBuffer());
writeFileSync(join(outputDir, 'Brockmann-Italic.otf'), italicBuffer);
console.log('✓ Brockmann-Italic.otf generated (400 italic)');

console.log('\n📁 Output: ./output/');
console.log('\n📝 Character Set:');
console.log('   • Uppercase: A-Z (26 glyphs, squarish proportions)');
console.log('   • Lowercase: a-z (26 glyphs, open apertures)');
console.log('   • Italic: selective glyphs (9° slant, constructive)');
console.log('   • Numbers: 0-9 (10 glyphs)');
console.log('   • Punctuation: basic + € $ £ ← →');
console.log('\n✨ Design Features:');
console.log('   • Square-circle geometry (not perfect circles)');
console.log('   • Open apertures (a, c, e)');
console.log('   • Subtle terminal rounding');
console.log('   • Large x-height (74% of cap)');
console.log('   • Monolinear stroke');
console.log('   • True italic construction');
console.log('\n📐 Technical:');
console.log('   • Units Per Em: 1000');
console.log('   • xHeight: 520 | CapHeight: 700');
console.log('   • Ascender: 750 | Descender: -200');
console.log('   • Stem width: 85 (Regular)');
