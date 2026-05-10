# ggumul-blog

꼬물의 브랜드 사이트이자 블로그 MVP 레포.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- file-based content (`content/projects`, `content/writing`)

## Run
```bash
npm install
npm run dev
```

## Test
```bash
npm test
```

## 글 투고 원칙

공개 글은 `content/writing/*.mdx`를 먼저 쓰지 않는다. 먼저 Notion에 `[초고/<프로젝트>] ...` 초고를 투고하고, MDX frontmatter의 `notionSource`에 실제 Notion page ID/URL/title/status를 남긴 뒤 production 콘텐츠로 옮긴다.

자세한 절차: [`docs/publishing/notion-first.md`](docs/publishing/notion-first.md)

공개 문장은 실제 화면으로 확인한 범위만 말한다. 근거별 허용 문장과 금지 문구는 [`docs/publishing/evidence-first-copy.md`](docs/publishing/evidence-first-copy.md)에 정리한다.

## Build
```bash
npm run build
```

## Deploy
초기에는 커스텀 도메인 없이 Vercel 기본 주소(`*.vercel.app`)로 시작하는 걸 전제로 한다.
