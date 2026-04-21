import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { getHomeArchiveSnapshot } from '@/lib/content';
import { createMetadata, createWebsiteJsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: '꼬물',
  description: '꼬물의 프로젝트와 최근 개발기록을 함께 볼 수 있는 홈페이지예요.',
  path: '/',
});

export default async function HomePage() {
  const snapshot = await getHomeArchiveSnapshot();
  const websiteJsonLd = createWebsiteJsonLd();

  return (
    <div className="archive-surface space-y-12 md:space-y-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {snapshot.latest ? (
        <section className="space-y-4 border-b border-line/80 pb-8">
          <div className="text-sm text-subtext">최신 글</div>
          <h1 className="max-w-4xl text-[30px] font-semibold tracking-[-0.05em] leading-[1.08] md:text-[56px]">
            <Link href={`/writing/${snapshot.latest.slug}`}>{snapshot.latest.title}</Link>
          </h1>
          <p className="max-w-3xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-8">
            {snapshot.latest.summary}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-subtext">
            <span>{snapshot.latest.publishedAt}</span>
            <span>{snapshot.latest.category}</span>
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-[24px] font-semibold tracking-[-0.04em] md:text-[32px]">프로젝트</h2>
          <p className="text-sm text-subtext">지금 만들고 있는 것들이에요.</p>
        </div>
        <div className="space-y-3">
          {snapshot.worklines.map((project) => (
            <ProjectCard key={project.slug} project={project} records={project.previewRecords} />
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t border-line/80 pt-8">
        <div className="space-y-1">
          <h2 className="text-[24px] font-semibold tracking-[-0.04em] md:text-[32px]">개발기록</h2>
          <p className="text-sm text-subtext">최근에 쓴 글이에요.</p>
        </div>
        <div className="space-y-3">
          {snapshot.moreEntries.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
