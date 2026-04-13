// tests/test-R.ts
import { R } from '../src/glyphs/uppercase-R.js';
import { BROCKMANN_PROFILE } from '../src/config/brockmann-profile.js';
import * as fs from 'fs';

// Создаём тестовый параметр (полный набор полей GlyphParams)
const testParams = {
  sidebearing: 60,
  width: 650,
  weight: BROCKMANN_PROFILE.weight,
  capHeight: BROCKMANN_PROFILE.capHeight,
  xHeight: BROCKMANN_PROFILE.xHeight,
  ascender: BROCKMANN_PROFILE.capHeight * 1.07,
  descender: -200,
  overshoot: 10,
  contrast: 0.15,
  stress: 0
};

// Генерируем R
const result = R.build(testParams);

// Экспортируем в SVG для визуальной проверки
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="${(result as any).toSVG ? (result as any).toSVG() : ''}" fill="black" transform="translate(50, 700) scale(1, -1)"/>
  
  <!-- Guide lines -->
  <line x1="0" y1="700" x2="800" y2="700" stroke="red" stroke-width="1" opacity="0.3"/>
  <line x1="0" y1="700-200" x2="800" y2="700-200" stroke="blue" stroke-width="1" opacity="0.3"/>
  <line x1="0" y1="700-520" x2="800" y2="700-520" stroke="green" stroke-width="1" opacity="0.3"/>
  <line x1="0" y1="700-700" x2="800" y2="700-700" stroke="purple" stroke-width="1" opacity="0.3"/>
</svg>`;

fs.writeFileSync('test-R.svg', svg);
console.log('Generated test-R.svg — проверьте визуально!');
