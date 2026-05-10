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

  it('keeps public writing empty until each post is rebuilt from runtime evidence and Notion draft', async () => {
    const posts = await getWriting();

    expect(posts).toEqual([]);
  });

  it('does not resolve archived AI-slob writing entries as public posts', async () => {
    await expect(getWritingBySlug('wanderer-5-under-card-value')).resolves.toBeNull();
    await expect(getWritingBySlug('wanderer-one-card')).resolves.toBeNull();
    await expect(getWritingBySlug('dinner-grocery-price')).resolves.toBeNull();
  });

  it('builds empty writing taxonomy and home archive state safely', async () => {
    const taxonomy = await getWritingTaxonomy();
    const snapshot = await getHomeArchiveSnapshot();
    const sections = await getWritingArchiveSections();

    expect(taxonomy.categories).toEqual([]);
    expect(taxonomy.series).toEqual([]);
    expect(taxonomy.tags).toEqual([]);
    expect(snapshot.latest).toBeNull();
    expect(snapshot.latestTrace).toBeNull();
    expect(snapshot.traces).toEqual([]);
    expect(snapshot.latestProjects).toEqual([]);
    expect(snapshot.worklines).toHaveLength(5);
    expect(snapshot.moreEntries).toEqual([]);
    expect(sections.latest).toBeNull();
    expect(sections.timeline).toEqual([]);
  });

  it('keeps project relationships resolvable when no public posts are attached', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const projectRecordMap = await getProjectRecordMap();
    const wanderer = projects.find((project) => project.slug === 'wanderer');

    expect(posts).toEqual([]);
    for (const project of projects) {
      expect(project.relatedPosts).toEqual([]);
      expect(projectRecordMap[project.slug].project.slug).toBe(project.slug);
      expect(projectRecordMap[project.slug].records).toEqual([]);
      expect(projectRecordMap[project.slug].project.primaryEvidence.href).toMatch(/^\//);
      expect(projectRecordMap[project.slug].project.primaryEvidence.label.length).toBeGreaterThanOrEqual(4);
    }

    expect(wanderer).toBeDefined();
    expect(resolveProjectRecords(wanderer!, posts)).toEqual([]);
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

  it('keeps archived writing out of the public content corpus', async () => {
    const [projects, posts] = await Promise.all([getProjects(), getWriting()]);
    const hanoi = projects.find((project) => project.slug === 'hanoi');
    const colorHanoi = projects.find((project) => project.slug === 'color-hanoi');
    const dinner = projects.find((project) => project.slug === 'ggumul-dinner-grocery');
    const trpg = projects.find((project) => project.slug === 'trpg');
    const publicCorpus = [...projects, ...posts].map((entry) => [entry.title, entry.summary, entry.content].join('\n')).join('\n---\n');

    expect(posts).toEqual([]);
    expect(hanoi?.verificationNote).toContain('원반 위치와 이동 횟수');
    expect(hanoi?.verificationNote).not.toMatch(/다음 자리가 열|막힌 자리/);
    expect(publicCorpus).not.toMatch(/AI Slob|실제 GIF 없음|설명용 GIF|제작 증거|다음 자리가 열리는 장면을 GIF|막힌 자리를 먼저 보이게 맞추고 있습니다/);
    expect(colorHanoi?.evidenceHref).toBeFalsy();
    expect(dinner?.evidenceHref).toBeFalsy();
    expect(trpg?.evidenceHref).toBeFalsy();
  });
});
