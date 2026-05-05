import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Pill } from '@/components/brand-ui';
import { WandererMiniPlay } from '@/components/wanderer-mini-play';
import { getProjectBySlug, getProjects, getWriting, resolveProjectRecords } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export async function generateStaticParams() {
  const games = await getProjects();
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getProjectBySlug(slug);

  if (!game) {
    return createMetadata({
      title: '게임을 찾을 수 없음',
      description: '요청한 게임을 찾을 수 없습니다.',
      path: `/projects/${slug}`,
    });
  }

  return createMetadata({
    title: game.slug === 'wanderer' ? 'Wanderer — 카드 한 턴' : `${game.title} 게임 글`,
    description: game.slug === 'wanderer'
      ? '규칙을 보고 카드 한 장을 고르는 Wanderer의 짧은 한 턴입니다.'
      : game.summary,
    path: `/projects/${game.slug}`,
    ogImage: game.coverImage,
  });
}

function RelatedPostRows({ posts }: { posts: Awaited<ReturnType<typeof getWriting>> }) {
  if (posts.length === 0) {
    return <p className="border-t border-line/70 py-4 text-sm leading-7 text-subtext">아직 함께 읽을 글은 많지 않습니다. 새 글이 생기면 이곳에서 이어 보겠습니다.</p>;
  }

  return (
    <div className="divide-y divide-line/70 border-y border-line/70">
      {posts.map((post) => (
        <Link key={post.slug} href={`/writing/${post.slug}`} className="block py-4 transition hover:text-text">
          <div className="text-lg font-black tracking-[-0.04em] text-text">{post.title}</div>
          <p className="mt-1 max-w-3xl text-sm leading-7 text-subtext">{post.summary}</p>
        </Link>
      ))}
    </div>
  );
}

function WandererFeaturePage({ relatedPosts }: { relatedPosts: Awaited<ReturnType<typeof getWriting>> }) {
  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <Link href="/projects" className="text-sm font-semibold text-subtext transition hover:text-point">
        ← 게임 목록
      </Link>

      <section className="space-y-5 border-b border-line/60 pb-6 md:space-y-7 md:pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-[12px] font-black uppercase tracking-[0.18em] text-point">Wanderer · 모바일 카드 게임</p>
          <h1 className="max-w-4xl text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[72px] md:leading-[1.02]">
            한 장 고르고, 바로 결과를 읽습니다.
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
            Wanderer는 한 판이 길어질수록 힘이 빠졌습니다. 그래서 이 페이지는 설명을 앞세우기보다 홀수 카드만 유효한 한 턴에서 시작합니다. 5, 10, 15 중 한 장을 고르면 선택이 곧바로 승부로 이어집니다.
          </p>
          <a href="#mini-play" className="inline-flex text-sm font-black text-point hover:text-text">카드 한 장 고르기 →</a>
        </div>
        <dl className="grid gap-3 text-sm text-subtext sm:grid-cols-3">
          <div className="border-t border-line/40 pt-3">
            <dt className="font-black text-point">한 판</dt>
            <dd className="mt-1">짧게 끝나는 1분 판</dd>
          </div>
          <div className="border-t border-line/40 pt-3">
            <dt className="font-black text-point">상대</dt>
            <dd className="mt-1">9 · 12 · 13 중 13이 남음</dd>
          </div>
          <div className="border-t border-line/40 pt-3">
            <dt className="font-black text-point">선택</dt>
            <dd className="mt-1">15를 내면 턴 획득</dd>
          </div>
        </dl>
      </section>

      <WandererMiniPlay />

      <figure id="play-video" className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-line/60 bg-surface/40">
        <video className="max-h-[560px] w-full object-contain" src="/media/runtime-checks/wanderer-mobile-demo.mp4" poster="/project-covers/wanderer.png" autoPlay muted loop playsInline />
        <figcaption className="flex items-center justify-between gap-3 border-t border-line/60 px-4 py-3 text-xs font-semibold text-subtext">
          <span>규칙을 읽고, 한 장을 고르고, 승부를 읽습니다</span>
          <span>플레이 영상</span>
        </figcaption>
      </figure>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-5">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-point">Wanderer</p>
          <h2 className="text-[30px] font-black leading-tight tracking-[-0.03em] text-text md:text-[46px]">짧은 턴이 계속 이어지는 카드 게임</h2>
          <div className="prose max-w-none">
            <p>Wanderer는 턴마다 규칙을 보고 손패에서 카드 한 장을 내는 게임입니다. 규칙에 맞지 않는 카드는 빠지고, 살아남은 카드 중 숫자가 높은 쪽이 턴을 가져갑니다.</p>
            <p>중요한 건 규칙표를 많이 외우는 일이 아닙니다. 이번 조건을 읽는 순간 손에 든 카드의 의미가 달라지고, 그중 하나를 고르면 생존과 승패가 바로 이어져야 합니다.</p>
            <p>지금 미니 플레이는 그 기준만 남긴 작은 판입니다. 카드 10은 조건에서 빠지고, 5는 살아남지만 약하며, 15는 상대를 넘길 수 있습니다. 한 장의 카드로 승부가 납니다.</p>
          </div>
        </div>

        <aside className="space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">한 턴 뒤에 읽을 글</div>
            <Link href="/writing/wanderer-one-card" className="block border-t border-line/70 py-4 text-point transition hover:text-text">
              <div className="font-black tracking-[-0.03em]">고른 순간, 승부가 갈립니다</div>
              <p className="mt-1 text-[13px] leading-6 text-subtext">한 장을 고른 뒤 카드와 결과가 나란히 보여야 하는 이유를 적었습니다.</p>
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">Wanderer 글</div>
            <RelatedPostRows posts={relatedPosts} />
          </div>
        </aside>
      </section>
    </article>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getProjectBySlug(slug);

  if (!game) {
    notFound();
  }

  const posts = await getWriting();
  const relatedPosts = resolveProjectRecords(game, posts);
  const latestRecord = relatedPosts[0];

  if (game.slug === 'wanderer') {
    return <WandererFeaturePage relatedPosts={relatedPosts} />;
  }

  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <Link href="/projects" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 게임 목록으로
      </Link>

      <PageHero eyebrow="game" title={<>{game.title}<br />게임 글</>} description={game.summary}>
        <div className="space-y-3">
          <Pill tone="point">{game.status}</Pill>
          {latestRecord ? <Pill>최근 {latestRecord.publishedAt}</Pill> : null}
        </div>
      </PageHero>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-8">
          {game.coverImage ? (
            <figure className="overflow-hidden rounded-[24px] border border-line/70 bg-surface/60">
              <img alt={`${game.title} 대표 이미지`} className="max-h-[560px] w-full object-cover" src={game.coverImage} />
              <figcaption className="flex items-center justify-between gap-3 border-t border-line/70 px-4 py-3 text-xs font-semibold text-subtext">
                <span>{game.title}</span>
                <span>{game.status}</span>
              </figcaption>
            </figure>
          ) : null}

          <section className="prose max-w-none" dangerouslySetInnerHTML={{ __html: game.html }} />
        </div>

        <aside className="space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">다음에 읽을 것</div>
            <Link href={latestRecord ? `/writing/${latestRecord.slug}` : '/writing'} className="block border-t border-line/70 py-4 text-point transition hover:text-text">
              <div className="font-black tracking-[-0.03em]">{latestRecord ? '새 게임 글' : '게임 글'}</div>
              <p className="mt-1 text-[13px] leading-6 text-subtext">{latestRecord ? latestRecord.summary : '게임과 관련된 글을 함께 읽을 수 있습니다.'}</p>
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">함께 읽을 글</div>
            <RelatedPostRows posts={relatedPosts} />
          </div>
        </aside>
      </section>
    </article>
  );
}
