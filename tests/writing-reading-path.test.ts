import { describe, expect, it } from 'vitest';
import { getWritingReadingPath, writingReadingPathSlugs } from '@/lib/writing-reading-path';

describe('writing reading path', () => {
  it('gives every public writing entry a concrete reason to click', () => {
    expect(writingReadingPathSlugs).toEqual([
      'wanderer-one-card',
      'wanderer-same-turn',
      'wanderer-short-card-game',
      'small-games-first-move',
      'dinner-grocery-price',
      'small-games-rhythm',
    ]);

    for (const slug of writingReadingPathSlugs) {
      const path = getWritingReadingPath(slug);

      expect(path.stakes.length).toBeGreaterThanOrEqual(18);
      expect(path.change.length).toBeGreaterThanOrEqual(18);
      expect(path.next.length).toBeGreaterThanOrEqual(8);
      expect(path.stakes).not.toMatch(/정리했습니다|돌아봤습니다|놓치지 마세요|지금 바로 참여/);
      expect(path.change).not.toMatch(/정리했습니다|돌아봤습니다|bring people in|share copy/);
    }
  });

  it('falls back without pretending unknown posts have a fake story arc', () => {
    expect(getWritingReadingPath('unknown-post')).toEqual({
      stakes: '이 글은 한 장면에서 시작합니다.',
      change: '본문에서 그 장면이 어떻게 달라졌는지 이어 읽습니다.',
      next: '본문으로 가기',
    });
  });
});
