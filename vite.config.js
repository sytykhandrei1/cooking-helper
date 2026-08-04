import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cooking-helper/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
  },
});
