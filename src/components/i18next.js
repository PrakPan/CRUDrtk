import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

/**
 * @description  "A multi-lingual setup using react-i18next"
 * @summary 1. A language Detector is used that dynamically detect the language from browser
 *          2.init is used to initialise the i18n with different language and its translation
 *         
 *          
.
 */

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          id: 'ID',
          name: 'Name',
          email: 'Email',
          edit: 'Edit',
          delete: 'Delete',
        },
      },
      fr: {
        translation: {
          id: 'Identifiant',
          name: 'Nom',
          email: 'E-mail',
          edit: 'Éditer',
          delete: 'Supprimer',
        },
      },
      es: {
        translation: {
          id: 'ID',
          name: 'Nombre',
          email: 'Correo electrónico',
          edit: 'Editar',
          delete: 'Eliminar',
        },
      },
      hi: {
        translation: {
          id: 'आईडी',
          name: 'नाम',
          email: 'ईमेल',
          edit: 'संपादित करें',
          delete: 'हटाएं',
        },
      },
    },
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
