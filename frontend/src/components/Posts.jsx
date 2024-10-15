import { useEffect, useState } from "react";
import "../styles/Posts.css";
import Post from "./Post";
import LoadingIcon from "./LoadingIcon";
import NewPost from "./NewPost";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/feed/posts");
        const result = await response.json();
        setPosts(result.posts);
      } catch (err) {
        console.log(err);
        setPosts([
          {
            _id: 1,
            title: "TEST BLOG",
            content: "Content",
            creator: { name: "Vishwaraj" },
          },
        ]);
      }
    };
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
    setCurrentPost(null);
    setIsEditing(false);
  };

  const closeDialog = () => {
    setCurrentPost(null);
    setIsEditing(false);
  };

  return (
    <div id="posts-container">
      <NewPost
        currentPost={currentPost}
        isEditing={isEditing}
        onPostUpdate={handlePostUpdate}
        onClose={closeDialog}
      />
      {!posts.length ? (
        <LoadingIcon />
      ) : (
        <ul>
          {posts.map((post) => (
            <Post key={post._id} data={post} onEdit={() => handleEdit(post)} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Posts;
