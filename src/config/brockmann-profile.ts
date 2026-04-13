// src/config/brockmann-profile.ts
import { ComponentParams } from '../core/component-system.js';

export const BROCKMANN_PROFILE: ComponentParams = {
  weight: 80,           // Regular weight
  xHeight: 520,         // Крупный x-height
  capHeight: 700,
  contrast: 0.15,       // Низкий контраст (Brockmann почти моноширинный)
  squareness: 0.85,     // Сильная квадратичность (ключевая черта!)
  rounding: 0.32        // Умеренное скругление (не острый, не круглый)
};

// Оптические коррекции для конкретных букв
export const OPTICAL_CORRECTIONS: Record<string, { 
  widthFactor?: number; 
  overshoot?: number;
  apertureBoost?: number;
  descenderOffset?: number;
  legOffset?: number;      // для R, K, Я - позиция начала ножки
  legTaper?: number;       // сужение ножки
  bowlHeightFactor?: number; // для R, b, d, p, q
  crossbarPosition?: number;   // позиция перекладины
  terminalRounding?: number;   // скругление кончиков
}> = {
  'O': { widthFactor: 0.95, overshoot: 1.05 },      // O чуть уже и выше
  'H': { widthFactor: 1.08, overshoot: 1.0 },       // H шире
  'A': { widthFactor: 0.92, overshoot: 1.03 },      // A уже, с оптической коррекцией
  'R': { 
    widthFactor: 1.02,           // R на 2% шире стандартной ширины
    overshoot: 1.0,
    legOffset: 0.62,             // ножка начинается на 62% высоты
    legTaper: 0.72,              // сужение ножки к концу
    bowlHeightFactor: 0.58,      // чаша занимает 58% высоты буквы
    crossbarPosition: 0.55,      // перекладина на 55% высоты
    terminalRounding: 0.4        // скругление кончика ножки
  },
  'a': { widthFactor: 0.98, overshoot: 1.02 },
  'e': { widthFactor: 0.96, overshoot: 1.01, apertureBoost: 1.2 },
  'g': { descenderOffset: 30 }
};

// Классы кернинга для автогенерации
export const KERNING_CLASSES = {
  left: {
    angled: ['A', 'T', 'V', 'W', 'Y', 'F', 'P'],
    rounded: ['O', 'Q', 'C', 'G', 'S'],
    straight: ['H', 'I', 'N', 'M', 'U']
  },
  right: {
    angled: ['A', 'T', 'V', 'W', 'Y', 'F', 'P'],
    rounded: ['O', 'Q', 'C', 'G', 'S'],
    straight: ['H', 'I', 'N', 'M', 'U']
  }
};

// Классы для строчных
export const LOWERCASE_KERNING_CLASSES = {
  left: {
    angled: ['v', 'w', 'y', 'f', 't'],
    rounded: ['o', 'c', 'e', 's', 'g'],
    straight: ['n', 'm', 'h', 'u', 'i', 'l'],
    ascender: ['b', 'd', 'h', 'k', 'l'],
    descender: ['g', 'j', 'p', 'q', 'y']
  },
  right: {
    angled: ['v', 'w', 'y', 'f', 'r'],
    rounded: ['o', 'c', 'e', 's', 'a'],
    straight: ['n', 'm', 'h', 'u', 'i'],
    ascender: ['b', 'd', 'h', 'k', 'l'],
    descender: ['g', 'j', 'p', 'q', 'y']
  }
};
