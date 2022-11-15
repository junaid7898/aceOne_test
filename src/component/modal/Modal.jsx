import React, { useEffect, useState } from "react";

import "./modal.css";

const ModalLabels = ({ label, txt }) => {
  return (
    <div className="modal-labels">
      <label>{label}:</label>
      <p>{txt}</p>
    </div>
  );
};
const Modal = ({ call, closeModal, handleAddNote }) => {
  const [note, setNote] = useState("");
  const [loading, setloading] = useState(false);

  const [data, setData] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await handleAddNote(data.id, note);
    setData(res);
    setNote("");
    setloading(false);
  };

  useEffect(() => {
    if (call) {
      setData(call);
    }
  }, []);

  return (
    <div className="modal-container">
      <div className="modal">
        {loading && (
          <p style={{ textAlign: "center", color: "red" }}>Waiting....</p>
        )}
        {data && !loading && (
          <div className="modal-content">
            <ModalLabels label="type" txt={data.call_type} />
            <ModalLabels label="direction" txt={data.direction} />
            <ModalLabels label="duration" txt={data.duration} />
            <ModalLabels label="from" txt={data.from} />
            <ModalLabels label="to" txt={data.to} />
            <ModalLabels label="via" txt={data.via} />

            <div>
              <label>Notes:</label>
              {data.notes.length > 0 &&
                data.notes.map((item) => {
                  return <p key={item.id}>{item.content}</p>;
                })}

              <form className="notes-input" onSubmit={(e) => handleForm(e)}>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="add a new note"
                  required
                />
                <button type="submit">Add Note</button>
              </form>
            </div>
          </div>
        )}
        <button className="cross-btn" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
