import { useState } from "react";
import Login from "./Comp/Login/Login";
// In src/index.js or src/App.js
import "@fortawesome/fontawesome-free/css/all.css";
import Home from "./Comp/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { gapi } from "gapi-script";
import { useEffect } from "react";

import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import NotFound from "./Comp/Not_Found/NotFound";
import Dashboard from "./Comp/Dashboard/Dashboard";
import { start } from './../node_modules/@popperjs/core/dist/esm/enums';

function App() {
  const clientID =
  "API KEY HERE";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: 'profile email',
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          // User is already signed in
          const profile = authInstance.currentUser.get().getBasicProfile();
          console.log("Email:", profile.getEmail());
        } else {
          // Sign in the user
          authInstance.signIn().then((user) => {
            const profile = user.getBasicProfile();
            console.log("Email:", profile.getEmail());
          });
        }
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/NotFound" element={<NotFound />} />
        <Route exact path="/*" element={<Home />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
