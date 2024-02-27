import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MentorForm from "./pages/MentorForm";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import VideoPage from "./pages/VideoCall";
import MenteeDashboard from "./pages/mentee/MenteeDashboard";
import Sessions from "./pages/mentee/Sessions";
import Mentors from "./pages/mentee/Mentors";
import "react-toastify/dist/ReactToastify.css";
import MentorSessions from "./pages/mentor/MentorSession";

import MentorPPForMentee from "./pages/mentee/MentorPPForMentee";

import MenteeArticles from "./pages/mentee/MenteeArticle";

// Add icons to the library
import MentorArticles from "./pages/mentor/MentorArticles";

import ForgotPassword from "./pages/ChangePassword";
import UpdatePassword from "./pages/UpdatePassword";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import VideoCallMentor from "./pages/mentor/VideoCallMentor";
import VideoCallMentee from "./pages/mentee/VideoCallMentee";
library.add(faEnvelope, faLock);

function App() {
  return (
    <Router>
      <ToastContainer></ToastContainer>

      <Routes>
        {/* public routes */}
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/mentorForm" element={<MentorForm></MentorForm>}></Route>

        {/* route to enter email and change and role to chaange pass */}
        <Route
          path="/changePassword"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>

        {/* if mentor enter new pass to update */}
        <Route
          path="/resetMentorPassword/:id/:token"
          element={<UpdatePassword></UpdatePassword>}
        ></Route>

        {/* if mentee enter new pass to update */}
        <Route></Route>

        <Route
          path="/passwordResetSuccess"
          element={<PasswordResetSuccess></PasswordResetSuccess>}
        ></Route>
        {/* 
        <Route
          path="/mentorPublicProfile"
          element={<MentorPublicProfile></MentorPublicProfile>}
        ></Route> */}
        <Route path="/video_call/:id" element={<VideoPage></VideoPage>}></Route>

        {/* mentor routes */}
        <Route path="mentor" element={<MentorDashboard></MentorDashboard>}>
          <Route
            path="mentorSessionDashboard"
            element={<MentorSessions></MentorSessions>}
          ></Route>

          <Route
            path="mentorArticleDashboard"
            element={<MentorArticles></MentorArticles>}
          ></Route>
        </Route>
        {/* <Route
          path="/mentorPublicProfileForMentor/:id"
          element={<MentorPPForMentor></MentorPPForMentor>}
        ></Route> */}

        {/* mentee routes */}
        <Route path="mentee" element={<MenteeDashboard></MenteeDashboard>}>
          <Route
            path="menteeSessionDashboard"
            element={<Sessions></Sessions>}
          ></Route>
          <Route
            path="menteeMentorDashboard"
            element={<Mentors></Mentors>}
          ></Route>
          <Route
            path="menteeArticleDashboard"
            element={<MenteeArticles></MenteeArticles>}
          ></Route>

          {/* <Route
                  path="menteeDashboard"
                  element={<MenteeDashboard></MenteeDashboard>}
                ></Route> */}
        </Route>

        {/* </Route> */}
        <Route
          path="/mentorPublicProfileForMentee/:id"
          element={<MentorPPForMentee></MentorPPForMentee>}
        ></Route>
        <Route
          path="mentor_video_call/:id"
          element={<VideoCallMentor></VideoCallMentor>}
        ></Route>
        <Route
          path="mentee_video_call/:id"
          element={<VideoCallMentee/>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

// import "./App.css";

// import Notification from "./PushNotification"

// function App() {

// return (
//   <div className="App">
//     <ToastContainer></ToastContainer>
//     <header className="App-header">
//       {/* <img src={logo} className="App-logo" alt="logo" /> */}

//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>

//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>

//     <Notification />
//   </div>
// );

// }

// export default App;
