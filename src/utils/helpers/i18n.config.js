import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import 'intl-pluralrules';

import enUS from '../../assets/language/english.json';
import frCA from '../../assets/language/french.json';

const resources = {
  enUS: {translation: enUS},
  frCA: {translation: frCA},
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'enUS',
  fallbackLng: 'frCA',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
