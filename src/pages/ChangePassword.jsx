import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordMentee, forgotPasswordMentor } from "../Api/Api";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role == "mentor") {
      console.log("forgot passsword menbtor");
      try {
        forgotPasswordMentor({ email: email }).then((res) => {
          if (res.data.success == true) {
            setSuccessMessage(true);
          } else {
            toast.error(res.data.message);
          }
        });
      } catch (e) {
        toast.error(e.message);
      }
    } else if (role == "mentee") {
      try {
        forgotPasswordMentee({ email: email }).then((res) => {
          if (res.data.success == true) {
            setSuccessMessage(true);
          } else {
            toast.error(res.data.message);
          }
        });
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("Select Your Role");
    }
  };
  return (
    <div
      style={{ backgroundColor: "#FDFBFF" }}
      className="d-flex justify-content-center align-items-center vh-100"
    >
      {successMessage ? (
        <div className="text-start h2 fw-bold mb-4 mx-1 mx-md-3 mt-3 text-success">
          Email Send!
        </div>
      ) : (
        <div className="bg-white p-5 rounded w-25 card shadow border-0">
          <p className="text-start h2 fw-bold mb-4 mx-1 mx-md-3 mt-3">
            Update Password
          </p>
          <form>
            <div className="d-flex flex-row align-items-center mb-4">
              <select
                onChange={(e) => setRole(e.target.value)}
                className="form-select form-select-md mb-2 mt-3"
                aria-label=".form-select-md example"
                defaultValue=""
              >
                <option disabled value="">
                  Select Role
                </option>
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="form3Example3c"
                className="form-control form-control-sm"
                placeholder="Enter Email"
                style={{ height: "40px", fontSize: "16px", color: "black" }}
              />
            </div>
            <Link
              to={"/login"}
              style={{ color: "purple", textDecoration: "none" }}
              className="d-flex  mb-2  text-end"
            >
              Go to login?
            </Link>

            <button
              onClick={handleSubmit}
              className="btn  w-100 rounded-3 "
              style={{
                backgroundColor: "#111111",
                color: "#ffffff",
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
