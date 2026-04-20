import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjects, getWritingBySlug } from '@/lib/content';

export default async function WritingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);

  if (!post) {
    notFound();
  }

  const projects = await getProjects();
  const relatedProjects = projects.filter((project) => post.relatedProjects.includes(project.slug));

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-point">Writing</p>
        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="max-w-2xl text-lg text-subtext">{post.summary}</p>
        <div className="text-sm text-subtext">{post.publishedAt}</div>
      </header>

      <section className="prose max-w-3xl text-subtext" dangerouslySetInnerHTML={{ __html: post.html }} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">관련 프로젝트</h2>
        <div className="space-y-3">
          {relatedProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="block rounded-2xl border border-line bg-white/60 p-4 hover:border-point">
              <div className="font-medium">{project.title}</div>
              <p className="mt-2 text-sm text-subtext">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
