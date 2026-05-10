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
    expect(projects.every((project) => project.title && project.summary && project.slug)).toBe(true);
  });

  it('publishes rebuilt posts only after runtime evidence and Notion drafts', async () => {
    const posts = await getWriting();

    expect(posts.map((post) => post.slug)).toEqual([
      'trpg-wastelog-drone-signal-choice',
      'hanoi-two-moves-three-towers',
      'wanderer-11-under-15-not-good-card',
    ]);

    const hanoi = posts.find((post) => post.slug === 'hanoi-two-moves-three-towers');
    const trpg = posts.find((post) => post.slug === 'trpg-wastelog-drone-signal-choice');
    const wanderer = posts.find((post) => post.slug === 'wanderer-11-under-15-not-good-card');

    expect(hanoi?.notionSource.pageId).toBe('35c521c1-5180-81e9-a4be-d35f134add1f');
    expect(hanoi?.notionSource.url).toBe('https://www.notion.so/Hanoi-35c521c1518081e9a4bed35f134add1f');
    expect(hanoi?.content).toContain('/media/hanoi/2026-05-10/hanoi-two-moves-three-towers.png');
    expect(hanoi?.content).toContain('이동 횟수는 **2**');

    expect(trpg?.notionSource.pageId).toBe('35c521c1-5180-81b4-bb12-f01c27ef7bd7');
    expect(trpg?.notionSource.url).toBe('https://www.notion.so/TRPG-35c521c1518081b4bb12f01c27ef7bd7');
    expect(trpg?.content).toContain('/media/trpg/2026-05-10/wastelog-drone-choice.gif');
    expect(trpg?.content).toContain('드론 신호 선택');

    expect(wanderer?.notionSource.pageId).toBe('35c521c1-5180-816c-bea4-c79e959a0e7e');
    expect(wanderer?.notionSource.url).toBe('https://www.notion.so/Wanderer-11-15-35c521c15180816cbea4c79e959a0e7e');
    expect(wanderer?.content).toContain('/media/devlog-gifs/wanderer-rule-result.gif');
    expect(wanderer?.content).toContain('11 이하');
    expect(wanderer?.content).toContain('15는 좋은 카드가 아닙니다');
  });

  it('does not resolve archived AI-slob writing entries as public posts', async () => {
    await expect(getWritingBySlug('wanderer-5-under-card-value')).resolves.toBeNull();
    await expect(getWritingBySlug('wanderer-one-card')).resolves.toBeNull();
    await expect(getWritingBySlug('dinner-grocery-price')).resolves.toBeNull();
    await expect(getWritingBySlug('hanoi-disk-count-3-to-5')).resolves.toBeNull();
  });

  it('builds writing taxonomy and home archive state from the rebuilt post', async () => {
    const taxonomy = await getWritingTaxonomy();
    const snapshot = await getHomeArchiveSnapshot();
    const sections = await getWritingArchiveSections();

    expect(taxonomy.categories).toEqual(['Hanoi', 'TRPG', 'Wanderer']);
    expect(taxonomy.series).toEqual(['Hanoi', 'TRPG', 'Wanderer']);
    expect(taxonomy.tags).toEqual(['선택', '원반', '이동', '잔해일지', '조건', '카드', '턴', '퍼즐', 'TRPG']);
    expect(snapshot.latest?.slug).toBe('trpg-wastelog-drone-signal-choice');
    expect(snapshot.latestTrace?.slug).toBe('trpg-wastelog-drone-signal-choice');
    expect(snapshot.traces.map((trace) => trace.slug)).toEqual(['hanoi-two-moves-three-towers', 'wanderer-11-under-15-not-good-card']);
    expect(snapshot.latestProjects.map((project) => project.slug)).toEqual(['trpg']);
    expect(snapshot.worklines).toHaveLength(5);
    expect(snapshot.moreEntries.map((entry) => entry.slug)).toEqual(['hanoi-two-moves-three-towers', 'wanderer-11-under-15-not-good-card']);
    expect(sections.latest?.slug).toBe('trpg-wastelog-drone-signal-choice');
    expect(sections.timeline.map((trace) => trace.slug)).toEqual(['hanoi-two-moves-three-towers', 'wanderer-11-under-15-not-good-card']);
  });

  it('keeps project relationships resolvable with the rebuilt Wanderer post attached', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const projectRecordMap = await getProjectRecordMap();
    const wanderer = projects.find((project) => project.slug === 'wanderer');

    expect(posts.map((post) => post.slug)).toEqual([
      'trpg-wastelog-drone-signal-choice',
      'hanoi-two-moves-three-towers',
      'wanderer-11-under-15-not-good-card',
    ]);
    for (const project of projects) {
      expect(projectRecordMap[project.slug].project.slug).toBe(project.slug);
      if (project.slug === 'wanderer') {
        expect(project.relatedPosts).toEqual(['wanderer-11-under-15-not-good-card']);
        expect(projectRecordMap[project.slug].records.map((post) => post.slug)).toEqual(['wanderer-11-under-15-not-good-card']);
      } else if (project.slug === 'hanoi') {
        expect(project.relatedPosts).toEqual(['hanoi-two-moves-three-towers']);
        expect(projectRecordMap[project.slug].records.map((post) => post.slug)).toEqual(['hanoi-two-moves-three-towers']);
      } else if (project.slug === 'trpg') {
        expect(project.relatedPosts).toEqual(['trpg-wastelog-drone-signal-choice']);
        expect(projectRecordMap[project.slug].records.map((post) => post.slug)).toEqual(['trpg-wastelog-drone-signal-choice']);
      } else {
        expect(project.relatedPosts).toEqual([]);
        expect(projectRecordMap[project.slug].records).toEqual([]);
      }
    }

    expect(wanderer).toBeDefined();
    expect(resolveProjectRecords(wanderer!, posts).map((post) => post.slug)).toEqual(['wanderer-11-under-15-not-good-card']);
  });

  it('keeps project covers resolvable without internal evidence-tracking fields', async () => {
    const projects = await getProjects();

    for (const project of projects) {
      expect(project).not.toHaveProperty('progressStatus');
      expect(project).not.toHaveProperty('verificationNote');
      expect(project).not.toHaveProperty('nextStep');
      expect(project).not.toHaveProperty('evidenceLabel');
      expect(project).not.toHaveProperty('evidenceHref');

      if (project.coverImage) {
        expect(fs.existsSync(path.join(process.cwd(), 'public', project.coverImage.replace(/^\//, '')))).toBe(true);
      }
    }
  });

  it('keeps archived writing out of the public content corpus', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const publicCorpus = [...projects, ...posts].map((entry) => [entry.title, entry.summary, entry.content].join('\n')).join('\n---\n');

    expect(posts.map((post) => post.slug)).toEqual([
      'trpg-wastelog-drone-signal-choice',
      'hanoi-two-moves-three-towers',
      'wanderer-11-under-15-not-good-card',
    ]);
    expect(publicCorpus).not.toMatch(/AI Slob|실제 GIF 없음|설명용 GIF|제작 증거|다음 자리가 열리는 장면을 GIF|막힌 자리를 먼저 보이게 맞추고 있습니다/);
    expect(publicCorpus).not.toMatch(/verificationNote|nextStep|evidenceLabel|evidenceHref|progressStatus|primaryEvidence/);
  });
});
