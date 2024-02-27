import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getMentorById,
  getSessionsOfMentor,
  getSessionById,
  joinSession,
} from "../../Api/Api";
import { Card, Modal } from "react-bootstrap";
import { format, parseISO } from "date-fns";
const MentorPPForMentee = () => {
  const mentee = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  // const id = location.state;
  const id = "65b4d70cad2f674bf8df5446";
  console.log(id);
  const [mentor, setMentor] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const handleShowModal = (sessionId) => {
    setSelectedSessionId(sessionId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSessionId(null);
    setShowModal(false);
  };
  const getStatus = (sessionDate) => {
    const currentDate = new Date();
    const sessionDateTime = new Date(sessionDate);

    return sessionDateTime > currentDate ? "Upcoming" : "Completed";
  };
  const registerToSession = async (id) => {
    console.log("session id: ", id);
    if (!mentee) {
      toast.error("Mentee No valid");
      handleCloseModal();
      return;
    }

    var res = await getSessionById(id);
    if (res.data.success === false) {
      toast.error(res.data.message);
      return;
    }

    console.log("session: ", res);
    console.log("sesssion: ", res.data.session);

    const session = res.data.session;

    if (session.noOfAttendesSigned >= session.maxNumberOfAttendesTaking) {
      toast.error("Session full");
      return;
    }
    console.log("mentor email:", session.mentor.email);
    console.log("attendesSigned:", session.attendesSigned);

    const isMentorAlreadyJoined = session.attendesSigned.some((attendee) => {
      console.log("Attendee email:", attendee.email);
      return attendee.email === mentee.email;
    });

    if (isMentorAlreadyJoined) {
      toast.error("Already joined");
      return;
    }

    const sessionData = {
      mentor: {
        name: session.mentor.name,
        email: session.mentor.email,
      },
      title: session.title,
      description: session.description,
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      attendeesSinged: [
        { email: mentee.email },
        ...(session.attendesSigned || []), // Use an empty array if session.attendesSigned is undefined
      ],
      noOfAttendesSigned: session.noOfAttendesSigned + 1,
      maxNumberOfAttendesTaking: session.maxNumberOfAttendesTaking,
    };
    joinSession(id, sessionData)
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

  const goBack = () => {
    navigate("/mentee/menteeMentorDashboard");
  };

  useEffect(() => {
    getMentorById(id).then((res) => {
      setMentor(res.data.mentor);
      console.log(mentor);
    });
    getSessionsOfMentor(id).then((res) => {
      setSessions(res.data.sessions);
    });
  }, []);
  const SessionModal = ({ session }) => (
    <Modal
      show={showModal && session._id === selectedSessionId}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{session.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Title: {session.title}</p>
        <p>Description: {session.description}</p>
        <p>Date: {format(parseISO(session.date), "yyyy-MM-dd")}</p>
        <p>Start Time: {session.startTime}</p>
        <p>End Time: {session.endTime}</p>
        <p>Max no of attendees: {session.maxNumberOfAttendesTaking}</p>
        <p>No of attendees enrolled: {session.noOfAttendesSigned}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleCloseModal}>
          Close
        </button>
        <button
          className="btn btn-secondary"
          type="submit"
          style={{ backgroundColor: "#EEA025", color: "#fff" }}
        >
          Join
        </button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-sm-12 col-md-4 col-xl-3 px-sm-4 px-3 bg-white  p-3 d-flex flex-column position-sticky top-0"
          style={{ minHeight: "100vh" }}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100 position-sticky top-0">
            <button
              className="btn position-absolute top-0 start-0 rounded-circle"
              style={{ backgroundColor: "#EEA025", color: "#fff" }}
              onClick={() => {
                goBack();
              }}
            >
              <i className="bi bi-x"></i>
            </button>

            <div className="justify-content-center align-items-center mt-5 w-100 text-center">
              <div className="w-100 align-items-center justify-content-center">
                <img
                  className="rounded-circle img-fluidm mx-auto"
                  src="https://github.com/mdo.png"
                  alt="Profile"
                  style={{ width: "120px", height: "120px" }}
                />
              </div>
              <br></br>
              <br></br>
              <h5 className="text-center mb-3">
                {!mentor ? "" : mentor.mentorProfileInformation.firstName}
              </h5>

              <br />
              <div className="w-100">
                <div className="p-3 bg-white rounded-top">
                  <h5>About me</h5>
                  <br />
                  <p>
                    Location:{" "}
                    {!mentor
                      ? "Not given"
                      : mentor.mentorProfileInformation.address}
                  </p>
                  <p>Phone no: {!mentor ? "Not given" : mentor.name}</p>
                  <p>Email: {!mentor ? "Not given" : mentor.email}</p>
                  <p>Age: </p>
                </div>
              </div>
              <h5>Experties</h5>
              <p className="m-3">
                {mentor ? (
                  mentor.mentorProfileInformation.skills == [] ? (
                    <>None</>
                  ) : (
                    mentor.mentorProfileInformation.skills.map((skill) => (
                      <span
                        style={{ backgroundColor: "#E7CEFF", color: "#fff" }}
                        className="badge m-1 p-2"
                        key={skill} // Don't forget to add a unique key for each item in the list
                      >
                        {skill}
                      </span>
                    ))
                  )
                ) : (
                  <div>None</div>
                )}
              </p>
            </div>
          </div>
        </div>

        <div
          className="col py-3 overflow-auto"
          style={{ backgroundColor: "#f7f8fc", color: "#EEA025" }}
        >
          <div className="row">
            {sessions == [] ? (
              <>No Sessions Available</>
            ) : (
              sessions.map((session) => (
                <div key={session.id} className="col-md-4 mb-4">
                  <Card>
                    <Card.Body>
                      <div
                        className="container d-flex "
                        style={{ justifyContent: "space-between" }}
                      >
                        <Card.Title>{session.title}</Card.Title>

                        <span
                          className={`mr-2 text-${
                            getStatus(session.date) === "Upcoming"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {getStatus(session.date)}
                        </span>
                      </div>

                      <hr />
                      <Card.Subtitle className="mb-2 text-muted">
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

                      <button
                        // style={{ backgroundColor: "#EEA025", color: "#fff" }}
                        // variant="primary"
                        className="mt-3 btn"
                        onClick={() => handleShowModal(session._id)}
                        style={{ backgroundColor: "#772C91", color: "#fff" }}
                      >
                        View Session
                      </button>
                      <SessionModal session={session} />
                    </Card.Body>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPPForMentee;
