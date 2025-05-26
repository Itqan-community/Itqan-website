(function () {
  try {
    const savedLang = localStorage.getItem('lang');
    const supportedLangs = ['en', 'ar'];
    const pathLangMatch = window.location.pathname.match(/^\/(en|ar)(\/|$)/);
    const currentLang = pathLangMatch ? pathLangMatch[1] : null;
    const currentPathWithoutLang = window.location.pathname.replace(pathLangMatch[0], '');

    if (!currentLang && savedLang && supportedLangs.includes(savedLang)) {
      window.location.replace(`/${savedLang}${currentPathWithoutLang}`);
    }

    if (currentLang && savedLang !== currentLang) {
      localStorage.setItem('lang', currentLang);
    }
  } catch (e) {
  }
})();
