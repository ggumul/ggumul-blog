import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

describe('public UI copy cleanup', () => {
  it('keeps Korean prose from splitting syllables in narrow cards', () => {
    const css = read('app/globals.css');

    expect(css).toMatch(/body[\s\S]*word-break:\s*keep-all/);
    expect(css).toMatch(/\.prose[\s\S]*word-break:\s*keep-all/);
    expect(css).toMatch(/\.korean-keep[\s\S]*word-break:\s*keep-all/);
  });

  it('does not expose raw long external URLs as card text', () => {
    const linksPage = read('app/links/page.tsx');

    expect(linksPage).not.toContain('break-all');
    expect(linksPage).not.toContain('{link.href}</p>');
    expect(linksPage).toContain('link.displayHref');
  });

  it('removes internal ordering and reading-time chips from visitor-facing cards', () => {
    const combined = [
      read('app/projects/[slug]/page.tsx'),
      read('components/post-card.tsx'),
      read('components/project-card.tsx'),
      read('app/writing/[slug]/page.tsx'),
    ].join('\n');

    expect(combined).not.toMatch(/순서 \{String\(project\.order\)|readingTimeMinutes\}분|개발기록 \{records\.length\}개/);
  });

  it('uses fewer competing labels on archive cards', () => {
    const combined = [read('components/post-card.tsx'), read('app/writing/page.tsx'), read('app/page.tsx')].join('\n');

    expect(combined).not.toMatch(/문제가 된 장면|바뀐 점|다음 장면/);
    expect(combined).not.toMatch(/남긴 판단|먼저 읽기|찾아볼 주제/);
    expect(combined).toMatch(/볼 지점/);
  });

  it('keeps project cards from over-explaining the same click path', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toMatch(/지금 바로 볼 장면|다음에 이어 볼 기록|왜 이렇게 만들었는지|기록 기반 카드|이어 읽기|관련 기록/);
    expect(projectCard).toContain('볼 수 있는 것');
  });

  it('keeps Wanderer title spacing readable in public routes', () => {
    const combined = [read('app/writing/page.tsx'), read('content/writing/2026-04-20-wanderer-초기-설계-회고.mdx')].join('\n');

    expect(combined).not.toContain('왜Wanderer는');
    expect(combined).toContain('왜 Wanderer는');
  });
});
