import React from 'react';
import type {Note} from '../../types/Note';
import './NoteList.css';

interface noteListProps {
  notes: Note[];
  selectedId: string | null;
  onSelect: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteList({notes, selectedId, onSelect, onDelete}: noteListProps) {
  return (
    <div className="notelist">
      <h2 className='heading'>My Notes</h2>
      {notes.map(note => (
        <div key={note.id} onClick={() => onSelect(note)} className={`inlist ${note.id === selectedId ? "selected": ""}`}>
          <strong>{note.title}</strong>
          <p>{note.content?.substring(0, 100) ?? ''}</p>          
          <button onClick={(e) => {e.stopPropagation(); onDelete(note.id)}}>Delete</button>
        </div>
      ))}
    </div>
  )
}
