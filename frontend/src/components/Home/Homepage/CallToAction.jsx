import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CallToAction() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleContactClick = () => {
    // Chuyển hướng đến trang "business#contact"
    navigate("/business#contact");
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-16 px-6 text-center text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t("CallToAction.title")}</h1>
        <p className="text-lg mb-8">{t("CallToAction.description")}</p>
        <Button
          type="primary"
          size="large"
          className="bg-white text-blue-600 font-semibold hover:bg-gray-100 px-8 py-3 rounded-lg shadow-md transition"
          onClick={handleContactClick}
        >
          {t("CallToAction.button")}
        </Button>
      </div>
    </section>
  );
}

export default CallToAction;
