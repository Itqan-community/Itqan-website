"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LangSwitch from "./LangSwitch";
import LinkBtn from "./LinkBtn";
import { useTranslations } from "next-intl";

interface NavbarLink {
  href: string;
  text: string;
}

interface MobileMenuProps {
  locale: string;
  NavbarLinks: NavbarLink[];
}

export default function MobileMenu({ locale, NavbarLinks }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("nav");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <LangSwitch locale={locale} />
        <button
          onClick={toggleMenu}
          className="p-2 text-emerald-900 hover:text-emerald-700 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-xl font-bold text-emerald-900">
              {t("logo")}
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col py-6">
            {NavbarLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="px-6 py-4 text-lg font-medium text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 border-b border-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.text)}
              </Link>
            ))}
            
            {/* Discord Button */}
            <div className="px-6 py-6 border-b border-neutral-100">
              <LinkBtn 
                title={t("discord")} 
                href={`https://discord.gg/24CskUbuuB`} 
                target="_blank" 
                variant="outline" 
                locale={locale}
              />
            </div>

            {/* Language Switch */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-600">
                  {locale === 'ar' ? 'اللغة' : 'Language'}
                </span>
                <LangSwitch locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 