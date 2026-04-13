// Kerning pairs for improved typography
// Values are in font units (typically negative for tighter spacing)

export interface KerningPair {
  left: string;    // Left glyph name
  right: string;   // Right glyph name
  value: number;   // Kerning value (negative = closer)
}

// Critical kerning pairs for geometric sans-serif
export const kerningPairs: KerningPair[] = [
  // A combinations
  { left: 'A', right: 'V', value: -60 },
  { left: 'A', right: 'W', value: -50 },
  { left: 'A', right: 'Y', value: -60 },
  { left: 'A', right: 'T', value: -70 },
  { left: 'V', right: 'A', value: -60 },
  { left: 'W', right: 'A', value: -50 },
  { left: 'Y', right: 'A', value: -60 },

  // K combinations
  { left: 'K', right: 'A', value: -50 },
  { left: 'K', right: 'O', value: -40 },

  // T combinations
  { left: 'T', right: 'a', value: -80 },
  { left: 'T', right: 'e', value: -80 },
  { left: 'T', right: 'o', value: -80 },
  { left: 'T', right: 'r', value: -60 },
  { left: 'T', right: 'u', value: -70 },
  { left: 'T', right: 'w', value: -50 },
  { left: 'T', right: 'y', value: -60 },
  { left: 'T', right: 'A', value: -70 },
  { left: 'T', right: 'C', value: -50 },
  { left: 'T', right: 'G', value: -50 },
  { left: 'T', right: 'O', value: -50 },
  { left: 'T', right: 'Q', value: -50 },
  // T punctuation
  { left: 'T', right: 'period', value: -60 },
  { left: 'T', right: 'comma', value: -60 },

  // F combinations
  { left: 'F', right: 'a', value: -90 },
  { left: 'F', right: 'e', value: -80 },
  { left: 'F', right: 'o', value: -80 },
  { left: 'F', right: 'r', value: -60 },
  { left: 'F', right: 'A', value: -80 },
  { left: 'F', right: 't', value: -70 },

  // L combinations
  { left: 'L', right: 'V', value: -70 },
  { left: 'L', right: 'W', value: -60 },
  { left: 'L', right: 'Y', value: -80 },
  { left: 'L', right: 'T', value: -80 },
  { left: 'L', right: 'A', value: -60 },
  { left: 'L', right: 'o', value: -30 },
  { left: 'L', right: 'u', value: -20 },

  // P combinations
  { left: 'P', right: 'a', value: -60 },
  { left: 'P', right: 'e', value: -60 },
  { left: 'P', right: 'o', value: -60 },
  { left: 'P', right: 'A', value: -80 },

  // V/W/Y + A (from spec)
  { left: 'V', right: 'A', value: -60 },
  { left: 'W', right: 'A', value: -50 },
  { left: 'Y', right: 'A', value: -60 },
  // V/W/Y punctuation
  { left: 'V', right: 'period', value: -60 },
  { left: 'V', right: 'comma', value: -60 },
  { left: 'W', right: 'period', value: -50 },
  { left: 'W', right: 'comma', value: -50 },
  { left: 'Y', right: 'period', value: -60 },
  { left: 'Y', right: 'comma', value: -60 },

  // V combinations
  { left: 'V', right: 'a', value: -60 },
  { left: 'V', right: 'e', value: -60 },
  { left: 'V', right: 'o', value: -60 },
  { left: 'V', right: 'u', value: -40 },

  // W combinations
  { left: 'W', right: 'a', value: -50 },
  { left: 'W', right: 'e', value: -50 },
  { left: 'W', right: 'o', value: -50 },

  // Y combinations
  { left: 'Y', right: 'a', value: -70 },
  { left: 'Y', right: 'e', value: -70 },
  { left: 'Y', right: 'o', value: -70 },
  { left: 'Y', right: 'u', value: -50 },
  { left: 'Y', right: 'o', value: -50 }, // Yo

  // Quote combinations
  { left: 'quotedbl', right: 'A', value: -100 },
  { left: 'quotedbl', right: 'a', value: -60 },
  { left: 'quotesingle', right: 'A', value: -80 },
  { left: 'quotesingle', right: 'a', value: -50 },
  { left: 'quotedbl', right: 'T', value: -40 },
  { left: 'quotesingle', right: 'T', value: -30 },

  // Period/space combinations
  { left: 'period', right: 'quotedbl', value: -30 },
  { left: 'period', right: 'quotesingle', value: -30 },
  { left: 'comma', right: 'quotedbl', value: -30 },
  { left: 'comma', right: 'quotesingle', value: -30 },

  // r combinations (ra re ro)
  { left: 'r', right: 'a', value: -20 },
  { left: 'r', right: 'e', value: -25 },
  { left: 'r', right: 'o', value: -20 },

  // W combinations extended (We Wo)
  { left: 'W', right: 'e', value: -50 },
  { left: 'W', right: 'o', value: -50 },

  // Number combinations
  { left: 'one', right: 'zero', value: -20 },
  { left: 'one', right: 'one', value: -30 },
  { left: 'seven', right: 'A', value: -40 },
  { left: 'seven', right: 'T', value: -40 },

  // Cyrillic kerning
  { left: 'А', right: 'В', value: -40 },
  { left: 'А', right: 'Г', value: -40 },
  { left: 'А', right: 'Т', value: -70 },
  { left: 'В', right: 'А', value: -40 },
  { left: 'Г', right: 'А', value: -80 },
  { left: 'Г', right: 'О', value: -50 },
  { left: 'Г', right: 'У', value: -60 },
  { left: 'Г', right: 'Ю', value: -50 },
  { left: 'Т', right: 'а', value: -80 },
  { left: 'Т', right: 'е', value: -80 },
  { left: 'Т', right: 'о', value: -80 },
  { left: 'Т', right: 'А', value: -70 },
  { left: 'Т', right: 'О', value: -50 },
  { left: 'Т', right: 'Ю', value: -50 },
  { left: 'Т', right: 'Я', value: -60 },
  { left: 'У', right: 'а', value: -70 },
  { left: 'У', right: 'е', value: -70 },
  { left: 'У', right: 'о', value: -70 },
  { left: 'У', right: 'А', value: -70 },
  { left: 'У', right: 'О', value: -60 },
  { left: 'У', right: 'Ю', value: -50 },
  { left: 'Х', right: 'А', value: -50 },
  { left: 'Х', right: 'О', value: -40 },
  { left: 'Ц', right: 'А', value: -40 },
  { left: 'Ч', right: 'А', value: -50 },
  { left: 'Ш', right: 'А', value: -30 },
  { left: 'Щ', right: 'А', value: -30 },
  { left: 'Ю', right: 'А', value: -40 },
  { left: 'Я', right: 'А', value: -30 },
  { left: 'Я', right: 'О', value: -30 },

  // Hebrew kerning
  { left: 'Bet', right: 'Yod', value: -40 },
  { left: 'Gimel', right: 'Yod', value: -40 },
  { left: 'Dalet', right: 'Yod', value: -40 },
  { left: 'He', right: 'Yod', value: -40 },
  { left: 'Kaf', right: 'Yod', value: -50 },
  { left: 'Pe', right: 'Yod', value: -50 },
  { left: 'Qof', right: 'Yod', value: -60 },
  { left: 'Resh', right: 'Yod', value: -50 },
  { left: 'Shin', right: 'Yod', value: -40 },
  { left: 'Tav', right: 'Yod', value: -30 },
  { left: 'Lamed', right: 'Aleph', value: -50 },
  { left: 'Lamed', right: 'Bet', value: -40 },
  { left: 'Lamed', right: 'Kaf', value: -40 },
  { left: 'Lamed', right: 'Resh', value: -30 },
  { left: 'Vav', right: 'Vav', value: -30 },
  { left: 'Yod', right: 'Yod', value: -40 },
];

// Generate kerning table for opentype.js
export function generateKerningTable(
  glyphNames: Map<number, string>
): Map<string, Map<string, number>> {
  const table = new Map<string, Map<string, number>>();

  for (const pair of kerningPairs) {
    if (!table.has(pair.left)) {
      table.set(pair.left, new Map());
    }
    table.get(pair.left)!.set(pair.right, pair.value);
  }

  return table;
}
