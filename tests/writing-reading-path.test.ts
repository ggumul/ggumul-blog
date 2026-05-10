import { describe, expect, it } from 'vitest';
import { getWritingReadingPath, writingReadingPathSlugs } from '@/lib/writing-reading-path';

describe('writing reading path', () => {
  it('has no public writing reading paths while all old posts are archived', () => {
    expect(writingReadingPathSlugs).toEqual([]);
  });

  it('falls back without pretending unknown posts have a fake story arc', () => {
    expect(getWritingReadingPath('unknown-post')).toEqual({
      stakes: '이 글은 실제 실행으로 다시 확인한 뒤 공개합니다.',
      change: 'Notion 초고와 화면 근거를 먼저 맞춥니다.',
      next: '글 목록으로 돌아가기',
    });
  });
});
