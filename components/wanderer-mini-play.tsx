'use client';

import { useMemo, useState } from 'react';
import { resolveWandererMiniPlayResult, wandererMiniPlayCards, wandererMiniPlayTurn } from '@/lib/wanderer-mini-play';

const outcomeLabel = {
  win: '턴 획득',
  lose: '생존 · 패배',
  invalid: '탈락',
} as const;

const outcomeTone = {
  win: 'border-[#7dd3fc]/35 text-[#d8f4ff]',
  lose: 'border-point/35 text-text',
  invalid: 'border-line/45 text-subtext',
} as const;

export function WandererMiniPlay() {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const selectedCard = useMemo(() => (selectedCardId ? resolveWandererMiniPlayResult(selectedCardId) : null), [selectedCardId]);

  const resetPlay = () => {
    setSelectedCardId(null);
    setCopied(false);
  };

  const copyResult = async () => {
    if (!selectedCard) return;
    setCopied(true);
    try {
      await navigator.clipboard?.writeText(selectedCard.shareText);
    } catch {
      // 클립보드가 막히면 아래 문장을 직접 복사하면 된다.
    }
  };

  return (
    <section id="mini-play" className="scroll-mt-28 border-y border-line/45 py-5 md:py-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-point">Wanderer · 한 턴</p>
            <h2 className="mt-3 max-w-2xl text-[32px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">
              이번 턴에 낼 카드를 고릅니다.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-subtext md:text-[15px]">
              {wandererMiniPlayTurn.condition.label}. 짝수는 빠지고, 남은 카드끼리 숫자를 겨룹니다.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="border-t border-line/35 pt-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-point">규칙</p>
              <p className="mt-2 text-2xl font-black tracking-[-0.045em] text-text">{wandererMiniPlayTurn.condition.label}</p>
              <p className="mt-2 text-sm leading-6 text-subtext">{wandererMiniPlayTurn.ruleSummary}</p>
            </div>
            <div className="border-t border-line/35 pt-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-point">상대</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-subtext">
                {wandererMiniPlayTurn.opponents.map((opponent) => (
                  <li key={opponent.name} className="flex justify-between gap-3">
                    <span>{opponent.name}</span>
                    <strong className="text-text">{opponent.card}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-point">내 카드</p>
              <p className="text-xs font-bold text-subtext">한 장만 선택</p>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {wandererMiniPlayCards.map((card) => {
                const isSelected = card.id === selectedCard?.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      setSelectedCardId(card.id);
                      setCopied(false);
                    }}
                    className={`min-h-[148px] rounded-[18px] border p-4 text-left ${
                      isSelected ? 'border-point bg-point text-[#160d08]' : 'border-line/60 bg-white/[0.035] text-text hover:border-point/60'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="block text-[48px] font-black leading-none tracking-[-0.08em]">{card.value}</span>
                    <span className="mt-4 block text-lg font-black tracking-[-0.04em]">{card.title}</span>
                    <span className={`mt-2 block text-sm leading-6 ${isSelected ? 'text-[#3d2615]' : 'text-subtext'}`}>{card.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div aria-live="polite" className={`border-t pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0 ${selectedCard ? outcomeTone[selectedCard.outcome] : 'border-line/45 text-subtext'}`}>
          {selectedCard ? (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-point">선택</p>
                <p className="mt-3 text-[38px] font-black leading-none tracking-[-0.065em] text-text">{outcomeLabel[selectedCard.outcome]}</p>
                <p className="mt-4 text-lg font-black leading-snug tracking-[-0.035em] text-text">{selectedCard.result}</p>
                <p className="mt-3 text-sm leading-7 text-subtext">{selectedCard.scene}</p>
              </div>
              <p className="text-sm leading-7 text-subtext">{selectedCard.shareText}</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={copyResult} className="game-button-primary text-sm">{copied ? '복사됨' : '복사'}</button>
                <button type="button" onClick={resetPlay} className="game-button-secondary text-sm">다시 선택</button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[240px] flex-col justify-center">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-point">선택</p>
              <p className="mt-4 text-[28px] font-black leading-tight tracking-[-0.05em] text-text">아직 카드를 내지 않았습니다.</p>
              <p className="mt-4 text-sm leading-7 text-subtext">5, 10, 15 중 하나를 고르면 이번 턴의 승부가 나옵니다.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
