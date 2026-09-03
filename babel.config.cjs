// Расширение .cjs, потому что в package.json указан "type": "module".
module.exports = (api) => {
  api.cache(true);
  return { presets: ['babel-preset-expo'] };
};
