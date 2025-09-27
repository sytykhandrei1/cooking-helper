# 🛠️ Руководство по разработке Cooking Helper

## 📋 Требования

- Node.js 16+ 
- npm 7+
- Git
- Современный браузер

## 🚀 Настройка окружения

### 1. Клонирование проекта
```bash
git clone https://gitlab.com/your-username/cooking-helper.git
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

Приложение будет доступно по адресу: http://localhost:3000

## 📁 Структура проекта

```
cooking-helper/
├── public/                 # Статические файлы
│   ├── index.html
│   └── manifest.json
├── src/                   # Исходный код
│   ├── components/        # React компоненты
│   │   ├── DishResults.js
│   │   ├── Header.js
│   │   ├── IngredientSearch.js
│   │   ├── MainMenu.js
│   │   ├── RandomDish.js
│   │   ├── Settings.js
│   │   └── ShareButton.js
│   ├── data/             # Данные приложения
│   │   └── dishes.js
│   ├── App.js            # Главный компонент
│   ├── App.css           # Стили приложения
│   ├── index.js          # Точка входа
│   └── index.css         # Базовые стили
├── .gitignore            # Git ignore файл
├── .gitlab-ci.yml        # CI/CD конфигурация
├── package.json          # Зависимости и скрипты
└── README.md             # Документация
```

## 🔧 Доступные скрипты

### `npm start`
Запускает приложение в режиме разработки с hot reload.

### `npm run build`
Создает production сборку в папке `build/`.

### `npm test`
Запускает тесты (пока не настроены).

### `npm run eject`
Извлекает конфигурацию Create React App (не рекомендуется).

## 🎨 Стилизация

### CSS подход
- Используются обычные CSS файлы
- Стили компонентов в отдельных файлах
- Глобальные стили в `index.css`
- Стили приложения в `App.css`

### Цветовая схема
- Основной фон: `#1a1a1a`
- Карточки: `#333333`
- Акцентный цвет: `#22c55e`
- Текст: `#ffffff`

### Адаптивность
- Mobile-first подход
- Breakpoints: 768px, 1024px
- Гибкая сетка с CSS Grid

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
