'use client';

import { useMemo, useState } from 'react';
import { resolveWandererMiniPlayResult, wandererMiniPlayCards, wandererMiniPlayTurn } from '@/lib/wanderer-mini-play';

const outcomeLabel = {
  win: '승리',
  lose: '패배',
  invalid: '무효',
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
    if (!selectedCard) {
      return;
    }

    setCopied(true);

    try {
      await navigator.clipboard?.writeText(selectedCard.shareText);
    } catch {
      // 브라우저가 클립보드를 막아도, 바로 아래 결과 문장을 직접 선택해서 복사할 수 있게 둔다.
    }
  };

  return (
    <section id="mini-play" className="scroll-mt-28 rounded-[34px] border border-point/30 bg-point/10 p-4 shadow-glow md:p-6">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-[28px] border border-line/80 bg-[#10182c]/80 p-5 md:p-7">
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">30초 미니 턴</p>
          <h2 className="mt-3 text-[32px] font-black leading-tight tracking-[-0.06em] text-text md:text-[52px]">
            조건을 보고 한 장을 냅니다.
          </h2>
          <p className="mt-4 text-sm leading-7 text-subtext md:text-base md:leading-8">
            완성 게임 배포가 아니라, Wanderer의 한 턴 판단을 줄인 샘플입니다. 조건에 맞지 않으면 무효가 되고, 유효 카드끼리는 숫자가 높은 쪽이 턴을 가져갑니다.
          </p>

          <div className="mt-5 grid gap-3 rounded-[22px] border border-point/25 bg-point/10 p-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">이번 턴 조건</p>
              <p className="mt-2 text-2xl font-black tracking-[-0.045em] text-text">{wandererMiniPlayTurn.condition.label}</p>
              <p className="mt-2 text-sm leading-6 text-subtext">{wandererMiniPlayTurn.ruleSummary}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {wandererMiniPlayTurn.opponents.map((opponent) => (
                <div key={opponent.name} className="rounded-[18px] border border-line/70 bg-white/[0.055] p-3">
                  <p className="text-[11px] font-black text-point">{opponent.name}</p>
                  <p className="mt-1 text-3xl font-black tracking-[-0.06em] text-text">{opponent.card}</p>
                  <p className="mt-1 text-xs leading-5 text-subtext">{opponent.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">내 손패</p>
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
                  className={`rounded-[22px] border p-4 text-left transition ${
                    isSelected
                      ? 'border-point bg-point text-[#160d08] shadow-card'
                      : 'border-line/80 bg-white/[0.055] text-text hover:border-point/70 hover:bg-white/[0.09]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] opacity-75">카드 {card.value}</span>
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-black ${isSelected ? 'border-[#160d08]/25 bg-[#160d08]/10' : 'border-line/70 bg-black/20 text-point'}`}>{isSelected ? outcomeLabel[card.outcome] : '선택'}</span>
                  </span>
                  <span className="mt-1 block text-2xl font-black tracking-[-0.05em]">{card.title}</span>
                  <span className={`mt-2 block text-sm leading-6 ${isSelected ? 'text-[#3d2615]' : 'text-subtext'}`}>{card.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-[28px] border border-line/80 bg-black/30 p-5 md:p-7">
          {selectedCard ? (
            <>
              <div className="space-y-4">
                <div className="rounded-[24px] border border-line/70 bg-white/[0.06] p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">판정 전 상황</p>
                  <p className="mt-3 text-2xl font-black leading-snug tracking-[-0.04em] text-text">{selectedCard.scene}</p>
                </div>
                <div className="rounded-[24px] border border-line/70 bg-white/[0.06] p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">유효 여부</p>
                  <p className="mt-3 text-3xl font-black leading-snug tracking-[-0.055em] text-text">{selectedCard.isValid ? '조건 통과 · 유효 카드' : '조건 불일치 · 무효 카드'}</p>
                </div>
                <div className="rounded-[24px] border border-point/35 bg-point/15 p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">승패 결과</p>
                  <p className="mt-3 text-3xl font-black leading-snug tracking-[-0.055em] text-text">{selectedCard.result}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4 text-sm leading-7 text-subtext">
                  <p className="font-bold text-text">결과 문장</p>
                  <p className="mt-1">{selectedCard.shareText}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={copyResult} className="rounded-full border border-point/30 bg-point px-5 py-3 text-sm font-black text-[#160d08] transition hover:bg-[#ffc47f]">
                    {copied ? '복사했습니다' : '결과 문장 복사'}
                  </button>
                  <button type="button" onClick={resetPlay} className="rounded-full border border-line/90 bg-white/10 px-5 py-3 text-sm font-black text-text transition hover:border-point/60">
                    다시 고르기
                  </button>
                  <a href="#play-video" className="rounded-full border border-line/90 bg-white/10 px-5 py-3 text-sm font-black text-text transition hover:border-point/60">
                    실제 영상 보기
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[420px] flex-col justify-between rounded-[24px] border border-point/25 bg-[radial-gradient(circle_at_20%_12%,rgba(255,212,71,0.2),transparent_14rem),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">아직 선택 전</p>
                <p className="mt-4 text-[34px] font-black leading-tight tracking-[-0.06em] text-text md:text-[46px]">
                  먼저 조건을 보고 한 장만 골라보세요.
                </p>
                <p className="mt-4 text-base leading-8 text-subtext">
                  버튼을 누르면 유효·무효 판정과 상대 카드보다 높은지 바로 나옵니다. Wanderer의 전체 한 판이 아니라, 조건을 읽고 카드를 내는 한 턴만 짧게 줄였습니다.
                </p>
              </div>
              <div className="rounded-[20px] border border-line/70 bg-[#10183a]/45 p-4 text-sm leading-7 text-subtext">
                <p className="font-bold text-text">선택하면 보이는 것</p>
                <p className="mt-1">이번 턴 조건, 상대 카드, 내 손패, 유효·무효 판정, 승패 결과.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
