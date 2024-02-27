import React, { useEffect, useState } from "react";
import { getAllMentorsApi } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMentorsApi().then((res) => {
      if (res.data.success == false) {
        return toast.error(res.data.message);
      }
      setMentors(res.data.mentors);
      console.log(res.data.mentors);
    });
  }, []);

  const viewMentor = (data) => {
    console.log(data._id);
    navigate(`/mentorPublicProfileForMentee/${data._id}`, {
      state: data._id,
    });
  };

  return (
    <div
      className="col py-3"
      style={{ backgroundColor: "#f7f8fc", color: "#EEA025" }}
    >
      <div className="">
        <div className=" d-flex justify-content-between align-items-center">
          <header
            className="col-6 "
            style={{ color: "#EEA025", fontSize: "28px", fontWeight: "bolder" }}
          >
            <h4> Mentors</h4>
          </header>
          <div className="col-2 text-end"></div>
        </div>

        <div className="col-lg-12">
          <div className="row gy-4">
            {mentors.map((mentor) => (
              <div
                className="col-md-3 col-sm-12"
                onClick={() => {
                  viewMentor(mentor);
                }}
              >
                <div
                  className="info-box card p-3 d-flex flex-column align-items-center border-0 shadow-sm  "
                  style={
                    {
                      // backgroundColor: "#E7CEFF",
                      // boxShadow: "0 8px 16px #E7CEFF",
                    }
                  }
                >
                  <img
                    src={mentor.profileUrl}
                    alt="hugenerd"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                  <h3>{mentor.mentorProfileInformation.firstName}</h3>
                  <p className="m-3">
                    {mentor.mentorProfileInformation.skills.map((skill) => (
                      <span
                        style={{ backgroundColor: "#E7CEFF", color: "#fff" }}
                        className="badge m-1 p-2"
                        key={skill} // Don't forget to add a unique key for each item in the list
                      >
                        {skill}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
