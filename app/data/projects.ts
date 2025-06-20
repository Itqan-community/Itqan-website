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
  projectLink: string;
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
    title: "تقنية البحث المتقدم في القرآن الكريم",
    subtitle: "مشروع لتطوير تقنيات بحث متقدمة في القرآن الكريم",
    contentImage: "https://framerusercontent.com/images/jQwDDtFkcNRmtUabxjTAr3LI6k.jpg",
    description: "مشروع لتطوير تقنيات بحث متقدمة في القرآن الكريم تمكن المستخدمين من البحث بطريقة ذكية وفعالة.",
    importanceTitle: "أهمية المشروع:",
    importanceItems: [
      "تحسين تجربة البحث في القرآن الكريم.",
      "توفير أدوات بحث متقدمة للمستخدمين.",
      "تسهيل الوصول للآيات والتفسيرات."
    ],
    rolesTitle: "أدوار مطلوبة:",
    rolesItems: [
      "مطوري الذكاء الاصطناعي.",
      "مطوري واجهات المستخدم.",
      "متخصصون في معالجة اللغة العربية.",
      "باحثون في علوم القرآن."
    ],
    projectLink: "https://example.com/advanced-search",
    projectLinkText: "رابط المشروع",
    discordText: "انضم لمجتمعنا على",
    discordLink: "https://discord.gg/24CskUbuuB",
    discordImage: "https://framerusercontent.com/images/Ri5w6GeCX6EnuInjlzF0MBTw.png",
    status: "inProgress"
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