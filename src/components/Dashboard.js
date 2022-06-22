import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPolls, getQuestions } from "../features/polls/pollsSlice";

const Dashboard = () => {
  const questions = useSelector(selectPolls);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {questions ? (
        <ul>
          {Object.values(questions).map((question) => (
            <li key={question.id}> {question.author}</li>
          ))}
        </ul>
      ) : (
        <h3>No Questions Today</h3>
      )}
    </div>
  );
};

export default Dashboard;
