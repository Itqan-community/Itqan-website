import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { client } from "@/app/sanity/client";
import { Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectDetails from "../../../components/ProjectDetails";
import StructuredData from "@/app/components/StructuredData";

const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  name,
  slug,
  title,
  description,
  subDescription,
  status,
  image{
    _type,
    alt,
    caption,
    asset->
  },
  subImage{
    _type,
    alt,
    caption,
    asset->
  },
  url,
  contentBlocks[]{
    type,
    title,
    description,
    points[]{
      title,
      description
    },
    columns[],
    rows[]{
      cells[]
    },
    file{
      asset->
    }
  }
}`);

const PROJECTS_SLUGS_QUERY = `*[_type == "project"]{
  slug
}`;

interface ProjectPageProps {
  params: {
    locale: Locale;
    slug: string;
  };
}

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { slug, locale } }: ProjectPageProps): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev';
  
  try {
    const { data: project } = await sanityFetch({
      query: PROJECT_QUERY,
      params: { slug }
    });

    if (!project) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found.',
      };
    }

  const t = await getTranslations("home.projects");
  
  // Get translated project title and description
  const projectTitle = typeof project.title === 'object' 
    ? project.title[locale] || project.title.en 
    : project.title;
  const projectDescription = typeof project.description === 'object'
    ? project.description[locale] || project.description.en
    : project.description;

  return {
    title: projectTitle,
    description: projectDescription,
    keywords: [
      "Quran Technology",
      "Islamic Software",
      "Quran Applications",
      "Muslim Developers",
      "Open Source",
      projectTitle,
      "Quran Development"
    ],
    openGraph: {
      title: projectTitle,
      description: projectDescription,
      url: `${baseUrl}/${locale}/projects/${slug}`,
      siteName: locale === 'ar' ? 'إتقان' : 'ITQAN',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(projectTitle)}&description=${encodeURIComponent(projectDescription)}&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: projectTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: projectTitle,
      description: projectDescription,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(projectTitle)}&description=${encodeURIComponent(projectDescription)}&locale=${locale}`],
    },
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        'ar': `/ar/projects/${slug}`,
        'en': `/en/projects/${slug}`,
      },
    },
  };
  } catch (error) {
    console.error('Error generating metadata for project:', slug, error);
    // Fallback metadata for build time
    const fallbackTitle = locale === 'ar' ? 'مشروع' : 'Project';
    const fallbackDescription = locale === 'ar' 
      ? 'مشروع من مجتمع إتقان لتطوير تقنيات القرآن الكريم'
      : 'A project from Itqan community for developing Quran technologies';
    
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        url: `${baseUrl}/${locale}/projects/${slug}`,
        siteName: locale === 'ar' ? 'إتقان' : 'ITQAN',
        locale: locale,
        type: 'website',
        images: [
          {
            url: `${baseUrl}/api/og?title=${encodeURIComponent(fallbackTitle)}&description=${encodeURIComponent(fallbackDescription)}&locale=${locale}`,
            width: 1200,
            height: 630,
            alt: fallbackTitle,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: fallbackTitle,
        description: fallbackDescription,
        images: [`${baseUrl}/api/og?title=${encodeURIComponent(fallbackTitle)}&description=${encodeURIComponent(fallbackDescription)}&locale=${locale}`],
      },
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = params;
  
  try {
    const { data: project } = await sanityFetch({
      query: PROJECT_QUERY,
      params: { slug }
    });
    
    // Check if project exists
    if (!project) {
      notFound();
    }

    const t = await getTranslations("home.projects");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev';

    // Extract localized content with fallbacks
    const projectTitle = typeof project.title === 'object' 
      ? project.title[locale] || project.title.en 
      : project.title || 'Project';
    const projectDescription = typeof project.description === 'object'
      ? project.description[locale] || project.description.en
      : project.description || '';
    const projectSubDescription = typeof project.subDescription === 'object'
      ? project.subDescription[locale] || project.subDescription.en
      : project.subDescription || '';

    // Prepare structured data for the project
    const structuredData = {
      title: projectTitle,
      description: projectDescription,
      projectLink: project.url || '',
      url: `${baseUrl}/${locale}/projects/${slug}`,
    };

    return (
      <>
        <StructuredData type="project" data={structuredData} />
        <ProjectDetails 
          project={project}
          locale={locale}
          title={projectTitle}
          description={projectDescription}
          subDescription={projectSubDescription}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    notFound();
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    const projects = await client.fetch(PROJECTS_SLUGS_QUERY);
    
    if (!Array.isArray(projects) || projects.length === 0) {
      console.warn('No projects found for static generation, returning fallback slugs');
      // Return fallback project slugs for build time - only slug, not locale (handled by layout)
      return [
        { slug: '1' },
        { slug: '2' },
        { slug: '3' }
      ];
    }
    
    // Generate params - only slug needed, locale is handled by the layout
    const params = [];
    for (const project of projects) {
      if (project.slug?.current) {
        params.push({ slug: project.slug.current });
      }
    }
    
    // If no valid projects, return fallback
    if (params.length === 0) {
      return [
        { slug: '1' },
        { slug: '2' },
        { slug: '3' }
      ];
    }
    
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return fallback project slugs for build time
    return [
      { slug: '1' },
      { slug: '2' },
      { slug: '3' }
    ];
  }
}
