'use client';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'article' | 'project';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev';
    
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ITQAN - Quran Technologies Community",
          "alternateName": "إتقان",
          "description": "The largest community for developing open-source Quran technologies and improving user experience to serve Muslims around the world.",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.svg`,
          "sameAs": [
            "https://discord.gg/24CskUbuuB",
            "https://github.com/itqan"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["English", "Arabic"]
          },
          "foundingDate": "2024",
          "areaServed": "Worldwide",
          "knowsAbout": [
            "Quran Technology",
            "Islamic Software Development",
            "Open Source Development",
            "Quranic Applications",
            "Muslim Community Technology"
          ]
        };
        
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ITQAN",
          "description": "Quran Technologies Community",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        };
        
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Organization",
            "name": "Itqan Community"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Itqan Community",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.svg`
            }
          },
          "datePublished": data.publishDate,
          "dateModified": data.publishDate,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          }
        };
        
      case 'project':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": data.title,
          "description": data.description,
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Organization",
            "name": "Itqan Community"
          },
          "url": data.projectLink || baseUrl
        };
        
      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();
  
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
} 