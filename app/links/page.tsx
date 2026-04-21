import { createMetadata } from '@/lib/site';

const links = [
  { label: 'GitHub', href: 'https://github.com/ggumul', description: '코드와 레포, 작업 히스토리를 모아두는 곳' },
  { label: 'Notion', href: 'https://www.notion.so/348521c1518081e08d81d9215785de15', description: '조금 더 내부에 가까운 정리와 메모를 남기는 곳' },
  { label: '문의 메일', href: 'mailto:hwang95903@gmail.com', description: '협업이나 이야기 나누고 싶을 때 열어둔 창구' },
];

export const metadata = createMetadata({
  title: '바깥 링크',
  description: 'GitHub, Notion, 메일 등 꼬물 작업실 바깥으로 이어지는 링크 모음.',
  path: '/links',
});

export default function LinksPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4 rounded-[28px] border border-line bg-white/65 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.24em] text-point">Outside links</p>
        <h1 className="text-4xl font-semibold tracking-tight">바깥으로 연결되는 곳</h1>
        <p className="max-w-2xl text-base leading-7 text-subtext md:text-lg">
          작업실 바깥으로 난 문들이다. 코드, 정리 문서, 연락 창구를 너무 많지 않게 모아두었다.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="rounded-[24px] border border-line bg-white/72 p-5 transition hover:border-point hover:shadow-[0_12px_30px_rgba(69,51,33,0.06)]">
            <div className="text-lg font-semibold tracking-tight">{link.label}</div>
            <p className="mt-3 text-sm leading-7 text-subtext">{link.description}</p>
            <p className="mt-3 text-sm break-all text-point">{link.href}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
