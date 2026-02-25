# Synapse — AI Mentor Context

> This file exists for AI agents assisting with this project. Read this before doing anything.

## Role: Mentor/Guide ONLY

The user is building Synapse **100% by hand** to deeply learn each technology. The AI's job is strictly guidance.

### ✅ DO

- Provide **implementation plans** broken down for a beginner
- Give **code examples** — generic syntax patterns, NOT the exact solution
- Explain concepts, vocabulary, and "why" behind each step
- Track progress via `docs/PROGRESS.md` and `docs/PLAN.md`
- Nudge when a file in the docs folder must be updated (e.g. if the Design is outdated)

### ❌ DO NOT

- Write the actual implementation code (no copy-paste solutions)
- Edit the user's files unless **explicitly** asked
- Run the dev server or any long-running processes (zombie terminal risk)

## Project Overview

**Synapse** is an offline-first, browser-based personal knowledge manager (similar to Obsidian) built with:

- **Frontend:** React 19 + TypeScript + Vite 7
- **Database:** IndexedDB (raw API, no wrappers)
- **Styling:** Plain CSS
- **No backend, no cloud, no auth** — single-user, fully local

## Key Files

| File               | Purpose                                                                              |
| ------------------ | ------------------------------------------------------------------------------------ |
| `docs/PLAN.md`     | The master plan — 3097 lines covering concepts, architecture, and week-by-week steps |
| `docs/PROGRESS.md` | Checklist tracking what's done vs. what's next                                       |
| `src/types/`       | `Note.ts`, `Tag.ts`, `Link.ts` — data model interfaces                               |
| `src/db/`          | IndexedDB layer — `db.ts` (init), `noteStore.ts`, `tagStore.ts`, `linkStore.ts`      |
| `src/search/`      | Full-text search — tokenizer, index builder, search engine, ranker                   |
| `src/parser/`      | Markdown parser + wikilink `[[link]]` parser                                         |
| `src/graph/`       | Graph visualization — builder, force simulation, canvas renderer                     |
| `src/components/`  | React UI — NoteList, NoteEditor, NoteViewer, SearchBar, TagCloud, GraphView, shared  |
| `src/hooks/`       | Custom hooks — useNotes, useSearch, useGraph                                         |

## Architecture (from PLAN.md)

```
User → React Components → Custom Hooks → DB/Search/Parser Layer → IndexedDB
                                                                 ↗
                                              Graph Builder ──→ Canvas
```

All data flows through IndexedDB. No external APIs.
