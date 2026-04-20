import { PostCard } from '@/components/post-card';
import { SectionTitle } from '@/components/section-title';
import { getWriting } from '@/lib/content';

export default async function WritingPage() {
  const posts = await getWriting();

  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm uppercase tracking-[0.2em] text-point">Writing</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">글과 기록</h1>
      </section>
      <SectionTitle title="발행한 글" body="기술 설명보다 작업의 흐름과 생각이 먼저 보였으면 해서 남기는 글들이다." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
