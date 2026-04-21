import Link from 'next/link';
import { notFound } from 'next/navigation';
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
    <article className="space-y-10 md:space-y-12">
      <header className="space-y-5 border-b border-line/80 pb-8 md:pb-10">
        <Link href="/projects" className="inline-flex text-sm text-subtext transition hover:text-text">
          ← 작업선으로
        </Link>
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-point">project / 작업 중</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-text md:text-6xl md:leading-[1.08]">{project.title}</h1>
          <p className="max-w-3xl text-base leading-8 text-subtext md:text-[17px]">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-subtext">
          <span>순서 {String(project.order).padStart(2, '0')}</span>
          <span>상태 {project.status}</span>
          <span>연결된 기록 {relatedPosts.length}개</span>
        </div>
      </header>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_240px] md:items-start">
        <section>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.html }} />
        </section>

        <aside className="space-y-8 border-l border-line/70 pl-0 text-sm text-subtext md:sticky md:top-24 md:pl-5">
          <div className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-point">이 작업선 곁의 기록</h2>
            {relatedPosts.length > 0 ? (
              <div className="space-y-3">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/writing/${post.slug}`} className="block transition hover:text-text">
                    <div className="font-medium text-text">{post.title}</div>
                    <p className="mt-1 text-xs leading-6">{post.summary}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs leading-6">아직 이 작업과 직접 이어 둔 기록은 적다. 그래도 작업선 자체는 계속 남아 있다.</p>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
