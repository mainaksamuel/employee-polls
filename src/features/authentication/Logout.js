import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "./authenticationSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (_e) => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
