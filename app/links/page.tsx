import { PageHero, SectionHeader } from '@/components/brand-ui';
import { createMetadata } from '@/lib/site';

const links = [
  { label: 'GitHub', href: 'https://github.com/ggomul', displayHref: 'github.com/ggomul', description: '만드는 과정이 코드로 남는 곳입니다', type: 'code' },
  { label: 'Notion', href: 'https://www.notion.so/348521c1518081e08d81d9215785de15', displayHref: 'notion.so/ggumul', description: '게임으로 옮기기 전의 생각을 짧게 적었습니다', type: 'idea' },
  { label: '문의 메일', href: 'mailto:hwang95903@gmail.com', displayHref: 'hwang95903@gmail.com', description: '같이 이야기할 일이 있으면 여기로 받습니다', type: 'mail' },
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
        eyebrow="바깥으로 이어지는 곳"
        title={<>게임을 본 뒤 이어가기</>}
        description="게임을 더 보고 싶을 때는 GitHub로, 아직 게임이 되기 전의 생각이 궁금할 때는 Notion으로 이어집니다. 직접 이야기해야 할 일은 메일로 받습니다."
      >
        <p>코드는 GitHub에서 보고, 아직 게임이 되기 전의 생각은 Notion에서 읽을 수 있습니다.</p>
        <p>직접 이야기해야 할 일은 메일로 보내면 됩니다.</p>
      </PageHero>

      <section className="space-y-5">
        <SectionHeader eyebrow="다음 길" title="더 보고 싶은 곳으로" description="게임에서 시작해 코드, 아이디어, 연락처로만 길을 줄였습니다." />
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
