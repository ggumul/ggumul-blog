import Link from 'next/link';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물은 작은 게임과 생활 도구를 만들며 남기는 글입니다.',
  path: '/',
  ogImage: '/project-covers/wanderer.png',
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

const PROJECT_TONES: Record<string, string> = {
  wanderer: 'bg-violet text-white',
  hanoi: 'bg-butter text-text',
  'color-hanoi': 'bg-mint text-text',
  trpg: 'bg-peach text-text',
  'ggumul-dinner-grocery': 'bg-[#CBEF8F] text-text',
};

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const latestTrace = snapshot.latestTrace;
  const traceFlow = snapshot.traces.slice(0, 3);
  const projectLinks = snapshot.worklines.slice(0, 4);
  const latestMedia = latestTrace ? TRACE_MEDIA[latestTrace.slug] : null;

  return (
    <div className="archive-surface space-y-9 md:space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="grid gap-5 md:grid-cols-[minmax(0,1fr)_320px] md:items-end">
        <div className="sticker-card relative overflow-hidden p-4 md:p-8">
          <span className="absolute right-4 top-4 rounded-full border-2 border-line bg-butter px-2.5 py-1 text-[10px] font-black tracking-[0.12em] md:right-5 md:top-5 md:px-3 md:text-[11px]">
            TINY WORKSHOP
          </span>
          <p className="text-[12px] font-black tracking-[0.18em] text-point">꼬물</p>
          <h1 className="mt-3 max-w-3xl text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:mt-4 md:text-[62px] md:leading-[1.02]">
            작은 장면을 만들고, 한 번 더 만져봅니다.
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-7 text-subtext md:mt-4 md:text-[18px] md:leading-8">
            게임과 생활 도구를 크게 포장하지 않고, 실제로 본 화면과 바뀐 선택을 글로 남깁니다.
          </p>
        </div>
        <div className="hidden rounded-[28px] border-2 border-line bg-surface p-4 shadow-card md:block">
          <div className="grid aspect-square place-items-center rounded-[20px] bg-butter">
            <img src="/ggumul-night-snail-icon.png" alt="" className="h-44 w-44 rounded-[34px] object-cover" />
          </div>
        </div>
      </section>

      {latestTrace ? (
        <section className="grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] md:items-stretch">
          <Link href={latestTrace.href} className="sticker-card group block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#2A2119]">
            {latestMedia ? (
              <div className={`${latestMedia.tone} border-b-2 border-line p-3`}>
                <img src={latestMedia.src} alt={latestMedia.alt} className="aspect-video w-full rounded-[18px] border-2 border-line bg-surface object-cover" />
              </div>
            ) : null}
            <div className="space-y-3 p-5 md:p-6">
              <p className="text-[12px] font-black tracking-[0.16em] text-point">최근 글</p>
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-subtext">
                <time dateTime={latestTrace.publishedAt}>{formatDate(latestTrace.publishedAt)}</time>
                <span>·</span>
                <span>{latestTrace.projectTitle}</span>
              </div>
              <h2 className="text-[28px] font-black leading-tight tracking-[-0.05em] text-text md:text-[42px]">
                {latestTrace.title}
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-subtext md:text-base md:leading-8">{latestTrace.summary}</p>
            </div>
          </Link>

          <div className="sticker-card self-start bg-[#FFF0B8] p-5 md:p-6">
            <p className="text-[12px] font-black tracking-[0.16em] text-point">다음 흐름</p>
            <h2 className="mt-2 text-[22px] font-black tracking-[-0.04em] text-text md:text-[30px]">날짜가 이어지는 글</h2>
            <p className="mt-2 text-sm leading-7 text-subtext">방금 본 장면과 이어지는 글만 짧게 둡니다.</p>
            <div className="mt-4 space-y-3">
              {traceFlow.map((trace) => (
                <Link key={trace.slug} href={trace.href} className="block border-t-2 border-line/25 pt-3 hover:text-point">
                  <time className="text-xs font-bold text-subtext" dateTime={trace.publishedAt}>{formatDate(trace.publishedAt)}</time>
                  <span className="mt-1 block text-base font-black leading-snug tracking-[-0.035em] text-text">{trace.title}</span>
                </Link>
              ))}
            </div>
            <Link href="/writing" className="game-button-secondary mt-5">글 목록</Link>
          </div>
        </section>
      ) : (
        <section className="sticker-card p-5 md:p-7">
          <p className="text-[12px] font-black tracking-[0.16em] text-point">첫 글을 준비하고 있습니다</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-subtext md:text-base md:leading-8">
            보여줄 만한 장면이 생기면 이곳에 날짜순으로 올릴게요.
          </p>
        </section>
      )}

      {projectLinks.length ? (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-black tracking-[0.16em] text-point">만드는 것들</p>
              <h2 className="mt-2 text-[24px] font-black tracking-[-0.04em] text-text md:text-[36px]">책상 위 작은 것들</h2>
            </div>
            <Link href="/projects" className="game-button-secondary">모두 보기</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {projectLinks.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="sticker-card block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#2A2119]">
                <span className={`block border-b-2 border-line px-4 py-3 text-sm font-black ${PROJECT_TONES[project.slug] ?? 'bg-surface text-text'}`}>
                  {project.title}
                </span>
                <span className="block p-4 text-sm leading-7 text-subtext">{project.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
