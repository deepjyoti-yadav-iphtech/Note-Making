import React from "react";
import { GrNotes } from "react-icons/gr";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HashLink as Link } from "react-router-hash-link";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
const NoteList = ({ note, setActiveNode, onDeleteNote }) => {
 
  return (
    <Link
      to={`#section${note.id}`}
      className="p-2 list-group-item list-group-item-action px-3 border-0 rounded-3 mb-2 list-group-item-warning d-flex align-items-start justify-content-between gap-2"
      onClick={() => {
        setActiveNode(note.id);
      }}
    >
      <div>
        <div>
          <GrNotes style={{ color: "#ca8a04", fontWeight: "bold" }} />
        </div>
        {note?.password !== undefined && (
          <div>
            {note.password ? (
              <FaLock
                style={{ height: "12px", width: "12px", color: "black" }}
              />
            ) : (
              <FaLockOpen
                style={{ height: "12px", width: "12px", color: "black" }}
              />
            )}
          </div>
        )}
      </div>
      <div className="w-100">
        <div className="text-capitalize text-black lh-base">{note.title}</div>
        <p
          className="text-black"
          style={{ fontSize: "x-small", marginBottom: 0 }}
        >
          {note.text && <span>{note.text.join(" ").substring(0, 50)}...</span>}
        </p>
        <p
          className="text-muted "
          style={{ fontSize: "xx-small", marginBottom: 0 }}
        >
          Last modified on {new Date(note.lastModified).toLocaleString()}
        </p>
      </div>

      <div style={{ color: "#7f1d1d" }} onClick={() => onDeleteNote(note.id)}>
        <RiDeleteBin6Fill />
      </div>
    </Link>
  );
};

export default NoteList;
