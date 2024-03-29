/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { BsUiChecks } from "react-icons/bs";
import { IoText } from "react-icons/io5";
import FontMenu from "./FontMenu";
import { IoMdImages } from "react-icons/io";
import { FiLock } from "react-icons/fi";
import Modal from "./Modal";
import { LuTable } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import LinkModal from "./LinkModal";

function MenuBar({
  setCheckBoxBar,
  onUpdateNote,
  activeNote,
  searchWords,
  setSearchWords,
  isInputFocused,
  setIsInputFocused,
  divsContent,
  setDivsContent,
  selectedLine,
  setSelectedLine,
  handleNewImages,
  lockNotePassword,
  setNotes,
}) {
  // console.log(activeNote?.checkbox);

  // console.log(searchWords);
  const [showFontList, setShowFontList] = useState(false);
  const [showLock, setShowLock] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const fontListRef = useRef(null);
  const lockRef = useRef(null);
  // const imageRef = useRef(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fontListRef.current && !fontListRef.current.contains(event.target)) {
        setShowFontList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [fontListRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (lockRef.current && !lockRef.current.contains(event.target)) {
        setShowLock(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [lockRef]);

  const onEditField = (field, value) => {
    if (field === "password" && value === false) {
      const updatedNote = { ...activeNote };
      delete updatedNote.password;
      onUpdateNote(updatedNote);
    } else {
      onUpdateNote({
        ...activeNote,
        [field]: value,
      });
    }
  };

  const handleImageUpload = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    handleNewImages(selectedImages);
  };

  return (
    <>
      <nav
        className="navbar shadow-3 sticky-top"
        style={{
          backgroundColor: "rgb(255 251 245)",
          padding: "0.62rem",
          zIndex: "999",
        }}
      >
        <div className="container-fluid flex-nowrap">
          {/* <a className="navbar-brand">Menubar</a> */}
          <div className="d-flex gap-sm-3 font-icon-div">
            <div className="dropdown">
              <button
                className="p-1 border-0 btn shadow-0 btn-hover"
                title="Choose a style to apply to text"
                data-mdb-auto-close="outside"
                onClick={() => {
                  // console.log(opensortBy);

                  setShowFontList(!showFontList);
                }}
                ref={fontListRef}
                disabled={!activeNote}
              >
                <IoText style={{ width: 25, height: 25, color: "black" }} />
              </button>
              {showFontList && (
                <ol
                  className="dropdown-menu list-group font-list d-flex "
                  aria-labelledby="dropdownMenuButton"
                  style={{
                    backgroundColor: "rgb(255 251 245)",
                  }}
                >
                  <FontMenu
                    activeNote={activeNote}
                    divsContent={divsContent}
                    setDivsContent={setDivsContent}
                    selectedLine={selectedLine}
                    onEditField={onEditField}
                    setSelectedLine={setSelectedLine}
                  />
                </ol>
              )}
            </div>
            <button
              className="p-1 border-0 btn shadow-0 btn-hover"
              title="Make a checklist"
              disabled={!activeNote}
              onClick={() => {
                onEditField("checkBoxBar", true);
                setCheckBoxBar(true);
              }}
            >
              <BsUiChecks style={{ width: 25, height: 25, color: "black" }} />
            </button>
            {/* <button className="p-1 border-0 btn shadow-0 btn-hover">
              <LuTable style={{ width: 25, height: 25, color: "black" }} />
            </button> */}
          </div>
          <div className="d-flex gap-sm-3">
            <button
              className="p-1 border-0 btn shadow-0 btn-hover"
              title="Add a Link"
              disabled={!activeNote}
            >
              <FaLink
                style={{ width: 25, height: 25, color: "black" }}
                onClick={() => setShowLinkModal(true)}
              />
            </button>
            <div className="dropdown">
              <button
                className="p-1 border-0 btn shadow-0 btn-hover "
                type="button"
                id="dropdownMenuButton"
                data-mdb-dropdown-init
                data-mdb-ripple-init
                aria-expanded="false"
                title="Add Images"
                disabled={!activeNote}
                onClick={() => {
                  handleImageUpload();
                }}
              >
                <IoMdImages style={{ width: 25, height: 25, color: "black" }} />
              </button>
              <input
                type="file"
                multiple
                ref={imageInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
                accept="image/png, image/jpeg"
              />
            </div>
            <div className="dropdown">
              <button
                className="p-1 border-0 btn shadow-0 btn-hover dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-mdb-dropdown-init
                data-mdb-ripple-init
                aria-expanded="false"
                title="Add or remove password locks"
                disabled={!activeNote}
                onClick={() => {
                  setShowLock(!showLock);
                }}
                ref={lockRef}
              >
                <FiLock style={{ width: 25, height: 25, color: "black" }} />
              </button>
              {showLock && (
                <ul
                  className="dropdown-menu list-group"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li
                    className="dropdown-item border-bottom list-hover"
                    onClick={() => {
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
                    }}
                  >
                    Close All Locked Notes
                  </li>
                  {/* <hr className="dropdown-divider" /> */}
                  {activeNote?.password === undefined ? (
                    <li
                      className="dropdown-item list-hover "
                      onClick={() => setShowLockModal(!showLockModal)}
                    >
                      Lock Note
                    </li>
                  ) : (
                    <li
                      className="dropdown-item list-hover "
                      onClick={() => {
                        setShowLock(!showLock);
                        onEditField("password", false);
                      }}
                    >
                      Remove Lock
                    </li>
                  )}
                </ul>
              )}
            </div>
            {/* <button className="p-1 border-0 btn shadow-0 btn-hover">
              <MdIosShare style={{ width: 25, height: 25, color: "black" }} />
            </button> */}

            <form
              className={`d-flex input-group w-auto border ${
                isInputFocused ? "border-2 border-warning" : ""
              } bg-white rounded-4`}
            >
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search" />
              </span>
              <input
                type="search"
                className="border-0 px-0 rounded-4 search-box"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchWords}
                onChange={(e) => setSearchWords(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
            </form>
          </div>
        </div>
      </nav>
      {showLinkModal && (
        <LinkModal
          activeNote={activeNote}
          setShowLinkModal={setShowLinkModal}
          onEditField={onEditField}
        />
      )}
      {showLockModal && (
        <Modal
          setShowLockModal={setShowLockModal}
          lockNotePassword={lockNotePassword}
          onEditField={onEditField}
        />
      )}
    </>
  );
}

export default MenuBar;
