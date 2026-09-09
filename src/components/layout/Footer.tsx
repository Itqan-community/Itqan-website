import Image from "next/image";
import Link from "next/link";
import NewsletterSubscribeForm from "@/components/home/NewsletterSubscribeForm";
import { getDictionary, type Locale } from "@/lib/i18n";

/* Social URLs/icons are locale-independent — moved verbatim from src/lib/nav.ts. */
const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ItqanCommunity/",
    icon: "/figma/social-facebook.svg",
  },
  { label: "X", href: "https://x.com/itqan_community", icon: "/figma/social-x.svg" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/itqan-community",
    icon: "/figma/social-linkedin.svg",
  },
];

/**
 * footer-section — Figma 20:1335 (home) / 137:175 (services), 1440×541.
 * Mobile frame: 183:423, 390×599.
 *
 * Desktop: #0b261f ground, 100px top padding / 40px bottom, 64px stack gap,
 * five equal columns with a 48px gutter. Under RTL the first column in the DOM
 * renders furthest right, so the logo column leads.
 *
 * Mobile drops the newsletter signup — it already sits in its own section
 * directly above the footer — and stacks brand, links, socials, then the
 * bottom metadata.
 */
export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="w-full border-t border-[var(--brand-a20)] bg-[var(--color-code-bg)] pt-[48px] pb-[32px] lg:pt-[100px] lg:pb-[40px]">
      <div className="shell flex flex-col gap-[32px] lg:gap-[64px]">
        <div className="flex flex-col gap-[32px] md:flex-row md:items-start md:gap-[48px]">
          {/* Brand column */}
          <div className="flex flex-1 flex-col gap-[12px] lg:gap-[18px]">
            <p className="text-[28px] font-bold text-white">{dict.footer.brand}</p>
            <p className="text-[13px] text-[rgba(166,201,186,0.9)]">{dict.footer.blurb}</p>
          </div>

          {/* Link columns — الموارد */}
          {dict.footer.columns.map((col) => (
            <div key={col.title} className="flex flex-1 flex-col gap-[16px]">
              <p className="text-[15px] font-semibold text-white">{col.title}</p>
              <ul className="flex flex-col gap-[12px]">
                {col.links
                  .filter((link) => !link.hidden)
                  .map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[14px] text-[rgba(166,201,186,0.9)] transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[14px] text-[rgba(166,201,186,0.9)] transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          {/* Social links column — desktop only. */}
          <div className="hidden flex-1 flex-col gap-[24px] md:flex">
            <p className="text-[15px] font-semibold text-white">{dict.footer.followUs}</p>
            <SocialRow />
          </div>

          {/* Newsletter column — desktop only. */}
          <div className="hidden flex-1 flex-col gap-[24px] md:flex">
            <p className="text-[15px] font-semibold text-white">{dict.footer.newsletterTitle}</p>
            <p className="text-[13px] text-[rgba(166,201,186,0.9)]">
              {dict.footer.newsletterText}
            </p>

            <NewsletterSubscribeForm
              tone="dark"
              sourcepage="footer"
              inputId={`footer-email-${locale}`}
              labels={{
                namePlaceholder: dict.newsletterForm.namePlaceholder,
                emailPlaceholder: dict.newsletterForm.emailPlaceholderDark,
                submitLabel: dict.newsletterForm.submitLabelDark,
                submittingLabel: dict.newsletterForm.submittingLabel,
                successMessage: dict.newsletterForm.successMessage,
                errorFallback: dict.newsletterForm.errorFallback,
                nameSrLabel: dict.newsletterForm.nameSrLabel,
                emailSrLabel: dict.newsletterForm.emailSrLabel,
              }}
            />
          </div>
        </div>

        {/* Mobile socials sit on their own row (183:427). */}
        <div className="md:hidden">
          <SocialRow />
        </div>

        <div className="h-px w-full bg-[rgba(232,238,235,0.12)]" />

        <div className="flex flex-col items-start gap-[12px] text-[12px] text-[rgba(166,201,186,0.9)] sm:flex-row sm:items-center sm:justify-between">
          <p>{dict.footer.copyright}</p>
          <Link
            href={locale === "ar" ? "/en" : "/ar"}
            className="flex items-center gap-[6px] transition-opacity duration-200 hover:opacity-80"
          >
            <Image src="/figma/icon-globe.svg" alt="" width={14} height={14} className="size-[14px]" />
            <span>{dict.footer.languageLabel}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

function SocialRow() {
  return (
    <div className="flex items-center gap-[12px]">
      {socialLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          target="_blank"
          rel="noreferrer"
          className="opacity-90 transition-opacity duration-200 hover:opacity-100"
        >
          <Image src={s.icon} alt="" width={18} height={18} className="size-[18px]" />
        </a>
      ))}
    </div>
  );
}
