/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import MenuBar from "./Menubar";
import TextArea from "./TextArea";
import Highlighter from "react-highlight-words";
import Locked from "./Locked";
import Table from "./Table";
import AddImage from "./AddImage";

function NotesDetails({
  setNotes,
  activeNote,
  onUpdateNote,
  lockNotePassword,
}) {
  const [checklist, setChecklist] = useState(
    activeNote ? activeNote.checkbox || [] : [{ text: "", checked: false }]
  );
  const [checkBoxBar, setCheckBoxBar] = useState(false);
  const [searchWords, setSearchWords] = useState("");
  const [focusedInputIndex, setFocusedInputIndex] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [divsContent, setDivsContent] = useState(
    activeNote ? activeNote.text || [] : [{ content: "", style: {} }]
  );
  const [imagesByNote, setImagesByNote] = useState({});
  let arr = [];
  for (let i = 0; i < divsContent.length; i++) {
    arr.push(divsContent[i].content);
  }

  const images = imagesByNote[activeNote?.id] || [];

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = e.dataTransfer.files;
    handleNewImages(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNewImages = (imageList) => {
    const newImagesInfo = Array.from(imageList).map((image) => ({
      name: image.name,
      url: URL.createObjectURL(image),
    }));

    setImagesByNote((prevImagesByNote) => ({
      ...prevImagesByNote,
      [activeNote?.id]: [
        ...(prevImagesByNote[activeNote?.id] || []),
        ...newImagesInfo,
      ],
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImagesByNote((prevImagesByNote) => ({
      ...prevImagesByNote,
      [activeNote?.id]: updatedImages,
    }));
  };

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
  // console.log(divsContent);
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
    onEditField("text", divsContent);
  }, [divsContent]);

  useEffect(() => {
    // Update checklist when activeNote changes
    setChecklist(
      activeNote ? activeNote.checkbox || [] : [{ text: "", checked: false }]
    );
  }, [activeNote]);

  return (
    <div id={`section${activeNote?.id}`}>
      <MenuBar
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
        setSelectedLine={setSelectedLine}
        handleNewImages={handleNewImages}
        lockNotePassword={lockNotePassword}
        setNotes={setNotes}
      />

      {activeNote ? (
        activeNote.password ? (
          <Locked
            lockNotePassword={lockNotePassword}
            onEditField={onEditField}
          />
        ) : (
          <>
            <div className="p-3" id={`section2${activeNote.id}`}>
              <h3 className="text-black mb-2">{activeNote.title}</h3>
              {activeNote.checkBoxBar && (
                <ul>
                  {checklist.map((item, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
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
              {/* <Table /> */}
              {searchWords && isInputFocused ? (
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[`${searchWords}`]}
                  autoEscape={true}
                  textToHighlight={arr.join()}
                />
              ) : (
                <TextArea
                  activeNote={activeNote}
                  divsContent={divsContent}
                  setDivsContent={setDivsContent}
                  setSelectedLine={setSelectedLine}
                />
              )}
              {activeNote?.links !== undefined && (
                <ul>
                  {activeNote?.links.map((link, index) => (
                    <li key={index} className="list-group-item">
                      <a href={link}>{link}</a>
                    </li>
                  ))}
                </ul>
              )}

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                  // border: "2px dashed #ccc",
                  height: "1024px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {images.map((img, index) => (
                  <AddImage
                    img={img}
                    index={index}
                    onDeleteImage={handleDeleteImage}
                  />
                ))}
              </div>
            </div>
          </>
        )
      ) : (
        <div className="p-3">No Active Note</div>
      )}
    </div>
  );
}

export default NotesDetails;
