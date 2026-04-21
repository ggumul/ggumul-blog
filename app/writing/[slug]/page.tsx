import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostEngagement } from '@/components/post-engagement';
import { getProjects, getWriting, getWritingBySlug } from '@/lib/content';
import { createArticleJsonLd, createMetadata } from '@/lib/site';

export async function generateStaticParams() {
  const posts = await getWriting();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);

  if (!post) {
    return createMetadata({
      title: '글을 찾을 수 없음',
      description: '요청한 글을 찾을 수 없어.',
      path: `/writing/${slug}`,
      type: 'article',
    });
  }

  return createMetadata({
    title: post.title,
    description: post.summary,
    path: `/writing/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    ogImage: `/writing/${post.slug}/opengraph-image`,
  });
}

export default async function WritingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);

  if (!post) {
    notFound();
  }

  const [projects, allPosts] = await Promise.all([getProjects(), getWriting()]);
  const relatedProjects = projects.filter((project) => post.relatedProjects.includes(project.slug));
  const siblingRecords = allPosts.filter((entry) => entry.slug !== post.slug && entry.series && entry.series === post.series);
  const articleJsonLd = createArticleJsonLd({
    title: post.title,
    description: post.summary,
    path: `/writing/${post.slug}`,
    publishedAt: post.publishedAt,
  });

  return (
    <article className="space-y-10 md:space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="panel-section space-y-5 md:space-y-7">
        <div className="flex flex-col items-start gap-2.5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-3">
          <Link href="/writing" className="inline-flex rounded-full border border-line/80 bg-white/70 px-4 py-2 text-sm text-subtext transition hover:border-point/60 hover:text-text">
            ← 글 목록으로
          </Link>
          <div className="text-[11px] uppercase tracking-[0.28em] text-point">{post.category}</div>
        </div>

        <div className="space-y-4">
          <h1 className="max-w-4xl text-[28px] font-semibold tracking-[-0.05em] leading-[1.08] text-text md:text-[68px] md:leading-[1.04]">{post.title}</h1>
          <p className="max-w-3xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-9">{post.summary}</p>
        </div>

        <div className="grid gap-2.5 md:grid-cols-[repeat(4,minmax(0,1fr))] md:gap-3">
          <div className="rounded-[1rem] border border-line/70 bg-white/65 px-3 py-2.5 md:rounded-[1.15rem] md:px-4 md:py-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-point">발행일</div>
            <div className="mt-2 text-sm text-text">{post.publishedAt}</div>
          </div>
          <div className="rounded-[1rem] border border-line/70 bg-white/65 px-3 py-2.5 md:rounded-[1.15rem] md:px-4 md:py-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-point">수정일</div>
            <div className="mt-2 text-sm text-text">{post.updatedAt}</div>
          </div>
          <div className="rounded-[1rem] border border-line/70 bg-white/65 px-3 py-2.5 md:rounded-[1.15rem] md:px-4 md:py-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-point">읽는 시간</div>
            <div className="mt-2 text-sm text-text">{post.readingTimeMinutes}분</div>
          </div>
          <div className="rounded-[1rem] border border-line/70 bg-white/65 px-3 py-2.5 md:rounded-[1.15rem] md:px-4 md:py-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-point">상태</div>
            <div className="mt-2 text-sm text-text">{post.status}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-subtext">
          {post.series ? <span className="rounded-full border border-line/70 bg-background/70 px-3 py-1.5">시리즈 · {post.series}</span> : null}
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line/70 bg-background/70 px-3 py-1.5">#{tag}</span>
          ))}
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:items-start md:gap-12">
        <section className="space-y-6">
          <div className="rounded-[1.35rem] border border-line/70 bg-white/55 px-4 py-5 md:rounded-[1.6rem] md:px-8 md:py-8">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </section>

        <aside className="aside-rail space-y-5 text-sm text-subtext md:sticky md:top-24">
          <PostEngagement slug={post.slug} title={post.title} />

          <div className="panel-aside space-y-3">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-point">관련 프로젝트</h2>
            {relatedProjects.length > 0 ? (
              <div className="space-y-3">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="block rounded-2xl border border-line/70 bg-white/65 px-4 py-4 transition hover:border-point/60 hover:text-text">
                    <div className="font-medium text-text">{project.title}</div>
                    <p className="mt-1 text-xs leading-6">{project.summary}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs leading-6">아직 직접 연결한 프로젝트는 없지만, 이 글도 같은 흐름 안에서 나온 기록이에요.</p>
            )}
          </div>

          {siblingRecords.length > 0 ? (
            <div className="panel-aside space-y-3">
              <h2 className="text-[11px] uppercase tracking-[0.24em] text-point">같은 흐름의 글</h2>
              <div className="space-y-3">
                {siblingRecords.map((entry) => (
                  <Link key={entry.slug} href={`/writing/${entry.slug}`} className="block rounded-2xl border border-line/70 bg-white/65 px-4 py-4 transition hover:border-point/60 hover:text-text">
                    <div className="font-medium text-text">{entry.title}</div>
                    <p className="mt-1 text-xs leading-6">{entry.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
