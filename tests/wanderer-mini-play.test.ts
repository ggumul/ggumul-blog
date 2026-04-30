import { describe, expect, it } from 'vitest';
import { wandererMiniPlayCards, resolveWandererMiniPlayResult } from '@/lib/wanderer-mini-play';

describe('Wanderer mini play sample', () => {
  it('offers three readable card choices for a 30-second sample', () => {
    expect(wandererMiniPlayCards).toHaveLength(3);
    expect(wandererMiniPlayCards.map((card) => card.id)).toEqual(['old-sword', 'lantern', 'torn-map']);

    for (const card of wandererMiniPlayCards) {
      expect(card.title.length).toBeGreaterThanOrEqual(3);
      expect(card.description).toContain('선택');
      expect(card.result).toMatch(/다음|길|전투|밤/);
      expect(card.shareText).toContain('Wanderer');
      expect(card.shareText).toContain(card.title);
    }
  });

  it('resolves a selected card and falls back to the first card for unknown input', () => {
    expect(resolveWandererMiniPlayResult('lantern')?.title).toBe('작은 등불');
    expect(resolveWandererMiniPlayResult('missing')?.id).toBe('old-sword');
  });
});
