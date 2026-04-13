import { GlyphDefinition, GlyphParams } from '../types.js';
import { createPath } from '../core/path-builder.js';

// Cyrillic alphabet (Russian subset)
// Geometric construction, matching Latin metrics

// А - similar to Latin A
export const А: GlyphDefinition = {
  unicode: 0x0410,
  name: 'А',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 6;
    const apexX = fullWidth / 2;
    const apexY = capHeight;

    // Left diagonal
    builder.moveTo(sb + stem / 2, 0);
    builder.lineTo(sb + stem * 1.5, 0);
    builder.lineTo(apexX - stem / 4, apexY - stem / 2);
    builder.lineTo(apexX - stem, apexY);
    builder.closePath();

    // Right diagonal
    builder.moveTo(fullWidth - sb - stem / 2, 0);
    builder.lineTo(fullWidth - sb - stem * 1.5, 0);
    builder.lineTo(apexX + stem / 4, apexY - stem / 2);
    builder.lineTo(apexX + stem, apexY);
    builder.closePath();

    // Crossbar
    const crossbarY = capHeight * 0.35;
    const crossbarWidth = (fullWidth - sb * 2) * 0.5;
    builder.hStem(apexX - crossbarWidth / 2, crossbarY, crossbarWidth, stem);

    А.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Б - stem with bowl and tail
export const Б: GlyphDefinition = {
  unicode: 0x0411,
  name: 'Б',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.85;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = capHeight * 0.6;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight * 0.4 - stem / 2;
    const c = 0.5522847498;

    // Vertical stem (full height)
    builder.vStem(stemX, 0, capHeight, stem);

    // Upper bowl
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    // Inner counter
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(stemX + stem / 2, cy + innerRy)
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    // Bottom horizontal
    builder.hStem(stemX, stem / 2, fullWidth - sb * 2 - stem, stem);

    Б.advanceWidth = fullWidth;
    return builder.build();
  },
};

// В - similar to Latin B
export const В: GlyphDefinition = {
  unicode: 0x0412,
  name: 'В',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const stemX = sb + stem / 2;
    const bowlWidth = (capHeight - stem) * 0.45;
    const fullWidth = sb + stem + bowlWidth + sb;
    const c = 0.5522847498;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Upper bowl
    const upperCy = capHeight * 0.75;
    const upperRy = capHeight * 0.22;
    const upperRx = bowlWidth * 0.9;

    const outerRx1 = upperRx + stem / 2 + overshoot;
    const outerRy1 = upperRy + stem / 2 + overshoot;

    builder
      .moveTo(stemX + stem / 2, upperCy - outerRy1)
      .curveTo(stemX + stem / 2 + outerRx1 * c, upperCy - outerRy1, stemX + stem / 2 + outerRx1, upperCy - outerRy1 * c, stemX + stem / 2 + outerRx1, upperCy)
      .curveTo(stemX + stem / 2 + outerRx1, upperCy + outerRy1 * c, stemX + stem / 2 + outerRx1 * c, upperCy + outerRy1, stemX + stem / 2, upperCy + outerRy1);

    // Lower bowl
    const lowerCy = capHeight * 0.25;
    const lowerRy = capHeight * 0.22;
    const lowerRx = bowlWidth * 0.9;

    const outerRx2 = lowerRx + stem / 2 + overshoot;
    const outerRy2 = lowerRy + stem / 2 + overshoot;

    builder
      .moveTo(stemX + stem / 2, lowerCy - outerRy2)
      .curveTo(stemX + stem / 2 + outerRx2 * c, lowerCy - outerRy2, stemX + stem / 2 + outerRx2, lowerCy - outerRy2 * c, stemX + stem / 2 + outerRx2, lowerCy)
      .curveTo(stemX + stem / 2 + outerRx2, lowerCy + outerRy2 * c, stemX + stem / 2 + outerRx2 * c, lowerCy + outerRy2, stemX + stem / 2, lowerCy + outerRy2);

    В.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Г - L shape (Gamma)
export const Г: GlyphDefinition = {
  unicode: 0x0413,
  name: 'Г',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(stemX, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    Г.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Д - П with tail
export const Д: GlyphDefinition = {
  unicode: 0x0414,
  name: 'Д',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const innerSpace = stem * 2.5;
    const fullWidth = sb * 2 + stem * 2 + innerSpace;

    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // Left stem (extends down)
    builder.vStem(leftX, descender * 0.3, capHeight, stem);

    // Right stem (extends down)
    builder.vStem(rightX, descender * 0.3, capHeight, stem);

    // Top horizontal
    builder.hStem(leftX, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Bottom horizontal with tail
    const bottomY = descender * 0.3;
    builder.hStem(leftX - stem, bottomY + stem / 2, fullWidth - sb * 2 + stem * 2, stem);

    // Tail curve
    builder.moveTo(leftX - stem, bottomY + stem);
    builder.lineTo(leftX, bottomY + stem);
    builder.curveTo(leftX, bottomY, leftX + stem, bottomY - stem, leftX + stem * 2, bottomY - stem);

    Д.advanceWidth = fullWidth + stem;
    return builder.build();
  },
};

// Е - similar to Latin E
export const Е: GlyphDefinition = {
  unicode: 0x0415,
  name: 'Е',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(stemX, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Middle horizontal
    builder.hStem(stemX, capHeight * 0.5, (fullWidth - sb * 2 - stem) * 0.75, stem);

    // Bottom horizontal
    builder.hStem(stemX, stem / 2, fullWidth - sb * 2 - stem, stem);

    Е.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ё - Е with diaeresis
export const Ё: GlyphDefinition = {
  unicode: 0x0401,
  name: 'Ё',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const ascender = p.ascender;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(stemX, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Middle horizontal
    builder.hStem(stemX, capHeight * 0.5, (fullWidth - sb * 2 - stem) * 0.75, stem);

    // Bottom horizontal
    builder.hStem(stemX, stem / 2, fullWidth - sb * 2 - stem, stem);

    // Diaeresis dots
    const dotSize = stem * 0.8;
    const dotY = ascender * 0.85;
    builder.circle(fullWidth * 0.35, dotY, dotSize / 2, 0);
    builder.circle(fullWidth * 0.65, dotY, dotSize / 2, 0);

    Ё.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ж - three diagonal stems
export const Ж: GlyphDefinition = {
  unicode: 0x0416,
  name: 'Ж',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 6;
    const midX = fullWidth / 2;

    // Middle vertical stem
    builder.vStem(midX - stem / 2, 0, capHeight, stem);

    // Top horizontal connectors
    const midY = capHeight / 2;
    builder.hStem(sb + stem / 2, midY, (fullWidth - sb * 2) * 0.25, stem);

    // Left upper diagonal
    const leftX = sb + stem / 2;
    builder.moveTo(leftX, capHeight);
    builder.lineTo(leftX + stem, capHeight);
    builder.lineTo(midX - stem / 2, midY + stem / 2);
    builder.lineTo(midX - stem * 1.5, midY);
    builder.closePath();

    // Left lower diagonal
    builder.moveTo(leftX, 0);
    builder.lineTo(leftX + stem, 0);
    builder.lineTo(midX - stem / 2, midY - stem / 2);
    builder.lineTo(midX - stem * 1.5, midY);
    builder.closePath();

    // Right upper diagonal
    const rightX = fullWidth - sb - stem / 2;
    builder.moveTo(rightX, capHeight);
    builder.lineTo(rightX - stem, capHeight);
    builder.lineTo(midX + stem / 2, midY + stem / 2);
    builder.lineTo(midX + stem * 1.5, midY);
    builder.closePath();

    // Right lower diagonal
    builder.moveTo(rightX, 0);
    builder.lineTo(rightX - stem, 0);
    builder.lineTo(midX + stem / 2, midY - stem / 2);
    builder.lineTo(midX + stem * 1.5, midY);
    builder.closePath();

    Ж.advanceWidth = fullWidth;
    return builder.build();
  },
};

// З - similar to number 3
export const З: GlyphDefinition = {
  unicode: 0x0417,
  name: 'З',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.75;
    const fullWidth = width + sb * 2;
    const c = 0.5522847498;

    const bowlHeight = capHeight * 0.45;
    const upperCy = capHeight - bowlHeight / 2;
    const lowerCy = bowlHeight / 2;
    const rx = width / 2 - stem;
    const ry = bowlHeight / 2 - stem / 2;

    // Upper bowl (left side open)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;

    builder
      .moveTo(fullWidth - sb - stem / 2, upperCy - outerRy)
      .curveTo(fullWidth - sb - stem / 2 - outerRx * c, upperCy - outerRy, fullWidth - sb - stem / 2 - outerRx, upperCy - outerRy * c, fullWidth - sb - stem / 2 - outerRx, upperCy)
      .curveTo(fullWidth - sb - stem / 2 - outerRx, upperCy + outerRy * c, fullWidth - sb - stem / 2 - outerRx * c, upperCy + outerRy, fullWidth - sb - stem / 2, upperCy + outerRy);

    // Lower bowl (left side open)
    builder
      .moveTo(fullWidth - sb - stem / 2, lowerCy - outerRy)
      .curveTo(fullWidth - sb - stem / 2 - outerRx * c, lowerCy - outerRy, fullWidth - sb - stem / 2 - outerRx, lowerCy - outerRy * c, fullWidth - sb - stem / 2 - outerRx, lowerCy)
      .curveTo(fullWidth - sb - stem / 2 - outerRx, lowerCy + outerRy * c, fullWidth - sb - stem / 2 - outerRx * c, lowerCy + outerRy, fullWidth - sb - stem / 2, lowerCy + outerRy);

    З.advanceWidth = fullWidth;
    return builder.build();
  },
};

// И - N mirror (like Latin H with tail)
export const И: GlyphDefinition = {
  unicode: 0x0418,
  name: 'И',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // Left stem
    builder.vStem(leftX, 0, capHeight, stem);

    // Right stem
    builder.vStem(rightX, 0, capHeight, stem);

    // Diagonal (opposite of N)
    builder.moveTo(rightX, capHeight);
    builder.lineTo(rightX - stem, capHeight);
    builder.lineTo(leftX + stem / 2, 0);
    builder.lineTo(leftX + stem * 1.5, 0);
    builder.closePath();

    И.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Й - И with breve
export const Й: GlyphDefinition = {
  unicode: 0x0419,
  name: 'Й',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const ascender = p.ascender;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // Left stem
    builder.vStem(leftX, 0, capHeight, stem);

    // Right stem
    builder.vStem(rightX, 0, capHeight, stem);

    // Diagonal
    builder.moveTo(rightX, capHeight);
    builder.lineTo(rightX - stem, capHeight);
    builder.lineTo(leftX + stem / 2, 0);
    builder.lineTo(leftX + stem * 1.5, 0);
    builder.closePath();

    // Breve (curved accent above)
    const breveY = ascender * 0.82;
    const breveWidth = fullWidth * 0.5;
    const breveCx = fullWidth / 2;

    builder.moveTo(breveCx - breveWidth / 2, breveY);
    builder.curveTo(
      breveCx - breveWidth / 4, breveY + stem,
      breveCx + breveWidth / 4, breveY + stem,
      breveCx + breveWidth / 2, breveY
    );

    Й.advanceWidth = fullWidth;
    return builder.build();
  },
};

// К - similar to Latin K
export const К: GlyphDefinition = {
  unicode: 0x041a,
  name: 'К',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 4;
    const stemX = sb + stem / 2;

    // Main stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Upper diagonal
    const diagStartX = stemX + stem / 2;
    const diagStartY = capHeight * 0.5;
    const diagEndX = fullWidth - sb - stem / 2;
    const diagEndY = capHeight * 0.9;

    builder.moveTo(diagStartX, diagStartY);
    builder.lineTo(diagStartX + stem, diagStartY);
    builder.lineTo(diagEndX, diagEndY);
    builder.lineTo(diagEndX - stem, diagEndY + stem);
    builder.closePath();

    // Lower diagonal
    builder.moveTo(diagStartX, diagStartY + stem);
    builder.lineTo(diagStartX + stem / 2, diagStartY + stem);
    builder.lineTo(diagEndX - stem, 0);
    builder.lineTo(diagEndX, 0);
    builder.closePath();

    К.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Л - L with tail
export const Л: GlyphDefinition = {
  unicode: 0x041b,
  name: 'Л',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 4;
    const rightX = fullWidth - sb - stem / 2;

    // Right stem
    builder.vStem(rightX, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(sb + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Left stem (descending)
    const leftX = sb + stem / 2;
    builder.vStem(leftX, descender * 0.3, capHeight, stem);

    // Bottom horizontal with tail
    const bottomY = descender * 0.3;
    builder.hStem(leftX - stem, bottomY + stem / 2, fullWidth - sb * 2 + stem * 2, stem);

    // Tail curve
    builder.moveTo(leftX - stem, bottomY + stem);
    builder.lineTo(leftX, bottomY + stem);
    builder.curveTo(leftX, bottomY, leftX + stem, bottomY - stem, leftX + stem * 2, bottomY - stem);

    Л.advanceWidth = fullWidth + stem;
    return builder.build();
  },
};

// М - similar to Latin M
export const М: GlyphDefinition = {
  unicode: 0x041c,
  name: 'М',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 6;
    const step = (fullWidth - sb * 2) / 4;

    const x1 = sb + stem / 2;
    const x2 = sb + step;
    const x3 = sb + step * 2;
    const x4 = sb + step * 3;
    const x5 = fullWidth - sb - stem / 2;

    // Left outer
    builder.moveTo(x1, 0);
    builder.lineTo(x1 + stem, 0);
    builder.lineTo(x3 - stem / 2, capHeight - stem);
    builder.lineTo(x3 - stem, capHeight);
    builder.closePath();

    // Left inner
    builder.moveTo(x2 + stem / 2, 0);
    builder.lineTo(x2 + stem, 0);
    builder.lineTo(x3, capHeight - stem * 1.5);
    builder.lineTo(x3 - stem / 2, capHeight - stem * 2);
    builder.closePath();

    // Right inner
    builder.moveTo(x4 - stem / 2, 0);
    builder.lineTo(x4, 0);
    builder.lineTo(x3 + stem / 2, capHeight - stem * 2);
    builder.lineTo(x3, capHeight - stem * 1.5);
    builder.closePath();

    // Right outer
    builder.moveTo(x5 - stem, 0);
    builder.lineTo(x5, 0);
    builder.lineTo(x3 + stem, capHeight);
    builder.lineTo(x3 + stem / 2, capHeight - stem);
    builder.closePath();

    М.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Н - same as Latin H
export const Н: GlyphDefinition = {
  unicode: 0x041d,
  name: 'Н',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const innerSpace = stem * 2.5;
    const fullWidth = sb * 2 + stem * 2 + innerSpace;

    // Left stem
    builder.vStem(sb + stem / 2, 0, capHeight, stem);

    // Right stem
    builder.vStem(fullWidth - sb - stem / 2, 0, capHeight, stem);

    // Crossbar at x-height (optical center)
    const crossbarY = p.xHeight / 2;
    builder.hStem(sb + stem / 2, crossbarY, fullWidth - sb * 2 - stem, stem);

    Н.advanceWidth = fullWidth;
    return builder.build();
  },
};

// О - same as Latin O
export const О: GlyphDefinition = {
  unicode: 0x041e,
  name: 'О',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.88;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = width / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Outer contour
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Inner counter
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    О.advanceWidth = fullWidth;
    return builder.build();
  },
};

// П - П shape (n wide)
export const П: GlyphDefinition = {
  unicode: 0x041f,
  name: 'П',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const innerSpace = stem * 3;
    const fullWidth = sb * 2 + stem * 2 + innerSpace;

    const stem1X = sb + stem / 2;
    const stem2X = fullWidth - sb - stem / 2;

    // Two vertical stems
    builder.vStem(stem1X, 0, capHeight, stem);
    builder.vStem(stem2X, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(stem1X, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    П.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Р - same as Latin P
export const Р: GlyphDefinition = {
  unicode: 0x0420,
  name: 'Р',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.9;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = capHeight * 0.7;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight * 0.3 - stem / 2;
    const c = 0.5522847498;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Upper bowl (outer)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    // Bowl (inner)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(stemX + stem / 2, cy + innerRy)
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    Р.advanceWidth = fullWidth;
    return builder.build();
  },
};

// С - same as Latin C
export const С: GlyphDefinition = {
  unicode: 0x0421,
  name: 'С',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.9;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = width / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // C shape (open on right)
    builder
      .moveTo(cx + outerRx * 0.6, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx + outerRx * 0.6, cy + outerRy);

    builder.lineTo(cx + innerRx * 0.6, cy + innerRy);

    builder
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx + innerRx * 0.6, cy - innerRy);

    builder.closePath();

    // Cap ends
    builder.rect(cx + rx * 0.4, cy - outerRy - stem / 2, stem, stem);
    builder.rect(cx + rx * 0.4, cy + outerRy - stem / 2, stem, stem);

    С.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Т - similar to Latin T
export const Т: GlyphDefinition = {
  unicode: 0x0422,
  name: 'Т',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;
    const stemX = fullWidth / 2;

    // Vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Top horizontal
    builder.hStem(sb + stem / 2, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    Т.advanceWidth = fullWidth;
    return builder.build();
  },
};

// У - V with descender (like Latin Y)
export const У: GlyphDefinition = {
  unicode: 0x0423,
  name: 'У',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;
    const apexX = fullWidth / 2;

    // Upper diagonals
    builder.moveTo(leftX, capHeight);
    builder.lineTo(leftX + stem, capHeight);
    builder.lineTo(apexX, stem);
    builder.lineTo(apexX - stem / 2, 0);
    builder.closePath();

    builder.moveTo(rightX, capHeight);
    builder.lineTo(rightX - stem, capHeight);
    builder.lineTo(apexX, stem);
    builder.lineTo(apexX + stem / 2, 0);
    builder.closePath();

    // Descender tail (curves left)
    const tailX = apexX - stem;
    const tailEndX = apexX - stem * 2;
    const tailY = descender * 0.5;

    builder.moveTo(apexX - stem / 2, 0);
    builder.lineTo(apexX + stem / 2, 0);
    builder.curveTo(
      apexX + stem, stem,
      tailX, tailY,
      tailEndX, tailY
    );

    У.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ф - loop with crossbar
export const Ф: GlyphDefinition = {
  unicode: 0x0424,
  name: 'Ф',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const ascender = p.ascender;
    const descender = p.descender;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.85;
    const fullWidth = bowlWidth + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // Outer oval
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Inner counter
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    // Vertical stem through the center
    builder.vStem(cx - stem / 2, descender * 0.4, ascender, stem);

    Ф.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Х - crossing diagonals (like Latin X)
export const Х: GlyphDefinition = {
  unicode: 0x0425,
  name: 'Х',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const fullWidth = sb * 2 + stem * 5;
    const leftX = sb + stem / 2;
    const rightX = fullWidth - sb - stem / 2;

    // First diagonal
    builder.moveTo(leftX, capHeight);
    builder.lineTo(leftX + stem, capHeight);
    builder.lineTo(rightX, 0);
    builder.lineTo(rightX - stem, 0);
    builder.closePath();

    // Second diagonal
    builder.moveTo(rightX, capHeight);
    builder.lineTo(rightX - stem, capHeight);
    builder.lineTo(leftX, 0);
    builder.lineTo(leftX + stem, 0);
    builder.closePath();

    Х.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ц - П with tail
export const Ц: GlyphDefinition = {
  unicode: 0x0426,
  name: 'Ц',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const innerSpace = stem * 3;
    const fullWidth = sb * 2 + stem * 2 + innerSpace;

    const stem1X = sb + stem / 2;
    const stem2X = fullWidth - sb - stem / 2;

    // Two vertical stems (right one extends down)
    builder.vStem(stem1X, 0, capHeight, stem);
    builder.vStem(stem2X, descender * 0.3, capHeight, stem);

    // Top horizontal
    builder.hStem(stem1X, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    // Tail at bottom
    const tailY = descender * 0.3;
    builder.hStem(stem2X - stem, tailY + stem / 2, stem * 2, stem);

    Ц.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ч - П with shortened right stem
export const Ч: GlyphDefinition = {
  unicode: 0x0427,
  name: 'Ч',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;

    const innerSpace = stem * 3;
    const fullWidth = sb * 2 + stem * 2 + innerSpace;

    const stem1X = sb + stem / 2;
    const stem2X = fullWidth - sb - stem / 2;

    // Left stem (full height)
    builder.vStem(stem1X, 0, capHeight, stem);

    // Right stem (starts from middle, goes down)
    builder.vStem(stem2X, 0, capHeight * 0.55, stem);

    // Top horizontal
    builder.hStem(stem1X, capHeight - stem / 2, fullWidth - sb * 2 - stem, stem);

    Ч.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ш - three stems with base
export const Ш: GlyphDefinition = {
  unicode: 0x0428,
  name: 'Ш',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;

    const innerSpace = stem * 2;
    const fullWidth = sb * 2 + stem * 3 + innerSpace * 2;

    const stem1X = sb + stem / 2;
    const stem2X = stem1X + stem + innerSpace;
    const stem3X = stem2X + stem + innerSpace;

    // Three vertical stems
    builder.vStem(stem1X, 0, capHeight, stem);
    builder.vStem(stem2X, 0, capHeight, stem);
    builder.vStem(stem3X, 0, capHeight, stem);

    // Bottom horizontal connector
    builder.hStem(stem1X, stem / 2, fullWidth - sb * 2 - stem, stem);

    Ш.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Щ - Ш with tail
export const Щ: GlyphDefinition = {
  unicode: 0x0429,
  name: 'Щ',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const descender = p.descender;

    const innerSpace = stem * 2;
    const fullWidth = sb * 2 + stem * 3 + innerSpace * 2;

    const stem1X = sb + stem / 2;
    const stem2X = stem1X + stem + innerSpace;
    const stem3X = stem2X + stem + innerSpace;

    // Three vertical stems (right one extends down)
    builder.vStem(stem1X, 0, capHeight, stem);
    builder.vStem(stem2X, 0, capHeight, stem);
    builder.vStem(stem3X, descender * 0.3, capHeight, stem);

    // Bottom horizontal connector
    builder.hStem(stem1X, stem / 2, fullWidth - sb * 2 - stem, stem);

    // Tail at bottom of right stem
    const tailY = descender * 0.3;
    builder.hStem(stem3X - stem, tailY + stem / 2, stem * 2, stem);

    Щ.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ъ - hard sign (similar to small b without top bowl, with tail)
export const Ъ: GlyphDefinition = {
  unicode: 0x042a,
  name: 'Ъ',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.9;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = xHeight * 0.6;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = xHeight * 0.35 - stem / 2;
    const c = 0.5522847498;

    // Left vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Lower bowl (outer)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(stemX + stem / 2, cy - outerRy)
      .curveTo(stemX + stem / 2 + outerRx * c, cy - outerRy, stemX + stem / 2 + outerRx, cy - outerRy * c, stemX + stem / 2 + outerRx, cy)
      .curveTo(stemX + stem / 2 + outerRx, cy + outerRy * c, stemX + stem / 2 + outerRx * c, cy + outerRy, stemX + stem / 2, cy + outerRy);

    // Bowl (inner)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(stemX + stem / 2, cy + innerRy)
      .curveTo(stemX + stem / 2 + innerRx * c, cy + innerRy, stemX + stem / 2 + innerRx, cy + innerRy * c, stemX + stem / 2 + innerRx, cy)
      .curveTo(stemX + stem / 2 + innerRx, cy - innerRy * c, stemX + stem / 2 + innerRx * c, cy - innerRy, stemX + stem / 2, cy - innerRy)
      .closePath();

    Ъ.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ы - Yeru (like ЬИ combined)
export const Ы: GlyphDefinition = {
  unicode: 0x042b,
  name: 'Ы',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const bowlWidth = xHeight * 0.9;
    const fullWidth = sb + stem + bowlWidth + stem * 2 + sb;
    const stem1X = sb + stem / 2;
    const cx = stem1X + bowlWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const c = 0.5522847498;

    // Left stem
    builder.vStem(stem1X, 0, capHeight, stem);

    // Right stem (for the И part)
    const stem2X = fullWidth - sb - stem / 2;
    builder.vStem(stem2X, 0, capHeight, stem);

    // Bowl (outer) - similar to 'o'
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Bowl (inner counter)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    Ы.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ь - soft sign (small shape with bowl)
export const Ь: GlyphDefinition = {
  unicode: 0x042c,
  name: 'Ь',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const xHeight = p.xHeight;
    const overshoot = p.overshoot;

    const bowlWidth = xHeight * 0.9;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + bowlWidth / 2;
    const cy = xHeight / 2;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = xHeight / 2 - stem / 2;
    const c = 0.5522847498;

    // Left vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Bowl (outer)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // Bowl (inner counter)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    Ь.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Э - reversed C with middle stroke
export const Э: GlyphDefinition = {
  unicode: 0x042d,
  name: 'Э',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const width = capHeight * 0.9;
    const fullWidth = width + sb * 2;
    const cx = fullWidth / 2;
    const cy = capHeight / 2;
    const rx = width / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;

    // C shape (open on left - reverse of C)
    builder
      .moveTo(cx - outerRx * 0.6, cy - outerRy)
      .curveTo(cx - outerRx * c, cy - outerRy, cx - outerRx, cy - outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy + outerRy * c, cx - outerRx * c, cy + outerRy, cx - outerRx * 0.6, cy + outerRy);

    builder.lineTo(cx - innerRx * 0.6, cy + innerRy);

    builder
      .curveTo(cx - innerRx * c, cy + innerRy, cx - innerRx, cy + innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy - innerRy * c, cx - innerRx * c, cy - innerRy, cx - innerRx * 0.6, cy - innerRy);

    builder.closePath();

    // Cap ends
    builder.rect(cx - rx * 0.4 - stem, cy - outerRy - stem / 2, stem, stem);
    builder.rect(cx - rx * 0.4 - stem, cy + outerRy - stem / 2, stem, stem);

    // Middle horizontal stroke
    builder.hStem(cx - stem / 2, cy, rx * 0.8, stem);

    Э.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Ю - vertical stem with O attached
export const Ю: GlyphDefinition = {
  unicode: 0x042e,
  name: 'Ю',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.88;
    const fullWidth = sb + stem + bowlWidth + sb;
    const stemX = sb + stem / 2;
    const cx = stemX + stem + bowlWidth / 2;
    const cy = capHeight / 2;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight / 2 - stem / 2;
    const c = 0.5522847498;

    // Left vertical stem
    builder.vStem(stemX, 0, capHeight, stem);

    // Small connector to the O
    builder.hStem(stemX, cy, stem, stem);

    // O shape (outer)
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(cx, cy - outerRy)
      .curveTo(cx + outerRx * c, cy - outerRy, cx + outerRx, cy - outerRy * c, cx + outerRx, cy)
      .curveTo(cx + outerRx, cy + outerRy * c, cx + outerRx * c, cy + outerRy, cx, cy + outerRy)
      .curveTo(cx - outerRx * c, cy + outerRy, cx - outerRx, cy + outerRy * c, cx - outerRx, cy)
      .curveTo(cx - outerRx, cy - outerRy * c, cx - outerRx * c, cy - outerRy, cx, cy - outerRy)
      .closePath();

    // O shape (inner counter)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(cx, cy - innerRy)
      .curveTo(cx - innerRx * c, cy - innerRy, cx - innerRx, cy - innerRy * c, cx - innerRx, cy)
      .curveTo(cx - innerRx, cy + innerRy * c, cx - innerRx * c, cy + innerRy, cx, cy + innerRy)
      .curveTo(cx + innerRx * c, cy + innerRy, cx + innerRx, cy + innerRy * c, cx + innerRx, cy)
      .curveTo(cx + innerRx, cy - innerRy * c, cx + innerRx * c, cy - innerRy, cx, cy - innerRy)
      .closePath();

    Ю.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Я - reversed R shape
export const Я: GlyphDefinition = {
  unicode: 0x042f,
  name: 'Я',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    const sb = p.sidebearing;
    const stem = p.weight;
    const capHeight = p.capHeight;
    const overshoot = p.overshoot;

    const bowlWidth = capHeight * 0.9;
    const fullWidth = sb + bowlWidth + stem + sb;
    const stemX = fullWidth - sb - stem / 2;
    const cx = stemX - bowlWidth / 2;
    const cy = capHeight * 0.6;
    const rx = bowlWidth / 2 - stem / 2;
    const ry = capHeight * 0.4 - stem / 2;
    const c = 0.5522847498;

    // Right vertical stem (full height)
    builder.vStem(stemX, 0, capHeight, stem);

    // Bowl (outer) - on the left side
    const outerRx = rx + stem / 2 + overshoot;
    const outerRy = ry + stem / 2 + overshoot;
    builder
      .moveTo(stemX - stem / 2, cy - outerRy)
      .curveTo(stemX - stem / 2 - outerRx * c, cy - outerRy, stemX - stem / 2 - outerRx, cy - outerRy * c, stemX - stem / 2 - outerRx, cy)
      .curveTo(stemX - stem / 2 - outerRx, cy + outerRy * c, stemX - stem / 2 - outerRx * c, cy + outerRy, stemX - stem / 2, cy + outerRy);

    // Bowl (inner)
    const innerRx = rx - stem / 2;
    const innerRy = ry - stem / 2;
    builder
      .moveTo(stemX - stem / 2, cy + innerRy)
      .curveTo(stemX - stem / 2 - innerRx * c, cy + innerRy, stemX - stem / 2 - innerRx, cy + innerRy * c, stemX - stem / 2 - innerRx, cy)
      .curveTo(stemX - stem / 2 - innerRx, cy - innerRy * c, stemX - stem / 2 - innerRx * c, cy - innerRy, stemX - stem / 2, cy - innerRy)
      .closePath();

    // Diagonal leg from bowl to bottom left
    const legStartX = stemX - stem / 2 - innerRx * 0.5;
    const legStartY = cy;
    const legEndX = sb + stem / 2;

    builder.moveTo(legStartX, legStartY);
    builder.lineTo(legStartX - stem, legStartY + stem / 2);
    builder.lineTo(legEndX, 0);
    builder.lineTo(legEndX + stem, 0);
    builder.closePath();

    Я.advanceWidth = fullWidth;
    return builder.build();
  },
};

// Export all defined cyrillic glyphs
export const cyrillic: GlyphDefinition[] = [
  А, Б, В, Г, Д, Е, Ё, Ж, З, И, Й, К, Л, М, Н, О, П, Р, С, Т,
  У, Ф, Х, Ц, Ч, Ш, Щ, Ъ, Ы, Ь, Э, Ю, Я
];
