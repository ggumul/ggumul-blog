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

    expect(post?.title).toBe('첫 선택이 게임의 흐름을 바꿉니다');
    expect(post?.relatedProjects).toContain('trpg');
    expect(post?.readingTimeMinutes).toBeGreaterThan(0);
    expect(post?.updatedAt).toBe('2026-04-20');
  });

  it('supports url-encoded slugs for writing detail routes', async () => {
    const post = await getWritingBySlug('wanderer-%EC%B4%88%EA%B8%B0-%EC%84%A4%EA%B3%84-%ED%9A%8C%EA%B3%A0');

    expect(post?.title).toBe('왜 Wanderer는 짧은 카드 게임으로 남았나');
  });

  it('keeps the first runtime writing title framed around a concrete gameplay moment', async () => {
    const post = await getWritingBySlug('runtime-화면-확인-기록');

    expect(post?.title).toBe('고른 순간, 승부가 갈립니다');
    expect(post?.summary).toContain('15가 13을 넘는 순간을 바로 읽을 수 있게 했습니다');
    expect(post?.summary).not.toMatch(/자연스럽게 이어지게|정리했습니다|다듬었습니다/);
  });

  it('returns category, tags, and series data for writing taxonomy', async () => {
    const taxonomy = await getWritingTaxonomy();

    expect(taxonomy.categories).toContain('게임 배치');
    expect(taxonomy.categories).toContain('제작 리듬');
    expect(taxonomy.categories).toContain('이어지는 한 턴');
    expect(taxonomy.categories).toContain('카드 승부');
    expect(taxonomy.series).toContain('게임 기록');
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
    expect(projectRecordMap.hanoi.records.map((record) => record.slug)).toContain('4월-프로젝트-개발-현황');
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

  it('keeps writing entries dense enough to read as game records', async () => {
    const posts = await getWriting();

    for (const post of posts) {
      const paragraphCount = post.content.split(/\n{2,}/).filter((paragraph) => paragraph.trim().length > 0).length;

      expect(post.content.length).toBeGreaterThanOrEqual(1200);
      expect(paragraphCount).toBeGreaterThanOrEqual(8);
      expect(post.content).toMatch(/## /);
    }
  });

  it('keeps public writing away from internal QA phrasing', async () => {
    const posts = await getWriting();
    const internalQaPhrases = [
      /테스트를 돌려/,
      /현재 코드가 깨지/,
      /사용자 화면까지 도달/,
      /기준선/,
      /이번 보기[은이]/,
      /보기한/,
      /보기이었습니다/,
      /기술 결과/,
      /코드가 맞아도/,
      /\/app\/room\/sync\/request/,
      /SYNC_SNAPSHOT/,
      /ROOM\.UPDATED/,
      /GAME\.UPDATED/,
      /TURN_SUBMISSIONS_UPDATED/,
      /transport 부재/,
      /상태 복구 계약/,
      /enum 몇 개/,
      /가격 이력 계약/,
      /요약 필드/,
      /백엔드/,
      /프론트/,
      /프론트엔드/,
      /엔티티/,
      /currentPrice/,
      /averagePrice7d/,
      /recentLowPrice30d/,
      /trendDirection/,
      /lastCollectedAt/,
      /dataFreshness/,
      /`points`/,
      /`range`/,
      /`stale`/,
      /슈퍼앱/,
      /아키텍처/,
      /작업선/,
      /봤습니다/,
      /봅니다/,
      /확인/,
      /검증/,
      /실행/,
      /로컬/,
      /Simulator/,
      /Flutter/,
      /서버/,
      /작업/,
      /결과 확인/,
      /wanderer-was/,
      /이번에는 .*봤/,
      /다음에는 .*봅/,
      /확인하면 충분/,
      /앱이 켜진다/,
      /영상 대신/,
    ];

    for (const post of posts) {
      const searchable = [post.title, post.summary, post.category, post.series, post.tags.join(' '), post.content].join('\n');

      for (const phrase of internalQaPhrases) {
        expect(searchable, `${post.slug} should not include ${phrase}`).not.toMatch(phrase);
      }
    }
  });

  it('keeps project metadata written as public scene copy instead of internal status labels', async () => {
    const projects = await getProjects();
    const internalProjectPhrases = [
      /플레이 확인/,
      /계약 점검 중/,
      /런타임 흐름/,
      /기록 보유/,
      /문서화/,
      /가격 이력 계약/,
      /가격 계약/,
      /실제 가격 수집/,
      /진행 상태/,
      /확인/,
      /실행/,
      /작업/,
      /stale/,
      /현재가/,
      /7일 평균/,
      /30일 최근 저가/,
      /마지막 수집 시각/,
    ];

    for (const project of projects) {
      const publicMetadata = [
        project.progressStatus,
        project.verificationNote,
        project.nextStep,
        project.evidenceLabel,
        project.summary,
        project.content,
      ].join('\n');

      for (const phrase of internalProjectPhrases) {
        expect(publicMetadata, `${project.slug} should not include ${phrase}`).not.toMatch(phrase);
      }
    }
  });

  it('keeps project/post relationships, cover assets, and operational card metadata resolvable', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const postSlugs = new Set(posts.map((post) => post.slug));
    const allowedProgressStatuses = new Set(['한 턴 공개', '미리보기', '장보기 판단', '퍼즐 장면', '색 퍼즐', '선택 장면', '보류']);

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
