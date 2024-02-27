import { useLocation, useNavigate } from "react-router-dom";

import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import "../assets/css/style.css";
import VideoCard from "../components/VideoCard";
import { endCall, startCall } from "../Api/Api";

const VideoPage = () => {
  const navigate = useNavigate();

  // Object Destructuring
  const { state } = useLocation();
  const { ROOM_ID } = state || {};

  //   const [user, setUser] = useState("");

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const [myVideoStream, setMyVideoStream] = useState(null);

  const myVideo = document.createElement("video");

  const videoGrid = useRef();
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = "hello";

  useEffect(() => {
    const socket = io("http://localhost:5000");
    myVideo.muted = true;
    console.log("rOOM ID", ROOM_ID);
    const peer = new Peer({
      host: "localhost",
      port: 5000,
      path: "/peerjs",
      config: {
        iceServers: [
          { url: "stun:stun01.sipphone.com" },
          { url: "stun:stun.ekiga.net" },
          { url: "stun:stunserver.org" },
          { url: "stun:stun.softjoys.com" },
          { url: "stun:stun.voiparound.com" },
          { url: "stun:stun.voipbuster.com" },
          { url: "stun:stun.voipstunt.com" },
          { url: "stun:stun.voxgratia.org" },
          { url: "stun:stun.xten.com" },
          {
            url: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            url: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
        ],
      },

      debug: 3,
    });

    peer.on("open", (id) => {
      console.log("my id is" + id);
      socket.emit("join-room", ROOM_ID, id, user._id);
    });

    // export const endCall = (id) => Api.get(`/session/endCall/${id}`);
    if (user._id == state.mentorId) {
      startCall(state._id);
    }
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        setMyVideoStream(stream);
        addVideoStream(myVideo, stream, user._id);
        console.log("streeming");
        peer.on("call", (call) => {
          console.log(call);
          console.log("someone call me");
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });
        socket.on("user-connected", (userId) => {
          console.log(userId, "user connected");
          connectToNewUser(userId, stream);
        });
        socket.on("user-disconnected", (userId) => {
          console.log(userId, " disconnected");
        });
      });
    const connectToNewUser = (userId, stream) => {
      console.log("I call someone" + userId);

      // Check if a video element with the same userId already exists
      if (!document.querySelector(`video[data-peer-id="${userId}"]`)) {
        const call = peer.call(userId, stream);
        const video = document.createElement("video");

        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream, userId);
        });

        call.on("close", () => {
          video.remove();
        });
      }
    };

    const handleBeforeUnload = () => {
      // Emit a "disconnect" event to the server before leaving the page
      socket.emit("disconnect");
      if (user._id == state.mentorId) {
        endCall(state._id);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Cleanup: Disconnect the socket when the component unmounts
      socket.disconnect();
      peer.destroy();

      // Stop video and audio tracks when leaving the page
      if (myVideoStream) {
        console.log("my video streem ", myVideoStream);
        const videoTrack = myVideoStream.getVideoTracks()[0];
        const audioTrack = myVideoStream.getAudioTracks()[0];

        if (videoTrack) videoTrack.stop();
        if (audioTrack) audioTrack.stop();
      }
    };
  }, []);

  const addVideoStream = (video, stream, peerId) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
      video.setAttribute("data-peer-id", peerId); // Set data attribute for peerId
      videoGrid.current.append(video);
    });
  };

  const toggleVideoHandler = () => {
    if (myVideoStream) {
      const videoTrack = myVideoStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoPaused;
        setIsVideoPaused(!isVideoPaused);
      }
    }
  };

  const muteButtonHandler = () => {
    if (myVideoStream) {
      const audioTrack = myVideoStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioMuted;
        setIsAudioMuted(!isAudioMuted);
      }
    }
  };

  const callEnd = () => {
    if (myVideoStream) {
      const videoTrack = myVideoStream.getVideoTracks()[0];
      const audioTrack = myVideoStream.getAudioTracks()[0];

      if (videoTrack) videoTrack.stop();
      if (audioTrack) audioTrack.stop();

      if (user._id == state.mentorId) {
        endCall(state._id);
      }
    }

    navigate(-1);
  };

  return (
    <div>
      <div style={{ backgroundColor: "#501366" }} className="header">
        <div className="logo">
          <div className="header__back">
            <i className="fas fa-angle-left"></i>
          </div>
          <h3 style={{ fontFamily: "monospace" }}>Video Chat</h3>
        </div>
      </div>
      <div className="main">
        <div
          className="videos__group"
          style={{ minHeight: "100vh ", overflowY: "auto" }}
        >
          <div id="video-grid" ref={videoGrid}></div>
        </div>

        <div className="options" style={{ backgroundColor: "#501366" }}>
          <div className="options__left">
            <div
              style={{ backgroundColor: "#EEA025" }}
              id="stopVideo"
              onClick={muteButtonHandler}
              className="options__button"
            >
              {/* Your component content */}

              {isAudioMuted ? (
                <i class="bi bi-mic-mute-fill"></i>
              ) : (
                <i class="bi bi-mic-fill"></i>
              )}

              {/* <i class="bi bi-mic"></i> */}
            </div>
            <div
              style={{ backgroundColor: "#EEA025" }}
              id="muteButton"
              onClick={toggleVideoHandler}
              className="options__button"
            >
              {/* Your component content */}

              {isVideoPaused ? (
                <i class="bi bi-camera-video-off-fill"></i>
              ) : (
                <i class="bi bi-camera-video-fill"></i>
              )}

              {/* <i class="bi bi-camera-video"></i> */}
            </div>
            <div
              style={{ backgroundColor: "#EEA025" }}
              id="callEnd"
              onClick={callEnd}
              className="options__button"
            >
              <i class="bi bi-telephone-x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
