# Помощник повара

Приложение помогает решить, что приготовить:

- предлагает случайное блюдо, когда не хочется выбирать;
- находит блюда из продуктов, которые уже есть дома;
- исключает блюда с выбранными аллергенами;
- учитывает, будут ли блюдо есть дети.

Интерфейс переезжает на React Native (Expo): один код собирается и в приложение
для iOS и Android, и в веб через react-native-web.

## Разработка

```bash
npm install
npm start        # Expo, QR-код для iOS и Android
npm run web      # то же приложение в браузере
```

Пока миграция не закончена, прежняя веб-версия на Vite остаётся рабочей:

```bash
npm run legacy:start
```

## Проверки и сборка

```bash
npm run quality      # проверка базы блюд
npm test             # тесты логики подбора и токенов темы
npm run build        # прежняя веб-сборка, она уезжает в GitHub Pages
npm run export:web   # веб-сборка нового React Native интерфейса
```

## Статус миграции

Перенесено: база блюд, логика подбора, ассеты, главный экран с нижними табами
«Рандом» и «Собрать», шит аллергенов, тост детского режима. Общий код в
`src/data` и `src/utils` работает на обеих платформах без изменений, нативный
интерфейс лежит в `src/native`.

Осталось: действия табов (подбор блюда и выбор продуктов), экран рецепта с
композицией ингредиентов, ограничение ширины контента на широких экранах.
После этого `npm run build` переключается на `expo export`, а прежний интерфейс
(`src/components`, `src/App.jsx`, `src/MobileApp.jsx`, `src/DesktopApp.jsx`
и CSS-файлы) удаляется.

## Деплой

React Native версия публикуется на Cloudflare Workers: каждый пуш запускает
[`.github/workflows/deploy-workers.yml`](./.github/workflows/deploy-workers.yml) —
проверка базы, тесты, сборка, публикация. Красный тест останавливает деплой.

Нужны два секрета репозитория — Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN` — токен с правом `Edit Cloudflare Workers`;
- `CLOUDFLARE_ACCOUNT_ID` — Account ID из дашборда Cloudflare.

Ручная публикация, если нужна:

```bash
npx wrangler login
npm run deploy
```

Воркер только раздаёт статику, серверного кода нет — см. `wrangler.jsonc`.
Базовый путь задаёт переменная `EXPO_WEB_BASE_URL`: пустая для корня домена
на Workers, `/cooking-helper` для подпапки на GitHub Pages.

Прежняя веб-версия на Vite пока публикуется в GitHub Pages автоматически после
изменений в ветке `main` — [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).
