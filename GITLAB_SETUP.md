# 🦊 Настройка GitLab для Cooking Helper

## 1. Создание репозитория на GitLab

### Шаг 1: Войти в GitLab
1. Откройте [gitlab.com](https://gitlab.com)
2. Войдите в свой аккаунт или зарегистрируйтесь

### Шаг 2: Создать новый проект
1. Нажмите кнопку **"New project"** или **"+"** в верхнем меню
2. Выберите **"Create blank project"**
3. Заполните данные:
   - **Project name**: `cooking-helper`
   - **Project slug**: `cooking-helper` (автоматически)
   - **Project description**: `Веб-приложение для выбора блюд по ингредиентам`
   - **Visibility Level**: `Private` (рекомендуется) или `Public`
4. Нажмите **"Create project"**

## 2. Подключение локального репозитория

### Шаг 1: Добавить remote origin
```bash
cd /Users/tat/cooking-helper
git remote add origin https://gitlab.com/YOUR_USERNAME/cooking-helper.git
```

Замените `YOUR_USERNAME` на ваше имя пользователя в GitLab.

### Шаг 2: Отправить код на GitLab
```bash
git push -u origin main
```

## 3. Настройка CI/CD (опционально)

### Шаг 1: Создать файл .gitlab-ci.yml
```yaml
# .gitlab-ci.yml
image: node:16

stages:
  - build
  - deploy

cache:
  paths:
    - node_modules/

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - build/
    expire_in: 1 hour

deploy:
  stage: deploy
  script:
    - echo "Deploy to production"
  only:
    - main
```

### Шаг 2: Настроить переменные окружения
1. Перейдите в **Settings** → **CI/CD** → **Variables**
2. Добавьте необходимые переменные (если нужны)

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
1. Создайте **Merge Request** в GitLab
2. Выберите ветку `feature/task-name` → `main`
3. Добавьте описание изменений
4. Назначьте ревьюера (если есть)
5. После одобрения слейте изменения

## 6. Полезные команды

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

## 7. Настройка IDE

### VS Code
1. Установите расширение **GitLab Workflow**
2. Настройте GitLab токен в настройках
3. Используйте встроенный Git интерфейс

### WebStorm/IntelliJ
1. Настройте Git в **File** → **Settings** → **Version Control** → **Git**
2. Используйте встроенный Git интерфейс

## 8. Troubleshooting

### Проблема: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://gitlab.com/YOUR_USERNAME/cooking-helper.git
```

### Проблема: "Authentication failed"
```bash
# Настройте SSH ключи или используйте Personal Access Token
git config --global credential.helper store
```

### Проблема: "Merge conflicts"
```bash
# Разрешите конфликты в файлах
git add .
git commit -m "Resolve merge conflicts"
```

## 9. Рекомендации

- **Делайте частые коммиты** с понятными сообщениями
- **Используйте ветки** для новых функций
- **Проверяйте код** перед слиянием
- **Ведите документацию** изменений
- **Используйте теги** для релизов

## 10. Полезные ссылки

- [GitLab Documentation](https://docs.gitlab.com/)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)
- [GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/)
