/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { BsUiChecks } from "react-icons/bs";
import { IoText } from "react-icons/io5";
import FontMenu from "./FontMenu";

function MenuBar({
  setCheckBoxBar,
  onUpdateNote,
  activeNote,
  searchWords,
  setSearchWords,
  isInputFocused,
  setIsInputFocused,
  setFontMenuselected,
  handleTitleButtonClick,
  handleHeadingButtonClick,
  handleSubHeadingButtonClick,
  handleBodyButtonClick,
  handleMonospaceButtonClick,
}) {
  // console.log(activeNote?.checkbox);

  // console.log(searchWords);
  const [showFontList, setShowFontList] = useState(false);
  const fontListRef = useRef(null);

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

  const onEditField = () => {
    onUpdateNote({
      ...activeNote,
      checkBoxBar: true,
    });
  };

  return (
    <nav
      className="navbar shadow-3 "
      style={{ backgroundColor: "rgb(255 251 245)", padding: "0.62rem" }}
    >
      <div className="container-fluid ">
        {/* <a className="navbar-brand">Menubar</a> */}
        <div className="d-flex gap-2 " style={{ marginLeft: "40%" }}>
          <div className="dropdown">
            <button
              className="p-1 border-0 btn shadow-0 btn-hover"
              data-mdb-auto-close="outside"
              onClick={() => {
                // console.log(opensortBy);
                setShowFontList(!showFontList);
              }}
              ref={fontListRef}
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
                  setFontMenuselected={setFontMenuselected}
                  handleTitleButtonClick={handleTitleButtonClick}
                  handleHeadingButtonClick={handleHeadingButtonClick}
                  handleSubHeadingButtonClick={handleSubHeadingButtonClick}
                  handleBodyButtonClick={handleBodyButtonClick}
                  handleMonospaceButtonClick={handleMonospaceButtonClick}
                />
              </ol>
            )}
          </div>
          <button
            className="p-1 border-0 btn shadow-0 btn-hover"
            onClick={() => {
              onEditField();
              setCheckBoxBar(true);
            }}
          >
            <BsUiChecks style={{ width: 25, height: 25, color: "black" }} />
          </button>
        </div>
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
    </nav>
  );
}

export default MenuBar;
