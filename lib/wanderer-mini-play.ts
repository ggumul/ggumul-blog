export type WandererMiniPlayCondition = {
  label: string;
  description: string;
  isCardValid: (value: number) => boolean;
};

export type WandererMiniPlayOpponent = {
  name: string;
  card: number;
  note: string;
};

export type WandererMiniPlayOutcome = 'win' | 'lose' | 'invalid';

export type WandererMiniPlayCard = {
  id: string;
  value: number;
  title: string;
  description: string;
  isValid: boolean;
  outcome: WandererMiniPlayOutcome;
  scene: string;
  result: string;
  shareText: string;
};

export type WandererMiniPlayTurn = {
  condition: WandererMiniPlayCondition;
  opponents: WandererMiniPlayOpponent[];
  ruleSummary: string;
};

export const wandererMiniPlayTurn: WandererMiniPlayTurn = {
  condition: {
    label: '홀수 카드만 유효',
    description: '이번 턴은 홀수 카드만 살아남습니다. 조건에 맞는 카드 중 가장 높은 숫자가 턴을 가져갑니다.',
    isCardValid: (value: number) => value % 2 === 1,
  },
  opponents: [
    { name: '상대 A', card: 9, note: '조건을 만족한 기준점' },
    { name: '상대 B', card: 12, note: '짝수라 이번 턴 무효' },
    { name: '상대 C', card: 13, note: '현재 가장 높은 유효 카드' },
  ],
  ruleSummary: '조건에 맞지 않는 카드는 무효가 되고, 유효 카드끼리는 숫자가 높은 쪽이 이깁니다.',
};

const highestValidOpponentCard = Math.max(
  ...wandererMiniPlayTurn.opponents
    .filter((opponent) => wandererMiniPlayTurn.condition.isCardValid(opponent.card))
    .map((opponent) => opponent.card),
);

function resolveOutcome(value: number): Pick<WandererMiniPlayCard, 'isValid' | 'outcome' | 'scene' | 'result' | 'shareText'> {
  const isValid = wandererMiniPlayTurn.condition.isCardValid(value);
  const playedCardText = `카드 ${value}`;

  if (!isValid) {
    const result = `${playedCardText}은 홀수 조건에 맞지 않아 무효입니다. 낼 수 있는 카드가 없다면 그대로 탈락합니다.`;
    return {
      isValid,
      outcome: 'invalid',
      scene: `상대가 9, 12, 13을 냈고, 이번 조건은 ${wandererMiniPlayTurn.condition.label}입니다.`,
      result,
      shareText: `Wanderer 30초 샘플: ${wandererMiniPlayTurn.condition.label}에서 ${playedCardText}을 냈다. 결과: ${result}`,
    };
  }

  if (value > highestValidOpponentCard) {
    const result = `${playedCardText}은 조건을 만족하고 상대 13보다 높아 이번 턴 승리입니다.`;
    return {
      isValid,
      outcome: 'win',
      scene: `상대의 최고 유효 카드는 13입니다. ${playedCardText}을 내면 조건과 숫자를 모두 봐야 합니다.`,
      result,
      shareText: `Wanderer 30초 샘플: ${wandererMiniPlayTurn.condition.label}에서 ${playedCardText}을 냈다. 결과: ${result}`,
    };
  }

  const result = `${playedCardText}은 유효하지만 상대 9보다 낮아 이번 턴을 가져오지 못합니다.`;
  return {
    isValid,
    outcome: 'lose',
    scene: `상대 A가 낸 9가 먼저 보입니다. ${playedCardText}은 조건을 통과하지만 숫자 싸움이 남습니다.`,
    result,
    shareText: `Wanderer 30초 샘플: ${wandererMiniPlayTurn.condition.label}에서 ${playedCardText}을 냈다. 결과: ${result}`,
  };
}

const handCards = [
  {
    id: 'odd-5',
    value: 5,
    title: '5를 낸다',
    description: '조건에는 맞는 유효 카드입니다. 다만 상대 숫자와 다시 비교해야 합니다.',
  },
  {
    id: 'even-10',
    value: 10,
    title: '10을 낸다',
    description: '숫자는 높아 보여도 홀수 조건에 맞지 않아 무효가 됩니다.',
  },
  {
    id: 'odd-15',
    value: 15,
    title: '15를 낸다',
    description: '조건을 만족하고 상대의 가장 높은 유효 카드보다 높은 선택입니다.',
  },
] as const;

export const wandererMiniPlayCards: WandererMiniPlayCard[] = handCards.map((card) => ({
  ...card,
  ...resolveOutcome(card.value),
}));

export function resolveWandererMiniPlayResult(cardId: string) {
  return wandererMiniPlayCards.find((card) => card.id === cardId) ?? wandererMiniPlayCards[0];
}
