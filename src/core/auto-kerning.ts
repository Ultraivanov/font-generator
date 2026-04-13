// src/core/auto-kerning.ts
import { KERNING_CLASSES, LOWERCASE_KERNING_CLASSES } from '../config/brockmann-profile.js';

export interface KerningPair {
  left: string;
  right: string;
  value: number;
}

export class AutoKerningGenerator {
  private kerningPairs: Map<string, number> = new Map();
  
  generateAllPairs(): KerningPair[] {
    // Generate pairs for all uppercase combinations
    this.generateFromClasses(KERNING_CLASSES.left, KERNING_CLASSES.right, true);
    
    // Generate pairs for all lowercase combinations  
    this.generateFromClasses(LOWERCASE_KERNING_CLASSES.left, LOWERCASE_KERNING_CLASSES.right, false);
    
    // Generate mixed-case pairs (uppercase + lowercase)
    this.generateMixedCasePairs();
    
    // Convert to array format
    const result: KerningPair[] = [];
    for (const [pairKey, value] of this.kerningPairs) {
      const [left, right] = pairKey.split('');
      result.push({ left, right, value });
    }
    
    return result;
  }
  
  private generateFromClasses(
    leftClasses: Record<string, string[]>,
    rightClasses: Record<string, string[]>,
    isUppercase: boolean
  ): void {
    for (const [leftType, leftChars] of Object.entries(leftClasses)) {
      for (const [rightType, rightChars] of Object.entries(rightClasses)) {
        const baseValue = this.calculateKerningValue(leftType, rightType, isUppercase);
        
        // Apply to all character combinations
        for (const leftChar of leftChars) {
          for (const rightChar of rightChars) {
            const pairKey = `${leftChar}${rightChar}`;
            this.kerningPairs.set(pairKey, baseValue);
          }
        }
      }
    }
  }
  
  private generateMixedCasePairs(): void {
    // Uppercase + lowercase pairs
    const upperLeft = KERNING_CLASSES.left;
    const lowerRight = LOWERCASE_KERNING_CLASSES.right;
    
    for (const [leftType, leftChars] of Object.entries(upperLeft)) {
      for (const [rightType, rightChars] of Object.entries(lowerRight)) {
        const value = this.calculateMixedCaseKerning(leftType, rightType);
        
        for (const leftChar of leftChars) {
          for (const rightChar of rightChars) {
            const pairKey = `${leftChar}${rightChar}`;
            this.kerningPairs.set(pairKey, value);
          }
        }
      }
    }
    
    // Lowercase + uppercase pairs
    const lowerLeft = LOWERCASE_KERNING_CLASSES.left;
    const upperRight = KERNING_CLASSES.right;
    
    for (const [leftType, leftChars] of Object.entries(lowerLeft)) {
      for (const [rightType, rightChars] of Object.entries(upperRight)) {
        const value = this.calculateMixedCaseKerning(leftType, rightType) * 0.7;
        
        for (const leftChar of leftChars) {
          for (const rightChar of rightChars) {
            const pairKey = `${leftChar}${rightChar}`;
            this.kerningPairs.set(pairKey, value);
          }
        }
      }
    }
  }
  
  private calculateKerningValue(leftType: string, rightType: string, isUppercase: boolean): number {
    const factor = isUppercase ? 1.2 : 1.0; // Uppercase needs more kerning
    
    // Main kerning rules based on shape combinations
    if (leftType === 'angled' && rightType === 'angled') return Math.round(-80 * factor);
    if (leftType === 'angled' && rightType === 'rounded') return Math.round(-60 * factor);
    if (leftType === 'angled' && rightType === 'straight') return Math.round(-40 * factor);
    if (leftType === 'rounded' && rightType === 'angled') return Math.round(-50 * factor);
    if (leftType === 'straight' && rightType === 'angled') return Math.round(-30 * factor);
    if (leftType === 'descender' && rightType === 'ascender') return Math.round(-25 * factor);
    if (leftType === 'ascender' && rightType === 'descender') return Math.round(-20 * factor);
    
    return 0;
  }
  
  private calculateMixedCaseKerning(leftType: string, rightType: string): number {
    // Mixed case typically needs less aggressive kerning
    if (leftType === 'angled' && rightType === 'angled') return -50;
    if (leftType === 'angled' && rightType === 'rounded') return -35;
    if (leftType === 'angled') return -25;
    if (rightType === 'angled') return -20;
    
    return 0;
  }
  
  private detectShapeType(char: string): string {
    if (['A', 'T', 'V', 'W', 'Y', 'F', 'P', 'v', 'w', 'y', 'f', 't'].includes(char)) return 'angled';
    if (['O', 'Q', 'C', 'G', 'S', 'o', 'c', 'e', 's'].includes(char)) return 'rounded';
    if (['g', 'j', 'p', 'q', 'y'].includes(char)) return 'descender';
    if (['b', 'd', 'h', 'k', 'l'].includes(char)) return 'ascender';
    return 'straight';
  }
  
  // Get specific pair value (for debugging)
  getKerningValue(left: string, right: string): number {
    return this.kerningPairs.get(`${left}${right}`) || 0;
  }
  
  // Debug: print statistics
  debugStats(): void {
    const tight = Array.from(this.kerningPairs.values()).filter(v => v < -50).length;
    const medium = Array.from(this.kerningPairs.values()).filter(v => v >= -50 && v < -20).length;
    const light = Array.from(this.kerningPairs.values()).filter(v => v >= -20 && v < 0).length;
    
    console.log(`\n📊 Kerning Statistics:`);
    console.log(`   Total pairs: ${this.kerningPairs.size}`);
    console.log(`   Tight (< -50): ${tight}`);
    console.log(`   Medium (-50 to -20): ${medium}`);
    console.log(`   Light (-20 to 0): ${light}`);
  }
}

// Factory function
export function createAutoKerning(): AutoKerningGenerator {
  return new AutoKerningGenerator();
}
