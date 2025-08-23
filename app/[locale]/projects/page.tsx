import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/sanity/live";
import { Locale } from "@/i18n/routing";
import SafeImage from "../../components/SafeImage";
import { FaCog } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import { urlFor } from "../../sanity/image";
import LinkBtn from "../../components/LinkBtn";

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

  return (
    <section aria-label="Projects" className="py-16 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-[4%] bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-8 sm:mb-12">
          <div className="text-start max-w-[635px] mb-6 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-xl sm:text-2xl text-primary-700 mb-6 sm:mb-0">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        {sortedProjects.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {sortedProjects.map((project: any, index: number) => {
              const title = typeof project.title === 'object' 
                ? project.title[locale] || project.title.en 
                : project.title || 'Project';
              const description = typeof project.description === 'object'
                ? project.description[locale] || project.description.en
                : project.description || '';

              return (
                <Link 
                  key={project.slug?.current || project.name || `project-${index}`}
                  href={`/${locale}/projects/${project.slug?.current || project.name}`}
                  className="flex flex-col rounded-xl overflow-hidden group"
                  aria-label={`${title} - ${project.status === 'launched' ? t("launched") : t("inProgress")}`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-[20px] cursor-pointer">
                    <SafeImage
                      src={getImageUrl(project.image) || '/images/projects/default.jpg'}
                      alt={`${title} - ${description}`}
                      fill
                      className="object-cover rounded-[20px] transition-transform duration-300 group-hover:scale-110"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-col items-start p-4 bg-transparent gap-2">
                    <div className={`text-white text-sm px-2 py-0.5 rounded-full w-fit ${
                      project.status === 'launched' 
                        ? 'bg-green-600' 
                        : 'bg-yellow-600'
                    }`}>
                      {project.status === 'launched' ? t("launched") : t("inProgress")}
                    </div>
                    <h3 className="text-[28px] font-bold text-primary-900">
                      {title}
                    </h3>
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
      </div>
    </section>
  );
}
