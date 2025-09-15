import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '/.next/',
        '/node_modules/',
        '/.env*',
        '/package*.json',
        '/tsconfig.json',
        '/next.config.js',
        '/tailwind.config.js',
        '/.temp/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
} 