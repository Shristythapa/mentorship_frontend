import { Outlet } from "react-router-dom";
import MenteeNavbar from "./MenteeNavbar";
import io from "socket.io-client"; // Import socket.io-client
import { getSessionById } from "../../Api/Api";
import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
const MenteeDashboard = () => {
  const email = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    const socket = io("http://localhost:5000"); // Connect to the server
    // Add event listeners to the socket

    socket.on("mentor-join", (ROOM_ID) => {
      const session = getSessionById(ROOM_ID);
      session.attendesSigned.some((attendee) => {
        if (attendee.email === session.mentor.email) {
          toast.info(session.title, "Session started");
        }
      });
    });

    socket.on("user-disconnected", (userId) => {
      toast.warn(`${userId} has left the room.`);
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, []);
  return (
    <div className="container-fluid" style={{ width: "100vw" }}>
      <div className="row">
        {/* Sidebar */}
        {/* <MenteeSidebar></MenteeSidebar> */}

        {/* Navbar */}
        <MenteeNavbar></MenteeNavbar>
      </div>

      {/* Main content */}
      <div
        className="row"
        style={{
          color: "#EEA025",
          minWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: "#F7F8FC",
        }}
      >
        <div className="col">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;
