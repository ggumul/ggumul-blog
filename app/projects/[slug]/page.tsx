import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getWriting } from '@/lib/content';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const posts = await getWriting();
  const relatedPosts = posts.filter((post) => project.relatedPosts.includes(post.slug));

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-point">Project</p>
        <h1 className="text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="max-w-2xl text-lg text-subtext">{project.summary}</p>
        <div className="text-sm text-subtext">현재 상태: {project.status}</div>
      </header>

      <section className="prose max-w-3xl text-subtext" dangerouslySetInnerHTML={{ __html: project.html }} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">관련 글</h2>
        <div className="space-y-3">
          {relatedPosts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="block rounded-2xl border border-line bg-white/60 p-4 hover:border-point">
              <div className="font-medium">{post.title}</div>
              <p className="mt-2 text-sm text-subtext">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
