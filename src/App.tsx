import React, { useState } from 'react';
import type {Note}  from './types/Note'
import NoteList from './components/NoteList/NoteList'
import NoteEditor from './components/NoteEditor/NoteEditor'
import DBConnect from './db/db';
import { createNote, deleteNote, getAllNotes, updateNote } from './db/noteStore';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  React.useEffect(() => {
    DBConnect()
    .then(() => {
      console.log("DB connected successfully");
      getAllNotes()
      .then((result) => setNotes(result as Note[]));
    })
    .catch((err) => console.log("DB refused to connect. Error: ", err))    
  }, [])

  const handleCreate = (title: string, content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title,
      content: content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: [],
      linkedNotes: []
    };
    setNotes(prev => [...prev, newNote]);
    createNote(title, content);
  }

  const handleUpdate = (id: string, updates: Partial<Note>) => {
      setNotes(prev => prev.map(note => note.id === id ? {...note, ...updates}: note));
      updateNote(id, updates);
  }

  const handleDelete = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id))

    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }

    deleteNote(id);
  }

  return (
    <div className='app'>
      <NoteList
        notes={notes}
        selectedId={selectedNote?.id ?? null}
        onSelect={(note: Note) => setSelectedNote(note)}
        onDelete={(id: string) => handleDelete(id)}
      />

      <NoteEditor 
        selected={selectedNote}
        onSave={(title, content) => {
          if (selectedNote) {
            handleUpdate(selectedNote.id, {title, content});
          }
          else {
            handleCreate(title, content);
          }
        }}
      />
    </div>
  )
}

