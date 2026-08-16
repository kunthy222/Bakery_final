import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebaseClient";

function formatDate(ts) {
  if (!ts) return "-";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleString();
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const markRead = async (m) => {
    try {
      await updateDoc(doc(db, "messages", m.id), { read: !m.read });
    } catch (error) {
      alert("Failed: " + error.message);
    }
  };

  const removeMessage = async (m) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, "messages", m.id));
    } catch (error) {
      alert("Failed: " + error.message);
    }
  };

  return (
    <div className="dashboard-table-card">
      <h5 className="mb-3">Messages ({messages.length})</h5>

      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((m) => (
          <div
            key={m.id}
            className="border-bottom py-3"
            style={{ opacity: m.read ? 0.6 : 1 }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <strong>{m.name}</strong>{" "}
                <span className="text-muted">({m.email})</span>
                {!m.read && (
                  <span className="status-badge status-pending ms-2">New</span>
                )}
              </div>
              <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                {formatDate(m.createdAt)}
              </span>
            </div>

            <p className="mb-2 mt-1">{m.message}</p>

            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => markRead(m)}
            >
              Mark as {m.read ? "Unread" : "Read"}
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeMessage(m)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
