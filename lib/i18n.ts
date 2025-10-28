import i18next from 'i18next';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

let initialized = false;

export async function initI18n(locale = 'en') {
  if (initialized) return;
  await i18next.init({
    lng: locale,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
  });
  initialized = true;
}

export function t(key: string) {
  return i18next.t(key);
}
