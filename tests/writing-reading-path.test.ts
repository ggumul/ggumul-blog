import { describe, expect, it } from 'vitest';
import { getWritingReadingPath, writingReadingPathSlugs } from '@/lib/writing-reading-path';

describe('writing reading path', () => {
  it('has no public writing reading paths while all old posts are archived', () => {
    expect(writingReadingPathSlugs).toEqual([]);
  });

  it('falls back without pretending unknown posts have a fake story arc', () => {
    expect(getWritingReadingPath('unknown-post')).toEqual({
      stakes: '이 글에서 다루는 장면',
      change: '만드는 동안 바뀐 점',
      next: '글 목록으로 돌아가기',
    });
  });
});
