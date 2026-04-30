'use client';

import { useMemo, useState } from 'react';
import { resolveWandererMiniPlayResult, wandererMiniPlayCards, wandererMiniPlayTurn } from '@/lib/wanderer-mini-play';

const outcomeLabel = {
  win: '턴 획득',
  lose: '생존 · 패배',
  invalid: '탈락',
} as const;

const outcomeTone = {
  win: 'border-[#7dd3fc]/45 bg-[#7dd3fc]/16 text-[#d8f4ff]',
  lose: 'border-point/40 bg-point/14 text-text',
  invalid: 'border-white/15 bg-white/[0.06] text-subtext',
} as const;

const outcomeDot = {
  win: 'bg-[#7dd3fc]',
  lose: 'bg-point',
  invalid: 'bg-white/35',
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
      // 브라우저가 클립보드를 막아도, 아래 문장을 직접 선택해서 복사할 수 있게 둔다.
    }
  };

  return (
    <section id="mini-play" className="scroll-mt-28 rounded-[32px] border border-line/80 bg-[#0b1020] p-4 shadow-card md:p-6">
      <div className="rounded-[28px] border border-line/80 bg-[radial-gradient(circle_at_18%_0%,rgba(255,212,71,0.13),transparent_18rem),linear-gradient(180deg,rgba(18,28,51,0.98),rgba(10,16,31,0.98))] p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(260px,0.28fr)] lg:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">Wanderer · 한 턴</p>
            <h2 className="mt-3 max-w-[13ch] text-[34px] font-black leading-[0.95] tracking-[-0.065em] text-text md:text-[52px]">
              규칙을 보고<br />카드 한 장을 냅니다.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-subtext md:text-[15px] lg:justify-self-end">
            이번 턴은 <span className="font-black text-text">규칙 → 상대 카드 → 내 카드 → 결과</span> 순서로만 봅니다. 다른 설명은 빼고, 한 장을 냈을 때 살아남는지만 바로 확인합니다.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.62fr)_minmax(280px,0.38fr)]">
          <div className="rounded-[26px] border border-point/25 bg-[#17203a]/92 p-4 md:p-5">
            <div className="grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-stretch">
              <div className="rounded-[22px] border border-point/30 bg-point p-4 text-[#160d08]">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] opacity-70">규칙</p>
                <p className="mt-2 text-[30px] font-black leading-none tracking-[-0.06em] md:text-[38px]">{wandererMiniPlayTurn.condition.label}</p>
                <p className="mt-4 text-sm font-bold leading-6 opacity-85">{wandererMiniPlayTurn.ruleSummary}</p>
              </div>

              <div className="rounded-[22px] border border-line/70 bg-[#0f1729] p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">상대 카드</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {wandererMiniPlayTurn.opponents.map((opponent) => (
                    <div key={opponent.name} className="rounded-[18px] border border-line/70 bg-white/[0.055] p-3 text-center">
                      <p className="text-[10px] font-black text-subtext">{opponent.name.replace('상대 ', '')}</p>
                      <p className="mt-1 text-[34px] font-black leading-none tracking-[-0.07em] text-text">{opponent.card}</p>
                      <p className="mt-2 text-[11px] font-bold leading-4 text-subtext">{opponent.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">내 카드</p>
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
                      className={`group flex min-h-[172px] flex-col justify-between rounded-[24px] border p-4 text-left transition ${
                        isSelected
                          ? 'border-point bg-point text-[#160d08] shadow-card'
                          : 'border-line/80 bg-[#0f1729] text-text hover:-translate-y-0.5 hover:border-point/70 hover:bg-[#17233c]'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-[58px] font-black leading-none tracking-[-0.09em]">{card.value}</span>
                        <span className={`mt-1 h-3 w-3 rounded-full ${isSelected ? 'bg-[#160d08]' : outcomeDot[card.outcome]}`} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-lg font-black tracking-[-0.045em]">{card.title}</span>
                        <span className={`mt-2 block text-sm font-bold leading-6 ${isSelected ? 'text-[#3d2615]' : 'text-subtext'}`}>{card.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className={`flex min-h-[280px] flex-col justify-between rounded-[26px] border p-5 ${selectedCard ? outcomeTone[selectedCard.outcome] : 'border-line/80 bg-[#0f1729] text-subtext'}`}>
            {selectedCard ? (
              <>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">선택 결과</p>
                  <p className="mt-3 text-[42px] font-black leading-none tracking-[-0.075em] text-text md:text-[54px]">{outcomeLabel[selectedCard.outcome]}</p>
                  <p className="mt-5 text-xl font-black leading-snug tracking-[-0.04em] text-text">{selectedCard.result}</p>
                  <p className="mt-4 rounded-[18px] border border-white/10 bg-black/15 p-4 text-sm font-bold leading-7 text-subtext">{selectedCard.scene}</p>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="rounded-[18px] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-subtext">{selectedCard.shareText}</p>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={copyResult} className="rounded-full border border-point/30 bg-point px-5 py-3 text-sm font-black text-[#160d08] transition hover:bg-[#ffc47f]">
                      {copied ? '복사됨' : '복사'}
                    </button>
                    <button type="button" onClick={resetPlay} className="rounded-full border border-line/90 bg-white/10 px-5 py-3 text-sm font-black text-text transition hover:border-point/60">
                      다시 선택
                    </button>
                    <a href="#play-video" className="rounded-full border border-line/90 bg-white/10 px-5 py-3 text-sm font-black text-text transition hover:border-point/60">
                      영상
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col justify-center">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">선택 결과</p>
                <p className="mt-4 text-[30px] font-black leading-tight tracking-[-0.06em] text-text md:text-[38px]">결과가 여기에 뜹니다.</p>
                <p className="mt-4 text-sm font-bold leading-7 text-subtext">카드를 고르면 생존, 탈락, 턴 획득만 짧게 보여줍니다.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
