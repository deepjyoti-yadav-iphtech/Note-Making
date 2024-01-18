/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import MenuBar from "./menubar";
import TextArea from "./TextArea";
import Highlighter from "react-highlight-words";

function NotesDetails({
  activeNote,
  onUpdateNote,
  checkBoxBar,
  setCheckBoxBar,
}) {
  const [checklist, setChecklist] = useState(
    activeNote ? activeNote.checkbox || [] : [{ text: "", checked: false }]
  );
  const [searchWords, setSearchWords] = useState("");
  const [focusedInputIndex, setFocusedInputIndex] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [divsContent, setDivsContent] = useState([""]);

  useEffect(() => {
    if (activeNote && activeNote.text) {
      setDivsContent(activeNote.text);
    }
  }, [activeNote?.text]);

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  // const handleTextAreaInput = (e) => {
  //   setTextArea(e?.target.value);
  //   e.target.style.height = "auto";
  //   e.target.style.height = `${e.target.scrollHeight}px`;
  // };

  const handleCheckboxChange = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].checked = !updatedChecklist[index].checked;
    setChecklist(updatedChecklist);
    onEditField("checkbox", updatedChecklist);
  };
  // console.log(activeNote?.textEditor);
  const handleAddItem = () => {
    const updatedChecklist = [...checklist, { text: "", checked: false }];
    setChecklist(updatedChecklist);
    // console.log(checklist);
    setFocusedInputIndex(updatedChecklist.length - 1);
    onEditField("checkbox", updatedChecklist);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedText = checklist[index].text.trim();
      if (trimmedText !== "") {
        handleAddItem();
      }
    } else if (e.key === "Backspace" && checklist[index].text === "") {
      e.preventDefault();
      handleRemoveItem(index);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist.splice(index, 1);
    setChecklist(updatedChecklist);
    if (index > 0) {
      setFocusedInputIndex(index - 1);
    }
    onEditField("checkbox", updatedChecklist);
    // console.log(checklist.length, index);
    if (index === 0) {
      // console.log("empty");
      onEditField("checkBoxBar", "");
      setCheckBoxBar(false);
    }
  };

  useEffect(() => {
    const inputRef = document.getElementById(`input-${focusedInputIndex}`);
    if (inputRef) {
      inputRef.focus();
    }
  }, [focusedInputIndex]);

  useEffect(() => {
    // Save divsContent to local storage whenever it changes

    onEditField("text", divsContent);
  }, [divsContent]);

  useEffect(() => {
    // Update checklist when activeNote changes
    setChecklist(
      activeNote ? activeNote.checkbox || [] : [{ text: "", checked: false }]
    );
  }, [activeNote]);

  // console.log(activeNote?.text.join(""));

  return (
    <div id="section2">
      {activeNote ? (
        <>
          <MenuBar
            checkBoxBar={checkBoxBar}
            setCheckBoxBar={setCheckBoxBar}
            onUpdateNote={onUpdateNote}
            activeNote={activeNote}
            searchWords={searchWords}
            setSearchWords={setSearchWords}
            isInputFocused={isInputFocused}
            setIsInputFocused={setIsInputFocused}
            divsContent={divsContent}
            setDivsContent={setDivsContent}
            selectedLine={selectedLine}
          />

          <div className="p-3">
            <h3 className="text-black">{activeNote.title}</h3>
            {activeNote.checkBoxBar && (
              <ul>
                {checklist.map((item, index) => (
                  <li key={index} className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <input
                      id={`input-${index}`}
                      className="w-100"
                      style={{
                        border: "none",
                        outline: "none",
                        marginLeft: "5px",
                      }}
                      type="text"
                      value={item.text}
                      onChange={(e) => {
                        const updatedChecklist = [...checklist];
                        updatedChecklist[index].text = e.target.value;
                        setChecklist(updatedChecklist);
                        onEditField("checkbox", updatedChecklist);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </li>
                ))}
              </ul>
            )}
            {searchWords && isInputFocused ? (
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[`${searchWords}`]}
                autoEscape={true}
                textToHighlight={activeNote.text.join("")}
              />
            ) : (
              <TextArea
                onEditField={onEditField}
                activeNote={activeNote}
                divsContent={divsContent}
                setDivsContent={setDivsContent}
                setSelectedLine={setSelectedLine}
                selectedLine={selectedLine}
              />
            )}
          </div>
        </>
      ) : (
        <div className="p-3">No Active Note</div>
      )}
    </div>
  );
}

export default NotesDetails;
