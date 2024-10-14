import "../styles/NewPost.css";
import { useRef } from "react";
import { createPortal } from "react-dom";

function NewPost() {
  const dialogRef = useRef();

  const handleNewPost = () => {
    dialogRef.current.showModal();
  };

  const handleAccept = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const formData = new FormData(form);

    fetch("http://localhost:8080/feed/post", {
      method: "POST",
      body: formData,
      headers: {
        // Avoid adding any Content-Type header
      },
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        dialogRef.current.close(); // Close dialog after successful request
        // Optionally, update posts here
      })
      .catch((err) => {
        console.log("Error:", err);
        // Optionally, handle error (e.g., show a message)
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dialogRef.current.close();
  };

  return (
    <div id="newpost-container">
      {createPortal(
        <dialog ref={dialogRef}>
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
