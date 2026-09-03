// Базовый путь зависит от площадки: на Cloudflare Workers приложение живёт
// в корне домена, на GitHub Pages — в подпапке /cooking-helper. Остальная
// конфигурация читается из app.json.
export default ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    baseUrl: process.env.EXPO_WEB_BASE_URL ?? '',
  },
});
