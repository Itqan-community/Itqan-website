import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectDetails from "../../../components/ProjectDetails";
import { getProjectById } from "../../../data/projects";
import StructuredData from "@/app/components/StructuredData";

interface ProjectPageProps {
  params: {
    projectId: string;
    locale: string;
  };
}

export async function generateMetadata({ params: { projectId, locale } }: ProjectPageProps): Promise<Metadata> {
  const projectData = getProjectById(projectId);
  
  if (!projectData) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const t = await getTranslations("home.projects");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev';
  
  // Get translated project title and description
  const projectTitle = t(projectData.title);
  const projectDescription = t(projectData.description);
  const projectSubtitle = t(projectData.subtitle);

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
      url: `${baseUrl}/${locale}/projects/${projectId}`,
      siteName: locale === 'ar' ? 'إتقان' : 'ITQAN',
      locale: locale,
      type: 'website',
      images: [
        {
          url: t(projectData.headerImage || projectData.contentImage),
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
      images: [t(projectData.headerImage || projectData.contentImage)],
    },
    alternates: {
      canonical: `/${locale}/projects/${projectId}`,
      languages: {
        'ar': `/ar/projects/${projectId}`,
        'en': `/en/projects/${projectId}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId, locale } = params;
  
  // Get project data from centralized data source
  const projectData = getProjectById(projectId);
  
  // Check if project exists
  if (!projectData) {
    notFound();
  }

  const t = await getTranslations("home.projects");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://itqan.dev';

  // Prepare structured data for the project
  const structuredData = {
    title: t(projectData.title),
    description: t(projectData.description),
    projectLink: projectData.projectLink,
    url: `${baseUrl}/${locale}/projects/${projectId}`,
  };

  return (
    <>
      <StructuredData type="project" data={structuredData} />
      <ProjectDetails {...projectData} locale={locale} />
    </>
  );
}

// Generate static params for known projects
export async function generateStaticParams() {
  const { getProjectIds } = await import("../../../data/projects");
  const ids = getProjectIds();
  
  // Generate params for both locales
  const params = [];
  for (const projectId of ids) {
    params.push({ projectId, locale: "ar" });
    params.push({ projectId, locale: "en" });
  }
  
  return params;
} 