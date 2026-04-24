import { createMetadata } from '@/lib/site';

const links = [
  { label: 'GitHub', href: 'https://github.com/ggumul', description: '코드와 프로젝트 저장소' },
  { label: 'Notion', href: 'https://www.notion.so/348521c1518081e08d81d9215785de15', description: '기획 메모와 작업 정리' },
  { label: '문의 메일', href: 'mailto:hwang95903@gmail.com', description: '협업과 문의 메일' },
];

export const metadata = createMetadata({
  title: '링크',
  description: '꼬물의 외부 링크를 모았습니다.',
  path: '/links',
});

export default function LinksPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4 rounded-[28px] border border-line bg-white/10 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.24em] text-point">링크</p>
        <h1 className="text-4xl font-semibold tracking-tight">꼬물과 연결되는 곳</h1>
        <p className="max-w-2xl text-base leading-7 text-subtext md:text-lg">
          코드 저장소, 작업 문서, 문의 메일을 모았습니다.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="rounded-[24px] border border-line bg-white/10 p-5 transition hover:border-point hover:shadow-glow">
            <div className="text-lg font-semibold tracking-tight">{link.label}</div>
            <p className="mt-3 text-sm leading-7 text-subtext">{link.description}</p>
            <p className="mt-3 text-sm break-all text-point">{link.href}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
