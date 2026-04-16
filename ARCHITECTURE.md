# Brockmann Font Generator — Architecture

## Overview

Industrial-grade parametric font generator using component-based architecture and superellipse geometry.

## Core Concepts

### 1. Superellipse Geometry

The `superellipse.ts` module generates points using the superformula:

```
|x/a|^n + |y/b|^n = 1
```

Where `n = 2 + squareness * 4` controls the shape:
- `squareness = 0` → ellipse (n=2)
- `squareness = 0.85` → Brockmann-style squarish (n=5.4)

### 2. Component System

Glyphs are built from reusable components:

| Component | Method | Usage |
|-----------|--------|-------|
| Stem | `verticalStem()` | Vertical strokes with optional rounding |
| Bowl | `generateBowl()` | Superellipse bowls with aperture control |
| Leg | `generateDiagonalLeg()` | Diagonal strokes (R, K) with taper |
| Shoulder | `generateShoulder()` | Arches (n, h, m) |

### 3. Optical Corrections

Per-glyph adjustments in `brockmann-profile.ts`:

```typescript
{
  widthFactor: 1.02,      // Relative width
  legOffset: 0.62,        // Leg start position
  legTaper: 0.72,         // Leg narrowing
  bowlHeightFactor: 0.58, // Bowl proportions
  crossbarPosition: 0.55, // Crossbar Y position
  terminalRounding: 0.4   // Terminal corner radius
}
```

### 4. Auto-Kerning

Class-based kerning with 6 shape categories:
- **angled**: A, T, V, W, Y, F, P
- **rounded**: O, Q, C, G, S  
- **straight**: H, I, N, M, U
- **ascender**: b, d, h, k, l
- **descender**: g, j, p, q, y

Kerning values generated from shape combinations.

## File Structure

```
src/
├── core/
│   ├── superellipse.ts         # Point generation
│   ├── component-system.ts     # Component methods
│   ├── optical.ts              # Correction calculations
│   ├── auto-kerning.ts         # Kerning generation
│   └── path-builder-v2.ts      # Path utilities
├── config/
│   ├── brockmann-profile.ts    # Style parameters
│   └── weights.ts              # Weight configs
├── glyphs/
│   ├── uppercase-R.ts          # R implementation
│   └── ...
└── types.ts                    # TypeScript types
```

## Glyph Construction Flow

```
1. Create ComponentSystem with BROCKMANN_PROFILE
2. Apply optical corrections from OPTICAL_CORRECTIONS
3. Generate components (stem, bowl, leg)
4. Combine paths
5. Return Path with advanceWidth
```

## Testing

| Test | Command | Purpose |
|------|---------|---------|
| R glyph | `npm run test:R` | Generate SVG/PNG preview |
| Visual | `npm run test:visual` | Pixel-perfect comparison |
| Stem | `npm run test:stem` | Thickness consistency |
| Kerning | `npm run test:kerning` | Pair validation |

## Output

- **SVG**: `test-R.svg` — vector preview with guide lines
- **PNG**: `test-R.png` — 800×800px raster preview
- **OTF**: `output/Brockmann-Regular.otf` — compiled font
