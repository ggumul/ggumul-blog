import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';

export function PostCard({ post }: { post: WritingEntry }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group grid gap-4 border-t border-line/80 py-6 transition first:border-t-0 hover:border-point/70 md:grid-cols-[170px_minmax(0,1fr)] md:gap-7"
    >
      <div className="space-y-1 text-sm text-subtext">
        <div className="text-[10px] uppercase tracking-[0.3em] text-point">{post.publishedAt}</div>
        <div className="text-[13px] leading-6">{post.category}</div>
        {post.series ? <div className="text-[12px] leading-6">시리즈 · {post.series}</div> : null}
      </div>

      <div className="space-y-3 md:pr-6">
        <div className="flex items-start gap-3">
          <span className="mt-3 h-px w-10 bg-point/45 transition group-hover:w-14 group-hover:bg-point" />
          <div className="space-y-2">
            <h3 className="text-[28px] font-semibold tracking-[-0.04em] leading-[1.08] text-text transition group-hover:text-point md:text-[34px]">
              {post.title}
            </h3>
            <p className="max-w-2xl text-[16px] leading-8 text-subtext">{post.summary}</p>
          </div>
        </div>
      </div>

      <div className="md:col-start-2 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-subtext">
        <span>{post.status}</span>
        {post.relatedProjects.length > 0 ? <span>관련 프로젝트 {post.relatedProjects.length}개</span> : null}
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </Link>
  );
}
