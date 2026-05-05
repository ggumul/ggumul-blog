import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-black uppercase tracking-[0.24em] text-point">{children}</p>;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line/70 bg-surface/70 p-5 md:p-8">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_260px] md:items-end">
        <div className="space-y-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-5xl text-[36px] font-black leading-[1.04] tracking-[-0.055em] text-text md:text-[68px]">
            {title}
          </h1>
          <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[19px] md:leading-9">{description}</p>
        </div>
        {children ? <div className="text-sm leading-7 text-subtext">{children}</div> : null}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="text-[26px] font-black leading-tight tracking-[-0.045em] text-text md:text-[42px]">{title}</h2>
        {description ? <p className="max-w-3xl text-sm leading-7 text-subtext md:text-base">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}


export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'point' }) {
  return (
    <span className={tone === 'point' ? 'trace-chip text-point' : 'trace-chip text-subtext'}>{children}</span>
  );
}
