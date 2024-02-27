import React, { useState } from "react";
import "./AppBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState(null);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Mentorship
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <div className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
              <div className="nav-item m-2 me-3">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="#"
                  onClick={() => handleNavItemClick(0)}
                >
                  <h6>Sessions</h6>
                </a>
              </div>
              <div className="nav-item m-2 me-3">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => handleNavItemClick(1)}
                >
                  <h6>Mentors</h6>
                </a>
              </div>
              <div className="nav-item m-2 me-3">
                <a
                  className="nav-link"
                  href="#"
                  tabIndex="-1"
                  onClick={() => handleNavItemClick(2)}
                >
                  <h6>Articles</h6>
                </a>
              </div>
              <div className="nav-item m-2 me-3">
                <a
                  className="nav-link"
                  href="#"
                  tabIndex="-1"
                  onClick={() => handleNavItemClick(3)}
                >
                  <h6>Contact</h6>
                </a>
              </div>
            </div>
            <form className="d-flex">
              <Link
                to={"/mentee/login"}
                className="btn btn-sm"
                style={{ backgroundColor: "#772C91", color: "#ffffff" }}
                type="submit"
              >
                <h6>Login</h6>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
