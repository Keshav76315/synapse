# 📓 **Offline-First Knowledge Manager - Complete From-Scratch Guide**

## **Project Overview**

**Project Name:** Synapse
**Your Role:** Solo developer (100% handcoded, zero AI assistance)  
**Timeline:** 3-4 weeks (1-2 hours/day)  
**Goal:** Build a personal knowledge management system with notes, tags, backlinks, search, and graph visualization—all stored locally in the browser.

**Why This Project?**

- **Immediately useful** (use it for studying, tracking Archivio progress, LeetCode notes)
- **Deep technical learning** (IndexedDB, full-text search algorithms, graph algorithms, offline-first architecture)
- **Perfect interview story** ("I built my own knowledge manager from scratch without AI—here's how the search algorithm works...")
- **Contrast to Archivio** (This = pure engineering, Archivio = AI-powered)

---

## 📋 **Table of Contents**

1. [Core Concepts Explained](#core-concepts)
2. [Features & Scope](#features-scope)
3. [Tech Stack Rationale](#tech-stack)
4. [Project Structure](#project-structure)
5. [Data Model Design](#data-model)
6. [Implementation Phases](#implementation-phases)
7. [Algorithm Explanations](#algorithms)
8. [UI/UX Design Guide](#ui-ux)
9. [Testing Strategy](#testing)
10. [Success Criteria](#success-criteria)

---

## <a name="core-concepts"></a>1. 🧠 **Core Concepts Explained**

Before coding, you need to deeply understand these fundamental concepts:

### **A. What is a Knowledge Manager?**

A knowledge manager helps you:

- **Capture** thoughts/notes quickly
- **Connect** related ideas through links
- **Retrieve** information through search
- **Visualize** relationships between notes

**Real-world examples:** Obsidian, Roam Research, Notion

**Your version differences:**

- ✅ Completely offline (no server, no account)
- ✅ Browser-based (no desktop app needed)
- ✅ Hand-built search (understand every line)
- ✅ Simple & fast (no bloat)

---

### **B. IndexedDB Fundamentals**

**What is IndexedDB?**

- Browser's built-in NoSQL database
- Stores large amounts of structured data locally
- Persists even after browser closes
- Asynchronous API (uses Promises)

**Why not localStorage?**

- localStorage: Only 5-10MB, synchronous (blocks UI), stores strings only
- IndexedDB: 50MB+ (can request more), async, stores objects/arrays/blobs

**Core IndexedDB concepts you'll use:**

**1. Database**

- Container for all your data
- Name: `"Synapse"` (you'll create this)
- Version: `1` (increments when schema changes)

**2. Object Store** (like a table in SQL)

- Stores specific type of data
- Example: `notes` store, `tags` store
- Has a **key path** (unique identifier for each item)

**3. Index** (makes querying faster)

- Allows searching by specific fields
- Example: index on `title` field to search notes by title
- Auto-updated when data changes

**4. Transaction** (ensures data consistency)

- Groups operations together
- Either all succeed or all fail (atomic)
- Types: `readonly` (safe for reading), `readwrite` (for modifications)

**How you'll use it:**

```
Your App
    ↓
Open Database "Synapse"
    ↓
Create Object Stores: "notes", "tags", "links"
    ↓
Create Indexes: "title", "createdAt", "tags"
    ↓
Perform CRUD operations via Transactions
    ↓
Query using Indexes for fast search
```

---

### **C. Full-Text Search Concepts**

**What is Full-Text Search?**

- Find notes containing specific words/phrases
- Not just exact matches (partial, ranked results)
- Example: Search "javascript" finds notes with "JS", "JavaScript", "ECMAScript"

**How traditional search engines work:**

**Step 1: Tokenization**

- Break text into individual words (tokens)
- Input: `"Hello World!"`
- Output: `["hello", "world"]` (lowercased, punctuation removed)

**Step 2: Normalization**

- Remove common words (stopwords): "the", "a", "is"
- Optional: Stemming (reduce to root form)
  - "running" → "run"
  - "easily" → "easy"

**Step 3: Build Inverted Index**

- Map: `word → list of note IDs containing that word`
- Example:

```
{
  "javascript": [note1, note3, note7],
  "react": [note1, note2],
  "algorithm": [note5, note7]
}
```

**Step 4: Ranking**

- When user searches "javascript react", find notes with both words
- Rank by relevance (which note mentions terms most?)
- Simple ranking: **TF-IDF** (Term Frequency - Inverse Document Frequency)

**TF-IDF Explained (you'll implement simplified version):**

**TF (Term Frequency):** How often term appears in a document

- Formula: `count of term in document / total words in document`
- Higher = more relevant to this document

**IDF (Inverse Document Frequency):** How rare is term across all documents

- Formula: `log(total documents / documents containing term)`
- Rare words are more valuable (e.g., "IndexedDB" vs "the")

**Combined Score:** `TF × IDF`

- Balances frequency with rarity
- You'll use simplified version: just count occurrences

---

### **D. Graph Theory for Backlinks**

**What are Backlinks?**

- Links from one note to another
- Example: Note A mentions [[Note B]] → Note B shows "referenced by Note A"

**Why Graph Theory?**

- Notes = **Nodes** (vertices)
- Links = **Edges** (connections)
- Visualization = **Graph Drawing**

**Graph concepts you'll use:**

**1. Directed Graph**

- Links have direction (A → B doesn't mean B → A)
- Your links are directional: Note A links TO Note B

**2. Adjacency List** (how you'll store graph)

```javascript
{
  noteA_id: [noteB_id, noteC_id],  // A links to B and C
  noteB_id: [noteC_id],             // B links to C
  noteC_id: []                      // C links to nothing
}
```

**3. Graph Traversal** (finding connected notes)

- **BFS (Breadth-First Search):** Find all notes 1 hop away, then 2 hops, etc.
- **DFS (Depth-First Search):** Follow one path deeply before backtracking
- You'll use simple iteration (no complex traversal needed initially)

**4. Graph Visualization**

- Position nodes (notes) on canvas
- Draw edges (links) between them
- Force-directed layout (nodes repel, links attract—looks organic)

---

### **E. Offline-First Architecture**

**What is Offline-First?**

- App works **without internet connection**
- Data stored locally, not on server
- Updates happen locally first, sync later (optional for your MVP)

**Key technologies:**

**1. Service Workers** (advanced—Week 4)

- JavaScript runs in background
- Intercepts network requests
- Caches app files for offline use
- Example: User visits once → app works forever offline

**2. Progressive Web App (PWA)**

- Web app that behaves like native app
- Can be "installed" to home screen
- Works offline
- Requires: Service Worker + Manifest file

**Why offline-first for you?**

- ✅ Privacy (notes never leave your device)
- ✅ Speed (no network latency)
- ✅ Reliability (works on airplane, poor wifi)
- ✅ Simplicity (no backend to build/maintain)

---

### **F. Markdown Basics**

**What is Markdown?**

- Lightweight markup language
- Plain text → formatted output
- Example: `**bold**` renders as **bold**

**Why Markdown for notes?**

- ✅ Human-readable (even in raw form)
- ✅ Fast to write (no clicking formatting buttons)
- ✅ Universal (works everywhere)
- ✅ Easy to parse (you'll write parser yourself)

**Syntax you'll support (initially):**

````markdown
# Heading 1

## Heading 2

### Heading 3

**bold text**
_italic text_

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Another item

[Link text](https://example.com)
[[Internal link to another note]]

`inline code`

`code block`
````

**How you'll render it:**

- Simple regex-based parser (convert Markdown → HTML)
- Or use tiny library like `marked` (only for rendering, you build everything else)

---

### **G. Wikilink Syntax**

**What are Wikilinks?**

- Special syntax for internal links
- Format: `[[Note Title]]`
- Clicking opens that note

**How it works:**

**1. Parsing (when saving note):**

```javascript
// Input text
"Check out [[Project Ideas]] and [[Learning Resources]]"

// Your parser extracts
["Project Ideas", "Learning Resources"]

// Store as links
{
  sourceNoteId: "note123",
  targetNoteTitles: ["Project Ideas", "Learning Resources"]
}
```

**2. Resolving (when displaying):**

```javascript
// Find note IDs for those titles
"Project Ideas" → note456
"Learning Resources" → note789

// Render as clickable links
<a href="#/note/note456">Project Ideas</a>
<a href="#/note/note789">Learning Resources</a>
```

**3. Backlinks (reverse lookup):**

```javascript
// When viewing "Project Ideas" (note456)
// Show: "Referenced by: note123"
```

---

## <a name="features-scope"></a>2. 🎯 **Features & Scope**

### **MVP Features (Must Have - Week 1-3)**

| Feature           | Description                             | Why Essential          |
| ----------------- | --------------------------------------- | ---------------------- |
| **Create Note**   | New note with title + Markdown body     | Core functionality     |
| **Edit Note**     | Modify existing notes                   | Core functionality     |
| **Delete Note**   | Remove notes (with confirmation)        | Core functionality     |
| **List Notes**    | Browse all notes (sorted by date)       | Discoverability        |
| **Search Notes**  | Full-text search by content             | Retrieval              |
| **Tags**          | Add `#tags` to notes                    | Organization           |
| **Wikilinks**     | `[[Link]]` to other notes               | Connections            |
| **Backlinks**     | Show which notes reference current note | Bi-directional linking |
| **Local Storage** | IndexedDB persistence                   | Offline-first          |

### **Enhanced Features (Should Have - Week 4)**

| Feature                | Description                        | Priority              |
| ---------------------- | ---------------------------------- | --------------------- |
| **Graph View**         | Visual map of note connections     | P1 (Impressive)       |
| **Export Notes**       | Download as JSON/Markdown          | P1 (Data portability) |
| **Import Notes**       | Upload JSON/Markdown files         | P2                    |
| **Dark Mode**          | Toggle light/dark theme            | P2 (Nice UX)          |
| **Keyboard Shortcuts** | `Ctrl+N` new note, `Ctrl+K` search | P2 (Power users)      |

### **Nice-to-Have (Post-MVP)**

- Daily notes (auto-create note for today)
- Templates (starter content for new notes)
- Version history (track note changes)
- Sync between devices (advanced—requires backend)
- Folders/Hierarchies (complex—tags are simpler)

### **Explicitly Out of Scope**

❌ Real-time collaboration (no multiplayer)  
❌ Cloud sync (local-only for MVP)  
❌ Rich text editor (Markdown only)  
❌ File attachments (text only)  
❌ Authentication (single-user app)  
❌ Mobile app (PWA is mobile-friendly web app)

---

## <a name="tech-stack"></a>3. 💻 **Tech Stack Rationale**

### **Frontend Framework: React + TypeScript**

**Why React?**

- ✅ You already know it (from Archivio)
- ✅ Component-based (notes, search, graph are separate components)
- ✅ Virtual DOM (efficient re-renders when notes update)
- ✅ Large ecosystem (but you won't use much)

**Why TypeScript?**

- ✅ Catch bugs at compile time (e.g., passing wrong data shape to component)
- ✅ Better autocomplete (know what properties notes have)
- ✅ Self-documenting (types explain data structures)
- ✅ Industry standard (looks great on portfolio)

**No frameworks/libraries for:**

- ❌ State management (use React's `useState`, `useContext`)
- ❌ Routing (use basic hash routing or no routing)
- ❌ UI components (build your own buttons, inputs, cards)

---

### **Build Tool: Vite**

**Why Vite?**

- ✅ Fast dev server (instant hot reload)
- ✅ TypeScript support out-of-box
- ✅ Simple config (minimal setup)
- ✅ You're using it for Archivio (consistency)

**What Vite does:**

- Bundles your TypeScript → JavaScript
- Handles imports/modules
- Optimizes for production (minification, code splitting)

---

### **Database: IndexedDB (Native Browser API)**

**Why IndexedDB?**

- ✅ No external dependencies (built into browser)
- ✅ Large storage (50MB+, request up to 1GB)
- ✅ Structured data (store complex objects)
- ✅ Indexes (fast queries)

**Why NOT alternatives?**

- ❌ localStorage: Too small (5-10MB), synchronous (blocks UI)
- ❌ External DB (PouchDB, Dexie): Adds abstraction—you want raw understanding

**Your learning goal:** Master IndexedDB API directly (no wrappers)

---

### **Styling: Plain CSS (or TailwindCSS if you prefer)**

**Option A: Plain CSS (Recommended for learning)**

- ✅ Full control over every pixel
- ✅ Understand cascade, specificity, layout
- ✅ No build step complexity

**Option B: TailwindCSS (If you want speed)**

- ✅ Utility classes (quick styling)
- ✅ Consistent design system
- ✅ You know it from Archivio

**Decision:** Start with plain CSS. Switch to Tailwind if styling takes >20% of time.

---

### **Markdown Rendering: DIY or Minimal Library**

**Option A: Build your own parser (Best for learning)**

- Regex-based replacement
- Example: `**text**` → `<strong>text</strong>`
- Limited features but you understand 100%

**Option B: Use `marked.js` (Pragmatic)**

- Tiny library (5KB)
- Full Markdown spec
- You focus on other features

**Decision:** Start DIY, switch to `marked` if parser takes >1 week.

---

### **Graph Visualization: Canvas API + D3.js Concepts**

**Why Canvas API?**

- ✅ Native browser API (no dependencies)
- ✅ High performance (renders thousands of nodes)
- ✅ Full control (custom animations, interactions)

**D3.js concepts you'll use (without the library):**

- Force simulation (physics-based layout)
- Node positioning algorithms
- Edge drawing

**Learning approach:** Understand D3 force-directed layout algorithm, implement simplified version yourself.

---

## <a name="project-structure"></a>4. 📁 **Project Structure**

```
Synapse/
├── public/
│   ├── index.html              # Entry HTML
│   └── manifest.json           # PWA manifest (Week 4)
│
├── src/
│   ├── types/
│   │   ├── Note.ts             # Note interface/type definitions
│   │   ├── Tag.ts              # Tag type
│   │   └── Link.ts             # Link type
│   │
│   ├── db/
│   │   ├── db.ts               # IndexedDB setup & initialization
│   │   ├── noteStore.ts        # Note CRUD operations
│   │   ├── tagStore.ts         # Tag operations
│   │   └── linkStore.ts        # Link/backlink operations
│   │
│   ├── search/
│   │   ├── tokenizer.ts        # Text → tokens
│   │   ├── indexBuilder.ts     # Build inverted index
│   │   ├── searchEngine.ts     # Query handler
│   │   └── ranker.ts           # Score/rank results
│   │
│   ├── parser/
│   │   ├── markdownParser.ts   # Markdown → HTML
│   │   └── wikilinkParser.ts   # Extract [[links]]
│   │
│   ├── graph/
│   │   ├── graphBuilder.ts     # Build graph from links
│   │   ├── forceSimulation.ts  # Node positioning algorithm
│   │   └── renderer.ts         # Canvas drawing
│   │
│   ├── components/
│   │   ├── NoteList/
│   │   │   ├── NoteList.tsx
│   │   │   └── NoteList.css
│   │   │
│   │   ├── NoteEditor/
│   │   │   ├── NoteEditor.tsx
│   │   │   └── NoteEditor.css
│   │   │
│   │   ├── NoteViewer/
│   │   │   ├── NoteViewer.tsx
│   │   │   └── NoteViewer.css
│   │   │
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchBar.css
│   │   │
│   │   ├── TagCloud/
│   │   │   ├── TagCloud.tsx
│   │   │   └── TagCloud.css
│   │   │
│   │   ├── GraphView/
│   │   │   ├── GraphView.tsx
│   │   │   └── GraphView.css
│   │   │
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   │
│   ├── hooks/
│   │   ├── useNotes.ts         # Custom hook for note operations
│   │   ├── useSearch.ts        # Custom hook for search
│   │   └── useGraph.ts         # Custom hook for graph data
│   │
│   ├── utils/
│   │   ├── date.ts             # Date formatting helpers
│   │   ├── export.ts           # Export to JSON/MD
│   │   └── import.ts           # Import from files
│   │
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # React entry point
│   └── styles.css              # Global styles
│
├── docs/
│   ├── DESIGN.md               # Design decisions log
│   ├── INDEXEDDB.md            # IndexedDB learning notes
│   └── ALGORITHMS.md           # Search/graph algorithms explained
│
├── tests/
│   ├── db.test.ts              # IndexedDB tests
│   ├── search.test.ts          # Search algorithm tests
│   └── parser.test.ts          # Parser tests
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

---

## <a name="data-model"></a>5. 🗄️ **Data Model Design**

### **Note Schema**

```typescript
// src/types/Note.ts

interface Note {
  id: string; // Unique identifier (UUID or timestamp-based)
  title: string; // Note title (required)
  content: string; // Markdown content
  tags: string[]; // Array of tag names (e.g., ["javascript", "react"])
  createdAt: number; // Unix timestamp (milliseconds since epoch)
  updatedAt: number; // Unix timestamp (last modification)
  linkedNotes: string[]; // Array of note IDs this note links to
}
```

**Field explanations:**

**`id`**: Unique identifier

- Generated when note created
- Options:
  - UUID v4 (random): `crypto.randomUUID()`
  - Timestamp + random: `${Date.now()}-${Math.random()}`
- Never changes after creation
- Used as IndexedDB key

**`title`**: Human-readable name

- Indexed for fast search
- Used in wikilink resolution (`[[Title]]` → find note by title)
- Max length: 200 chars (reasonable limit)

**`content`**: Markdown text

- Full-text searchable
- Contains wikilinks: `[[Other Note]]`
- Contains tags: `#javascript #react`
- Can be large (IndexedDB handles it)

**`tags`**: Array of strings

- Extracted from content (any word starting with `#`)
- Stored separately for fast filtering
- Example: `["javascript", "react", "hooks"]`
- Normalized (lowercase, no `#` symbol)

**`createdAt`**: Creation timestamp

- Unix milliseconds: `Date.now()`
- Used for sorting (newest first)
- Never changes

**`updatedAt`**: Last modification timestamp

- Updated on every edit
- Shows "last edited X minutes ago"

**`linkedNotes`**: Outgoing links

- Array of note IDs this note references
- Extracted from wikilinks in content
- Updated when note saved
- Used to build graph

---

### **Tag Schema** (Optional—can compute from notes)

```typescript
// src/types/Tag.ts

interface Tag {
  name: string; // Tag name (without #)
  noteIds: string[]; // Notes containing this tag
  count: number; // Number of notes (for tag cloud size)
}
```

**Why separate tag storage?**

- Fast tag filtering (find all notes with `#javascript`)
- Tag cloud visualization (show popular tags)

**Alternative:** Compute tags on-the-fly from notes (slower but simpler)

---

### **Link Schema**

```typescript
// src/types/Link.ts

interface Link {
  id: string; // Unique link ID
  sourceNoteId: string; // Note containing the link
  targetNoteId: string; // Note being linked to
  createdAt: number; // When link created
}
```

**Why separate link storage?**

- Fast backlink queries (find all notes linking TO note X)
- Graph construction (nodes = notes, edges = links)

**Data flow:**

1. User saves note with `[[Other Note]]`
2. Parser extracts "Other Note"
3. Find note with title "Other Note" → get ID
4. Create link record: `{sourceNoteId: currentNote.id, targetNoteId: otherNote.id}`
5. Store in `links` object store

---

### **IndexedDB Structure**

**Database name:** `"Synapse"`  
**Version:** `1`

**Object Stores:**

**1. `notes` store**

- **Key path:** `id` (note.id is the primary key)
- **Indexes:**
  - `title` (for search by title)
  - `createdAt` (for sorting)
  - `tags` (multiEntry: true—allows querying by individual tag)

**2. `links` store**

- **Key path:** `id`
- **Indexes:**
  - `sourceNoteId` (find all links FROM a note)
  - `targetNoteId` (find all backlinks TO a note)

**3. `searchIndex` store** (your custom inverted index)

- **Key path:** `term` (the search term/word)
- **Value:** `{ term: string, noteIds: string[] }`
- Example:

```javascript
{
  term: "javascript",
  noteIds: ["note1", "note3", "note7"]
}
```

---

### **Search Index Structure**

**Inverted Index (stored in IndexedDB `searchIndex` store):**

```typescript
// Conceptual structure
{
  "javascript": ["note1", "note3", "note7"],
  "react": ["note1", "note2", "note4"],
  "hooks": ["note4", "note7"],
  "indexeddb": ["note2", "note5"]
}
```

**How it's built:**

1. **When note saved:**
   - Tokenize content: `"Learning JavaScript and React"` → `["learning", "javascript", "react"]`
   - For each token:
     - Check if term exists in searchIndex
     - If yes: add note ID to existing array (if not already there)
     - If no: create new entry with `[noteId]`

2. **When note deleted:**
   - Remove note ID from all term entries
   - Delete term entry if no notes left

3. **When searching:**
   - Tokenize query: `"JavaScript React"` → `["javascript", "react"]`
   - For each token:
     - Look up in searchIndex → get noteIds
   - Combine results (intersection for AND, union for OR)
   - Rank by relevance

---

## <a name="implementation-phases"></a>6. 🚀 **Implementation Phases (3-4 Weeks)**

---

### **Week 1: Foundation & Database**

**Goal:** Set up project, IndexedDB, basic CRUD operations

---

#### **Day 1: Project Setup (2 hours)**

**Tasks:**

1. **Create Vite + React + TypeScript project**
   - Command: `npm create vite@latest Synapse -- --template react-ts`
   - Install dependencies: `npm install`
   - Run dev server: `npm run dev`
   - Verify: See default Vite React app in browser

2. **Set up project structure**
   - Create folders: `types/`, `db/`, `components/`, `utils/`, `docs/`
   - Delete default Vite boilerplate (keep `main.tsx`, `App.tsx`)

3. **Configure TypeScript**
   - Edit `tsconfig.json`: Enable strict mode

   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```

4. **Initialize Git**
   - `git init`
   - Create `.gitignore`:
   ```
   node_modules/
   dist/
   .DS_Store
   *.log
   ```

   - First commit: `git add . && git commit -m "Initial setup"`

**Deliverable:** Clean project ready for development

---

#### **Day 2-3: IndexedDB Setup (4 hours)**

**Goal:** Create database, object stores, and basic connection

**What you're learning:**

- How IndexedDB API works
- Database initialization
- Version management
- Transaction patterns

**Step-by-step process:**

**Step 1: Understand the IndexedDB API flow**

IndexedDB operations follow this pattern:

```
1. Open database connection
2. Create object stores (in onupgradeneeded)
3. Open transaction
4. Get object store
5. Perform operation (add/get/put/delete)
6. Wait for success/error
7. Close transaction (auto)
```

**Step 2: Create database initialization function**

File: `src/db/db.ts`

**What this file does:**

- Opens connection to IndexedDB
- Creates object stores if they don't exist
- Sets up indexes
- Returns database instance

**Key concepts to implement:**

**Opening database:**

```typescript
const request = indexedDB.open(dbName, version);
```

- `dbName`: `"Synapse"`
- `version`: `1` (increment when schema changes)
- Returns `IDBOpenDBRequest` (asynchronous operation)

**Three event handlers:**

1. **`onupgradeneeded`**: Fires when:
   - Database doesn't exist (first time)
   - Version number increased
   - **This is where you create object stores and indexes**

2. **`onsuccess`**: Database opened successfully
   - Access via `request.result` (IDBDatabase instance)

3. **`onerror`**: Failed to open (quota exceeded, permission denied, etc.)

**Creating object stores:**

```typescript
// Inside onupgradeneeded
const notesStore = db.createObjectStore("notes", { keyPath: "id" });
```

- `'notes'`: Store name
- `{ keyPath: 'id' }`: Use `note.id` as primary key

**Creating indexes:**

```typescript
notesStore.createIndex("title", "title", { unique: false });
notesStore.createIndex("createdAt", "createdAt", { unique: false });
notesStore.createIndex("tags", "tags", { unique: false, multiEntry: true });
```

**Index options:**

- `unique: false`: Multiple notes can have same value
- `multiEntry: true`: For arrays—each array element creates separate index entry
  - Example: Note with `tags: ["js", "react"]` indexed under both "js" and "react"

**What you'll implement:**

```typescript
// Pseudocode structure (you write the actual code)

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("Synapse", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create notes store
      if (!db.objectStoreNames.contains("notes")) {
        const notesStore = db.createObjectStore("notes", { keyPath: "id" });
        // Add indexes...
      }

      // Create links store
      if (!db.objectStoreNames.contains("links")) {
        const linksStore = db.createObjectStore("links", { keyPath: "id" });
        // Add indexes...
      }

      // Create search index store
      if (!db.objectStoreNames.contains("searchIndex")) {
        db.createObjectStore("searchIndex", { keyPath: "term" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
```

**Testing your implementation:**

- Open browser DevTools → Application tab → IndexedDB
- Should see `Synapse` database
- Should see `notes`, `links`, `searchIndex` stores
- Click `notes` → see indexes: `title`, `createdAt`, `tags`

---

#### **Day 4-5: Note CRUD Operations (4 hours)**

**Goal:** Implement Create, Read, Update, Delete for notes

File: `src/db/noteStore.ts`

**What you're learning:**

- IndexedDB transactions
- Async/await patterns
- Error handling

**Transaction types:**

- `readonly`: Safe for reading (multiple can run simultaneously)
- `readwrite`: For modifications (exclusive lock)

**CRUD function signatures:**

```typescript
export async function createNote(
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note>;

export async function getNote(id: string): Promise<Note | undefined>;

export async function getAllNotes(): Promise<Note[]>;

export async function updateNote(
  id: string,
  updates: Partial<Note>,
): Promise<Note>;

export async function deleteNote(id: string): Promise<void>;
```

**Implementation concepts for each:**

**1. CREATE (add new note)**

Process:

1. Generate unique ID: `crypto.randomUUID()`
2. Add timestamps: `createdAt` and `updatedAt` (both `Date.now()`)
3. Create complete note object
4. Open `readwrite` transaction
5. Get `notes` object store
6. Call `add()` method (fails if ID exists)
7. Return created note

Error handling:

- Transaction abort → throw error
- ID collision (unlikely with UUID) → generate new ID

**2. READ (get note by ID)**

Process:

1. Open `readonly` transaction
2. Get `notes` object store
3. Call `get(id)` method
4. Return result (or undefined if not found)

**3. READ ALL (get all notes)**

Process:

1. Open `readonly` transaction
2. Get `notes` object store
3. Call `getAll()` method
4. Optionally sort by `createdAt` descending (newest first)
5. Return array

Alternative (using cursor for large datasets):

- Use `openCursor()` to iterate one-by-one
- More memory-efficient for thousands of notes

**4. UPDATE (modify existing note)**

Process:

1. Get existing note (validate it exists)
2. Merge updates: `{ ...existingNote, ...updates }`
3. Update `updatedAt` timestamp
4. Open `readwrite` transaction
5. Call `put()` method (overwrites existing)
6. Return updated note

Key difference from `add()`:

- `add()`: Fails if key exists (CREATE only)
- `put()`: Overwrites if exists (CREATE or UPDATE)

**5. DELETE (remove note)**

Process:

1. Open `readwrite` transaction
2. Get `notes` object store
3. Call `delete(id)` method
4. Also delete from search index (Week 2)
5. Also delete associated links (Week 2)

Cascade deletion strategy:

- Delete note → delete all links where this note is source or target
- Update search index (remove note ID from all terms)

**Testing strategy:**

- Create test notes with console.log
- Verify in DevTools IndexedDB viewer
- Try edge cases: empty title, very long content, special characters

---

#### **Day 6-7: Basic UI (Note List & Editor) (4 hours)**

**Goal:** Create simple UI to test CRUD operations

**Components to build:**

**1. NoteList Component**

Purpose: Display all notes

What it shows:

- Note title
- First 100 characters of content (preview)
- Created date
- Tags
- Click → open note

Implementation concepts:

- Use `getAllNotes()` on component mount
- Store in React state: `const [notes, setNotes] = useState<Note[]>([])`
- Map over notes to render list items
- Sort by newest first: `notes.sort((a, b) => b.createdAt - a.createdAt)`

**2. NoteEditor Component**

Purpose: Create/edit notes

What it shows:

- Title input (text field)
- Content textarea (Markdown)
- Save button
- Cancel button

Implementation concepts:

- Controlled components (React state for title/content)
- `onSave`: Call `createNote()` or `updateNote()`
- Optimistic updates: Update UI immediately, handle errors after

**3. Simple Layout**

```
+------------------+------------------+
| Sidebar (30%)    | Main Area (70%)  |
| - Note List      | - Note Editor    |
| - Search (later) | - Note Viewer    |
+------------------+------------------+
```

**Styling tips:**

- Use CSS Grid or Flexbox for layout
- No fancy design yet (function over form)
- Focus on usability (large click targets, clear labels)

**Testing:**

1. Create note → verify appears in list
2. Edit note → verify updates
3. Delete note → verify removed
4. Refresh page → verify data persists (IndexedDB!)

**Week 1 Deliverable:** Working app that creates, displays, edits, and deletes notes stored in IndexedDB

---

### **Week 2: Search & Tags**

**Goal:** Implement full-text search and tag extraction

---

#### **Day 8-9: Tokenization & Index Building (4 hours)**

**Goal:** Build search index from note content

**What you're learning:**

- Text processing algorithms
- Inverted index data structures
- String manipulation

**File: `src/search/tokenizer.ts`**

**Tokenization steps:**

**Step 1: Normalize text**

- Convert to lowercase: `text.toLowerCase()`
- Remove punctuation: Replace `[^a-z0-9\s]` with space
- Why: "JavaScript" and "javascript" should be same token

**Step 2: Split into words**

- Split on whitespace: `text.split(/\s+/)`
- Filter empty strings: `tokens.filter(t => t.length > 0)`

**Step 3: Remove stopwords** (optional)

- Common words with little meaning: "the", "a", "is", "and", "or"
- Create stopword list: `const stopwords = new Set(["the", "a", "is", ...])`
- Filter: `tokens.filter(t => !stopwords.has(t))`

**Step 4: Stem words** (optional, advanced)

- Reduce to root form: "running" → "run", "easily" → "easy"
- Simple approach: Remove common suffixes ("ing", "ed", "ly", "s")
- Complex approach: Use Porter Stemmer algorithm (research if interested)

**Your implementation:**

```typescript
export function tokenize(text: string): string[] {
  // 1. Lowercase
  // 2. Remove punctuation (keep alphanumeric + spaces)
  // 3. Split on whitespace
  // 4. Remove stopwords
  // 5. Remove empty/short tokens (length < 2)
  // 6. Return array of tokens
}
```

**Test cases:**

```typescript
tokenize("Hello World!");
// → ["hello", "world"]

tokenize("Learning JavaScript and React is fun!");
// → ["learning", "javascript", "react", "fun"]
// ("and", "is" removed as stopwords)

tokenize("The quick brown fox");
// → ["quick", "brown", "fox"]
// ("the" removed)
```

---

**File: `src/search/indexBuilder.ts`**

**Index building process:**

**Input:** All notes from database  
**Output:** Inverted index (term → noteIds)

**Algorithm:**

```
For each note:
  1. Tokenize title + content
  2. For each unique token:
     a. Check if token exists in index
     b. If yes: add note.id to existing array (avoid duplicates)
     c. If no: create new entry { term: token, noteIds: [note.id] }
  3. Store/update in IndexedDB searchIndex store
```

**Data structure:**

```typescript
// In-memory representation
type InvertedIndex = Map<string, Set<string>>;
// Map: fast lookups
// Set: automatic deduplication

// IndexedDB representation
interface SearchIndexEntry {
  term: string; // The word
  noteIds: string[]; // Notes containing this word
}
```

**Implementation approach:**

**Option A: Rebuild entire index on every change** (simple, works for <1000 notes)

```typescript
export async function rebuildSearchIndex(notes: Note[]): Promise<void> {
  const index = new Map<string, Set<string>>();

  for (const note of notes) {
    const tokens = tokenize(note.title + " " + note.content);

    for (const token of tokens) {
      if (!index.has(token)) {
        index.set(token, new Set());
      }
      index.get(token)!.add(note.id);
    }
  }

  // Clear existing index
  // Write new index to IndexedDB
}
```

**Option B: Incremental updates** (efficient, more complex)

```typescript
export async function addNoteToIndex(note: Note): Promise<void> {
  const tokens = tokenize(note.title + " " + note.content);

  for (const token of tokens) {
    // Get existing entry
    const existing = await getSearchTerm(token);

    if (existing) {
      // Add note ID if not already present
      if (!existing.noteIds.includes(note.id)) {
        existing.noteIds.push(note.id);
        await updateSearchTerm(token, existing);
      }
    } else {
      // Create new entry
      await createSearchTerm({ term: token, noteIds: [note.id] });
    }
  }
}

export async function removeNoteFromIndex(noteId: string): Promise<void> {
  // Get all terms
  // For each term, remove noteId from array
  // Delete term entry if noteIds becomes empty
}
```

**Your choice:** Start with Option A (rebuild on every note save). Optimize to Option B later if needed.

**Testing:**

- Create notes with known content
- Check IndexedDB searchIndex store
- Verify terms extracted correctly
- Verify note IDs associated correctly

---

#### **Day 10-11: Search Engine (4 hours)**

**Goal:** Query the index and return ranked results

**File: `src/search/searchEngine.ts`**

**Search algorithm:**

**Input:** User query string (e.g., "javascript react hooks")  
**Output:** Array of note IDs, sorted by relevance

**Steps:**

**Step 1: Parse query**

```typescript
const queryTokens = tokenize(query);
// "javascript react hooks" → ["javascript", "react", "hooks"]
```

**Step 2: Fetch matching note IDs for each token**

```typescript
const matchSets: Set<string>[] = [];

for (const token of queryTokens) {
  const entry = await getSearchTerm(token);
  if (entry) {
    matchSets.push(new Set(entry.noteIds));
  }
}
```

**Step 3: Combine results (AND vs OR)**

**AND search** (note must contain ALL terms):

```typescript
// Intersection of all sets
const results = matchSets;
for (let i = 1; i < matchSets.length; i++) {
  results = intersection(results, matchSets[i]);
}

function intersection(setA: Set<string>, setB: Set<string>): Set<string> {
  return new Set([...setA].filter((x) => setB.has(x)));
}
```

**OR search** (note contains ANY term):

```typescript
// Union of all sets
const results = new Set<string>();
for (const set of matchSets) {
  for (const id of set) {
    results.add(id);
  }
}
```

**Your implementation:** Start with AND (more precise), add OR later.

**Step 4: Rank results (simple scoring)**

For each matching note:

1. Count how many times query terms appear in note
2. Higher count = higher rank

```typescript
async function scoreNote(
  noteId: string,
  queryTokens: string[],
): Promise<number> {
  const note = await getNote(noteId);
  if (!note) return 0;

  const noteTokens = tokenize(note.title + " " + note.content);
  let score = 0;

  for (const queryToken of queryTokens) {
    // Count occurrences
    score += noteTokens.filter((t) => t === queryToken).length;
  }

  // Bonus: Match in title worth more
  const titleTokens = tokenize(note.title);
  for (const queryToken of queryTokens) {
    if (titleTokens.includes(queryToken)) {
      score += 5; // Boost title matches
    }
  }

  return score;
}
```

**Step 5: Sort and return**

```typescript
const scoredResults = await Promise.all(
  Array.from(results).map(async (noteId) => ({
    noteId,
    score: await scoreNote(noteId, queryTokens),
  })),
);

scoredResults.sort((a, b) => b.score - a.score);
return scoredResults.map((r) => r.noteId);
```

**Full search function signature:**

```typescript
export async function search(query: string): Promise<string[]> {
  // 1. Tokenize query
  // 2. Fetch matching sets
  // 3. Combine (AND/OR)
  // 4. Score results
  // 5. Sort by score descending
  // 6. Return note IDs
}
```

---

#### **Day 12-13: Tag Extraction & UI (4 hours)**

**Goal:** Extract hashtags from notes, display tag cloud

**File: `src/parser/tagParser.ts`**

**Tag extraction algorithm:**

**Pattern:** Any word starting with `#` followed by alphanumeric characters

**Regex:** `/#([a-zA-Z0-9_]+)/g`

**Implementation:**

```typescript
export function extractTags(text: string): string[] {
  const regex = /#([a-zA-Z0-9_]+)/g;
  const matches = text.matchAll(regex);

  const tags = new Set<string>();
  for (const match of matches) {
    tags.add(match.toLowerCase()); // Normalize to lowercase
  }

  return Array.from(tags);
}
```

**Example:**

```typescript
extractTags("Learning #JavaScript and #React #react");
// → ["javascript", "react"]
// (deduped, lowercase)
```

**When to extract tags:**

- When creating note (before saving)
- When updating note (re-extract from updated content)

**Update Note type:**

```typescript
// Already defined in Week 1, just populate tags field
note.tags = extractTags(note.content);
```

---

**Tag Cloud Component**

**Purpose:** Visualize all tags, sized by frequency

**Data structure:**

```typescript
interface TagWithCount {
  name: string;
  count: number; // Number of notes with this tag
}
```

**Algorithm to build tag cloud:**

```typescript
async function buildTagCloud(): Promise<TagWithCount[]> {
  const notes = await getAllNotes();
  const tagCounts = new Map<string, number>();

  for (const note of notes) {
    for (const tag of note.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // Most common first
}
```

**Rendering tag cloud:**

- Font size proportional to count
- Click tag → filter notes by tag

```typescript
// Pseudocode for rendering
{tags.map(tag => (
  <span
    style={{ fontSize: `${10 + tag.count * 2}px` }}
    onClick={() => filterNotesByTag(tag.name)}
  >
    #{tag.name}
  </span>
))}
```

---

**Search UI Component**

**File: `src/components/SearchBar/SearchBar.tsx`**

**Features:**

- Text input (search query)
- Search button (trigger search)
- Results list (display matching notes)
- Debouncing (wait 300ms after typing before searching)

**Debouncing implementation:**

```typescript
const [query, setQuery] = useState("");
const [results, setResults] = useState<Note[]>([]);

useEffect(() => {
  const timeoutId = setTimeout(async () => {
    if (query.length > 2) {
      // Only search if 3+ chars
      const noteIds = await search(query);
      const notes = await Promise.all(noteIds.map(getNote));
      setResults(notes.filter((n) => n !== undefined));
    }
  }, 300); // 300ms delay

  return () => clearTimeout(timeoutId); // Cleanup on re-render
}, [query]);
```

**Why debouncing?**

- Avoid searching on every keystroke
- Reduce IndexedDB queries
- Better UX (wait for user to finish typing)

**Week 2 Deliverable:** Working search with tag extraction and tag cloud

---

### **Week 3: Wikilinks & Backlinks**

**Goal:** Enable linking between notes and show backlinks

---

#### **Day 14-15: Wikilink Parsing (4 hours)**

**Goal:** Extract `[[Note Title]]` from content and convert to links

**File: `src/parser/wikilinkParser.ts`**

**Wikilink syntax:**

- Format: `[[Note Title]]`
- Can appear anywhere in content
- Can have multiple per note

**Regex pattern:** `\[\[([^\]]+)\]\]`

**Breakdown:**

- `\[\[` - Literal `[[`
- `([^\]]+)` - Capture group: one or more non-`]` characters
- `\]\]` - Literal `]]`

**Extraction function:**

```typescript
export function extractWikilinks(text: string): string[] {
  const regex = /\[\[([^\]]+)\]\]/g;
  const matches = text.matchAll(regex);

  const links = [];
  for (const match of matches) {
    links.push(match.trim()); // The note title
  }

  return links;
}
```

**Example:**

```typescript
extractWikilinks("See [[Project Ideas]] and [[Learning Resources]]");
// → ["Project Ideas", "Learning Resources"]
```

**Resolving titles to IDs:**

Problem: You have note titles, need note IDs for storage.

Solution: Query IndexedDB by title index

```typescript
async function resolveWikilink(title: string): Promise<string | null> {
  const db = await initDB();
  const tx = db.transaction("notes", "readonly");
  const store = tx.objectStore("notes");
  const index = store.index("title");

  const request = index.get(title);

  return new Promise((resolve) => {
    request.onsuccess = () => {
      const note = request.result;
      resolve(note ? note.id : null);
    };
  });
}
```

**Handling unresolved links:**

- Title doesn't match any note
- Options:
  1. Ignore (don't create link)
  2. Mark as "broken link" (show in UI with different color)
  3. Auto-create placeholder note (advanced)

**Your approach:** Ignore for MVP, show broken links in UI later.

---

#### **Day 16-17: Link Storage & Backlinks (4 hours)**

**Goal:** Store links in database, query backlinks

**File: `src/db/linkStore.ts`**

**Creating links when note saved:**

```typescript
export async function updateNoteLinks(
  noteId: string,
  content: string,
): Promise<void> {
  // 1. Extract wikilink titles from content
  const wikilinkTitles = extractWikilinks(content);

  // 2. Resolve titles to note IDs
  const targetNoteIds = [];
  for (const title of wikilinkTitles) {
    const targetId = await resolveWikilink(title);
    if (targetId) {
      targetNoteIds.push(targetId);
    }
  }

  // 3. Delete existing links from this note (clean slate)
  await deleteLinksFromSource(noteId);

  // 4. Create new links
  for (const targetId of targetNoteIds) {
    await createLink({
      id: crypto.randomUUID(),
      sourceNoteId: noteId,
      targetNoteId: targetId,
      createdAt: Date.now(),
    });
  }
}
```

**CRUD for links:**

```typescript
export async function createLink(link: Link): Promise<void> {
  // Add to links object store
}

export async function getLinksFromNote(noteId: string): Promise<Link[]> {
  // Query by sourceNoteId index
}

export async function getBacklinks(noteId: string): Promise<Link[]> {
  // Query by targetNoteId index
  // Returns all links where targetNoteId === noteId
}

export async function deleteLinksFromSource(noteId: string): Promise<void> {
  // Delete all links where sourceNoteId === noteId
}
```

**Backlinks query explanation:**

When viewing Note B, you want to know: "Which notes link to me?"

```typescript
// Note A contains [[Note B]]
// Link created: { sourceNoteId: A.id, targetNoteId: B.id }

// When viewing Note B:
const backlinks = await getBacklinks(B.id);
// Returns: [{ sourceNoteId: A.id, targetNoteId: B.id }]

// Fetch note titles:
const backlinkNotes = await Promise.all(
  backlinks.map((link) => getNote(link.sourceNoteId)),
);
// Display: "Referenced by: Note A"
```

**Bi-directional navigation:**

- Forward links: Click `[[Note B]]` → navigate to Note B
- Backlinks: View Note B → see "Referenced by: Note A" → click to go to Note A

---

#### **Day 18-19: Link Rendering & Navigation (4 hours)**

**Goal:** Make wikilinks clickable, display backlinks

**File: `src/parser/markdownParser.ts`** (or update existing)

**Rendering wikilinks as HTML:**

**Input:** Markdown with wikilinks

```
Check out [[Project Ideas]] for inspiration.
```

**Output:** HTML with clickable links

```html
Check out <a href="#/note/note456" class="wikilink">Project Ideas</a> for
inspiration.
```

**Rendering algorithm:**

```typescript
export async function renderWikilinks(text: string): Promise<string> {
  const regex = /\[\[([^\]]+)\]\]/g;

  // Replace each wikilink
  let result = text;
  const matches = text.matchAll(regex);

  for (const match of matches) {
    const title = match;
    const noteId = await resolveWikilink(title);

    if (noteId) {
      // Valid link
      const replacement = `<a href="#/note/${noteId}" class="wikilink">${title}</a>`;
      result = result.replace(match, replacement);
    } else {
      // Broken link
      const replacement = `<span class="wikilink-broken">${title}</span>`;
      result = result.replace(match, replacement);
    }
  }

  return result;
}
```

**CSS for wikilinks:**

```css
.wikilink {
  color: #3b82f6; /* Blue */
  text-decoration: underline;
  cursor: pointer;
}

.wikilink-broken {
  color: #ef4444; /* Red */
  text-decoration: line-through;
}
```

**Navigation handling:**

When user clicks wikilink:

1. Extract note ID from href (`#/note/note456`)
2. Call `openNote(noteId)` function
3. Switch view to NoteViewer with that note

---

**Backlinks Component**

**File: `src/components/Backlinks/Backlinks.tsx`**

**Purpose:** Show which notes reference current note

**Props:**

```typescript
interface BacklinksProps {
  noteId: string;
}
```

**Implementation:**

```typescript
function Backlinks({ noteId }: BacklinksProps) {
  const [backlinks, setBacklinks] = useState<Note[]>([]);

  useEffect(() => {
    async function loadBacklinks() {
      const links = await getBacklinks(noteId);
      const notes = await Promise.all(
        links.map(link => getNote(link.sourceNoteId))
      );
      setBacklinks(notes.filter(n => n !== undefined));
    }

    loadBacklinks();
  }, [noteId]);

  if (backlinks.length === 0) {
    return null; // Don't show if no backlinks
  }

  return (
    <div className="backlinks">
      <h3>Referenced by:</h3>
      <ul>
        {backlinks.map(note => (
          <li key={note.id}>
            <a href={`#/note/${note.id}`}>{note.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Where to display:**

- Bottom of NoteViewer component
- Shows after note content

**Week 3 Deliverable:** Notes can link to each other, backlinks display correctly

---

### **Week 4: Graph View & Polish**

**Goal:** Visualize note connections, add PWA support, final polish

---

#### **Day 20-22: Graph Visualization (6 hours)**

**Goal:** Draw interactive graph of notes and links on Canvas

**What you're learning:**

- Canvas API (2D drawing)
- Force-directed graph layout
- Mouse interaction on canvas
- Basic physics simulation

**File: `src/graph/graphBuilder.ts`**

**Graph data structure:**

```typescript
interface GraphNode {
  id: string; // Note ID
  label: string; // Note title
  x: number; // X position on canvas
  y: number; // Y position on canvas
  vx: number; // X velocity (for physics)
  vy: number; // Y velocity (for physics)
}

interface GraphEdge {
  source: string; // Source note ID
  target: string; // Target note ID
}

interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
```

**Building graph from database:**

```typescript
export async function buildGraph(): Promise<Graph> {
  const notes = await getAllNotes();
  const links = await getAllLinks(); // Fetch all links

  // Create nodes (one per note)
  const nodes: GraphNode[] = notes.map((note) => ({
    id: note.id,
    label: note.title,
    x: Math.random() * 800, // Random initial position
    y: Math.random() * 600,
    vx: 0,
    vy: 0,
  }));

  // Create edges (one per link)
  const edges: GraphEdge[] = links.map((link) => ({
    source: link.sourceNoteId,
    target: link.targetNoteId,
  }));

  return { nodes, edges };
}
```

---

**File: `src/graph/forceSimulation.ts`**

**Force-directed layout algorithm:**

**Goal:** Position nodes so connected notes are close, unconnected are far apart

**Forces to simulate:**

**1. Attraction (spring force between linked nodes)**

- Pulls connected nodes together
- Strength proportional to distance

```typescript
function applyAttractionForce(node1: GraphNode, node2: GraphNode) {
  const dx = node2.x - node1.x;
  const dy = node2.y - node1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const force = distance * 0.01; // Spring constant

  const fx = (dx / distance) * force;
  const fy = (dy / distance) * force;

  node1.vx += fx;
  node1.vy += fy;
  node2.vx -= fx;
  node2.vy -= fy;
}
```

**2. Repulsion (nodes push away from each other)**

- Prevents overlapping
- All nodes repel (like magnets)

```typescript
function applyRepulsionForce(node1: GraphNode, node2: GraphNode) {
  const dx = node2.x - node1.x;
  const dy = node2.y - node1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1) return; // Avoid division by zero

  const force = 1000 / (distance * distance); // Inverse square law

  const fx = (dx / distance) * force;
  const fy = (dy / distance) * force;

  node1.vx -= fx;
  node1.vy -= fy;
  node2.vx += fx;
  node2.vy += fy;
}
```

**3. Centering force (pull toward center of canvas)**

- Prevents nodes from drifting off-screen

```typescript
function applyCenteringForce(
  node: GraphNode,
  centerX: number,
  centerY: number,
) {
  const dx = centerX - node.x;
  const dy = centerY - node.y;

  node.vx += dx * 0.001;
  node.vy += dy * 0.001;
}
```

**4. Damping (slow down movement)**

- Prevents infinite bouncing
- Friction effect

```typescript
function applyDamping(node: GraphNode) {
  node.vx *= 0.9; // 10% friction
  node.vy *= 0.9;
}
```

**Simulation step (called each frame):**

```typescript
export function simulateStep(
  graph: Graph,
  canvasWidth: number,
  canvasHeight: number,
) {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Apply repulsion between all node pairs
  for (let i = 0; i < graph.nodes.length; i++) {
    for (let j = i + 1; j < graph.nodes.length; j++) {
      applyRepulsionForce(graph.nodes[i], graph.nodes[j]);
    }
  }

  // Apply attraction along edges
  for (const edge of graph.edges) {
    const source = graph.nodes.find((n) => n.id === edge.source);
    const target = graph.nodes.find((n) => n.id === edge.target);
    if (source && target) {
      applyAttractionForce(source, target);
    }
  }

  // Apply centering and damping to all nodes
  for (const node of graph.nodes) {
    applyCenteringForce(node, centerX, centerY);
    applyDamping(node);

    // Update position based on velocity
    node.x += node.vx;
    node.y += node.vy;
  }
}
```

**Animation loop:**

```typescript
function animate(graph: Graph, canvas: HTMLCanvasElement) {
  simulateStep(graph, canvas.width, canvas.height);
  render(graph, canvas); // Draw updated positions

  requestAnimationFrame(() => animate(graph, canvas));
}
```

---

**File: `src/graph/renderer.ts`**

**Canvas rendering:**

**Setup:**

```typescript
const canvas = document.getElementById("graph-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = 800;
canvas.height = 600;
```

**Drawing function:**

```typescript
export function render(graph: Graph, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw edges (lines between nodes)
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 1;

  for (const edge of graph.edges) {
    const source = graph.nodes.find((n) => n.id === edge.source);
    const target = graph.nodes.find((n) => n.id === edge.target);

    if (source && target) {
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }
  }

  // Draw nodes (circles)
  for (const node of graph.nodes) {
    // Circle
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = "#000";
    ctx.font = "12px sans-serif";
    ctx.fillText(node.label, node.x + 15, node.y + 5);
  }
}
```

**Mouse interaction (click node to open note):**

```typescript
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Find clicked node
  for (const node of graph.nodes) {
    const dx = mouseX - node.x;
    const dy = mouseY - node.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
      // Within node radius
      openNote(node.id);
      break;
    }
  }
});
```

**Component integration:**

```typescript
// src/components/GraphView/GraphView.tsx

function GraphView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [graph, setGraph] = useState<Graph | null>(null);

  useEffect(() => {
    async function loadGraph() {
      const g = await buildGraph();
      setGraph(g);
    }
    loadGraph();
  }, []);

  useEffect(() => {
    if (!graph || !canvasRef.current) return;

    const canvas = canvasRef.current;

    // Start animation loop
    let animationId: number;
    function animate() {
      simulateStep(graph, canvas.width, canvas.height);
      render(graph, canvas);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Cleanup
    return () => cancelAnimationFrame(animationId);
  }, [graph]);

  return <canvas ref={canvasRef} width={800} height={600} id="graph-canvas" />;
}
```

---

#### **Day 23-24: PWA & Offline Support (4 hours)**

**Goal:** Make app installable and work offline

**What you're learning:**

- Service Workers
- Cache API
- Web App Manifest

**File: `public/manifest.json`**

**Web App Manifest (metadata for PWA):**

```json
{
  "name": "Synapse",
  "short_name": "Synapse",
  "description": "Offline-first knowledge manager",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Icons:** Create simple icons (can use favicon generators online, but design yourself)

**Link in `index.html`:**

```html
<link rel="manifest" href="/manifest.json" />
```

---

**File: `public/service-worker.js`**

**Service Worker (caches app files):**

```javascript
const CACHE_NAME = "Synapse-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/index.js", // Your bundled JS (Vite generates this)
  "/assets/index.css", // Your bundled CSS
];

// Install event: cache app files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Fetch event: serve from cache if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return cached version
      if (response) {
        return response;
      }

      // Not in cache - fetch from network
      return fetch(event.request);
    }),
  );
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
```

**Register Service Worker in `main.tsx`:**

```typescript
// At the bottom of main.tsx

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch((err) => console.error("Service Worker registration failed:", err));
}
```

**Testing offline mode:**

1. Open app in browser
2. Open DevTools → Application → Service Workers
3. Check "Offline" checkbox
4. Reload page → should still work!

---

#### **Day 25-26: Export/Import & Final Polish (4 hours)**

**Goal:** Data portability and UI improvements

**File: `src/utils/export.ts`**

**Export all notes as JSON:**

```typescript
export async function exportNotesAsJSON(): Promise<void> {
  const notes = await getAllNotes();
  const links = await getAllLinks();

  const data = {
    notes,
    links,
    exportedAt: new Date().toISOString(),
    version: "1.0",
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Trigger download
  const a = document.createElement("a");
  a.href = url;
  a.download = `Synapse-export-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
```

**Export as Markdown files (ZIP):**

Requires library for ZIP creation (e.g., JSZip), but you can do individual MD files:

```typescript
export async function exportNoteAsMarkdown(noteId: string): Promise<void> {
  const note = await getNote(noteId);
  if (!note) return;

  const markdown = `# ${note.title}\n\n${note.content}\n\n---\nCreated: ${new Date(note.createdAt).toLocaleDateString()}`;

  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${note.title.replace(/[^a-z0-9]/gi, "-")}.md`;
  a.click();

  URL.revokeObjectURL(url);
}
```

---

**File: `src/utils/import.ts`**

**Import from JSON:**

```typescript
export async function importNotesFromJSON(file: File): Promise<void> {
  const text = await file.text();
  const data = JSON.parse(text);

  // Validate structure
  if (!data.notes || !Array.isArray(data.notes)) {
    throw new Error("Invalid export file");
  }

  // Import notes
  for (const note of data.notes) {
    await createNote(note);
  }

  // Import links
  if (data.links) {
    for (const link of data.links) {
      await createLink(link);
    }
  }

  // Rebuild search index
  await rebuildSearchIndex(data.notes);
}
```

**UI for import:**

```typescript
<input
  type="file"
  accept=".json"
  onChange={(e) => {
    const file = e.target.files?.;
    if (file) importNotesFromJSON(file);
  }}
/>
```

---

**UI Polish Checklist:**

- [ ] **Dark mode toggle**
  - CSS variables for colors
  - Toggle switch in header
  - Persist preference in localStorage

- [ ] **Keyboard shortcuts**
  - `Ctrl+N`: New note
  - `Ctrl+K`: Focus search
  - `Ctrl+S`: Save note
  - `Esc`: Close modal/cancel

- [ ] **Loading states**
  - Spinner when loading notes
  - Skeleton screens for lists

- [ ] **Empty states**
  - "No notes yet" message with "Create your first note" button
  - "No search results" message

- [ ] **Confirmation dialogs**
  - "Are you sure you want to delete this note?"

- [ ] **Toast notifications**
  - "Note saved successfully"
  - "Note deleted"
  - "Export complete"

- [ ] **Responsive design**
  - Mobile: Single-column layout (no sidebar)
  - Tablet: Collapsible sidebar
  - Desktop: Full two-column layout

---

**Week 4 Deliverable:** Complete app with graph view, PWA support, export/import, polished UI

---

## <a name="algorithms"></a>7. 🧮 **Algorithm Explanations (Deep Dives)**

### **Full-Text Search Algorithm**

**Problem:** Find notes matching user query

**Input:**

- Query: `"javascript react"`
- Notes database with 100+ notes

**Output:**

- Ranked list of matching note IDs

**Algorithm steps:**

```
Step 1: Preprocess (one-time, on note save)
  For each note:
    - Tokenize: "Learning JavaScript" → ["learning", "javascript"]
    - Build inverted index: { "javascript": [note1, note3], "learning": [note1, note5] }

Step 2: Query processing (at search time)
  - Tokenize query: "javascript react" → ["javascript", "react"]
  - For each token:
      - Look up in index: "javascript" → [note1, note3, note7]
  - Combine results (AND): notes in ALL lists
      - Intersection: [note1, note3, note7] ∩ [note1, note2] = [note1]

Step 3: Ranking (score matching notes)
  For each matching note:
    - Count term occurrences in note
    - Bonus points for title matches
    - Sort by score descending

Step 4: Return results
  - Return top N note IDs (e.g., top 20)
```

**Complexity analysis:**

- **Indexing:** O(N × M) where N = notes, M = avg words per note
- **Search:** O(K × L) where K = query terms, L = avg results per term
- **Space:** O(V × D) where V = vocabulary size, D = avg notes per term

**Optimizations:**

1. **Stop word removal:** Reduce index size (skip "the", "a", "is")
2. **Stemming:** "running" and "run" treated as same term
3. **Caching:** Cache query results for repeated searches
4. **Pagination:** Return top 20 results, load more on demand

---

### **Force-Directed Graph Layout**

**Problem:** Position nodes (notes) so connected notes are close, layout looks good

**Input:**

- Nodes: `[{id, x, y}, {id, x, y}, ...]`
- Edges: `[{source, target}, ...]`

**Output:**

- Updated node positions (x, y)

**Algorithm (iterative):**

```
Initialize:
  - Place nodes randomly
  - Set velocities to zero

Repeat for N iterations (or until stabilized):
  For each node pair (i, j):
    - Calculate repulsion force (push apart)
    - F_repulsion = k / distance²
    - Apply to both nodes (opposite directions)

  For each edge (source, target):
    - Calculate attraction force (pull together)
    - F_attraction = distance × spring_constant
    - Apply to both nodes (toward each other)

  For each node:
    - Apply centering force (pull toward canvas center)
    - Apply damping (friction, slow down)
    - Update velocity: v += force
    - Update position: position += velocity
```

**Physics analogy:**

- **Nodes = charged particles** (repel each other)
- **Edges = springs** (pull connected nodes together)
- **Damping = air friction** (prevents infinite bouncing)

**Tuning parameters:**

- `repulsion_strength`: How strongly nodes push apart (default: 1000)
- `spring_constant`: How strongly edges pull together (default: 0.01)
- `damping_factor`: How much friction (default: 0.9 = 10% loss per frame)

**Stopping condition:**

- Fixed iterations (e.g., 300 frames)
- Or: Stop when total energy below threshold (nodes barely moving)

**Complexity:** O(N² + E) per iteration, where N = nodes, E = edges

**Optimization:** Use quadtree for repulsion (reduces to O(N log N))

---

### **Backlink Indexing**

**Problem:** Quickly find all notes linking TO a specific note

**Naive approach:** Scan all notes, check if content contains `[[Target Note]]`

- Complexity: O(N × M) where N = notes, M = content length
- Too slow for real-time queries

**Optimized approach:** Maintain reverse index

**Data structure:**

```typescript
// links object store
{
  id: "link123",
  sourceNoteId: "note1",  // Note containing the link
  targetNoteId: "note5"   // Note being linked to
}

// Index on targetNoteId allows fast lookup
```

**Query:**

```sql
-- Pseudocode (IndexedDB doesn't use SQL, but conceptually)
SELECT sourceNoteId FROM links WHERE targetNoteId = 'note5'
```

**Algorithm:**

```
When note saved:
  1. Parse content for wikilinks
  2. For each [[Link]]:
     a. Resolve title to note ID
     b. Delete old link if exists (avoid duplicates)
     c. Create new link record
  3. Store in links object store

When viewing note:
  1. Query links WHERE targetNoteId = current note
  2. Fetch source notes
  3. Display as "Referenced by" list
```

**Complexity:** O(1) average (indexed query), O(K) to fetch K backlink notes

---

## <a name="ui-ux"></a>8. 🎨 **UI/UX Design Guide**

### **Layout Structure**

```
┌─────────────────────────────────────────────────┐
│  Header                                         │
│  [Logo] [Search...............] [+ New] [Graph] │
└─────────────────────────────────────────────────┘
┌───────────────┬─────────────────────────────────┐
│  Sidebar      │  Main Area                      │
│               │                                 │
│  [Tag Cloud]  │  ┌───────────────────────────┐ │
│   #js (15)    │  │ Note Editor/Viewer        │ │
│   #react (8)  │  │                           │ │
│   #ml (5)     │  │ Title: _______________    │ │
│               │  │                           │ │
│  [Note List]  │  │ Content:                  │ │
│   -  Note 1    │  │ ________________________  │ │
│   -  Note 2    │  │ ________________________  │ │
│   -  Note 3    │  │ ________________________  │ │
│               │  │                           │ │
│               │  │ [Save] [Cancel]           │ │
│               │  └───────────────────────────┘ │
│               │                                 │
│               │  Backlinks:                     │
│               │  -  Referenced by: Note X        │
└───────────────┴─────────────────────────────────┘
```

### **Color Palette (Light Mode)**

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --border: #e5e7eb;
  --danger: #ef4444;
  --success: #10b981;
}
```

### **Dark Mode**

```css
[data-theme="dark"] {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --accent: #60a5fa;
  --accent-hover: #3b82f6;
  --border: #374151;
}
```

### **Typography**

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
}
h2 {
  font-size: 1.5rem;
  font-weight: 600;
}
h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

code {
  font-family: "Monaco", "Courier New", monospace;
  background: var(--bg-secondary);
  padding: 2px 6px;
  border-radius: 4px;
}
```

### **Component Design Patterns**

**Note Card:**

```
┌─────────────────────────────────┐
│ Note Title                      │ ← Bold, 18px
│ First 100 chars of content...  │ ← Gray, 14px
│ #tag1 #tag2       2 days ago    │ ← Small, spaced
└─────────────────────────────────┘
```

**Search Results:**

```
┌─────────────────────────────────┐
│ 🔍 Search: "javascript"         │
│                                 │
│ ✓ Advanced JavaScript (score: 8)│
│   ...learn modern **javascript**│
│   patterns for React...         │ ← Highlight matches
│                                 │
│ ✓ JS Interview Prep (score: 5) │
│   Common **javascript** questions│
└─────────────────────────────────┘
```

**Graph View:**

```
        Node A
         / \
        /   \
    Node B  Node C
       \     /
        \   /
        Node D
```

- Blue circles for nodes
- Gray lines for edges
- Labels beside nodes
- Hover effect (larger, highlighted)

---

## <a name="testing"></a>9. ✅ **Testing Strategy**

### **Manual Testing Checklist**

**IndexedDB:**

- [ ] Create note → verify in DevTools IndexedDB viewer
- [ ] Update note → verify changes persisted
- [ ] Delete note → verify removed from database
- [ ] Refresh page → verify data persists

**Search:**

- [ ] Search single term → verify results
- [ ] Search multiple terms → verify AND logic
- [ ] Search term in title → verify title boost
- [ ] Search nonexistent term → verify empty results
- [ ] Create new note → verify search index updated

**Tags:**

- [ ] Add `#tag` to note → verify extracted
- [ ] Tag cloud displays all tags
- [ ] Click tag → filters notes correctly
- [ ] Delete note → tag count updates

**Links:**

- [ ] Add `[[Link]]` to note → verify creates link
- [ ] View linked note → verify backlink shows
- [ ] Click wikilink → navigates to correct note
- [ ] Delete note → verify links cleaned up
- [ ] Broken link `[[Nonexistent]]` → shows as broken

**Graph:**

- [ ] Create linked notes → verify edges drawn
- [ ] Click node → opens correct note
- [ ] Isolated note → displays alone
- [ ] Complex graph → stabilizes (doesn't explode)

**Export/Import:**

- [ ] Export → verify JSON structure correct
- [ ] Import → verify notes restored
- [ ] Import duplicate notes → handle gracefully

**PWA:**

- [ ] Install app → verify icon on home screen
- [ ] Go offline → verify app still works
- [ ] Create note offline → verify saved locally

---

### **Automated Testing (Optional)**

**Simple unit tests with Vitest:**

```typescript
// tests/tokenizer.test.ts
import { tokenize } from "../src/search/tokenizer";

describe("tokenize", () => {
  it("should lowercase and split text", () => {
    expect(tokenize("Hello World")).toEqual(["hello", "world"]);
  });

  it("should remove punctuation", () => {
    expect(tokenize("Hello, World!")).toEqual(["hello", "world"]);
  });

  it("should remove stopwords", () => {
    expect(tokenize("the quick brown fox")).toEqual(["quick", "brown", "fox"]);
  });
});
```

Run: `npm run test`

---

## <a name="success-criteria"></a>10. 🎯 **Success Criteria**

### **MVP Definition (What "Done" Looks Like)**

**Functional requirements:**

- ✅ Create, edit, delete notes
- ✅ Notes persist across browser sessions
- ✅ Full-text search finds notes by content
- ✅ Tags extracted and filterable
- ✅ Wikilinks create connections
- ✅ Backlinks display correctly
- ✅ Graph view visualizes connections
- ✅ Offline-first (works without internet)
- ✅ Export/import data

**Technical requirements:**

- ✅ TypeScript strict mode (no `any`)
- ✅ Zero AI-generated code (all handwritten)
- ✅ IndexedDB as sole data store
- ✅ No external UI frameworks (DIY components)
- ✅ Service Worker for offline support
- ✅ Canvas-based graph rendering

**Documentation requirements:**

- ✅ README with setup instructions
- ✅ Code comments explaining algorithms
- ✅ Design decision log (DESIGN.md)
- ✅ Learning notes (INDEXEDDB.md, ALGORITHMS.md)

---

### **Portfolio Presentation Points**

**Interview story structure:**

**1. Problem:**
"I wanted a knowledge management system that's truly mine—offline, private, and where I understand every line of code."

**2. Solution:**
"I built Synapse from scratch using IndexedDB, implementing full-text search, graph visualization, and offline-first architecture—all without AI assistance."

**3. Technical depth:**
"I implemented an inverted index for sub-100ms search, force-directed graph layout with physics simulation, and bidirectional linking with automatic backlink detection."

**4. Key algorithms:**

- "For search, I tokenize content, build an inverted index, and rank results using term frequency."
- "For the graph, I use force-directed layout—nodes repel, edges attract, with damping to prevent chaos."
- "Backlinks use a reverse index—I query by target note ID to find all sources instantly."

**5. Challenges solved:**

- "IndexedDB's async API was tricky—I wrapped it in Promises for cleaner code."
- "Graph layout required tuning repulsion/attraction forces—too much and nodes explode, too little and they clump."
- "Wikilink resolution needed fuzzy matching—I normalize titles for reliable linking."

**6. Learnings:**
"I deeply understand browser storage, search algorithms, and force simulations. This contrasts with my AI-powered projects—showing I can build complex systems both ways."

---

### **Metrics to Track**

Document these for your portfolio:

| Metric                   | Target                      | How to Measure                      |
| ------------------------ | --------------------------- | ----------------------------------- |
| **Notes created**        | 50+ (your real usage)       | Count in database                   |
| **Search latency**       | <100ms                      | `console.time()` in search function |
| **Graph render time**    | <50ms/frame (60 FPS)        | Canvas performance API              |
| **IndexedDB operations** | <20ms avg                   | Time CRUD functions                 |
| **Code complexity**      | <10 cyclomatic per function | Code review (keep functions simple) |
| **Bundle size**          | <200KB                      | Vite build output                   |
| **Lighthouse score**     | 90+ (performance)           | Chrome DevTools Lighthouse          |

---

## 📚 **Learning Documentation Template**

**Create `docs/DESIGN.md` as you build:**

```markdown
# Design Decisions

## Why IndexedDB over localStorage?

[Your explanation of trade-offs]

## Search Algorithm Choice

Chose inverted index because...
Considered alternatives: linear scan (too slow), external library (defeats purpose)

## Graph Layout Algorithm

Implemented force-directed because...
Challenges: tuning forces, preventing infinite loops, canvas performance

## Wikilink Syntax

Chose [[Note Title]] because...
Alternatives considered: Markdown links [text](url) (too verbose)

## Tag Extraction

Pattern: #[a-zA-Z0-9_]+
Why: simple, readable, Markdown-compatible

## State Management

No Redux/Zustand because...
Used React Context for global state, useState for local
```

---

## 🎓 **Final Advice**

### **Rules for Zero-AI Development**

**Allowed:**

- ✅ Reading documentation (MDN, React docs, IndexedDB spec)
- ✅ Searching StackOverflow for specific errors
- ✅ Watching tutorials (but type code yourself, don't copy-paste)
- ✅ Asking me **conceptual questions** (not "write this function")

**Not allowed:**

- ❌ GitHub Copilot, Codeium, TabNine (disable these)
- ❌ ChatGPT/Claude for code generation
- ❌ Copy-pasting code from tutorials (type it yourself)
- ❌ Using libraries for core functionality (search, graph, parser)

**When stuck:**

1. Read error message carefully
2. Console.log intermediate values
3. Check browser DevTools (Network, Application, Console)
4. Search error message on Google/StackOverflow
5. Ask me: "I'm trying to X, getting error Y, what concept am I missing?"

---

### **Time Management**

**Realistic schedule:**

- **Week 1:** 8 hours (2 hours/day × 4 days)
- **Week 2:** 8 hours
- **Week 3:** 8 hours
- **Week 4:** 8 hours
- **Total:** 32 hours

**If falling behind:**

- Cut graph view (move to post-MVP)
- Cut export/import (keep notes in IndexedDB only)
- Cut PWA (offline still works via IndexedDB)

**Don't cut:**

- CRUD operations (core)
- Search (core differentiator)
- Wikilinks (core knowledge manager feature)

---

### **Success Mindset**

**This project proves:**

- You understand web fundamentals deeply
- You can build complex systems without AI crutches
- You know algorithms (search, graph, parsing)
- You can explain every line to a recruiter

**This complements Archivio:**

- Archivio: AI-powered, collaborative, cloud-deployed
- Synapse: Hand-coded, local-first, algorithm-focused

**Portfolio narrative:**
"I built **Archivio** to showcase AI/ML integration and modern web architecture. I built **Synapse** to prove I understand computer science fundamentals—search algorithms, graph theory, and data structures—without relying on AI tools."

---

**You've got this!** In 3-4 weeks, you'll have a fully functional knowledge manager you built with your own hands. Every recruiter will be impressed when you walk them through the search algorithm or force simulation you implemented yourself.

Now go build something amazing! 💪
