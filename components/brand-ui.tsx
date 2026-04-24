import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-black uppercase tracking-[0.28em] text-point">{children}</p>;
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
    <section className="hero-panel overflow-hidden rounded-[34px] border border-line/80 bg-white/[0.035] p-6 md:p-9">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_300px] md:items-end">
        <div className="space-y-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-5xl text-[38px] font-black leading-[0.98] tracking-[-0.065em] text-text md:text-[76px]">
            {title}
          </h1>
          <p className="max-w-3xl text-[16px] leading-8 text-subtext md:text-[20px] md:leading-9">{description}</p>
        </div>
        {children ? <div className="panel-aside md:self-stretch">{children}</div> : null}
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

export function MetricCard({ label, value, description }: { label: string; value: ReactNode; description: string }) {
  return (
    <div className="rounded-[24px] border border-line/80 bg-white/[0.065] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-point">{label}</div>
      <div className="mt-2 text-3xl font-black tracking-[-0.06em] text-text">{value}</div>
      <p className="mt-1 text-[13px] leading-6 text-subtext">{description}</p>
    </div>
  );
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'point' }) {
  return (
    <span className={tone === 'point' ? 'trace-chip text-point' : 'trace-chip text-subtext'}>{children}</span>
  );
}

export function FeatureCard({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <div className="story-card rounded-[28px] border border-line/80 bg-white/[0.055] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black tracking-[-0.04em] text-text">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-subtext">{description}</p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-point/25 bg-point/10 text-point">✦</span>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
