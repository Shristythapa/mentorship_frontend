import { Outlet } from "react-router-dom";

import MentorNavbar from "./MentorNavbar";

const MentorDashboard = () => {
  return (
    <div className="container-fluid" style={{ width: "100vw" }}>
      <div className="row">
        {/* Sidebar */}
        {/* <MenteeSidebar></MenteeSidebar> */}

        {/* Navbar */}
        <MentorNavbar></MentorNavbar>
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

export default MentorDashboard;
