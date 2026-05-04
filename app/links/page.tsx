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
        <p>외부 링크는 새 탭에서 열립니다.</p>
        <p>메일은 가장 확실한 연락 방법입니다.</p>
      </PageHero>

      <section className="space-y-5">
        <SectionHeader eyebrow="연결되는 곳" title="꼬물과 연결되는 곳" description="코드 저장소, 게임 아이디어, 연락처를 한곳에 모았습니다." />
        <div className="divide-y divide-line/70 border-y border-line/70">
          {links.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'} className="grid gap-2 py-5 transition hover:text-text md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-center">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-point">{link.type}</div>
              <div>
                <h2 className="text-2xl font-black tracking-[-0.045em] text-text">{link.label}</h2>
                <p className="mt-1 text-sm leading-7 text-subtext">{link.description}</p>
              </div>
              <p className="text-sm font-semibold text-point">{link.displayHref} ↗</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
