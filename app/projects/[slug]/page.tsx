import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/brand-ui';
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
      title: '찾을 수 없는 글',
      description: '요청한 항목을 찾을 수 없습니다.',
      path: `/projects/${slug}`,
    });
  }

  return createMetadata({
    title: game.title,
    description: game.summary,
    path: `/projects/${game.slug}`,
    ogImage: game.coverImage,
  });
}

function RelatedPostRows({ posts }: { posts: Awaited<ReturnType<typeof getWriting>> }) {
  if (posts.length === 0) {
    return null;
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
      <Link href="/projects" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 목록으로 돌아가기
      </Link>

      <section className="space-y-5 border-b border-line/60 pb-6 md:space-y-7 md:pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-[12px] font-black uppercase tracking-[0.18em] text-point">Wanderer</p>
          <h1 className="max-w-4xl text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[64px] md:leading-[1.06]">
            조건에 맞는 카드를 골라 턴을 넘기는 모바일 카드 게임입니다.
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
            조건 카드가 먼저 뜨고, 손패에서 낼 수 있는 카드가 바로 구분됩니다. 예를 들어 11 이하 조건이면 5, 10, 11은 고를 수 있고 13, 14, 15는 고를 수 없습니다.
          </p>
        </div>
      </section>

      <figure className="overflow-hidden rounded-[2rem] border border-[#2d2620] bg-[#17120f] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
        <img alt="Wanderer에서 조건에 따라 낼 수 있는 카드가 갈리는 장면" className="max-h-[520px] w-full object-contain" src="/media/devlog-gifs/wanderer-rule-result.gif" />
        <figcaption className="px-3 pb-3 pt-4 text-sm text-[#c7b49d]">
          11 이하 조건 아래에서 5, 10, 11은 고를 수 있고 13, 14, 15는 고를 수 없습니다.
        </figcaption>
      </figure>

      <section className="prose max-w-none">
        <p>처음에는 카드 효과와 설명이 많았습니다. 하지만 한 턴에서 어떤 카드가 가능한지 늦게 보였습니다.</p>
        <p>그래서 한 턴을 짧게 줄였습니다. 조건을 보고, 낼 수 있는 카드를 고르고, 결과를 받는 흐름부터 만듭니다.</p>
      </section>

      {relatedPosts.length ? (
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div className="space-y-5">
            <p className="text-[12px] font-black uppercase tracking-[0.24em] text-point">글</p>
            <h2 className="text-[30px] font-black leading-tight tracking-[-0.03em] text-text md:text-[46px]">Wanderer에서 나온 글</h2>
            <RelatedPostRows posts={relatedPosts} />
          </div>
        </section>
      ) : null}
    </article>
  );
}

function HanoiFeaturePage() {
  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <Link href="/projects" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 목록으로 돌아가기
      </Link>

      <section className="space-y-5 border-b border-line/60 pb-6 md:space-y-7 md:pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-[12px] font-black uppercase tracking-[0.18em] text-point">Hanoi</p>
          <h1 className="max-w-4xl text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[64px] md:leading-[1.06]">
            원반을 옮겨 세 기둥의 순서를 맞추는 퍼즐입니다.
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
            작은 원반 위에는 큰 원반을 올릴 수 없습니다. 원반을 하나 옮길 때마다 다음 선택지가 달라집니다.
          </p>
        </div>
      </section>

      <figure className="overflow-hidden rounded-[2rem] border border-[#2d2620] bg-[#17120f] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
        <img alt="Hanoi 화면에서 원반과 세 기둥이 보이는 장면" className="max-h-[520px] w-full object-contain" src="/media/devlog-gifs/hanoi-next-seat.gif" />
        <figcaption className="px-3 pb-3 pt-4 text-sm text-[#c7b49d]">
          원반을 옮기면 세 기둥의 상태와 이동 횟수가 함께 바뀝니다.
        </figcaption>
      </figure>

      <section className="prose max-w-none">
        <p>처음에는 이동 뒤에 무엇이 바뀌었는지 잘 보이지 않았습니다.</p>
        <p>퍼즐이 재미있어지는 지점은 원반을 옮긴 직후입니다. 방금 한 선택 때문에 다음에 갈 수 있는 자리가 달라집니다.</p>
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

  if (game.slug === 'wanderer') {
    return <WandererFeaturePage relatedPosts={relatedPosts} />;
  }

  if (game.slug === 'hanoi') {
    return <HanoiFeaturePage />;
  }

  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <Link href="/projects" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        목록으로
      </Link>

      <PageHero eyebrow="만드는 것" title={game.title} description={game.summary} />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-8">
          {game.coverImage ? (
            <figure className="overflow-hidden rounded-[24px] border border-line/70 bg-surface/60">
              <img alt={`${game.title} 이미지`} className="max-h-[560px] w-full object-cover" src={game.coverImage} />
            </figure>
          ) : null}

          <section className="prose max-w-none" dangerouslySetInnerHTML={{ __html: game.html }} />
        </div>

        {relatedPosts.length ? (
          <aside className="space-y-7 text-sm text-subtext lg:sticky lg:top-24">
            <div className="space-y-3">
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">같이 읽을 글</div>
              <RelatedPostRows posts={relatedPosts} />
            </div>
          </aside>
        ) : null}
      </section>
    </article>
  );
}
