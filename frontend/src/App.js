import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Upload from "./components/Upload";
import Home from "./components/Home";
import Video from "./components/Video";
import StartScreen from "./components/StartScreen";
import Login from "./components/Login";
import ProfileScreen from "./components/ProfileScreen";
// import AuthApi from "./contexts/authContext";
import { AuthContextProvider } from "./contexts/authContext"
import Cookies from "js-cookie";

import { useAuth } from "./contexts/authContext";
function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#181818" }}>
        <AuthContextProvider>                     {/*useContext, used to make available auth and setAuth hooks in the below components */}
          <Switch>
            <Route exact path="/" component={StartScreen}></Route>
            <Route exact path="/home/*" component={Home}></Route>
            <Route exact path="/upload" component={Upload}></Route>     {/* protected */}
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/video/:videoId" component={Video}></Route>
            <Route exact path="/user" component={ProfileScreen}></Route>
          </Switch>
        </AuthContextProvider>
      </div>
    </Router >
  );
}

export default App;
