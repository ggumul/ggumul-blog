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
    title: game.slug === 'wanderer' ? 'Wanderer — 카드 한 턴' : `${game.title} 게임`,
    description: game.slug === 'wanderer'
      ? '규칙을 읽고 카드 한 장을 고르는 Wanderer의 짧은 한 턴입니다.'
      : game.summary,
    path: `/projects/${game.slug}`,
    ogImage: game.coverImage,
  });
}

function RelatedPostRows({ posts }: { posts: Awaited<ReturnType<typeof getWriting>> }) {
  if (posts.length === 0) {
    return <p className="border-t border-line/70 py-4 text-sm leading-7 text-subtext">아직 함께 둘 글이 많지 않습니다.</p>;
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
        게임으로 돌아가기
      </Link>

      <section className="space-y-5 border-b border-line/60 pb-6 md:space-y-7 md:pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-[12px] font-black uppercase tracking-[0.18em] text-point">Wanderer · 모바일 카드 게임</p>
          <h1 className="max-w-4xl text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[72px] md:leading-[1.02]">
            카드 한 장으로 턴을 가져옵니다.
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
            이번 턴은 홀수 카드만 살아남는 짧은 턴입니다. 손에는 5, 10, 15가 있고, 상대는 13을 들고 있습니다. 살아남고 이기려면 어떤 카드를 내야 할까요.
          </p>
          <a href="#mini-play" className="inline-flex text-sm font-black text-point hover:text-text">Wanderer 한 턴</a>
        </div>
        <div className="max-w-3xl border-t border-line/40 pt-4 text-sm leading-7 text-subtext">
          한 판은 짧습니다. 상대가 낸 13을 넘기려면 15를 내야 하고, 짝수인 10은 이번 턴에서 빠집니다.
        </div>
      </section>

      <WandererMiniPlay />

      <section id="play-video" className="scroll-mt-28 space-y-4 border-t border-line/45 pt-5">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-point">플레이 영상</p>
        <div className="space-y-0 md:hidden">
          {[
            ['규칙 읽기', '홀수 카드만 남기고 짝수 카드는 빠집니다.'],
            ['카드 선택', '손에 든 5, 10, 15 중 한 장만 고릅니다.'],
            ['승부 읽기', '15는 살아남고 상대 13보다 높아 턴을 가져갑니다.'],
          ].map(([title, body]) => (
            <div key={title} className="border-t border-line/45 py-3 first:border-t-0 first:pt-0">
              <strong className="block text-sm font-black text-text">{title}</strong>
              <p className="mt-1 text-sm leading-6 text-subtext">{body}</p>
            </div>
          ))}
        </div>
        <video className="hidden max-h-[520px] w-full object-contain md:block" src="/media/runtime-checks/wanderer-mobile-demo.mp4" poster="/project-covers/wanderer.png" autoPlay muted loop playsInline />
        <p className="text-xs font-semibold leading-6 text-subtext">빠른 대전에 들어가 카드를 내고, 승부를 보는 짧은 영상입니다.</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-5">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-point">Wanderer</p>
          <h2 className="text-[30px] font-black leading-tight tracking-[-0.03em] text-text md:text-[46px]">한 턴이 짧아야 살아나는 카드 게임</h2>
          <div className="prose max-w-none">
            <p>Wanderer는 턴마다 규칙이 바뀌는 카드 게임입니다. 이번 조건에 맞지 않는 카드는 빠지고, 남은 카드끼리 숫자를 겨룹니다.</p>
            <p>이번 판에서는 10이 빠집니다. 5는 살아남지만 약합니다. 15는 살아남고 상대의 13도 넘습니다.</p>
            <p>그래서 지금 올린 미니 플레이에는 카드 세 장만 있습니다. 한 장을 고르면 왜 이겼는지 바로 읽힙니다.</p>
          </div>
        </div>

        <aside className="space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">같이 볼 글</div>
            <Link href="/writing/wanderer-one-card" className="block border-t border-line/70 py-4 text-point transition hover:text-text">
              <div className="font-black tracking-[-0.03em]">고른 순간, 승부가 갈립니다</div>
              <p className="mt-1 text-[13px] leading-6 text-subtext">카드를 냈을 때 왜 15가 이기는지 적었습니다.</p>
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
        게임 목록으로
      </Link>

      <PageHero eyebrow="게임" title={game.title} description={game.summary}>
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
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">같이 볼 글</div>
            <Link href={latestRecord ? `/writing/${latestRecord.slug}` : '/writing'} className="block border-t border-line/70 py-4 text-point transition hover:text-text">
              <div className="font-black tracking-[-0.03em]">{latestRecord ? latestRecord.title : '글이 더 필요합니다'}</div>
              <p className="mt-1 text-[13px] leading-6 text-subtext">{latestRecord ? latestRecord.summary : '아직 함께 둘 글이 많지 않습니다.'}</p>
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">함께 볼 글</div>
            <RelatedPostRows posts={relatedPosts} />
          </div>
        </aside>
      </section>
    </article>
  );
}
