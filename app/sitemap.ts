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
    },
    {
      path: '/projects',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/resources',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/blog',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/tools',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/resources/recitation',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/resources/mushaf-fonts',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/resources/tafseer',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/resources/digital-mushaf-layout',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/projects/1',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/projects/2',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/projects/3',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/blog/opensource-license',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/blog/development-guide',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/blog/evaluation-guide',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
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