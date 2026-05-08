# Розсада від Ігоря

Каталог сортів помідорів і перцю. Львів, Україна.
Сайт: https://bohdanchupa.github.io

## Що це

Статичний сайт-каталог на Astro 5 + Tailwind 4. 16 сортів (10 помідорів + 5 перців + сторінка про Ігоря). SEO-friendly, без JS-фреймворків, працює навіть з вимкненим JavaScript.

## Технології

- **Astro 5** — статика, нуль JS за замовчуванням
- **Tailwind CSS 4** — стилі через `@theme`
- **Content Collections** — `.md` сорти з типобезпечною zod-схемою
- **astro:assets** — auto WebP, responsive `srcset`
- **GitHub Pages** — деплой через GitHub Actions

## Локальний запуск

Потрібен **Node.js 20+** (рекомендую 22).

```bash
npm install
npm run dev          # → http://localhost:4321
npm run build        # → dist/
npm run preview      # перегляд продакшен-білду
```

## Як додати новий сорт

1. Скопіюй фото у `src/assets/varieties/[slug].png` (slug — латиницею, без пробілів, наприклад `chornyy-prynts.png`).
2. Якщо є додаткові фото того ж сорту — `[slug]-2.png`, `[slug]-3.png`.
3. Створи `.md` у `src/content/varieties/[slug].md` за зразком існуючих файлів. Поля:

```yaml
---
slug: chornyy-prynts
name: "Чорний принц"
category: tomato            # tomato | pepper
type: indeterminate          # determinate | semi-determinate | indeterminate
ripening: mid                # early | mid | mid-early | пізній (ук)
days_to_harvest: 110-120
height_cm: 150-180
fruit:
  weight_g: 200-400
  shape: округла
  color: темно-бордовий
  taste: солодкий
  use: салатний
yield_per_plant_kg: 4-6
disease_resistance: ["..."]
pruning: yes
stems: 2
staking: required
watering: "..."
fertilizing: "..."
planting_western_ukraine: "..."
spacing_cm: "50x70"
tips:
  - "..."
confidence: high             # high | medium | low
notes: ""
---

Текст опису у 2-3 абзаци.
```

4. `git add . && git commit -m "add chornyy-prynts" && git push`. GitHub Actions сам збере і задеплоїть за ~2 хв.

## Як змінити графік на ринку / телефон / адресу

Усі контактні дані в одному файлі: `src/site.config.ts`.

```ts
phone: { raw: '+380...', display: '...', href: 'tel:...' },
market: {
  address: '...',
  schedule: '...',
  season: '...',
},
```

Зміни → commit → push → автодеплой.

## Структура

```
src/
├── content/varieties/    # .md сорти
├── assets/varieties/     # фото сортів
├── assets/about/         # фото Ігоря
├── components/           # Astro-компоненти
├── layouts/Base.astro    # обгортка з SEO
├── lib/                  # допоміжні модулі
├── pages/                # маршрути
│   ├── index.astro
│   ├── pomidory/{index,[slug]}.astro
│   ├── pertsi/{index,[slug]}.astro
│   ├── dohliad.astro
│   ├── kontakty.astro
│   └── 404.astro
├── site.config.ts        # контакти, market, owner
└── styles/global.css     # Tailwind v4 + custom tokens
```

## Деплой

Автоматичний при `push origin main`. Workflow: `.github/workflows/deploy.yml`.

Перевірити статус: GitHub репо → вкладка **Actions**.

## Дослідження сортів

Джерела для кожного сорту в `research/research-log.md`. Сорти з `confidence: low` або `medium` варто перевіряти на власному городі і оновлювати картку.
