// Note CRUD Operations

import type { Note } from "../types/Note";
import DBConnect from "./db";

let db: IDBDatabase | null = null;

async function cache(arg: any): Promise<IDBDatabase> {
    if (!arg) {
        arg = await DBConnect();
    }
    return arg;
}

const getDB = async (method: string) => { 
    let query: IDBTransactionMode;

    if (method === "get") {
        query = "readonly";
    }
    else {
        query = "readwrite";
    }

    db = await cache(db);

    if (!db) {
        throw Error("Database not connected, please try again later.");
    }

    const transaction = db.transaction("notes", query);
    const store = transaction.objectStore("notes");

    return store;
}

const createNote = async (id: string | null, title: string, content: string) => {
    const store = await getDB("put");

    return new Promise((resolve, reject) => {

        if (!id) {
            id = crypto.randomUUID();
        }
         
        const note = {
            id: id,
            title: title,
            content: content,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            tags: [],
            linkedNotes: []
        }

        const request = store.add(note);

        request.onsuccess = () => resolve(note);

        request.onerror = () => reject(request.error);

            
    })       
}

const getNote = async (id: string) => {
    const store = await getDB("get");

    return new Promise((resolve, reject) => {

        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
}

const getAllNotes = async () => {
    const store = await getDB("get");

    return new Promise((resolve, reject) => {

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
}

const updateNote = async (id: string, updates: Partial<Note>) => {
    const store = await getDB("patch");
    const note = await getNote(id);

    return new Promise((resolve, reject) => {

        if (!note) {
            throw Error("No note found.")
        }

        const updatedNote = {...note, ...updates, updatedAt: Date.now()};

        const request = store.put(updatedNote);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
}

const deleteNote = async (id: string) => {
    const store = await getDB("delete");

    return new Promise((resolve, reject) => {

        const request = store.delete(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
}

export {createNote, getNote, getAllNotes, updateNote, deleteNote, getDB};
