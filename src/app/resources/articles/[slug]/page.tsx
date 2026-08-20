import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { getArticleBySlug, articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — إتقان`,
    description: article.subtitle,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1" dir="rtl">
        {/* Article Hero */}
        <section className="overflow-hidden bg-[#f4faf7] px-[16px] py-[32px] sm:px-[24px] lg:px-[100px] lg:py-[60px]">
          <Reveal>
            <Link
              href="/resources/articles"
              className="flex items-center gap-[8px] py-[20px] text-[14px] font-medium text-[var(--color-txt-dim)] hover:text-[var(--color-brand)] transition-colors"
            >
              <span>العودة إلى المقالات</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>

           <div className="flex flex-col gap-[24px] lg:flex-row lg:items-center lg:gap-[40px]" dir="ltr">
             <Reveal delay={80} className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[16px] border border-[rgba(35,110,91,0.1)] sm:h-[300px] lg:h-[300px] lg:w-[460px]">
               <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 460px" />
             </Reveal>

             <Reveal delay={160} className="flex flex-1 flex-col items-start gap-[12px] sm:gap-[16px]" dir="rtl">
              <span className="rounded-[100px] bg-[rgba(35,110,91,0.08)] px-[14px] py-[6px] text-[12px] font-medium text-[var(--color-grad-end)]">
                {article.category}
              </span>
               <h1 className="text-right text-[32px] font-bold leading-[1.35] text-[var(--color-txt)] sm:text-[40px] lg:text-[46px]">
                {article.title}
              </h1>
               <p className="text-right text-[15px] leading-[1.8] text-[var(--color-txt-dim)] sm:text-[16px]">
                {article.subtitle}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Article Content */}
        <section className="px-[16px] py-[48px] pb-[64px] sm:px-[24px] lg:px-[100px] lg:py-[80px] lg:pb-[100px]" dir="rtl">
          <div className="flex flex-col gap-[48px] lg:gap-[80px]">
            {article.sections.map((section, i) => (
              <Reveal key={i} delay={i * 80}>
                {section.type === "heading" && section.title && (
                   <h2 className="text-right text-[28px] font-bold leading-[1.4] text-[var(--color-txt)] sm:text-[32px] lg:text-[36px]">
                    {section.title}
                  </h2>
                )}

                {section.type === "cards" && section.items && (
                   <div className="flex flex-col gap-[16px] lg:flex-row lg:gap-[24px]" dir="rtl">
                    {section.items.map((item, j) => (
                      <div
                        key={j}
                         className="flex w-full flex-1 flex-col items-start gap-[16px] rounded-[12px] border border-[rgba(35,110,91,0.1)] bg-[#f9faf9] p-[20px] sm:p-[28px]"
                         dir="rtl"
                      >
                        <div className="rounded-[8px] bg-[rgba(35,110,91,0.06)] p-[8px]">
                          <div className="size-[24px] flex items-center justify-center">
                            {item.icon === "unlock" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-grad-end)" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                              </svg>
                            )}
                            {item.icon === "lock" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-grad-end)" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                            )}
                            {item.icon === "lightbulb" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-grad-end)" strokeWidth="2">
                                <path d="M9 18h6" />
                                <path d="M10 22h4" />
                                <path d="M12 2v1" />
                                <path d="M12 7a5 5 0 0 0-5 5c0 2 1 3 2 4v2h6v-2c1-1 2-2 2-4a5 5 0 0 0-5-5z" />
                              </svg>
                            )}
                            {item.icon === "users" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-grad-end)" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                            )}
                            {item.icon === "target" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-grad-end)" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                              </svg>
                            )}
                            {item.icon === "arrow-up" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-grad-end)" strokeWidth="2">
                                <line x1="12" y1="19" x2="12" y2="5" />
                                <polyline points="5 12 12 5 19 12" />
                              </svg>
                            )}
                            {item.icon === "calendar" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-grad-end)" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                            )}
                            {item.icon === "circle-x" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-grad-end)" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                              </svg>
                            )}
                          </div>
                        </div>
                         <h3 className="text-[18px] font-semibold text-[var(--color-topic-title)] text-right">
                          {item.title}
                        </h3>
                         <p className="text-[14px] text-[var(--color-txt-dim)] text-right">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "list" && section.items && (
                  <div className="flex flex-col gap-[16px]">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex gap-[16px] items-start">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-[2px]">
                          <path
                            d="M11.25 4.5L6.75 9L11.25 13.5"
                            stroke="var(--color-grad-end)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="flex-1 text-[16px] text-[var(--color-txt)] text-right">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "table" && section.tableData && (
                   <div className="overflow-x-auto rounded-[12px] border border-[rgba(35,110,91,0.1)]">
                     <div className="min-w-[1200px]">
                     <div className="flex min-w-[1200px] bg-[#f4faf7] border-b border-[rgba(35,110,91,0.1)] p-[16px] text-[14px] text-[var(--color-txt)]">
                       {section.tableData.headers.map((header, j) => (
                         <div
                           key={j}
                           className={`${
                             j === 0 ? "w-[160px]" : j === 1 ? "w-[120px]" : "min-w-[240px] flex-1"
                           } shrink-0`}
                         >
                          {header}
                        </div>
                      ))}
                    </div>
                    {section.tableData.rows.map((row, i) => (
                      <div
                        key={i}
                       className={`flex min-w-[1200px] border-b border-[rgba(35,110,91,0.1)] p-[16px] text-[14px] ${
                          i % 2 === 0 ? "bg-white" : "bg-[#f9faf9]"
                        }`}
                      >
                        {row.map((cell, j) => (
                          <div
                            key={j}
                            className={`${
                               j === 0 ? "w-[160px] text-[var(--color-txt)]" : j === 1 ? "w-[120px] text-[var(--color-grad-end)]" : "min-w-[240px] flex-1 text-[var(--color-txt-dim)]"
                             } shrink-0`}
                          >
                            {cell}
                          </div>
                       ))}
                     </div>
                    ))}
                     </div>
                   </div>
                )}

                {section.type === "grid" && section.items && (
                   <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 md:gap-[24px]" dir="rtl">
                    {section.items.map((item, j) => (
                      <div
                        key={j}
                         className="flex flex-col items-start gap-[12px] rounded-[12px] border border-[rgba(35,110,91,0.1)] bg-white p-[20px] sm:p-[24px]"
                         dir="rtl"
                      >
                         <h3 className="text-[18px] font-semibold text-[var(--color-topic-title)] text-right w-full">
                          {item.title}
                        </h3>
                         <p className="text-[14px] text-[var(--color-txt-dim)] text-right w-full">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}

            {/* CTA Section */}
            {article.cta && (
              <Reveal>
                 <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-b from-[var(--color-grad-end)] to-[#0b261f] p-[24px] sm:p-[36px] lg:p-[48px]">
                   <p className="absolute left-[24px] top-[24px] hidden whitespace-nowrap font-['JetBrains_Mono'] text-[80px] text-[rgba(255,255,255,0.03)] lg:block">
                    {`{...}`}
                  </p>
                   <p className="absolute right-[24px] top-[80px] hidden whitespace-nowrap font-['JetBrains_Mono'] text-[70px] text-[rgba(255,255,255,0.03)] lg:block">
                    {`</>`}
                  </p>

                   <div className="relative flex flex-col items-center gap-[20px] sm:gap-[24px]">
                     <h2 className="text-center text-[28px] font-bold leading-[1.4] text-white sm:text-[36px] lg:text-[42px]">
                      {article.cta.title}
                    </h2>
                     <p className="w-full max-w-[640px] text-center text-[15px] leading-[1.8] text-[var(--color-code-txt)] sm:text-[16px]">
                      {article.cta.description}
                    </p>
                     <Link
                       href={article.cta.downloadUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="btn btn-primary px-[31px] py-[16px] text-[15px] text-white"
                     >
                       {article.cta.buttonLabel}
                     </Link>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
