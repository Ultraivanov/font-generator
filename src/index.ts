#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { buildFont } from './builder/font-builder.js';
import { VariableFontBuilder } from './builder/variable-font.js';
import { createFontConfig, regularParams, boldParams, lightParams } from './config/default.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Output directory
const outputDir = join(__dirname, '..', 'output');

try {
  mkdirSync(outputDir, { recursive: true });
} catch {
  // Directory already exists
}

console.log('🛠  Generating Haifa font family...\n');
console.log('   Inspired by Constructivist architecture of Haifa\n');

// Generate Regular weight
const regularConfig = createFontConfig('Haifa', 'Regular', regularParams, '0.1.0');
const regularFont = buildFont(regularConfig);
const regularBuffer = Buffer.from(regularFont.toArrayBuffer());
writeFileSync(join(outputDir, 'Haifa-Regular.otf'), regularBuffer);
console.log('✓ Haifa-Regular.otf generated (400)');

// Generate Bold weight
const boldConfig = createFontConfig('Haifa', 'Bold', boldParams, '0.1.0');
const boldFont = buildFont(boldConfig);
const boldBuffer = Buffer.from(boldFont.toArrayBuffer());
writeFileSync(join(outputDir, 'Haifa-Bold.otf'), boldBuffer);
console.log('✓ Haifa-Bold.otf generated (700)');

// Generate Light weight
const lightConfig = createFontConfig('Haifa', 'Light', lightParams, '0.1.0');
const lightFont = buildFont(lightConfig);
const lightBuffer = Buffer.from(lightFont.toArrayBuffer());
writeFileSync(join(outputDir, 'Haifa-Light.otf'), lightBuffer);
console.log('✓ Haifa-Light.otf generated (100)');

// Generate Variable Font
console.log('\n📊 Generating Variable Font...');
const vfBuilder = new VariableFontBuilder('Haifa');
const vfBuffer = Buffer.from(vfBuilder.build().toArrayBuffer());
writeFileSync(join(outputDir, 'Haifa-Variable.woff2'), vfBuffer);
console.log('✓ Haifa-Variable.woff2 generated (wght: 100-700)');

console.log('\n📁 Output: ./output/');
console.log('📝 Coverage:');
console.log('   • Latin: a-z, A-Z (52 glyphs)');
console.log('   • Cyrillic: А-Я full (33 glyphs)');
console.log('   • Hebrew: א-ת (27 glyphs, incl. finals)');
console.log('   • Numbers: 0-9 (10 glyphs)');
console.log('   • Punctuation: basic set (14 glyphs)');
console.log('   • Kerning: 95+ pairs');
console.log('\nFeatures:');
console.log('   • Variable weight axis (100-700)');
console.log('   • Kerning for critical pairs');
console.log('   • Geometric construction');
console.log('   • For Haifa City Design System');
console.log('   • RTL support (Hebrew)');
