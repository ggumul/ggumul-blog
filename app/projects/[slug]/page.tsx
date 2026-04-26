import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Pill } from '@/components/brand-ui';
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
    title: `${project.title} 작업 기록`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
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
