import { seoData } from '../data/seoData'
import { getLocale } from 'next-intl/server'

export default async function SocialMeta() {
  const locale = await getLocale()
  const meta = seoData[locale as 'en' | 'ar']

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={meta.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="itqan-website.netlify.app" />
      <meta property="twitter:url" content={meta.url} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </>
  )
}