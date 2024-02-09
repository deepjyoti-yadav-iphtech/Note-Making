import React from "react";
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
}) => {
  // const [fontMenuselected, setFontMenuselected] = useState("");

  const handleTitleButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((item, index) => {
        if (index === selectedLine) {
          return {
            ...item,
            style: { fontSize: "1.75rem", fontWeight: "bold" },
          };
        }
        return item;
      });
      setDivsContent(newDivsContent);
    }
  };

  const handleHeadingButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((item, index) => {
        if (index === selectedLine) {
          return {
            ...item,
            style: { fontSize: "1.5rem", fontWeight: "bold" },
          };
        }
        return item;
      });
      setDivsContent(newDivsContent);
    }
  };

  const handleSubHeadingButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((item, index) => {
        if (index === selectedLine) {
          return {
            ...item,
            style: { fontSize: "1.25rem" },
          };
        }
        return item;
      });
      setDivsContent(newDivsContent);
    }
  };

  const handleBodyButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((item, index) => {
        if (index === selectedLine) {
          return {
            ...item,
            style: { fontSize: "1rem" },
          };
        }
        return item;
      });
      setDivsContent(newDivsContent);
    }
  };

  const handleMonospaceButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((item, index) => {
        if (index === selectedLine) {
          return {
            ...item,
            style: { fontSize: "1rem", fontFamily: "monospace"},
          };
        }
        return item;
      });
      setDivsContent(newDivsContent);
    }
  };
 

  const handleBulletButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((item, index) => {
        if (index === selectedLine) {
          return {
            ...item,
            style: {display:"list-item", marginLeft:"20px"},
          };
        }
        return item;
      });
      setDivsContent(newDivsContent);
    }
  };

  const handleDashedButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((item, index) => {
        if (index === selectedLine) {
          return {
            ...item,
            style: {
              display: "list-item",
              marginLeft: "20px",
              listStyleType: "dashed",
            },
          };
        }
        return item;
      });
      setDivsContent(newDivsContent);
    }
  };

  const handleNumberedButtonClick = () => {
    if (selectedLine !== null) {
      const newDivsContent = divsContent.map((item, index) => {
        if (index === selectedLine) {
          return {
            ...item,
            style: {
              display: "list-item",
              marginLeft: "20px",
              listStyleType: "decimal",
            },
          };
        }
        return item;
      });
      setDivsContent(newDivsContent);
    }
  };

  function bold(tags) {
    document.execCommand("bold");
  }
  function italic(tags) {
    document.execCommand("italic");
  }
  function underline(tags) {
    document.execCommand("underline");
  }
  function strike(tags) {
    document.execCommand("strikeThrough");
  }

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
            <button
              className="border-0 font-button"
              style={{ borderRadius: "2px" }}
              onClick={() => {
                bold("b");
              }}
            >
              <MdFormatBold style={{ height: "25px", width: "25px" }} />
            </button>
          </li>
          <li className=" dropdown-item li-sub rounded-1">
            <button
              className="border-0 font-button"
              style={{ borderRadius: "2px" }}
              onClick={() => {
                italic("b");
              }}
            >
              <MdFormatItalic style={{ height: "25px", width: "25px" }} />
            </button>
          </li>
          <li className=" dropdown-item li-sub rounded-1">
            <button
              className="border-0 font-button"
              style={{ borderRadius: "2px" }}
              onClick={() => {
                underline("b");
              }}
            >
              <MdFormatUnderlined style={{ height: "25px", width: "25px" }} />
            </button>
          </li>
          <li className=" dropdown-item li-sub rounded-1">
            <button
              className="border-0 font-button"
              style={{ borderRadius: "2px" }}
              onClick={() => {
                strike("b");
              }}
            >
              <FaStrikethrough style={{ height: "20px", width: "20px" }} />
            </button>
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
          // setFontMenuselected(e.target.textContent);
          handleTitleButtonClick();
        }}
      >
        Title
      </li>
      <li
        className="dropdown-item fw-bold h5 mb-0 list-hover"
        onClick={(e) => {
          // setFontMenuselected(e.target.textContent);
          handleHeadingButtonClick();
        }}
      >
        Heading
      </li>
      <li
        className="dropdown-item h6 mb-0 list-hover"
        onClick={(e) => {
          // setFontMenuselected(e.target.textContent);
          handleSubHeadingButtonClick();
        }}
      >
        SubHeading
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleBodyButtonClick();
          // setFontMenuselected(e.target.textContent);
        }}
      >
        Body
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleMonospaceButtonClick();
          // setFontMenuselected(e.target.textContent);
        }}
      >
        Monospace
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleBulletButtonClick();
          // setFontMenuselected(e.target.textContent);
        }}
      >
        . Bulleted List
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleDashedButtonClick();
          // setFontMenuselected(e.target.textContent);
        }}
      >
        - Dashed List
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          handleNumberedButtonClick();
          // setFontMenuselected(e.target.textContent);
        }}
      >
        1. Numbered list
      </li>
    </>
  );
};

export default FontMenu;
