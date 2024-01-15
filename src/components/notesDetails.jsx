/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import MenuBar from "./menubar";
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
  const [textArea, setTextArea] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [fontMenuselected, setFontMenuselected] = useState("");
  // const words = activeNote?.text.split(/\s+/);
  // console.log(words);

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const handleTextAreaInput = (e) => {
    setTextArea(e?.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

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
    // Update checklist when activeNote changes
    setChecklist(
      activeNote ? activeNote.checkbox || [] : [{ text: "", checked: false }]
    );
  }, [activeNote]);

  return (
    <div id="section2">
      <MenuBar
        checkBoxBar={checkBoxBar}
        setCheckBoxBar={setCheckBoxBar}
        onUpdateNote={onUpdateNote}
        activeNote={activeNote}
        searchWords={searchWords}
        setSearchWords={setSearchWords}
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        setFontMenuselected={setFontMenuselected}
      />

      {activeNote ? (
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
              textToHighlight={activeNote.text}
            />
          ) : (
            <div className="form-outline">
              <textarea
                rows={10}
                className="form-control text-black "
                id="textAreaExample"
                value={activeNote.text}
                onChange={(e) => {
                  handleTextAreaInput(e);
                  onEditField("text", e.target.value);
                  // const newText = e.target.value;

                  // // Check for newlines
                  // const lines = newText.split("\n");

                  // // Apply different font sizes based on the selected font menu
                  // const formattedText = lines
                  //   .map((line, index) => {
                  //     if (fontMenuselected === "Title" && index === 0) {
                  //       return `<span style="font-size: 1.5rem">${line}</span>`;
                  //     } else if (fontMenuselected === "Heading") {
                  //       return `<span style="font-size: 1.25rem">${line}</span>`;
                  //     } else {
                  //       return line;
                  //     }
                  //   })
                  //   .join("\n");

                  // onEditField("text", formattedText);
                }}
                style={{
                  fontSize:
                    fontMenuselected === "Title"
                      ? "1.5rem "
                      : fontMenuselected === "Heading"
                      ? "1.25rem"
                      : "",
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="p-3">No Active Note</div>
      )}
    </div>
  );
}

export default NotesDetails;
