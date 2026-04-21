# GGUMUL Structure Reset Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** 꼬물 사이트를 소개형/카드형 블로그에서 벗어나, 흔적·발자국·진행 중 상태가 먼저 보이는 작업실 아카이브 구조로 전면 재설계한다.

**Architecture:** 기존 SEO, RSS, taxonomy, slug 안정성은 유지한다. 대신 화면 구조를 랜딩 페이지 문법에서 아카이브 문법으로 옮기고, 홈/기록/프로젝트를 각각 독립 페이지가 아니라 하나의 작업 흐름을 다른 각도에서 보여주는 구조로 다시 묶는다. 설명 문장을 줄이고, 실제 기록·연결·시간축이 레이아웃의 주인공이 되게 한다.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, existing content helpers/tests (Vitest)

---

## 0. 이번 플랜에서 반드시 반영할 사용자 기준

이 플랜은 아래 기준을 절대 훼손하지 않는다.

1. 꼬물은 **느린 팀**이 아니라 **오래 쌓는 팀**이다.
2. 꼬물은 **완성본보다 흔적과 발자국**을 먼저 보여줘야 한다.
3. 꼬물은 프로젝트를 자랑하지 않고, **지금 무엇을 붙들고 있는지**를 보여줘야 한다.
4. 글은 칼럼/발표문보다 **작업 노트**에 가까워야 한다.
5. 레퍼런스는 문법만 참고한다. **꼬물의 결을 해치면 버린다.**
6. 지금 문제는 폴리싱 부족이 아니라 **구조가 틀린 것**이다.
7. 카드 난립, 브랜드 설명문, SaaS 같은 안전한 랜딩 감성은 제거 대상이다.

---

## 1. 현재 구조 진단

### 실제 확인한 문제
- `app/page.tsx`
  - 여전히 hero + latest + archive + work 섹션 나열 구조다.
  - 설명문이 길고, 첫 화면에서 실제 기록보다 브랜드 문장이 더 먼저 읽힌다.
- `app/writing/page.tsx`
  - taxonomy 칩 나열과 카드 그리드가 강해서 CMS 목록처럼 보인다.
  - 기록의 축적감보다 분류 UI가 먼저 보인다.
- `app/projects/page.tsx`
  - “작업 중인 프로젝트” 소개문 + 반복 리스트 구조다.
  - 프로젝트와 기록 간 관계가 구조적으로 드러나지 않는다.
- `components/post-card.tsx`
  - 표지형 시도는 있었지만 여전히 “예쁜 콘텐츠 카드”에 가깝다.
  - 기록물의 밀도보다 비주얼 박스 감각이 강하다.
- `components/project-card.tsx`
  - 단순 번호/제목/상태 구조라서 작업선, 진행 맥락, 연결 기록이 안 보인다.
- `components/site-shell.tsx`
  - 헤더/푸터가 브랜드 문장 요약 수준에 머문다.
  - 사이트 전체를 관통하는 작업실 네비게이션 언어가 부족하다.

### 이번 리셋의 핵심
- 섹션을 예쁘게 다듬는 게 아니라, **무엇이 먼저 읽히는지**를 바꾼다.
- 소개보다 흔적, 요약보다 연결, 카드보다 흐름이 먼저 오게 한다.

---

## 2. 목표 구조

### 홈 `/`
첫 화면은 “우리가 누구인가”보다 “최근 무엇을 남겼는가”가 먼저 보여야 한다.

핵심 순서:
1. 최근 발자국 1개
2. 지금 붙들고 있는 작업선 2~4개
3. 이어진 기록 흐름
4. 짧은 작업실 소개 또는 꼬리말

없애거나 축소할 것:
- 긴 hero 카피
- 요약 수치 블록
- 설명 위주 aside
- 박스형 구획 남발

### 기록 `/writing`
기록 페이지는 “카드 모음”이 아니라 “시간이 쌓인 아카이브 선반”처럼 보여야 한다.

핵심 순서:
1. 가장 최근 기록 1개를 대표 표지처럼 강조
2. 그 아래는 시간축/시리즈축 기반의 리스트 흐름
3. taxonomy는 상단 장식이 아니라 작은 보조 인덱스로 축소

없애거나 축소할 것:
- 태그/카테고리/시리즈 칩 대량 노출
- 3열 CMS 카드 그리드
- 과한 둥근 박스형 표지 반복

### 프로젝트 `/projects`
프로젝트 페이지는 쇼케이스가 아니라 작업선(workline)이어야 한다.

핵심 순서:
1. 지금 살아 있는 작업 순서
2. 각 작업이 붙들고 있는 감각/질문
3. 연결된 기록 수 또는 대표 기록 링크
4. 상태가 아니라 진행의 결을 보여주는 짧은 메모

없애거나 축소할 것:
- 프로젝트 자랑형 요약문
- 결과물 중심 카드
- 상태 배지 중심 문법

---

## 3. 구현 원칙

### 시각 원칙
- 큰 rounded box를 메인 문법으로 쓰지 않는다.
- 구분은 박스보다 선, 간격, 타이포 위계로 만든다.
- 색은 따뜻하되 귀엽거나 감성 과잉으로 흐르지 않는다.
- “예쁜 브랜드 블로그”보다 “정리된 작업실 벽면”처럼 느껴져야 한다.

### 정보 원칙
- 숫자는 자랑용 KPI처럼 보이면 안 된다.
- 태그는 장식이 아니라 보조 인덱스여야 한다.
- 프로젝트와 글은 서로 떨어진 두 콘텐츠 타입이 아니라 연결된 흔적이다.

### 문장 원칙
- 철학 설명문 길게 쓰지 않는다.
- 한 문단이 길어질수록 실제 기록/링크/UI로 대체한다.
- “우리는 이런 팀입니다”보다 “최근 무엇을 남겼다”가 우선이다.

---

## 4. 작업 단위 계획

### Task 1: 구조 리셋 검증용 테스트 추가

**Objective:** 현재 구조를 깨고도 유지해야 하는 핵심 규칙을 테스트로 고정한다.

**Files:**
- Modify: `tests/site.test.ts`
- Modify: `tests/content.test.ts`
- Create if needed: `tests/archive-layout.test.ts`

**Step 1: Write failing tests**
- 홈 페이지용 helper/구조 테스트를 추가해 아래를 고정한다.
  - 홈은 summary count 강조 문구를 필수로 요구하지 않음
  - 기록/프로젝트 연결용 helper가 존재해야 함
- 글 목록 helper 테스트를 추가해 아래를 고정한다.
  - 글은 최신순 외에 시리즈/프로젝트 연결 정보를 노출 가능해야 함
- 프로젝트 helper 테스트를 추가해 아래를 고정한다.
  - 각 프로젝트는 연결된 기록 집합을 계산할 수 있어야 함

**Step 2: Run tests to verify failure**

Run: `npm test -- --runInBand`
Expected: FAIL — 새 helper 또는 새 shape 부재

**Step 3: Implement minimal helper shape**
- `lib/content.ts` 또는 새 helper 파일에서 아래 shape를 제공한다.
  - `getWritingArchiveSections()`
  - `getProjectRecordMap()`
  - `getHomeArchiveSnapshot()`

**Step 4: Run tests to verify pass**

Run: `npm test -- --runInBand`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/site.test.ts tests/content.test.ts lib/content.ts
git commit -m "test: lock archive structure helpers"
```

---

### Task 2: 홈을 소개 페이지에서 작업실 첫 장면으로 전환

**Objective:** 홈 첫 화면에서 브랜드 설명을 뒤로 밀고, 최근 흔적과 진행 중 작업이 먼저 읽히게 만든다.

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify if needed: `lib/content.ts`

**Step 1: Write failing test**
- 홈 snapshot/structure 테스트 또는 helper 테스트로 아래를 고정한다.
  - 최상단 블록은 latest trace 중심이어야 함
  - summary count 또는 long intro는 메인 의존이 아니어야 함
  - project snapshot과 recent posts가 같은 흐름 안에서 보이도록 데이터 shape 제공

**Step 2: Run test to verify failure**

Run: `npm test -- --runInBand`
Expected: FAIL

**Step 3: Write minimal implementation**
- `app/page.tsx`를 아래 순서로 재배치한다.
  1. 최근 발자국 대표 1개
  2. 지금 붙들고 있는 작업선 요약
  3. 이어지는 기록 목록
  4. 아주 짧은 작업실 메모
- 설명 문단은 1~2문단 이하로 줄인다.
- aside 성 요약 박스 제거 또는 흐름 안으로 흡수한다.

**Step 4: Run test to verify pass**

Run: `npm test -- --runInBand`
Expected: PASS

**Step 5: Commit**

```bash
git add app/page.tsx app/globals.css lib/content.ts
git commit -m "feat: rebuild home as archive-first workspace"
```

---

### Task 3: 헤더/푸터를 사이트 설명이 아니라 작업실 안내 장치로 변경

**Objective:** 헤더/푸터가 요약 카피가 아니라 작업실 아카이브를 탐색하는 언어와 구조를 갖게 만든다.

**Files:**
- Modify: `components/site-shell.tsx`
- Modify: `app/globals.css`

**Step 1: Write failing test**
- 헤더 문구/네비게이션 구조 테스트 또는 render-level assertion을 추가한다.
- 아래 규칙을 고정한다.
  - 홈/기록/작업이 단순 메뉴가 아니라 아카이브 언어를 사용함
  - 푸터는 브랜드 슬로건 반복보다 실제 이동/아카이브 성격 안내가 우선임

**Step 2: Run test to verify failure**

Run: `npm test -- --runInBand`
Expected: FAIL

**Step 3: Write minimal implementation**
- 헤더에 현재 위치가 아카이브의 어느 층인지 느껴지는 보조 문구 추가
- 푸터는 반복 슬로건 대신 RSS, 기록, 작업, 소개의 맥락적 마무리로 교체
- pill 버튼 문법이 너무 템플릿처럼 보이면 제거하고 텍스트 기반 내비게이션으로 단순화

**Step 4: Run test to verify pass**

Run: `npm test -- --runInBand`
Expected: PASS

**Step 5: Commit**

```bash
git add components/site-shell.tsx app/globals.css tests/site.test.ts
git commit -m "feat: turn shell into workspace navigation"
```

---

### Task 4: 글 목록을 카드 그리드에서 아카이브 선반 구조로 변경

**Objective:** `/writing`을 카드형 블로그에서 시간축과 시리즈 흐름이 보이는 기록 아카이브로 바꾼다.

**Files:**
- Modify: `app/writing/page.tsx`
- Modify: `components/post-card.tsx`
- Modify if needed: `lib/content.ts`
- Modify: `app/globals.css`

**Step 1: Write failing test**
- 글 목록 helper/structure 테스트를 추가해 아래를 고정한다.
  - latest entry는 일반 목록과 다른 레벨로 다뤄짐
  - 나머지 기록은 grid보다 list/stack/timeline 구조를 지원함
  - taxonomy는 보조 인덱스로 축소 가능함

**Step 2: Run test to verify failure**

Run: `npm test -- --runInBand`
Expected: FAIL

**Step 3: Write minimal implementation**
- `app/writing/page.tsx`
  - 상단 hero 축소
  - taxonomy 칩 대량 노출 제거 또는 작은 인덱스 영역으로 축소
  - latest 기록 1개 + 나머지 기록 리스트 흐름으로 재구성
- `components/post-card.tsx`
  - 박스형 표지 대신 표지 + 본문 메모/인덱스가 섞인 가벼운 구조로 변경
  - 요약, 시리즈, 날짜, 연결 프로젝트가 더 명확히 읽히게 수정

**Step 4: Run test to verify pass**

Run: `npm test -- --runInBand`
Expected: PASS

**Step 5: Commit**

```bash
git add app/writing/page.tsx components/post-card.tsx app/globals.css lib/content.ts
git commit -m "feat: redesign writing archive as accumulated trace flow"
```

---

### Task 5: 프로젝트를 쇼케이스가 아니라 작업선 + 연결 기록 구조로 변경

**Objective:** `/projects`에서 각 프로젝트가 결과물이 아니라, 어떤 기록과 함께 움직이는 작업선인지 보이게 만든다.

**Files:**
- Modify: `app/projects/page.tsx`
- Modify: `components/project-card.tsx`
- Modify: `lib/content.ts`
- Modify: `app/projects/[slug]/page.tsx` (if needed)

**Step 1: Write failing test**
- 프로젝트 helper 테스트를 추가해 아래를 고정한다.
  - 프로젝트마다 연결된 기록 목록 또는 대표 기록 slug/title 계산 가능
  - 프로젝트 카드/리스트에서 연결 기록 개수 혹은 연결 라벨이 표시 가능

**Step 2: Run test to verify failure**

Run: `npm test -- --runInBand`
Expected: FAIL

**Step 3: Write minimal implementation**
- `lib/content.ts`
  - frontmatter 기반 또는 slug 규칙 기반으로 프로젝트-기록 연결 map 생성
- `components/project-card.tsx`
  - 번호/상태만 보여주는 구조에서 벗어나
  - 작업 감각 + 연결 기록 + 짧은 진행 메모를 같이 보여주는 구조로 변경
- `app/projects/page.tsx`
  - 소개문 축소
  - workline / traces 구조가 먼저 읽히게 재배치

**Step 4: Run test to verify pass**

Run: `npm test -- --runInBand`
Expected: PASS

**Step 5: Commit**

```bash
git add app/projects/page.tsx components/project-card.tsx lib/content.ts app/projects/[slug]/page.tsx
git commit -m "feat: connect projects with related traces"
```

---

### Task 6: 글 상세와 프로젝트 상세의 연결감 보강

**Objective:** 상세 페이지를 단일 문서 소비 화면이 아니라, 작업 흐름 안의 한 흔적으로 느끼게 만든다.

**Files:**
- Modify: `app/writing/[slug]/page.tsx`
- Modify: `app/projects/[slug]/page.tsx`
- Modify if needed: `lib/content.ts`

**Step 1: Write failing test**
- 상세 helper 테스트로 아래를 고정한다.
  - 글 상세에서 관련 프로젝트 또는 같은 시리즈/연결 흔적 이동 가능
  - 프로젝트 상세에서 관련 기록 모음 이동 가능

**Step 2: Run test to verify failure**

Run: `npm test -- --runInBand`
Expected: FAIL

**Step 3: Write minimal implementation**
- 글 상세 하단에 관련 작업/이어지는 기록 블록 추가
- 프로젝트 상세 하단에 관련 기록 목록 또는 최근 발자국 블록 추가
- 설명보다 이동 가능한 연결 구조를 우선한다.

**Step 4: Run test to verify pass**

Run: `npm test -- --runInBand`
Expected: PASS

**Step 5: Commit**

```bash
git add app/writing/[slug]/page.tsx app/projects/[slug]/page.tsx lib/content.ts
git commit -m "feat: reinforce trace links in detail pages"
```

---

### Task 7: 전체 검증 및 시각 품질 마감

**Objective:** 구조 리셋 이후에도 기능 안정성과 시각적 일관성을 확인한다.

**Files:**
- Review: `app/page.tsx`
- Review: `app/writing/page.tsx`
- Review: `app/projects/page.tsx`
- Review: `components/site-shell.tsx`
- Review: `components/post-card.tsx`
- Review: `components/project-card.tsx`
- Review: `app/globals.css`

**Step 1: Run full tests**

Run: `npm test -- --runInBand`
Expected: PASS

**Step 2: Run production build**

Run: `npm run build`
Expected: PASS

**Step 3: Run local visual check**

Run: `npm run dev -- --port 3001`
Expected: app starts on 3001

Check manually:
- `/`
- `/writing`
- `/projects`
- representative detail pages

**Step 4: Compare against acceptance criteria**
- 첫 화면이 소개 페이지보다 작업실 아카이브처럼 보이는가?
- 글 목록이 CMS 카드보다 시간 축적처럼 읽히는가?
- 프로젝트가 자랑용 요약보다 작업선처럼 보이는가?
- 프로젝트와 기록 연결이 실제로 느껴지는가?
- 꼬물의 말투와 결이 레이아웃에서 느껴지는가?

**Step 5: Commit**

```bash
git add app components lib tests docs/plans
git commit -m "refactor: reset ggumul site structure around traces and worklines"
```

---

## 5. Acceptance Criteria

이 플랜이 끝났을 때 아래가 만족되어야 한다.

1. 홈은 더 이상 소개 랜딩처럼 보이지 않는다.
2. 첫 화면에서 브랜드 설명보다 최근 흔적과 작업 흐름이 먼저 보인다.
3. 글 목록은 CMS 카드 모음이 아니라 기록 선반/아카이브 흐름처럼 읽힌다.
4. 프로젝트 목록은 쇼케이스가 아니라 작업선처럼 읽힌다.
5. 프로젝트와 기록 사이의 관계가 문장이 아니라 구조로 보인다.
6. 꼬물의 감각(오래 쌓임, 발자국, 진행 중, 작업 노트)이 텍스트뿐 아니라 레이아웃에 반영된다.
7. 기존 SEO/RSS/slug/taxonomy 안정성은 깨지지 않는다.

---

## 6. 이번 구현에서 하지 않을 것

- 새 CMS 도입
- 복잡한 필터/검색 UI 추가
- 화려한 애니메이션 중심 접근
- 브랜딩 장식용 일러스트 대량 추가
- 의미 없는 숫자/성과 요약 블록 재도입

---

## 7. 바로 다음 실행 순서

1. `lib/content.ts`에서 프로젝트-기록 연결 shape 설계
2. 홈 데이터 shape와 레이아웃부터 리셋
3. 글 목록을 카드 그리드에서 아카이브 흐름으로 전환
4. 프로젝트 목록을 workline 구조로 전환
5. 상세 페이지 하단 연결 구조 보강
6. 테스트/빌드/브라우저 검증
