import React, { useEffect } from "react";

const TextArea = ({
  activeNote,
  divsContent,
  setDivsContent,
  setSelectedLine,
}) => {
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     const message =
  //       "Once you reload your changes will be removed. Do you still wish to reload this?";
  //     event.returnValue = message; // Standard for most browsers
  //     return message; // For some older browsers
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      const newDivsContent = divsContent.reduce((acc, content, i) => {
        if (i === index) {
          return [...acc, content, ""];
        }
        return [...acc, content];
      }, []);

      // Update the state with the new array
      setDivsContent(newDivsContent);
      event.preventDefault();
      setTimeout(() => {
        const range = document.createRange();
        const sel = window.getSelection();
        const newLine =
          document.querySelectorAll("[contentEditable]")[index + 1];

        range.setStart(newLine, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      });

      // onEditField("text", newDivsContent);
    } else if (event.key === "Backspace" && divsContent[index] === "") {
      // Check if backspace is pressed and the current div is empty
      const newDivsContent = [...divsContent];
      const newIndex = Math.max(0, index - 1); // Ensure the index does not go below 0

      // Remove the current div
      newDivsContent.splice(index, 1);

      // Update the state with the new array
      setDivsContent(newDivsContent);
      event.preventDefault();

      setTimeout(() => {
        const range = document.createRange();
        const sel = window.getSelection();
        const newLine =
          document.querySelectorAll("[contentEditable]")[newIndex];

        if (newLine.childNodes.length > 0) {
          range.setStart(newLine, 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      });
    }
  };

  const handleContentChange = (event, index) => {
    // Update the content of the corresponding div in the array
    const newDivsContent = [...divsContent];
    newDivsContent[index] = event.target.textContent;
    setDivsContent(newDivsContent);
  };
  // const handleDivSelection = (index) => {
  //   const selectedDiv = document.getElementById(
  //     `${activeNote?.title}-${index}`
  //   );
  //   const Content = selectedDiv.textContent || selectedDiv.innerText;
  //   // Use Content as needed
  //   console.log(Content);
  // };

  return (
    <>
      {divsContent.map((content, index) => (
        <div
          id={`${activeNote?.title}-${index}`}
          key={index}
          contentEditable={true}
          onMouseUp={() => setSelectedLine(index)}
          onKeyDown={(event) => handleKeyPress(event, index)}
          onBlur={(event) => handleContentChange(event, index)}
          suppressContentEditableWarning={true}
        >
          {content}
        </div>
      ))}
    </>
  );
};

export default TextArea;
