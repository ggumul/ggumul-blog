import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');
const readFrontmatter = (path: string) => read(path).split('---')[1] ?? '';
const readWritingMdx = () =>
  readdirSync('content/writing')
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => read(`content/writing/${name}`))
    .join('\n');

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
    expect(linksPage).not.toContain('github.com/ggumul');
    expect(linksPage).toContain('github.com/ggomul');
    expect(linksPage).toContain('게임 아이디어와 제작 노트');
    expect(linksPage).not.toMatch(/메모 모음|type: 'memo'|게임, 메모|코드 저장소, 메모/);
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

  it('removes template labels from archive and project cards', () => {
    const combined = [
      read('components/post-card.tsx'),
      read('components/project-card.tsx'),
      read('app/writing/page.tsx'),
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
    ].join('\n');

    expect(combined).not.toMatch(/문제가 된 장면|바뀐 점|다음 장면/);
    expect(combined).not.toMatch(/남긴 판단|먼저 읽기|찾아볼 주제|처음 볼 기록|처음 오셨다면/);
    expect(combined).not.toMatch(/볼 지점|볼 수 있는 것|관련 기록|이어 읽기|기록 기반 카드/);
  });

  it('keeps project cards from using repeated explainer labels', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toMatch(/지금 바로 볼 장면|다음에 이어 볼 기록|왜 이렇게 만들었는지|기록 기반 카드|이어 읽기|관련 기록|볼 수 있는 것|볼 지점/);
  });

  it('keeps the projects page focused on Wanderer instead of dashboard metrics', () => {
    const projectsPage = read('app/projects/page.tsx');

    expect(projectsPage).toContain("project.slug === 'wanderer'");
    expect(projectsPage).not.toMatch(/MetricCard|공개 항목|recordTotal|worklines\.slice\(1, 4\)|총 게임|화면·글·상태|현황판/);
    expect(projectsPage).not.toMatch(/장면을 나누고, 글과 화면을 붙입니다|가장 최근에 확인한 화면과 기록을 먼저 보여줍니다/);
    expect(projectsPage).not.toMatch(/object-contain object-center/);
    expect(projectsPage).not.toContain('/media/runtime-checks/wanderer-mobile-current.png');
    expect(projectsPage).not.toMatch(/30초 카드 골라보기|직접 골라보기|조건을 읽고|홀수만 살아남음/);
    expect(projectsPage).not.toMatch(/Wanderer부터 바로 봅니다|먼저 볼 건|줄였습니다|한장을|짧게 보고 고릅니다|새로 좋아진 점|살아남고|13보다 높아/);
    expect(projectsPage).toContain('카드 한 장 고르기');
    expect(projectsPage).toContain('홀수 카드만 유효');
  });

  it('keeps home focused on one playable turn instead of a generic landing page', () => {
    const homePage = read('app/page.tsx');
    const homeVisibleSources = [
      homePage,
      read('components/site-shell.tsx'),
      read('components/post-card.tsx'),
      read('lib/writing-reading-path.ts'),
      readFrontmatter('content/projects/wanderer.mdx'),
      readFrontmatter('content/writing/2026-04-26-runtime-화면-확인-기록.mdx'),
      readFrontmatter('content/writing/2026-04-21-wanderer-sync-연결-문제-분석.mdx'),
      readFrontmatter('content/writing/2026-04-27-ggumul-dinner-grocery-가격-계약-정리.mdx'),
    ].join('\n');

    expect(homePage).not.toMatch(/latestGamePath|다음에 볼 막힌 장면|남긴 판단|읽을 이유/);
    expect(homePage).not.toContain('object-contain object-center');
    expect(homePage).not.toContain('<video');
    expect(homePage).not.toContain('wanderer-mobile-demo.mp4');
    expect(homePage).not.toMatch(/heroLoop|조건을 읽고,?<br \/>한 장으로 턴을 가져갑니다|Wanderer 한 턴 샘플|홀수만 살아남음|직접 골라보기|Wanderer를 먼저 봅니다|Wanderer 말고도 바로 해볼 일이 있어요|버튼 뒤 장면이 늦었던 날/);
    expect(homePage).not.toMatch(/Wanderer 플레이 예시|지금 이길 카드는 어느 쪽일까요|모바일에서 결과가 늦게 보였던 문제|끊긴 이유|서버는 이미 끊겼다|턴 조건을 보고/);
    expect(homeVisibleSources).not.toMatch(/모바일에서도 결과가 자연스럽게|결과가 바로 이어지지 않던 흐름|흐름을 다시 맞췄습니다|버튼 뒤 흐름 끊김|진행 상태 개선|짧게 볼 수 있는 다른 게임들|유효합니다/);
    expect(homeVisibleSources).not.toMatch(/category: "연결 문제"|- "runtime"|- "flutter"|안정적으로 이어지게|자연스럽게 이어지게|멈칫했는지 줄이고|카드를 한 장을/);
    expect(homeVisibleSources).not.toMatch(/다듬고 있습니다|만들고 있습니다|정리했습니다|다듬었습니다|볼 수 있어야 했습니다|고쳤|Mobile flow|Wanderer turn/);
    expect(homeVisibleSources).not.toMatch(/상대 카드 13|이번 턴은 홀수 카드만 유효\. 상대의 13보다 높은|13보다 높고 홀수인 카드|선택한 문장이 이어지는 흐름과 결말로 돌아옵니다|색 조건 하나가 익숙한 퍼즐을 다른 문제로 바꿉니다/);
    expect(homeVisibleSources).not.toMatch(/바로 한 턴 해보기|한 턴 가능|플레이 흐름 읽기|카드 선택 뒤 결과|다른 작은 게임들|장보기 보기|한 턴 체험하기|서사 보기|퍼즐 보기|상대보다 높은 카드|글 목록|글 읽기 →|게임이 늘어나자|게임 둘러보기 →/);

    expect(homeVisibleSources).toContain('한 장의 카드로 승부가 납니다');
    expect(homeVisibleSources).toContain('고른 순간, 승부가 갈립니다');
    expect(homePage).toContain('카드 한 장,');
    expect(homePage).toContain('<span className="whitespace-nowrap">한 판이 갈립니다.</span>');
    expect(homePage).toContain('카드 한 장 고르기');
    expect(homePage).toContain('홀수 카드만 유효');
  });

  it('keeps writing index from becoming a tag wall or repeated explainer grid', () => {
    const writingPage = read('app/writing/page.tsx');

    expect(writingPage).not.toMatch(/displayTopicTags|topicTags|recordLabel|읽을 이유|aside-rail|처음 오셨다면|처음 볼 기록|project\.progressStatus/);
    expect(writingPage).toContain('Wanderer');
  });

  it('keeps the Wanderer detail page focused on play before follow/devlog blocks', () => {
    const projectDetailPage = read('app/projects/[slug]/page.tsx');

    expect(projectDetailPage).toContain('<WandererMiniPlay />');
    expect(projectDetailPage).not.toMatch(/firstVisitSteps|CommunityCTA|영상 → 기록 → 다음 소식|처음 오셨다면/);
    expect(projectDetailPage).not.toMatch(/지금 확인|지금 보는 이유|다음에 고칠 것|기록 보기|플레이 방식|현재 들어간 것|Wanderer 노트|폰에서 돌린 날/);
    expect(projectDetailPage).not.toMatch(/30초 카드 골라보기|직접 골라보기|조건을 읽고|홀수만 살아남음/);
    expect(projectDetailPage).toContain('카드 한 장 고르기');
    expect(projectDetailPage).toContain('홀수 카드만 유효');
    expect(projectDetailPage).toContain('한 장 고르고, 바로 결과를 읽습니다.');
  });

  it('removes campaign-style follow/share blocks from primary pages', () => {
    const combined = [read('app/page.tsx'), read('app/links/page.tsx'), read('components/site-shell.tsx')].join('\n');

    expect(combined).not.toMatch(/같이 보기|RSS로 새 기록 받기|짧게 감상 남기기|X에 짧게 남기기|공유 문구|>RSS</);
  });

  it('keeps shared navigation labels consistent with the public game framing', () => {
    const shell = read('components/site-shell.tsx');

    expect(shell).toContain('<Link href="/projects" className="transition hover:text-text">게임</Link>');
    expect(shell).toContain('<Link href="/writing" className="transition hover:text-text">게임 기록</Link>');
    expect(shell).not.toContain('<Link href="/projects" className="transition hover:text-text">프로젝트</Link>');
    expect(shell).not.toContain('<Link href="/writing" className="transition hover:text-text">새 소식</Link>');
  });

  it('keeps the mobile header from duplicating the primary play CTA', () => {
    const shell = read('components/site-shell.tsx');

    expect(shell).toContain('md:inline-flex');
    expect(shell).not.toMatch(/className="inline-flex[^\n]+카드 한 장 고르기/);
  });

  it('keeps mobile-facing copy and thumbnails from reading like dashboards or placeholders', () => {
    const combined = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('app/projects/[slug]/page.tsx'),
      read('components/project-card.tsx'),
      read('components/post-card.tsx'),
      read('components/wanderer-mini-play.tsx'),
      read('lib/writing-reading-path.ts'),
    ].join('\n');

    expect(combined).not.toMatch(/한장|한판|한장을/);
    expect(combined).not.toMatch(/Wanderer부터 고릅니다|결과가 여기에 뜹니다|상대 카드 13|짝수\/정답\/짝수|볼 수 있는 장면/);
    expect(combined).toContain('프로젝트-폴백-장면');
    expect(combined).toContain('게임 기록 목록');
  });

  it('keeps the public flow game-first instead of project-status first', () => {
    const combined = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('app/projects/[slug]/page.tsx'),
      read('components/project-card.tsx'),
      read('components/post-card.tsx'),
      read('components/site-shell.tsx'),
      readFrontmatter('content/writing/2026-04-20-4월-프로젝트-개발-현황.mdx'),
      readFrontmatter('content/writing/2026-04-26-runtime-화면-확인-기록.mdx'),
    ].join('\n');

    expect(combined).toContain('꼬물은 짧게 만질 수 있는 작은 게임을 만듭니다.');
    expect(combined).toContain('카드 한 장 고르기');
    expect(combined).toContain('게임 기록');
    expect(combined).toContain('첫 선택이 게임의 흐름을 바꿉니다');
    expect(combined).not.toMatch(/게임과 도구|다른 게임과 도구|다른 작은 게임들?|새 소식|최근 소식|한 턴 고르기|짧게 살펴봅니다|게임 흐름 보기|이야기 더 보기|이야기 읽기|Wanderer와 퍼즐을 한 화면에서 고르게 나눴다|고르게 나눴다|현재 상태를 한 번에 정리|무엇을 확인하는 단계인지|다음에 어떤 작업이 필요한지|버튼 뒤 장면이 늦었습니다|폰에서 눌렀을 때 결과가 늦게 읽힌 순간|iOS Simulator에서 실행했습니다|로컬 서버|Flutter 통합 테스트|Gradle 테스트|운영 서버|장시간 동시 접속|보여야 합니다|돌아와야 합니다|흐려졌습니다|흐려지는|깊은 기술|다음에 볼 게임들|다음에 해볼 게임들|Wanderer부터 시작합니다/);
    expect(combined).not.toMatch(/Wanderer와 퍼즐을 한 화면에서 고르게 나눴다|고르게 나눴다|현재 상태를 한 번에 정리|무엇을 확인하는 단계인지|다음에 어떤 작업이 필요한지/);
    expect(combined).not.toMatch(/버튼 뒤 장면이 늦었습니다|폰에서 눌렀을 때 결과가 늦게 읽힌 순간|iOS Simulator에서 실행했습니다|로컬 서버|Flutter 통합 테스트|Gradle 테스트|운영 서버|장시간 동시 접속/);
  });

  it('removes pre-reading instruction boxes and engagement prompts from writing detail pages', () => {
    const writingDetailPage = read('app/writing/[slug]/page.tsx');

    expect(writingDetailPage).not.toMatch(/읽기 전에|작업과 연결된 기록|확인한 화면\/문제\/판단|PostEngagement|공유하기|댓글 남기기/);
  });

  it('does not render broken article hero images when a project has no screenshot', () => {
    const writingDetailPage = read('app/writing/[slug]/page.tsx');

    expect(writingDetailPage).toContain('heroImage ? (');
    expect(writingDetailPage).toContain('장보기 전 가격 흐름');
    expect(writingDetailPage).toContain('{heroImage ? (\n              <img');
    expect(writingDetailPage).not.toMatch(/<figure[^>]*>\s*<img[\s\S]*src=\{heroImage\}/);
  });

  it('keeps public copy from repeating generic view CTAs and dev-record framing', () => {
    const combined = [
      read('app/page.tsx'),
      read('app/projects/page.tsx'),
      read('app/writing/page.tsx'),
      read('components/project-card.tsx'),
      read('components/post-card.tsx'),
      read('components/site-shell.tsx'),
      read('app/about/page.tsx'),
      read('app/links/page.tsx'),
      read('lib/writing-reading-path.ts'),
      read('content/writing/2026-04-20-wanderer-초기-설계-회고.mdx'),
      readWritingMdx(),
    ].join('\n');

    expect(combined).not.toMatch(/대표 게임 보기|게임 더 보기|전체 보기|글 더 보기|최근 글 보기|끊긴 지점 보기|어긋난 이유 보기|퍼즐 흐름 보기|장보기 흐름 보기|개발 기록 보기/);
    expect(combined).not.toMatch(/게임의 화면, 변경 이유, 남은 문제|결과보다 과정|기록 가능한 개발|작은 단위의 완성|개발기록/);
    expect(combined).not.toMatch(/실제 화면 기록|화면에서 막힌 지점|화면 노트|시스템 노트|프로젝트 소개|최근 글|최근 바뀐 장면|Wanderer 노트/);
    expect(combined).not.toMatch(/게임 노트|장보기 기록|스튜디오 노트|#게임 개발|개발 중/);
    expect(combined).not.toMatch(/플레이 메모|Studio rhythm|4 Games Map|프로젝트 상태|작업 기준/);
    expect(combined).not.toMatch(/화면 있음|가격 연결 중|다른 항목|폰에서 본 장면|바로 고르기|첫 장면|새 장면|퍼즐 흐름|장보기 흐름|변형 규칙|빈 부분 다시 열기|가격 기준 다시 열기|끊긴 장면\s*→|프로젝트 지도|볼 항목|event 이름|payload 기준|작업 철학|진행 현황/);
    expect(combined).not.toMatch(/작업 문서|작업 정리|작업 관련 문의/);
    expect(combined).not.toMatch(/이번 기록|초기 설계 회고|확인한 사실|다음 작업|점검표|프로젝트 문서|프로젝트 회고|같은 작업에서 나온 글/);
    expect(combined).not.toMatch(/작업 철학|진행 현황/);
    expect(combined).not.toMatch(/모바일 화면|최근 장면 보기|한 턴 다듬은 글|대표 화면|작업을 찾을 수 없음|요청한 작업을 찾을 수 없습니다/);
    expect(combined).not.toMatch(/30초 카드 골라보기|직접 골라보기|조건을 읽고|홀수만 살아남음/);
  });

  it('keeps project cards from repeating two descriptions for the same project', () => {
    const projectCard = read('components/project-card.tsx');

    expect(projectCard).not.toMatch(/projectLines|projectAvailability|StatusFacts/);
    expect(projectCard).not.toMatch(/>새 소식<|식단을 정하면 장보기 목록과 가격 판단으로 이어집니다|홀수만 살아남는 턴에서 15를 내면 상대의 13을 넘깁니다|막대를 옮기면 다음 상태가 바로 보입니다/);
    expect(projectCard).toContain('function WandererCardPreview');
    expect(projectCard).toContain("project.slug === 'wanderer'");
    expect(projectCard).toContain('wanderer-card-preview');
  });
});
