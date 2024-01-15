import React from "react";

const Sortby = ({ setSortby }) => {
  return (
    <>
      <li
        value="name"
        onClick={(e) => {
          setSortby(e.target.textContent);
        }}
        className="dropdown-item border-0"
      >
        Name[A-Z]
      </li>
      <li
        value="cnew"
        onClick={(e) => {
          setSortby(e.target.textContent);
        }}
        className="dropdown-item border-0"
      >
        Created:Newest
      </li>
      <li
        value="cold"
        onClick={(e) => {
          setSortby(e.target.textContent);
        }}
        className="dropdown-item border-0"
      >
        Created:oldest
      </li>
      <li
        value="mnew"
        onClick={(e) => {
          setSortby(e.target.textContent);
        }}
        className="dropdown-item border-0"
      >
        Modified:Newest
      </li>
      <li
        value="mold"
        onClick={(e) => {
          setSortby(e.target.textContent);
        }}
        className="dropdown-item border-0"
      >
        Modified:oldest
      </li>
    </>
  );
};

export default Sortby;
