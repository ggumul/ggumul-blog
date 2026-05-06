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
      'dinner-grocery-price',
      'wanderer-one-card',
      'wanderer-same-turn',
      'small-games-first-move',
      'wanderer-short-card-game',
      'small-games-rhythm',
    ]);
    expect(posts.filter((post) => post.featured)).toHaveLength(5);
  });

  it('finds project by slug and exposes related posts', async () => {
    const project = await getProjectBySlug('wanderer');

    expect(project?.title).toBe('Wanderer');
    expect(project?.relatedPosts).toContain('wanderer-short-card-game');
  });

  it('finds writing by slug and exposes related projects', async () => {
    const post = await getWritingBySlug('4월-프로젝트-개발-현황');

    expect(post?.title).toBe('첫 선택이 게임을 정합니다');
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

    expect(post?.title).toBe('10은 왜 먼저 버려졌나');
    expect(post?.summary).toContain('홀수 규칙 때문에 10이 사라지고');
    expect(post?.summary).not.toMatch(/안전해 보이는|좋은 카드가 아니라|자연스럽게 이어지게|정리했습니다|다듬었습니다/);
  });

  it('returns category, tags, and series data for writing taxonomy', async () => {
    const taxonomy = await getWritingTaxonomy();

    expect(taxonomy.categories).toContain('게임 배치');
    expect(taxonomy.categories).toContain('만드는 태도');
    expect(taxonomy.categories).toContain('같은 턴');
    expect(taxonomy.categories).toContain('카드 승부');
    expect(taxonomy.series).toContain('꼬물');
    expect(taxonomy.series).toContain('Wanderer');
    expect(taxonomy.series).toContain('GGUMUL Dinner Grocery');
    expect(taxonomy.tags).toContain('게임');
    expect(taxonomy.tags).toContain('카드게임');
  });

  it('builds a home archive snapshot with latest post, related projects, project list, and remaining entries', async () => {
    const snapshot = await getHomeArchiveSnapshot();

    expect(snapshot.latest?.slug).toBe('dinner-grocery-price');
    expect(snapshot.latestProjects.map((project) => project.slug)).toEqual(['ggumul-dinner-grocery']);
    expect(snapshot.worklines).toHaveLength(5);
    expect(snapshot.worklines[0]?.recordCount).toBe(1);
    expect(snapshot.worklines[0]?.previewRecords.map((record) => record.slug)).toEqual([
      'dinner-grocery-price',
    ]);
    expect(snapshot.moreEntries.map((entry) => entry.slug)).toEqual([
      'wanderer-one-card',
      'wanderer-same-turn',
      'small-games-first-move',
      'wanderer-short-card-game',
      'small-games-rhythm',
    ]);
  });

  it('builds writing archive sections with latest entry, timeline entries, and index density', async () => {
    const sections = await getWritingArchiveSections();

    expect(sections.latest.slug).toBe('dinner-grocery-price');
    expect(sections.timeline).toHaveLength(5);
    expect(sections.timeline[0]?.slug).toBe('wanderer-one-card');
    expect(sections.index.seriesCount).toBe(3);
    expect(sections.index.categoryCount).toBe(6);
    expect(sections.index.tagCount).toBeGreaterThan(7);
  });

  it('builds project record map from related posts', async () => {
    const projectRecordMap = await getProjectRecordMap();

    expect(projectRecordMap['ggumul-dinner-grocery'].records.map((record) => record.slug)).toEqual([
      'dinner-grocery-price',
    ]);
    expect(projectRecordMap.wanderer.project.title).toBe('Wanderer');
    expect(projectRecordMap.wanderer.records.map((record) => record.slug)).toEqual([
      'wanderer-one-card',
      'wanderer-same-turn',
      'wanderer-short-card-game',
    ]);
    expect(projectRecordMap.hanoi.records.map((record) => record.slug)).toContain('small-games-first-move');
    expect(projectRecordMap.trpg.records.map((record) => record.slug)).toContain('small-games-first-move');
  });

  it('resolves explicit project records before falling back to post relatedProjects', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const wanderer = projects.find((project) => project.slug === 'wanderer');
    const trpg = projects.find((project) => project.slug === 'trpg');

    expect(wanderer).toBeDefined();
    expect(trpg).toBeDefined();
    expect(resolveProjectRecords(wanderer!, posts).map((post) => post.slug)).toEqual(wanderer!.relatedPosts);
    expect(resolveProjectRecords(trpg!, posts).map((post) => post.slug)).toEqual([
      'small-games-first-move',
    ]);
  });

  it('keeps writing entries dense enough to read as game records', async () => {
    const posts = await getWriting();

    for (const post of posts) {
      const paragraphCount = post.content.split(/\n{2,}/).filter((paragraph) => paragraph.trim().length > 0).length;

      expect(post.content.length).toBeGreaterThanOrEqual(1100);
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

  it('pairs each project and writing entry with a GIF that names the specific event in the text', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const projectExpectations = new Map([
      ['wanderer', { gif: '/media/devlog-gifs/wanderer-rule-result.gif', caption: '10이 조건 변화 뒤 빠지는 한 턴' }],
      ['hanoi', { gif: '/media/devlog-gifs/hanoi-next-seat.gif', caption: '초록 원반을 열었다가 다시 막습니다' }],
      ['color-hanoi', { gif: '/media/devlog-gifs/color-hanoi-rule.gif', caption: '색 순서 규칙 때문에 같은 원반도 다른 자리' }],
      ['trpg', { gif: '/media/devlog-gifs/trpg-theme-choice.gif', caption: '테마 선택까지만 담았습니다' }],
      ['ggumul-dinner-grocery', { gif: '/media/devlog-gifs/dinner-buy-now-later.gif', caption: '오늘 살 것과 나중에 살 것' }],
    ]);
    const postExpectations = new Map([
      ['small-games-first-move', ['/media/devlog-gifs/wanderer-rule-result.gif', '/media/devlog-gifs/hanoi-next-seat.gif']],
      ['wanderer-short-card-game', ['/media/devlog-gifs/wanderer-rule-result.gif']],
      ['small-games-rhythm', ['/media/devlog-gifs/hanoi-next-seat.gif']],
      ['wanderer-same-turn', ['/media/devlog-gifs/wanderer-rule-result.gif']],
      ['wanderer-one-card', ['/media/devlog-gifs/wanderer-rule-result.gif']],
      ['dinner-grocery-price', ['/media/devlog-gifs/dinner-buy-now-later.gif']],
    ]);

    for (const { gif } of Array.from(projectExpectations.values())) {
      expect(fs.existsSync(path.join(process.cwd(), 'public', gif.replace(/^\//, '')))).toBe(true);
    }

    for (const project of projects) {
      const expected = projectExpectations.get(project.slug);
      expect(expected, `${project.slug} should have a pairing rule`).toBeDefined();
      expect(project.content, `${project.slug} should use its event GIF`).toContain(expected!.gif);
      expect(project.content, `${project.slug} caption should name the event`).toContain(expected!.caption);
    }

    for (const post of posts) {
      const expectedGifs = postExpectations.get(post.slug);
      expect(expectedGifs, `${post.slug} should have a pairing rule`).toBeDefined();
      for (const gif of expectedGifs!) {
        expect(post.content, `${post.slug} should use ${gif}`).toContain(gif);
      }
    }
  });

  it('keeps project/post relationships, cover assets, and operational card metadata resolvable', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const postSlugs = new Set(posts.map((post) => post.slug));
    const allowedProgressStatuses = new Set(['한 턴', '미리보기', '장보기', '퍼즐', '색 퍼즐', '선택 게임', '쉬는 중']);

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
