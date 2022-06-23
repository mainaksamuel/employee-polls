import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateUser, selectAuth } from "./authenticationSlice";

const Login = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthed } = useSelector(selectAuth);

  if (isAuthed) {
    if (location.state?.from) {
      navigate(location.state.from);
      return;
    }
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(authenticateUser({ ...data }));
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
      <h1>Login </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type={"text"}
            placeholder="Enter your username"
            ref={usernameRef}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type={"password"} ref={passwordRef} />
        </div>
        <input type={"submit"} value="Login" />
      </form>
    </div>
  );
};

export default Login;
