import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    subjectOther: '',  // Added "Other" subject option
    content: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.subject || (!formData.subjectOther && formData.subject === 'other') || !formData.content) {
      setErrorMessage(t('BusinessPage.contact.errorMessage'));
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage(t('BusinessPage.contact.successMessage'));
      
      // Reset form data after successful submission
      setFormData({
        email: '',
        subject: '',
        subjectOther: '',
        content: '',
      });

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      // Add form submission logic here (e.g., send to an API or email)
    }
  };

  return (
    <section className="text-center py-12 bg-[#1ea0ff] text-white">
      <h2 className="text-3xl font-semibold mb-4 text-black">{t('BusinessPage.contact.title')}</h2>
      <p className="text-lg mb-8 text-black">{t('BusinessPage.contact.description')}</p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-black">{t('BusinessPage.contact.email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-black">{t('BusinessPage.contact.subject')}</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
            required
          >
            <option value="">{t('BusinessPage.contact.selectSubject')}</option>
            <option value="work">{t('BusinessPage.contact.workInquiry')}</option>
            <option value="support">{t('BusinessPage.contact.supportRequest')}</option>
            <option value="general">{t('BusinessPage.contact.generalInquiry')}</option>
            <option value="other">{t('BusinessPage.contact.otherInquiry')}</option>
          </select>
        </div>

        {formData.subject === 'other' && (
          <div className="mb-4">
            <label htmlFor="subjectOther" className="block text-sm font-medium text-black">{t('BusinessPage.contact.specifySubject')}</label>
            <input
              type="text"
              id="subjectOther"
              name="subjectOther"
              value={formData.subjectOther}
              onChange={handleChange}
              className="w-full px-3 text-black py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-black">{t('BusinessPage.contact.content')}</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {t('BusinessPage.contact.submit')}
        </button>
      </form>
    </section>
  );
}

export default Contact;
