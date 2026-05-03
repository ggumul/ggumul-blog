import { describe, expect, it } from 'vitest';
import { getWritingReadingPath, writingReadingPathSlugs } from '@/lib/writing-reading-path';

describe('writing reading path', () => {
  it('gives every public writing entry a concrete reason to click', () => {
    expect(writingReadingPathSlugs).toEqual([
      'runtime-화면-확인-기록',
      'wanderer-sync-연결-문제-분석',
      'wanderer-초기-설계-회고',
      '4월-프로젝트-개발-현황',
      'ggumul-dinner-grocery-가격-계약-정리',
      '제작-리듬을-우선하는-이유',
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
      stakes: '무슨 문제가 있었는지 먼저 봅니다.',
      change: '글 안에서 무엇이 달라졌는지 이어 봅니다.',
      next: '글 열기',
    });
  });
});
