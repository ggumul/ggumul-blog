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
    stakes: '카드를 고른 뒤 결과가 어떻게 보이는지 한 턴 단위로 살폈습니다.',
    change: '폰에서 손패, 선택, 결과가 한 장면으로 이어지도록 기준을 세웠습니다.',
    next: '한 턴 기록 읽기',
  },
  'wanderer-sync-연결-문제-분석': {
    stakes: '플레이어가 다시 돌아와도 같은 카드와 결과를 볼 수 있어야 했습니다.',
    change: '한 턴의 선택과 결과를 같은 장면으로 이어 보이게 기준을 잡았습니다.',
    next: '같은 턴 기록 읽기',
  },
  'wanderer-초기-설계-회고': {
    stakes: '카드 전투가 길어질수록 선택 뒤 결과를 보는 맛이 흐려졌습니다.',
    change: '복잡한 세계관보다 짧은 선택과 빠른 결과를 남기는 쪽으로 기준을 세웠습니다.',
    next: '짧은 전투 기준 열기',
  },
  '4월-프로젝트-개발-현황': {
    stakes: '게임이 늘어나자 어떤 화면을 지금 볼 수 있는지 한눈에 잡히지 않았습니다.',
    change: '카드 전투, 퍼즐, 서사 실험을 나눠 놓고 비어 있는 부분을 먼저 드러냈습니다.',
    next: '게임 소개 글 읽기',
  },
  'ggumul-dinner-grocery-가격-계약-정리': {
    stakes: '식단을 추천하려 해도 가격이 언제 바뀌었는지 기준이 없었습니다.',
    change: '장보기 판단이 흔들리지 않도록 가격 기록과 계약 기준을 먼저 세웠습니다.',
    next: '가격 이야기 읽기',
  },
  '제작-리듬을-우선하는-이유': {
    stakes: '여러 게임을 오가다 보니 속도보다 먼저 무엇을 볼지 기준이 흐려졌습니다.',
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
