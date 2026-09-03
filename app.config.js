// Production на Cloudflare Workers живёт в корне домена. Переменная оставлена
// для локальных или preview-сборок с нестандартным базовым путём.
export default ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    baseUrl: process.env.EXPO_WEB_BASE_URL ?? '',
  },
});
