import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { Pill } from '@/components/brand-ui';
import { getProjects, getWriting, getWritingBySlug } from '@/lib/content';
import { createArticleJsonLd, createMetadata } from '@/lib/site';

const legacyWritingSlugMap: Record<string, string> = {
  'wanderer-sync는-왜-안-붙었냐': 'wanderer-sync-\uc5f0\uacb0-\ubb38\uc81c-\ubd84\uc11d',
  'wanderer는-꼬물의-출발점-같은-게임이었다': 'wanderer-\ucd08\uae30-\uc124\uacc4-\ud68c\uace0',
  '우리는-왜-이렇게-천천히-만들고-있냐': '\uc81c\uc791-\ub9ac\ub4ec\uc744-\uc6b0\uc120\ud558\ub294-\uc774\uc720',
  '요즘-이런-게임들을-만들고-있어요': '4\uc6d4-\ud504\ub85c\uc81d\ud2b8-\uac1c\ubc1c-\ud604\ud669',
};

const projectThumbnails: Record<string, string> = {
  wanderer: '/media/runtime-checks/wanderer-mobile-current.png',
  hanoi: '/project-covers/hanoi.png',
  'color-hanoi': '/project-covers/color-hanoi.png',
  trpg: '/project-covers/trpg.png',
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

function resolvePostImage(post: { slug: string; relatedProjects: string[] }) {
  if (post.slug === 'wanderer-one-card') {
    return '/media/runtime-checks/wanderer-mobile-current.png';
  }

  const firstProject = post.relatedProjects[0];
  return firstProject ? projectThumbnails[firstProject] : '/studio/wanderer-home.png';
}

function resolvePostHeroFallback(post: { slug: string; category: string }) {
  if (post.slug === 'dinner-grocery-price') {
    return {
      label: 'Dinner Grocery',
      title: '장보기 전 가격',
      description: '메뉴를 고르고 재료를 적기 전에, 오늘 사도 괜찮은지 가격을 함께 읽습니다.',
      badge: '장보기',
      tone: 'bg-[#182013]',
    };
  }

  return {
    label: 'GGUMUL',
    title: post.category,
    description: '게임을 만들며 잡아 둔 방향과 플레이 방식을 짧게 담은 글입니다.',
    badge: '게임 글',
    tone: 'bg-[#151929]',
  };
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

  const [projects, allPosts] = await Promise.all([getProjects(), getWriting()]);
  const relatedProjects = projects.filter((project) => post.relatedProjects.includes(project.slug));
  const relatedProjectLabelMap = new Map(projects.map((project) => [project.slug, project.title]));
  const siblingRecords = allPosts.filter((entry) => entry.slug !== post.slug && entry.series && entry.series === post.series);
  const relatedRecords = siblingRecords.length > 0
    ? siblingRecords
    : allPosts.filter((entry) => entry.slug !== post.slug && entry.relatedProjects.some((project) => post.relatedProjects.includes(project))).slice(0, 3);
  const headings = extractHeadings(post.content);
  const heroImage = resolvePostImage(post);
  const heroFallback = resolvePostHeroFallback({ slug: post.slug, category: post.category });
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
        게임 글로
      </Link>

      <header className="rounded-2xl border border-line/70 bg-surface/70 p-5 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[12px]">
              <Pill tone="point">{post.category}</Pill>
              {post.series ? <Pill>{post.series}</Pill> : null}
              <Pill>{post.publishedAt}</Pill>
            </div>
            <h1 className="text-[36px] font-black leading-[1.05] tracking-[-0.055em] text-text md:text-[62px]">
              {post.title}
            </h1>
            <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">{post.summary}</p>
            {post.updatedAt !== post.publishedAt ? <p className="text-[12px] text-subtext/80">마지막 수정 {post.updatedAt}</p> : null}
            <div className="flex flex-wrap gap-2 text-[12px]">
              {post.relatedProjects.map((slug) => <Pill key={slug}>{relatedProjectLabelMap.get(slug) ?? post.category}</Pill>)}
            </div>
          </div>

          <figure className="overflow-hidden rounded-[24px] border border-line/70 bg-surface/60">
            {heroImage ? (
              <img alt={`${post.title} 대표 이미지`} className="max-h-[420px] w-full object-cover" src={heroImage} />
            ) : (
              <div className={`flex min-h-[280px] flex-col justify-between p-6 ${heroFallback.tone}`}>
                <div className="flex items-center justify-between gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/65">
                  <span>{heroFallback.label}</span>
                  <span>{heroFallback.badge}</span>
                </div>
                <div className="max-w-sm space-y-3">
                  <h2 className="text-[30px] font-black leading-[1.02] tracking-[-0.05em] text-white md:text-[46px]">{heroFallback.title}</h2>
                  <p className="text-[15px] leading-7 text-white/72">{heroFallback.description}</p>
                </div>
              </div>
            )}
            <figcaption className="flex items-center justify-between gap-3 border-t border-line/70 px-4 py-3 text-xs font-semibold text-subtext">
              <span>{post.title}</span>
              <span>{post.category}</span>
            </figcaption>
          </figure>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <section className="prose max-w-none lg:max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          {headings.length > 0 ? (
            <div className="space-y-3">
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">목차</div>
              <ol className="space-y-2 text-[13px] leading-6">
                {headings.map((heading) => (
                  <li key={heading} className="border-t border-line/70 py-2 text-text/90">{heading}</li>
                ))}
              </ol>
            </div>
          ) : null}

          {relatedProjects.length > 0 ? (
            <div className="space-y-3">
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">관련 프로젝트</div>
              <div className="divide-y divide-line/70 border-y border-line/70">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="block py-4 transition hover:text-text">
                    <div className="font-black tracking-[-0.03em] text-text">{project.title}</div>
                    <p className="mt-1 text-sm leading-6 text-subtext">{project.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-point">이 글에서 보는 것</div>
            <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line/70 px-2.5 py-1 text-subtext">#{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {relatedRecords.length > 0 ? (
        <section className="space-y-5">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.24em] text-point">다음 글</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.045em] text-text md:text-[46px]">다음에 읽을 이야기</h2>
          </div>
          <div className="divide-y divide-line/70 border-y border-line/70">
            {relatedRecords.slice(0, 3).map((entry) => (
              <Link key={entry.slug} href={`/writing/${entry.slug}`} className="block py-4 transition hover:text-text">
                <h3 className="text-xl font-black tracking-[-0.04em] text-text">{entry.title}</h3>
                <p className="mt-1 max-w-3xl text-sm leading-7 text-subtext">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
