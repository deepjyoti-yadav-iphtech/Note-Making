import React from "react";

const TextArea = ({
  onEditField,
  divsContent,
  setDivsContent,
  setSelectedLine,
  selectedLine
}) => {
  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      // Create a new array with the previous content and an empty string for the new div
      // Create a new array with the previous content and an empty string for the new div
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

      onEditField("text", newDivsContent);
    }
  };

  const handleContentChange = (event, index) => {
    // Update the content of the corresponding div in the array
    const newDivsContent = [...divsContent];
    newDivsContent[index] = event.target.textContent;
    setDivsContent(newDivsContent);
  };


  return (
    <>
      <div style={{ borderColor: "red" }}>
        {divsContent.map((content, index) => (
          <div
            key={index}
            contentEditable={true}
            onMouseUp={() => setSelectedLine(index)}
            onKeyDown={(event) => handleKeyPress(event, index)}
            onInput={(event) => handleContentChange(event, index)}
            suppressContentEditableWarning={true}
          >
            {content}
          </div>
        ))}
      </div>
    </>
  );
};

export default TextArea;
