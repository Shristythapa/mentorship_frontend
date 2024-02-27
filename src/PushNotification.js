import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Sendrequest, onMessager } from "./firebase";

const PushNotification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    Sendrequest();

    onMessager()
      .then((payload) => {
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });
      })
      .catch((err) => console.log("failed:", err));
  }, []);

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  const notify = () => {
    toast.info(<ToastDisplay notification={notification} />);
  };

  return (
    <>
      <ToastContainer />
      {/* Rest of your component */}
    </>
  );
};

function ToastDisplay({ notification }) {
  return (
    <div>
      <p>
        <b>{notification?.title}</b>
      </p>
      <p>{notification?.body}</p>
    </div>
  );
}

export default PushNotification;
