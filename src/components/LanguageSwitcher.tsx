import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { createPortal } from 'react-dom';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  if (!mounted) return null;

  return createPortal(
    <button
      onClick={toggleLanguage}
      className="fixed top-8 right-16 z-[1999] bg-background text-foreground h-[34px] px-3 border border-foreground flex items-center justify-center text-[11px] font-medium uppercase leading-none group relative overflow-hidden"
      title={i18n.language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        <Globe className="w-4 h-4" />
        {i18n.language === 'en' ? 'EN' : 'BN'}
      </span>
      <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
    </button>,
    document.body
  );
};
