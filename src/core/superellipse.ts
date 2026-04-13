// src/core/superellipse.ts
export interface Point {
  x: number;
  y: number;
}

export interface SuperellipseOptions {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  n: number;        // степень "квадратности" (2 = эллипс, 4 = скругленный квадрат, 8+ = почти квадрат)
  rotation?: number; // поворот в радианах
  segments?: number; // количество сегментов для аппроксимации (по умолчанию 64)
}

/**
 * Генерирует точки суперэллипса (суперформула)
 * Для Brockmann: n = 3.5..4.5 даёт идеальный баланс между геометрией и органичностью
 */
export function generateSuperellipsePoints(options: SuperellipseOptions): Point[] {
  const {
    centerX,
    centerY,
    width,
    height,
    n,
    rotation = 0,
    segments = 64
  } = options;

  const points: Point[] = [];
  const a = width / 2;  // полуось X
  const b = height / 2; // полуось Y

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    
    // Суперформула: |x/a|^n + |y/b|^n = 1
    const absCos = Math.abs(cosT);
    const absSin = Math.abs(sinT);
    
    const xSign = cosT === 0 ? 1 : Math.sign(cosT);
    const ySign = sinT === 0 ? 1 : Math.sign(sinT);
    
    const x = xSign * Math.pow(absCos, 2 / n) * a;
    const y = ySign * Math.pow(absSin, 2 / n) * b;
    
    // Поворот точки
    const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation);
    const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation);
    
    points.push({
      x: centerX + rotatedX,
      y: centerY + rotatedY
    });
  }
  
  return points;
}

/**
 * Преобразует точки в кривые Безье для fontkit/opentype
 */
export function superellipseToBezier(points: Point[], smoothness: number = 0.55): number[] {
  // Алгоритм преобразования полилинии в кривые Безье
  // smoothness = 0.55 даёт хорошие результаты для шрифтов (оптимально для Brockmann)
  const bezierPoints: number[] = [];
  
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const pPrev = points[(i - 1 + points.length) % points.length];
    const pNext = points[(i + 2) % points.length];
    
    // Вычисление контрольных точек для плавного перехода
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    const cx1 = p0.x + dx * smoothness;
    const cy1 = p0.y + dy * smoothness;
    const cx2 = p1.x - dx * smoothness;
    const cy2 = p1.y - dy * smoothness;
    
    bezierPoints.push(cx1, cy1, cx2, cy2, p1.x, p1.y);
  }
  
  return bezierPoints;
}
