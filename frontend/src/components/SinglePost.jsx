/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/SinglePost.css";

function SinglePost() {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/feed/posts/${postId}`
        );
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="post-details-container">
      <h1>{postData.post?.title}</h1>
      <img
        src={`http://localhost:8080/${postData.post?.imageURL}`}
        alt="Loading"
        className="img"
      />
      <p>{postData.post?.content}</p>
      <h3>{postData.post?.creator?.name}</h3>
    </div>
  );
}

export default SinglePost;
