import { describe, expect, it } from 'vitest';
import {
  getFeaturedProjects,
  getFeaturedWriting,
  getHomeArchiveSnapshot,
  getProjectBySlug,
  getProjectRecordMap,
  getSiteSummary,
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

    expect(posts).toHaveLength(3);
    expect(posts.every((post) => post.featured)).toBe(true);
  });

  it('finds project by slug and exposes related posts', async () => {
    const project = await getProjectBySlug('wanderer');

    expect(project?.title).toBe('Wanderer');
    expect(project?.relatedPosts).toContain('wanderer는-꼬물의-출발점-같은-게임이었다');
  });

  it('finds writing by slug and exposes related projects', async () => {
    const post = await getWritingBySlug('요즘-이런-게임들을-만들고-있어요');

    expect(post?.title).toBe('현재 진행 중인 프로젝트 소개');
    expect(post?.relatedProjects).toContain('trpg');
  });

  it('supports url-encoded slugs for writing detail routes', async () => {
    const post = await getWritingBySlug('wanderer%EB%8A%94-%EA%BC%AC%EB%AC%BC%EC%9D%98-%EC%B6%9C%EB%B0%9C%EC%A0%90-%EA%B0%99%EC%9D%80-%EA%B2%8C%EC%9E%84%EC%9D%B4%EC%97%88%EB%8B%A4');

    expect(post?.title).toBe('Wanderer가 꼬물의 출발점으로 남아 있는 이유');
  });

  it('returns category, tags, and series data for writing taxonomy', async () => {
    const taxonomy = await getWritingTaxonomy();

    expect(taxonomy.categories).toContain('작업 기록');
    expect(taxonomy.categories).toContain('작업 철학');
    expect(taxonomy.series).toContain('개발기록');
    expect(taxonomy.series).toContain('프로젝트 회고');
    expect(taxonomy.tags).toContain('게임 개발');
    expect(taxonomy.tags).toContain('제작 리듬');
  });

  it('returns site summary counts and latest post title for the blog home', async () => {
    const summary = await getSiteSummary();

    expect(summary.totalProjects).toBe(4);
    expect(summary.totalPosts).toBe(4);
    expect(summary.latestPostTitle).toBe('Wanderer sync 연결 문제 분석');
  });

  it('builds a home archive snapshot with latest trace, related projects, richer worklines, and remaining entries', async () => {
    const snapshot = await getHomeArchiveSnapshot();

    expect(snapshot.latest?.slug).toBe('wanderer-sync는-왜-안-붙었냐');
    expect(snapshot.latestProjects.map((project) => project.slug)).toEqual(['wanderer']);
    expect(snapshot.worklines).toHaveLength(4);
    expect(snapshot.worklines[0]?.recordCount).toBe(2);
    expect(snapshot.worklines[0]?.previewRecords.map((record) => record.slug)).toEqual([
      'wanderer-sync는-왜-안-붙었냐',
      'wanderer는-꼬물의-출발점-같은-게임이었다',
    ]);
    expect(snapshot.moreEntries.map((entry) => entry.slug)).toEqual([
      'wanderer는-꼬물의-출발점-같은-게임이었다',
      '요즘-이런-게임들을-만들고-있어요',
      '우리는-왜-이렇게-천천히-만들고-있냐',
    ]);
  });

  it('builds writing archive sections with latest entry, timeline entries, and index density', async () => {
    const sections = await getWritingArchiveSections();

    expect(sections.latest.slug).toBe('wanderer-sync는-왜-안-붙었냐');
    expect(sections.timeline).toHaveLength(3);
    expect(sections.timeline[0]?.slug).toBe('wanderer는-꼬물의-출발점-같은-게임이었다');
    expect(sections.index.seriesCount).toBe(2);
    expect(sections.index.categoryCount).toBe(3);
    expect(sections.index.tagCount).toBeGreaterThan(7);
  });

  it('builds project record map from related posts', async () => {
    const projectRecordMap = await getProjectRecordMap();

    expect(projectRecordMap.wanderer.project.title).toBe('Wanderer');
    expect(projectRecordMap.wanderer.records.map((record) => record.slug)).toEqual([
      'wanderer-sync는-왜-안-붙었냐',
      'wanderer는-꼬물의-출발점-같은-게임이었다',
    ]);
    expect(projectRecordMap.trpg.records.map((record) => record.slug)).toContain('요즘-이런-게임들을-만들고-있어요');
  });
});
