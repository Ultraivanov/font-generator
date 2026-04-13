// src/glyphs/uppercase-R.ts
import { ComponentSystem, StemOptions, BowlOptions } from '../core/component-system.js';
import { BROCKMANN_PROFILE, OPTICAL_CORRECTIONS } from '../config/brockmann-profile.js';
import * as opentype from 'opentype.js';
import { GlyphDefinition, GlyphParams } from '../types.js';

export const R: GlyphDefinition = {
  unicode: 0x0052,
  name: 'R',
  advanceWidth: 0, // будет вычислено динамически
  
  build: (params: GlyphParams) => {
    const components = new ComponentSystem(BROCKMANN_PROFILE);
    const path = new opentype.Path();
    
    // Применяем оптические коррекции для R
    const correction = OPTICAL_CORRECTIONS['R'] || { 
      widthFactor: 1.02,      // R чуть шире средней буквы
      overshoot: 1.0,
      legOffset: 0.65         // ножка начинается на 65% высоты
    };
    
    // Безопасные значения с дефолтами
    const widthFactor = correction.widthFactor ?? 1.02;
    const legOffset = correction.legOffset ?? 0.65;
    
    // 1. ВЕРТИКАЛЬНЫЙ ШТРИХ (основной ствол)
    const stemWidth = params.weight;
    const stemX = params.sidebearing;
    
    const stem = components.verticalStem({
      x: stemX,
      yStart: 0,
      yEnd: params.capHeight,
      width: stemWidth,
      roundTop: true,      // верх скруглён (Brockmann style)
      roundBottom: false   // низ без скругления (переходит в ножку)
    });
    
    // 2. ЧАША (BOWL) — суперэллипс с открытостью вправо-вниз
    const bowlWidth = params.capHeight * 0.55 * widthFactor;
    const bowlHeight = params.capHeight * 0.55;
    const bowlCenterX = stemX + stemWidth + bowlWidth / 2;
    const bowlCenterY = params.capHeight * 0.4;
    
    const bowl = components.generateBowl({
      centerX: bowlCenterX,
      centerY: bowlCenterY,
      width: bowlWidth,
      height: bowlHeight,
      aperture: 0.7,        // открытая аппертура (как у Brockmann)
      openRight: true,      // чаша открыта вправо для соединения с ножкой
      openLeft: false
    });
    
    // 3. ПЕРЕКЛАДИНА (crossbar) — горизонтальный штрих
    const crossbarY = params.capHeight * 0.58;  // чуть выше оптического центра
    const crossbarLeft = stemX + stemWidth;
    const crossbarRight = bowlCenterX + bowlWidth * 0.7;
    const crossbarWidth = crossbarRight - crossbarLeft;
    
    const crossbarPath = new opentype.Path();
    crossbarPath.moveTo(crossbarLeft, crossbarY);
    crossbarPath.lineTo(crossbarRight, crossbarY);
    crossbarPath.lineTo(crossbarRight, crossbarY + stemWidth * 0.8);
    crossbarPath.lineTo(crossbarLeft, crossbarY + stemWidth * 0.8);
    crossbarPath.closePath();
    
    // 4. НОЖКА (leg) — диагональный штрих с переменной толщиной
    const legStartX = stemX + stemWidth;
    const legStartY = params.capHeight * legOffset;
    const legEndX = params.sidebearing + params.capHeight * 0.75 - stemWidth * 0.5;
    const legEndY = params.descender || -params.capHeight * 0.15; // лёгкий свинг ниже baseline
    
    // Используем новый метод для ножки
    const leg = (components as any).generateDiagonalLeg(
      legStartX, legStartY, legEndX, legEndY,
      stemWidth,
      0.75,  // taper
      true   // roundTerminal
    );
    
    // 5. СБОРКА ВСЕХ КОМПОНЕНТОВ
    // Объединяем команды путей (extend не доступен, используем manual merge)
    const stemCmds = (stem as any).commands || [];
    const bowlCmds = (bowl as any).commands || [];
    const crossbarCmds = (crossbarPath as any).commands || [];
    const legCmds = (leg as any).commands || [];
    
    for (const cmd of stemCmds) (path as any).commands.push(cmd);
    for (const cmd of bowlCmds) (path as any).commands.push(cmd);
    for (const cmd of crossbarCmds) (path as any).commands.push(cmd);
    for (const cmd of legCmds) (path as any).commands.push(cmd);
    
    // Вычисляем advance width
    const calculatedWidth = params.sidebearing * 2 + params.capHeight * 0.75;
    R.advanceWidth = calculatedWidth;
    
    return path;
  }
};
