import { useDispatch } from "react-redux";

import { logout } from "./authenticationSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = (_e) => {
    dispatch(logout());
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
