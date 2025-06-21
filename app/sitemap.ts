import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev'
  
  const routes = [
    '',
    '/projects',
    '/resources',
    '/blog',
    '/tools',
    '/resources/recitation',
    '/resources/mushaf-fonts',
    '/resources/tafseer',
    '/resources/digital-mushaf-layout',
    '/projects/1',
    '/projects/2',
    '/projects/3',
    '/blog/opensource-license',
    '/blog/development-guide',
    '/blog/evaluation-guide',
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Generate sitemap entries for each locale
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${baseUrl}/${locale}${route}`
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : route.startsWith('/blog/') ? 0.7 : 0.8,
      })
    })
  })

  return sitemap
} 