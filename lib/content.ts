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
  lastUpdated: string;
  order: number;
  relatedPosts: string[];
  coverImage?: string;
};

export type NotionSource = {
  pageId: string;
  url: string;
  title: string;
  status: string;
};

export type WritingEntry = BaseEntry & {
  notionSource: NotionSource;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  status: string;
  category: string;
  series?: string;
  tags: string[];
  relatedProjects: string[];
};

export type WorkTrace = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  publishedAt: string;
  type: string;
  status: string;
  projectSlug: string | null;
  projectTitle: string;
  workline: string;
};

export type WritingTaxonomy = {
  categories: string[];
  series: string[];
  tags: string[];
};

export type ProjectRecordLink = {
  project: ProjectEntry;
  records: WritingEntry[];
};

export type ProjectRecordMap = Record<string, ProjectRecordLink>;

export type WritingArchiveSections = {
  latest: WritingEntry | null;
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
  latestTrace: WorkTrace | null;
  traces: WorkTrace[];
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

const legacyWritingSlugMap: Record<string, string> = {
  'ggumul-dinner-grocery-\uac00\uaca9-\uacc4\uc57d-\uc815\ub9ac': 'dinner-grocery-price',
  'runtime-\ud654\uba74-\ud655\uc778-\uae30\ub85d': 'wanderer-one-card',
  'wanderer-sync-\uc5f0\uacb0-\ubb38\uc81c-\ubd84\uc11d': 'wanderer-same-turn',
  '4\uc6d4-\ud504\ub85c\uc81d\ud2b8-\uac1c\ubc1c-\ud604\ud669': 'small-games-first-move',
  'wanderer-\ucd08\uae30-\uc124\uacc4-\ud68c\uace0': 'wanderer-short-card-game',
  '\uc81c\uc791-\ub9ac\ub4ec\uc744-\uc6b0\uc120\ud558\ub294-\uc774\uc720': 'small-games-rhythm',
};

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function normalizeWritingSlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  return legacyWritingSlugMap[normalizedSlug] ?? normalizedSlug;
}

async function renderMarkdown(content: string) {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);
  return String(result);
}

function estimateReadingTimeMinutes(content: string) {
  const plain = content.replace(/[`#*_\[\]()>-]/g, ' ').replace(/\s+/g, ' ').trim();
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

function formatTraceType(post: WritingEntry) {
  return post.category || post.status || '글';
}

function deriveWorkTrace(post: WritingEntry, projects: ProjectEntry[]): WorkTrace {
  const project = projects.find((entry) => post.relatedProjects.includes(entry.slug));
  return {
    slug: post.slug,
    href: `/writing/${post.slug}`,
    title: post.title,
    summary: post.summary,
    publishedAt: post.publishedAt,
    type: formatTraceType(post),
    status: post.status,
    projectSlug: project?.slug ?? null,
    projectTitle: project?.title ?? '꼬물',
    workline: project ? `${project.title} · ${project.status}` : post.status,
  };
}

function withProjectWorkline(project: ProjectEntry, records: WritingEntry[]): ProjectEntry {
  const latestRecord = records[0];
  const lastUpdated = latestRecord?.publishedAt ?? project.lastUpdated ?? '2026-01-01';

  return {
    ...project,
    lastUpdated,
  };
}

export async function getProjects() {
  const projects = await readEntries<ProjectEntry>('projects');
  return projects.sort((a, b) => a.order - b.order);
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

export async function getWritingTaxonomy(): Promise<WritingTaxonomy> {
  const posts = await getWriting();

  return {
    categories: Array.from(new Set(posts.map((post) => post.category))).sort((a, b) => a.localeCompare(b, 'ko')),
    series: Array.from(new Set(posts.map((post) => post.series).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, 'ko')),
    tags: Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b, 'ko')),
  };
}

export async function getWritingBySlug(slug: string) {
  const posts = await getWriting();
  const normalizedSlug = normalizeWritingSlug(slug);
  return posts.find((post) => post.slug === normalizedSlug) ?? null;
}

export function resolveProjectRecords(project: ProjectEntry, posts: WritingEntry[]) {
  const explicitRecords = posts.filter((post) => project.relatedPosts.includes(post.slug));
  const fallbackRecords = posts.filter((post) => post.relatedProjects.includes(project.slug));
  return explicitRecords.length > 0 ? explicitRecords : fallbackRecords;
}

export async function getProjectRecordMap(): Promise<ProjectRecordMap> {
  const [projects, posts] = await Promise.all([getProjects(), getWriting()]);

  const projectRecordEntries = projects.map((project) => {
    const records = resolveProjectRecords(project, posts);
    return [project.slug, { project: withProjectWorkline(project, records), records }] as const;
  });

  return Object.fromEntries(projectRecordEntries);
}

export async function getWritingArchiveSections(): Promise<WritingArchiveSections> {
  const [posts, taxonomy] = await Promise.all([getWriting(), getWritingTaxonomy()]);
  const [latest, ...timeline] = posts;

  return {
    latest: latest ?? null,
    timeline,
    taxonomy,
    index: {
      seriesCount: taxonomy.series.length,
      categoryCount: taxonomy.categories.length,
      tagCount: taxonomy.tags.length,
    },
  };
}

export async function getWorkTraces(): Promise<WorkTrace[]> {
  const [posts, projects] = await Promise.all([getWriting(), getProjects()]);
  return posts.map((post) => deriveWorkTrace(post, projects));
}

export async function getHomeArchiveSnapshot(): Promise<HomeArchiveSnapshot> {
  const [projects, posts, projectRecordMap, traces] = await Promise.all([
    getProjects(),
    getWriting(),
    getProjectRecordMap(),
    getWorkTraces(),
  ]);
  const [latest, ...moreEntries] = posts;
  const [latestTrace, ...restTraces] = traces;

  const latestProjects = latest
    ? projects.filter((project) => latest.relatedProjects.includes(project.slug))
    : [];

  const worklines = Object.values(projectRecordMap)
    .map(({ project, records }) => ({
      ...project,
      recordCount: records.length,
      latestRecord: records[0] ?? null,
      previewRecords: records.slice(0, 2),
    }))
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));

  return {
    latest: latest ?? null,
    latestTrace: latestTrace ?? null,
    traces: restTraces,
    latestProjects,
    worklines,
    moreEntries,
  };
}
