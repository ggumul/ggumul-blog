export type WritingReadingPath = {
  stakes: string;
  change: string;
  next: string;
};

export const writingReadingPathSlugs = [
  'runtime-화면-확인-기록',
  'wanderer-sync-연결-문제-분석',
  'wanderer-초기-설계-회고',
  '4월-프로젝트-개발-현황',
  'ggumul-dinner-grocery-가격-계약-정리',
  '제작-리듬을-우선하는-이유',
] as const;

const writingReadingPaths: Record<string, WritingReadingPath> = {
  'runtime-화면-확인-기록': {
    stakes: '한 장을 고르는 순간 내 카드와 상대 카드가 나란히 드러납니다.',
    change: '15가 13을 넘는지 바로 읽히는 짧은 승부를 담았습니다.',
    next: '짧은 승부 읽기',
  },
  'wanderer-sync-연결-문제-분석': {
    stakes: '잠깐 자리를 비워도 고르던 카드와 결과를 다시 볼 수 있습니다.',
    change: '짧게 즐기고 돌아와 이어가는 한 턴 이야기입니다.',
    next: '이어지는 턴 읽기',
  },
  'wanderer-초기-설계-회고': {
    stakes: '카드 전투가 길어질수록 선택 뒤 결과를 보는 맛이 약해졌습니다.',
    change: '복잡한 세계관보다 짧은 선택과 빠른 결과를 남기는 쪽으로 기준을 세웠습니다.',
    next: '짧은 전투 기준 열기',
  },
  '4월-프로젝트-개발-현황': {
    stakes: '게임이 늘어나자 어떤 화면을 지금 볼 수 있는지 한눈에 잡히지 않았습니다.',
    change: '카드 전투, 퍼즐, 서사 실험을 나눠 놓고 비어 있는 부분을 먼저 드러냈습니다.',
    next: '게임 배치 읽기',
  },
  'ggumul-dinner-grocery-가격-계약-정리': {
    stakes: '식단을 추천하려 해도 가격이 언제 바뀌었는지 기준이 없었습니다.',
    change: '장보기 판단이 흔들리지 않도록 가격 기록과 계약 기준을 먼저 세웠습니다.',
    next: '가격 기록 읽기',
  },
  '제작-리듬을-우선하는-이유': {
    stakes: '여러 게임을 오가다 보니 속도보다 먼저 무엇을 볼지 기준이 약해졌습니다.',
    change: '여러 게임을 놓치지 않도록 만드는 리듬을 다시 잡았습니다.',
    next: '만드는 리듬 다시 열기',
  },
};

export function getWritingReadingPath(slug: string): WritingReadingPath {
  return writingReadingPaths[slug] ?? {
    stakes: '무슨 문제가 있었는지 먼저 봅니다.',
    change: '글 안에서 무엇이 달라졌는지 이어 봅니다.',
    next: '글 열기',
  };
}
