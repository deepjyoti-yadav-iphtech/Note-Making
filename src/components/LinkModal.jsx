import React, { useState } from "react";

const LinkModal = ({ onEditField, setShowLinkModal, activeNote }) => {
  const [linkText, setLinkText] = useState("");

  const handleAddLink = () => {
    // Add the logic to handle adding the link to the activeNote
    // You can use the onEditField function to update the activeNote

    // Example: Assuming you have a field called 'links' in your activeNote
    const updatedLinks = activeNote?.links || [];
    updatedLinks.push(linkText);

    onEditField("links", updatedLinks);

    // Close the modal
    setShowLinkModal(false);
  };

  return (
    <div className="modal-overlay">
      <div>
        <div
          className="modal modal-dialog modal-dialog-centered "
          style={{ width: "500px" }}
        >
          <div
            className="modal-content "
            style={{ backgroundColor: "rgb(255 251 245)" }}
          >
            <form action="">
              <div className="modal-body pb-0">
                <div className="d-flex justify-content-center pb-3">
                  <img
                    src="/notes.png"
                    alt="prettier notes"
                    className=" w-10"
                    style={{ height: "60px" }}
                  />
                </div>
                <input
                  type="text"
                  id="text"
                  className={"w-100 form-control p-0 ps-1 border border-1"}
                  name="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center py-3">
                <button
                  type="button"
                  className="btn text-capitalize text-black p-1 px-4 btn-lg"
                  style={{ backgroundColor: "rgb(247 167 5 / 68%)" }}
                  data-mdb-ripple-init=""
                  onClick={handleAddLink}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
