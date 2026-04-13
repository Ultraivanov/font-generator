// Type declarations for opentype.js

declare module 'opentype.js' {
  export interface PathCommand {
    type: string;
    x?: number;
    y?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
  }

  export class Path {
    commands: PathCommand[];
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    curveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): void;
    quadraticCurveTo(x1: number, y1: number, x: number, y: number): void;
    closePath(): void;
    extend(pathOrCommands: Path | PathCommand[]): void;
    getBoundingBox(): BoundingBox;
  }

  export interface BoundingBox {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }

  export interface GlyphOptions {
    name: string;
    unicode?: number;
    advanceWidth: number;
    path: Path;
    leftSideBearing?: number;
  }

  export class Glyph {
    name: string;
    unicode?: number;
    advanceWidth: number;
    path: Path;
    leftSideBearing: number;
    constructor(options: GlyphOptions);
    getBoundingBox(): BoundingBox;
    draw(ctx: CanvasRenderingContext2D, x: number, y: number, fontSize: number): void;
    drawPoints(ctx: CanvasRenderingContext2D, x: number, y: number, fontSize: number): void;
    drawMetrics(ctx: CanvasRenderingContext2D, x: number, y: number, fontSize: number): void;
  }

  export interface FontOptions {
    familyName: string;
    styleName: string;
    unitsPerEm: number;
    ascender: number;
    descender: number;
    glyphs: Glyph[];
  }

  export class Font {
    familyName: string;
    styleName: string;
    unitsPerEm: number;
    ascender: number;
    descender: number;
    glyphs: Glyph[];
    constructor(options: FontOptions);
    getGlyph(character: string): Glyph | undefined;
    charToGlyphIndex(char: string): number;
    charToGlyph(char: string): Glyph;
    stringToGlyphs(string: string): Glyph[];
    getKerningValue(leftGlyph: Glyph, rightGlyph: Glyph): number;
    getAdvanceWidth(text: string, fontSize: number, options?: any): number;
    forEachGlyph(text: string, x: number, y: number, fontSize: number, options: any, callback: (glyph: Glyph, x: number, y: number, fontSize: number, options: any) => void): void;
    draw(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, options?: any): void;
    drawPoints(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, options?: any): void;
    drawMetrics(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, options?: any): void;
    getPath(text: string, x: number, y: number, fontSize: number, options?: any): Path;
    getPaths(text: string, x: number, y: number, fontSize: number, options?: any): Path[];
    getBoundingBox(text: string): BoundingBox;
    toArrayBuffer(): ArrayBuffer;
    toTables(): any;
    toBuffer(): Buffer;
    download(fileName?: string): void;
    tables?: any;
    encoding?: any;
    position?: any;
    substitution?: any;
    hinting?: any;
    supported?: boolean;
    numGlyphs?: number;
    outlinesFormat?: string;
    defaultRenderOptions?: any;
    names?: any;
    metrics?: any;
  }

  export function load(url: string, callback: (err: any, font: Font | null) => void): void;
  export function loadSync(url: string): Font;
  export function parse(buffer: ArrayBuffer): Font;
}
