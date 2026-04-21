import Link from 'next/link';
import { notFound } from 'next/navigation';
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

      <header className="space-y-5 border-b border-line/80 pb-8 md:pb-10">
        <Link href="/writing" className="inline-flex text-sm text-subtext transition hover:text-text">
          ← 글 목록으로
        </Link>
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-point">{post.category}</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-text md:text-6xl md:leading-[1.08]">{post.title}</h1>
          <p className="max-w-3xl text-base leading-8 text-subtext md:text-[17px]">{post.summary}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-subtext">
          <span>{post.publishedAt}</span>
          <span>{post.status}</span>
          {post.series ? <span>시리즈 · {post.series}</span> : null}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-subtext">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </header>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_240px] md:items-start">
        <section>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>

        <aside className="space-y-8 border-l border-line/70 pl-0 text-sm text-subtext md:sticky md:top-24 md:pl-5">
          <div className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-point">관련 프로젝트</h2>
            {relatedProjects.length > 0 ? (
              <div className="space-y-3">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="block transition hover:text-text">
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
            <div className="space-y-3">
              <h2 className="text-[11px] uppercase tracking-[0.24em] text-point">같은 흐름의 글</h2>
              <div className="space-y-3">
                {siblingRecords.map((entry) => (
                  <Link key={entry.slug} href={`/writing/${entry.slug}`} className="block transition hover:text-text">
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
