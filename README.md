# Haifa — Programmatic Font Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)

> A geometric sans-serif typeface for the **Haifa City Design System**. Inspired by Constructivist architecture and Swiss International Typographic Style.

![Haifa Font Preview](https://github.com/Ultraivanov/font-generator/raw/main/preview.png)

## 🌍 Language Versions

- [English](README.md) (current)
- [Русский](README.ru.md)

## ✨ Features

- **📝 Full Latin alphabet** — a-z, A-Z with optical corrections
- **🇷🇺 Cyrillic** — complete Russian alphabet (А-Я, 33 glyphs)
- **🇮🇱 Hebrew** — Aleph-Bet (א-ת, 27 glyphs incl. finals) with RTL support
- **🔢 Numbers & punctuation** — 0-9, basic punctuation marks
- **⚡ Kerning** — 95+ pairs for critical combinations (Latin + Cyrillic + Hebrew)
- **🎛️ Variable Font** — weight axis wght: 100-700
- **🔧 Parametric system** — adjust weight, width, contrast via code
- **🎯 Total: ~136 glyphs**

## 📦 Download

Get the latest font files from the [releases page](../../releases) or download directly:

- [Haifa-Regular.otf](../../raw/main/output/Haifa-Regular.otf)
- [Haifa-Bold.otf](../../raw/main/output/Haifa-Bold.otf)
- [Haifa-Light.otf](../../raw/main/output/Haifa-Light.otf)
- [Haifa-Variable.woff2](../../raw/main/output/Haifa-Variable.woff2)

## 🚀 Quick Start

```bash
cd font-generator
npm install
npm run generate
```

Output files in `output/`:
- `Haifa-Light.otf` (wght: 100)
- `Haifa-Regular.otf` (wght: 400)
- `Haifa-Bold.otf` (wght: 700)
- `Haifa-Variable.woff2` (wght: 100-700)

## Architecture

```
font-generator/
├── src/
│   ├── types.ts                 # Types and interfaces
│   ├── config/default.ts        # Weight configurations
│   ├── core/
│   │   ├── path-builder.ts      # Bezier curves
│   │   ├── opentype-converter.ts
│   │   └── kerning.ts           # Kerning pairs
│   ├── glyphs/
│   │   ├── lowercase-full.ts    # a-z
│   │   ├── uppercase-full.ts    # A-Z
│   │   ├── numbers.ts           # 0-9
│   │   ├── punctuation.ts       # punctuation marks
│   │   ├── cyrillic.ts          # А-Я (Cyrillic)
│   │   └── hebrew.ts            # א-ת (Hebrew)
│   ├── builder/
│   │   ├── font-builder.ts      # OTF compiler
│   │   └── variable-font.ts    # Variable font builder
│   └── index.ts                 # CLI entry
├── output/                      # Generated fonts
├── package.json
└── tsconfig.json
```

## Glyph Parameters

| Parameter     | Description                     | Regular | Bold | Light |
|---------------|---------------------------------|---------|------|-------|
| `weight`      | Stem thickness                  | 80      | 160  | 40    |
| `width`       | Standard glyph width            | 600     | 600  | 600   |
| `sidebearing` | Side bearings                   | 50      | 40   | 60    |
| `xHeight`     | x-height                        | 500     | 500  | 500   |
| `capHeight`   | Cap height                      | 700     | 700  | 700   |
| `ascender`    | Ascender                        | 800     | 800  | 800   |
| `descender`   | Descender                       | -200    | -200 | -200  |
| `overshoot`   | Optical overshoot correction    | 10      | 10   | 10    |

## Creating a Glyph

```typescript
// src/glyphs/lowercase-full.ts
export const a: GlyphDefinition = {
  unicode: 0x0061,
  name: 'a',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    
    // Bowl + stem construction
    const sb = p.sidebearing;
    const stem = p.weight;
    
    // Build circular bowl
    builder.circle(cx, cy, radius, p.overshoot);
    
    // Add right stem
    builder.vStem(stemX, 0, p.xHeight, stem);
    
    a.advanceWidth = calculateWidth;
    return builder.build();
  },
};
```

## Kerning

Critical pairs (AV, TA, LY, etc.) are configured in `src/core/kerning.ts`:

```typescript
export const kerningPairs: KerningPair[] = [
  { left: 'A', right: 'V', value: -60 },
  { left: 'T', right: 'a', value: -80 },
  { left: 'Г', right: 'А', value: -80 },  // Cyrillic
];
```

## Variable Font

`wght` axis with three masters:
- Light (100)
- Regular (400) — default
- Bold (700)

CSS usage:

```css
@font-face {
  font-family: 'Haifa';
  src: url('Haifa-Variable.woff2') format('woff2-variations');
  font-weight: 100 700;
}

body {
  font-family: 'Haifa', sans-serif;
  font-weight: 400;  /* or 150, 250, 534... */
}
```

## Roadmap

- [x] Full Latin alphabet
- [x] Cyrillic (full А-Я)
- [x] Hebrew alphabet
- [x] Numbers and punctuation
- [x] Kerning pairs (80+)
- [x] Variable font export
- [ ] Extended Latin (accents)
- [ ] Ligatures
- [ ] Web preview page
- [ ] Specimen generator

---

*For Russian version see [README.ru.md](README.ru.md)*
