import { PageHero, SectionHeader } from '@/components/brand-ui';
import { createMetadata } from '@/lib/site';

const links = [
  { label: 'GitHub', href: 'https://github.com/ggomul', displayHref: 'github.com/ggomul', description: '게임과 작은 도구의 코드 저장소', type: 'code' },
  { label: 'Notion', href: 'https://www.notion.so/348521c1518081e08d81d9215785de15', displayHref: 'notion.so/ggumul', description: '게임 아이디어와 제작 노트', type: 'idea' },
  { label: '문의 메일', href: 'mailto:hwang95903@gmail.com', displayHref: 'hwang95903@gmail.com', description: '메일로 연락하기', type: 'mail' },
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
        title={<>게임, 아이디어, 연락처를<br />한 곳에 모았습니다.</>}
        description="Wanderer와 작은 게임들을 더 보려는 사람이 바로 이동할 수 있게 모았습니다."
      >
        <div className="space-y-3 text-sm leading-7 text-subtext">
          <p>외부 링크는 새 탭에서 열립니다.</p>
          <p>메일은 가장 확실한 연락 방법입니다.</p>
        </div>
      </PageHero>

      <section className="space-y-5">
        <SectionHeader eyebrow="연결되는 곳" title="꼬물과 연결되는 곳" description="코드 저장소, 게임 아이디어, 연락처를 한곳에 모았습니다." />
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
              <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-[12px] leading-5 text-point">{link.displayHref}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
