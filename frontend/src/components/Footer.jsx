import React from "react";
import { FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; 
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa"; 
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#2e3033] text-white py-10 overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.company")}</h3>
            <ul>
              <li>
                <a href="#" className="text-sm hover:underline">
                  {t("footer.about_us")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  {t("footer.careers")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  {t("footer.privacy_policy")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("footer.contact_info")}
            </h3>
            <ul className="text-left space-y-3">
              <li className="flex sm:w-[450px] w-[300] justify-center sm:justify-start">
                <FaHome className="mr-2 text-sm w-7 h-7" />
                <span className="text-center text-sm sm:text-left break-words">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <FaPhoneAlt className="mr-2 text-sm w-6 h-6" />
                <a
                  href="tel:0123456789"
                  className="text-center text-sm sm:text-left text-white hover:underline break-words"
                >
                  0123456789
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <FaEnvelope className="mr-2 text-sm w-6 h-6" />
                <a
                  href="mailto:example@example.com"
                  className="text-center text-sm sm:text-left text-white hover:underline break-words"
                >
                  {t("footer.email")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.follow_us")}</h3>
            <div className="flex flex-wrap justify-center md:justify-start space-x-4 items-center">
              <a href="#" className="flex items-center text-sm hover:underline">
                <FaFacebookF className="text-blue-600 mr-2 w-6 h-6" /> Facebook
              </a>
              <a href="#" className="flex items-center text-sm hover:underline">
                <FaTwitter className="text-blue-400 mr-2 w-6 h-6" /> Twitter
              </a>
              <a href="#" className="flex items-center text-sm hover:underline">
                <FaInstagram className="text-pink-500 mr-2 w-6 h-6" /> Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white pt-6 text-center">
          <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
