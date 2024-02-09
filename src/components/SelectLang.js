import React, { useEffect, useState } from 'react';
import i18next from './i18next'; 


/**
 * @description  "Below is the LanguageSelector Function Component "
 * @summary 1. It provides us a dropdown for selecting the particular language 
 *          2.Uses i18next different functions for selecting and changing the language
 *         
 */ 
const LanguageSelector = () => {
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

    useEffect(() => {
        const onLanguageChange = () => {
          setCurrentLanguage(i18next.language);
        };
        i18next.on('languageChanged', onLanguageChange);

        return () => {
          i18next.off('languageChanged', onLanguageChange);
        };
      }, []);
  const changeLanguage = (language) => {
    i18next.changeLanguage(language);
  };

  return (
    <div>
      <label htmlFor="language-select">Select Language:</label>
      <select
        id="language-select"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18next.language}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
