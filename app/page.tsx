import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물이 만들고 있는 작은 게임과 개발 과정을 소개합니다.',
  path: '/',
});

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();
  const spotlight = snapshot.worklines[0] ?? null;
  const supportingProjects = snapshot.worklines.slice(1, 4);
  const featuredWriting = [snapshot.latest, ...snapshot.moreEntries]
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .slice(0, 4);

  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      <section className="hero-panel grid gap-8 overflow-hidden rounded-[30px] border border-line/80 bg-white/[0.03] p-6 md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] md:p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] font-semibold text-point">작은 게임을 만들고 기록합니다</p>
            <h1 className="max-w-4xl text-[32px] font-semibold leading-tight tracking-[-0.025em] text-text md:text-[58px]">
              짧게 플레이해도 오래 남는 작은 게임을 만듭니다.
            </h1>
            <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">
              Wanderer 같은 카드 게임부터 퍼즐, 분기형 서사 게임까지 천천히 다듬고 있습니다. 이곳에는 지금 만드는 게임과 그 과정에서 남긴 기록을 함께 모았습니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/projects/wanderer" className="inline-flex rounded-full border border-point/30 bg-point px-5 py-3 font-semibold text-[#160d08] transition hover:bg-[#ffc47f]">
              Wanderer 보기
            </Link>
            {snapshot.latest ? (
              <Link href={`/writing/${snapshot.latest.slug}`} className="inline-flex rounded-full border border-line/90 bg-white/10 px-5 py-3 font-semibold text-text transition hover:border-point/60">
                최근 기록 읽기
              </Link>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 text-[12px] text-subtext">
            <span className="inline-flex rounded-full border border-line/80 bg-white/10 px-3 py-1.5">실제 화면 기반</span>
            <span className="inline-flex rounded-full border border-line/80 bg-white/10 px-3 py-1.5">프로젝트와 개발 기록</span>
            <span className="inline-flex rounded-full border border-line/80 bg-white/10 px-3 py-1.5">모바일 화면 대응</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-line/70 bg-white/10 px-4 py-4">
              <div className="text-[12px] font-semibold text-point">프로젝트</div>
              <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text">{snapshot.worklines.length}</div>
              <p className="mt-1 text-sm leading-6 text-subtext">지금 만들고 있는 게임들입니다.</p>
            </div>
            <div className="rounded-2xl border border-line/70 bg-white/10 px-4 py-4">
              <div className="text-[12px] font-semibold text-point">개발 기록</div>
              <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text">{featuredWriting.length}</div>
              <p className="mt-1 text-sm leading-6 text-subtext">만들면서 남긴 판단과 수정 기록입니다.</p>
            </div>
            <div className="rounded-2xl border border-line/70 bg-white/10 px-4 py-4">
              <div className="text-[12px] font-semibold text-point">화면 캡처</div>
              <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-text">3</div>
              <p className="mt-1 text-sm leading-6 text-subtext">실제 실행 화면을 먼저 보여줍니다.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_188px]">
          <figure className="studio-shot overflow-hidden rounded-[26px] border border-line/80 bg-white/10">
            <img alt="Wanderer 홈 화면" className="h-full min-h-[250px] w-full object-cover" src="/studio/wanderer-home.png" />
            <figcaption className="studio-caption">
              <span>Wanderer · 홈 화면</span>
            </figcaption>
          </figure>

          <div className="grid gap-3">
            <figure className="studio-shot overflow-hidden rounded-[24px] border border-line/80 bg-white/10">
              <img alt="TRPG 실제 디바이스 메뉴 화면" className="h-[180px] w-full object-cover object-top" src="/studio/trpg-device-menu.png" />
              <figcaption className="studio-caption">
                <span>TRPG · 디바이스 화면</span>
              </figcaption>
            </figure>
            <figure className="studio-shot overflow-hidden rounded-[24px] border border-line/80 bg-white/10">
              <img alt="Color Hanoi 실제 플레이 화면" className="h-[180px] w-full object-cover" src="/project-covers/color-hanoi.png" />
              <figcaption className="studio-caption">
                <span>Color Hanoi · 플레이 화면</span>
              </figcaption>
            </figure>
          </div>

          <div className="rounded-[24px] border border-line/80 bg-white/10 p-4 md:col-span-2">
            <div className="flex flex-wrap items-center gap-2 text-sm text-subtext">
              <img alt="Hanoi 아이콘" className="h-8 w-8 rounded-lg border border-line/70 bg-white/10 object-cover" src="/project-icons/hanoi.png" />
              <span className="font-medium text-text">지금 만들고 있는 것</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div className="rounded-2xl border border-line/70 bg-white/[0.06] px-3 py-3">
                <div className="text-[12px] font-medium text-text">카드 게임</div>
                <p className="mt-1 text-[12px] leading-5 text-subtext">짧은 승부와 카드 선택의 재미를 다듬고 있습니다.</p>
              </div>
              <div className="rounded-2xl border border-line/70 bg-white/[0.06] px-3 py-3">
                <div className="text-[12px] font-medium text-text">분기형 서사</div>
                <p className="mt-1 text-[12px] leading-5 text-subtext">선택에 따라 장면이 달라지는 구조를 만들고 있습니다.</p>
              </div>
              <div className="rounded-2xl border border-line/70 bg-white/[0.06] px-3 py-3">
                <div className="text-[12px] font-medium text-text">퍼즐 실험</div>
                <p className="mt-1 text-[12px] leading-5 text-subtext">단순한 규칙 안에서 판단의 리듬을 실험합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {spotlight ? (
        <section className="panel-section grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-10">
          <div className="space-y-4">
            <p className="text-[12px] font-semibold text-point">대표 프로젝트</p>
            <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.025em] text-text md:text-[42px]">{spotlight.title}</h2>
            <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[18px] md:leading-9">{spotlight.summary}</p>
            <div className="flex flex-wrap gap-3 text-sm text-subtext">
              <span className="inline-flex rounded-full border border-point/20 bg-point/10 px-3 py-1.5 text-point">{spotlight.status}</span>
              <span className="inline-flex rounded-full border border-line/80 bg-white/10 px-3 py-1.5">개발 기록 {spotlight.recordCount}개</span>
              {spotlight.latestRecord ? <span className="inline-flex rounded-full border border-line/80 bg-white/10 px-3 py-1.5">최근 기록 {spotlight.latestRecord.title}</span> : null}
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href={`/projects/${spotlight.slug}`} className="inline-flex rounded-full border border-point/30 bg-point px-5 py-3 font-semibold text-[#160d08] transition hover:bg-[#ffc47f]">
                자세히 보기
              </Link>
              {spotlight.latestRecord ? (
                <Link href={`/writing/${spotlight.latestRecord.slug}`} className="inline-flex rounded-full border border-line/90 bg-white/10 px-5 py-3 font-semibold text-text transition hover:border-point/60">
                  관련 기록 읽기
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4">
            <figure className="studio-shot overflow-hidden rounded-[24px] border border-line/80 bg-white/10">
              <img alt={`${spotlight.title} 플레이 화면`} className="h-[260px] w-full object-cover" src={spotlight.coverImage ?? '/studio/wanderer-play.png'} />
              <figcaption className="studio-caption">
                <span>{spotlight.title} · 실행 화면</span>
              </figcaption>
            </figure>
            {supportingProjects.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {supportingProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="rounded-[20px] border border-line/80 bg-white/10 p-4 transition hover:border-point/60">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-text">{project.title}</div>
                        <p className="mt-1 text-[12px] leading-5 text-subtext">{project.status} · 개발 기록 {project.recordCount}개</p>
                      </div>
                      {project.slug === 'hanoi' ? (
                        <img alt="Hanoi 아이콘" className="h-10 w-10 rounded-xl border border-line/70 bg-white/10 object-cover" src="/project-icons/hanoi.png" />
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-subtext">{project.summary}</p>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] md:text-[32px]">프로젝트</h2>
          <p className="text-sm text-subtext">각 게임의 상태와 화면, 관련 기록을 함께 볼 수 있습니다.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {snapshot.worklines.map((project) => (
            <ProjectCard key={project.slug} project={project} records={project.previewRecords} />
          ))}
        </div>
      </section>

      <section className="panel-section space-y-5">
        <div className="space-y-1">
          <p className="text-[12px] font-semibold text-point">제작 노트</p>
          <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] md:text-[32px]">개발 기록</h2>
          <p className="text-sm leading-6 text-subtext">게임을 만들며 남긴 결정, 수정, 회고를 모았습니다. 완성된 결과뿐 아니라 만드는 중간의 흔적도 함께 남깁니다.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredWriting.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
