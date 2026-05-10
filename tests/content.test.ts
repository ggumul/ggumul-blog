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
  it('loads the public project list in the configured order', async () => {
    const projects = await getProjects();

    expect(projects.map((project) => project.slug)).toEqual([
      'wanderer',
      'hanoi',
      'color-hanoi',
      'trpg',
      'ggumul-dinner-grocery',
    ]);
    expect(projects).toHaveLength(5);
    expect(projects.every((project) => project.title && project.summary && project.nextStep)).toBe(true);
  });

  it('loads every public writing entry by date', async () => {
    const posts = await getWriting();

    expect(posts.map((post) => post.slug)).toEqual([
      'wanderer-5-under-card-value',
      'dinner-grocery-price',
      'wanderer-one-card',
      'wanderer-same-turn',
      'wanderer-short-card-game',
      'small-games-rhythm',
      'small-games-first-move',
    ]);
    expect(posts.every((post) => post.title && post.summary && post.publishedAt)).toBe(true);
  });

  it('keeps every public writing entry tied to a Notion draft before MDX publication', async () => {
    const posts = await getWriting();
    const notionPageIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    for (const post of posts) {
      expect(post.notionSource, `${post.slug} must keep its Notion draft source`).toBeDefined();
      expect(post.notionSource.pageId, `${post.slug} notionSource.pageId`).toMatch(notionPageIdPattern);
      expect(post.notionSource.url, `${post.slug} notionSource.url`).toMatch(/^https:\/\/www\.notion\.so\//);
      expect(post.notionSource.title, `${post.slug} notionSource.title`).toContain('[초고/');
      expect(post.notionSource.status, `${post.slug} notionSource.status`).toBeTruthy();
    }
  });

  it('finds project and writing entries by slug, including encoded slugs', async () => {
    const project = await getProjectBySlug('wanderer');
    const monthly = await getWritingBySlug('4월-프로젝트-개발-현황');
    const encoded = await getWritingBySlug('wanderer-%EC%B4%88%EA%B8%B0-%EC%84%A4%EA%B3%84-%ED%9A%8C%EA%B3%A0');
    const runtime = await getWritingBySlug('runtime-화면-확인-기록');

    expect(project?.title).toBe('Wanderer');
    expect(project?.relatedPosts).toContain('wanderer-short-card-game');
    expect(monthly?.slug).toBe('small-games-first-move');
    expect(monthly?.relatedProjects).toContain('trpg');
    expect(encoded?.slug).toBe('wanderer-short-card-game');
    expect(runtime?.slug).toBe('wanderer-one-card');
    expect(runtime?.summary).toContain('11 이하 조건');
    const fiveUnder = await getWritingBySlug('wanderer-5-under-card-value');
    expect(fiveUnder?.summary).toContain('5 이하 조건');
    expect(fiveUnder?.content).toContain('/media/wanderer/2026-05-10/wanderer-card-select.png');
    expect(fiveUnder?.content).toContain('/media/wanderer/2026-05-10/wanderer-5-under-first-turn.png');
  });

  it('builds taxonomy and archive snapshots from the current writing set', async () => {
    const taxonomy = await getWritingTaxonomy();
    const snapshot = await getHomeArchiveSnapshot();
    const sections = await getWritingArchiveSections();

    expect(taxonomy.categories).toEqual(expect.arrayContaining(['작은 게임', 'Wanderer', '생활 도구']));
    expect(taxonomy.series).toEqual(expect.arrayContaining(['작은 게임들', 'Wanderer 글', 'Dinner Grocery']));
    expect(taxonomy.tags.length).toBeGreaterThanOrEqual(8);
    expect(snapshot.latest?.slug).toBe('wanderer-5-under-card-value');
    expect(snapshot.latestProjects.map((project) => project.slug)).toEqual(['wanderer']);
    expect(snapshot.worklines).toHaveLength(5);
    expect(sections.latest.slug).toBe('wanderer-5-under-card-value');
    expect(sections.timeline.map((entry) => entry.slug)).toContain('wanderer-one-card');
  });

  it('keeps project and post relationships resolvable', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const postSlugs = new Set(posts.map((post) => post.slug));
    const projectRecordMap = await getProjectRecordMap();
    const wanderer = projects.find((project) => project.slug === 'wanderer');

    for (const project of projects) {
      expect(project.relatedPosts.every((slug) => postSlugs.has(slug))).toBe(true);
      expect(projectRecordMap[project.slug].project.slug).toBe(project.slug);
      expect(projectRecordMap[project.slug].project.primaryEvidence.href).toMatch(/^\//);
      expect(projectRecordMap[project.slug].project.primaryEvidence.label.length).toBeGreaterThanOrEqual(4);
    }

    for (const post of posts) {
      expect(post.relatedProjects.every((slug) => projectSlugs.has(slug))).toBe(true);
    }

    expect(wanderer).toBeDefined();
    expect(resolveProjectRecords(wanderer!, posts).map((post) => post.slug)).toEqual(wanderer!.relatedPosts);
  });

  it('keeps public writing readable without forcing formulaic length', async () => {
    const posts = await getWriting();

    for (const post of posts) {
      const paragraphCount = post.content.split(/\n{2,}/).filter((paragraph) => paragraph.trim().length > 0).length;
      const searchable = [post.title, post.summary, post.category, post.series, post.tags.join(' '), post.content].join('\n');

      expect(post.content.length).toBeGreaterThanOrEqual(350);
      expect(paragraphCount).toBeGreaterThanOrEqual(4);
      expect(searchable).not.toMatch(/테스트를 돌려|현재 코드가 깨지|사용자 화면까지 도달|\/app\/room\/sync\/request|SYNC_SNAPSHOT|ROOM\.UPDATED|GAME\.UPDATED|TURN_SUBMISSIONS_UPDATED|transport 부재|상태 복구 계약|백엔드|프론트엔드|슈퍼앱|아키텍처/);
      expect(searchable).not.toMatch(/놓치지 마세요|지금 바로 참여|공유하기|댓글 남기기|해보기/);
    }
  });

  it('keeps project evidence assets and covers resolvable', async () => {
    const projects = await getProjects();

    for (const project of projects) {
      expect(project.progressStatus.length).toBeGreaterThanOrEqual(2);
      expect(project.verificationNote.length).toBeGreaterThanOrEqual(8);
      expect(project.nextStep.length).toBeGreaterThanOrEqual(8);
      expect(project.evidenceLabel.length).toBeGreaterThanOrEqual(4);
      if (project.evidenceHref) {
        expect(project.evidenceHref).toMatch(/^\/media\/devlog-gifs\//);
        expect(project.content).toContain(project.evidenceHref);
        expect(fs.existsSync(path.join(process.cwd(), 'public', project.evidenceHref.replace(/^\//, '')))).toBe(true);
      }

      if (project.coverImage) {
        expect(fs.existsSync(path.join(process.cwd(), 'public', project.coverImage.replace(/^\//, '')))).toBe(true);
      }
    }
  });

  it('does not claim screen evidence beyond what current media actually shows', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const hanoi = projects.find((project) => project.slug === 'hanoi');
    const colorHanoi = projects.find((project) => project.slug === 'color-hanoi');
    const dinner = projects.find((project) => project.slug === 'ggumul-dinner-grocery');
    const trpg = projects.find((project) => project.slug === 'trpg');
    const publicCorpus = [...projects, ...posts].map((entry) => [entry.title, entry.summary, entry.content].join('\n')).join('\n---\n');

    expect(hanoi?.verificationNote).toContain('원반 위치와 이동 횟수');
    expect(hanoi?.verificationNote).not.toMatch(/다음 자리가 열|막힌 자리/);
    expect(publicCorpus).not.toMatch(/실제 GIF 없음|설명용 GIF|제작 증거|다음 자리가 열리는 장면을 GIF|막힌 자리를 먼저 보이게 맞추고 있습니다/);
    expect(colorHanoi?.evidenceHref).toBeFalsy();
    expect(dinner?.evidenceHref).toBeFalsy();
    expect(trpg?.evidenceHref).toBeFalsy();
  });
});
