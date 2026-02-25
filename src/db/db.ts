// Database Initialization and store creation

function DBConnect(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("SynapseDB", 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains("notes")) {
                const store = db.createObjectStore("notes", { keyPath: "id" });

                store.createIndex("title", "title", { unique: false });
                store.createIndex("createdAt", "createdAt", { unique: false });
                store.createIndex("tags", "tags", { unique: false, multiEntry: true });
            }

            if (!db.objectStoreNames.contains("links")) {
                const store = db.createObjectStore("links", { keyPath: "id" });

                store.createIndex("sourceNoteId", "sourceNoteId", { unique: false });
                store.createIndex("targetNoteId", "targetNoteId", { unique: false });
            }

            if (!db.objectStoreNames.contains("searchIndex")) {
                db.createObjectStore("searchIndex", { keyPath: "term" });
            }

        }

        request.onsuccess = () => {
            resolve(request.result);
        }

        request.onerror = () => {
            reject(request.error);
        }
    })
}


export default DBConnect;
