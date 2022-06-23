import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, getUsers } from "../features/users/usersSlice";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h1>Leaderboard</h1>
      {leaderboard && <pre>{JSON.stringify(leaderboard)}</pre>}
    </div>
  );
};

export default Leaderboard;
