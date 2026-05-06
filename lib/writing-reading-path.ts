export type WritingReadingPath = {
  stakes: string;
  change: string;
  next: string;
};

export const writingReadingPathSlugs = [
  'wanderer-one-card',
  'wanderer-same-turn',
  'wanderer-short-card-game',
  'small-games-first-move',
  'dinner-grocery-price',
  'small-games-rhythm',
] as const;

const writingReadingPaths: Record<string, WritingReadingPath> = {
  'wanderer-one-card': {
    stakes: 'Wanderer는 결과보다 사라진 카드가 먼저 설명돼야 했습니다.',
    change: '한 턴의 문장 순서를 바꾸고, 10이 빠진 뒤 결과를 읽게 했습니다.',
    next: '빠진 카드 다시 보기',
  },
  'wanderer-same-turn': {
    stakes: '잠깐 나갔다 돌아오면 방금 보던 턴이 쉽게 끊겼습니다.',
    change: '앱을 다시 열어도 같은 손패와 같은 결과를 만나게 했습니다.',
    next: '같은 턴 다시 읽기',
  },
  'wanderer-short-card-game': {
    stakes: '카드와 설정을 많이 붙일수록 한 턴이 늦게 읽혔습니다.',
    change: '세 장짜리 표본으로 줄이고, 한 턴이 끝나는 느낌부터 다시 잡았습니다.',
    next: '줄인 이유 다시 읽기',
  },
  'small-games-first-move': {
    stakes: '프로젝트 이름보다 처음 보이는 장면이 더 중요했습니다.',
    change: '카드, 원반, 테마 선택처럼 손이 먼저 가는 장면을 골랐습니다.',
    next: '첫 선택 다시 읽기',
  },
  'dinner-grocery-price': {
    stakes: '메뉴를 정해도 장보기 전에 재료를 다시 나눠야 했습니다.',
    change: '김치찌개 재료 옆에 가격과 구매 시점을 함께 붙였습니다.',
    next: '장보기 다시 읽기',
  },
  'small-games-rhythm': {
    stakes: '오래 비운 프로젝트는 큰 목표만으로 다시 시작하기 어려웠습니다.',
    change: '다시 열었을 때 바로 이어 볼 작은 장면을 골랐습니다.',
    next: '리듬 다시 읽기',
  },
};

export function getWritingReadingPath(slug: string): WritingReadingPath {
  return writingReadingPaths[slug] ?? {
    stakes: '이 글은 한 장면에서 시작합니다.',
    change: '본문에서 그 장면이 어떻게 달라졌는지 이어 읽습니다.',
    next: '본문으로 가기',
  };
}
