/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function Post({ data }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/posts/${data._id}`);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/feed/posts/${data._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }

      const deletedPost = await response.json(); // Assuming the backend returns JSON
      console.log(deletedPost);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="post-container">
      <p className="post-author">
        Posted by {data.creator.name} on {data.date}
      </p>
      <p className="post-title">{data.title}</p>
      <p className="post-content">{data.content}</p>
      <div className="post-cmds">
        <button onClick={handleView} className="btn post-btn">
          View
        </button>
        <button className="btn post-btn">Edit</button>
        <button onClick={handleDelete} className="btn post-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Post;
