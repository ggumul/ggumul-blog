import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';

export function PostCard({ post }: { post: WritingEntry }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group grid gap-3 rounded-[1.35rem] border border-line/80 bg-white/45 px-4 py-4 shadow-[0_16px_36px_rgba(68,49,33,0.03)] transition hover:border-point/70 hover:bg-white/70 md:grid-cols-[170px_minmax(0,1fr)] md:gap-7 md:rounded-[1.6rem] md:px-6 md:py-6"
    >
      <div className="rounded-2xl bg-background/70 px-3 py-2.5 text-sm text-subtext md:px-4 md:py-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-point">{post.publishedAt}</div>
        <div className="text-[13px] leading-6">{post.category}</div>
        {post.series ? <div className="text-[12px] leading-6">시리즈 · {post.series}</div> : null}
      </div>

      <div className="space-y-3 md:pr-6">
        <div className="flex items-start gap-3">
          <span className="mt-3 h-px w-10 bg-point/45 transition group-hover:w-14 group-hover:bg-point" />
          <div className="space-y-2">
            <h3 className="text-[22px] font-semibold tracking-[-0.04em] leading-[1.12] text-text transition group-hover:text-point md:text-[34px] md:leading-[1.08]">
              {post.title}
            </h3>
            <p className="max-w-2xl text-[15px] leading-7 text-subtext md:text-[16px] md:leading-8">{post.summary}</p>
          </div>
        </div>
      </div>

      <div className="md:col-start-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-line/60 pt-3 text-[12px] text-subtext">
        <span>{post.status}</span>
        {post.relatedProjects.length > 0 ? <span>관련 프로젝트 {post.relatedProjects.length}개</span> : null}
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </Link>
  );
}
