import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ForwardArrow from "./ForwardArrow";
import { FaDiscord, FaEnvelope } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default async function Footer({ locale, }: { locale: string }) {
  const t = await getTranslations("footer");

  return (
    <footer className="relative bg-[#193B2D] py-12 sm:py-16 lg:py-20 overflow-hidden mt-auto">
      {/* Background image with blur effect */}
      <div 
        className="absolute inset-0 opacity-[0.16] scale-[1.48] skew-x-[10.7deg]"
        style={{
          maskImage: 'radial-gradient(50% 100% at 50% 0%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(50% 100% at 50% 0%, black 0%, transparent 100%)',
          filter: 'blur(3px)',
        }}
      >
        <Image
          src="/home-footer-bg.png"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: '36.7% 79%' }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative text-neutral-100">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-0 mb-12 lg:mb-0">
          {/* CTA */}
          <Link
            href="https://discord.gg/24CskUbuuB"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-neutral-100 font-doran text-center">
              {t("cta")}
            </h2>

            <ForwardArrow silent size={24} locale={locale} />
          </Link>
          <div className="flex flex-col gap-2">
            <p className="text-[#cbcfce] text-sm sm:text-base font-bold text-center lg:text-start" style={{letterSpacing: '-0.5px'}}>
              {t("contact")}:
            </p>
            <div className="sm:flex sm:flex-col gap-1 items-start">
              <div className="flex gap-8 md:hidden justify-center">
                <Link href="mailto:connect@itqan.dev" className="text-[#868E8B] hover:opacity-80 transition-opacity">
                  <FaEnvelope size={20} />
                </Link>
                <Link href="https://github.com/Itqan-community" target="_blank" rel="noopener" className="text-[#868E8B] hover:opacity-80 transition-opacity">
                  <FaGithub size={20} />
                </Link>
                <Link href="https://discord.gg/24CskUbuuB" target="_blank" rel="noopener" className="text-[#868E8B] hover:opacity-80 transition-opacity">
                  <FaDiscord size={20} />
                </Link>
                <Link href="https://x.com/itqan_community" target="_blank" rel="noopener" className="text-[#868E8B] hover:opacity-80 transition-opacity">
                  <FaXTwitter size={20} />
                </Link>
              </div>
              <Link href="mailto:connect@itqan.dev" className="hidden md:flex text-[#868E8B] hover:opacity-80 transition-opacity items-center gap-2">
                <FaEnvelope size={20} />
                <span className="text-sm sm:text-base" style={{letterSpacing: '-0.5px'}}>connect@itqan.dev</span>
              </Link>
              <Link href="https://github.com/Itqan-community" target="_blank" rel="noopener" className="hidden md:flex text-[#868E8B] hover:opacity-80 transition-opacity items-center gap-2">
                <FaGithub size={20} />
                <span className="text-sm sm:text-base" style={{letterSpacing: '-0.5px'}}>Itqan-community</span>
              </Link>
              <Link href="https://discord.gg/24CskUbuuB" target="_blank" rel="noopener" className="hidden md:flex text-[#868E8B] hover:opacity-80 transition-opacity items-center gap-2">
                <FaDiscord size={20} />
                <span className="text-sm sm:text-base" style={{letterSpacing: '-0.5px'}}>Discord</span>
              </Link>
              <Link href="https://x.com/itqan_community" target="_blank" rel="noopener" className="hidden md:flex text-[#868E8B] hover:opacity-80 transition-opacity items-center gap-2">
                <FaXTwitter size={20} />
                <span className="text-sm sm:text-base" style={{letterSpacing: '-0.5px'}}>@itqan_community</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 mt-12">
          <div className="text-center sm:text-left">
            <p className="text-[#868E8B] text-sm sm:text-base mb-4 sm:mb-0" style={{letterSpacing: '-0.5px'}}>
              {t("copyright")}
            </p>
            <Image
              src="/home-footer-ayah.svg"
              alt=""
              className="object-cover grayscale invert mx-auto sm:mx-0"
              width={200}
              height={40}
            />
          </div>

          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Itqan"
              width={60}
              height={60}
              className="brightness-0 contrast-200 grayscale invert saturate-200 sm:w-20 sm:h-20"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
