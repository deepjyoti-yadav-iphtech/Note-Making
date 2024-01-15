import React from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from "react-icons/md";
import { FaStrikethrough } from "react-icons/fa6";
const FontMenu = ({ setFontMenuselected }) => {
  return (
    <>
      <li className="dropdown-item list-hover-separate rounded-0">
        <ol
          className="list-group list-group-horizontal  dropdown-menu dropdown-submenu list-submenu shadow-0 rounded-0"
          style={{
            backgroundColor: "rgb(255 251 245)",
          }}
        >
          <li className=" dropdown-item li-sub rounded-1" >
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
        className="dropdown-item fw-bold h4 mb-0 list-hover"
        onClick={(e) => {
          console.log(e.target.textContent);
          setFontMenuselected(e.target.textContent);
        }}
      >
        Title
      </li>
      <li
        className="dropdown-item h5 mb-0 list-hover"
        onClick={(e) => {
          console.log(e.target.textContent);
          setFontMenuselected(e.target.textContent);
        }}
      >
        Heading
      </li>
      <li
        className="dropdown-item h6 mb-0 list-hover"
        onClick={(e) => {
          console.log(e.target.textContent);
          setFontMenuselected(e.target.textContent);
        }}
      >
        SubHeading
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          console.log(e.target.textContent);
          setFontMenuselected(e.target.textContent);
        }}
      >
        Body
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          console.log(e.target.textContent);
          setFontMenuselected(e.target.textContent);
        }}
      >
        Monospace
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          console.log(e.target.textContent);
          setFontMenuselected(e.target.textContent);
        }}
      >
        . Bulleted List
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          console.log(e.target.textContent);
          setFontMenuselected(e.target.textContent);
        }}
      >
        - Dashed List
      </li>
      <li
        className="dropdown-item list-hover"
        onClick={(e) => {
          console.log(e.target.textContent);
          setFontMenuselected(e.target.textContent);
        }}
      >
        1. Numbered list
      </li>
    </>
  );
};

export default FontMenu;
