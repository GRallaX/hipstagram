import { useEffect, useRef, useState } from "react";
import { Route } from "react-router";
import { useLocation } from "react-router-dom";
import { fetchFeed } from "../../api/posts";

import useLazyLoad from "../../components/useLazyLoad";
import { FeedPost } from "./feedPost";
import { ModalPost } from "../../containers/modalPost";
import { LoadingIconBig } from "../../components/loadingIcon";
import { toast } from "react-toastify";
import "./feed.css";

export const Feed = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(false);
  const [newPost, setNewPost] = useState([]);

  const feedContainer = useRef();
  const postsForRender = useLazyLoad(
    feedContainer,
    posts,
    window.innerHeight * 1.5,
    5
  );

  useEffect(() => {
    document.title = "Feed";
    let cleanupFunction = false;
    (async () => {
      try {
        const { data: fetchedFeed } = await fetchFeed();
        const feed = fetchedFeed.reverse();
        if (!cleanupFunction) {
          if (newPost) {
            setPosts([...newPost, ...feed]);
          } else {
            setPosts([...feed]);
          }
          setIsLoading(false);
        }
      } catch (e) {
        toast.error(e.response?.data || e.message);
        setIsLoading(false);
      }
    })();
    return () => {
      cleanupFunction = true;
    };
  }, [newPost]);

  useEffect(() => {
    if (location.state?.newPost)
      setNewPost(newPost => [location.state?.newPost, ...newPost]);
  }, [location.state?.newPost]);

  if (isLoading) {
    return (
      <div className="main">
        <LoadingIconBig />
      </div>
    );
  } else if (!isLoading && !postsForRender.length) {
    return (
      <div className="main">
        <div className="empty">
          <h2>No posts yet</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <Route
          path="/feed/p/:postId"
          render={() => <ModalPost setModalPost={setModalPost} />}
        />
        <div className="feed_posts" ref={feedContainer}>
          {postsForRender.map(post => {
            return (
              <FeedPost
                key={"post_" + post._id}
                post={post}
                modalPost={modalPost}
                setModalPost={setModalPost}
              />
            );
          })}
        </div>
      </div>
    );
  }
};
