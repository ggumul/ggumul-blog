import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getWriting, getWritingBySlug } from '@/lib/content';
import { createArticleJsonLd, createMetadata } from '@/lib/site';

const legacyWritingSlugMap: Record<string, string> = {
  'wanderer-sync는-왜-안-붙었냐': 'wanderer-sync-\uc5f0\uacb0-\ubb38\uc81c-\ubd84\uc11d',
  'wanderer는-꼬물의-출발점-같은-게임이었다': 'wanderer-\ucd08\uae30-\uc124\uacc4-\ud68c\uace0',
  '우리는-왜-이렇게-천천히-만들고-있냐': '\uc81c\uc791-\ub9ac\ub4ec\uc744-\uc6b0\uc120\ud558\ub294-\uc774\uc720',
  '요즘-이런-게임들을-만들고-있어요': '4\uc6d4-\ud504\ub85c\uc81d\ud2b8-\uac1c\ubc1c-\ud604\ud669',
};

function resolveLegacyWritingSlug(slug: string) {
  try {
    return legacyWritingSlugMap[decodeURIComponent(slug)] ?? null;
  } catch {
    return legacyWritingSlugMap[slug] ?? null;
  }
}

function formatDate(date: string) {
  return date.replaceAll('-', '.');
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
        description: '새 이야기 주소로 이동합니다.',
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

  const allPosts = await getWriting();
  const relatedRecords = allPosts
    .filter((entry) => entry.slug !== post.slug && entry.relatedProjects.some((project) => post.relatedProjects.includes(project)))
    .slice(0, 3);
  const articleJsonLd = createArticleJsonLd({
    title: post.title,
    description: post.summary,
    path: `/writing/${post.slug}`,
    publishedAt: post.publishedAt,
  });

  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Link href="/writing" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        글 목록으로
      </Link>

      <header className="max-w-3xl space-y-5 py-2 md:py-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-subtext">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.updatedAt !== post.publishedAt ? (
            <>
              <span>/</span>
              <span>수정 {formatDate(post.updatedAt)}</span>
            </>
          ) : null}
        </div>
        <h1 className="text-[36px] font-black leading-[1.05] tracking-[-0.055em] text-text md:text-[62px]">
          {post.title}
        </h1>
        <p className="text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">{post.summary}</p>
      </header>

      <section className="prose max-w-none lg:max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />

      {relatedRecords.length > 0 ? (
        <section className="space-y-4 border-t border-line/60 pt-6">
          <div>
            <p className="text-[12px] font-black tracking-[0.18em] text-point">이어지는 글</p>
            <h2 className="mt-2 text-[26px] font-black leading-tight tracking-[-0.04em] text-text md:text-[38px]">같은 작업선의 다른 날짜</h2>
          </div>
          <div className="divide-y divide-line/70 border-y border-line/70">
            {relatedRecords.map((entry) => (
              <Link key={entry.slug} href={`/writing/${entry.slug}`} className="grid gap-2 py-4 transition hover:text-text md:grid-cols-[110px_minmax(0,1fr)]">
                <time className="text-sm text-subtext" dateTime={entry.publishedAt}>{formatDate(entry.publishedAt)}</time>
                <span>
                  <span className="block text-lg font-black tracking-[-0.04em] text-text">{entry.title}</span>
                  <span className="mt-1 block text-sm leading-7 text-subtext">{entry.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
