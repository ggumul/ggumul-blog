import { FeatureCard, PageHero, SectionHeader } from '@/components/brand-ui';
import { createMetadata } from '@/lib/site';

const links = [
  { label: 'GitHub', href: 'https://github.com/ggumul', description: '코드와 프로젝트 저장소', type: 'code' },
  { label: 'Notion', href: 'https://www.notion.so/348521c1518081e08d81d9215785de15', description: '기획 메모와 작업 정리', type: 'docs' },
  { label: '문의 메일', href: 'mailto:hwang95903@gmail.com', description: '협업과 문의 메일', type: 'contact' },
];

export const metadata = createMetadata({
  title: '링크',
  description: '꼬물의 외부 링크를 모았습니다.',
  path: '/links',
});

export default function LinksPage() {
  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <PageHero
        eyebrow="링크"
        title={<>코드, 문서, 연락처를<br />한 곳에 모았습니다.</>}
        description="프로젝트 저장소와 작업 문서, 문의 채널을 바로 찾을 수 있게 모았습니다."
      >
        <div className="space-y-3 text-sm leading-7 text-subtext">
          <p>외부 링크는 새 탭에서 열립니다.</p>
          <p>작업 관련 문의는 메일이 가장 확실합니다.</p>
        </div>
      </PageHero>

      <section className="space-y-5">
        <SectionHeader eyebrow="연결되는 곳" title="꼬물과 연결되는 곳" description="저장소, 문서, 연락처를 역할별로 구분해 바로 이동할 수 있게 했습니다." />
        <div className="grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'} className="story-card group rounded-[28px] border border-line/80 bg-white/[0.055] p-5 transition hover:border-point/60 hover:bg-white/[0.08]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.24em] text-point">{link.type}</div>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.045em] text-text transition group-hover:text-point">{link.label}</h2>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-point/25 bg-point/10 text-point">↗</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-subtext">{link.description}</p>
              <p className="mt-4 break-all rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-[12px] leading-5 text-point">{link.href}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <FeatureCard title="프로젝트가 궁금하면" description="먼저 프로젝트 페이지에서 실제 화면과 연결된 기록을 확인하는 흐름을 권장합니다." />
        <FeatureCard title="작업 맥락이 궁금하면" description="개발 기록 페이지에서 시리즈와 태그를 따라 읽으면 방향 변경과 수정 이유를 확인할 수 있습니다." />
      </section>
    </div>
  );
}
