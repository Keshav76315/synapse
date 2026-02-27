# Synapse — Progress Tracker

> **Last Updated:** 25-02-2026

## Week 1: Foundation & Database

### Day 1: Project Setup ✅

- [x] Created Vite + React + TypeScript project
- [x] Set up project folder structure (types, db, components, hooks, utils, search, parser, graph)
- [x] Created type interfaces (`Note.ts`, `Tag.ts`, `Link.ts`)
- [x] Configured TypeScript
- [x] Initialized Git, `.gitignore`
- [x] Created placeholder files for all modules
- [x] Set up `App.tsx`, `main.tsx`, `styles.css` (minimal)

### Day 2–3: IndexedDB Setup ✅

- [x] Implement `DBConnect()` in `src/db/db.ts`
- [x] Create `notes` object store with indexes (`title`, `createdAt`, `tags`)
- [x] Create `links` object store with indexes (`sourceNoteId`, `targetNoteId`)
- [x] Create `searchIndex` object store (keyPath: `term`)
- [x] Verify in DevTools → Application → IndexedDB

### Day 4–5: Note CRUD Operations ✅

- [x] Implement `createNote()` in `src/db/noteStore.ts`
- [x] Implement `getNote()` and `getAllNotes()`
- [x] Implement `updateNote()`
- [x] Implement `deleteNote()`
- [x] Test CRUD via console/DevTools

### Day 6–7: Basic UI ✅

- [x] Build `NoteList` component
- [x] Build `NoteEditor` component
- [x] Wire components to CRUD operations
- [x] Basic layout in `App.tsx`

## Week 2: Search, Parser, Tags

- [ ] Tokenizer (`src/search/tokenizer.ts`)
- [ ] Inverted index builder (`src/search/indexBuilder.ts`)
- [ ] Search engine (`src/search/searchEngine.ts`)
- [ ] Markdown parser (`src/parser/markdownParser.ts`)
- [ ] Wikilink parser (`src/parser/wikilinkParser.ts`)
- [ ] Tag operations (`src/db/tagStore.ts`)
- [ ] SearchBar, TagCloud components

## Week 3: Backlinks, Graph, Polish

- [ ] Link store operations (`src/db/linkStore.ts`)
- [ ] Backlink display in NoteViewer
- [ ] Graph builder (`src/graph/graphBuilder.ts`)
- [ ] Force simulation (`src/graph/forceSimulation.ts`)
- [ ] Canvas renderer (`src/graph/renderer.ts`)
- [ ] GraphView component

## Week 4: PWA, Export/Import, Enhancements

- [ ] Service Worker for offline caching
- [ ] PWA manifest
- [ ] Export to JSON/Markdown
- [ ] Import from files
- [ ] Dark mode
- [ ] Keyboard shortcuts
