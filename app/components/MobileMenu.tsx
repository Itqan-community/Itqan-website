"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LangSwitch from "./LangSwitch";
import LinkBtn from "./LinkBtn";

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="bg-white border-t border-neutral-200 shadow-lg">
          <div className="flex flex-col py-4">
            {NavbarLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="px-6 py-3 text-emerald-900 hover:text-emerald-700 hover:bg-neutral-50 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text === "home" ? "Home" : link.text.charAt(0).toUpperCase() + link.text.slice(1)}
              </Link>
            ))}
            <div className="px-6 py-3">
              <LinkBtn 
                title="Discord" 
                href={`https://discord.gg/24CskUbuuB`} 
                target="_blank" 
                variant="outline" 
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 