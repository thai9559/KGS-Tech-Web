import '../i18n/i18n'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import BannerSlider from '../components/BannerSlider';
import { useTranslation } from 'react-i18next'; 
import Benefits from '../components/Benefits';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
      <Header home={t('home')} company={t('company')} business={t('business')} blog={t('blog')} />
      <main className="flex-grow "> 
        <BannerSlider />
        <Benefits/>
      </main>
      <Footer />
    </div>
  );
}
