/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik } from "formik";
import React, { useState } from "react";

const Modal = ({ setShowLockModal, lockNotePassword, onEditField }) => {
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === lockNotePassword) {
      onEditField("password", true);
      setShowLockModal(false);
    }else{
      alert("Wrong password!");
    }
  };

  return (
    <div>
      {lockNotePassword ? (
        <div className="modal-overlay">
          <div>
            <div
              className="modal modal-dialog modal-dialog-centered "
              style={{ width: "500px" }}
            >
              <div className="modal-content ">
                <form action="" onSubmit={handlePasswordSubmit}>
                  <div className="modal-body pb-0">
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src="/notes.png"
                          alt="prettier notes"
                          className=" w-10"
                          style={{ height: "60px" }}
                        />
                      </div>
                      <div className="col-md-10">
                        <h6 id="exampleModalLabel" className="pb-2">
                          Enter the notes password to lock this note.
                        </h6>

                        <div className="row">
                          <div className="col-md-3">
                            <p className="text-end">Password:</p>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="password"
                              id="password"
                              className={
                                "w-100 form-control p-0 ps-1 border border-1"
                              }
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="required"
                              name="password"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-top-0 pt-0">
                    <button
                      type="button"
                      className="btn p-1 px-2 text-capitalize text-black p-1 px-4 fw-normal"
                      data-mdb-ripple-init=""
                      data-mdb-dismiss="modal"
                      onClick={() => setShowLockModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn text-capitalize text-black p-1 px-4 fw-normal"
                      style={{ backgroundColor: "rgb(247 167 5 / 68%)" }}
                      data-mdb-ripple-init=""
                      onClick={handlePasswordSubmit}
                    >
                      Ok
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            password: "",
            vPassword: "",
            hint: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Required";
            }

            if (!values.vPassword) {
              errors.vPassword = "Required";
            } else if (values.vPassword !== values.password) {
              errors.vPassword = "Password should be matched";
            }
            if (!values.hint) {
              errors.hint = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // Store values in local storage
            localStorage.setItem("Password", values.password);

            // Close the modal
            setShowLockModal(false);

            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <div className="modal-overlay">
              <div>
                <div className="modal modal-dialog modal-dialog-centered shadow-4 mw-100">
                  <div className="modal-content ">
                    <form action="">
                      <div className="modal-body pb-0">
                        <h6 id="exampleModalLabel" className="pb-2">
                          Create a password for all your locked notes
                        </h6>

                        <div className="row">
                          <div className="col-md-3">
                            <p className="text-end">Password:</p>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="password"
                              id="password"
                              className={
                                "w-100 form-control p-0 ps-1 border border-1" +
                                (errors.password && touched.password
                                  ? " border border-danger"
                                  : "")
                              }
                              placeholder="required"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </span>
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-3">
                            <p className="text-end">Verify:</p>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="password"
                              id="vPassword"
                              className={
                                "w-100 form-control p-0 ps-1 border border-1" +
                                (errors.vPassword && touched.vPassword
                                  ? " border border-danger"
                                  : "")
                              }
                              placeholder="required"
                              value={values.vPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.vPassword &&
                                touched.vPassword &&
                                errors.vPassword}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <p className="text-end">Password Hint:</p>
                          </div>
                          <div className="col-md-9">
                            <textarea
                              type="text"
                              id="hint"
                              className={
                                "w-100 form-control p-0 ps-1 border border-1" +
                                (errors.hint && touched.hint
                                  ? " border border-danger"
                                  : "")
                              }
                              placeholder="recommended"
                              name="hint"
                              value={values.hint}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.hint && touched.hint && errors.hint}
                            </span>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-3"></div>
                          <div
                            className="col-md-9 pt-2"
                            style={{ fontSize: "12px" }}
                          >
                            <p>
                              IMPORTANT:If you forget this password ,you won't
                              be able to view your locked notes.
                              <a className="text-primary">Learn more...</a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer border-top-0 pt-0">
                        <button
                          type="button"
                          className="btn p-1 px-2 text-capitalize text-black p-1 px-4 fw-normal"
                          data-mdb-ripple-init=""
                          data-mdb-dismiss="modal"
                          onClick={() => setShowLockModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn text-capitalize text-black p-1 px-4 fw-normal"
                          style={{ backgroundColor: "rgb(247 167 5 / 68%)" }}
                          data-mdb-ripple-init=""
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                        >
                          Set Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Modal;
