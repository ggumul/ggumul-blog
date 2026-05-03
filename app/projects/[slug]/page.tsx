import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Pill } from '@/components/brand-ui';
import { PostCard } from '@/components/post-card';
import { WandererMiniPlay } from '@/components/wanderer-mini-play';
import { getProjectBySlug, getProjects, getWriting, resolveProjectRecords } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return createMetadata({
      title: '작업을 찾을 수 없음',
      description: '요청한 작업을 찾을 수 없습니다.',
      path: `/projects/${slug}`,
    });
  }

  return createMetadata({
    title: project.slug === 'wanderer' ? 'Wanderer — 한 턴 체험' : `${project.title} 작업 기록`,
    description: project.slug === 'wanderer'
      ? '규칙을 보고 한 장을 고르는 Wanderer 한 턴 체험, 실제 플레이 화면과 새 소식입니다.'
      : project.summary,
    path: `/projects/${project.slug}`,
    ogImage: project.coverImage,
  });
}

function WandererFeaturePage({ relatedPosts }: { relatedPosts: Awaited<ReturnType<typeof getWriting>> }) {
  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <Link href="/projects" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 게임 목록으로
      </Link>

      <section className="hero-panel overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-stretch">
          <div className="flex flex-col justify-between gap-7 rounded-[28px] border border-line/70 bg-black/25 p-5 md:p-7">
            <div className="space-y-5">
              <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">Wanderer · 모바일 카드 게임</p>
              <div className="space-y-4">
                <h1 className="max-w-5xl text-[40px] font-black leading-[0.98] tracking-[-0.065em] text-text md:text-[72px]">
                  한 장 고르고,<br />바로 결과를<br />봅니다.
                </h1>
                <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[18px] md:leading-9">
                  한 장 고르고, 바로 결과를 봅니다. 홀수만 살아남는 턴입니다. 상대의 최고 카드는 13이고, 손에는 5, 10, 15가 있습니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <a href="#mini-play" className="inline-flex rounded-full border border-point/30 bg-point px-5 py-3 font-bold text-[#160d08] transition hover:bg-[#ffc47f]">30초 카드 골라보기</a>
                <a href="#play-video" className="inline-flex rounded-full border border-line/90 bg-white/10 px-5 py-3 font-bold text-text transition hover:border-point/60">플레이 영상</a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold tracking-[0.12em] text-point">한 판</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">1분</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">짧게 끝나는 판</p>
              </div>
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold tracking-[0.12em] text-point">상대 카드</p>
                <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-text">9 · 12 · 13</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">12는 탈락</p>
              </div>
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold tracking-[0.12em] text-point">이번 턴</p>
                <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-text">규칙→카드→결과</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">15가 이김</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_210px]">
            <figure id="play-video" className="studio-shot relative min-h-[380px] scroll-mt-28 overflow-hidden rounded-[30px] border border-line/80 bg-black/30 md:min-h-[560px]">
              <video className="h-full w-full object-contain" src="/media/runtime-checks/wanderer-mobile-demo.mp4" poster="/project-covers/wanderer.png" autoPlay muted loop playsInline />
              <div className="absolute left-4 top-4 rounded-full border border-point/30 bg-black/45 px-3 py-1 text-[11px] font-black tracking-[0.16em] text-point backdrop-blur">
                플레이 영상
              </div>
              <figcaption className="studio-caption">
                <span>규칙 → 카드 선택 → 결과</span>
                <Link href="#mini-play">직접 고르기</Link>
              </figcaption>
            </figure>
            <div className="grid gap-3">
              <figure className="studio-shot relative min-h-[260px] overflow-hidden rounded-[24px] border border-line/80 bg-white/10">
                <img alt="Wanderer 홈 화면" className="h-full w-full object-cover object-top" src="/studio/wanderer-home.png" />
                <figcaption className="studio-caption"><span>모바일 홈</span></figcaption>
              </figure>
              <div className="rounded-[24px] border border-point/25 bg-point/10 p-4 text-sm leading-7 text-subtext">
                <p className="text-[11px] font-black tracking-[0.16em] text-point">이번 턴</p>
                <p className="mt-2 font-bold text-text">홀수만 생존. 15를 내면 상대의 13보다 높습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WandererMiniPlay />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="story-card rounded-[28px] border border-line/80 bg-white/[0.055] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">규칙</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-text">홀수만 살아남습니다.</h2>
          <p className="mt-3 text-sm leading-7 text-subtext">5, 9, 13, 15는 남고 10과 12는 빠집니다.</p>
        </div>
        <div className="story-card rounded-[28px] border border-line/80 bg-white/[0.055] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">상대</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-text">상대의 최고 생존 카드는 13입니다.</h2>
          <p className="mt-3 text-sm leading-7 text-subtext">9도 남지만 이번 턴의 기준은 13입니다.</p>
        </div>
        <div className="story-card rounded-[28px] border border-line/80 bg-white/[0.055] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">내 선택</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-text">15를 내면 턴을 가져갑니다.</h2>
          <p className="mt-3 text-sm leading-7 text-subtext">10은 탈락, 5는 살아남아도 13보다 낮습니다.</p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="panel-section space-y-6">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">Wanderer</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">짧은 턴이 계속 이어지는 카드 게임</h2>
          </div>
          <div className="prose max-w-none">
            <p>Wanderer는 턴마다 조건을 읽고 손패에서 카드 한 장을 내는 게임입니다. 조건에 맞지 않으면 빠지고, 남은 카드끼리는 숫자가 높은 쪽이 턴을 가져갑니다.</p>
            <p>한 판은 짧습니다. 대신 카드를 낸 뒤 생존, 탈락, 승패가 바로 보여야 합니다. 이 페이지도 그 한 턴을 먼저 만지게 만들었습니다.</p>
            <h2>현재 들어간 것</h2>
            <ul>
              <li>4명이 1~15 숫자 카드 6장으로 시작합니다.</li>
              <li>턴마다 홀수, 짝수, 기준보다 높거나 낮은 조건이 붙습니다.</li>
              <li>조건을 통과한 카드 중 높은 카드가 턴을 가져갑니다.</li>
            </ul>
          </div>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">폰에서 돌린 날</div>
            <Link href="/writing/runtime-화면-확인-기록" className="block rounded-[22px] border border-point/25 bg-point/10 p-4 text-point transition hover:bg-point/15">
              <div className="font-black tracking-[-0.03em]">버튼 뒤 장면이 늦었습니다</div>
              <p className="mt-1 text-[13px] leading-6 text-subtext">폰에서 눌렀을 때 결과가 늦게 읽힌 순간입니다.</p>
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">Wanderer 노트</div>
            <div className="space-y-3">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/writing/${post.slug}`} className="block rounded-[20px] border border-line/80 bg-white/[0.055] p-4 transition hover:border-point/60 hover:bg-white/[0.08]">
                  <div className="font-black tracking-[-0.03em] text-text">{post.title}</div>
                  <p className="mt-1 text-xs leading-6 text-subtext">{post.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">더 읽기</p>
          <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">Wanderer 소식</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
      </section>
    </article>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const posts = await getWriting();
  const relatedPosts = resolveProjectRecords(project, posts);
  const latestRecord = relatedPosts[0];

  if (project.slug === 'wanderer') {
    return <WandererFeaturePage relatedPosts={relatedPosts} />;
  }

  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <Link href="/projects" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 프로젝트 목록으로
      </Link>

      <PageHero eyebrow="project" title={<>{project.title}<br />소식</>} description={project.summary}>
        <div className="space-y-3 text-sm text-subtext">
          <Pill tone="point">{project.status}</Pill>
          {latestRecord ? <Pill>최근 {latestRecord.publishedAt}</Pill> : null}
        </div>
      </PageHero>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-8">
          {project.coverImage ? (
            <figure className="studio-shot overflow-hidden rounded-[34px] border border-line/80 bg-white/[0.06] shadow-glow">
              <img alt={`${project.title} 대표 이미지`} className="max-h-[640px] w-full object-cover" src={project.coverImage} />
              <figcaption className="studio-caption">
                <span>{project.title} · 실제 실행 화면</span>
                <span>{project.status}</span>
              </figcaption>
            </figure>
          ) : null}

          <section className="panel-section">
            <div className="mb-6 flex flex-wrap gap-2 text-[12px]">
              <Pill tone="point">{project.status}</Pill>
              {latestRecord ? <Pill>최근 기록 있음</Pill> : null}
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.html }} />
          </section>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">다음에 볼 것</div>
            <Link href={latestRecord ? `/writing/${latestRecord.slug}` : '/writing'} className="block rounded-[22px] border border-point/25 bg-point/10 p-4 text-point transition hover:bg-point/15">
              <div className="font-black tracking-[-0.03em]">{latestRecord ? '새 소식' : '소식'}</div>
              <p className="mt-1 text-[13px] leading-6 text-subtext">{latestRecord ? latestRecord.summary : '프로젝트와 연결된 글을 봅니다.'}</p>
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">연결된 기록</div>
            {relatedPosts.length > 0 ? (
              <div className="space-y-3">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/writing/${post.slug}`} className="block rounded-[20px] border border-line/80 bg-white/[0.055] p-4 transition hover:border-point/60 hover:bg-white/[0.08]">
                    <div className="font-black tracking-[-0.03em] text-text">{post.title}</div>
                    <p className="mt-1 text-xs leading-6 text-subtext">{post.summary}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="rounded-[20px] border border-line/80 bg-white/[0.055] p-4 text-xs leading-6">아직 이 프로젝트와 직접 연결한 기록은 많지 않지만, 작업은 계속 이어지고 있습니다.</p>
            )}
          </div>
        </aside>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="space-y-5">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">소식</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">이 프로젝트가 지나온 기록</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
