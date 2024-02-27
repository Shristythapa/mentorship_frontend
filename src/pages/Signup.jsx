import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { createMenteeSignupApi, createMentorSignupApi } from "../Api/Api";
import sampleImage from "../assets/img/learning.avif";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// ... (your existing imports)

const Signup = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  //make useState for image
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //function for image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const navigate = useNavigate();

  const mentorForm = (username, email, password, profileImage) => {
    console.log("profile image", profileImage);
    navigate("/mentorForm", {
      state: {
        username: username,
        email: email,
        password: password,
        profileImage: profileImage,
      },
    });
  };

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPasword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, profileImage);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", profileImage);
    console.log(formData);

    console.log("profile image", profileImage);
    console.log(role);
    if (role === "mentee") {
      console.log(formData);
      createMenteeSignupApi(formData)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            navigate("/login");
          }
        })
        .catch((err) => {
          toast.error("Server error");
          console.log(err.message);
        });
    } else if (role === "mentor") {
      //route to mentor form page
      if (name || email || password || profileImage) {
       return mentorForm(name, email, password, profileImage);
      }
      toast.error("Enter all Feilds");
    } else {
      toast.error("Please Choose a role");
    }
  };

  return (
    <>
      <section className="" style={{ backgroundColor: "#FDFBFF" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black shadow "
                // data-aos="fade-up"
                style={{
                  boxShadow: "0 0 10px rgba(75, 1, 112, 0.1) !important",
                }}
              >
                <div className="card-body p-md-3">
                  <p className="text-center h2 fw-bold mb-4 mx-1 mx-md-3 mt-3">
                    Sign up
                  </p>
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <form className="mx-1 mx-md-3">
                        <div className="profile-avatar text-center">
                          <label
                            htmlFor="imageInput"
                            className="avatar-container"
                          >
                            {previewImage ? (
                              <img
                                className="avatar-img"
                                src={previewImage}
                                alt="Profile"
                              />
                            ) : (
                              <div className="avatar-text">Profile</div>
                            )}
                          </label>
                          <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                          />
                        </div>
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

                    <div className="col-md-9 col-lg-5 col-xl-6 d-flex align-items-center order-1 order-lg-1">
                      <Link to="/">
                        <img
                          src={sampleImage}
                          className="img-fluid"
                          alt="Sa mple "
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

export default Signup;
