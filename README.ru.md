# Haifa — Programmatic Font Generator

Геометрический sans-serif шрифт для дизайн-системы города Хайфа. Вдохновлён конструктивистской архитектурой и швейцарской типографикой (International Typographic Style).

## Возможности

- **Полный латинский алфавит** — a-z, A-Z с оптическими коррекциями
- **Кириллица** — полный набор русских букв (А-Я, 33 глифа)
- **Иврит** — алфавит (א-ת, 27 глифов включая финальные формы) с поддержкой RTL
- **Цифры и пунктуация** — 0-9, базовые знаки препинания
- **Кернинг** — 95+ пар для критических комбинаций (латиница + кириллица + иврит)
- **Variable Font** — ось веса wght: 100-700
- **Параметрическая система** — меняй weight, width, contrast кодом

## Быстрый старт

```bash
cd font-generator
npm install
npm run generate
```

Файлы создаются в `output/`:
- `Haifa-Light.otf` (wght: 100)
- `Haifa-Regular.otf` (wght: 400)
- `Haifa-Bold.otf` (wght: 700)
- `Haifa-Variable.woff2` (wght: 100-700)

## Архитектура

```
font-generator/
├── src/
│   ├── types.ts                 # Типы и интерфейсы
│   ├── config/default.ts        # Конфигурации весов
│   ├── core/
│   │   ├── path-builder.ts      # Безье кривые
│   │   ├── opentype-converter.ts
│   │   └── kerning.ts           # Кернинг-пары
│   ├── glyphs/
│   │   ├── lowercase-full.ts    # a-z
│   │   ├── uppercase-full.ts    # A-Z
│   │   ├── numbers.ts           # 0-9
│   │   ├── punctuation.ts       # .,;:()[] и др.
│   │   ├── cyrillic.ts          # А-Я (кириллица)
│   │   └── hebrew.ts            # א-ת (иврит)
│   ├── builder/
│   │   ├── font-builder.ts      # OTF компилятор
│   │   └── variable-font.ts    # Variable font builder
│   └── index.ts                 # CLI entry
├── output/                      # Сгенерированные шрифты
├── package.json
└── tsconfig.json
```

## Параметры глифов

| Параметр      | Описание                        | Regular | Bold | Light |
|---------------|---------------------------------|---------|------|-------|
| `weight`      | Толщина стемов                  | 80      | 160  | 40    |
| `width`       | Стандартная ширина              | 600     | 600  | 600   |
| `sidebearing` | Боковые поля                    | 50      | 40   | 60    |
| `xHeight`     | Высота строчных                 | 500     | 500  | 500   |
| `capHeight`   | Высота заглавных                | 700     | 700  | 700   |
| `ascender`    | Верхний выносной элемент        | 800     | 800  | 800   |
| `descender`   | Нижний выносной элемент         | -200    | -200 | -200  |
| `overshoot`   | Оптическая коррекция округлых   | 10      | 10   | 10    |

## Создание глифа

```typescript
// src/glyphs/lowercase-full.ts
export const a: GlyphDefinition = {
  unicode: 0x0061,
  name: 'a',
  advanceWidth: 0,
  build: (p: GlyphParams) => {
    const builder = createPath();
    
    // Bowl + stem construction
    const sb = p.sidebearing;
    const stem = p.weight;
    
    // Build circular bowl
    builder.circle(cx, cy, radius, p.overshoot);
    
    // Add right stem
    builder.vStem(stemX, 0, p.xHeight, stem);
    
    a.advanceWidth = calculateWidth;
    return builder.build();
  },
};
```

## Кернинг

Критические пары (AV, TA, LY и др.) настраиваются в `src/core/kerning.ts`:

```typescript
export const kerningPairs: KerningPair[] = [
  { left: 'A', right: 'V', value: -60 },
  { left: 'T', right: 'a', value: -80 },
  { left: 'Г', right: 'А', value: -80 },  // кириллица
];
```

## Variable Font

Ось `wght` с тремя мастерами:
- Light (100)
- Regular (400) — default
- Bold (700)

Использование в CSS:

```css
@font-face {
  font-family: 'Haifa';
  src: url('Haifa-Variable.woff2') format('woff2-variations');
  font-weight: 100 700;
}

body {
  font-family: 'Haifa', sans-serif;
  font-weight: 400;  /* или 150, 250, 534... */
}
```

## Roadmap

- [x] Полный латинский алфавит
- [x] Кириллица (полная А-Я)
- [x] Ивритский алфавит (א-ת)
- [x] Цифры и пунктуация
- [x] Kerning pairs (95+)
- [x] Variable font export
- [ ] Дополнительная латиница (accents)
- [ ] Лигатуры
- [ ] Web preview page
- [ ] Генератор спекименов
