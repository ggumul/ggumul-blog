export type WritingReadingPath = {
  stakes: string;
  change: string;
  next: string;
};

export const writingReadingPathSlugs = [] as const;

const writingReadingPaths: Record<string, WritingReadingPath> = {};

export function getWritingReadingPath(slug: string): WritingReadingPath {
  return writingReadingPaths[slug] ?? {
    stakes: '이 글에서 다루는 장면',
    change: '만드는 동안 바뀐 점',
    next: '글 목록으로 돌아가기',
  };
}
