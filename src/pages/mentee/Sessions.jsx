import { React, useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import {
  getAllSessionsApi,
  getSessionById,
  joinSession,
  startCall,
} from "../../Api/Api";
import "../../assets/css/start.css";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const Sessions = () => {
  const mentee = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (sessionId) => {
    setSelectedSessionId(sessionId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSessionId(null);
    setShowModal(false);
  };

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getAllSessionsApi().then((res) => {
      setSessions(res.data.sessions);
      console.log(res.data.sessions);
    });
  }, []);

  const handleJoinCall = (data) => {
    startCall(data._id);
    navigate(`/mentee_video_call/${data._id}`, { state: data });
  };

  const getStatus = (sessionDate) => {
    const currentDate = new Date();

    try {
      const sessionDateTime = new Date(sessionDate);

      if (isNaN(sessionDateTime)) {
        throw new Error("Invalid date format");
      }

      return sessionDateTime > currentDate ? "Upcoming" : "Completed";
    } catch (error) {
      console.error(`Error parsing date: ${error.message}`);
      return "Error";
    }
  };

  const handleStart = (data) => {
    navigate(`/mentee_video_call/${data._id}`, { state: data._id });
  };

  const registerToSession = async (id, data) => {
    console.log("session id: ", id);
    if (!mentee) {
      toast.error("Mentee No valid");
      handleCloseModal();
      return;
    }

    joinSession(id, data)
      .then((res) => {
        if (res.data && res.data.success === true) {
          window.location.reload();
          toast.success(res.data.message);
          return;
        } else if (res.data && res.data?.success === false) {
          toast.error(res.data.message);
          return;
        } else {
          // Handle other cases if needed
          toast.error("Unexpected response format");
          return;
        }
      })
      .catch((error) => {
        // Handle the case when the promise is rejected
        console.error("Error joining session:", error.message);
        toast.error("Error joining session. Please try again.");
        return;
      });
  };

  const isMentorAlreadyJoined = (session) =>
    session.attendesSigned.some((attendee) => {
      console.log("Attendee email:", attendee.email);
      console.log("Attendee email:", session.mentor.email);
      console.log(attendee.email === session.mentor.email);
      return attendee.email === mentee.email;
    });

  const SessionModal = ({ session }) => (
    <Modal
      show={showModal && session._id === selectedSessionId}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{session.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Date: {format(parseISO(session.date), "yyyy-MM-dd")}</p>
        <p>
          Time: {session.startTime} to {session.endTime}{" "}
        </p>

        <p>Mentor: {session.mentor.name}</p>

        <p>Description: {session.description}</p>
        {/* Add more fields with detailed information if needed */}
        <p>Max no of attendees taking: {session.maxNumberOfAttendesTaking}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        {isMentorAlreadyJoined(session) ? (
          // <button
          //   className="btn"
          //   onClick={() => {
          //     handleStart(session);
          //   }}
          //   style={{ backgroundColor: "#EEA025", color: "#fff" }}
          // >
          //   Start Session
          // </button>
          <div></div>
        ) : (
          <button
            className="btn"
            onClick={() => {
              var user = JSON.parse(localStorage.getItem("user"));
              const data = {
                menteeEmail: user.email,
                menteeId: user._id,
              };
              registerToSession(session._id, data);
            }}
            style={{ backgroundColor: "#EEA025", color: "#fff" }}
          >
            Join Session
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );

  return (
    <div
      className="container m-3 p-3 "
      style={{ maxWidth: "100vw", backgroundColor: "#F7F8FC" }}
    >
      <h2 style={{ color: "#EEA025", fontSize: "28px", fontWeight: "bolder" }}>
        Sessions
      </h2>
      <div className="row">
        {sessions.map((session) => (
          <div key={session.id} className="col-md-4 mb-4 ">
            <Card
              className="rounded-7 p-4"
              style={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            >
              <Card.Body>
                <div
                  className="container d-flex "
                  style={{ justifyContent: "space-between" }}
                >
                  <Card.Title className="text-truncate">
                    {session.title}
                  </Card.Title>

                  <span
                    className={`mr-2  text-${
                      getStatus(session.date) === "Upcoming"
                        ? "success font-weight-bold font-italic"
                        : "danger font-weight-bold font-italic"
                    }`}
                  >
                    {getStatus(session.date)}
                  </span>
                </div>

                <hr />
                <Card.Subtitle className="mb-2 text-muted text-truncate">
                  {session.description}
                </Card.Subtitle>

                <div className="d-flex align-items-center">
                  {/* <Card.Subtitle className="col">
                          {session.mentorId}
                        </Card.Subtitle> */}
                  {/* <img
                    src={session.mentor.imageUrl}
                    alt={session.mentor.name}
                    width="30"
                    height="30"
                    className="rounded-circle ml-2 align-self-end"
                  /> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {isMentorAlreadyJoined(session) && (
                    <span className="text-success font-weight-bold font-italic ml-2">
                      Joined
                    </span>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: session.isOngoing
                        ? "space-between"
                        : "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {session.isOngoing && (
                      <button
                        className="mt-3 me-3 btn flashy-button"
                        onClick={() => handleJoinCall(session)}
                        style={{ backgroundColor: "#EEA025", color: "#fff" }}
                      >
                        Join Call
                      </button>
                    )}
                    <button
                      className="mt-3 btn"
                      onClick={() => handleShowModal(session._id)}
                      style={{ backgroundColor: "#772C91", color: "#fff" }}
                    >
                      View Session
                    </button>
                  </div>
                </div>

                <SessionModal session={session} />
              </Card.Body>
            </Card>
          </div>
          ///
        ))}
      </div>
    </div>
  );
};

export default Sessions;
