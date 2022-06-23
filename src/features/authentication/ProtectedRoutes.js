import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { selectAuth } from "./authenticationSlice";

const ProtectedRoutes = () => {
  const { isAuthed } = useSelector(selectAuth);
  const location = useLocation();

  return isAuthed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
