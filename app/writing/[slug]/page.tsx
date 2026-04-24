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
      description: '요청한 글을 찾을 수 없습니다.',
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

      <header className="space-y-4 border-b border-line/80 pb-6 md:pb-8">
        <Link href="/writing" className="inline-flex text-sm text-subtext transition hover:text-text">
          ← 개발 기록으로
        </Link>

        <div className="space-y-3">
          <div className="text-sm text-subtext">{post.category}</div>
          <h1 className="max-w-4xl text-[28px] font-semibold tracking-[-0.04em] leading-[1.15] text-text md:text-[48px] md:leading-[1.1]">{post.title}</h1>
          <p className="max-w-3xl text-[15px] leading-7 text-subtext md:text-[17px] md:leading-8">{post.summary}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-subtext">
          <span>{post.publishedAt}</span>
          <span>수정 {post.updatedAt}</span>
          <span>{post.readingTimeMinutes}분 읽기</span>
        </div>
      </header>

      <div className="space-y-8">
        <section>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>

        <section className="space-y-6 border-t border-line/80 pt-6">
          <PostEngagement slug={post.slug} title={post.title} />

          {relatedProjects.length > 0 ? (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-text">관련 프로젝트</h2>
              <div className="space-y-2">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="block rounded-xl border border-line/80 bg-white/[0.06] px-4 py-3 transition hover:border-point/60">
                    <div className="font-medium text-text">{project.title}</div>
                    <p className="mt-1 text-sm leading-6 text-subtext">{project.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {siblingRecords.length > 0 ? (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-text">같은 묶음의 글</h2>
              <div className="space-y-2">
                {siblingRecords.map((entry) => (
                  <Link key={entry.slug} href={`/writing/${entry.slug}`} className="block rounded-xl border border-line/80 bg-white/[0.06] px-4 py-3 transition hover:border-point/60">
                    <div className="font-medium text-text">{entry.title}</div>
                    <p className="mt-1 text-sm leading-6 text-subtext">{entry.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </article>
  );
}
