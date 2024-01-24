import React from "react";
import { useState } from "react";
import { FaLock } from "react-icons/fa";

const Locked = ({ lockNotePassword, onEditField }) => {
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === lockNotePassword) {
    //   console.log(inputPassword);
      onEditField("password", false);
    }else{
      alert('Wrong Password!');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <FaLock style={{ height: "100px", width: "100px" }} />
        </div>
        <h5 className="text-center">This note is locked.</h5>
        <p className="text-center">
          Enter the notes password to view locked notes.
        </p>
        <div className="d-flex justify-content-center align-items-center ">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Locked;
