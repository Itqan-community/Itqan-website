import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ForwardArrow from "./ForwardArrow";
import NewsletterSubscribe from "./NewsletterSubscribe";
import { LuArrowRight } from "react-icons/lu";
import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";
import { IoMdMailOpen } from "react-icons/io";
import { RiUserCommunityFill } from "react-icons/ri";

export default async function Footer({ locale, }: { locale: string }) {
  const t = await getTranslations("footer");

  return (
    <footer className="relative bg-primary-950 py-12 sm:py-16 lg:py-20 overflow-hidden mt-auto">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative text-neutral-100">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0 mb-12 lg:mb-0">
          {/* CTA */}
          <Link
            href="https://community.itqan.dev"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-neutral-100 font-fustat text-center">
              {t("cta")}
            </h2>

            <ForwardArrow silent size={36} locale={locale} icon={LuArrowRight} />
          </Link>
          <div className="flex gap-8 justify-center">
            <Link href="mailto:connect@itqan.dev" className="text-white hover:-translate-y-[10%] transition-transform">
              <IoMdMailOpen size={34} />
            </Link>
            <Link href="https://discord.gg/24CskUbuuB" target="_blank" rel="noopener" className="text-white hover:-translate-y-[10%] transition-transform">
              <BsDiscord size={34} />
            </Link>
            <Link href="https://community.itqan.dev" target="_blank" rel="noopener" className="text-white hover:-translate-y-[10%] transition-transform">
              <RiUserCommunityFill size={34} />
            </Link>
            <Link href="https://x.com/itqan_community" target="_blank" rel="noopener" className="text-white hover:-translate-y-[10%] transition-transform">
              <BsTwitterX size={30} />
            </Link>
            <Link href="https://github.com/Itqan-community" target="_blank" rel="noopener" className="text-white hover:-translate-y-[10%] transition-transform">
              <BsGithub size={30} />
            </Link>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="flex justify-center lg:justify-start py-16">
          <NewsletterSubscribe locale={locale} />
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 mt-12">
          <div className="text-center sm:text-start flex flex-col gap-2">
            <p className="text-secondary-400 text-sm sm:text-base mb-4 sm:mb-0" style={{letterSpacing: '-0.5px'}}>
              {t("copyright")}
            </p>
            <Image
              src="/images/home/footer-ayah.avif"
              alt=""
              className="object-cover grayscale invert mx-auto sm:mx-0 opacity-50"
              width={323}
              height={64}
              loading="lazy"
              sizes="(max-width: 640px) 200px, 200px"
            />
          </div>

          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Itqan"
              width={60}
              height={60}
              className="brightness-0 contrast-200 grayscale invert saturate-200 sm:w-20 sm:h-20"
              loading="lazy"
              sizes="(max-width: 640px) 60px, 80px"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
