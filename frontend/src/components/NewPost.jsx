/* eslint-disable react/prop-types */
import "../styles/NewPost.css";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import NewPostForm from "./NewPostForm";

function NewPost({ currentPost, isEditing, onPostUpdate, onClose }) {
  const dialogRef = useRef();

  const handleNewPost = () => {
    dialogRef.current.showModal();
  };

  useEffect(() => {
    if (isEditing) {
      dialogRef.current.showModal();
    }
  }, [isEditing]);

  return (
    <div id="newpost-container">
      {createPortal(
        <dialog ref={dialogRef}>
          <NewPostForm
            dialogRef={dialogRef}
            currentPost={currentPost}
            onPostUpdate={onPostUpdate}
            onClose={onClose}
          />
        </dialog>,
        document.getElementById("dialog")
      )}

      <button className="btn newpost-btn" onClick={handleNewPost}>
        NEW POST
      </button>
    </div>
  );
}

export default NewPost;
