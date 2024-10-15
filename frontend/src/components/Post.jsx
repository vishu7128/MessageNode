/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import NewPostForm from "./NewPostForm";

function Post({ data, onPostUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const dialogRef = useRef();
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

      const deletedPost = await response.json();
      console.log(deletedPost);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    dialogRef.current.showModal(); // Open the dialog when editing
  };

  const handlePostUpdate = (updatedPost) => {
    onPostUpdate(updatedPost); // Callback to update the post in the parent component
    setIsEditing(false); // Close the editing dialog
    dialogRef.current.close(); // Ensure the dialog is closed
  };

  return (
    <>
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
          <button onClick={handleEdit} className="btn post-btn">
            Edit
          </button>
          <button onClick={handleDelete} className="btn post-btn">
            Delete
          </button>
        </div>
      </div>

      {isEditing &&
        createPortal(
          <dialog ref={dialogRef}>
            <NewPostForm
              dialogRef={dialogRef}
              currentPost={data} // Pass the current post data
              onPostUpdate={handlePostUpdate}
            />
          </dialog>,
          document.getElementById("dialog")
        )}
    </>
  );
}

export default Post;
