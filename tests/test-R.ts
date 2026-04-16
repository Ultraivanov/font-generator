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

// Получаем path data из результата
let pathData = '';
if (result && typeof result === 'object') {
  if ('commands' in result) {
    // Convert commands to path string
    const cmds = (result as any).commands;
    pathData = cmds.map((cmd: any) => {
      if (cmd.type === 'M') return `M${cmd.x} ${cmd.y}`;
      if (cmd.type === 'L') return `L${cmd.x} ${cmd.y}`;
      if (cmd.type === 'Q') return `Q${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`;
      if (cmd.type === 'C') return `C${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`;
      if (cmd.type === 'Z') return 'Z';
      return '';
    }).join('');
  } else if ((result as any).toPathData) {
    pathData = (result as any).toPathData();
  }
}

// Экспортируем в SVG для визуальной проверки
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <path d="${pathData}" fill="black" transform="translate(50, 700) scale(1, -1)"/>
  
  <!-- Guide lines: baseline (y=700), descender (y=500), xHeight (y=180), capHeight (y=0) -->
  <line x1="0" y1="700" x2="800" y2="700" stroke="red" stroke-width="1" opacity="0.3"/>
  <line x1="0" y1="500" x2="800" y2="500" stroke="blue" stroke-width="1" opacity="0.3"/>
  <line x1="0" y1="180" x2="800" y2="180" stroke="green" stroke-width="1" opacity="0.3"/>
  <line x1="0" y1="0" x2="800" y2="0" stroke="purple" stroke-width="1" opacity="0.3"/>
</svg>`;

fs.writeFileSync('test-R.svg', svg);
console.log('✓ Generated test-R.svg');
console.log('  Run: sips -s format png test-R.svg -o test-R.png');
