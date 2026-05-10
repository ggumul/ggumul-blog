export type WritingReadingPath = {
  stakes: string;
  change: string;
  next: string;
};

export const writingReadingPathSlugs = [] as const;

const writingReadingPaths: Record<string, WritingReadingPath> = {};

export function getWritingReadingPath(slug: string): WritingReadingPath {
  return writingReadingPaths[slug] ?? {
    stakes: '이 글은 실제 실행으로 다시 확인한 뒤 공개합니다.',
    change: 'Notion 초고와 화면 근거를 먼저 맞춥니다.',
    next: '글 목록으로 돌아가기',
  };
}
