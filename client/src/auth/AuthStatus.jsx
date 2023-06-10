import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoggedInUser } from "../../state/authSlice";

export const AuthStatus = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  if (user) {
    return (
      <div>
        Hello, {user.email}!<button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    );
  } else {
    return <div>Nem vagy belépve.</div>;
  }
};
