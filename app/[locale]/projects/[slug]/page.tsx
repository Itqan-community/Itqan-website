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

export async function generateMetadata({ params: { slug, locale } }: ProjectPageProps): Promise<Metadata> {
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev';
  
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
      images: project.image ? [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(projectTitle)}`,
          width: 1200,
          height: 630,
          alt: projectTitle,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: projectTitle,
      description: projectDescription,
      images: project.image ? [`${baseUrl}/api/og?title=${encodeURIComponent(projectTitle)}`] : [],
    },
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        'ar': `/ar/projects/${slug}`,
        'en': `/en/projects/${slug}`,
      },
    },
  };
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
    
    // Generate params for both locales
    const params = [];
    for (const project of projects) {
      if (project.slug?.current) {
        params.push({ slug: project.slug.current, locale: "ar" });
        params.push({ slug: project.slug.current, locale: "en" });
      }
    }
    
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
