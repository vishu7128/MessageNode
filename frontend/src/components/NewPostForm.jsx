/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function NewPostForm({ dialogRef, currentPost, onPostUpdate, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setContent(currentPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [currentPost]);

  const handleAccept = async (e) => {
    e.preventDefault();
    const postData = { title, content };

    try {
      if (currentPost) {
        // Update existing post
        const response = await fetch(
          `http://localhost:8080/feed/posts/${currentPost._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
          }
        );
        const updatedPost = await response.json();
        onPostUpdate(updatedPost);
      } else {
        // Create new post
        const response = await fetch("http://localhost:8080/feed/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
        const newPost = await response.json();
        onPostUpdate(newPost);
      }
      dialogRef.current.close();
      onClose(); // Call the close function
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleCancel = () => {
    dialogRef.current.close();
  };

  return (
    <>
      <form className="dialog-container" encType="multipart/form-data">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />

        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" />
        <p>Please choose an image (optional).</p>

        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" rows="4" required></textarea>

        <div className="dialog-btn-container">
          <button
            className="btn accept-btn"
            type="submit" // Change type to "submit"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="btn cancel-btn"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default NewPostForm;
