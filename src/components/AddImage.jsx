import React, { useState } from "react";

const AddImage = ({ img, index, onDeleteImage }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const handleDelete = () => {
    onDeleteImage(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Delete" && isSelected) {
      // If Delete key is pressed and image is selected, delete the image
      onDeleteImage(index);
    }
  };

  return (
    <div
      key={index}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0} 
    >
      <img
        src={img.url}
        alt={img.name}
        style={{
          border: isSelected ? "1px solid black" : "none",
          position: "relative",
        }}
      />
    </div>
  );
};

export default AddImage;
