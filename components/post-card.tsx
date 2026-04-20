import Link from 'next/link';
import type { WritingEntry } from '@/lib/content';

export function PostCard({ post }: { post: WritingEntry }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="block rounded-2xl border border-line bg-white/60 p-5 transition hover:border-point"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <span className="text-xs text-subtext">{post.publishedAt}</span>
      </div>
      <p className="mt-3 text-sm text-subtext">{post.summary}</p>
    </Link>
  );
}
