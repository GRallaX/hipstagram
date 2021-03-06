import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPostComments } from "../../api/comments";

import { Comment } from "./comment";
import { toast } from "react-toastify";
import loadingIcon from "../../images/loading_small.svg";
import "./postComments.css";

export const PostComments = ({
  postId,
  postTitle,
  postOwner,
  comments,
  setComments,
  children,
  showTime = false,
  showOnlyLast,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;

    const interval = setInterval(() => {
      // setUpdate(true);
    }, 20000);

    (async () => {
      try {
        const { data: comments } = await fetchPostComments(postId);
        if (!cleanupFunction) {
          setComments(comments);
          setIsLoading(false);
          setUpdate(false);
        }
      } catch (e) {
        toast.error(e.response?.data || e.message);
      }
    })();

    return () => {
      cleanupFunction = true;
      clearInterval(interval);
    };
  }, [postId, setComments, update]);

  if (isLoading || !comments) {
    return (
      <div className="comments_container">
        <div className="loading_comments">
          <img src={loadingIcon} alt="loadingIcon" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="comments_container">
        <ul className="comments">
          <li className="comment owner">
            <span className="comment_text">
              <Link to={"/users/" + postOwner.id} className="comment_user_ref">
                {postOwner.login}
              </Link>
              {" " + postTitle}
            </span>
          </li>
          {children}
          {comments.map((comment, index, array) => {
            if (showOnlyLast) {
              if (index < array.length - showOnlyLast) return null;
            }
            return (
              <Comment
                key={"comment_" + comment.id}
                comment={comment}
                comments={comments}
                setComments={setComments}
                showTime={showTime}
              />
            );
          })}
        </ul>
      </div>
    );
  }
};
