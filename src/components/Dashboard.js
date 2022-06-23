import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Logout from "../features/authentication/Logout";

import { selectPolls, getQuestions } from "../features/polls/pollsSlice";
import { selectAuth } from "../features/authentication/authenticationSlice";

const Dashboard = () => {
  const questions = useSelector(selectPolls);
  const { isAuthed, authedUser } = useSelector(selectAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  return (
    <div>
      <Link to={"/poll"}>Create poll? </Link>
      <Link to={"/leaderboard"}>Leaderboard</Link>
      {isAuthed ? (
        <div>
          {authedUser}
          <Logout />
        </div>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
      <h1>Dashboard</h1>
      {questions ? (
        <ul>
          {Object.values(questions).map((question) => (
            <li key={question.id}>
              <Link to={`/poll/${question.id}`}>{question.author}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No Questions Today</h3>
      )}
    </div>
  );
};

export default Dashboard;
