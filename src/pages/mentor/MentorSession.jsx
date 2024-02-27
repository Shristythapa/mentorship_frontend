import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createSessionApi,
  findMentorByEmail,
  getSessionsOfMentor,
  startCall,
} from "../../Api/Api";
import { toast } from "react-toastify";
import { Card, Modal } from "react-bootstrap";
import { deleteSessionApi } from "../../Api/Api";
import { format, parseISO } from "date-fns";

const MentorSessions = () => {
  const navigate = useNavigate();
  const mentor = JSON.parse(localStorage.getItem("user"));

  // const [mentorId, setMentorId ] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDiscription] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [maxNumberOfAttendesTaking, setmaxNumberOfAttendesTaking] = useState(0);

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

  // create session function
  const handleCreateSession = async (e) => {
    e.preventDefault();

    const formateDate = new Date(selectedDate);

    const res = await findMentorByEmail(mentor.email);
    if (res.data.success == false) {
      return toast.error(res.data.message);
    }
    const foundMentor = res.data.mentor;

    if (
      (!foundMentor._id,
      !foundMentor.name ||
        !foundMentor.email ||
        !title ||
        !description ||
        !selectedDate ||
        !startTime ||
        !endTime ||
        !maxNumberOfAttendesTaking)
    ) {
      return toast.error("Enter all feilds");
    }

    const data = {
      mentorId: foundMentor._id,
      mentor: {
        name: foundMentor.name,
        email: foundMentor.email,
      },
      title: title,
      description: description,
      date: formateDate.toISOString().split("T")[0],
      startTime: startTime,
      endTime: endTime,
      maxNumberOfAttendesTaking: maxNumberOfAttendesTaking,
    };

    createSessionApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server error");
        console.log(err.message);
      });
    getSessions();
    handleCloseModal();
  };

  const [sessions, setSessions] = useState([]);

  const getSessions = () => {
    const myEmail = JSON.parse(localStorage.getItem("user")).email;
    findMentorByEmail(myEmail).then((mentorResponse) => {
      const mentorId = mentorResponse.data.mentor._id;

      getSessionsOfMentor(mentorId).then((res) => {
        setSessions(res.data.sessions);
      });
    });
  };

  useEffect(() => {
    getSessions();
  }, []);

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete this Session?"
    );
    if (!confirmDialog) {
      return;
    } else {
      deleteSessionApi(id).then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          // window.location.reload();
        } else {
          // toast.error(res.data.message);
        }
      });
    }
    getSessions();
  };

  const handleStart = (data) => {
    // if (getStatus(data.selectedDate) == "Completed") {
    //   return toast.error("Session Date Ended");
    // }
    startCall(data._id);
    navigate(`/mentor_video_call/${data._id}`, { state: data._id });
  };
  const getStatus = (sessionDate) => {
    const currentDate = new Date();
    const sessionDateTime = new Date(sessionDate);

    return sessionDateTime > currentDate ? "Upcoming" : "Completed";
  };

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
          style={{ backgroundColor: "#772C91", color: "#fff" }}
          onClick={() => {
            handleStart(session);
          }}
        >
          Start
        </button>

        <button
          className="btn btn-danger"
          type="submit"
          // style={{ backgroundColor: "#772C91", color: "#fff" }}
          onClick={() => handleDelete(session._id)}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between">
          <h2
            style={{ color: "#EEA025", fontSize: "28px", fontWeight: "bolder" }}
          >
            Your Sessions
          </h2>
          {/* <video ref={userVideoRef} autoPlay muted></video> */}
          <button
            type="button"
            className="btn "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ backgroundColor: "#EEA025", color: "#fff" }}
          >
            Add Sesion
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create new session
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    {/* title */}
                    <label className="form-">Session title</label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Session title"
                    ></input>
                    {/* discription */}
                    <br></br>
                    <label className="form-label">Session description</label>
                    <input
                      onChange={(e) => setDiscription(e.target.value)}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Session description"
                    ></input>

                    {/* date */}
                    <br></br>
                    <label className="form-label">Session date</label>
                    <input
                      onChange={(e) => setSelectedDate(e.target.value)}
                      type="date"
                      className="form-control mb-2"
                      min={new Date().toISOString().split("T")[0]} // Set the minimum date to the current date
                    />

                    {/* start time */}
                    <br></br>
                    <label className="form-label">Select start time</label>
                    <input
                      onChange={(e) => setStartTime(e.target.value)}
                      type="time"
                      className="form-control mb-2"
                    />

                    {/* end time */}
                    <br></br>
                    <label className="form-label">Select end time</label>
                    <input
                      onChange={(e) => setEndTime(e.target.value)}
                      type="time"
                      className="form-control mb-2"
                    />

                    {/* discription */}
                    <br></br>
                    <label className="form-label">
                      Max number of attendees taking
                    </label>
                    <input
                      onChange={(e) =>
                        setmaxNumberOfAttendesTaking(e.target.value)
                      }
                      type="number"
                      className="form-control mb-2"
                    ></input>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    style={{ backgroundColor: "#C48EEA", color: "#fff" }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateSession}
                    className="btn"
                    style={{ backgroundColor: "#772C91", color: "#fff" }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container m-1">
        <div className="row">
          {sessions.map((session) => (
            <div key={session.id} className="col-md-5 mb-5">
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
          ))}
        </div>
      </div>
    </>
  );
};

export default MentorSessions;
