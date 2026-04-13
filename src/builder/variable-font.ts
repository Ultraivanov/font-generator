// Variable Font builder
// Creates a single font file with multiple weight masters

import opentype from 'opentype.js';
import { FontConfig } from '../types.js';
import { FontBuilder } from './font-builder.js';
import { createFontConfig, lightParams, regularParams, boldParams } from '../config/default.js';

export interface VariableAxis {
  tag: string;
  name: string;
  min: number;
  default: number;
  max: number;
}

export interface VariableMaster {
  name: string;
  weight: number;  // Weight axis value (100-900)
  params: typeof lightParams;
}

// Define weight axis
export const weightAxis: VariableAxis = {
  tag: 'wght',
  name: 'Weight',
  min: 100,
  default: 400,
  max: 700,
};

// Define masters
export const masters: VariableMaster[] = [
  { name: 'Light', weight: 100, params: lightParams },
  { name: 'Regular', weight: 400, params: regularParams },
  { name: 'Bold', weight: 700, params: boldParams },
];

export class VariableFontBuilder {
  private familyName: string;

  constructor(familyName: string = 'Haifa') {
    this.familyName = familyName;
  }

  build(): opentype.Font {
    // Build the Regular master as the default
    const regularConfig = createFontConfig(this.familyName, 'Regular', regularParams);
    const builder = new FontBuilder(regularConfig);
    const font = builder.build();

    // Add fvar table for variable font axis
    this.addFvarTable(font);

    // Add STAT table for style attributes
    this.addStatTable(font);

    return font;
  }

  private addFvarTable(font: opentype.Font): void {
    // OpenType fvar table defines variation axes
    const fvarTable = {
      majorVersion: 1,
      minorVersion: 0,
      axes: [
        {
          tag: weightAxis.tag,
          name: weightAxis.name,
          minValue: weightAxis.min,
          defaultValue: weightAxis.default,
          maxValue: weightAxis.max,
          flags: 0,
        }
      ],
      instances: masters.map(master => ({
        subfamilyName: master.name,
        coordinates: { wght: master.weight },
        flags: 0,
      })),
    };

    // Attach to font tables
    if (font.tables) {
      (font.tables as any).fvar = fvarTable;
    }
  }

  private addStatTable(font: opentype.Font): void {
    // STAT table for style attributes
    const statTable = {
      majorVersion: 1,
      minorVersion: 1,
      designAxes: [
        {
          tag: 'wght',
          name: 'Weight',
          ordering: 0,
        }
      ],
      axisValueTables: masters.map(master => ({
        axisTag: 'wght',
        value: master.weight,
        name: master.name,
        flags: 0,
      })),
    };

    if (font.tables) {
      (font.tables as any).STAT = statTable;
    }
  }

  // Generate variable font and save
  generate(outputPath: string): void {
    const font = this.build();

    // Rename to indicate it's a variable font
    (font as any).familyName = `${this.familyName} Variable`;

    font.download(outputPath);
  }

  // Export master fonts individually (for fallback)
  generateMasters(outputDir: string): void {
    for (const master of masters) {
      const config = createFontConfig(this.familyName, master.name, master.params);
      const builder = new FontBuilder(config);
      const font = builder.build();

      const fileName = `${this.familyName}-${master.name}.otf`;
      font.download(`${outputDir}/${fileName}`);
    }
  }
}

// Convenience function
export function buildVariableFont(
  familyName: string = 'Brockmann',
  outputPath?: string
): opentype.Font {
  const builder = new VariableFontBuilder(familyName);

  if (outputPath) {
    builder.generate(outputPath);
  }

  return builder.build();
}
