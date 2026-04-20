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
};

export type WritingEntry = BaseEntry & {
  publishedAt: string;
  status: string;
  relatedProjects: string[];
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');

async function renderMarkdown(content: string) {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return String(result);
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
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getWriting() {
  const posts = await readEntries<WritingEntry>('writing');
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getFeaturedWriting() {
  const posts = await getWriting();
  return posts.filter((post) => post.featured);
}

export async function getWritingBySlug(slug: string) {
  const posts = await getWriting();
  return posts.find((post) => post.slug === slug) ?? null;
}
