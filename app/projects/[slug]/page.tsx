import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Pill } from '@/components/brand-ui';
import { WandererTurnStrip } from '@/components/wanderer-turn-strip';
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
    title: game.slug === 'wanderer' ? 'Wanderer — 10이 빠지는 턴' : `${game.title} 게임`,
    description: game.slug === 'wanderer'
      ? '홀수 규칙에 맞지 않아 10이 빠지고 15가 남는 Wanderer의 한 턴입니다.'
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
            10을 버려야 이기는 턴입니다.
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
            이번 턴에서는 홀수만 남습니다. 5는 살아남지만 약하고, 10은 빠지고, 15만 끝까지 남습니다.
          </p>
        </div>
        <div className="max-w-3xl border-t border-line/40 pt-4 text-sm leading-7 text-subtext">
          이번 판의 손패는 5, 10, 15입니다. 10은 손에 있어도 홀수 규칙에 맞지 않아 빠지고, 15가 마지막 비교에 남습니다.
        </div>
      </section>


        <figure className="overflow-hidden rounded-[2rem] border border-[#2d2620] bg-[#17120f] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
          <img alt="Wanderer 10이 빠지는 한 턴 GIF" className="max-h-[520px] w-full object-contain" src="/media/devlog-gifs/wanderer-rule-result.gif" />
          <figcaption className="px-3 pb-3 pt-4 text-sm text-[#c7b49d]">
            손패에 남은 10이 조건 변화 뒤 빠지는 한 턴입니다.
          </figcaption>
        </figure>

        <WandererTurnStrip />

        <section className="grid gap-4 md:grid-cols-2">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-point">플레이 영상</p>
        <div className="space-y-0 md:hidden">
          {[
            ['규칙 읽기', '홀수는 남고 짝수는 빠집니다.'],
            ['카드 선택', '5, 10, 15 중 이번 규칙을 버틸 카드를 냅니다.'],
            ['승부 읽기', '15는 살아남고 가장 높은 카드로 남습니다.'],
          ].map(([title, body]) => (
            <div key={title} className="border-t border-line/45 py-3 first:border-t-0 first:pt-0">
              <strong className="block text-sm font-black text-text">{title}</strong>
              <p className="mt-1 text-sm leading-6 text-subtext">{body}</p>
            </div>
          ))}
        </div>
        <video className="hidden max-h-[520px] w-full object-contain md:block" src="/media/runtime-checks/wanderer-mobile-demo.mp4" poster="/project-covers/wanderer.png" autoPlay muted loop playsInline />
        <p className="text-xs font-semibold leading-6 text-subtext">짧은 대전에서 규칙을 읽고 카드를 낸 뒤, 살아남은 숫자로 승부를 보는 영상입니다.</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-5">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-point">Wanderer</p>
          <h2 className="text-[30px] font-black leading-tight tracking-[-0.03em] text-text md:text-[46px]">한 턴이 짧아야 살아나는 카드 게임</h2>
          <div className="prose max-w-none">
            <p>Wanderer는 매 턴 규칙이 바뀌는 카드 게임입니다. 먼저 이번 규칙에서 죽는 카드를 버리고, 남은 카드끼리 숫자를 겨룹니다.</p>
            <p>이번 판에서는 10이 빠집니다. 5는 남지만 끝까지 이기기에는 낮습니다. 15는 규칙을 통과하고 마지막 비교에서도 앞섭니다.</p>
            <p>GIF는 그 차이만 담습니다. 10이 빠진 뒤 15가 마지막 비교에 남는 순서만 좁게 보여 줍니다.</p>
          </div>
        </div>

        <aside className="space-y-7 text-sm text-subtext lg:sticky lg:top-24">
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
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">함께 볼 글</div>
            <RelatedPostRows posts={relatedPosts} />
          </div>
        </aside>
      </section>
    </article>
  );
}
