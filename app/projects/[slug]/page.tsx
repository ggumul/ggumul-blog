import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, Pill, SectionHeader } from '@/components/brand-ui';
import { getProjectBySlug, getProjects, getWriting } from '@/lib/content';
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
      description: '요청한 작업을 찾을 수 없어.',
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
  const explicitRecords = posts.filter((post) => project.relatedPosts.includes(post.slug));
  const fallbackRecords = posts.filter((post) => post.relatedProjects.includes(project.slug));
  const relatedPosts = explicitRecords.length > 0 ? explicitRecords : fallbackRecords;

  return (
    <article className="archive-surface space-y-10 md:space-y-14">
      <Link href="/projects" className="inline-flex min-h-[40px] items-center rounded-full border border-line/80 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-subtext transition hover:border-point/60 hover:text-text">
        ← 프로젝트 목록으로
      </Link>

      <PageHero eyebrow="프로젝트 상세" title={project.title} description={project.summary}>
        <div className="space-y-3 text-sm text-subtext">
          <Pill tone="point">{project.status}</Pill>
          <Pill>순서 {String(project.order).padStart(2, '0')}</Pill>
          <Pill>연결된 기록 {relatedPosts.length}개</Pill>
        </div>
      </PageHero>

      {project.coverImage ? (
        <figure className="studio-shot overflow-hidden rounded-[30px] border border-line/80 bg-white/[0.06] shadow-glow">
          <img alt={`${project.title} 대표 이미지`} className="max-h-[620px] w-full object-cover" src={project.coverImage} />
          <figcaption className="studio-caption">
            <span>{project.title} · 실제 실행 화면</span>
            <span>{project.status}</span>
          </figcaption>
        </figure>
      ) : null}

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:items-start">
        <section className="panel-section">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.html }} />
        </section>

        <aside className="aside-rail panel-aside space-y-6 text-sm text-subtext md:sticky md:top-24">
          <SectionHeader eyebrow="연결된 기록" title="연결된 개발 기록" description="프로젝트가 어떤 수정과 방향 변경을 거쳐 지금 상태가 됐는지 글로 이어서 볼 수 있습니다." />
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
            <p className="rounded-[20px] border border-line/80 bg-white/[0.055] p-4 text-xs leading-6">아직 이 프로젝트와 직접 연결한 기록은 많지 않지만, 작업은 계속 이어지고 있어요.</p>
          )}
        </aside>
      </div>
    </article>
  );
}
