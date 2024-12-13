import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

const STORAGE_KEY = 'emotion_journal_notes';

export function NotesProvider({ children }) {
  // Initialize state from localStorage if available
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      emotion: note.emotion,
      content: note.content,
      timestamp: new Date().toISOString(),
      type: note.emotion.type
    };
    setNotes(prev => [...prev, newNote]);
  };

  const deleteNote = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const clearAllNotes = () => {
    if (window.confirm('Are you sure you want to delete all notes? This cannot be undone.')) {
      setNotes([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <NotesContext.Provider value={{ 
      notes, 
      addNote, 
      deleteNote, 
      clearAllNotes 
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
} 