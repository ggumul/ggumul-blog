import { PageHero, SectionHeader } from '@/components/brand-ui';
import { createMetadata } from '@/lib/site';

const links = [
  { label: 'GitHub', href: 'https://github.com/ggomul', displayHref: 'github.com/ggomul', description: '코드와 배포 내역을 올립니다', type: 'code' },
  { label: 'Notion', href: 'https://www.notion.so/348521c1518081e08d81d9215785de15', displayHref: 'notion.so/ggumul', description: '아직 글로 묶기 전의 조각을 둡니다', type: 'note' },
  { label: '메일', href: 'mailto:hwang95903@gmail.com', displayHref: 'hwang95903@gmail.com', description: '따로 할 말이 있으면 여기로 보내 주세요', type: 'mail' },
];

export const metadata = createMetadata({
  title: '링크',
  description: '꼬물의 외부 링크입니다.',
  path: '/links',
});

export default function LinksPage() {
  return (
    <div className="archive-surface space-y-12 md:space-y-16">
      <PageHero
        eyebrow="링크"
        title={<>코드, 조각, 연락처</>}
        description="배포된 코드는 GitHub에 있고, 글로 묶기 전의 조각은 Notion에 있습니다. 따로 할 말은 메일로 받습니다."
      >
        <p>지금 쓰는 세 곳만 둡니다.</p>
      </PageHero>

      <section className="space-y-5">
        <SectionHeader eyebrow="목록" title="GitHub, Notion, 메일" description="코드, 조각, 연락처입니다." />
        <div className="divide-y divide-line/70 border-y border-line/70">
          {links.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'} className="grid gap-2 py-5 transition hover:text-text md:grid-cols-[140px_minmax(0,1fr)_auto] md:items-center">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-point">{link.type}</div>
              <div>
                <h2 className="text-2xl font-black tracking-[-0.045em] text-text">{link.label}</h2>
                <p className="mt-1 text-sm leading-7 text-subtext">{link.description}</p>
              </div>
              <p className="text-sm font-semibold text-point">{link.displayHref}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
