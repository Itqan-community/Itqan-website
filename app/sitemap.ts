import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev'
  const currentDate = new Date()
  
  const routes = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
      description: 'Itqan (إتقان) - The largest community for developing open-source Quran technologies and improving user experience for Muslims worldwide. Serving Quran is our greatest Ghayah.',
    },
    {
      path: '/projects',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
      description: 'Itqan Quran Technology Projects - Open-source technical projects to enrich Quran technology development including Quran Apps Directory, Advanced Search Technology, and Content Management System.',
    },
    {
      path: '/resources',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
      description: 'Itqan Technical Library - Comprehensive Quran technology resources for developers including Mushaf Fonts, Quran Recitations, Digital Mushaf Layout, and Tafseer data.',
    },
    {
      path: '/blog',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      description: 'Itqan Community Blog - Articles about Quran technology development, open source projects, and Islamic software development by the Itqan community.',
    },
    {
      path: '/tools',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      description: 'Itqan Development Tools - Technical tools and utilities for Quran application development and Islamic software projects.',
    },
    {
      path: '/resources/recitation',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      description: 'Itqan Quran Recitations - Detailed time and date data for each verse and surah with word identification during recitation.',
    },
    {
      path: '/resources/mushaf-fonts',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      description: 'Itqan Mushaf Fonts - Quran fonts compatible with various devices including handcrafted letter-based fonts and standard Unicode text fonts.',
    },
    {
      path: '/resources/tafseer',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      description: 'Itqan Tafseer Resources - Quran tafseer data in multiple languages with verse and surah aggregation information available in JSON and SQLITE formats.',
    },
    {
      path: '/resources/digital-mushaf-layout',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      description: 'Itqan Digital Mushaf Layout - Quran pages exactly similar to the printed mushaf with precise design for Quran memorization.',
    },
    {
      path: '/projects/1',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      description: 'Itqan Quran Apps Directory - Comprehensive directory of Quranic applications and digital tools serving Muslims worldwide.',
    },
    {
      path: '/projects/2',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      description: 'Itqan Advanced Quran Search Technology - Innovative search technology for Quranic texts with AI-powered algorithms.',
    },
    {
      path: '/projects/3',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      description: 'Itqan Quran Content Management System - Integrated system for managing Quranic content and resources with centralized platform.',
    },
    {
      path: '/blog/opensource-license',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      description: 'Itqan Open Source License Guide - Information about open source licensing for Quran technology projects and Islamic software development.',
    },
    {
      path: '/blog/development-guide',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      description: 'Itqan Development Guide - Comprehensive guide for developing Quran applications and Islamic software projects.',
    },
    {
      path: '/blog/evaluation-guide',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      description: 'Itqan Evaluation Guide - Standards and guidelines for evaluating Quran technology projects and Islamic software applications.',
    },
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Generate sitemap entries for each locale
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${baseUrl}/${locale}${route.path}`
      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
    })
  })

  return sitemap
} 