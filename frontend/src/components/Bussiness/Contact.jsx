import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateFeedbackMutation } from "../../redux/api/feedbackApi";
import { message } from "antd"; // Import message từ Ant Design

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    subjectOther: "",
    content: "",
  });

  const [createFeedback, { isLoading }] = useCreateFeedbackMutation(); // Gọi API

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (
      !formData.email ||
      !formData.content ||
      (!formData.subjectOther && formData.subject === "other") ||
      (!formData.subject && formData.subject !== "other")
    ) {
      message.error(t("BusinessPage.contact.errorMessage")); // Thông báo lỗi
      return;
    }

    try {
      // Chuẩn bị dữ liệu gửi API
      const feedbackData = {
        email: formData.email,
        subject:
          formData.subject === "other"
            ? formData.subjectOther
            : formData.subject,
        content: formData.content,
      };

      // Gửi API
      await createFeedback(feedbackData).unwrap();

      // Thông báo thành công
      message.success(t("BusinessPage.contact.successMessage"));

      // Reset form
      setFormData({
        email: "",
        subject: "",
        subjectOther: "",
        content: "",
      });
    } catch (error) {
      // Thông báo lỗi từ API
      message.error(
        error?.data?.message || t("BusinessPage.contact.errorOccurred")
      );
    }
  };

  return (
    <section className="text-center py-12 bg-[#1ea0ff] text-white">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
        {t("BusinessPage.contact.title")}
      </h2>
      <p className="text-xl mb-10 text-white p-4">
        {t("BusinessPage.contact.description")}
      </p>

      <div className="flex flex-col lg:flex-row flex-wrap gap-12 justify-center items-center lg:items-start">
        {/* Left section: Reasons to contact */}
        <div className="w-full sm:w-10/12 lg:w-5/12 p-4 sm:p-6 lg:p-8 mb-8 lg:mb-0 bg-[#1ea0ff]">
          <h3 className="text-xl font-notoSansJP md:text-3xl lg:text-3xl font-semibold text-white mb-6">
            {t("BusinessPage.contact.reasonsTitle")}
          </h3>
          <ul className="pl-5 text-left text-white space-y-3 text-base md:text-xl lg:text-xl">
            {[
              "reasonAppDevelopment",
              "reasonMobileApp",
              "reasonWebsiteDevelopment",
              "reasonSoftwareIntegration",
              "reasonEcommerce",
              "reasonConsulting",
              "reasonMaintenance",
              "reasonDigitalMarketing",
            ].map((reason, idx) => (
              <li key={idx} className="flex font-medium items-start">
                <span className="text-white mr-3">✔</span>
                {t(`BusinessPage.contact.${reason}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Right section: Contact form */}
        <div className="w-full sm:w-10/12 lg:w-5/12 bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-left text-base font-medium text-black"
              >
                {t("BusinessPage.contact.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-black text-base px-4 py-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-left text-base font-medium text-black"
              >
                {t("BusinessPage.contact.subject")}
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3  text-black border border-gray-300 rounded-md"
                required
              >
                <option value="">
                  {t("BusinessPage.contact.selectSubject")}
                </option>
                <option value="work">
                  {t("BusinessPage.contact.workInquiry")}
                </option>
                <option value="support">
                  {t("BusinessPage.contact.supportRequest")}
                </option>
                <option value="general">
                  {t("BusinessPage.contact.generalInquiry")}
                </option>
                <option value="other">
                  {t("BusinessPage.contact.otherInquiry")}
                </option>
              </select>
            </div>

            {formData.subject === "other" && (
              <div className="mb-4">
                <label
                  htmlFor="subjectOther"
                  className="block text-left text-base font-medium text-black"
                >
                  {t("BusinessPage.contact.specifySubject")}
                </label>
                <input
                  type="text"
                  id="subjectOther"
                  name="subjectOther"
                  value={formData.subjectOther}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-md"
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-left text-base font-medium text-black"
              >
                {t("BusinessPage.contact.content")}
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1ea0ff] text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 text-lg"
              disabled={isLoading}
            >
              {isLoading
                ? t("BusinessPage.contact.submitting")
                : t("BusinessPage.contact.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
