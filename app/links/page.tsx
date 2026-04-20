const links = [
  { label: 'GitHub', href: 'https://github.com/ggumul' },
  { label: 'Notion', href: 'https://www.notion.so/348521c1518081e08d81d9215785de15' },
  { label: 'X', href: '#' },
  { label: '문의 메일', href: 'mailto:hwang95903@gmail.com' },
];

export default function LinksPage() {
  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm uppercase tracking-[0.2em] text-point">Links</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">바깥으로 연결되는 곳</h1>
        <p className="mt-4 max-w-2xl text-subtext">정리된 기록은 노션에, 코드와 레포는 GitHub에, 짧은 흐름은 X에 남긴다.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="rounded-2xl border border-line bg-white/60 p-5 transition hover:border-point">
            <div className="text-lg font-semibold">{link.label}</div>
            <p className="mt-2 text-sm text-subtext break-all">{link.href}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
