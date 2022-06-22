import { useRef } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "./authenticationSlice";

const Login = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();

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
