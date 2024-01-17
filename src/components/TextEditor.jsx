import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";

const TextEditor = ({ activeNote, onEditField, fontMenuselected }) => {
  // console.log(activeNote.textEditor);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     const elem = document.getElementById(`${activeNote.textEditor}`);
  //     console.log(elem?.textContent);
  //   }, 0);

  //   return () => clearTimeout(timeoutId);
  // }, [activeNote]);

  const [content, setContent] = useState(activeNote?.text || "");
  useEffect(() => {
    setContent(activeNote?.text || "");
  }, [activeNote]);
  // console.log(activeNote.text);

  const handleInput = (e) => {
    const newText = e.target.value;
    setContent(newText);
    onEditField("text", newText);
  };

  const handleCursorPosition = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const parentDiv = document.getElementById(activeNote.textEditor);
    const parentRange = document.createRange();
    parentRange.selectNodeContents(parentDiv);

    if (
      parentRange.compareBoundaryPoints(Range.START_TO_END, range) >= 0 &&
      parentRange.compareBoundaryPoints(Range.END_TO_START, range) <= 0
    ) {
      // Cursor is within the main div
      console.log("Cursor within the parent div:", content);
    } else {
      // Cursor is within one of the child divs
      const childDiv = range.commonAncestorContainer.closest("div");
      console.log("Cursor within a child div:", childDiv.innerHTML);
    }
  };


  return (
    <ContentEditable
      id={activeNote.textEditor}
      html={content}
      onChange={handleInput}
      tagName="div"
      onClick={handleCursorPosition}
      onBlur={handleCursorPosition}
      // className={activeNote.textEditor}
      style={{
        // height: 1000,
        width: "100%",
        border: "none",
        // verticalAlign: "middle",
        textAlign: "left",
        padding: 8,
        direction: "ltr",
      }}
    />
  );
};
export default TextEditor;
// const ref = useRef(null);
// useEffect(() => {
//   if (ref && ref.current) {
//     ref.current.textContent = activeNote?.text || "";
//   }
// }, [activeNote]);

// const handleInput = () => {
//   if (ref && ref.current) {
//     const newText = ref.current.textContent;
//     onEditField("text", newText);
//     console.log(newText);
//   }
// };
// const handletextAreaKeyDown = (e) => {
//   if (e.key === "Enter") {
//     e.preventDefault();

//     // Insert a line break
//     const selection = window.getSelection();
//     const range = selection.getRangeAt(0);
//     const br = document.createElement("br");

//     range.deleteContents();
//     range.insertNode(br);

//     // Set the caret position after the line break
//     const newRange = document.createRange();
//     newRange.setStartAfter(br);
//     newRange.setEndAfter(br);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
//   }
// };

// return (
//   <div
//     ref={ref}
//     // id="editable"
//     contentEditable={true}
//     onInput={handleInput}
//     onKeyDown={handletextAreaKeyDown}
//     style={{
//       height: 500,
//       width: 1500,
//       border: "1px solid black",

//       padding: 8,
//       direction: "ltr",
//     }}
//   ></div>
// );
