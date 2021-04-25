import { Link } from "react-router-dom";
import { Avatar } from "./avatar";
import { FollowButton } from "./followBtn";

const UserCard = ({ user: { avatar, login, _id } }) => {
  return (
    <li className="user_search_card">
      <div className="user_search_avatar">
        <Avatar avatar={avatar} size="small" />
      </div>
      <Link to={"/users/" + _id} className="user_search_ref">
        {login}
      </Link>
      <FollowButton userId={_id} size="small_btn" />
    </li>
  );
};

export const UsersList = ({ usersList }) => {
  return (
    <ul className="users_search">
      {usersList.map((user) => {
        return <UserCard user={user} key={user._id} />;
      })}
    </ul>
  );
};
