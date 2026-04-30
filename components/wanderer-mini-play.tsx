'use client';

import { useMemo, useState } from 'react';
import { resolveWandererMiniPlayResult, wandererMiniPlayCards, wandererMiniPlayTurn } from '@/lib/wanderer-mini-play';

const outcomeLabel = {
  win: '승리',
  lose: '패배',
  invalid: '탈락',
} as const;

const outcomeTone = {
  win: 'border-[#7dd3fc]/45 bg-[#7dd3fc]/15 text-[#d8f4ff]',
  lose: 'border-point/40 bg-point/15 text-text',
  invalid: 'border-white/15 bg-white/[0.06] text-subtext',
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
      // 브라우저가 클립보드를 막아도, 아래 공유 문장을 직접 선택해서 복사할 수 있게 둔다.
    }
  };

  return (
    <section id="mini-play" className="scroll-mt-28 rounded-[30px] border border-line/80 bg-[#0e1729] p-4 shadow-card md:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-stretch">
        <div className="rounded-[26px] border border-line/80 bg-[#121c33]/90 p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">한 턴 체험</p>
            <p className="rounded-full border border-point/25 bg-point/10 px-3 py-1 text-[11px] font-black text-point">조건 → 선택 → 결과</p>
          </div>
          <h2 className="mt-3 max-w-[12ch] text-[30px] font-black leading-[0.98] tracking-[-0.06em] text-text md:text-[44px]">
            규칙 보고, 한 장만.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-subtext md:text-[15px]">
            실제 플레이에서 한 턴만 꺼냈어요. 조건에 걸리면 탈락하고, 살아남은 카드끼리 숫자로 겨룹니다.
          </p>

          <div className="mt-5 rounded-[22px] border border-point/25 bg-[#1a2035] p-4">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">이번 규칙</p>
                <p className="mt-1 text-2xl font-black tracking-[-0.045em] text-text">{wandererMiniPlayTurn.condition.label}</p>
              </div>
              <p className="max-w-sm text-sm leading-6 text-subtext">{wandererMiniPlayTurn.ruleSummary}</p>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {wandererMiniPlayTurn.opponents.map((opponent) => (
                <div key={opponent.name} className="rounded-[18px] border border-line/70 bg-[#0f1729] p-3">
                  <p className="text-[11px] font-black text-point">{opponent.name}</p>
                  <p className="mt-1 text-[34px] font-black leading-none tracking-[-0.06em] text-text">{opponent.card}</p>
                  <p className="mt-2 text-xs leading-5 text-subtext">{opponent.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">내 카드</p>
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
                  className={`group grid grid-cols-[74px_minmax(0,1fr)_auto] items-center gap-4 rounded-[22px] border p-3 text-left transition ${
                    isSelected
                      ? 'border-point bg-point text-[#160d08] shadow-card'
                      : 'border-line/80 bg-[#0f1729] text-text hover:border-point/70 hover:bg-[#17233c]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className={`grid h-[74px] place-items-center rounded-[18px] border text-[40px] font-black leading-none tracking-[-0.08em] ${isSelected ? 'border-[#160d08]/20 bg-[#160d08]/10' : 'border-white/10 bg-white/[0.055] text-point group-hover:border-point/40'}`}>
                    {card.value}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-black uppercase tracking-[0.2em] opacity-70">카드 선택</span>
                    <span className="mt-1 block text-xl font-black tracking-[-0.045em]">{card.title}</span>
                    <span className={`mt-1 block text-sm leading-6 ${isSelected ? 'text-[#3d2615]' : 'text-subtext'}`}>{card.description}</span>
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-[11px] font-black ${isSelected ? 'border-[#160d08]/25 bg-[#160d08]/10' : 'border-line/70 bg-black/20 text-point'}`}>
                    {isSelected ? outcomeLabel[card.outcome] : '고르기'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-[26px] border border-line/80 bg-[#0b1020] p-5 md:p-6">
          {selectedCard ? (
            <>
              <div className="space-y-3">
                <div className={`rounded-[24px] border p-5 ${outcomeTone[selectedCard.outcome]}`}>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">이번 턴</p>
                  <p className="mt-2 text-[38px] font-black leading-none tracking-[-0.07em]">{outcomeLabel[selectedCard.outcome]}</p>
                  <p className="mt-4 text-xl font-black leading-snug tracking-[-0.04em] text-text">{selectedCard.result}</p>
                </div>
                <div className="rounded-[22px] border border-line/70 bg-white/[0.055] p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">흐름</p>
                  <p className="mt-2 text-base font-bold leading-7 text-text">{selectedCard.scene}</p>
                </div>
                <div className="rounded-[22px] border border-line/70 bg-white/[0.055] p-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">판정</p>
                  <p className="mt-2 text-xl font-black tracking-[-0.045em] text-text">{selectedCard.isValid ? '규칙 통과 · 숫자 비교' : '규칙 탈락 · 비교 없음'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-[20px] border border-line/70 bg-white/[0.045] p-4 text-sm leading-7 text-subtext">
                  <p className="font-bold text-text">공유 문장</p>
                  <p className="mt-1">{selectedCard.shareText}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={copyResult} className="rounded-full border border-point/30 bg-point px-5 py-3 text-sm font-black text-[#160d08] transition hover:bg-[#ffc47f]">
                    {copied ? '복사됨' : '문장 복사'}
                  </button>
                  <button type="button" onClick={resetPlay} className="rounded-full border border-line/90 bg-white/10 px-5 py-3 text-sm font-black text-text transition hover:border-point/60">
                    다시 고르기
                  </button>
                  <a href="#play-video" className="rounded-full border border-line/90 bg-white/10 px-5 py-3 text-sm font-black text-text transition hover:border-point/60">
                    영상 보기
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[360px] flex-col justify-between rounded-[24px] border border-line/70 bg-[radial-gradient(circle_at_20%_12%,rgba(255,212,71,0.13),transparent_13rem),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-5">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">대기 중</p>
                <p className="mt-4 text-[28px] font-black leading-tight tracking-[-0.06em] text-text md:text-[36px]">
                  왼쪽에서 한 장을 고르면 바로 갈립니다.
                </p>
                <p className="mt-4 text-sm leading-7 text-subtext">
                  여기에는 선택한 카드가 살아남는지, 상대보다 높은지, 이번 턴을 가져오는지가 짧게 뜹니다.
                </p>
              </div>
              <div className="rounded-[20px] border border-line/70 bg-[#10183a]/45 p-4 text-sm leading-7 text-subtext">
                <p className="font-bold text-text">보는 순서</p>
                <p className="mt-1">이번 규칙 → 상대 카드 → 내 카드 → 결과.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
