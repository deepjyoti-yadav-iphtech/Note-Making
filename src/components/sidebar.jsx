import React, { useEffect, useRef, useState } from "react";
import { RiListUnordered } from "react-icons/ri";
import { PiNotePencilFill } from "react-icons/pi";
import NoteList from "./NoteList";
import Sortby from "./Sortby";

function Sidebar({ onAddNotes, notes, setActiveNote, onDeleteNote }) {
  const [addOpen, setAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [opensortBy, setOpenSortBy] = useState(false);
  const [sortby, setSortby] = useState("Created:Newest");

  const sortDropdownRef = useRef(null);

  const sortedNotes = [...notes];

  switch (sortby) {
    case "Name[A-Z]":
      sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Created:Newest":
      sortedNotes.sort((a, b) => b.id - a.id);
      break;
    case "Created:oldest":
      sortedNotes.sort((a, b) => a.id - b.id);
      break;
    case "Modified:Newest":
      sortedNotes.sort((a, b) => b.lastModified - a.lastModified);
      break;
    case "Modified:oldest":
      sortedNotes.sort((a, b) => a.lastModified - b.lastModified);
      break;
    default:
      sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setOpenSortBy(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [sortDropdownRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newNote = {
      title,
      id: Date.now(),
      text: "",
      checkbox: [{ text: "", checked: false }],
      lastModified: Date.now(),
      checkBoxBar: "",
      textEditor: Math.floor(Math.random() * 1000000),
    };
    // setNotes((notes) => [...notes, newNote]);
    onAddNotes(newNote);
    setTitle("");
    setAddOpen(!addOpen);
  };

  return (
    <div className="vh-100">
      <div className="navbar shadow-3">
        <div className="container-fluid ">
          <div className="d-flex align-items-center gap-1 ">
            <img
              src="/notes.png"
              alt="prettier notes"
              className=" w-10"
              style={{ height: "40px" }}
            />
            <div className="text-center text-black">Prettier Notes</div>
          </div>
          <div className="d-flex gap-2">
            <div className="dropdown ">
              <button
                className="btn-hover p-1 btn shadow-0"
                data-mdb-auto-close="outside"
                data-mdb-dropdown-init
                data-mdb-ripple-init
                data-mdb-tooltip-init=""
                data-mdb-placement="bottom"
                title="Sort by"
                aria-expanded="false"
                onClick={() => {
                  setOpenSortBy(!opensortBy);
                }}
                ref={sortDropdownRef}
              >
                <RiListUnordered
                  style={{ width: 25, height: 25, color: "black" }}
                />
              </button>
              {opensortBy && (
                <ol
                  className="dropdown-menu sortby-list list-group "
                  aria-labelledby="dropdownMenuButton"
                >
                  <Sortby setSortby={setSortby} />
                </ol>
              )}
            </div>
            <button
              className="btn-hover p-1 btn shadow-0"
              data-mdb-ripple-init=""
              data-mdb-tooltip-init=""
              data-mdb-placement="bottom"
              title="Create Note"
              onClick={() => {
                setAddOpen(!addOpen);
              }}
            >
              <PiNotePencilFill
                style={{ width: 25, height: 25, color: "black" }}
              />
            </button>
          </div>
        </div>
      </div>
      {addOpen && (
        <form className=" mt-3 px-2" onSubmit={handleSubmit}>
          <input
            type="text"
            id="form12"
            className="form border border-warning bg-white rounded w-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={sortDropdownRef}
          />
        </form>
      )}
      <div className="mt-3 m-2">
        <div className="list-group list-group-light">
          {sortedNotes.map((note) => (
            <NoteList
              note={note}
              setActiveNode={setActiveNote}
              key={note.id}
              onDeleteNote={onDeleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
