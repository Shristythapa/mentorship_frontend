// import backgroundImage from "../assets/img/formBackground.jpg";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createMentorSignupApi } from "../Api/Api";
import { toast } from "react-toastify";
const MentorForm = () => {
  const [tags, setTags] = useState([]);
  const [role, setRole] = useState("mentor");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const [inputValue, setInputValue] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  console.log(location);
  const handleAddTag = () => {
    if (!inputValue) return;
    setInputValue("");
    setTags([...tags, inputValue]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", location.state.username);
    formData.append("email", location.state.email);
    formData.append("password", location.state.password);
    formData.append("profilePicture", location.state.profileImage);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("address", address);
    tags.forEach((tag, index) => {
      formData.append(`skills[${index}]`, tag);
    });

    // making api call
    createMentorSignupApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          // console.log(res.data.message)
          //add toast to show error message
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
  };

  // handle remove
  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  return (
    <>
      <section>
        <div className="container">
          <div
            className="col-lg-12 col-xl-11 card text-black
            "
            style={{ borderRadius: "25px" }}
          >
            <div
              className="card text-black shadow"
              // data-aos="fade-up"
              // 
            >
              <div className=" card-body p-md-5">
                <div className="row align-items-center justify-content-start">
                  <div className="col-5 text-start h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Mentor form
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    id="form3Example1c"
                    className="form-control form-control-sm"
                    placeholder="Enter first name"
                    style={{ height: "40px" }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    id="form3Example1c"
                    className="form-control form-control-sm"
                    placeholder="Enter last Name"
                    style={{ height: "40px" }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <input
                    onChange={(e) => setDob(e.target.value)}
                    type="date"
                    id="form3Example1c"
                    className="form-control form-control-sm"
                    placeholder="Enter date of birth"
                    style={{ height: "40px" }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    id="form3Example1c"
                    className="form-control form-control-sm"
                    placeholder="Address"
                    style={{ height: "40px" }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="container d-flex ">
                    <div className="col-md-11 col-lg-6 col-xl-7  d-flex align-items-center ">
                      <input
                        placeholder="Enter skill"
                        type="text"
                        className="form-control"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#111111",
                        color: "#ffffff",
                      }}
                      className="btn btn-md pl-pr-5 col-md-2 col-lg-2 col-xl-2  d-flex align-items-center mr-10 "
                      onClick={handleAddTag}
                    >
                      Add Tag
                    </button>
                  </div>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        marginRight: "8px",
                        marginBottom: "8px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: "#000000", // Primary color
                        color: "#fff", // Text color
                      }}
                    >
                      {tag}{" "}
                      <button
                        className="button"
                        onClick={handleRemoveTag.bind(null, index)}
                        style={{
                          backgroundColor: "#fff", // Button background color - use your preferred color
                          color: "#000", // Button text color
                          border: "none",
                          padding: "4px 8px",
                          marginLeft: "4px",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-center mx-3 mb-2 mb-lg-3">
                <button
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "#111111",
                    color: "#ffffff",
                  }}
                  className="btn btn-md pl-pr-5"
                >
                  Submit
                </button>
              </div>
              <Link
                to={"/Signup"}
                style={{ color: "black", textDecoration: "none" }}
                className="d-flex justify-content-center mx-3 mb-2 mb-sm-3"
              ></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MentorForm;
