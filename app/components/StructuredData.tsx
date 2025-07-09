import { MetadataRoute } from 'next'

export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev'
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Itqan - إتقان",
    "alternateName": ["اتقان", "ITQAN", "Itqan Community", "مجتمع إتقان"],
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/logo.png`,
      "width": 512,
      "height": 512
    },
    "description": "Itqan (إتقان) is the largest community for developing open-source Quran technologies and improving user experience for Muslims worldwide. We serve the Quran through innovative technology solutions.",
    "slogan": "Serving Quran is our greatest Ghayah - خدمة القرآن هي أعظم غايتنا",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://discord.gg/24CskUbuuB"
    },
    "sameAs": [
      "https://discord.gg/24CskUbuuB",
      "https://github.com/itqan",
      "https://twitter.com/itqan"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Itqan Quran Technology Resources",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Quran Apps Directory - دليل التطبيقات القرآنية",
            "description": "Comprehensive directory of Quranic applications and digital tools"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Quran Search Technology - تقنية البحث القرآني",
            "description": "Advanced search capabilities for Quranic text and content"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Quran Content Management - نظام إدارة المحتوى القرآني",
            "description": "Integrated system for managing Quranic content and resources"
          }
        }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Itqan - إتقان",
    "alternateName": ["اتقان", "ITQAN", "Itqan Dev", "إتقان ديف"],
    "url": baseUrl,
    "description": "Itqan (إتقان) - The premier platform for Quran technology development. We build the largest community for developing open-source Quran technologies and improving user experience for Muslims worldwide.",
    "publisher": {
      "@type": "Organization",
      "name": "Itqan Community - مجتمع إتقان"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Itqan Community: Advancing Quran Technology - مجتمع إتقان: تطوير تقنيات القرآن",
    "description": "Itqan (إتقان) community is dedicated to building the largest open-source ecosystem for Quran technologies, serving Muslims worldwide through innovative digital solutions.",
    "image": `${baseUrl}/images/hero-image.jpg`,
    "author": {
      "@type": "Organization",
      "name": "Itqan Community - مجتمع إتقان"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Itqan - إتقان",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.png`
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": baseUrl
    }
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Itqan Quran Technology Projects - مشاريع تقنيات القرآن إتقان",
    "description": "Open-source technical projects by Itqan community to enrich Quran technology development. Projects include Quran Apps Directory, Advanced Search Technology, and Content Management System.",
    "creator": {
      "@type": "Organization", 
      "name": "Itqan Community - مجتمع إتقان"
    },
    "keywords": ["itqan", "اتقان", "quran technology", "islamic software", "quran apps", "muslim developers", "open source", "quran development"],
    "url": `${baseUrl}/projects`,
    "inLanguage": ["en", "ar"],
    "hasPart": [
      {
        "@type": "SoftwareApplication",
        "name": "Quran Apps Directory - دليل التطبيقات القرآنية",
        "description": "Comprehensive directory of Quranic applications and digital tools"
      },
      {
        "@type": "SoftwareApplication", 
        "name": "Advanced Quran Search Technology - تقنية البحث القرآني المتقدمة",
        "description": "Advanced search capabilities for Quranic text and content"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Quran Content Management System - نظام إدارة المحتوى القرآني", 
        "description": "Integrated system for managing Quranic content and resources"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema)
        }}
      />
    </>
  )
} 