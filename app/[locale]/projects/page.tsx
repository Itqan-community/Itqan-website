import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import SafeImage from "../../components/SafeImage";
import { FaCog } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import { urlFor } from "../../sanity/image";

const PROJECTS_QUERY = defineQuery(`*[_type == "project"]{
  name,
  slug,
  title,
  description,
  status,
  image{
    _type,
    alt,
    caption,
    asset->
  }
}`);

interface ProjectsPageProps {
  params: { locale: Locale };
}

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function ProjectsPage({ params: { locale } }: ProjectsPageProps) {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const t = await getTranslations("home.projects");

  // Helper function to safely get image URL
  const getImageUrl = (image: any) => {
    try {
      if (!image || !image.asset) return null;
      return urlFor(image).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return null;
    }
  };

  // Ensure projects is an array and filter out invalid projects
  const validProjects = Array.isArray(projects) 
    ? projects.filter((project: any) => project && project.name && project.title)
    : [];

  // Sort projects: launched first, then in-progress
  const sortedProjects = validProjects.sort((a: any, b: any) => {
    if (a.status === 'launched' && b.status !== 'launched') return -1;
    if (a.status !== 'launched' && b.status === 'launched') return 1;
    return 0;
  });

  // Get the first project (launched) for the main card
  const mainProject = sortedProjects[0];
  const otherProjects = sortedProjects.slice(1);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-100 w-full max-w-7xl mx-auto flex flex-col items-center" id="projects">
      <div className="flex flex-col items-center mb-8 sm:mb-12 w-full">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center max-w-max px-3 py-1 rounded-full gap-2 text-neutral-100 bg-neutral-900">
            <span className="text-sm font-medium rounded-full">{t("badge")}</span>
            <FaCog size={16} />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary-900 leading-relaxed text-center">
            {t("headline")}
          </h1>
        </div>
      </div>

      {/* Main Project Card */}
      {mainProject && (
        <div className="w-full flex mb-6 sm:mb-8">
          <Link 
            href={`/${locale}/projects/${mainProject.slug?.current || mainProject.name}`} 
            className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow w-full rounded-xl"
          >
            <div className="relative aspect-video w-full">
              <SafeImage
                src={getImageUrl(mainProject.image) || '/images/projects/default.jpg'}
                alt={typeof mainProject.title === 'object' ? mainProject.title[locale] || mainProject.title.en : mainProject.title || 'Project'}
                fill
                className="object-cover object-[27%_64%] rounded-xl border border-neutral-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
                priority
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-6">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-900">
                {typeof mainProject.title === 'object' 
                  ? mainProject.title[locale] || mainProject.title.en 
                  : mainProject.title || 'Project'}
              </h4>
              <div className="bg-primary-800 opacity-60 text-white text-sm px-2 py-0.5 rounded-full w-fit">
                {mainProject.status === 'launched' ? t("launched") : t("inProgress")}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="w-full flex flex-col lg:flex-row justify-between gap-4 sm:gap-6">
          {otherProjects.map((project: any) => {
            const title = typeof project.title === 'object' 
              ? project.title[locale] || project.title.en 
              : project.title || 'Project';

            return (
              <Link 
                key={project.slug?.current || project.name || `project-${Math.random()}`}
                href={`/${locale}/projects/${project.slug?.current || project.name}`} 
                className="group flex flex-col overflow-hidden hover:shadow-2xl transition-shadow rounded-xl cursor-pointer flex-1"
              >
                <div className="relative aspect-video w-full">
                  <SafeImage
                    src={getImageUrl(project.image) || '/images/projects/default.jpg'}
                    alt={title}
                    fill
                    className="object-cover rounded-xl border border-neutral-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-900">
                    {title}
                  </h4>
                  <div className="bg-primary-800 opacity-60 text-white text-sm px-2 py-0.5 rounded-full w-fit">
                    {project.status === 'launched' ? t("launched") : t("inProgress")}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* No projects message */}
      {validProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-600 text-lg">No projects available at the moment.</p>
        </div>
      )}
    </section>
  );
}
