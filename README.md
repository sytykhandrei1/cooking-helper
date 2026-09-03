# Помощник повара

Приложение помогает выбрать блюдо, подобрать рецепты из имеющихся продуктов,
исключить аллергены и учесть детский режим.

Production: <https://cooking-helper.asytykh.workers.dev/>

## Технологии и структура

Production-интерфейс построен на Expo, React Native и `react-native-web`:

- `index.js` — точка входа Expo;
- `src/native/` — активный интерфейс;
- `src/data/` и `src/utils/` — общая база блюд и логика подбора;
- `dist-native/` — генерируемая production-сборка;
- `wrangler.jsonc` — публикация статических файлов в Cloudflare Workers;
- `vitest.config.js` — конфигурация тестов.

## Локальная разработка

Требуются Node.js 22+ и npm 10+.

```bash
npm ci
npm start          # Expo и QR-код для мобильных устройств
npm run web        # активное приложение в браузере
```

Проверки и production-сборка:

```bash
npm run quality
npm test
npm run build      # Expo web export в dist-native/
npm run check      # все три команды последовательно
```

## Деплой

Ветка `main` — единственная production-ветка. Каждый push запускает
`.github/workflows/deploy-workers.yml`: установка зависимостей, проверка базы,
тесты, Expo web export, `wrangler deploy` и smoke-тест production URL.

Для workflow уже должны быть настроены секреты `CLOUDFLARE_API_TOKEN` и
`CLOUDFLARE_ACCOUNT_ID`. Ручной деплой доступен через `npm run deploy`, но
обычный путь доставки — commit и push в `main`.

Подробности: [DEPLOY.md](./DEPLOY.md). Обязательные правила для coding agents,
включая Git-атрибуцию профилю владельца: [AGENTS.md](./AGENTS.md).
