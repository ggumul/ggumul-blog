'use client';

import { useState } from 'react';

const cards = [
  {
    value: 5,
    label: '카드 5',
    text: '5는 홀수라 버려지지 않습니다. 하지만 남은 카드끼리 비교하면 15가 이깁니다.',
  },
  {
    value: 10,
    label: '카드 10',
    text: '10은 짝수라 이번 규칙에서 버려집니다.',
  },
  {
    value: 15,
    label: '카드 15',
    text: '15는 홀수라 남고, 마지막 비교에서도 이깁니다.',
  },
] as const;

export function WandererTurnStrip() {
  const [selected, setSelected] = useState<(typeof cards)[number]>(cards[1]);

  return (
    <section className="rounded-[2rem] border border-[#2d2620] bg-[#17120f] p-5 text-[#f2eadf] shadow-[0_18px_60px_rgba(0,0,0,0.24)] md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b98f64]">이번 규칙</p>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#fff7ec]">홀수만 남기고 숫자를 비교합니다</h2>
          <p className="max-w-2xl text-sm leading-7 text-[#cdbfac]">
            이번 판의 손패는 5, 10, 15입니다. 홀수는 남고, 짝수는 버려지고, 남은 카드 중 큰 수가 이깁니다.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {cards.map((card) => {
          const active = selected.value === card.value;

          return (
            <button
              key={card.value}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(card)}
              className={[
                'rounded-2xl border px-4 py-5 text-left transition',
                active
                  ? 'border-[#f2b46d] bg-[#2a1d14] text-[#fff7ec] shadow-[0_12px_30px_rgba(242,180,109,0.16)]'
                  : 'border-[#3a3028] bg-[#201914] text-[#d7c7b4] hover:border-[#8f6844] hover:bg-[#251c16]',
              ].join(' ')}
            >
              <span className="block text-sm font-semibold">{card.label}</span>
              <span className="mt-2 block text-3xl font-bold tracking-[-0.05em]">{card.value}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 rounded-2xl border border-[#3a3028] bg-[#100c0a] px-4 py-4 text-base font-semibold leading-7 text-[#fff7ec]">
        {selected.text}
      </p>
    </section>
  );
}
