import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

type BaseEntry = {
  title: string;
  slug: string;
  summary: string;
  featured: boolean;
  content: string;
  html: string;
};

export type ProjectEntry = BaseEntry & {
  status: string;
  order: number;
  relatedPosts: string[];
  coverImage?: string;
};

export type WritingEntry = BaseEntry & {
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  status: string;
  category: string;
  series?: string;
  tags: string[];
  relatedProjects: string[];
};

export type WritingTaxonomy = {
  categories: string[];
  series: string[];
  tags: string[];
};

export type SiteSummary = {
  totalProjects: number;
  totalPosts: number;
  latestPostTitle: string | null;
};

export type ProjectRecordLink = {
  project: ProjectEntry;
  records: WritingEntry[];
};

export type ProjectRecordMap = Record<string, ProjectRecordLink>;

export type WritingArchiveSections = {
  latest: WritingEntry;
  timeline: WritingEntry[];
  taxonomy: WritingTaxonomy;
  index: {
    seriesCount: number;
    categoryCount: number;
    tagCount: number;
  };
};

export type HomeArchiveSnapshot = {
  latest: WritingEntry | null;
  latestProjects: ProjectEntry[];
  worklines: Array<
    ProjectEntry & {
      recordCount: number;
      latestRecord: WritingEntry | null;
      previewRecords: WritingEntry[];
    }
  >;
  moreEntries: WritingEntry[];
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

async function renderMarkdown(content: string) {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);
  return String(result);
}

function estimateReadingTimeMinutes(content: string) {
  const plain = content.replace(/[`#*_[\]()>-]/g, ' ').replace(/\s+/g, ' ').trim();
  const units = Math.max(plain.length, plain.split(' ').filter(Boolean).length * 4);
  return Math.max(1, Math.ceil(units / 500));
}

async function readEntries<T>(dirName: 'projects' | 'writing'): Promise<T[]> {
  const directory = path.join(CONTENT_ROOT, dirName);
  const fileNames = await fs.readdir(directory);

  const entries = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const raw = await fs.readFile(path.join(directory, fileName), 'utf8');
        const { data, content } = matter(raw);
        const html = await renderMarkdown(content);
        return {
          ...data,
          updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : data.publishedAt,
          readingTimeMinutes: estimateReadingTimeMinutes(content),
          content,
          html,
        } as T;
      }),
  );

  return entries;
}

export async function getProjects() {
  const projects = await readEntries<ProjectEntry>('projects');
  return projects.sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  const normalizedSlug = normalizeSlug(slug);
  return projects.find((project) => project.slug === normalizedSlug) ?? null;
}

export async function getWriting() {
  const posts = await readEntries<WritingEntry>('writing');
  return posts.sort((a, b) => {
    const byDate = b.publishedAt.localeCompare(a.publishedAt);

    if (byDate !== 0) {
      return byDate;
    }

    return b.title.localeCompare(a.title, 'ko');
  });
}

export async function getFeaturedWriting() {
  const posts = await getWriting();
  return posts.filter((post) => post.featured);
}

export async function getWritingTaxonomy(): Promise<WritingTaxonomy> {
  const posts = await getWriting();

  return {
    categories: Array.from(new Set(posts.map((post) => post.category))).sort((a, b) => a.localeCompare(b, 'ko')),
    series: Array.from(new Set(posts.map((post) => post.series).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, 'ko')),
    tags: Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b, 'ko')),
  };
}

export async function getSiteSummary(): Promise<SiteSummary> {
  const [projects, posts] = await Promise.all([getProjects(), getWriting()]);

  return {
    totalProjects: projects.length,
    totalPosts: posts.length,
    latestPostTitle: posts[0]?.title ?? null,
  };
}

export async function getWritingBySlug(slug: string) {
  const posts = await getWriting();
  const normalizedSlug = normalizeSlug(slug);
  return posts.find((post) => post.slug === normalizedSlug) ?? null;
}

export async function getProjectRecordMap(): Promise<ProjectRecordMap> {
  const [projects, posts] = await Promise.all([getProjects(), getWriting()]);

  const projectRecordEntries = projects.map((project) => {
    const explicitRecords = posts.filter((post) => project.relatedPosts.includes(post.slug));
    const fallbackRecords = posts.filter((post) => post.relatedProjects.includes(project.slug));
    const records = explicitRecords.length > 0 ? explicitRecords : fallbackRecords;

    return [project.slug, { project, records }] as const;
  });

  return Object.fromEntries(projectRecordEntries);
}

export async function getWritingArchiveSections(): Promise<WritingArchiveSections> {
  const [posts, taxonomy] = await Promise.all([getWriting(), getWritingTaxonomy()]);
  const [latest, ...timeline] = posts;

  if (!latest) {
    throw new Error('Writing archive requires at least one post');
  }

  return {
    latest,
    timeline,
    taxonomy,
    index: {
      seriesCount: taxonomy.series.length,
      categoryCount: taxonomy.categories.length,
      tagCount: taxonomy.tags.length,
    },
  };
}

export async function getHomeArchiveSnapshot(): Promise<HomeArchiveSnapshot> {
  const [projects, posts, projectRecordMap] = await Promise.all([getProjects(), getWriting(), getProjectRecordMap()]);
  const [latest, ...moreEntries] = posts;

  const latestProjects = latest
    ? projects.filter((project) => latest.relatedProjects.includes(project.slug))
    : [];

  const worklines = Object.values(projectRecordMap).map(({ project, records }) => ({
    ...project,
    recordCount: records.length,
    latestRecord: records[0] ?? null,
    previewRecords: records.slice(0, 2),
  }));

  return {
    latest: latest ?? null,
    latestProjects,
    worklines,
    moreEntries,
  };
}
