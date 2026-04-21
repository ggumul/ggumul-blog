import { describe, expect, it } from 'vitest';
import { getArchiveTheme } from '@/lib/archive-style';

describe('archive style helper', () => {
  it('returns deterministic theme values for the same seed', () => {
    const first = getArchiveTheme('wanderer');
    const second = getArchiveTheme('wanderer');

    expect(first).toEqual(second);
  });

  it('returns different visual themes for different seeds often enough', () => {
    const a = getArchiveTheme('wanderer');
    const b = getArchiveTheme('trpg');

    expect(a.name).not.toBe(b.name);
  });
});
