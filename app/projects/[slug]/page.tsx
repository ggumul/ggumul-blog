import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Pill } from '@/components/brand-ui';
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
      ? '10은 버림 더미로 가고 5와 15가 승부 후보가 되는 Wanderer의 한 턴입니다.'
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
          <h1 className="max-w-4xl text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[64px] md:leading-[1.06]">
            10을 버려야 이기는 턴입니다.
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
            Wanderer는 매 턴 조건이 바뀌는 카드 게임입니다. 손에 있던 10은 이번 규칙에서 버림 더미로 가고, 5와 15만 승부 후보가 됩니다.
          </p>
        </div>
      </section>

      <figure className="overflow-hidden rounded-[2rem] border border-[#2d2620] bg-[#17120f] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
        <img alt="Wanderer 10이 빠지는 한 턴 GIF" className="max-h-[520px] w-full object-contain" src="/media/devlog-gifs/wanderer-rule-result.gif" />
        <figcaption className="px-3 pb-3 pt-4 text-sm text-[#c7b49d]">
          손에 있던 10이 조건 변화 뒤 버림 더미로 가는 한 턴입니다.
        </figcaption>
      </figure>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
        <div className="prose max-w-none">
          <p>10은 손에 있어도 이번 규칙에서는 버림 더미로 갑니다. 승부 후보는 5와 15이고, 15가 턴을 가져갑니다.</p>
          <p>예전 설명은 15가 이긴다는 말부터 앞에 나와서 10이 왜 사라졌는지 늦게 읽혔습니다. 그래서 버림 더미를 앞에 놓고 승부 후보를 뒤에 묶었습니다.</p>
        </div>
        <video className="hidden max-h-[520px] w-full object-contain md:block" src="/media/runtime-checks/wanderer-mobile-demo.mp4" poster="/project-covers/wanderer.png" autoPlay muted loop playsInline />
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-5">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-point">글</p>
          <h2 className="text-[30px] font-black leading-tight tracking-[-0.03em] text-text md:text-[46px]">Wanderer에서 바꾼 것들</h2>
          <RelatedPostRows posts={relatedPosts} />
        </div>
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
