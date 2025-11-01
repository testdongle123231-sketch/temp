import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Language } from '../i18n/translations';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const getNestedTranslation = (obj: any, path: string): string => {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result && typeof result === 'object') {
      result = result[key];
    } else {
      return path;
    }
  }
  return typeof result === 'string' ? result : path;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      t: (key: string) => {
        const { language } = get();
        return getNestedTranslation(translations[language], key);
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
