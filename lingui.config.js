module.exports = {
  catalogs: [
    {
      path: '<rootDir>/locales/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  locales: ['en', 'fa-IR', 'ar'],
  sourceLocale: 'en',
  format: 'po',
  fallbackLocales: {
    default: 'en',
  },
  compileNamespace: 'es',
};
