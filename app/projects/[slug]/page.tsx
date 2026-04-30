import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Pill } from '@/components/brand-ui';
import { CommunityCTA } from '@/components/community-cta';
import { PostCard } from '@/components/post-card';
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
    title: project.slug === 'wanderer' ? 'Wanderer — 1분 카드 게임' : `${project.title} 작업 기록`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

function WandererFeaturePage({ relatedPosts }: { relatedPosts: Awaited<ReturnType<typeof getWriting>> }) {
  const latestRecord = relatedPosts[0];

  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <Link href="/projects" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 게임 목록으로
      </Link>

      <section className="hero-panel overflow-hidden rounded-[36px] border border-line/80 bg-white/[0.035] p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-stretch">
          <div className="flex flex-col justify-between gap-7 rounded-[28px] border border-line/70 bg-black/25 p-5 md:p-7">
            <div className="space-y-5">
              <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">wanderer / mobile card game</p>
              <div className="space-y-4">
                <h1 className="max-w-5xl text-[42px] font-black leading-[0.93] tracking-[-0.075em] text-text md:text-[84px]">
                  한 장을 고르고,<br />바로 결과를 보는 카드 전투.
                </h1>
                <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
                  Wanderer는 제한 시간 안에 카드를 고르고, 선택의 결과를 바로 확인하는 1분짜리 모바일 카드 게임입니다. 지금은 실제 플레이 흐름과 다시 시작했을 때의 이어짐을 다듬고 있습니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <a href="#play-video" className="inline-flex rounded-full border border-point/30 bg-point px-5 py-3 font-bold text-[#160d08] transition hover:bg-[#ffc47f]">플레이 영상 보기</a>
                <Link href="/writing/runtime-화면-확인-기록" className="inline-flex rounded-full border border-line/90 bg-white/10 px-5 py-3 font-bold text-text transition hover:border-point/60">개발로그 보기</Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">play time</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">1분</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">짧은 한 판</p>
              </div>
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">status</p>
                <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-text">플레이 확인</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">모바일 화면 보유</p>
              </div>
              <div className="rounded-[20px] border border-line/70 bg-white/[0.055] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">loop</p>
                <p className="mt-2 text-2xl font-black tracking-[-0.06em] text-text">선택→결과</p>
                <p className="mt-1 text-[13px] leading-6 text-subtext">핵심 플레이</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_190px]">
            <figure id="play-video" className="studio-shot relative min-h-[420px] scroll-mt-28 overflow-hidden rounded-[30px] border border-line/80 bg-black/30 md:min-h-[640px]">
              <video className="h-full w-full object-cover" src="/media/runtime-checks/wanderer-mobile-demo.mp4" poster="/project-covers/wanderer.png" autoPlay muted loop playsInline />
              <div className="absolute left-4 top-4 rounded-full border border-point/30 bg-black/45 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-point backdrop-blur">
                실제 플레이 흐름
              </div>
              <figcaption className="studio-caption">
                <span>Wanderer · 카드 선택 플레이 영상</span>
                <Link href="/writing/runtime-화면-확인-기록">기록 보기</Link>
              </figcaption>
            </figure>
            <div className="grid gap-3">
              <figure className="studio-shot relative min-h-[260px] overflow-hidden rounded-[24px] border border-line/80 bg-white/10">
                <img alt="Wanderer 홈 화면" className="h-full w-full object-cover object-top" src="/studio/wanderer-home.png" />
                <figcaption className="studio-caption"><span>모바일 홈</span></figcaption>
              </figure>
              <div className="rounded-[24px] border border-point/25 bg-point/10 p-4 text-sm leading-7 text-subtext">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">current focus</p>
                <p className="mt-2 font-bold text-text">제한 시간 안에 카드를 고르고, 바로 다음 결과를 확인하는 흐름을 다듬고 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CommunityCTA compact />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="story-card rounded-[28px] border border-line/80 bg-white/[0.055] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">how it plays</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-text">카드를 고르고 바로 결과를 봅니다.</h2>
          <p className="mt-3 text-sm leading-7 text-subtext">긴 성장 구조보다 한 판 안에서 선택과 분위기가 읽히는 흐름을 먼저 확인합니다.</p>
        </div>
        <div className="story-card rounded-[28px] border border-line/80 bg-white/[0.055] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">why now</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-text">실제 폰에서 흐름을 다시 봅니다.</h2>
          <p className="mt-3 text-sm leading-7 text-subtext">화면이 예쁘게 보이는지보다, 처음부터 끝까지 조작이 끊기지 않는지를 기준으로 봅니다.</p>
        </div>
        <div className="story-card rounded-[28px] border border-line/80 bg-white/[0.055] p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">next update</p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-text">다시 시작해도 흐름을 이어갑니다.</h2>
          <p className="mt-3 text-sm leading-7 text-subtext">다시 켰을 때도 지금 판의 상태가 자연스럽게 이어지도록 모바일과 서버의 기준을 맞추고 있습니다.</p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="panel-section space-y-6">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">game pitch</p>
            <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">작고 짧게, 끝까지 흐르는 카드 게임</h2>
          </div>
          <div className="prose max-w-none">
            <p>Wanderer는 큰 콘텐츠 볼륨보다 짧은 한 판의 흐름을 먼저 보는 게임입니다. 카드를 고르고, 결과를 보고, 다시 다음 선택으로 넘어가는 리듬이 핵심입니다.</p>
            <p>지금 공개 페이지에서는 완성된 상점 페이지처럼 과장하지 않고, 실제 실행 화면과 최근에 확인한 문제를 같이 보여줍니다. 그래서 이 페이지의 목적은 “완성작 홍보”가 아니라 “지금 어떤 게임으로 다듬고 있는지”를 바로 이해시키는 것입니다.</p>
            <h2>지금 확인한 것</h2>
            <ul>
              <li>모바일에서 Wanderer 화면이 실제로 실행됩니다.</li>
              <li>카드 선택과 화면 전환 흐름을 영상과 기록으로 남겼습니다.</li>
              <li>재접속 이후 현재 게임 상태를 다시 받는 흐름은 계속 다듬는 중입니다.</li>
            </ul>
          </div>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">start here</div>
            <Link href="/writing/runtime-화면-확인-기록" className="block rounded-[22px] border border-point/25 bg-point/10 p-4 text-point transition hover:bg-point/15">
              <div className="font-black tracking-[-0.03em]">실제 폰에서 돌려본 기록</div>
              <p className="mt-1 text-[13px] leading-6 text-subtext">게임 화면이 어떻게 보이고 어디가 아직 어색한지 먼저 확인합니다.</p>
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">updates</div>
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
          <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">devlog flow</p>
          <h2 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.055em] text-text md:text-[48px]">Wanderer가 지나온 기록</h2>
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

      <PageHero eyebrow="project" title={<>{project.title}<br />작업 노트</>} description={project.summary}>
        <div className="space-y-3 text-sm text-subtext">
          <Pill tone="point">{project.status}</Pill>
          <Pill>순서 {String(project.order).padStart(2, '0')}</Pill>
          <Pill>연결된 기록 {relatedPosts.length}개</Pill>
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
              <Pill tone="point">상태: {project.status}</Pill>
              <Pill>관련 기록 {relatedPosts.length}개</Pill>
              {latestRecord ? <Pill>최근 기록: {latestRecord.title}</Pill> : null}
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.html }} />
          </section>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext lg:sticky lg:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">next action</div>
            <Link href={latestRecord ? `/writing/${latestRecord.slug}` : '/writing'} className="block rounded-[22px] border border-point/25 bg-point/10 p-4 text-point transition hover:bg-point/15">
              <div className="font-black tracking-[-0.03em]">{latestRecord ? '최근 개발기록 읽기' : '개발기록 보기'}</div>
              <p className="mt-1 text-[13px] leading-6 text-subtext">{latestRecord ? latestRecord.summary : '프로젝트와 연결된 글을 전체 archive에서 확인합니다.'}</p>
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">connected records</div>
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
            <p className="text-[12px] font-black uppercase tracking-[0.28em] text-point">devlog flow</p>
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
