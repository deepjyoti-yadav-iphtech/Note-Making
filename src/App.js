import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import NotesDetails from "./components/notesDetails";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const undoStackRef = useRef(undoStack);

  const lockNotePassword = localStorage.getItem("Password");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    undoStackRef.current = undoStack;
  }, [undoStack]);

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  function handleAddNotes(note) {
    setNotes((notes) => [...notes, note]);
    setActiveNote(note.id);
  }

  const onDeleteNote = (noteId) => {
    const deletedNote = notes.find((note) => note.id === noteId);
    setNotes((prevNotes) => prevNotes.filter(({ id }) => id !== noteId));
    setUndoStack((prevUndoStack) => [...prevUndoStack, deletedNote]);
  };

  const handleUndo = () => {
    if (undoStackRef.current.length > 0) {
      const lastDeletedNote = undoStackRef.current.pop();
      setNotes((prevNotes) => [...prevNotes, lastDeletedNote]);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

      if (
        (isMac && e.metaKey && e.key === "z") ||
        (!isMac && e.ctrlKey && e.key === "z")
      ) {
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };
  
  useEffect(() => {
    const storedNotes = localStorage.notes
      ? JSON.parse(localStorage.notes)
      : [];

    const updatedNotes = storedNotes.map((note) => {
      if (note.password !== undefined) {
        return { ...note, password: true };
      }
      return note;
    });
    setNotes(updatedNotes);
  }, []);

  return (
    <BrowserRouter>
      <div className="row g-0 ">
        <div
          className="col-md-4 col-xxl-2 "
          style={{ backgroundColor: "rgb(255 251 245)" }}
        >
          <Sidebar
            onAddNotes={handleAddNotes}
            notes={notes}
            setActiveNote={setActiveNote}
            onDeleteNote={onDeleteNote}
            lockNotePassword={lockNotePassword}
          />
        </div>
        <div className="col-md-8 col-xxl-10">
          <NotesDetails
            activeNote={getActiveNote()}
            setNotes={setNotes}
            onUpdateNote={onUpdateNote}
            lockNotePassword={lockNotePassword}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
