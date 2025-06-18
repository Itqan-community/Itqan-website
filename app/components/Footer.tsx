import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ForwardArrow from "./ForwardArrow";

export default async function Footer({ locale, }: { locale: string }) {
  const t = await getTranslations("footer");

  return (
    <footer className="relative bg-[#193B2D] py-20 overflow-hidden mt-auto">
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
      <div className="container mx-auto px-4 relative text-neutral-100">
        {/* CTA */}
        <Link
          href="https://discord.gg/24CskUbuuB"
          target="_blank"
          rel="noopener"
          className="flex items-center justify-center me-auto max-w-max gap-4 mb-20 hover:opacity-90 transition-opacity"
        >
          <h2 className="text-4xl font-bold text-neutral-100 font-doran text-right">
            {t("cta")}
          </h2>

          <ForwardArrow silent size={26} />
        </Link>

        {/* Footer bottom */}
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-[#868E8B] text-center" style={{letterSpacing: '-0.5px'}}>
              {t("copyright")}
            </p>
            <Image
              src="/home-footer-ayah.svg"
              alt=""
              className="object-cover grayscale invert"
              width={230}
              height={46}
            />
          </div>

          <Link href={`/${locale}`}>
            <Image
              src="/logo.svg"
              alt="Itqan"
              width={80}
              height={80}
              className="brightness-0 contrast-200 grayscale invert saturate-200"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
