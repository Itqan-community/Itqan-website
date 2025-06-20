import { notFound } from "next/navigation";
import ProjectDetails from "../../../components/ProjectDetails";
import { getProjectById } from "../../../data/projects";

interface ProjectPageProps {
  params: {
    projectId: string;
    locale: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { projectId, locale } = params;
  
  // Get project data from centralized data source
  const projectData = getProjectById(projectId);
  
  // Check if project exists
  if (!projectData) {
    notFound();
  }

  return <ProjectDetails {...projectData} locale={locale} />;
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