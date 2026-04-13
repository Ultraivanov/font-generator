// Advanced Path Builder v2 - Industrial Grade Font Construction
// Cubic Bezier curves, Superellipses, Variable Stroke Width

import { Point, CurveCommand, GlyphPath } from '../types.js';

export interface StrokeProfile {
  width: number;           // Base stroke width
  contrast: number;        // Vertical/horizontal ratio (1.0 = monoline)
  topRound: number;        // Terminal rounding at top (0-1)
  bottomRound: number;     // Terminal rounding at bottom (0-1)
  modulation?: number;     // Thickening at joins (0-1)
}

export interface SuperellipseParams {
  cx: number;              // Center X
  cy: number;              // Center Y
  rx: number;              // X radius
  ry: number;              // Y radius
  squareness: number;      // 0.0 = circle, 1.0 = square
  segments?: number;       // Number of curve segments (default: 4)
}

export class PathBuilderV2 {
  private commands: CurveCommand[] = [];
  private currentPoint: Point = { x: 0, y: 0 };

  moveTo(x: number, y: number): this {
    this.commands.push({ type: 'M', points: [{ x, y }] });
    this.currentPoint = { x, y };
    return this;
  }

  lineTo(x: number, y: number): this {
    this.commands.push({ type: 'L', points: [{ x, y }] });
    this.currentPoint = { x, y };
    return this;
  }

  // Cubic Bezier with full control
  cubicTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): this {
    this.commands.push({
      type: 'C',
      points: [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x, y }]
    });
    this.currentPoint = { x, y };
    return this;
  }

  // Quadratic Bezier (converted to cubic internally in font export)
  quadTo(x1: number, y1: number, x: number, y: number): this {
    this.commands.push({
      type: 'Q',
      points: [{ x: x1, y: y1 }, { x, y }]
    });
    this.currentPoint = { x, y };
    return this;
  }

  closePath(): this {
    this.commands.push({ type: 'Z', points: [] });
    return this;
  }

  // Superellipse: x^n + y^n = 1, where n = 2/(1-squareness)
  // squareness 0 = circle, 0.85 = Brockmann style
  superellipse(params: SuperellipseParams): this {
    const { cx, cy, rx, ry, squareness, segments = 4 } = params;
    
    // n parameter: 2 = circle, higher = more square
    const n = 2 / Math.max(0.01, 1 - squareness);
    const k = 0.5522847498; // Standard cubic bezier circle approximation constant
    
    // Adjust k based on squareness for superellipse
    const adjustedK = k * (1 - squareness * 0.3);
    
    // Start at rightmost point
    this.moveTo(cx + rx, cy);
    
    // Four quadrants with cubic bezier approximation
    // Top-right quadrant
    this.cubicTo(
      cx + rx, cy - ry * adjustedK,
      cx + rx * adjustedK, cy - ry,
      cx, cy - ry
    );
    
    // Top-left quadrant
    this.cubicTo(
      cx - rx * adjustedK, cy - ry,
      cx - rx, cy - ry * adjustedK,
      cx - rx, cy
    );
    
    // Bottom-left quadrant
    this.cubicTo(
      cx - rx, cy + ry * adjustedK,
      cx - rx * adjustedK, cy + ry,
      cx, cy + ry
    );
    
    // Bottom-right quadrant
    this.cubicTo(
      cx + rx * adjustedK, cy + ry,
      cx + rx, cy + ry * adjustedK,
      cx + rx, cy
    );
    
    this.closePath();
    return this;
  }

  // Variable width stroke along a skeleton curve
  // skeleton: array of points defining center line
  // widthFunc: function that returns width at each point index
  variableStroke(
    skeleton: Point[],
    widthFunc: (index: number, total: number) => number
  ): this {
    if (skeleton.length < 2) return this;

    const n = skeleton.length;
    const leftSide: Point[] = [];
    const rightSide: Point[] = [];

    // Calculate perpendicular offsets for each skeleton point
    for (let i = 0; i < n; i++) {
      const width = widthFunc(i, n);
      const halfWidth = width / 2;

      let dx: number, dy: number;
      
      if (i === 0) {
        // First point - use next segment direction
        dx = skeleton[i + 1].x - skeleton[i].x;
        dy = skeleton[i + 1].y - skeleton[i].y;
      } else if (i === n - 1) {
        // Last point - use previous segment direction
        dx = skeleton[i].x - skeleton[i - 1].x;
        dy = skeleton[i].y - skeleton[i - 1].y;
      } else {
        // Middle points - average of adjacent segments
        dx = skeleton[i + 1].x - skeleton[i - 1].x;
        dy = skeleton[i + 1].y - skeleton[i - 1].y;
      }

      // Normalize and get perpendicular
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len > 0) {
        const perpX = (-dy / len) * halfWidth;
        const perpY = (dx / len) * halfWidth;
        
        leftSide.push({ x: skeleton[i].x + perpX, y: skeleton[i].y + perpY });
        rightSide.push({ x: skeleton[i].x - perpX, y: skeleton[i].y - perpY });
      }
    }

    // Build closed contour: left side forward, right side backward
    if (leftSide.length > 0 && rightSide.length > 0) {
      this.moveTo(leftSide[0].x, leftSide[0].y);
      
      for (let i = 1; i < leftSide.length; i++) {
        this.lineTo(leftSide[i].x, leftSide[i].y);
      }
      
      for (let i = rightSide.length - 1; i >= 0; i--) {
        this.lineTo(rightSide[i].x, rightSide[i].y);
      }
      
      this.closePath();
    }

    return this;
  }

  // Rounded rectangle with independent corner radii
  roundedRect(
    x: number, y: number, width: number, height: number,
    rtl: number, rtr: number, rbr: number, rbl: number
  ): this {
    const k = 0.5522847498;
    
    // Top edge, left to right
    this.moveTo(x + rtl, y);
    this.lineTo(x + width - rtr, y);
    
    // Top-right corner
    if (rtr > 0) {
      this.cubicTo(
        x + width - rtr * (1 - k), y,
        x + width, y + rtr * (1 - k),
        x + width, y + rtr
      );
    }
    
    // Right edge
    this.lineTo(x + width, y + height - rbr);
    
    // Bottom-right corner
    if (rbr > 0) {
      this.cubicTo(
        x + width, y + height - rbr * (1 - k),
        x + width - rbr * (1 - k), y + height,
        x + width - rbr, y + height
      );
    }
    
    // Bottom edge
    this.lineTo(x + rbl, y + height);
    
    // Bottom-left corner
    if (rbl > 0) {
      this.cubicTo(
        x + rbl * (1 - k), y + height,
        x, y + height - rbl * (1 - k),
        x, y + height - rbl
      );
    }
    
    // Left edge
    this.lineTo(x, y + rtl);
    
    // Top-left corner
    if (rtl > 0) {
      this.cubicTo(
        x, y + rtl * (1 - k),
        x + rtl * (1 - k), y,
        x + rtl, y
      );
    }
    
    this.closePath();
    return this;
  }

  build(): GlyphPath {
    return { commands: this.commands };
  }

  clear(): void {
    this.commands = [];
    this.currentPoint = { x: 0, y: 0 };
  }
}

// Factory function
export function createPathV2(): PathBuilderV2 {
  return new PathBuilderV2();
}
