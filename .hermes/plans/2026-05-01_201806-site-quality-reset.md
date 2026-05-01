# ggumul Blog Site Quality Reset Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** ggumul-blog를 땜질식 카드/라벨 정리에서 벗어나, 첫 방문자가 “무엇을 볼 수 있고 왜 눌러야 하는지” 바로 이해하는 게임/devlog 사이트로 재구성한다.

**Architecture:** 새 기능 추가보다 정보 구조와 시각 밀도를 줄이는 리셋이다. Home, Projects, Writing, Wanderer detail을 같은 기준으로 재정렬하고, shared card components는 더 적은 데이터만 노출하도록 만든다. 검증은 TDD + production visible text scan + browser_vision 기준으로 진행한다.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, local MDX content, Vitest, Vercel production deploy.

---

## Current Context

**Workspace:** `/Users/paul/projects/ggumul/ggumul-blog`

**Production:** `https://ggumul-blog.vercel.app`

**Current branch:** `develop`

**Recent state:**
- `/projects`는 Wanderer 중심으로 바꿨지만 아직 “카드형 사이트” 느낌이 남아 있다.
- `ProjectCard`, `PostCard`는 많이 줄였지만 여전히 라벨/태그/CTA 반복이 생길 수 있다.
- `/writing`은 devlog 구조는 잡혔지만 카드가 길고 반복 패턴이 강하다.
- Home은 Wanderer hook이 있으나 `/projects`와 역할이 겹치고, 사이트 전체의 우선순위가 더 명확해야 한다.
- 모바일 실기/에뮬레이터 검증은 아직 부족하다.

## Non-negotiable Quality Standard

1. **첫 화면은 하나만 말한다.**
   - Home: 대표 게임/핵심 체험.
   - Projects: 실제 볼 수 있는 게임/도구 선택.
   - Writing: 왜 읽어야 하는 기록인지.

2. **방문자-facing 화면에 내부 라벨 금지.**
   - 금지/주의: `런타임`, `검증`, `순서`, `reading time`, `snapshot`, `E2E`, `계약` 남발, `관련 기록` 반복, `이어 읽기` 반복.

3. **카드 안에 같은 정보를 두 번 넣지 않는다.**
   - 종류/상태/볼 수 있는 것/CTA 중 필요한 것만 남긴다.

4. **Wanderer는 완성 웹 데모가 아니다.**
   - `30초 카드 골라보기`는 사이트 내부 샘플 체험.
   - TestFlight/itch/download/직접 플레이 가능처럼 말하지 않는다.

5. **production 직접 확인 전 완료 금지.**
   - `npm test && npm run build && git diff --check`
   - Vercel production deploy
   - live text scan
   - browser_vision check

---

## Phase 1 — Define Quality Regression Tests

### Task 1: Expand public UI copy regression tests

**Objective:** 이전처럼 라벨/박스/통계가 다시 늘어나는 것을 테스트로 막는다.

**Files:**
- Modify: `tests/public-ui-copy.test.ts`

**Step 1: Add failing assertions**

Add/extend tests for these source files:
- `app/page.tsx`
- `app/projects/page.tsx`
- `app/writing/page.tsx`
- `components/project-card.tsx`
- `components/post-card.tsx`

Required assertions:
```ts
const publicPages = [
  read('app/page.tsx'),
  read('app/projects/page.tsx'),
  read('app/writing/page.tsx'),
  read('components/project-card.tsx'),
  read('components/post-card.tsx'),
].join('\n');

expect(publicPages).not.toMatch(/런타임 화면 기록|관련 기록|이어 읽기|남긴 판단|찾아볼 주제|공개 항목/);
expect(publicPages).not.toMatch(/TestFlight|itch|다운로드|직접 플레이|지금 바로 참여|놓치지 마세요/);
```

Add positive assertions:
```ts
expect(read('app/page.tsx')).toContain('30초 카드 골라보기');
expect(read('app/projects/page.tsx')).toContain('Wanderer부터 바로 봅니다');
expect(read('app/writing/page.tsx')).toContain('처음 볼 기록');
expect(read('components/project-card.tsx')).toContain('볼 수 있는 것');
expect(read('components/post-card.tsx')).toContain('볼 지점');
```

**Step 2: Run test to verify failure if stale terms exist**

Run:
```bash
npm run test -- tests/public-ui-copy.test.ts
```

Expected:
- PASS if current code is already clean.
- FAIL if any stale label remains; fix in following tasks.

---

## Phase 2 — Home Page Quality Reset

### Task 2: Make Home a single Wanderer-led entry, not a content dashboard

**Objective:** Home first viewport should answer: “What is this? What do I click first?”

**Files:**
- Modify: `app/page.tsx`

**Change direction:**
- Keep one strong Wanderer hero.
- Remove extra record boxes under latest game post if they repeat `PostCard` content.
- Keep only:
  1. Wanderer hero with video/cover
  2. `30초 카드 골라보기` primary CTA
  3. `실제 화면 기록 보기` secondary CTA
  4. 2~3 other projects compact
  5. 2 latest records max
  6. CommunityCTA compact at bottom only

**Concrete edits:**
- Replace `latestGamePath` 1-box block if it repeats `PostCard` CTA.
- Reduce `moreGamePosts` from 2 to 1 if the section feels long.
- If Home and `/projects` duplicate too much, Home should show fewer project cards than `/projects`.

**Verification:**
```bash
npm run test -- tests/public-ui-copy.test.ts
npm test
npm run build
```

---

## Phase 3 — Projects Page Quality Reset

### Task 3: Keep `/projects` as a selection page, not a report page

**Objective:** `/projects` should show Wanderer first, then compact alternatives. No stats/dashboard feel.

**Files:**
- Modify: `app/projects/page.tsx`
- Modify: `components/project-card.tsx`

**Current intended structure:**
1. Hero: `Wanderer부터 바로 봅니다.`
2. Big Wanderer media frame
3. One full Wanderer card
4. Compact grid for other projects
5. Recent records max 3

**Further cleanup if still visually heavy:**
- In full `ProjectCard`, remove top duplicate meta line if it repeats image overlay.
- Keep status badge only on image overlay or text area, not both.
- In compact cards, keep:
  - project kind
  - title
  - one-sentence hook
  - CTA
  - optional small status only if short
- Do not show evidence label in compact card body.

**Specific `components/project-card.tsx` target:**
- Full card text area should contain no more than:
```txt
kind/status
Title
hook sentence
볼 수 있는 것 line
primary CTA + recent record CTA
```
- Compact card should contain no more than:
```txt
kind
Title
hook sentence
CTA
```

**Verification:**
Run source scan:
```bash
node - <<'NODE'
const fs=require('fs');
const files=['app/projects/page.tsx','components/project-card.tsx'];
const text=files.map(f=>fs.readFileSync(f,'utf8')).join('\n');
for (const term of ['MetricCard','공개 항목','이어 읽기','관련 기록','런타임 화면 기록']) {
  if (text.includes(term)) throw new Error(`stale term: ${term}`);
}
console.log('projects source clean');
NODE
```

---

## Phase 4 — Writing Page Quality Reset

### Task 4: Make `/writing` a readable devlog index, not a tag/card wall

**Objective:** `/writing` should make a first-time visitor want to click one record.

**Files:**
- Modify: `app/writing/page.tsx`
- Modify: `components/post-card.tsx`

**Changes:**
- Keep latest featured post.
- Keep game lanes, but reduce each lane to:
  - game title
  - one short angle sentence
  - one linked record
  - one CTA
- Move or remove side topic tag rail if it reads like CMS/SEO clutter.
- In `PostCard`, reduce tags for non-featured cards to 0~1 row max.
- Avoid duplicated CTA text (`볼 지점` paragraph + same text button) if it appears in same card.

**Regression test additions:**
```ts
expect(read('app/writing/page.tsx')).not.toMatch(/남긴 판단|찾아볼 주제|주제 태그|NEXT READ|more updates/i);
expect(read('components/post-card.tsx')).not.toMatch(/남긴 판단/);
```

**Verification:**
- Browser check `/writing` with vision question:
  - “첫 방문자가 어떤 글부터 눌러야 하는지 보이는가?”
  - “태그/라벨이 CMS처럼 보이지 않는가?”

---

## Phase 5 — Wanderer Detail Page Quality Reset

### Task 5: Make Wanderer detail a game page first, devlog second

**Objective:** `/projects/wanderer` should answer: “What do I do in this game?” before showing process notes.

**Files:**
- Modify: `app/projects/[slug]/page.tsx`
- Modify: `components/wanderer-mini-play.tsx`
- Possibly modify: `lib/wanderer-mini-play.ts`

**Target order:**
1. Player-facing hook
2. Actual media/video
3. 30-second mini play
4. Short “how it plays” explanation
5. Actual screen/devlog records
6. Longer project prose

**Copy rule:**
- Prefer: `규칙을 보고 카드 한 장을 냅니다.`
- Avoid: `현재 상태`, `검증`, `운영 기준`, `sync`, `payload` above the fold.

**Interaction verification:**
- Load `/projects/wanderer#mini-play`
- Click card 15
- Confirm text:
```txt
카드 15는 살아남았고, 상대의 13보다 높아 이번 턴을 가져갑니다.
```
- Click reset
- Confirm empty state returns.

---

## Phase 6 — Mobile / Responsive Pass

### Task 6: Reduce mobile density defaults

**Objective:** Desktop is not enough. Mobile must not feel like stacked cards forever.

**Files likely to change:**
- `app/globals.css`
- `components/site-shell.tsx`
- `components/project-card.tsx`
- `components/post-card.tsx`
- `app/page.tsx`
- `app/projects/page.tsx`
- `app/writing/page.tsx`

**Mobile rules:**
- Hero H1 base size max around `text-[34px]` unless tested.
- Large cards use `p-4`, not `p-7`, on mobile.
- Compact project cards should be single column but short.
- Header nav must not wrap awkwardly; if crowded, use horizontal scroll or remove secondary CTA.
- Tags should wrap but not dominate first viewport.

**Verification options:**
Preferred:
```bash
npx playwright screenshot --device="iPhone 13" https://ggumul-blog.vercel.app/projects /tmp/projects-mobile.png
npx playwright screenshot --device="iPhone 13" https://ggumul-blog.vercel.app/writing /tmp/writing-mobile.png
```

If Playwright unavailable:
- Use browser_vision with explicit limitation: desktop/live QA only.
- Harden mobile CSS based on risk areas anyway.

---

## Phase 7 — Full Verification / Deployment

### Task 7: Run full local verification

Run:
```bash
npm test
npm run build
git diff --check
```

Expected:
```txt
all tests pass
Next.js build succeeds
git diff --check no output/errors
```

### Task 8: Commit in meaningful chunks

Suggested commits:
```bash
git add tests/public-ui-copy.test.ts app/page.tsx
git commit -m "fix: simplify home first click flow"

git add app/projects/page.tsx components/project-card.tsx
git commit -m "fix: make projects page selection-focused"

git add app/writing/page.tsx components/post-card.tsx
git commit -m "fix: reduce writing index label noise"

git add app/projects/[slug]/page.tsx components/wanderer-mini-play.tsx lib/wanderer-mini-play.ts tests/wanderer-mini-play.test.ts
git commit -m "fix: make Wanderer detail play-first"
```

### Task 9: Deploy production

Run:
```bash
git push origin develop
npx --yes vercel@latest deploy --prod --yes
```

Expected:
- Vercel build succeeds.
- `Aliased: https://ggumul-blog.vercel.app`

### Task 10: Live visible-text scan

Run after deploy:
```python
import urllib.request, re, html
base='https://ggumul-blog.vercel.app'
routes=['/','/projects','/writing','/links','/about','/projects/wanderer','/projects/hanoi']
forbidden=[
  '공개 항목','이어 읽기','관련 기록','런타임 화면 기록','남긴 판단',
  '찾아볼 주제','순서 00','3분','왜Wanderer는','TestFlight','itch','다운로드','직접 플레이'
]
for route in routes:
    raw=urllib.request.urlopen(base+route, timeout=20).read().decode('utf-8','replace')
    text=html.unescape(re.sub(r'<[^>]+>',' ', re.sub(r'<(script|style)[\\s\\S]*?</\\1>',' ', raw)))
    text=' '.join(text.split())
    hits=[x for x in forbidden if x in text]
    print(route, hits)
    assert not hits
```

### Task 11: Live browser/vision checks

Check routes:
- `/`
- `/projects`
- `/writing`
- `/projects/wanderer#mini-play`
- `/links`

Ask browser_vision:
- Home: “첫 화면에서 뭘 눌러야 하는지 명확한가?”
- Projects: “Wanderer 중심성과 카드 밀도가 괜찮은가?”
- Writing: “첫 글을 읽을 이유가 보이고 CMS/태그월처럼 보이지 않는가?”
- Wanderer: “카드 선택 인터랙션이 게임처럼 읽히는가?”

---

## Risks / Tradeoffs

1. **너무 줄이면 정보가 비어 보일 수 있음**
   - 해결: 첫 문장과 CTA는 강하게 유지하고, 보조 정보만 줄인다.

2. **게임 사이트처럼 만들려다 실제 playable demo처럼 오해될 수 있음**
   - 해결: `30초 카드 골라보기`는 샘플 체험임을 유지한다. 다운로드/직접 플레이 표현 금지.

3. **모바일에서 카드가 길어질 수 있음**
   - 해결: compact cards의 모바일 본문 줄 수를 제한하고, 태그를 줄인다.

4. **기존 content graph가 얕아서 UI만으로 한계가 있음**
   - 해결: 장기적으로는 각 프로젝트별 dedicated devlog/스크린샷을 늘려야 한다.

---

## Done Criteria

- [ ] `npm test` pass
- [ ] `npm run build` pass
- [ ] `git diff --check` pass
- [ ] production deploy done
- [ ] live stale-term scan failures 0
- [ ] `/projects` first screen leads with Wanderer, no stats/thumbnail clutter
- [ ] `/writing` no `남긴 판단`, `찾아볼 주제`, CMS tag-wall feel reduced
- [ ] `/projects/wanderer#mini-play` card click works live
- [ ] browser_vision confirms no critical density/overlap/line-break issue on desktop
- [ ] mobile limitation explicitly checked or reported
