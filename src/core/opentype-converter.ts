import opentype from 'opentype.js';
import { GlyphPath, CurveCommand, Point } from '../types.js';

// Convert our path format to opentype.js Path

export function toOpenTypePath(glyphPath: GlyphPath): opentype.Path {
  const path = new opentype.Path();

  for (const cmd of glyphPath.commands) {
    switch (cmd.type) {
      case 'M':
        if (cmd.points.length >= 1) {
          path.moveTo(cmd.points[0].x, cmd.points[0].y);
        }
        break;

      case 'L':
        if (cmd.points.length >= 1) {
          path.lineTo(cmd.points[0].x, cmd.points[0].y);
        }
        break;

      case 'C':
        if (cmd.points.length >= 3) {
          path.curveTo(
            cmd.points[0].x,
            cmd.points[0].y,
            cmd.points[1].x,
            cmd.points[1].y,
            cmd.points[2].x,
            cmd.points[2].y
          );
        }
        break;

      case 'Q':
        if (cmd.points.length >= 2) {
          path.quadraticCurveTo(
            cmd.points[0].x,
            cmd.points[0].y,
            cmd.points[1].x,
            cmd.points[1].y
          );
        }
        break;

      case 'Z':
        path.closePath();
        break;
    }
  }

  return path;
}

// Calculate bounding box for a glyph path
export function calculateBoundingBox(glyphPath: GlyphPath): {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
} {
  let xMin = Infinity;
  let yMin = Infinity;
  let xMax = -Infinity;
  let yMax = -Infinity;

  for (const cmd of glyphPath.commands) {
    for (const point of cmd.points) {
      xMin = Math.min(xMin, point.x);
      yMin = Math.min(yMin, point.y);
      xMax = Math.max(xMax, point.x);
      yMax = Math.max(yMax, point.y);
    }
  }

  // Handle empty paths
  if (xMin === Infinity) {
    return { xMin: 0, yMin: 0, xMax: 0, yMax: 0 };
  }

  return { xMin, yMin, xMax, yMax };
}
