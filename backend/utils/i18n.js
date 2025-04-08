const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    ns: ['errors', 'fields'],
    defaultNS: 'errors',
    backend: {
      loadPath: `${__dirname}/../locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ['header', 'query'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    preload: ['en', 'ar'],
    cleanCode: true,
  });

module.exports = i18next;