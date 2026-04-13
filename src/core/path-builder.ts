import { Point, CurveCommand, GlyphPath } from '../types.js';

// Utility for building glyph paths with Bezier curves
// Uses quadratic and cubic curves for smooth geometric shapes

export class PathBuilder {
  private commands: CurveCommand[] = [];
  private currentPoint: Point = { x: 0, y: 0 };

  moveTo(x: number, y: number): this {
    this.commands.push({
      type: 'M',
      points: [{ x, y }],
    });
    this.currentPoint = { x, y };
    return this;
  }

  lineTo(x: number, y: number): this {
    this.commands.push({
      type: 'L',
      points: [{ x, y }],
    });
    this.currentPoint = { x, y };
    return this;
  }

  // Cubic Bezier curve
  curveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this {
    this.commands.push({
      type: 'C',
      points: [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x, y },
      ],
    });
    this.currentPoint = { x, y };
    return this;
  }

  // Quadratic Bezier curve
  quadTo(x1: number, y1: number, x: number, y: number): this {
    this.commands.push({
      type: 'Q',
      points: [
        { x: x1, y: y1 },
        { x, y },
      ],
    });
    this.currentPoint = { x, y };
    return this;
  }

  closePath(): this {
    this.commands.push({
      type: 'Z',
      points: [],
    });
    return this;
  }

  // Geometric primitives

  // Rectangle with optional corner radius
  rect(x: number, y: number, w: number, h: number, radius: number = 0): this {
    if (radius === 0) {
      this.moveTo(x, y)
        .lineTo(x + w, y)
        .lineTo(x + w, y + h)
        .lineTo(x, y + h)
        .closePath();
    } else {
      const r = Math.min(radius, w / 2, h / 2);
      this.moveTo(x + r, y)
        .lineTo(x + w - r, y)
        .curveTo(x + w - r / 2, y, x + w, y + r / 2, x + w, y + r)
        .lineTo(x + w, y + h - r)
        .curveTo(x + w, y + h - r / 2, x + w - r / 2, y + h, x + w - r, y + h)
        .lineTo(x + r, y + h)
        .curveTo(x + r / 2, y + h, x, y + h - r / 2, x, y + h - r)
        .lineTo(x, y + r)
        .curveTo(x, y + r / 2, x + r / 2, y, x + r, y)
        .closePath();
    }
    return this;
  }

  // Circle/ellipse with optical overshoot correction
  circle(cx: number, cy: number, r: number, overshoot: number = 0): this {
    // Apply optical overshoot correction
    const adjustedR = r + overshoot;
    const c = 0.5522847498 * adjustedR; // Control point offset for perfect circle

    this.moveTo(cx, cy - adjustedR)
      .curveTo(cx + c, cy - adjustedR, cx + adjustedR, cy - c, cx + adjustedR, cy)
      .curveTo(cx + adjustedR, cy + c, cx + c, cy + adjustedR, cx, cy + adjustedR)
      .curveTo(cx - c, cy + adjustedR, cx - adjustedR, cy + c, cx - adjustedR, cy)
      .curveTo(cx - adjustedR, cy - c, cx - c, cy - adjustedR, cx, cy - adjustedR)
      .closePath();

    return this;
  }

  // Horizontal stem with consistent weight
  hStem(x: number, y: number, w: number, weight: number): this {
    return this.rect(x, y - weight / 2, w, weight);
  }

  // Vertical stem with consistent weight
  vStem(x: number, y: number, h: number, weight: number): this {
    return this.rect(x - weight / 2, y, weight, h);
  }

  build(): GlyphPath {
    return { commands: this.commands };
  }

  // Create a counter (negative space) by combining paths
  // Used for letters like O, D, B, A
  counter(outer: GlyphPath, inner: GlyphPath): GlyphPath {
    return {
      commands: [...outer.commands, ...inner.commands],
    };
  }
}

// Helper to create builder
export function createPath(): PathBuilder {
  return new PathBuilder();
}
