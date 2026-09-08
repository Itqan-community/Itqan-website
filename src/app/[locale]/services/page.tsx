import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { getDictionary, hasLocale } from "@/lib/i18n";

/**
 * إتقان — ما الذي نقدمه؟ (Figma 135:134, 1440×2335).
 * Mobile frame: 206:236, 390×1758.
 *
 * Offerings and events are listed in RTL reading order; the Figma child lists
 * run left-to-right, i.e. the reverse of these arrays.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return getDictionary(locale).pages.services.meta;
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { services } = dict.pages;

  return (
    <>
      <Navbar locale={locale} />
      <main className="flex-1">
        <PageHeader
          badge={services.header.badge}
          title={services.header.title}
          subtitle={services.header.subtitle}
        />

        {/* Offerings Section — 136:149 */}
        <section className="w-full bg-white py-[32px] lg:py-[90px]">
          <div className="shell flex flex-col items-center gap-[24px] lg:gap-[44px]">
            <div className="no-scrollbar -mx-[16px] flex w-[calc(100%+32px)] snap-x snap-mandatory gap-[12px] overflow-x-auto px-[16px] md:mx-0 md:grid md:w-full md:grid-cols-2 md:gap-[24px] md:overflow-visible md:px-0 lg:grid-cols-3">
              {services.offerings.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={(i % 3) * 80}
                  className="card flex min-h-[125px] w-[280px] shrink-0 snap-start flex-col items-start gap-[12px] px-[16px] py-[16px] md:min-h-[214px] md:w-auto md:shrink md:gap-[20px] md:px-[28px] md:py-[32px]"
                >
                  <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[24px] bg-[var(--brand-a06)] md:size-[48px]">
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="size-[24px]"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-[8px] text-start">
                    <h2 className="text-[15px] font-semibold leading-[normal] text-[var(--color-topic-title)] md:text-[18px] md:leading-[26px]">
                      {item.title}
                    </h2>
                    <p className="text-[13px] text-[var(--color-txt-dim)] md:text-[14px]">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <a href="https://join.itqan.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {services.contactCta}
              </a>
            </Reveal>
          </div>
        </section>

        {/* Events Section — 137:151 */}
        <section className="w-full bg-[rgba(232,238,235,0.42)] pt-[32px] pb-[40px] lg:pt-[90px] lg:pb-[100px]">
          <div className="shell flex flex-col items-center gap-[24px] lg:gap-[44px]">
            <Reveal className="flex w-full flex-col items-start gap-[12px]">
              <span className="badge">{services.eventsBadge}</span>
              <h2 className="text-start text-[22px] font-bold text-[var(--color-txt)] lg:text-[36px]">
                {services.eventsTitle}
              </h2>
            </Reveal>

            <div className="no-scrollbar -mx-[16px] flex w-[calc(100%+32px)] snap-x snap-mandatory gap-[12px] overflow-x-auto px-[16px] md:mx-0 md:grid md:w-full md:grid-cols-3 md:gap-[24px] md:overflow-visible md:px-0">
              {services.events.map((event, i) => (
                <Reveal
                  key={event.title}
                  delay={i * 80}
                  className="flex w-[280px] shrink-0 snap-start flex-col items-start overflow-hidden rounded-[12px] border border-[var(--brand-a10)] bg-white shadow-[var(--shadow-card)] md:w-auto md:shrink"
                >
                  <div className="relative h-[120px] w-full bg-[var(--color-bg-2)] md:h-[196px]">
                    <Image
                      src={event.photo}
                      alt={event.caption}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-[6px] px-[16px] pt-[14px] pb-[16px] text-start md:gap-[8px] md:px-[24px] md:pt-[20px] md:pb-[26px]">
                    <p className="text-[12px] text-[var(--color-txt-dim)] opacity-85">
                      {event.caption}
                    </p>
                    <h3 className="text-[15px] font-semibold leading-[normal] text-[var(--color-topic-title)] md:text-[18px] md:leading-[26px]">
                      {event.title}
                    </h3>
                    <p className="text-[13px] text-[var(--color-txt-dim)] md:text-[14px]">
                      {event.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
