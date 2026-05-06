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
    return <p className="border-t border-line/70 py-4 text-sm leading-7 text-subtext">아직 붙여 둘 글이 많지 않습니다.</p>;
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
        목록으로 돌아가기
      </Link>

      <section className="space-y-5 border-b border-line/60 pb-6 md:space-y-7 md:pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-[12px] font-black uppercase tracking-[0.18em] text-point">Wanderer</p>
          <h1 className="max-w-4xl text-[34px] font-black leading-tight tracking-[-0.045em] text-text md:text-[64px] md:leading-[1.06]">
            세 장짜리 판으로 줄인 카드 게임.
          </h1>
          <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">
            Wanderer는 아직 큰 세계를 말할 단계가 아닙니다. 지금은 손에 든 세 장과 그 턴에 붙은 조건만으로 한 판이 읽히는지 보고 있습니다.
          </p>
        </div>
      </section>

      <figure className="overflow-hidden rounded-[2rem] border border-[#2d2620] bg-[#17120f] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
        <img alt="Wanderer 턴 표본 GIF" className="max-h-[520px] w-full object-contain" src="/media/devlog-gifs/wanderer-rule-result.gif" />
        <figcaption className="px-3 pb-3 pt-4 text-sm text-[#c7b49d]">
          이번 표본에서는 손패 하나가 조건에 걸려 빠지고, 남은 카드로 턴이 끝납니다.
        </figcaption>
      </figure>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
        <div className="prose max-w-none">
          <p>처음에는 카드 게임답게 더 많은 효과와 설명을 넣으려고 했습니다. 그런데 화면에 말이 많아지자 정작 이번 턴에서 무슨 일이 일어났는지 늦게 읽혔습니다.</p>
          <p>그래서 첫 표본은 세 장짜리 판으로 줄였습니다. 조건 하나가 붙고, 그 조건 때문에 한 장이 빠지고, 남은 카드끼리 결과를 냅니다. 이 정도까지 줄여야 다음에 무엇을 더해야 하는지도 보였습니다.</p>
        </div>
        <video className="hidden max-h-[520px] w-full object-contain md:block" src="/media/runtime-checks/wanderer-mobile-demo.mp4" poster="/project-covers/wanderer.png" autoPlay muted loop playsInline />
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-5">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-point">글</p>
          <h2 className="text-[30px] font-black leading-tight tracking-[-0.03em] text-text md:text-[46px]">Wanderer를 만지며 쓴 글</h2>
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
        목록으로
      </Link>

      <PageHero eyebrow="만드는 것" title={game.title} description={game.summary}>
        <div className="space-y-3">
          <Pill tone="point">{game.status}</Pill>
          {latestRecord ? <Pill>{latestRecord.publishedAt}</Pill> : null}
        </div>
      </PageHero>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-8">
          {game.coverImage ? (
            <figure className="overflow-hidden rounded-[24px] border border-line/70 bg-surface/60">
              <img alt={`${game.title} 이미지`} className="max-h-[560px] w-full object-cover" src={game.coverImage} />
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
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">같이 읽을 글</div>
            <RelatedPostRows posts={relatedPosts} />
          </div>
        </aside>
      </section>
    </article>
  );
}
