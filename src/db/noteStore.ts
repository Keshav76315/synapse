// Note CRUD Operations

import type { Note } from "../types/Note";
import DBConnect from "./db";


const getDB = async (method: string) => { //Work in Progress
    let query: IDBTransactionMode;

    if (method === "get") {
        query = "readonly";
    }
    else {
        query = "readwrite";
    }

    const db = await DBConnect();

    if (!db) {
        throw Error("Database not connected, please try again later.");
    }

    const transaction = db.transaction("notes", query);
    const store = transaction.objectStore("notes");

    return store;
}

const createNote = async (title: string, content: string) => {
    const store = await getDB("put");

    return new Promise((resolve, reject) => {
         
        const note = {
            id: crypto.randomUUID(),
            title: title,
            content: content,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            tags: [],
            linkedNotes: []
        }

        const request = store.add(note);

        request.onsuccess = () => resolve(request.result);

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
            return; //Separate error handling
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
