export interface Article {
  id: string;
  title: string;
  subtitle: string;
  headerImage?: string;
  contentImage: string;
  description: string;
  author: string;
  publishDate: string;
  readTime: string;
  sections?: {
    title: string;
    content: string;
  }[];
  keyPointsTitle: string;
  keyPoints: string[];
  conclusionTitle: string;
  conclusion: string;
  externalLink?: string;
  externalLinkText: string;
  discordText: string;
  discordLink: string;
  discordImage: string;
}

const articles: Record<string, Article> = {
  "opensource-license": {
    id: "opensource-license",
    title: "opensourceLicense.title",
    subtitle: "opensourceLicense.subtitle",
    headerImage: "opensourceLicense.headerImage",
    contentImage: "opensourceLicense.image",
    description: "opensourceLicense.description",
    author: "opensourceLicense.author",
    publishDate: "opensourceLicense.publishDate",
    readTime: "opensourceLicense.readTime",
    sections: [
      {
        title: "opensourceLicense.sections.overview.title",
        content: "opensourceLicense.sections.overview.content"
      },
      {
        title: "opensourceLicense.sections.importance.title",
        content: "opensourceLicense.sections.importance.content"
      },
      {
        title: "opensourceLicense.sections.implementation.title",
        content: "opensourceLicense.sections.implementation.content"
      }
    ],
    keyPointsTitle: "opensourceLicense.keyPointsTitle",
    keyPoints: [
      "opensourceLicense.keyPoints.1",
      "opensourceLicense.keyPoints.2",
      "opensourceLicense.keyPoints.3",
      "opensourceLicense.keyPoints.4"
    ],
    conclusionTitle: "opensourceLicense.conclusionTitle",
    conclusion: "opensourceLicense.conclusion",
    externalLink: "opensourceLicense.link",
    externalLinkText: "opensourceLicense.externalLinkText",
    discordText: "opensourceLicense.discordText",
    discordLink: "opensourceLicense.discordLink",
    discordImage: "opensourceLicense.discordImage"
  },
  "development-guide": {
    id: "development-guide",
    title: "developmentGuide.title",
    subtitle: "developmentGuide.description",
    headerImage: "developmentGuide.headerImage",
    contentImage: "developmentGuide.image",
    description: "developmentGuide.description",
    author: "developmentGuide.author",
    publishDate: "developmentGuide.publishDate",
    readTime: "developmentGuide.readTime",
    sections: [
      {
        title: "developmentGuide.sections.introduction.title",
        content: "developmentGuide.sections.introduction.content"
      },
      {
        title: "developmentGuide.sections.resources.title",
        content: "developmentGuide.sections.resources.content"
      },
      {
        title: "developmentGuide.sections.bestPractices.title",
        content: "developmentGuide.sections.bestPractices.content"
      }
    ],
    keyPointsTitle: "developmentGuide.keyPointsTitle",
    keyPoints: [
      "developmentGuide.keyPoints.1",
      "developmentGuide.keyPoints.2",
      "developmentGuide.keyPoints.3",
      "developmentGuide.keyPoints.4"
    ],
    conclusionTitle: "developmentGuide.conclusion",
    conclusion: "developmentGuide.conclusion",
    externalLink: "developmentGuide.link",
    externalLinkText: "developmentGuide.externalLinkText",
    discordText: "developmentGuide.discordText",
    discordLink: "developmentGuide.discordLink",
    discordImage: "developmentGuide.discordImage"
  },
  "evaluation-guide": {
    id: "evaluation-guide",
    title: "evaluationGuide.title",
    subtitle: "evaluationGuide.subtitle",
    headerImage: "evaluationGuide.headerImage",
    contentImage: "evaluationGuide.image",
    description: "evaluationGuide.description",
    author: "evaluationGuide.author",
    publishDate: "evaluationGuide.publishDate",
    readTime: "evaluationGuide.readTime",
    sections: [
      {
        title: "evaluationGuide.sections.overview.title",
        content: "evaluationGuide.sections.overview.content"
      },
      {
        title: "evaluationGuide.sections.criteria.title",
        content: "evaluationGuide.sections.criteria.content"
      },
      {
        title: "evaluationGuide.sections.methodology.title",
        content: "evaluationGuide.sections.methodology.content"
      }
    ],
    keyPointsTitle: "evaluationGuide.keyPointsTitle",
    keyPoints: [
      "evaluationGuide.keyPoints.1",
      "evaluationGuide.keyPoints.2",
      "evaluationGuide.keyPoints.3",
      "evaluationGuide.keyPoints.4"
    ],
    conclusionTitle: "evaluationGuide.conclusionTitle",
    conclusion: "evaluationGuide.conclusion",
    externalLink: "evaluationGuide.link",
    externalLinkText: "evaluationGuide.externalLinkText",
    discordText: "evaluationGuide.discordText",
    discordLink: "evaluationGuide.discordLink",
    discordImage: "evaluationGuide.discordImage"
  }
};

export function getArticleById(id: string): Article | undefined {
  return articles[id];
}

export function getAllArticles(): Article[] {
  return Object.values(articles);
} 