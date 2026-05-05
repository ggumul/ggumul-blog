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
};

export type WandererMiniPlayTurn = {
  condition: WandererMiniPlayCondition;
  opponents: WandererMiniPlayOpponent[];
  ruleSummary: string;
};

export const wandererMiniPlayTurn: WandererMiniPlayTurn = {
  condition: {
    label: '홀수 카드만 유효',
    description: '이번 턴은 홀수 카드만 살아남습니다. 살아남은 카드끼리는 숫자가 높은 쪽이 턴을 가져갑니다.',
    isCardValid: (value: number) => value % 2 === 1,
  },
  opponents: [
    { name: '상대 A', card: 9, note: '생존' },
    { name: '상대 B', card: 12, note: '탈락' },
    { name: '상대 C', card: 13, note: '생존' },
  ],
  ruleSummary: '짝수는 탈락. 남은 카드끼리 숫자를 비교합니다.',
};

const highestValidOpponentCard = Math.max(
  ...wandererMiniPlayTurn.opponents
    .filter((opponent) => wandererMiniPlayTurn.condition.isCardValid(opponent.card))
    .map((opponent) => opponent.card),
);

function resolveOutcome(value: number): Pick<WandererMiniPlayCard, 'isValid' | 'outcome' | 'scene' | 'result'> {
  const isValid = wandererMiniPlayTurn.condition.isCardValid(value);
  const playedCardText = `카드 ${value}`;
  const subject = `${playedCardText}는`;

  if (!isValid) {
    const result = `${subject} 홀수가 아니라서 바로 탈락합니다. 이번 턴에는 낼 수 없는 카드예요.`;
    return {
      isValid,
      outcome: 'invalid',
      scene: `상대는 9, 12, 13을 냈습니다. 이번 규칙은 ${wandererMiniPlayTurn.condition.label}입니다.`,
      result,
    };
  }

  if (value > highestValidOpponentCard) {
    const result = `${subject} 살아남았고, 상대의 13보다 높아 이번 턴을 가져갑니다.`;
    return {
      isValid,
      outcome: 'win',
      scene: `상대의 최고 생존 카드는 13입니다. ${playedCardText}를 내면 규칙도 통과하고 숫자도 앞섭니다.`,
      result,
    };
  }

  const result = `${subject} 살아남지만, 상대 9보다 낮아서 이번 턴을 가져오지 못합니다.`;
  return {
    isValid,
    outcome: 'lose',
    scene: `상대 A의 9가 먼저 나왔습니다. ${subject} 살아남지만 숫자 싸움에서는 밀립니다.`,
    result,
  };
}

const handCards = [
  {
    id: 'odd-5',
    value: 5,
    title: '5를 낸다',
    description: '생존 · 상대 9보다 낮음',
  },
  {
    id: 'even-10',
    value: 10,
    title: '10을 낸다',
    description: '짝수 · 이번 턴 탈락',
  },
  {
    id: 'odd-15',
    value: 15,
    title: '15를 낸다',
    description: '생존 · 상대 13보다 높음',
  },
] as const;

export const wandererMiniPlayCards: WandererMiniPlayCard[] = handCards.map((card) => ({
  ...card,
  ...resolveOutcome(card.value),
}));

export function resolveWandererMiniPlayResult(cardId: string) {
  return wandererMiniPlayCards.find((card) => card.id === cardId) ?? wandererMiniPlayCards[0];
}
