import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPoll } from "./pollsSlice";
import { selectAuth } from "../authentication/authenticationSlice";
import { Link, useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const optionOneRef = useRef("");
  const optionTwoRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthed, authedUser } = useSelector(selectAuth);

  const isValidPoll = (question) => {
    const isValid = Object.values(question).findIndex((v) => v === "");
    if (isValid < 0) return true;

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const question = {
      optionOneText: optionOneRef.current.value,
      optionTwoText: optionTwoRef.current.value,
      author: authedUser,
    };

    if (!isAuthed) {
      alert("You need to login first to create a poll");
      return;
    } else if (!isValidPoll(question)) {
      alert("Please fill in all the required fields");
      return;
    }

    dispatch(createPoll(question));
    navigate("/");
  };

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h1>Would you Rather</h1>
      <span>Create Your Own Poll</span>
      <div>
        <form onSubmit={handleSubmit} id="create-poll-form">
          <div>
            <label htmlFor="optionOne">First Option</label>
            <input type={"text"} name="optionOne" ref={optionOneRef} />
          </div>
          <div>
            <label htmlFor="optionTwo">Second Option</label>
            <input type={"text"} name="optionTwo" ref={optionTwoRef} />
          </div>
          <input type={"submit"} value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
