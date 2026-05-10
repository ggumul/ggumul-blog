'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
};

type SiteNavProps = {
  items: NavItem[];
};

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({ items }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1.5 md:gap-2" aria-label="주요 메뉴">
      {items.map((item) => {
        const isCurrent = isCurrentPath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent ? 'page' : undefined}
            className={[
              'inline-flex min-h-[34px] items-center rounded-full border-2 px-2.5 py-1 text-[13px] font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/40 md:min-h-[36px] md:px-3 md:text-sm',
              isCurrent ? 'border-line bg-butter text-text shadow-[2px_2px_0_#2A2119]' : 'border-transparent text-subtext hover:border-line hover:bg-surface hover:text-text',
            ].join(' ')}
          >
            {item.label}
            {isCurrent ? <span className="sr-only"> · 현재 위치</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
