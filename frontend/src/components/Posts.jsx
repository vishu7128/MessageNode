import { useEffect, useState } from "react";
import "../styles/Posts.css";
import Post from "./Post";
import LoadingIcon from "./LoadingIcon";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      fetch("http://localhost:8080/feed/posts")
        .then((result) => result.json())
        .then((result) => {
          console.log(result);
          setPosts(result.posts);
        })
        .catch((err) => {
          console.log(err);
          setPosts([]);
        });
    };
    fetchPosts();
  }, []);

  return (
    <div id="posts-container">
      {!posts.length ? (
        <LoadingIcon />
      ) : (
        <ul>
          {posts.map((post) => (
            <Post key={post._id} data={post}></Post>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Posts;
