import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ForwardArrow from "./ForwardArrow";

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
        {/* CTA */}
        <Link
          href="https://discord.gg/24CskUbuuB"
          target="_blank"
          rel="noopener"
          className="flex items-center justify-center me-auto max-w-max gap-3 sm:gap-4 mb-12 sm:mb-16 lg:mb-20 hover:opacity-90 transition-opacity mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-100 font-doran text-center">
            {t("cta")}
          </h2>

          <ForwardArrow silent size={24} locale={locale} />
        </Link>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
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
