// Class-Based Kerning System
// Generates kerning pairs from glyph classes rather than manual pairs

// Glyph classification by shape characteristics
export enum KernClass {
  // Left side classes
  LeftRound = 'left_round',           // O, C, G, Q, o, c, e
  LeftFlat = 'left_flat',             // H, I, N, M, n, h, m
  LeftAngled = 'left_angled',         // A, V, W, Y, v, w, y
  LeftOpen = 'left_open',             // C, G, S, c, e
  LeftSerif = 'left_serif',           // Serif terminals (if applicable)
  
  // Right side classes  
  RightRound = 'right_round',         // O, D, Q, o, b, p
  RightFlat = 'right_flat',           // H, I, N, n, u
  RightAngled = 'right_angled',       // A, V, W, Y, v, w, y
  RightOpen = 'right_open',             // C, G, S, a, s
  RightSerif = 'right_serif',         // Serif terminals
  
  // Special cases
  Punctuation = 'punctuation',        // ., ,, !, ?
  Quote = 'quote',                    // ", '
  Paren = 'paren',                    // (, )
}

// Map glyphs to their kerning classes
export const glyphToClasses: Record<string, { left: KernClass; right: KernClass }> = {
  // Uppercase
  'A': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'B': { left: KernClass.LeftFlat, right: KernClass.RightRound },
  'C': { left: KernClass.LeftOpen, right: KernClass.RightOpen },
  'D': { left: KernClass.LeftFlat, right: KernClass.RightRound },
  'E': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'F': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'G': { left: KernClass.LeftOpen, right: KernClass.RightRound },
  'H': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'I': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'J': { left: KernClass.LeftRound, right: KernClass.RightAngled },
  'K': { left: KernClass.LeftFlat, right: KernClass.RightAngled },
  'L': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'M': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'N': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'O': { left: KernClass.LeftRound, right: KernClass.RightRound },
  'P': { left: KernClass.LeftFlat, right: KernClass.RightRound },
  'Q': { left: KernClass.LeftRound, right: KernClass.RightRound },
  'R': { left: KernClass.LeftFlat, right: KernClass.RightAngled },
  'S': { left: KernClass.LeftOpen, right: KernClass.RightOpen },
  'T': { left: KernClass.LeftFlat, right: KernClass.RightAngled },
  'U': { left: KernClass.LeftRound, right: KernClass.RightRound },
  'V': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'W': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'X': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'Y': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'Z': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  
  // Lowercase
  'a': { left: KernClass.LeftOpen, right: KernClass.RightRound },
  'b': { left: KernClass.LeftFlat, right: KernClass.RightRound },
  'c': { left: KernClass.LeftOpen, right: KernClass.RightOpen },
  'd': { left: KernClass.LeftRound, right: KernClass.RightFlat },
  'e': { left: KernClass.LeftOpen, right: KernClass.RightOpen },
  'f': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'g': { left: KernClass.LeftRound, right: KernClass.RightRound },
  'h': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'i': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'j': { left: KernClass.LeftRound, right: KernClass.RightAngled },
  'k': { left: KernClass.LeftFlat, right: KernClass.RightAngled },
  'l': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'm': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'n': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'o': { left: KernClass.LeftRound, right: KernClass.RightRound },
  'p': { left: KernClass.LeftFlat, right: KernClass.RightRound },
  'q': { left: KernClass.LeftRound, right: KernClass.RightFlat },
  'r': { left: KernClass.LeftFlat, right: KernClass.RightOpen },
  's': { left: KernClass.LeftOpen, right: KernClass.RightOpen },
  't': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  'u': { left: KernClass.LeftRound, right: KernClass.RightFlat },
  'v': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'w': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'x': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'y': { left: KernClass.LeftAngled, right: KernClass.RightAngled },
  'z': { left: KernClass.LeftFlat, right: KernClass.RightFlat },
  
  // Punctuation
  '.': { left: KernClass.Punctuation, right: KernClass.Punctuation },
  ',': { left: KernClass.Punctuation, right: KernClass.Punctuation },
  '!': { left: KernClass.Punctuation, right: KernClass.Punctuation },
  '?': { left: KernClass.Punctuation, right: KernClass.Punctuation },
  '"': { left: KernClass.Quote, right: KernClass.Quote },
  "'": { left: KernClass.Quote, right: KernClass.Quote },
  '(': { left: KernClass.Paren, right: KernClass.Paren },
  ')': { left: KernClass.Paren, right: KernClass.Paren },
};

// Kerning values for class pairs (in font units)
// Negative = closer together (tighter)
// Positive = further apart (looser)
const classKernValues: Record<string, number> = {
  // Tight kerning for angled + angled combinations
  'left_angled:right_angled': -50,
  'left_angled:right_flat': -20,
  'left_flat:right_angled': -20,
  
  // Round + Round needs space to breathe
  'left_round:right_round': 10,
  'left_round:right_flat': -5,
  'left_flat:right_round': -5,
  
  // Angled + Round creates tight spot
  'left_angled:right_round': -40,
  'left_round:right_angled': -40,
  
  // Open sides can tuck in slightly
  'left_open:right_flat': -15,
  'left_flat:right_open': -15,
  'left_open:right_open': -10,
  
  // Punctuation spacing
  'left_flat:punctuation': 20,
  'right_flat:punctuation': 20,
  'left_angled:punctuation': 40,
  'right_angled:punctuation': 40,
  
  // Quote spacing
  'left_flat:quote': -80,
  'quote:right_flat': -80,
  'left_angled:quote': -100,
  'quote:right_angled': -100,
  
  // Parentheses
  'paren:right_flat': -30,
  'paren:right_round': -20,
  'paren:right_angled': -50,
  'left_flat:paren': -30,
  'left_round:paren': -20,
  'left_angled:paren': -50,
};

// Special glyph-specific overrides (for fine-tuning)
const glyphPairOverrides: Record<string, number> = {
  'AV': -60, 'VA': -60,
  'AT': -50, 'TA': -50,
  'FA': -60, 'AF': -60,
  'LT': -50, 'TL': -50,
  'PA': -40, 'AP': -40,
  'TO': -20, 'OT': -20,
  'AC': -30, 'CA': -30,
  'WO': -25, 'OW': -25,
  'VO': -30, 'OV': -30,
  'av': -45, 'va': -45,
  'at': -40, 'ta': -40,
  'fa': -50, 'af': -50,
  'lt': -40, 'tl': -40,
  'pa': -35, 'ap': -35,
  'to': -15, 'ot': -15,
};

export interface KerningPair {
  left: string;
  right: string;
  value: number;
}

// Generate all kerning pairs from classes
export function generateClassBasedKerning(glyphs: string[]): KerningPair[] {
  const pairs: KerningPair[] = [];
  const processed = new Set<string>();
  
  for (const left of glyphs) {
    const leftClasses = glyphToClasses[left];
    if (!leftClasses) continue;
    
    for (const right of glyphs) {
      const rightClasses = glyphToClasses[right];
      if (!rightClasses) continue;
      
      // Skip same glyph or already processed
      const pairKey = `${left}:${right}`;
      if (processed.has(pairKey)) continue;
      processed.add(pairKey);
      
      // Check for glyph-specific override
      const overrideKey = `${left}${right}`;
      if (glyphPairOverrides[overrideKey] !== undefined) {
        pairs.push({ left, right, value: glyphPairOverrides[overrideKey] });
        continue;
      }
      
      // Look up class-based kerning
      const classPairKey = `${leftClasses.left}:${rightClasses.right}`;
      const value = classKernValues[classPairKey];
      
      if (value !== undefined && value !== 0) {
        pairs.push({ left, right, value });
      }
    }
  }
  
  // Add punctuation kerning
  const punctuation = ['.', ',', '!', '?', '"', "'", '(', ')'];
  for (const left of glyphs) {
    for (const punct of punctuation) {
      const punctClasses = glyphToClasses[punct];
      const leftClasses = glyphToClasses[left];
      if (!punctClasses || !leftClasses) continue;
      
      // Left glyph + punctuation
      const classPairKey = `${leftClasses.right}:${punctClasses.left}`;
      const value = classKernValues[classPairKey];
      if (value !== undefined) {
        pairs.push({ left, right: punct, value });
      }
      
      // Punctuation + right glyph
      const classPairKey2 = `${punctClasses.right}:${leftClasses.left}`;
      const value2 = classKernValues[classPairKey2];
      if (value2 !== undefined) {
        pairs.push({ left: punct, right: left, value: value2 });
      }
    }
  }
  
  return pairs;
}

// Get kerning value for a specific pair (for runtime lookup)
export function getKerningValue(left: string, right: string): number {
  // Check override first
  const overrideKey = `${left}${right}`;
  if (glyphPairOverrides[overrideKey] !== undefined) {
    return glyphPairOverrides[overrideKey];
  }
  
  // Fall back to class-based
  const leftClasses = glyphToClasses[left];
  const rightClasses = glyphToClasses[right];
  
  if (!leftClasses || !rightClasses) return 0;
  
  const classPairKey = `${leftClasses.right}:${rightClasses.left}`;
  return classKernValues[classPairKey] || 0;
}

// Debug: print class assignments
export function debugKernClasses(): void {
  console.log('\n📐 Kerning Class Assignments:\n');
  
  for (const [glyph, classes] of Object.entries(glyphToClasses)) {
    console.log(`  ${glyph}: left=${classes.left}, right=${classes.right}`);
  }
  
  console.log('\n📊 Generated Pairs:\n');
  const allGlyphs = Object.keys(glyphToClasses).filter(g => g.length === 1 && /[A-Za-z]/.test(g));
  const pairs = generateClassBasedKerning(allGlyphs);
  
  const tight = pairs.filter(p => p.value < -30);
  const loose = pairs.filter(p => p.value > 0);
  
  console.log(`  Total pairs: ${pairs.length}`);
  console.log(`  Tight (< -30): ${tight.length}`);
  console.log(`  Loose (> 0): ${loose.length}`);
  console.log(`\n  Sample tight pairs: ${tight.slice(0, 10).map(p => `${p.left}${p.right}=${p.value}`).join(', ')}`);
}
