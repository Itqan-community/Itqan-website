import Image from "next/image";
import Link from "next/link";
import LinkBtn from "./LinkBtn";
import { getTranslations } from "next-intl/server";
import { FaArrowLeft, FaCalendar, FaUser, FaFileAlt, FaFileDownload, FaDownload } from "react-icons/fa";
import ForwardArrow from "./ForwardArrow";

interface ArticleDetailsProps {
  // Article metadata
  id: string;
  locale?: string;
  
  // Header section
  title: string;
  subtitle: string;
  headerImage?: string;
  
  // Main content
  contentImage: string;
  description: string;
  author: string;
  publishDate: string;
  readTime: string;
  
  // Content sections
  sections?: {
    title: string;
    content: string;
  }[];
  
  // Key points
  keyPointsTitle: string;
  keyPoints: string[];
  
  // Conclusion
  conclusionTitle: string;
  conclusion: string;
  
  // External link
  externalLink?: string;
  externalLinkText: string;
  
  // Discord section
  discordText: string;
  discordLink: string;
  discordImage: string;
}

export default async function ArticleDetails({
  id,
  locale = "ar",
  title,
  subtitle,
  headerImage,
  contentImage,
  description,
  author,
  publishDate,
  readTime,
  sections = [],
  keyPointsTitle,
  keyPoints,
  conclusionTitle,
  conclusion,
  externalLink,
  externalLinkText,
  discordText,
  discordLink,
  discordImage,
}: ArticleDetailsProps) {
  const t = await getTranslations("blog");
  
  // License comparison table data for the publishing licenses article
  const licenseComparisonData = [
    {
      license: "GNU AGPLv3",
      type: locale === 'ar' ? "نشر عكسي" : "Copyleft",
      features: locale === 'ar' ? "تضمن بقاء التعديلات مفتوحة المصدر حتى في الخدمات المستضافة" : "Ensures modifications remain open source even in hosted services",
      bestFor: locale === 'ar' ? "للمشاريع التي تود فرض مشاركة الكود مفتوح المصدر" : "Projects that want to enforce open source code sharing",
      restrictions: locale === 'ar' ? "لا تمنع استخدام الذكاء الاصطناعي/تعلم الآلة ولا تميز بين الاستخدام الخيري والتجاري" : "Does not restrict AI/ML use or distinguish between charitable and commercial use"
    },
    {
      license: "GNU GPLv3",
      type: locale === 'ar' ? "نشر عكسي" : "Copyleft",
      features: locale === 'ar' ? "تضمن بقاء التعديلات مفتوحة المصدر، لكن لا تشمل الخدمات المستضافة" : "Ensures modifications remain open source but excludes hosted services",
      bestFor: locale === 'ar' ? "لحماية كود المجتمع في البرمجيات مفتوحة المصدر" : "Protecting community code in open source software",
      restrictions: locale === 'ar' ? "لا توجد قيود على استخدام الذكاء الاصطناعي/تعلم الآلة أو التمييز بين الاستخدام الخيري والتجاري" : "No restrictions on AI/ML use or commercial vs. charitable use"
    },
    {
      license: "MIT License",
      type: locale === 'ar' ? "مرنة" : "Permissive",
      features: locale === 'ar' ? "تسمح باستخدام واسع، بما في ذلك الاستخدام التجاري" : "Allows broad use including commercial use",
      bestFor: locale === 'ar' ? "لتعظيم الانتشار والتعاون" : "Maximizing distribution and collaboration",
      restrictions: locale === 'ar' ? "لا توفر حماية ضد استخدام الذكاء الاصطناعي/تعلم الآلة أو الاستغلال التجاري" : "No protection against AI/ML use or commercial exploitation"
    },
    {
      license: "Apache License",
      type: locale === 'ar' ? "مرنة" : "Permissive",
      features: locale === 'ar' ? "مماثلة لـ MIT مع حماية براءات الاختراع" : "Similar to MIT with patent protection",
      bestFor: locale === 'ar' ? "لتشجيع الابتكار ومنع نزاعات براءات الاختراع" : "Encouraging innovation and preventing patent disputes",
      restrictions: locale === 'ar' ? "لا تمنع استخدام الذكاء الاصطناعي/تعلم الآلة أو الاستغلال التجاري" : "Does not restrict AI/ML use or commercial exploitation"
    },
    {
      license: "Creative Commons (CC BY)",
      type: locale === 'ar' ? "مرنة" : "Permissive",
      features: locale === 'ar' ? "مثالية للترجمات والأصول غير البرمجية مع شرط النسبة للمصدر" : "Ideal for translations and non-software assets with attribution requirement",
      bestFor: locale === 'ar' ? "للمحتوى والوسائط المتعددة والتوثيق" : "Content, multimedia, and documentation",
      restrictions: locale === 'ar' ? "لا تحتوي على قيود مدمجة على الاستخدام التجاري أو الذكاء الاصطناعي" : "No built-in restrictions on commercial or AI use"
    },
    {
      license: "Mozilla Public License",
      type: locale === 'ar' ? "نشر عكسي ضعيف" : "Weak Copyleft",
      features: locale === 'ar' ? "تسمح بربط الكود مفتوح المصدر مع برمجيات مغلقة المصدر" : "Allows linking open source code with closed source software",
      bestFor: locale === 'ar' ? "للبرمجيات التي تتكامل مع أنظمة مغلقة المصدر" : "Software integrating with closed source systems",
      restrictions: locale === 'ar' ? "ليست قوية بما يكفي لفرض المشاركة الكاملة للكود مفتوح المصدر" : "Not strong enough to enforce full open source code sharing"
    },
    {
      license: "Boost Software License",
      type: locale === 'ar' ? "مرنة" : "Permissive",
      features: locale === 'ar' ? "قيود طفيفة وغالباً ما تُستخدم لمكتبات C++" : "Minimal restrictions, often used for C++ libraries",
      bestFor: locale === 'ar' ? "للحوسبة عالية الأداء والمكتبات" : "High-performance computing and libraries",
      restrictions: locale === 'ar' ? "لا توجد قيود على استخدام الذكاء الاصطناعي/تعلم الآلة أو الاستخدام التجاري" : "No restrictions on AI/ML or commercial use"
    }
  ];

  // Detailed content sections for the publishing licenses article
  const detailedContent = {
    types: {
      title: locale === 'ar' ? "أنواع الرخص" : "Types of Licenses",
      content: [
        {
          subtitle: locale === 'ar' ? "رخص النشر العكسي (Copyleft)" : "Copyleft Licenses",
          text: locale === 'ar' ? "تتطلب بقاء التعديلات مفتوحة المصدر لضمان تطوير يعتمد على مساهمة المجتمع. أمثلة: GNU AGPLv3 و GNU GPLv3." : "Require that modifications remain open source to ensure development based on community contribution. Examples: GNU AGPLv3 and GNU GPLv3."
        },
        {
          subtitle: locale === 'ar' ? "الرخص المرنة (Permissive)" : "Permissive Licenses",
          text: locale === 'ar' ? "تسمح باستخدام التعديلات في كل من المشاريع مفتوحة المصدر والمشاريع الخاصة. أمثلة: MIT و Apache." : "Allow the use of modifications in both open source and proprietary projects. Examples: MIT and Apache."
        }
      ]
    },
    requirements: {
      title: locale === 'ar' ? "المتطلبات الرئيسية" : "Main Requirements",
      content: [
        {
          subtitle: locale === 'ar' ? "التحكم في الاستخدام:" : "Control of Usage:",
          text: locale === 'ar' ? "سواء كان تجارياً أو خيريًا؛ حيث يشمل الاستخدام التجاري تحقيق الربح عبر التطبيقات المدفوعة، الإعلانات، الأدوات المدعومة بالذكاء الاصطناعي، أو إعادة بيع النسخ المعدلة." : "Whether commercial or charitable; commercial use includes generating profit through paid applications, advertisements, AI-powered tools, or resale of modified copies."
        },
        {
          subtitle: locale === 'ar' ? "قيود الذكاء الاصطناعي/تعلم الآلة:" : "AI/Machine Learning Restrictions:",
          text: locale === 'ar' ? "فرض إذن صريح لاستخدام البيانات، مع تطبيق إجراءات تقنية (مثل العلامات المائية وإضافة البيانات الوصفية) لضمان عدم الاستغلال غير المصرح به." : "Require explicit permission to use the data, with technical measures applied (such as watermarks and metadata addition) to ensure unauthorized exploitation is prevented."
        },
        {
          subtitle: locale === 'ar' ? "الالتزام بمشاركة الكود مفتوح المصدر:" : "Commitment to Open Source Code Sharing:",
          text: locale === 'ar' ? "في بعض الحالات لضمان مساهمة المجتمع في التطوير." : "In some cases, to ensure community contribution to development."
        }
      ]
    },
    challenges: {
      title: locale === 'ar' ? "تحديات الرخص الحالية" : "Challenges of Current Licenses",
      content: [
        {
          subtitle: locale === 'ar' ? "الرخص المرنة (MIT, Apache, BSD):" : "Permissive Licenses (MIT, Apache, BSD):",
          text: locale === 'ar' ? "تسمح بالاستخدام التجاري والذكاء الاصطناعي بدون قيود." : "Allow commercial and AI use without restrictions."
        },
        {
          subtitle: locale === 'ar' ? "رخص النشر العكسي (GPL, AGPL):" : "Copyleft Licenses (GPL, AGPL):",
          text: locale === 'ar' ? "على الرغم من إلزامها بنشر التعديلات مفتوحة المصدر، فإنها لا تقيد الاستخدام التجاري أو الذكاء الاصطناعي." : "While requiring open source sharing of modifications, they do not restrict commercial or AI use."
        },
        {
          subtitle: locale === 'ar' ? "رخص مثل Creative Commons BY-NC:" : "Licenses like Creative Commons BY-NC:",
          text: locale === 'ar' ? "تحظر الاستخدام التجاري، لكنها لا تفرض الاستخدام الخيري حصريًا ولا تحد بشكل صريح من تدريب الذكاء الاصطناعي." : "Prohibit commercial use but do not exclusively enforce charitable use nor explicitly limit AI training."
        },
        {
          subtitle: locale === 'ar' ? "بعض الرخص الأخرى (Hippocratic License, Fair Source License, RPL):" : "Other Licenses (Hippocratic License, Fair Source License, RPL):",
          text: locale === 'ar' ? "تقدم قيودًا معينة، لكنها لا تغطي بشكل كامل الاحتياجات المتعلقة بالذكاء الاصطناعي والاستخدام التجاري." : "Impose certain restrictions but do not fully cover AI and commercial use needs."
        }
      ]
    }
  };

  // Detailed content sections for the development guide article
  const developmentGuideContent = {
    whatOffers: {
      title: locale === 'ar' ? "ماذا يقدم الدليل ؟" : "What does the guide offer?",
      content: [
        {
          subtitle: locale === 'ar' ? "بناء وتقييم فكرة تطبيقك القرآني." : "Building and evaluating your Quranic app idea.",
          text: locale === 'ar' ? "تعلم كيفية تطوير وتقييم أفكار تطبيقاتك القرآنية بطريقة منهجية." : "Learn how to develop and evaluate your Quranic app ideas in a systematic way."
        },
        {
          subtitle: locale === 'ar' ? "تطوير نموذج ومعايير العمل الخاص بك." : "Developing your own work model and standards.",
          text: locale === 'ar' ? "أنشئ نموذج عمل قوي ومعايير واضحة لمشروعك القرآني." : "Create a strong work model and clear standards for your Quranic project."
        },
        {
          subtitle: locale === 'ar' ? "إنضاج تصورك عن عمليات التنفيذ والنمو." : "Maturing your vision regarding implementation and growth processes.",
          text: locale === 'ar' ? "طور رؤيتك حول كيفية تنفيذ مشروعك وتحقيق النمو المستدام." : "Develop your vision on how to implement your project and achieve sustainable growth."
        },
        {
          subtitle: locale === 'ar' ? "بناء الفريق المؤسس الخاص بمشروعك." : "Building the founding team for your project.",
          text: locale === 'ar' ? "تعلم كيفية بناء فريق مؤسس قوي ومتخصص لمشروعك القرآني." : "Learn how to build a strong and specialized founding team for your Quranic project."
        },
        {
          subtitle: locale === 'ar' ? "توجيه نظرك إلى مهمات في مجال الصناعة." : "Directing your attention to tasks within the industry.",
          text: locale === 'ar' ? "اكتشف الفرص والمهمات المتاحة في مجال التقنيات القرآنية." : "Discover opportunities and tasks available in the Quranic technology field."
        },
        {
          subtitle: locale === 'ar' ? "إعداد وبناء الخطط ونماذج الاستدامة." : "Preparing and constructing sustainability plans and models.",
          text: locale === 'ar' ? "أنشئ خطط استدامة شاملة ونماذج عمل مستدامة لمشروعك." : "Create comprehensive sustainability plans and sustainable business models for your project."
        }
      ]
    },
    howToBenefit: {
      title: locale === 'ar' ? "كيف أستفيد من الدليل ؟" : "How can I benefit from the guide?",
      content: [
        {
          subtitle: locale === 'ar' ? "استخدم الدليل كمرشد لتحويل أفكارك إلى خطط قابلة للتنفيذ." : "Use the guide as a mentor to transform your ideas into actionable plans.",
          text: locale === 'ar' ? "احصل على إرشادات عملية لتحويل أفكارك المجردة إلى خطط تنفيذية واضحة." : "Get practical guidance to transform your abstract ideas into clear implementation plans."
        },
        {
          subtitle: locale === 'ar' ? "حدد فجوات ممارساتك الحالية باستخدامه واعمل على حلها." : "Identify gaps in your current practices using it and work on resolving them.",
          text: locale === 'ar' ? "اكتشف نقاط الضعف في ممارساتك الحالية واعمل على تحسينها." : "Discover weaknesses in your current practices and work on improving them."
        },
        {
          subtitle: locale === 'ar' ? "افهم تحديات المجال وقيّم مدى جاهزية تطبيقك القرآني لمواجهتها." : "Understand the challenges of the field and assess your Quranic app's readiness to face them.",
          text: locale === 'ar' ? "تعرف على التحديات التي تواجه التقنيات القرآنية وقيّم استعداد مشروعك." : "Learn about the challenges facing Quranic technologies and assess your project's readiness."
        },
        {
          subtitle: locale === 'ar' ? "ساهم في بناء استراتيجيتك من خلاله لتحقيق أثرٍ طويل المدى." : "Contribute to building your strategy through it to achieve long-term impact.",
          text: locale === 'ar' ? "ابني استراتيجية شاملة لتحقيق تأثير طويل المدى في مجال التقنيات القرآنية." : "Build a comprehensive strategy to achieve long-term impact in the Quranic technology field."
        }
      ]
    }
  };

  // Detailed content sections for the evaluation guide article
  const evaluationGuideContent = {
    contents: {
      title: locale === 'ar' ? "محتويات الدليل" : "Contents of the Guide",
      content: [
        {
          subtitle: locale === 'ar' ? "أصالة الفكرة ومدى تلبيتها للاحتياجات القائمة والمستقبلية." : "Originality of the idea and its ability to meet current and future needs.",
          text: locale === 'ar' ? "تقييم مدى أصالة الفكرة وقدرتها على تلبية الاحتياجات الحالية والمستقبلية للمجتمع." : "Evaluate the originality of the idea and its ability to meet current and future community needs."
        },
        {
          subtitle: locale === 'ar' ? "كفاءة الفريق وتكامل الأدوار والخبرات." : "Team competence and the integration of roles and expertise.",
          text: locale === 'ar' ? "تقييم كفاءة الفريق وتكامل الأدوار والخبرات المطلوبة لنجاح المشروع." : "Assess team competence and the integration of roles and expertise required for project success."
        },
        {
          subtitle: locale === 'ar' ? "نضج النموذج التجريبي وجاهزيته للتنفيذ وملاءمته العملية." : "Maturity of the prototype, readiness for implementation, and practical suitability.",
          text: locale === 'ar' ? "تقييم نضج النموذج التجريبي وجاهزيته للتنفيذ وملاءمته للاستخدام العملي." : "Evaluate prototype maturity, implementation readiness, and practical suitability for real-world use."
        },
        {
          subtitle: locale === 'ar' ? "استدامة المشروع وجودة خطط العمل والنمو." : "Project sustainability and the quality of work and growth plans.",
          text: locale === 'ar' ? "تقييم استدامة المشروع وجودة خطط العمل والنمو على المدى الطويل." : "Assess project sustainability and the quality of work and growth plans for long-term success."
        }
      ]
    },
    howToUse: {
      title: locale === 'ar' ? "كيف تستثمر هذا الدليل؟" : "How to Make Use of This Guide?",
      content: [
        {
          subtitle: locale === 'ar' ? "اعتمد عليه كمرجعية شاملة لتقييم المشاريع بموضوعية ودقة." : "Rely on it as a comprehensive reference for objective and accurate project evaluation.",
          text: locale === 'ar' ? "استخدم الدليل كمرجع شامل لتقييم المشاريع بموضوعية ودقة عالية." : "Use the guide as a comprehensive reference for objective and accurate project evaluation."
        },
        {
          subtitle: locale === 'ar' ? "استفد من معاييره لتحديد نقاط القوة والضعف في مشروعك وتطويره." : "Benefit from its criteria to identify strengths and weaknesses in your project and improve it.",
          text: locale === 'ar' ? "استفد من معايير الدليل لتحديد نقاط القوة والضعف في مشروعك والعمل على تطويره." : "Benefit from the guide's criteria to identify strengths and weaknesses in your project and work on improving it."
        },
        {
          subtitle: locale === 'ar' ? "كوّن رؤية واضحة لمعايير الجودة والتميز في المشاريع القرآنية التقنية." : "Develop a clear vision of quality and excellence standards in Quranic tech projects.",
          text: locale === 'ar' ? "كوّن رؤية واضحة لمعايير الجودة والتميز في المشاريع القرآنية التقنية." : "Develop a clear vision of quality and excellence standards in Quranic technology projects."
        }
      ]
    }
  };
  
  return (
    <div className="min-h-screen w-auto max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      {/* Back Button */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 transition-colors"
        >
          <div className="scale-x-[-1]">
            <ForwardArrow silent size={16} locale={locale} />
          </div>
          <span className=" text-sm sm:text-base">{t("backToBlog")}</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="relative" id="cover">
        <div className="text-center mt-8 sm:mt-12 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 leading-tight text-emerald-900">
            {t(title)}
          </h1>
          <p className="text-base sm:text-lg max-w-4xl mx-auto leading-relaxed mb-6 text-neutral-500 ">
            {t(subtitle)}
          </p>
        </div>
        
        {headerImage && (
          <div className="max-w-6xl mx-auto w-full h-64 md:h-96 relative mt-8">
            <Image
              src={t(headerImage)}
              alt={t(title)}
              fill
              className="object-cover rounded-lg"
              sizes="100vw"
              priority
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 py-8 sm:py-12">
        {/* Detailed Content Sections for Publishing Licenses */}
        {id === "opensource-license" && (
          <div className="flex flex-col gap-12">
            {/* Types Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-rubik">
                {detailedContent.types.title}
              </h3>
              <div className="space-y-4">
                {detailedContent.types.content.map((item, index) => (
                  <div key={index}>
                    <h4 className=" text-neutral-900 mb-2 font-rubik">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base leading-relaxed text-neutral-500 ">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-rubik">
                {detailedContent.requirements.title}
              </h3>
              <div className="space-y-4">
                {detailedContent.requirements.content.map((item, index) => (
                  <div key={index}>
                    <h4 className=" text-neutral-900 mb-2 font-rubik">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base leading-relaxed text-neutral-500 ">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* License Comparison Table */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-rubik">
                {locale === 'ar' ? "مقارنة بين الرخص المتاحة واستخداماتها" : "Comparison of Available Licenses and Their Uses"}
              </h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral-300 text-sm">
                      <thead>
                        <tr className="bg-neutral-50">
                          <th scope="col" className="whitespace-nowrap border border-neutral-300 px-3 py-2 text-start  text-neutral-900 font-rubik">
                            {locale === 'ar' ? "الرخصة" : "License"}
                          </th>
                          <th scope="col" className="whitespace-nowrap border border-neutral-300 px-3 py-2 text-start  text-neutral-900 font-rubik">
                            {locale === 'ar' ? "النوع" : "Type"}
                          </th>
                          <th scope="col" className="whitespace-nowrap border border-neutral-300 px-3 py-2 text-start  text-neutral-900 font-rubik">
                            {locale === 'ar' ? "الميزات الأساسية" : "Key Features"}
                          </th>
                          <th scope="col" className="whitespace-nowrap border border-neutral-300 px-3 py-2 text-start  text-neutral-900 font-rubik">
                            {locale === 'ar' ? "الأفضل للمشاريع" : "Best For"}
                          </th>
                          <th scope="col" className="whitespace-nowrap border border-neutral-300 px-3 py-2 text-start  text-neutral-900 font-rubik">
                            {locale === 'ar' ? "القيود" : "Restrictions"}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-300">
                        {licenseComparisonData.map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                            <td className="whitespace-normal border border-neutral-300 px-3 py-2  text-neutral-500">{row.license}</td>
                            <td className="whitespace-normal border border-neutral-300 px-3 py-2  text-neutral-500">{row.type}</td>
                            <td className="whitespace-normal border border-neutral-300 px-3 py-2  text-neutral-500">{row.features}</td>
                            <td className="whitespace-normal border border-neutral-300 px-3 py-2  text-neutral-500">{row.bestFor}</td>
                            <td className="whitespace-normal border border-neutral-300 px-3 py-2  text-neutral-500">{row.restrictions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenges Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-rubik">
                {detailedContent.challenges.title}
              </h3>
              <div className="space-y-4">
                {detailedContent.challenges.content.map((item, index) => (
                  <div key={index}>
                    <h4 className=" text-neutral-900 mb-2 font-rubik">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base leading-relaxed text-neutral-500 ">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Content Sections for Development Guide */}
        {id === "development-guide" && (
          <div className="flex flex-col gap-12">
            {/* What Offers Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-rubik">
                {developmentGuideContent.whatOffers.title}
              </h3>
              <div className="space-y-4">
                {developmentGuideContent.whatOffers.content.map((item, index) => (
                  <div key={index}>
                    <h4 className=" text-neutral-900 mb-2 font-rubik">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base leading-relaxed text-neutral-500 ">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Benefit Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-rubik">
                {developmentGuideContent.howToBenefit.title}
              </h3>
              <div className="space-y-4">
                {developmentGuideContent.howToBenefit.content.map((item, index) => (
                  <div key={index}>
                    <h4 className=" text-neutral-900 mb-2 font-rubik">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base leading-relaxed text-neutral-500 ">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Content Sections for Evaluation Guide */}
        {id === "evaluation-guide" && (
          <div className="flex flex-col gap-12">
            {/* Contents Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-rubik">
                {evaluationGuideContent.contents.title}
              </h3>
              <div className="space-y-4">
                {evaluationGuideContent.contents.content.map((item, index) => (
                  <div key={index}>
                    <h4 className=" text-neutral-900 mb-2 font-rubik">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base leading-relaxed text-neutral-500 ">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Use Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 font-rubik">
                {evaluationGuideContent.howToUse.title}
              </h3>
              <div className="space-y-4">
                {evaluationGuideContent.howToUse.content.map((item, index) => (
                  <div key={index}>
                    <h4 className=" text-neutral-900 mb-2 font-rubik">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base leading-relaxed text-neutral-500 ">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Conclusion */}
        {externalLink && externalLink !== "" && (
          <Link
            href={t(externalLink)}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 cursor-pointer flex items-center justify-between mt-8"
          >
            <p className="text-sm sm:text-base leading-relaxed  ">
              {t(conclusion)}
            </p>
            <FaDownload size={20} />
          </Link>
        )}
      </div>
    </div>
  );
} 