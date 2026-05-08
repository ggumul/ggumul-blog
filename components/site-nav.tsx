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
    <nav className="flex flex-wrap gap-x-3 gap-y-2" aria-label="주요 메뉴">
      {items.map((item) => {
        const isCurrent = isCurrentPath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent ? 'page' : undefined}
            className={[
              'inline-flex min-h-[36px] items-center rounded-full px-2 py-1 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-point/40',
              isCurrent ? 'bg-point/12 text-text ring-1 ring-point/35' : 'text-subtext hover:text-text',
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
