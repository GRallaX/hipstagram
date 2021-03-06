import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import loadingIcon from "../images/loading_small.svg";
import { subscribeUser, unSubscribeUser } from "../store/currentUser/thunks";
import { toast } from "react-toastify";

export const FollowButton = ({ size, user: userProp, setUser, post }) => {
  let user = {};
  if (userProp._id) {
    user = { ...userProp, id: userProp._id };
    delete user._id;
  } else {
    user = { ...userProp };
  }

  const { id: userId } = user;

  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.currentUser);
  const { id: currentUserId, following } = currentUser;

  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(
    following.some(user => user.id === userId) ? true : false
  );

  const handleSubscribe = async e => {
    e.preventDefault(e);
    setIsLoading(true);
    const subscribe = isFollowed
      ? await dispatch(unSubscribeUser(user))
      : await dispatch(subscribeUser(user));
    setIsFollowed(!isFollowed);
    setIsLoading(false);
    if (setUser) {
      setUser({
        ...user,
        followers: isFollowed
          ? user.followers.filter(u => u.id !== currentUserId)
          : [...user.followers, currentUser],
        followersCount: isFollowed
          ? user.followersCount - 1
          : user.followersCount + 1,
      });
    }
    if (subscribe.response) {
      setIsFollowed(isFollowed);
      toast.error(subscribe.response.data);
      if (setUser) {
        setUser({ ...user });
      }
      setIsLoading(false);
    }
  };

  const handleGoToSettings = e => {
    e.preventDefault();
    history.push("/users/" + currentUserId + "/profile_settings");
  };

  const handleGoToMyProfile = e => {
    e.preventDefault();
    history.push("/users/" + currentUserId);
  };

  const handleEditPost = e => {
    e.preventDefault();
    alert(`Amazing editing post at /posts/${post._id}`);
  };

  useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction)
      setIsFollowed(following.some(user => user.id === userId) ? true : false);
    return () => (cleanupFunction = true);
  }, [following, userId]);

  if (userId === currentUserId && size === "big_btn") {
    return (
      <button className={"settings_btn " + size} onClick={handleGoToSettings}>
        Edit Profile
      </button>
    );
  } else if (post) {
    return (
      <button className={"post_settings_btn " + size} onClick={handleEditPost}>
        Edit Post
      </button>
    );
  } else if (userId === currentUserId) {
    return (
      <button
        className={"follow_btn followed " + size}
        onClick={handleGoToMyProfile}
      >
        My Profile
      </button>
    );
  } else {
    return (
      <button
        onClick={handleSubscribe}
        className={
          "follow_btn " + (isFollowed ? "followed " : "not_followed ") + size
        }
      >
        {isLoading ? (
          <img src={loadingIcon} alt="..." />
        ) : isFollowed ? (
          "Unsubscribe"
        ) : (
          "Subscribe"
        )}
      </button>
    );
  }
};
