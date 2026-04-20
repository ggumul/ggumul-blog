import Link from 'next/link';
import type { ProjectEntry } from '@/lib/content';

export function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-2xl border border-line bg-white/60 p-5 transition hover:border-point"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span className="text-xs text-subtext">{project.status}</span>
      </div>
      <p className="mt-3 text-sm text-subtext">{project.summary}</p>
    </Link>
  );
}
