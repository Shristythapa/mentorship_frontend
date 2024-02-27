import React from "react";
import { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updateMentorPassword } from "../Api/Api";


function UpdatePassword() {
  const [password, setPassword] = useState();
  const { id, token } = useParams();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMentorPassword(id, token, { password: password })
      .then((res) => {
        if (res.data.success === true) {
        navigate("/passwordResetSuccess");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{ backgroundColor: "#FDFBFF" }}
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div className="bg-white p-5 rounded w-25 card shadow border-0">
        <p className="text-start h2 fw-bold mb-4 mx-1 mx-md-3 mt-3">
          Update Password
        </p>
        <form>
          <div className="d-flex flex-row align-items-center mb-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="form3Example3c"
              className="form-control form-control-sm"
              placeholder="Enter New Password"
              style={{ height: "40px", fontSize: "16px", color: "black" }}
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="btn  w-100 rounded-3 "
            style={{
              backgroundColor: "#111111",
              color: "#ffffff",
            }}
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
