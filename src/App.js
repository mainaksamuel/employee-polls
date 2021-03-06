import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./features/authentication/Login";
import ProtectedRoutes from "./features/authentication/ProtectedRoutes";
import CreatePoll from "./features/polls/CreatePoll";
import AnswerPoll from "./features/polls/AnswerPoll";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/poll" element={<CreatePoll />} />
          <Route path="/poll/:id" element={<AnswerPoll />} />
        </Route>

        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
