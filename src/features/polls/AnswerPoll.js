import { useDispatch, useSelector } from "react-redux";
import { selectPolls, answerPoll } from "./pollsSlice";
import { selectAuth } from "../authentication/authenticationSlice";

const AnswerPoll = () => {
  const questions = useSelector(selectPolls);
  const question = questions[Object.keys(questions)[0]];

  const { isAuthed, authedUser } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleVote = (e) => {
    if (!isAuthed) {
      alert("You need to login first so that you can vote.");
      return;
    }

    const answer = e.target.name;
    const answeredPoll = {
      authedUser,
      qid: question.id,
      answer,
    };

    dispatch(answerPoll(answeredPoll));
  };

  return (
    <div>
      <h1>Poll by {question ? question.author : "Anon"}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          gap: "20px",
        }}
      >
        <div>
          {question?.optionOne.text}
          <button name="optionOne" onClick={handleVote}>
            {" "}
            Vote this{" "}
          </button>
        </div>
        <div>
          {question?.optionTwo.text}
          <button name="optionTwo" onClick={handleVote}>
            Vote this{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AnswerPoll;
