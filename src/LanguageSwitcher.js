// src/LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

//   return (
//     <div>
//       <button onClick={() => handleLanguageChange('en')}>English</button>
//       <button onClick={() => handleLanguageChange('hn')}>Hindi</button>
//     </div>
//   );
};

export default LanguageSwitcher;
