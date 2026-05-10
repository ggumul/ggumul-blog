import Link from 'next/link';
import { getWorkTraces } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '글',
  description: '꼬물이 작은 게임과 생활 도구를 만들며 바꾼 것들을 날짜순으로 모았습니다.',
  path: '/writing',
});

const TRACE_MEDIA: Record<string, { src: string; alt: string; tone: string }> = {
  'hanoi-two-moves-three-towers': {
    src: '/media/hanoi/2026-05-10/hanoi-two-moves-three-towers.png',
    alt: 'Hanoi에서 세 기둥에 원반이 하나씩 놓인 장면',
    tone: 'bg-butter',
  },
  'wanderer-11-under-15-not-good-card': {
    src: '/media/devlog-gifs/wanderer-rule-result.gif',
    alt: 'Wanderer에서 11 이하 조건 때문에 15 카드를 낼 수 없는 장면',
    tone: 'bg-violet',
  },
};

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function WritingPage() {
  const traces = await getWorkTraces();

  return (
    <div className="archive-surface space-y-7 md:space-y-12">
      <section className="sticker-card max-w-4xl bg-surface p-5 md:p-8">
        <p className="text-[12px] font-black tracking-[0.18em] text-point">글</p>
        <h1 className="mt-3 text-[32px] font-black leading-tight tracking-[-0.055em] text-text md:text-[62px] md:leading-[1.04]">
          만들며 쓴 글
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-8">
          작은 게임을 만들며 바꾼 것, 저녁 장보기를 줄이며 배운 것을 날짜순으로 모았습니다.
        </p>
      </section>

      {traces.length ? (
        <section className="grid gap-4 md:grid-cols-2" aria-label="날짜순 글 목록">
          {traces.map((trace) => {
            const media = TRACE_MEDIA[trace.slug];

            return (
              <Link
                key={trace.slug}
                href={trace.href}
                className="sticker-card group block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#2A2119]"
              >
                {media ? (
                  <span className={`${media.tone} block border-b-2 border-line p-3`}>
                    <img src={media.src} alt={media.alt} className="aspect-video w-full rounded-[18px] border-2 border-line bg-surface object-cover" />
                  </span>
                ) : null}
                <span className="block space-y-3 p-5">
                  <span className="flex flex-wrap items-center gap-2 text-sm font-bold text-subtext">
                    <time dateTime={trace.publishedAt}>{formatDate(trace.publishedAt)}</time>
                    <span>·</span>
                    <span>{trace.projectTitle}</span>
                  </span>
                  <span className="block text-[24px] font-black leading-tight tracking-[-0.045em] text-text md:text-[30px]">
                    {trace.title}
                  </span>
                  <span className="block text-sm leading-7 text-subtext">{trace.summary}</span>
                </span>
              </Link>
            );
          })}
        </section>
      ) : (
        <section className="sticker-card p-5 md:p-7">
          <p className="text-[12px] font-black tracking-[0.16em] text-point">첫 글을 준비하고 있습니다</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-subtext md:text-base md:leading-8">
            읽을 만한 장면이 생기면 이곳에 날짜순으로 올릴게요.
          </p>
        </section>
      )}
    </div>
  );
}
