# IndexedDB Notes

## What is IndexedDB?

A browser-native NoSQL database — think of it as a fast, structured key-value store that lives inside the browser. Unlike localStorage (5-10MB, synchronous, strings only), IndexedDB supports large storage (50MB+), async operations, and stores full JavaScript objects.

## Core Concepts

- **Database** — the top-level container (ours: `"SynapseDB"`)
- **Object Store** — like a table in SQL, holds records of a specific type (e.g., `notes`, `links`, `searchIndex`)
- **Index** — enables fast querying by a specific field (e.g., `title`, `createdAt`)
- **Transaction** — groups operations; either all succeed or all fail
  - `"readonly"` — for reads (can run in parallel)
  - `"readwrite"` — for mutations (exclusive lock)
- **keyPath** — the field used as the primary key (`"id"` for notes/links, `"term"` for searchIndex)

## Flows

### Initialization (db.ts)

```
Open connection via indexedDB.open("SynapseDB", version)
  → onupgradeneeded fires (first time or version bump)
    → Create object stores
    → Create indexes on each store
  → onsuccess fires → resolve with db instance
```

### CRUD Operations (noteStore.ts)

```
Get db instance via DBConnect()
  → Open transaction: db.transaction("storeName", mode)
  → Get store: transaction.objectStore("storeName")
  → Call method: store.add() / .get() / .getAll() / .put() / .delete()
  → Handle onsuccess / onerror callbacks
```

## Key Insights

- `createIndex()` is called on the **store**, not the **db**
- `createObjectStore()` returns the store — capture it if you need to add indexes
- `store.get()` always returns a request object, never null — check `request.result` for the actual data
- `add()` = insert only (fails if key exists), `put()` = upsert (overwrites if exists)
- `multiEntry: true` on an index means each array element is indexed separately (useful for tags)
- The entire IndexedDB API is callback-based; wrap in `new Promise()` for async/await
- `const` is block-scoped — declare variables with `let` outside if/else when needed across blocks
