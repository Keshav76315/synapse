import React, {useState} from 'react';
import type {Note} from '../../types/Note'
import './NoteEditor.css';

export default function NoteEditor({selected, onSave}: {selected: Note | null, onSave: (t: string, c: string) => void}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  React.useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setContent(selected.content);
    }
    else {
      setTitle("");
      setContent("");
    }
  }, [selected]);

  return (
    <div className="noteeditor">
      <h2>{selected ? "Editing": "New Note"}</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
      <br />
      <input value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content'/>
      <br />

      <button onClick={() => onSave(title, content)} className='saveButton'>Save</button>
    </div>
  )
}
