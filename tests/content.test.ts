import { describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  getHomeArchiveSnapshot,
  getProjectBySlug,
  getProjectRecordMap,
  getProjects,
  getWriting,
  resolveProjectRecords,
  getWritingArchiveSections,
  getWritingBySlug,
  getWritingTaxonomy,
} from '@/lib/content';

describe('content loader', () => {
  it('returns projects ordered by order ascending', async () => {
    const projects = await getProjects();

    expect(projects.map((project) => project.slug)).toEqual([
      'ggumul-dinner-grocery',
      'wanderer',
      'trpg',
      'hanoi',
      'color-hanoi',
    ]);
    expect(projects.every((project) => project.featured)).toBe(true);
  });

  it('returns writing ordered by published date descending with featured flags in content metadata', async () => {
    const posts = await getWriting();

    expect(posts.map((post) => post.slug)).toEqual([
      'ggumul-dinner-grocery-가격-계약-정리',
      'runtime-화면-확인-기록',
      'wanderer-sync-연결-문제-분석',
      '4월-프로젝트-개발-현황',
      'wanderer-초기-설계-회고',
      '제작-리듬을-우선하는-이유',
    ]);
    expect(posts.filter((post) => post.featured)).toHaveLength(5);
  });

  it('finds project by slug and exposes related posts', async () => {
    const project = await getProjectBySlug('wanderer');

    expect(project?.title).toBe('Wanderer');
    expect(project?.relatedPosts).toContain('wanderer-초기-설계-회고');
  });

  it('finds writing by slug and exposes related projects', async () => {
    const post = await getWritingBySlug('4월-프로젝트-개발-현황');

    expect(post?.title).toBe('Wanderer와 퍼즐을 한 화면에서 고르게 나눴다');
    expect(post?.relatedProjects).toContain('trpg');
    expect(post?.readingTimeMinutes).toBeGreaterThan(0);
    expect(post?.updatedAt).toBe('2026-04-20');
  });

  it('supports url-encoded slugs for writing detail routes', async () => {
    const post = await getWritingBySlug('wanderer-%EC%B4%88%EA%B8%B0-%EC%84%A4%EA%B3%84-%ED%9A%8C%EA%B3%A0');

    expect(post?.title).toBe('왜 Wanderer는 짧은 카드 게임으로 남았나');
  });

  it('keeps the first runtime writing title framed around a concrete gameplay problem', async () => {
    const post = await getWritingBySlug('runtime-화면-확인-기록');

    expect(post?.title).toBe('폰에서 한 턴이 더 자연스럽게 이어지게 다듬었다');
    expect(post?.summary).toContain('다음 상황이 바로 읽히도록');
    expect(post?.summary).not.toContain('정리했습니다');
  });

  it('returns category, tags, and series data for writing taxonomy', async () => {
    const taxonomy = await getWritingTaxonomy();

    expect(taxonomy.categories).toContain('게임 소개');
    expect(taxonomy.categories).toContain('만드는 기준');
    expect(taxonomy.categories).toContain('연결 문제');
    expect(taxonomy.categories).toContain('플레이 화면');
    expect(taxonomy.series).toContain('4월 작업');
    expect(taxonomy.series).toContain('꼬물 노트');
    expect(taxonomy.series).toContain('Wanderer 로그');
    expect(taxonomy.series).toContain('GGUMUL Dinner Grocery');
    expect(taxonomy.tags).toContain('게임');
    expect(taxonomy.tags).toContain('제작 리듬');
  });

  it('builds a home archive snapshot with latest post, related projects, project list, and remaining entries', async () => {
    const snapshot = await getHomeArchiveSnapshot();

    expect(snapshot.latest?.slug).toBe('ggumul-dinner-grocery-가격-계약-정리');
    expect(snapshot.latestProjects.map((project) => project.slug)).toEqual(['ggumul-dinner-grocery']);
    expect(snapshot.worklines).toHaveLength(5);
    expect(snapshot.worklines[0]?.recordCount).toBe(1);
    expect(snapshot.worklines[0]?.previewRecords.map((record) => record.slug)).toEqual([
      'ggumul-dinner-grocery-가격-계약-정리',
    ]);
    expect(snapshot.moreEntries.map((entry) => entry.slug)).toEqual([
      'runtime-화면-확인-기록',
      'wanderer-sync-연결-문제-분석',
      '4월-프로젝트-개발-현황',
      'wanderer-초기-설계-회고',
      '제작-리듬을-우선하는-이유',
    ]);
  });

  it('builds writing archive sections with latest entry, timeline entries, and index density', async () => {
    const sections = await getWritingArchiveSections();

    expect(sections.latest.slug).toBe('ggumul-dinner-grocery-가격-계약-정리');
    expect(sections.timeline).toHaveLength(5);
    expect(sections.timeline[0]?.slug).toBe('runtime-화면-확인-기록');
    expect(sections.index.seriesCount).toBe(5);
    expect(sections.index.categoryCount).toBe(6);
    expect(sections.index.tagCount).toBeGreaterThan(7);
  });

  it('builds project record map from related posts', async () => {
    const projectRecordMap = await getProjectRecordMap();

    expect(projectRecordMap['ggumul-dinner-grocery'].records.map((record) => record.slug)).toEqual([
      'ggumul-dinner-grocery-가격-계약-정리',
    ]);
    expect(projectRecordMap.wanderer.project.title).toBe('Wanderer');
    expect(projectRecordMap.wanderer.records.map((record) => record.slug)).toEqual([
      'runtime-화면-확인-기록',
      'wanderer-sync-연결-문제-분석',
      'wanderer-초기-설계-회고',
    ]);
    expect(projectRecordMap.hanoi.records.map((record) => record.slug)).toContain('runtime-화면-확인-기록');
    expect(projectRecordMap.trpg.records.map((record) => record.slug)).toContain('4월-프로젝트-개발-현황');
  });

  it('resolves explicit project records before falling back to post relatedProjects', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const wanderer = projects.find((project) => project.slug === 'wanderer');
    const trpg = projects.find((project) => project.slug === 'trpg');

    expect(wanderer).toBeDefined();
    expect(trpg).toBeDefined();
    expect(resolveProjectRecords(wanderer!, posts).map((post) => post.slug)).toEqual(wanderer!.relatedPosts);
    expect(resolveProjectRecords(trpg!, posts).map((post) => post.slug)).toEqual([
      '4월-프로젝트-개발-현황',
    ]);
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

  it('keeps project/post relationships, cover assets, and operational card metadata resolvable', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const postSlugs = new Set(posts.map((post) => post.slug));
    const allowedProgressStatuses = new Set(['플레이 확인', '미리보기', '계약 점검 중', '보류']);

    for (const project of projects) {
      expect(project.relatedPosts.every((slug) => postSlugs.has(slug))).toBe(true);
      expect(allowedProgressStatuses.has(project.progressStatus)).toBe(true);
      expect(project.verificationNote.length).toBeGreaterThanOrEqual(8);
      expect(project.nextStep.length).toBeGreaterThanOrEqual(8);
      expect(project.evidenceLabel.length).toBeGreaterThanOrEqual(4);
      expect(project.evidenceHref).toMatch(/^\/(writing|projects)\//);

      if (project.coverImage) {
        expect(fs.existsSync(path.join(process.cwd(), 'public', project.coverImage.replace(/^\//, '')))).toBe(true);
      }
    }

    for (const post of posts) {
      expect(post.relatedProjects.every((slug) => projectSlugs.has(slug))).toBe(true);
    }
  });
});
