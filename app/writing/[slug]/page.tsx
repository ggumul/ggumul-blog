import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { Pill, SectionHeader } from '@/components/brand-ui';
import { PostEngagement } from '@/components/post-engagement';
import { getProjects, getWriting, getWritingBySlug } from '@/lib/content';
import { createArticleJsonLd, createMetadata } from '@/lib/site';

const legacyWritingSlugMap: Record<string, string> = {
  'wanderer-sync는-왜-안-붙었냐': 'wanderer-sync-연결-문제-분석',
  'wanderer는-꼬물의-출발점-같은-게임이었다': 'wanderer-초기-설계-회고',
  '우리는-왜-이렇게-천천히-만들고-있냐': '제작-리듬을-우선하는-이유',
  '요즘-이런-게임들을-만들고-있어요': '4월-프로젝트-개발-현황',
};

function resolveLegacyWritingSlug(slug: string) {
  try {
    return legacyWritingSlugMap[decodeURIComponent(slug)] ?? null;
  } catch {
    return legacyWritingSlugMap[slug] ?? null;
  }
}

function extractHeadings(content: string) {
  return content
    .split('\n')
    .map((line) => line.match(/^##\s+(.+)$/)?.[1]?.trim())
    .filter((heading): heading is string => Boolean(heading));
}

export async function generateStaticParams() {
  const posts = await getWriting();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);

  if (!post) {
    const redirectSlug = resolveLegacyWritingSlug(slug);

    if (redirectSlug) {
      return createMetadata({
        title: '글 주소가 변경됨',
        description: '새 개발 기록 주소로 이동합니다.',
        path: `/writing/${redirectSlug}`,
        type: 'article',
      });
    }

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
    const redirectSlug = resolveLegacyWritingSlug(slug);

    if (redirectSlug) {
      permanentRedirect(`/writing/${encodeURIComponent(redirectSlug)}`);
    }

    notFound();
  }

  const [projects, allPosts] = await Promise.all([getProjects(), getWriting()]);
  const relatedProjects = projects.filter((project) => post.relatedProjects.includes(project.slug));
  const siblingRecords = allPosts.filter((entry) => entry.slug !== post.slug && entry.series && entry.series === post.series);
  const headings = extractHeadings(post.content);
  const articleJsonLd = createArticleJsonLd({
    title: post.title,
    description: post.summary,
    path: `/writing/${post.slug}`,
    publishedAt: post.publishedAt,
  });

  return (
    <article className="archive-surface space-y-8 md:space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Link href="/writing" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 개발 기록으로
      </Link>

      <header className="mx-auto max-w-3xl space-y-4 border-b border-line/70 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          <Pill tone="point">{post.category}</Pill>
          {post.series ? <Pill>{post.series}</Pill> : null}
          <Pill>{post.publishedAt}</Pill>
          <Pill>{post.readingTimeMinutes}분 읽기</Pill>
        </div>
        <h1 className="text-[36px] font-black leading-[1.08] tracking-[-0.055em] text-text md:text-[56px]">
          {post.title}
        </h1>
        <p className="text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">{post.summary}</p>
        {post.updatedAt !== post.publishedAt ? (
          <p className="text-[12px] text-subtext/80">마지막 수정 {post.updatedAt}</p>
        ) : null}
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
        <section className="rounded-[28px] border border-line/70 bg-white/[0.025] px-5 py-7 md:px-8 md:py-9">
          <div className="prose mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          {headings.length > 0 ? (
            <div className="space-y-3">
              <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">목차</div>
              <ol className="space-y-2 text-[13px] leading-6">
                {headings.map((heading) => (
                  <li key={heading} className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-text/90">
                    {heading}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">tags</div>
            <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-subtext">#{tag}</span>
              ))}
            </div>
          </div>
          {relatedProjects.length > 0 ? (
            <div className="space-y-3">
              <SectionHeader eyebrow="관련" title="관련 프로젝트" />
              {relatedProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="block rounded-[20px] border border-line/80 bg-white/[0.055] px-4 py-3 transition hover:border-point/60">
                  <div className="font-black tracking-[-0.03em] text-text">{project.title}</div>
                  <p className="mt-1 text-sm leading-6 text-subtext">{project.summary}</p>
                </Link>
              ))}
            </div>
          ) : null}

          {siblingRecords.length > 0 ? (
            <div className="space-y-3">
              <SectionHeader eyebrow="같은 묶음" title="같은 묶음" />
              {siblingRecords.map((entry) => (
                <Link key={entry.slug} href={`/writing/${entry.slug}`} className="block rounded-[20px] border border-line/80 bg-white/[0.055] px-4 py-3 transition hover:border-point/60">
                  <div className="font-black tracking-[-0.03em] text-text">{entry.title}</div>
                  <p className="mt-1 text-sm leading-6 text-subtext">{entry.summary}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
      </div>

      <section className="panel-section space-y-6">
        <PostEngagement slug={post.slug} title={post.title} />
      </section>
    </article>
  );
}
