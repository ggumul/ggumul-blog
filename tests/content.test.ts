import { describe, expect, it } from 'vitest';
import {
  getFeaturedProjects,
  getFeaturedWriting,
  getProjectBySlug,
  getWritingBySlug,
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

    expect(post?.title).toBe('요즘 이런 게임들을 만들고 있어요');
    expect(post?.relatedProjects).toContain('trpg');
  });
});
