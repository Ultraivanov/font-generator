# Brockmann — Industrial Font Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)

> A parametric typeface generator inspired by **Josef Müller-Brockmann** and the Swiss International Typographic Style. Built with cubic Bézier curves, superellipses, and component-based architecture.

![Brockmann R Glyph](https://github.com/Ultraivanov/font-generator/raw/main/test-R.png)

## ✨ Features

- **🏗️ Component-based architecture** — Stem, Bowl, Arch, Shoulder, Tail, DiagonalLeg
- **� Superellipse geometry** — `squareness: 0.85` for perfect Brockmann proportions
- **� Optical corrections** — Per-glyph adjustments for width, overshoot, aperture
- **⚡ Class-based kerning** — Auto-generated pairs from shape classes
- **🔧 Parametric system** — Weight, contrast, rounding, taper via code
- **📊 Quality control** — Visual regression, stem analysis, kerning validation

## 🚀 Quick Start

```bash
cd font-generator
npm install

# Test single glyph
npm run test:R

# Generate full font
npm run generate

# Run all quality checks
npm run test:all
```

## 📦 Output

| File | Description |
|------|-------------|
| `test-R.svg` | Vector preview of R glyph |
| `test-R.png` | Raster preview (800×800px) |
| `output/Brockmann-Regular.otf` | Regular weight font |
| `output/Brockmann-Italic.otf` | Italic variant |

## 🏗️ Architecture

```
font-generator/
├── src/
│   ├── core/
│   │   ├── superellipse.ts      # Superellipse point generation
│   │   ├── component-system.ts   # ComponentSystem class
│   │   │   ├── verticalStem()    # Stem with optional rounding
│   │   │   ├── generateBowl()    # Superellipse bowl with aperture
│   │   │   ├── generateDiagonalLeg() # Tapered diagonal with terminal
│   │   │   └── generateShoulder()  # n/h/m arches
│   │   ├── optical.ts            # Optical corrections
│   │   ├── auto-kerning.ts       # Class-based kerning generator
│   │   └── path-builder-v2.ts    # Cubic Bézier utilities
│   ├── config/
│   │   ├── brockmann-profile.ts  # Style parameters
│   │   └── weights.ts            # Light/Regular/Bold configs
│   ├── glyphs/
│   │   ├── uppercase-R.ts        # Component-based R
│   │   ├── uppercase-component.ts # H, O, D, A, V, W...
│   │   └── lowercase-component.ts # n, o, a, b, d...
│   └── types.ts                  # TypeScript interfaces
├── tests/
│   └── test-R.ts                 # R glyph test & SVG export
└── package.json
```

## 🎛️ Brockmann Style Profile

```typescript
export const BROCKMANN_PROFILE: ComponentParams = {
  weight: 80,           // Stem thickness
  xHeight: 520,         // Large x-height
  capHeight: 700,
  contrast: 0.15,       // Low contrast (almost monolinear)
  squareness: 0.85,     // KEY PARAMETER: squarish forms
  rounding: 0.32        // Moderate terminal rounding
};
```

## 🔩 Component-Based Glyph Construction

### Example: Uppercase R

```typescript
export const R: GlyphDefinition = {
  unicode: 0x0052,
  name: 'R',
  
  build: (params: GlyphParams) => {
    const components = new ComponentSystem(BROCKMANN_PROFILE);
    const path = new opentype.Path();
    
    // 1. Vertical stem (round top, square bottom)
    const stem = components.verticalStem({
      x: params.sidebearing,
      yStart: 0,
      yEnd: params.capHeight,
      width: params.weight,
      roundTop: true,
      roundBottom: false
    });
    
    // 2. Superellipse bowl (open right for leg connection)
    const bowl = components.generateBowl({
      centerX: bowlCenterX,
      centerY: params.capHeight * 0.4,
      width: params.capHeight * 0.55,
      height: params.capHeight * 0.55,
      aperture: 0.7,
      openRight: true
    });
    
    // 3. Horizontal crossbar
    const crossbar = drawCrossbar(...);
    
    // 4. Diagonal leg (tapered, rounded terminal)
    const leg = components.generateDiagonalLeg(
      startX, startY, endX, endY,
      width: params.weight,
      taper: 0.75,
      roundTerminal: true
    );
    
    // Combine all components
    mergePaths(path, [stem, bowl, crossbar, leg]);
    return path;
  }
};
```

## 📐 Optical Corrections

Per-glyph adjustments in `src/config/brockmann-profile.ts`:

```typescript
export const OPTICAL_CORRECTIONS = {
  'R': {
    widthFactor: 1.02,        // 2% wider than standard
    legOffset: 0.62,          // Leg starts at 62% height
    legTaper: 0.72,           // 28% taper toward terminal
    bowlHeightFactor: 0.58,
    crossbarPosition: 0.55,   // Slightly above center
    terminalRounding: 0.4     // 40% of stroke width
  },
  'O': { widthFactor: 0.95, overshoot: 1.05 },
  'A': { widthFactor: 0.92, overshoot: 1.03 }
};
```

## ⚡ Auto-Kerning

Class-based system generates ~150+ pairs from 6 shape classes:

```typescript
export const KERNING_CLASSES = {
  left: {
    angled: ['A', 'T', 'V', 'W', 'Y', 'F', 'P'],
    rounded: ['O', 'Q', 'C', 'G', 'S'],
    straight: ['H', 'I', 'N', 'M', 'U']
  },
  right: { /* same categories */ }
};

// Auto-generated values:
// angled + angled = -80
// angled + rounded = -60
// angled + straight = -40
```

## 🧪 Testing

```bash
# Generate R and export to SVG/PNG
npm run test:R

# Visual regression (pixel-perfect comparison)
npm run test:visual

# Stem thickness consistency
npm run test:stem

# Kerning pair validation
npm run test:kerning

# All tests
npm run test:all
```

## 📊 Quality Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Stroke consistency | ±2 units | ✅ |
| Superellipse squareness | 0.85 | ✅ |
| Optical overshoot | 10-15 units | ✅ |
| Kerning pairs | 150+ | ✅ |
| Component reuse | 80%+ | 🚧 |

## 🎯 Roadmap

- [x] Superellipse geometry
- [x] Component system (Stem, Bowl, Leg)
- [x] Optical correction framework
- [x] Class-based auto-kerning
- [x] Uppercase R (component-based)
- [ ] Uppercase: D, J, Q, S, H, W
- [ ] Lowercase: c, e, f, g, i, r, s, t, y, z
- [ ] Italic slant transformation
- [ ] Variable font (wght axis)
- [ ] Specimen generator

## 🙏 Credits

Inspired by **Josef Müller-Brockmann** and the Swiss International Typographic Style (1950s–60s).

---

**License:** MIT • **Author:** @Ultraivanov
