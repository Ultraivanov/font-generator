// src/core/component-system.ts
import opentype from 'opentype.js';
import { generateSuperellipsePoints, Point } from './superellipse.js';

export interface ComponentParams {
  weight: number;      // толщина штриха (stem thickness)
  xHeight: number;     // высота строчных
  capHeight: number;   // высота прописных
  contrast: number;    // контраст (0 = моноширинный, 1 = высокий контраст)
  squareness: number;  // квадратность (0..1, для Brockmann ~0.85)
  rounding: number;    // скругление углов (0..1, Brockmann ~0.3)
}

export interface StemOptions {
  x: number;           // X-позиция левого края
  yStart: number;      // Y начала штриха
  yEnd: number;        // Y конца штриха
  width: number;       // ширина штриха
  roundTop?: boolean;  // скруглять верх?
  roundBottom?: boolean; // скруглять низ?
  topRadius?: number;  // радиус скругления верха (если не указан = width/2)
  bottomRadius?: number;
}

export interface BowlOptions {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  aperture: number;    // открытость (0..1, Brockmann ~0.8)
  openLeft?: boolean;  // открыта слева (для 'c', 'e')
  openRight?: boolean; // открыта справа (для 'a', 'g')
}

export class ComponentSystem {
  private params: ComponentParams;
  
  constructor(params: ComponentParams) {
    this.params = params;
  }
  
  /**
   * Генерация вертикального штриха с опциональным скруглением
   */
  verticalStem(options: StemOptions): opentype.Path {
    const path = new opentype.Path();
    const { x, yStart, yEnd, width, roundTop, roundBottom, topRadius, bottomRadius } = options;
    
    const radiusTop = (topRadius !== undefined) ? topRadius : (roundTop ? width / 2 : 0);
    const radiusBottom = (bottomRadius !== undefined) ? bottomRadius : (roundBottom ? width / 2 : 0);
    
    const left = x;
    const right = x + width;
    
    if (roundTop) {
      // Верх с закруглением (как у Brockmann)
      const topY = yStart;
      path.moveTo(left + radiusTop, topY);
      path.quadraticCurveTo(left, topY, left, topY + radiusTop);
      path.lineTo(left, yEnd - radiusBottom);
      
      if (roundBottom) {
        path.quadraticCurveTo(left, yEnd, left + radiusBottom, yEnd);
        path.lineTo(right - radiusBottom, yEnd);
        path.quadraticCurveTo(right, yEnd, right, yEnd - radiusBottom);
      } else {
        path.lineTo(left, yEnd);
        path.lineTo(right, yEnd);
      }
      
      path.lineTo(right, yStart + radiusTop);
      path.quadraticCurveTo(right, yStart, right - radiusTop, yStart);
    } else {
      // Без скругления (стандартный гротеск)
      path.moveTo(left, yStart);
      path.lineTo(left, yEnd);
      path.lineTo(right, yEnd);
      path.lineTo(right, yStart);
    }
    
    path.closePath();
    return path;
  }
  
  /**
   * Генерация чаши (bowl) с контролем квадратности и аппертуры
   */
  generateBowl(options: BowlOptions): opentype.Path {
    const path = new opentype.Path();
    const { centerX, centerY, width, height, aperture, openLeft, openRight } = options;
    const { squareness } = this.params;
    
    // Рассчитываем степень суперэллипса: n = 2 + (squareness * 4)
    // При squareness = 0: n=2 (эллипс)
    // При squareness = 1: n=6 (почти квадрат)
    const n = 2 + (squareness * 4);
    
    // Генерация суперэллипса
    const points = generateSuperellipsePoints({
      centerX,
      centerY,
      width,
      height,
      n,
      segments: 32
    });
    
    // Модификация точек для создания аппертуры (открытости)
    const modifiedPoints = points.map((point, idx) => {
      const angle = Math.atan2(point.y - centerY, point.x - centerX);
      let newPoint = { ...point };
      
      if (openLeft && angle > Math.PI / 2 && angle < (3 * Math.PI) / 2) {
        // Смещаем точки влево для открытия
        const factor = 1 - aperture * 0.5;
        newPoint.x = centerX + (point.x - centerX) * factor;
      }
      
      if (openRight && angle > -Math.PI / 2 && angle < Math.PI / 2) {
        // Смещаем точки вправо для открытия
        const factor = 1 - aperture * 0.5;
        newPoint.x = centerX + (point.x - centerX) * factor;
      }
      
      return newPoint;
    });
    
    // Построение пути
    if (modifiedPoints.length > 0) {
      path.moveTo(modifiedPoints[0].x, modifiedPoints[0].y);
      for (let i = 1; i < modifiedPoints.length; i++) {
        path.lineTo(modifiedPoints[i].x, modifiedPoints[i].y);
      }
      path.closePath();
    }
    
    return path;
  }
  
  /**
   * Генерация плеча (как в 'n', 'h', 'm')
   */
  generateShoulder(x: number, y: number, width: number, height: number): opentype.Path {
    const path = new opentype.Path();
    const { weight, rounding } = this.params;
    const radius = weight * (0.5 + rounding * 0.5);
    
    // Левая вертикаль
    path.moveTo(x, y);
    path.lineTo(x, y + height);
    
    // Дуга плеча
    const archWidth = width - weight;
    const archHeight = height * 0.7;
    
    path.lineTo(x + weight, y + height);
    path.lineTo(x + weight, y + height - archHeight);
    
    // Кривая Безье для дуги
    path.curveTo(
      x + weight + archWidth * 0.2, y + height - archHeight,
      x + weight + archWidth * 0.8, y,
      x + weight + archWidth, y
    );
    
    // Правая вертикаль (опционально)
    path.lineTo(x + width, y);
    path.lineTo(x + width, y + height);
    
    return path;
  }
  
  /**
   * Генерация диагональной ножки с переменной толщиной и скруглением
   * Специально для R, K, Я
   */
  generateDiagonalLeg(
    startX: number, 
    startY: number, 
    endX: number, 
    endY: number,
    width: number,
    taper: number = 0.75,     // сужение к концу
    roundTerminal: boolean = true
  ): opentype.Path {
    const path = new opentype.Path();
    const { rounding } = this.params;
    
    // Направление и перпендикуляр
    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx);
    const perpAngle = angle + Math.PI / 2;
    
    // Ширина в начале и конце
    const startWidth = width;
    const endWidth = width * taper;
    
    const startOffsetX = Math.cos(perpAngle) * startWidth / 2;
    const startOffsetY = Math.sin(perpAngle) * startWidth / 2;
    const endOffsetX = Math.cos(perpAngle) * endWidth / 2;
    const endOffsetY = Math.sin(perpAngle) * endWidth / 2;
    
    // Четыре точки трапеции
    const p1 = { x: startX - startOffsetX, y: startY - startOffsetY };
    const p2 = { x: startX + startOffsetX, y: startY + startOffsetY };
    const p3 = { x: endX + endOffsetX, y: endY + endOffsetY };
    const p4 = { x: endX - endOffsetX, y: endY - endOffsetY };
    
    path.moveTo(p1.x, p1.y);
    path.lineTo(p2.x, p2.y);
    path.lineTo(p3.x, p3.y);
    
    if (roundTerminal) {
      // Скругление кончика (Brockmann signature)
      const terminalRadius = endWidth * (0.3 + rounding * 0.4);
      const terminalAngle = Math.atan2(p4.y - p3.y, p4.x - p3.x);
      const terminalOffsetX = Math.cos(terminalAngle) * terminalRadius;
      const terminalOffsetY = Math.sin(terminalAngle) * terminalRadius;
      
      path.quadraticCurveTo(
        p3.x + terminalOffsetX * 0.6,
        p3.y + terminalOffsetY * 0.6,
        p4.x,
        p4.y
      );
    } else {
      path.lineTo(p4.x, p4.y);
    }
    
    path.lineTo(p1.x, p1.y);
    path.closePath();
    
    return path;
  }
}
