import React, { useEffect } from "react";

const Googletranslation = () => {
  useEffect(() => {
    // Add Google Translate script
    const addScript = document.createElement("script");
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    // Define the global callback function required by Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",  // Your site's default language
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Cleanup on unmount
    return () => {
      delete window.googleTranslateElementInit;
      const widget = document.getElementById("google_translate_element");
      if (widget) widget.innerHTML = "";
    };
  }, []);

  return (
    <div id="google_translate_element" style={{ position: "absolute", top: 58, right: 23, }}></div>
  );
};

export default Googletranslation;
