import { describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  getFeaturedProjects,
  getFeaturedWriting,
  getHomeArchiveSnapshot,
  getProjectBySlug,
  getProjectRecordMap,
  getProjects,
  getSiteSummary,
  getWriting,
  getWritingArchiveSections,
  getWritingBySlug,
  getWritingTaxonomy,
} from '@/lib/content';

describe('content loader', () => {
  it('returns featured projects ordered by order ascending', async () => {
    const projects = await getFeaturedProjects();

    expect(projects.map((project) => project.slug)).toEqual([
      'wanderer',
      'trpg',
      'hanoi',
      'color-hanoi',
    ]);
  });

  it('returns featured writing ordered by published date descending', async () => {
    const posts = await getFeaturedWriting();

    expect(posts).toHaveLength(4);
    expect(posts.every((post) => post.featured)).toBe(true);
  });

  it('finds project by slug and exposes related posts', async () => {
    const project = await getProjectBySlug('wanderer');

    expect(project?.title).toBe('Wanderer');
    expect(project?.relatedPosts).toContain('wanderer-초기-설계-회고');
  });

  it('finds writing by slug and exposes related projects', async () => {
    const post = await getWritingBySlug('4월-프로젝트-개발-현황');

    expect(post?.title).toBe('4월 프로젝트 개발 현황');
    expect(post?.relatedProjects).toContain('trpg');
    expect(post?.readingTimeMinutes).toBeGreaterThan(0);
    expect(post?.updatedAt).toBe('2026-04-20');
  });

  it('supports url-encoded slugs for writing detail routes', async () => {
    const post = await getWritingBySlug('wanderer-%EC%B4%88%EA%B8%B0-%EC%84%A4%EA%B3%84-%ED%9A%8C%EA%B3%A0');

    expect(post?.title).toBe('Wanderer 초기 설계 회고');
  });

  it('returns category, tags, and series data for writing taxonomy', async () => {
    const taxonomy = await getWritingTaxonomy();

    expect(taxonomy.categories).toContain('프로젝트 소개');
    expect(taxonomy.categories).toContain('스튜디오 노트');
    expect(taxonomy.categories).toContain('시스템 노트');
    expect(taxonomy.series).toContain('4월 작업');
    expect(taxonomy.series).toContain('꼬물 노트');
    expect(taxonomy.series).toContain('Wanderer 로그');
    expect(taxonomy.tags).toContain('게임 개발');
    expect(taxonomy.tags).toContain('제작 리듬');
  });

  it('returns site summary counts and latest post title for the blog home', async () => {
    const summary = await getSiteSummary();

    expect(summary.totalProjects).toBe(4);
    expect(summary.totalPosts).toBe(5);
    expect(summary.latestPostTitle).toBe('실행 화면을 다시 확인한 기록');
  });

  it('builds a home archive snapshot with latest post, related projects, project list, and remaining entries', async () => {
    const snapshot = await getHomeArchiveSnapshot();

    expect(snapshot.latest?.slug).toBe('runtime-화면-확인-기록');
    expect(snapshot.latestProjects.map((project) => project.slug)).toEqual(['wanderer', 'hanoi']);
    expect(snapshot.worklines).toHaveLength(4);
    expect(snapshot.worklines[0]?.recordCount).toBe(3);
    expect(snapshot.worklines[0]?.previewRecords.map((record) => record.slug)).toEqual([
      'runtime-화면-확인-기록',
      'wanderer-sync-연결-문제-분석',
    ]);
    expect(snapshot.moreEntries.map((entry) => entry.slug)).toEqual([
      'wanderer-sync-연결-문제-분석',
      'wanderer-초기-설계-회고',
      '제작-리듬을-우선하는-이유',
      '4월-프로젝트-개발-현황',
    ]);
  });

  it('builds writing archive sections with latest entry, timeline entries, and index density', async () => {
    const sections = await getWritingArchiveSections();

    expect(sections.latest.slug).toBe('runtime-화면-확인-기록');
    expect(sections.timeline).toHaveLength(4);
    expect(sections.timeline[0]?.slug).toBe('wanderer-sync-연결-문제-분석');
    expect(sections.index.seriesCount).toBe(4);
    expect(sections.index.categoryCount).toBe(5);
    expect(sections.index.tagCount).toBeGreaterThan(7);
  });

  it('builds project record map from related posts', async () => {
    const projectRecordMap = await getProjectRecordMap();

    expect(projectRecordMap.wanderer.project.title).toBe('Wanderer');
    expect(projectRecordMap.wanderer.records.map((record) => record.slug)).toEqual([
      'runtime-화면-확인-기록',
      'wanderer-sync-연결-문제-분석',
      'wanderer-초기-설계-회고',
    ]);
    expect(projectRecordMap.hanoi.records.map((record) => record.slug)).toContain('runtime-화면-확인-기록');
    expect(projectRecordMap.trpg.records.map((record) => record.slug)).toContain('4월-프로젝트-개발-현황');
  });

  it('keeps writing entries dense enough to read as development records', async () => {
    const posts = await getWriting();

    for (const post of posts) {
      const paragraphCount = post.content.split(/\n{2,}/).filter((paragraph) => paragraph.trim().length > 0).length;

      expect(post.content.length).toBeGreaterThanOrEqual(1200);
      expect(paragraphCount).toBeGreaterThanOrEqual(8);
      expect(post.content).toMatch(/## /);
    }
  });

  it('keeps project/post relationships and cover assets resolvable', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const postSlugs = new Set(posts.map((post) => post.slug));

    for (const project of projects) {
      expect(project.relatedPosts.every((slug) => postSlugs.has(slug))).toBe(true);

      if (project.coverImage) {
        expect(fs.existsSync(path.join(process.cwd(), 'public', project.coverImage.replace(/^\//, '')))).toBe(true);
      }
    }

    for (const post of posts) {
      expect(post.relatedProjects.every((slug) => projectSlugs.has(slug))).toBe(true);
    }
  });
});
