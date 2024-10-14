import "../styles/Status.css";

function Status() {
  return (
    <>
      <div id="status-container">
        <input className="status-input" type="text" placeholder="Your Status" />
        <button className="btn status-btn">Update</button>
      </div>
    </>
  );
}

export default Status;
