import React from "react";
import { FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa";  // Thêm các icon phù hợp
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa"; // Social media icon
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#2e3033] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Company Information */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('footer.company')}</h3>
            <ul>
              <li><a href="#" className="text-lg hover:underline">{t('footer.about_us')}</a></li>
              <li><a href="#" className="text-lg hover:underline">{t('footer.careers')}</a></li>
              <li><a href="#" className="text-lg hover:underline">{t('footer.privacy_policy')}</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('footer.contact_info')}</h3>
            <ul className="text-left space-y-3">
              <li className="flex sm:w-[450px] w-[300]  justify-center sm:justify-start">
                <FaHome className=" mr-2 text-lg w-7 h-7" />
                <span className="text-center sm:text-left">{t('footer.address')}</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <FaPhoneAlt className="mr-2 text-lg w-6 h-6" />
                <span className="text-center sm:text-left">{t('footer.phone')}</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <FaEnvelope className="mr-2 text-lg w-6 h-6" />
                <span className="text-center sm:text-left">{t('footer.email')}</span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('footer.follow_us')}</h3>
            <div className="flex justify-center md:justify-start space-x-4 items-center">
              <a href="#" className="flex items-center text-lg hover:underline">
                <FaFacebookF className="text-blue-600 mr-2 w-6 h-6" /> Facebook
              </a>
              <a href="#" className="flex items-center text-lg hover:underline">
                <FaTwitter className="text-blue-400 mr-2 w-6 h-6" /> Twitter
              </a>
              <a href="#" className="flex items-center text-lg hover:underline">
                <FaInstagram className="text-pink-500 mr-2 w-6 h-6" /> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-white pt-6 text-center">
          <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
