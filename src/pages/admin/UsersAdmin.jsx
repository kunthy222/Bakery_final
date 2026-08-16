import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebaseClient";
import { useAuth } from "../../context/AuthContext";

export default function UsersAdmin() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snap) => {
        setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const toggleRole = async (u) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    if (u.id === currentUser.uid && newRole === "user") {
      if (!window.confirm("You are about to remove your own admin access. Continue?")) return;
    }
    try {
      await updateDoc(doc(db, "users", u.id), { role: newRole });
    } catch (error) {
      alert("Failed to update role: " + error.message);
    }
  };

  const removeUserRecord = async (u) => {
    if (!window.confirm(`Remove ${u.name || u.email}'s profile record? This does not delete their login account.`)) return;
    try {
      await deleteDoc(doc(db, "users", u.id));
    } catch (error) {
      alert("Failed to delete: " + error.message);
    }
  };

  return (
    <div className="dashboard-table-card">
      <h5 className="mb-3">Users ({users.length})</h5>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name || "-"}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || "-"}</td>
                  <td>
                    <span className={`role-badge role-${u.role === "admin" ? "admin" : "user"}`}>
                      {u.role || "user"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => toggleRole(u)}
                    >
                      Make {u.role === "admin" ? "User" : "Admin"}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeUserRecord(u)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-muted mt-2" style={{ fontSize: "0.85rem" }}>
        Note: "Delete" only removes the user's profile record in Firestore. To fully delete
        their login account, remove it from Firebase Authentication in the Firebase Console.
      </p>
    </div>
  );
}
