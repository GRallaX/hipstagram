import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  updateCurrentUser,
  updateUsersPassword,
} from "../store/currentUser/thunks";

export const ProfileSettings = ({
  match: {
    params: { id: pageUserId },
  },
}) => {
  const dispatch = useDispatch();
  const { id: currentUserId, email, lastName, login, avatar } = useSelector(
    (state) => state.currentUser
  );
  console.log(pageUserId, currentUserId);
  return (
    <main>
      {pageUserId !== currentUserId && <Redirect to="/" />}
      <h2>Profile Settings</h2>
      <button
        onClick={() =>
          dispatch(updateCurrentUser("Alex", lastName, email, login, avatar))
        }
      >
        Update currentUser
      </button>
      <button
        onClick={() =>
          dispatch(
            updateUsersPassword(login, "Qwerty1234", "Qwerty123", "Qwerty123")
          )
        }
      >
        Update password
      </button>
    </main>
  );
};
