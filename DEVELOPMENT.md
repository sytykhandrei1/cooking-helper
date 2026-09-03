# 🛠️ Руководство по разработке Cooking Helper

## 📋 Требования

- Node.js 20+
- npm 10+
- Git
- Expo Go на телефоне — чтобы открыть приложение на iOS или Android
- Xcode или Android Studio — только для нативных сборок

## 🚀 Настройка окружения

### 1. Клонирование проекта
```bash
git clone https://github.com/sytykhandrei1/cooking-helper.git
cd cooking-helper
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск в режиме разработки
```bash
npm start
```

Expo покажет QR-код: отсканируйте его в Expo Go, чтобы открыть приложение на
телефоне. Тот же интерфейс в браузере — `npm run web`.

Прежняя веб-версия на Vite пока жива и поднимается через `npm run legacy:start`.

## 📁 Структура проекта

```
cooking-helper/
├── index.js               # Точка входа Expo
├── app.json               # Конфигурация Expo
├── app.config.js          # Базовый путь веб-сборки из EXPO_WEB_BASE_URL
├── wrangler.jsonc         # Раздача статики на Cloudflare Workers
├── babel.config.cjs       # Пресет babel-preset-expo
├── metro.config.cjs       # Конфигурация Metro
├── src/
│   ├── native/            # React Native интерфейс
│   │   ├── App.jsx        # Корень нативного приложения
│   │   ├── theme.js       # Дизайн-токены вместо CSS-переменных
│   │   ├── icons.jsx      # Иконки на react-native-svg
│   │   ├── tabs.js        # Описание нижних табов
│   │   ├── components/    # LinearTabBar, BottomSheet, AllergenSheet и другие
│   │   └── screens/       # HomeScreen
│   ├── data/              # База блюд — общая для веба и нативного кода
│   ├── utils/             # Логика подбора — общая для веба и нативного кода
│   ├── components/        # Прежний веб-интерфейс, удаляется после миграции
│   ├── App.jsx            # Прежний веб-корень
│   ├── MobileApp.jsx      # Прежний мобильный веб-интерфейс
│   ├── DesktopApp.jsx     # Прежний десктопный интерфейс
│   └── *.css              # Стили прежнего веб-интерфейса
├── scripts/               # Проверка базы блюд
├── index.html             # Точка входа прежней веб-сборки
├── vite.config.js         # Конфигурация прежней веб-сборки
└── package.json
```

## 🔧 Доступные скрипты

### `npm start`
Запускает Expo с hot reload: QR-код для Expo Go, клавиши для симуляторов.

### `npm run ios` / `npm run android` / `npm run web`
Открывает приложение сразу на нужной платформе.

### `npm run export:web`
Собирает веб-версию нативного интерфейса в `dist-native/`.

### `npm run deploy`
Собирает веб-версию и публикует её на Cloudflare Workers. Обычно не нужен:
публикацией занимается workflow на каждый пуш.

### `npm run legacy:start` / `npm run legacy:build`
Прежняя веб-версия на Vite, пока миграция не закончена.

### `npm run build`
Production-сборка в `dist/`. Пока это прежняя веб-версия — именно она уезжает
в GitHub Pages. После миграции скрипт переключится на `expo export`.

### `npm test`
Запускает vitest: тесты логики подбора блюд, визуалов ингредиентов и токенов темы.

### `npm run quality`
Проверяет базу блюд: обязательные поля, дубли, категории, аллергены.

## 🎨 Стилизация

### Подход
- Нативный интерфейс: `StyleSheet.create` рядом с компонентом
- Дизайн-токены — в `src/native/theme.js`, они заменяют CSS-переменные `:root`
- Анимации — `Animated` вместо CSS-переходов
- Безопасные зоны — `react-native-safe-area-context` вместо `env(safe-area-inset-*)`
- `clamp()` и единицы `vw`/`dvh` считаются от `useWindowDimensions()`
- Медиазапросы по высоте — сравнение с `SHORT_SCREEN_HEIGHT`

### Цветовая схема
- Фон: `#000`
- Карточки: `#1c1c1e`
- Круглые контролы: `#2c2c2e`
- Акцент: `#f6f7f8`
- Активное состояние: `#c48a00`
- Второстепенный текст: `#9299a2`

### Адаптивность
- Портретная ориентация
- Отдельная раскладка для экранов высотой до 700 px

## 📊 Данные

### Структура блюда
```javascript
{
  id: "unique-id",
  name: "Название блюда",
  description: "Описание блюда",
  ingredients: ["ингредиент1", "ингредиент2"],
  recipe: "Пошаговый рецепт",
  category: "breakfast|lunch|dinner|side",
  forChildren: true|false,
  allergens: ["аллерген1", "аллерген2"],
  isCompleteDish: true|false,
  sideDishes: ["гарнир1", "гарнир2"]
}
```

### Добавление новых блюд
1. Откройте `src/data/dishes.js`
2. Добавьте объект блюда в массив `dishes`
3. Обновите `allIngredients` если добавили новые ингредиенты

## 🔍 Логика поиска

### Умный поиск
- Показывает блюда с частичными совпадениями (минимум 2 ингредиента)
- Предлагает блюда с недостающими ингредиентами (максимум 2)
- Приоритет полным совпадениям

### Алгоритм
1. Фильтрация по аллергенам и детскому режиму
2. Поиск совпадающих ингредиентов
3. Поиск недостающих ингредиентов
4. Применение правил отображения
5. Добавление метаданных для UI

## 🧪 Тестирование

### Планы на будущее
- Unit тесты для компонентов
- Integration тесты для поиска
- E2E тесты для пользовательских сценариев

### Запуск тестов
```bash
npm test
```

## 🚀 Деплой

### GitLab Pages
1. Настройте CI/CD pipeline
2. Включите GitLab Pages в настройках проекта
3. Приложение будет доступно по адресу: `https://username.gitlab.io/cooking-helper`

### Netlify
1. Подключите репозиторий к Netlify
2. Настройте build команду: `npm run build`
3. Укажите папку публикации: `build`

### Vercel
1. Подключите репозиторий к Vercel
2. Настройки будут определены автоматически

## 🐛 Отладка

### Консоль браузера
- Откройте DevTools (F12)
- Проверьте вкладку Console на ошибки
- Используйте Network для проверки запросов

### React DevTools
- Установите расширение React DevTools
- Изучайте состояние компонентов
- Отслеживайте props и state

### Логирование
```javascript
console.log('Debug info:', data);
console.warn('Warning:', message);
console.error('Error:', error);
```

## 📝 Соглашения

### Именование
- Компоненты: PascalCase (`DishResults`)
- Файлы: PascalCase для компонентов, camelCase для утилит
- CSS классы: kebab-case (`dish-card`)

### Коммиты
- Используйте понятные сообщения
- Начинайте с глагола в повелительном наклонении
- Примеры: `Add new feature`, `Fix search bug`, `Update styles`

### Код
- Используйте функциональные компоненты
- Применяйте хуки для состояния
- Избегайте мутации состояния
- Комментируйте сложную логику

## 🔄 Workflow

### 1. Создание ветки
```bash
git checkout -b feature/new-feature
```

### 2. Разработка
- Вносите изменения
- Тестируйте локально
- Делайте коммиты

### 3. Создание MR
- Отправьте ветку: `git push -u origin feature/new-feature`
- Создайте Merge Request в GitLab
- Добавьте описание изменений

### 4. Слияние
- После ревью слейте изменения
- Удалите ветку
- Обновите main: `git checkout main && git pull`

## 📚 Полезные ресурсы

- [React Documentation](https://reactjs.org/docs/)
- [Create React App](https://create-react-app.dev/)
- [GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Mobile Web Development](https://developers.google.com/web/fundamentals/design-and-ux/responsive/)
