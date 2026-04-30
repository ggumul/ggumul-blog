import { describe, expect, it } from 'vitest';
import {
  resolveWandererMiniPlayResult,
  wandererMiniPlayCards,
  wandererMiniPlayTurn,
} from '@/lib/wanderer-mini-play';

describe('Wanderer mini play sample', () => {
  it('models one real Wanderer-style turn instead of an item-choice vignette', () => {
    expect(wandererMiniPlayTurn.condition.label).toBe('홀수 카드만 유효');
    expect(wandererMiniPlayTurn.opponents).toHaveLength(3);
    expect(wandererMiniPlayTurn.opponents.map((opponent) => opponent.card)).toEqual([9, 12, 13]);
    expect(wandererMiniPlayCards).toHaveLength(3);
    expect(wandererMiniPlayCards.map((card) => card.value)).toEqual([5, 10, 15]);

    for (const card of wandererMiniPlayCards) {
      expect(card.title).toContain(String(card.value));
      expect(card.description).toMatch(/유효|무효|상대|조건/);
      expect(card.result).toMatch(/승리|무효|탈락|못합니다|패배/);
      expect(card.shareText).toContain('Wanderer');
      expect(card.shareText).toContain(wandererMiniPlayTurn.condition.label);
    }
  });

  it('resolves low valid, invalid, and winning outcomes from the turn rule', () => {
    const lowValid = resolveWandererMiniPlayResult('odd-5');
    expect(lowValid.isValid).toBe(true);
    expect(lowValid.outcome).toBe('lose');
    expect(lowValid.result).toContain('유효하지만');
    expect(lowValid.result).toContain('상대 9');
    expect(lowValid.result).toContain('카드 5는');
    expect(lowValid.result).not.toContain('카드 5은');
    expect(lowValid.shareText).toContain('카드 5를 냈다');
    expect(lowValid.shareText).not.toContain('카드 5을 냈다');

    const invalidEven = resolveWandererMiniPlayResult('even-10');
    expect(invalidEven.isValid).toBe(false);
    expect(invalidEven.outcome).toBe('invalid');
    expect(invalidEven.result).toContain('홀수 조건');
    expect(invalidEven.result).toContain('무효');

    const duplicateHigh = resolveWandererMiniPlayResult('odd-15');
    expect(duplicateHigh.isValid).toBe(true);
    expect(duplicateHigh.outcome).toBe('win');
    expect(duplicateHigh.result).toContain('상대 13보다 높아');
    expect(duplicateHigh.result).toContain('이번 턴 승리');
  });

  it('falls back safely to the first hand card for unknown input', () => {
    expect(resolveWandererMiniPlayResult('missing').id).toBe('odd-5');
  });
});
