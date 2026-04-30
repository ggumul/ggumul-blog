import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  resolveWandererMiniPlayResult,
  wandererMiniPlayCards,
  wandererMiniPlayTurn,
} from '@/lib/wanderer-mini-play';

describe('Wanderer mini play sample', () => {
  it('models one real Wanderer-style turn instead of an item-choice vignette', () => {
    expect(wandererMiniPlayTurn.condition.label).toBe('홀수만 살아남음');
    expect(wandererMiniPlayTurn.opponents).toHaveLength(3);
    expect(wandererMiniPlayTurn.opponents.map((opponent) => opponent.card)).toEqual([9, 12, 13]);
    expect(wandererMiniPlayCards).toHaveLength(3);
    expect(wandererMiniPlayCards.map((card) => card.value)).toEqual([5, 10, 15]);

    for (const card of wandererMiniPlayCards) {
      expect(card.title).toContain(String(card.value));
      expect(card.description).toMatch(/규칙|탈락|상대|살아남/);
      expect(card.result).toMatch(/살아남|탈락|가져오지 못합니다|가져갑니다/);
      expect(card.shareText).toContain('Wanderer');
      expect(card.shareText).toContain(wandererMiniPlayTurn.condition.label);
    }
  });

  it('resolves low valid, invalid, and winning outcomes from the turn rule', () => {
    const lowValid = resolveWandererMiniPlayResult('odd-5');
    expect(lowValid.isValid).toBe(true);
    expect(lowValid.outcome).toBe('lose');
    expect(lowValid.result).toContain('살아남지만');
    expect(lowValid.result).toContain('상대 9');
    expect(lowValid.result).toContain('카드 5는');
    expect(lowValid.result).not.toContain('카드 5은');
    expect(lowValid.shareText).toContain('카드 5를 냈다');
    expect(lowValid.shareText).not.toContain('카드 5을 냈다');

    const invalidEven = resolveWandererMiniPlayResult('even-10');
    expect(invalidEven.isValid).toBe(false);
    expect(invalidEven.outcome).toBe('invalid');
    expect(invalidEven.result).toContain('홀수가 아니라서');
    expect(invalidEven.result).toContain('탈락');

    const duplicateHigh = resolveWandererMiniPlayResult('odd-15');
    expect(duplicateHigh.isValid).toBe(true);
    expect(duplicateHigh.outcome).toBe('win');
    expect(duplicateHigh.result).toContain('상대의 13보다 높아');
    expect(duplicateHigh.result).toContain('이번 턴을 가져갑니다');
  });

  it('keeps the public copy away from document/test-panel wording', () => {
    const projectPageCopy = readFileSync('app/projects/[slug]/page.tsx', 'utf8');
    const combinedCopy = [
      projectPageCopy,
      wandererMiniPlayTurn.condition.label,
      wandererMiniPlayTurn.condition.description,
      wandererMiniPlayTurn.ruleSummary,
      ...wandererMiniPlayTurn.opponents.flatMap((opponent) => [opponent.name, opponent.note]),
      ...wandererMiniPlayCards.flatMap((card) => [card.title, card.description, card.scene, card.result, card.shareText]),
    ].join('\n');

    expect(combinedCopy).not.toMatch(/30초 샘플|조건을 만족한 기준점|현재 가장 높은 유효 카드|숫자 싸움이 남습니다|play time|>status<|>loop<|조건→선택→판정/);
  });

  it('falls back safely to the first hand card for unknown input', () => {
    expect(resolveWandererMiniPlayResult('missing').id).toBe('odd-5');
  });
});
