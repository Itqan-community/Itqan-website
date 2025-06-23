export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  headerImage?: string;
  contentImage: string;
  description: string;
  importanceTitle: string;
  importanceItems: string[];
  rolesTitle: string;
  rolesItems: string[];
  projectLink?: string;
  projectLinkText: string;
  discordText: string;
  discordLink: string;
  discordImage: string;
  status: 'launched' | 'inProgress' | 'planned';
}

export const projectsData: Record<string, ProjectData> = {
  "1": {
    id: "1",
    title: "1.title",
    subtitle: "1.subtitle",
    headerImage: "1.headerImage",
    contentImage: "1.contentImage",
    description: "1.description",
    importanceTitle: "1.importanceTitle",
    importanceItems: [
      "1.importanceItems.1",
      "1.importanceItems.2", 
      "1.importanceItems.3"
    ],
    rolesTitle: "1.rolesTitle",
    rolesItems: [
      "1.rolesItems.1",
      "1.rolesItems.2",
      "1.rolesItems.3",
      "1.rolesItems.4"
    ],
    projectLink: "1.projectLink",
    projectLinkText: "1.projectLinkText",
    discordText: "1.discordText",
    discordLink: "1.discordLink",
    discordImage: "1.discordImage",
    status: "launched"
  },
  "2": {
    id: "2",
    title: "2.title",
    subtitle: "2.subtitle",
    headerImage: "2.headerImage",
    contentImage: "2.contentImage",
    description: "2.description",
    importanceTitle: "2.importanceTitle",
    importanceItems: [
      "2.importanceItems.1",
      "2.importanceItems.2", 
      "2.importanceItems.3"
    ],
    rolesTitle: "2.rolesTitle",
    rolesItems: [
      "2.rolesItems.1",
      "2.rolesItems.2",
    ],
    projectLink: "",
    projectLinkText: "2.projectLinkText",
    discordText: "2.discordText",
    discordLink: "2.discordLink",
    discordImage: "2.discordImage",
    status: "launched"
  },
  "3": {
    id: "3",
    title: "3.title",
    subtitle: "3.subtitle",
    headerImage: "3.headerImage",
    contentImage: "3.headerImage",
    description: "3.description",
    importanceTitle: "3.importanceTitle",
    importanceItems: [
      "3.importanceItems.1",
      "3.importanceItems.2", 
      "3.importanceItems.3"
    ],
    rolesTitle: "1.rolesTitle",
    rolesItems: [
      "3.rolesItems.1",
      "3.rolesItems.2",
      "3.rolesItems.3"
    ],
    projectLink: "",
    projectLinkText: "3.projectLinkText",
    discordText: "3.discordText",
    discordLink: "3.discordLink",
    discordImage: "3.discordImage",
    status: "launched"
  }
  // Add more projects here as needed
};

export function getProjectById(id: string): ProjectData | undefined {
  return projectsData[id];
}

export function getAllProjects(): ProjectData[] {
  return Object.values(projectsData);
}

export function getProjectIds(): string[] {
  return Object.keys(projectsData);
} 