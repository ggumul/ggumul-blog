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
    stakes: '손패에 있던 10이 빠지는 순서부터 시작합니다.',
    change: '홀수 규칙 뒤에 10이 빠지고 15가 남는 한 턴입니다.',
    next: '버린 카드 읽기',
  },
  'wanderer-same-turn': {
    stakes: '잠깐 자리를 비워도 고르던 카드와 결과를 다시 볼 수 있습니다.',
    change: '짧게 즐기고 돌아와도 같은 승부를 만나는 이야기입니다.',
    next: '같은 턴 다시 읽기',
  },
  'wanderer-short-card-game': {
    stakes: '카드 전투가 길어질수록 선택 뒤 결과를 보는 맛이 약해졌습니다.',
    change: '복잡한 세계관보다 짧은 선택과 빠른 결과를 남기는 쪽으로 방향을 세웠습니다.',
    next: '짧은 전투 읽기',
  },
  'small-games-first-move': {
    stakes: '게임이 많아져도 지금 해볼 수 있는 일을 쉽게 찾을 수 있습니다.',
    change: '카드 전투, 퍼즐, 서사 실험을 나눠 놓고 비어 있는 부분을 앞에 드러냈습니다.',
    next: '게임 배치 읽기',
  },
  'dinner-grocery-price': {
    stakes: '김치찌개 재료가 오늘 살 것과 나중에 살 것으로 갈립니다.',
    change: '가격을 붙여 돼지고기와 두부의 순서를 다시 나눕니다.',
    next: '가격 이야기 읽기',
  },
  'small-games-rhythm': {
    stakes: '여러 게임을 오가도 다시 잡을 한 칸이 필요했습니다.',
    change: '카드가 빠지고 원반이 막히는 구간을 글 앞에 놓습니다.',
    next: '만드는 방향 읽기',
  },
};

export function getWritingReadingPath(slug: string): WritingReadingPath {
  return writingReadingPaths[slug] ?? {
    stakes: '무엇을 다루는 글인지 짧게 읽습니다.',
    change: '글 안에서 달라진 점을 짧게 읽습니다.',
    next: '글 읽기',
  };
}
