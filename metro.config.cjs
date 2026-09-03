// Расширение .cjs, потому что в package.json указан "type": "module".
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
