import { defineConfig } from 'vitest/config';

// Тесты покрывают чистые модули: базу блюд, подбор, визуалы и токены темы.
// JSX в них нет, поэтому плагин React не нужен.
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
