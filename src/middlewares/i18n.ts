import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['cn', 'de', 'en', 'es', 'fr', 'it', 'pt', 'ru'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
  objectNotation: true,
  autoReload: true,
  syncFiles: true
});

export default i18n;
