import React from "react";

const FloatingActionButton = ({  children }) => {
  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "purple",
    color: "white",
    width: "50px",
    height: "50px",

    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  };



  return (
    <button
      data-bs-toggle="modal" // Add data-bs-toggle attribute
      data-bs-target="#exampleModal" // Add data-bs-target attribute
      aria-label="add"
      style={buttonStyle}
    >
      {children}
    </button>
  );
};

export default FloatingActionButton;
