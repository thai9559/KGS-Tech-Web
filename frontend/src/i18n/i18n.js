import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './locales/vi.json';  // Tải file ngôn ngữ Tiếng Việt
import ja from './locales/ja.json';  // Tải file ngôn ngữ Tiếng Nhật
import en from './locales/en.json';

i18n
  .use(initReactI18next) // Cấu hình react-i18next
  .init({
    resources: {
      vi: { translation: vi },
      ja: { translation: ja },
      en: { translation: en },
    },
    lng: 'en',  // Ngôn ngữ mặc định
    fallbackLng: 'vi',  // Ngôn ngữ dự phòng
    interpolation: {
      escapeValue: false,  // React đã bảo vệ khỏi injection
    },
  });

export default i18n;
