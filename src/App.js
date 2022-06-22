import React from "react";
import { useSelector } from "react-redux";

import "./App.css";
import Login from "./features/authentication/Login";
import Logout from "./features/authentication/Logout";
import CreatePoll from "./features/polls/CreatePoll";
import { selectAuth } from "./features/authentication/authenticationSlice";

function App() {
  const { isAuthed, authedUser } = useSelector(selectAuth);

  return (
    <div className="App">
      <Login />
      <Logout />
      {isAuthed ? (
        <p>Authed User: {authedUser}</p>
      ) : (
        <p>Don't know who you are!!</p>
      )}
      <CreatePoll />
    </div>
  );
}

export default App;
