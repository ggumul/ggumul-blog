import Link from 'next/link';

const contactHref = 'mailto:hwang95903@gmail.com?subject=%EA%BC%AC%EB%AC%BC%20%ED%94%8C%EB%A0%88%EC%9D%B4%20%ED%94%BC%EB%93%9C%EB%B0%B1&body=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94.%20%EA%BC%AC%EB%AC%BC%20%EA%B2%8C%EC%9E%84%EC%9D%84%20%EB%B3%B4%EA%B3%A0%20%EC%99%94%EC%8A%B5%EB%8B%88%EB%8B%A4.%0A%0A%EB%B3%B4%EA%B3%A0%20%EC%8B%B6%EC%9D%80%20%EA%B2%83%2F%ED%94%BC%EB%93%9C%EB%B0%B1%3A%0A';
const shareText = '1분 안에 한 판 끝나는 작은 카드 게임 Wanderer를 만들고 있어요. 실제 화면을 보면서 고친 것들을 기록하고 있습니다.';
const shareUrl = 'https://ggumul-blog.vercel.app/projects/wanderer';
const xShareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

const actionCards = [
  {
    label: '소식 받기',
    title: 'RSS로 새 기록 받기',
    description: '새 개발기록이 올라오면 RSS로 조용히 받아볼 수 있어요.',
    href: '/feed.xml',
    external: false,
  },
  {
    label: '피드백 보내기',
    title: '짧게 감상 남기기',
    description: '헷갈린 화면, 궁금한 카드, 보고 싶은 다음 장면이 있으면 짧게 보내주세요.',
    href: contactHref,
    external: false,
  },
  {
    label: '공유하기',
    title: 'X에 짧게 남기기',
    description: '이상했거나 재밌었던 장면이 있다면 짧게 남겨주세요. 다음에 고칠 때 같이 보겠습니다.',
    href: xShareHref,
    external: true,
  },
];

export function CommunityCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section id="follow" className="overflow-hidden rounded-[34px] border border-point/25 bg-[radial-gradient(circle_at_18%_10%,rgba(255,180,95,0.22),transparent_18rem),linear-gradient(135deg,rgba(255,180,95,0.07),rgba(255,255,255,0.035))] p-5 md:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-start">
        <div className="space-y-4">
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">follow along</p>
          <h2 className="max-w-3xl text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[52px]">
            다음에 어떻게 바뀌는지 같이 봐요.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-subtext md:text-base md:leading-8">
            지금은 조용히 만들고 있습니다. 다만 혼자만 보고 고치기보다는, 관심 있는 분들이 새 기록을 받아보고 짧은 감상도 남길 수 있게 열어뒀어요.
          </p>
          {!compact ? (
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">공유 문구</p>
              <p className="mt-2 text-sm leading-7 text-text">“1분 안에 한 판 끝나는 작은 카드 게임을 만들고 있어요. 실제 화면을 보면서 고친 것들을 기록하고 있습니다.”</p>
            </div>
          ) : null}
        </div>

        <div className="grid gap-3">
          {actionCards.map((card) => {
            const className = 'group rounded-[24px] border border-line/80 bg-black/20 p-4 transition hover:border-point/60 hover:bg-white/[0.075]';
            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-point">{card.label}</p>
                    <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-text group-hover:text-point">{card.title}</h3>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-point/25 bg-point/10 text-point">↗</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-subtext">{card.description}</p>
              </>
            );

            return card.external ? (
              <a key={card.title} href={card.href} target="_blank" rel="noreferrer" className={className}>{content}</a>
            ) : card.href.startsWith('mailto:') ? (
              <a key={card.title} href={card.href} className={className}>{content}</a>
            ) : (
              <Link key={card.title} href={card.href} className={className}>{content}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
