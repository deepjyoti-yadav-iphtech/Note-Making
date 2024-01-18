import React, { useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from "react-icons/md";
import { FaStrikethrough } from "react-icons/fa6";
const FontMenu = ({
  divsContent,
  setDivsContent,
  selectedLine,
  selectedText,
}) => {
  const [fontMenuselected, setFontMenuselected] = useState("");

  const handleTitleButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((content, index) => {
        if (index === selectedLine) {
          const newLine =
            document.querySelectorAll("[contentEditable]")[selectedLine];
          newLine.setAttribute(
            "style",
            "font-size: 1.75rem; font-weight: bold; "
          );
          console.log(newLine);
        }
        return content;
      });
      console.log(newDivsContent);

      setDivsContent(newDivsContent);
      // onEditField("text", divsContent);
    }
  };

  const handleHeadingButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((content, index) => {
        if (index === selectedLine) {
          const newLine =
            document.querySelectorAll("[contentEditable]")[selectedLine];
          newLine.setAttribute(
            "style",
            "font-size: 1.5rem; font-weight: bold; "
          );
        }
        return content;
      });

      setDivsContent(newDivsContent);
      // onEditField("text", divsContent);
    }
  };

  const handleSubHeadingButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((content, index) => {
        if (index === selectedLine) {
          const newLine =
            document.querySelectorAll("[contentEditable]")[selectedLine];
          newLine.setAttribute("style", "font-size: 1.25rem; ");
        }
        return content;
      });

      setDivsContent(newDivsContent);
      // onEditField("text", divsContent);
    }
  };

  const handleBodyButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((content, index) => {
        if (index === selectedLine) {
          const newLine =
            document.querySelectorAll("[contentEditable]")[selectedLine];
          newLine.setAttribute("style", "font-size: 1rem;");
        }
        return content;
      });

      setDivsContent(newDivsContent);
      // onEditField("text", divsContent);
    }
  };

  const handleMonospaceButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((content, index) => {
        if (index === selectedLine) {
          const newLine =
            document.querySelectorAll("[contentEditable]")[selectedLine];
          newLine.setAttribute(
            "style",
            "font-family: monospace; font-size: 1rem;"
          );
        }
        return content;
      });

      setDivsContent(newDivsContent);
      // onEditField("text", divsContent);
    }
  };

  const handleBulletButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((content, index) => {
        if (index === selectedLine) {
          const newLine =
            document.querySelectorAll("[contentEditable]")[selectedLine];
          newLine.setAttribute(
            "style",
            "display: list-item; margin-left: 20px;"
          );
          console.log(newLine);
        }
        return content;
      });

      setDivsContent(newDivsContent);
      // onEditField("text", divsContent);
    }
  };

  const handleNumberedButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((content, index) => {
        if (index === selectedLine) {
          const newLine =
            document.querySelectorAll("[contentEditable]")[selectedLine];
          newLine.setAttribute(
            "style",
            "display: list-item; list-style-type: decimal; margin-left: 20px;"
          );
          console.log(newLine);
        }
        return content;
      });

      setDivsContent(newDivsContent);
      // onEditField("text", divsContent);
    }
  };

  return (
    <>
      <li className="dropdown-item list-hover-separate rounded-0">
        <ol
          className="list-group list-group-horizontal  dropdown-menu dropdown-submenu list-submenu shadow-0 rounded-0"
          style={{
            backgroundColor: "rgb(255 251 245)",
          }}
        >
          <li className=" dropdown-item li-sub rounded-1">
            <MdFormatBold style={{ height: "25px", width: "25px" }} />
          </li>
          <li className=" dropdown-item li-sub rounded-1">
            <MdFormatItalic style={{ height: "25px", width: "25px" }} />
          </li>
          <li className=" dropdown-item li-sub rounded-1">
            <MdFormatUnderlined style={{ height: "25px", width: "25px" }} />
          </li>
          <li className=" dropdown-item li-sub rounded-1">
            <FaStrikethrough style={{ height: "20px", width: "20px" }} />
          </li>
        </ol>
      </li>
      <br />
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li
        className="dropdown-item fw-bold h3 mb-0 list-hover"
        onClick={(e) => {
          setFontMenuselected(e.target.textContent);
          handleTitleButtonClick();
        }}
      >
        Title
      </li>
      <li
        className="dropdown-item fw-bold h5 mb-0 list-hover"
        onClick={(e) => {
          setFontMenuselected(e.target.textContent);
          handleHeadingButtonClick();
        }}
      >
        Heading
      </li>
      <li
        className="dropdown-item h6 mb-0 list-hover"
        onClick={(e) => {
          setFontMenuselected(e.target.textContent);
          handleSubHeadingButtonClick();
        }}
      >
        SubHeading
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleBodyButtonClick();
          setFontMenuselected(e.target.textContent);
        }}
      >
        Body
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleMonospaceButtonClick();
          setFontMenuselected(e.target.textContent);
        }}
      >
        Monospace
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleBulletButtonClick();
          setFontMenuselected(e.target.textContent);
        }}
      >
        . Bulleted List
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          setFontMenuselected(e.target.textContent);
        }}
      >
        - Dashed List
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleNumberedButtonClick();
          setFontMenuselected(e.target.textContent);
        }}
      >
        1. Numbered list
      </li>
    </>
  );
};

export default FontMenu;
