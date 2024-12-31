import './App.css'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './i18n/locales/vi.json';  
import ja from './i18n/locales/ja.json';  
import './i18n/i18n';   
import Header from './components/Header';
import { useTranslation } from 'react-i18next'; 

export default function App() {
  const { t } = useTranslation();
  return (
    <div>
      <Header home={t('home')} company={t('company')} business={t('business')} blog={t('blog')} />
      <h1 className='font-beVietnam'>{t('welcome')}</h1> {/* Dịch văn bản từ file ngôn ngữ */}
    </div>
  )
}
