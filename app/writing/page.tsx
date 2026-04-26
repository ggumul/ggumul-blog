import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { Pill, SectionHeader } from '@/components/brand-ui';
import { getWritingArchiveSections } from '@/lib/content';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: '개발 기록',
  description: 'Wanderer, Hanoi, TRPG를 만들며 확인한 버그, 화면, 설계 결정을 모았습니다.',
  path: '/writing',
});

export default async function WritingPage() {
  const sections = await getWritingArchiveSections();
  const totalPostCount = sections.timeline.length + 1;
  const projectTags = sections.taxonomy.tags.filter((tag) => ['wanderer', 'hanoi', 'trpg', 'color-hanoi'].includes(tag));
  const topicTags = sections.taxonomy.tags.filter((tag) => !projectTags.includes(tag)).slice(0, 10);

  return (
    <div className="archive-surface space-y-10 md:space-y-12">
      <section className="rounded-[28px] border border-line/80 bg-white/[0.035] p-5 md:p-7">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="space-y-3">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-point">개발 기록</p>
            <h1 className="max-w-4xl text-[34px] font-black leading-[1.02] tracking-[-0.06em] text-text md:text-[58px]">
              게임이 실제로 움직인 기록만 남깁니다.
            </h1>
            <p className="max-w-3xl text-[15px] leading-7 text-subtext md:text-[18px] md:leading-8">
              Wanderer의 플레이 흐름, Hanoi의 조작 확인, 서버와 모바일의 sync 문제처럼 실제 화면과 코드에서 확인한 내용을 개발 로그로 정리합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[12px] md:justify-end">
            <Pill tone="point">글 {totalPostCount}개</Pill>
            <Pill>시리즈 {sections.index.seriesCount}개</Pill>
            <Pill>분류 {sections.index.categoryCount}개</Pill>
            <Link className="trace-chip min-h-[30px] border-point/35 bg-point/15 text-point transition hover:bg-point/25" href="/feed.xml">
              RSS
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[minmax(0,1fr)_270px] md:items-start md:gap-10">
        <div className="space-y-8">
          <section className="space-y-4">
            <SectionHeader
              eyebrow="latest devlog"
              title="최신 개발 로그"
              description="가장 최근에 실제 실행 화면이나 코드 기준으로 확인한 작업입니다."
            />
            <PostCard post={sections.latest} />
          </section>

          <section className="space-y-4">
            <SectionHeader
              eyebrow="all records"
              title="전체 기록"
              description="프로젝트, 글 유형, 읽는 시간을 한 줄로 줄이고 본문 목록의 밀도를 높였습니다."
            />
            <div className="grid gap-3">
              {sections.timeline.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        </div>

        <aside className="aside-rail panel-aside space-y-7 text-sm text-subtext md:sticky md:top-24">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">프로젝트</div>
            <p className="text-[13px] leading-6">글을 먼저 프로젝트 기준으로 찾을 수 있게 분리했습니다.</p>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {projectTags.map((tag) => (
                <span key={tag} className="rounded-full border border-point/25 bg-point/10 px-3 py-1 text-point">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">글 유형</div>
            <div className="space-y-2 text-[13px] leading-6">
              {sections.taxonomy.categories.map((category) => (
                <div key={category} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-text/90">
                  {category}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">주제 태그</div>
            <div className="flex flex-wrap gap-2 text-[12px]">
              {topicTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-subtext">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
