import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import { createMenteeSignupApi, createMentorSignupApi } from "../Api/Api";
import sampleImage from "../assets/img/learning.avif";
// import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


const UploadImage = () => {
//   const navigate = useNavigate();

  return (
    <>
      <section
        className="min-vh-100 vh-100"
        style={{ backgroundColor: "#FDFBFF" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black shadow "
                data-aos="fade-up"
                style={{
                  boxShadow: "0 0 10px rgba(75, 1, 112, 0.1) !important",
                }}
              >
                <div className="card-body p-md-3">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-start h2 fw-bold mb-4 mx-1 mx-md-3 mt-3">
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-3">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <FontAwesomeIcon
                            icon="person"
                            className="fa-lg me-3 fa-fw"
                          />
                          <select
                            onChange={(e) => setRole(e.target.value)}
                            class="form-select form-select-md mb-2 mt-3"
                            aria-label=".form-select-md example"
                          >
                            <option disabled selected>
                              Select Role
                            </option>
                            <option value="mentee">Mentee</option>
                            <option value="mentor">Mentor</option>
                          </select>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="fa-lg me-2 fa-fw"
                          />
                          <div className="form-outline flex-fill mb-3">
                            <input
                              onChange={changeName}
                              type="text"
                              id="form3Example1c"
                              className="form-control form-control-sm"
                              placeholder="Enter name"
                              style={{ height: "40px" }}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="fa-lg me-2 fa-fw"
                          />
                          <div className="form-outline flex-fill mb-3">
                            <input
                              onChange={changeEmail}
                              type="email"
                              id="form3Example3c"
                              className="form-control form-control-sm"
                              placeholder="Enter Email"
                              style={{ height: "40px" }}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <FontAwesomeIcon
                            icon={faLock}
                            className="fa-lg me-2 fa-fw"
                          />
                          <div className="form-outline flex-fill mb-3">
                            <input
                              onChange={changePassword}
                              type="password"
                              id="form3Example4c"
                              className="form-control form-control-sm"
                              placeholder="Enter Password"
                              style={{ height: "40px" }}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-3 mb-2 mb-lg-3">
                          <button
                            onClick={handleSubmit}
                            style={{
                              backgroundColor: "#111111",
                              color: "#ffffff",
                            }}
                            className="btn btn-md"
                          >
                            Register
                          </button>
                        </div>
                        <Link
                          to={"/Login"}
                          className="d-flex justify-content-center mx-3 mb-2 mb-lg-3"
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          <a>Already have an account?</a>
                        </Link>
                      </form>
                    </div>
                    <div className="col-md-5 col-lg-6 col-md-7 d-flex align-items-center order-1 order-lg-2">
                      <Link to="/">
                        {" "}
                        <img
                          data-aos-delay="200"
                          src={sampleImage}
                          className="img-fluid"
                          alt="Sample image"
                          // style={{ maxWidth: "0%", height: "auto" }}
                        ></img>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadImage;
