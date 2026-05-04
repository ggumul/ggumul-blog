import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { Pill } from '@/components/brand-ui';
import { PostCard } from '@/components/post-card';
import { getProjects, getWriting, getWritingBySlug } from '@/lib/content';
import { createArticleJsonLd, createMetadata } from '@/lib/site';

const legacyWritingSlugMap: Record<string, string> = {
  'wanderer-sync는-왜-안-붙었냐': 'wanderer-sync-연결-문제-분석',
  'wanderer는-꼬물의-출발점-같은-게임이었다': 'wanderer-초기-설계-회고',
  '우리는-왜-이렇게-천천히-만들고-있냐': '제작-리듬을-우선하는-이유',
  '요즘-이런-게임들을-만들고-있어요': '4월-프로젝트-개발-현황',
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
  if (post.slug === 'runtime-화면-확인-기록') {
    return '/media/runtime-checks/wanderer-mobile-current.png';
  }

  const firstProject = post.relatedProjects[0];
  return firstProject ? projectThumbnails[firstProject] : '/studio/wanderer-home.png';
}

function resolvePostHeroFallback(post: { slug: string; category: string }) {
  if (post.slug === 'ggumul-dinner-grocery-가격-계약-정리') {
    return {
      label: 'Dinner Grocery',
      title: '장보기 전 가격 흐름',
      description: '메뉴를 고르고 재료를 적기 전에, 오늘 사도 괜찮은지 먼저 보는 작은 장면입니다.',
      badge: '장보기 도구',
      tone: 'bg-[radial-gradient(circle_at_24%_22%,rgba(251,191,36,0.26),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(132,204,22,0.22),transparent_30%),linear-gradient(135deg,rgba(14,20,14,0.96),rgba(44,35,18,0.92))]',
    };
  }

  return {
    label: 'GGUMUL',
    title: post.category,
    description: '글과 연결된 장면을 짧게 남긴 제작 노트입니다.',
    badge: '게임 기록',
    tone: 'bg-[radial-gradient(circle_at_24%_20%,rgba(124,92,255,0.32),transparent_34%),radial-gradient(circle_at_78%_16%,rgba(255,122,162,0.2),transparent_30%),linear-gradient(135deg,rgba(14,16,28,0.96),rgba(31,26,54,0.92))]',
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

      <Link href="/writing" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 게임 기록으로
      </Link>

      <header className="studio-hero overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-5 md:p-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.96fr)_minmax(380px,1.04fr)] lg:items-stretch">
          <div className="flex flex-col justify-between gap-7 rounded-[28px] border border-line/70 bg-black/20 p-5 md:p-7">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[12px]">
                <Pill tone="point">{post.category}</Pill>
                {post.series ? <Pill>{post.series}</Pill> : null}
                <Pill>{post.publishedAt}</Pill>
              </div>
              <h1 className="text-[38px] font-black leading-[1.02] tracking-[-0.065em] text-text md:text-[68px]">
                {post.title}
              </h1>
              <p className="text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">{post.summary}</p>
              {post.updatedAt !== post.publishedAt ? <p className="text-[12px] text-subtext/80">마지막 수정 {post.updatedAt}</p> : null}
            </div>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {post.relatedProjects.map((project) => <Pill key={project}>{project}</Pill>)}
            </div>
          </div>

          <figure className="studio-shot min-h-[330px] overflow-hidden rounded-[30px] border border-line/80 bg-white/10 md:min-h-[520px]">
            {heroImage ? (
              <img alt={`${post.title} 장면`} className="h-full w-full object-cover" src={heroImage} />
            ) : (
              <div className={`flex h-full min-h-[330px] flex-col justify-between p-7 md:min-h-[520px] md:p-9 ${heroFallback.tone}`}>
                <div className="flex items-center justify-between gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-white/65">
                  <span>{heroFallback.label}</span>
                  <span>{heroFallback.badge}</span>
                </div>
                <div className="max-w-sm space-y-4">
                  <div className="h-1.5 w-20 rounded-full bg-white/45" />
                  <h2 className="text-[34px] font-black leading-[0.98] tracking-[-0.06em] text-white md:text-[56px]">{heroFallback.title}</h2>
                  <p className="text-[15px] leading-7 text-white/72 md:text-[17px] md:leading-8">{heroFallback.description}</p>
                </div>
              </div>
            )}
            <figcaption className="studio-caption">
              <span>글과 연결된 실행 화면</span>
              <span>{post.category}</span>
            </figcaption>
          </figure>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <section className="rounded-[30px] border border-line/70 bg-white/[0.025] px-5 py-7 md:px-8 md:py-9">
          <div className="prose mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          {headings.length > 0 ? (
            <div className="space-y-3">
              <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">목차</div>
              <ol className="space-y-2 text-[13px] leading-6">
                {headings.map((heading) => (
                  <li key={heading} className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-text/90">{heading}</li>
                ))}
              </ol>
            </div>
          ) : null}

          {relatedProjects.length > 0 ? (
            <div className="space-y-3">
              <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">관련 프로젝트</div>
              {relatedProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="block overflow-hidden rounded-[20px] border border-line/80 bg-white/[0.055] transition hover:border-point/60">
                  {project.coverImage ? <img alt={`${project.title} 장면`} className="h-28 w-full object-cover" src={project.coverImage} /> : null}
                  <div className="p-4">
                    <div className="font-black tracking-[-0.03em] text-text">{project.title}</div>
                    <p className="mt-1 text-sm leading-6 text-subtext">{project.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">글 주제</div>
            <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-subtext">#{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {relatedRecords.length > 0 ? (
        <section className="space-y-5">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">다음 글</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">이어지는 이야기</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedRecords.slice(0, 3).map((entry) => (
              <PostCard key={entry.slug} post={entry} compact />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
