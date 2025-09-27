# 🐙 Настройка GitHub для Cooking Helper

## 1. Создание репозитория на GitHub

### Шаг 1: Войти в GitHub
1. Откройте [github.com](https://github.com)
2. Войдите в свой аккаунт или зарегистрируйтесь

### Шаг 2: Создать новый репозиторий
1. Нажмите кнопку **"New"** или **"+"** в верхнем меню
2. Выберите **"New repository"**
3. Заполните данные:
   - **Repository name**: `cooking-helper`
   - **Description**: `Веб-приложение для выбора блюд по ингредиентам`
   - **Visibility**: `Public` (рекомендуется) или `Private`
   - **Initialize**: НЕ ставьте галочки (у нас уже есть код)
4. Нажмите **"Create repository"**

## 2. Подключение локального репозитория

### Шаг 1: Добавить remote origin
```bash
cd /Users/tat/cooking-helper
git remote add origin https://github.com/YOUR_USERNAME/cooking-helper.git
```

Замените `YOUR_USERNAME` на ваше имя пользователя в GitHub.

### Шаг 2: Отправить код на GitHub
```bash
git push -u origin main
```

## 3. Настройка GitHub Pages

### Шаг 1: Включить GitHub Pages
1. Перейдите в **Settings** → **Pages**
2. В разделе **Source** выберите **"GitHub Actions"**
3. GitHub Actions автоматически настроит деплой

### Шаг 2: Проверить деплой
1. Перейдите в **Actions** вкладку
2. Дождитесь завершения workflow "Deploy to GitHub Pages"
3. Ваше приложение будет доступно по адресу:
   `https://YOUR_USERNAME.github.io/cooking-helper`

## 4. Настройка веток

### Создание ветки для разработки
```bash
git checkout -b develop
git push -u origin develop
```

### Создание ветки для новой функции
```bash
git checkout -b feature/new-feature
# Внесите изменения
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature
```

## 5. Workflow для разработки

### Ежедневная работа
```bash
# Получить последние изменения
git pull origin main

# Создать ветку для задачи
git checkout -b feature/task-name

# Внести изменения и закоммитить
git add .
git commit -m "Описание изменений"

# Отправить ветку
git push -u origin feature/task-name
```

### Слияние изменений
1. Создайте **Pull Request** в GitHub
2. Выберите ветку `feature/task-name` → `main`
3. Добавьте описание изменений
4. Назначьте ревьюера (если есть)
5. После одобрения слейте изменения

## 6. GitHub Actions

### Автоматические действия
- **При push в main** - автоматический деплой на GitHub Pages
- **При создании PR** - проверка сборки
- **При push в любую ветку** - проверка кода

### Просмотр Actions
1. Перейдите в **Actions** вкладку
2. Выберите workflow для просмотра логов
3. Проверьте статус выполнения

## 7. Полезные команды

### Просмотр истории
```bash
git log --oneline
git log --graph --oneline --all
```

### Отмена изменений
```bash
# Отменить последний коммит (сохранить изменения)
git reset --soft HEAD~1

# Отменить все изменения в файле
git checkout -- filename

# Отменить все неотслеживаемые файлы
git clean -fd
```

### Синхронизация с удаленным репозиторием
```bash
# Получить все ветки
git fetch --all

# Синхронизировать с main
git checkout main
git pull origin main
```

## 8. Настройка IDE

### VS Code
1. Установите расширение **GitHub Pull Requests and Issues**
2. Настройте GitHub токен в настройках
3. Используйте встроенный Git интерфейс

### WebStorm/IntelliJ
1. Настройте Git в **File** → **Settings** → **Version Control** → **Git**
2. Используйте встроенный Git интерфейс

## 9. Troubleshooting

### Проблема: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/cooking-helper.git
```

### Проблема: "Authentication failed"
```bash
# Настройте Personal Access Token
git config --global credential.helper store
```

### Проблема: "Merge conflicts"
```bash
# Разрешите конфликты в файлах
git add .
git commit -m "Resolve merge conflicts"
```

### Проблема: GitHub Pages не работает
1. Проверьте **Settings** → **Pages**
2. Убедитесь, что выбран **"GitHub Actions"**
3. Проверьте **Actions** вкладку на ошибки

## 10. Рекомендации

- **Делайте частые коммиты** с понятными сообщениями
- **Используйте ветки** для новых функций
- **Проверяйте код** перед слиянием
- **Ведите документацию** изменений
- **Используйте теги** для релизов
- **Настройте Issues** для отслеживания задач

## 11. Полезные ссылки

- [GitHub Documentation](https://docs.github.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Pages](https://docs.github.com/en/pages)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)
