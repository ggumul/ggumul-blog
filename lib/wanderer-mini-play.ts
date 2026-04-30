export type WandererMiniPlayCard = {
  id: string;
  title: string;
  description: string;
  scene: string;
  result: string;
  shareText: string;
};

export const wandererMiniPlayCards: WandererMiniPlayCard[] = [
  {
    id: 'old-sword',
    title: '낡은 검',
    description: '먼저 버티는 선택입니다. 짧은 전투를 넘기지만 다음 길은 더 어두워집니다.',
    scene: '숲길 끝에서 작은 그림자가 먼저 달려듭니다.',
    result: '첫 전투는 버텼지만, 다음 길이 어두워졌습니다.',
    shareText: '나는 Wanderer에서 낡은 검을 골랐다. 결과: 첫 전투는 버텼지만, 다음 길이 어두워졌다.',
  },
  {
    id: 'lantern',
    title: '작은 등불',
    description: '위험을 늦게 마주보는 선택입니다. 밤길을 읽지만 전투 준비는 조금 늦어집니다.',
    scene: '안개가 내려앉고, 발밑의 오래된 표식이 희미하게 보입니다.',
    result: '길은 찾았지만, 밤의 기척이 한 칸 더 가까워졌습니다.',
    shareText: '나는 Wanderer에서 작은 등불을 골랐다. 결과: 길은 찾았지만, 밤의 기척이 가까워졌다.',
  },
  {
    id: 'torn-map',
    title: '찢어진 지도',
    description: '돌아가는 길을 여는 선택입니다. 전투는 피하지만 다음 선택지가 좁아집니다.',
    scene: '지도 끝의 찢긴 선이 안전한 길처럼 보이기 시작합니다.',
    result: '전투는 피했지만, 다음 선택지는 더 좁아졌습니다.',
    shareText: '나는 Wanderer에서 찢어진 지도를 골랐다. 결과: 전투는 피했지만, 다음 선택지가 좁아졌다.',
  },
];

export function resolveWandererMiniPlayResult(cardId: string) {
  return wandererMiniPlayCards.find((card) => card.id === cardId) ?? wandererMiniPlayCards[0];
}
