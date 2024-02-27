import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA69GPHTkk3kRgYeGAiwsd-ltARH2YRkRw",
  authDomain: "mentorship-4beec.firebaseapp.com",
  projectId: "mentorship-4beec",
  storageBucket: "mentorship-4beec.appspot.com",
  messagingSenderId: "729788633948",
  appId: "1:729788633948:web:8380011be415096278a799",
};
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const onMessager = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const Sendrequest = () => {
  console.log("Requesting User Permission……");

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");

      return getToken(messaging, { vapidKey: `Notification_key_pair` })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
          } else {
            console.log("Failed to generate the registration token.");
          }
        })

        .catch((err) => {
          console.log(
            "An error occurred when requesting to receive the token.",
            err
          );
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};
