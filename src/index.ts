#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { buildFont } from './builder/font-builder.js';
import { VariableFontBuilder } from './builder/variable-font.js';
import {
  createFontConfig,
  thinParams,
  extraLightParams,
  lightParams,
  regularParams,
  mediumParams,
  semiBoldParams,
  boldParams,
  blackParams,
} from './config/default.js';

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
console.log('   Swiss Geometric Grotesk - 8 weights\n');

// Define all 8 weights with their wght values
const weights = [
  { name: 'Thin', params: thinParams, wght: 100 },
  { name: 'ExtraLight', params: extraLightParams, wght: 200 },
  { name: 'Light', params: lightParams, wght: 300 },
  { name: 'Regular', params: regularParams, wght: 400 },
  { name: 'Medium', params: mediumParams, wght: 500 },
  { name: 'SemiBold', params: semiBoldParams, wght: 600 },
  { name: 'Bold', params: boldParams, wght: 700 },
  { name: 'Black', params: blackParams, wght: 900 },
];

// Generate all 8 static weights
for (const weight of weights) {
  const config = createFontConfig('Haifa', weight.name, weight.params, '0.2.0');
  const font = buildFont(config);
  const buffer = Buffer.from(font.toArrayBuffer());
  writeFileSync(join(outputDir, `Haifa-${weight.name}.otf`), buffer);
  console.log(`✓ Haifa-${weight.name}.otf generated (${weight.wght})`);
}

// Generate Variable Font
console.log('\n📊 Generating Variable Font...');
const vfBuilder = new VariableFontBuilder('Haifa');
const vfBuffer = Buffer.from(vfBuilder.build().toArrayBuffer());
writeFileSync(join(outputDir, 'Haifa-Variable.woff2'), vfBuffer);
console.log('✓ Haifa-Variable.woff2 generated (wght: 100-900)');

console.log('\n📁 Output: ./output/');
console.log('📝 Coverage:');
console.log('   • Latin: a-z, A-Z (52 glyphs)');
console.log('   • Cyrillic: А-Я full (33 glyphs)');
console.log('   • Hebrew: א-ת (27 glyphs, incl. finals)');
console.log('   • Numbers: 0-9 (10 glyphs)');
console.log('   • Punctuation: basic set (14 glyphs)');
console.log('   • Kerning: 95+ pairs');
console.log('\nFeatures:');
console.log('   • 8 static weights (Thin → Black)');
console.log('   • Variable weight axis (100-900)');
console.log('   • Swiss geometric construction');
console.log('   • Compact editorial spacing');
console.log('   • High x-height (72% of cap)');
console.log('   • RTL support (Hebrew)');
