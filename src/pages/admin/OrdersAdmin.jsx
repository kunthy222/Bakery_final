import React, { useEffect, useState } from "react";
import {
  collection,
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

const statuses = ["pending", "confirmed", "delivered", "cancelled"];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "orders", id), { status });
    } catch (error) {
      alert("Failed to update status: " + error.message);
    }
  };

  const filtered =
    filter === "all" ? orders : orders.filter((o) => (o.status || "pending") === filter);

  return (
    <div className="dashboard-table-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Orders ({filtered.length})</h5>

        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <React.Fragment key={o.id}>
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                  >
                    <td>#{o.id.slice(-6).toUpperCase()}</td>
                    <td>
                      {o.contact?.name || "-"}
                      <br />
                      <small className="text-muted">{o.contact?.phone}</small>
                    </td>
                    <td>{(o.items || []).length} item(s)</td>
                    <td>{Number(o.total).toFixed(2)}$</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        className={`form-select form-select-sm status-badge status-${o.status || "pending"}`}
                        style={{ border: "none" }}
                        value={o.status || "pending"}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{formatDate(o.createdAt)}</td>
                  </tr>

                  {expanded === o.id && (
                    <tr>
                      <td colSpan={6} style={{ background: "#faf7f2" }}>
                        <div className="p-2">
                          <strong>Items:</strong>
                          <ul className="mb-2">
                            {(o.items || []).map((item, idx) => (
                              <li key={idx}>
                                {item.name} x {item.qty} — {(item.price * item.qty).toFixed(2)}$
                              </li>
                            ))}
                          </ul>
                          <strong>Address:</strong> {o.contact?.address || "-"}
                          <br />
                          <strong>Delivery:</strong> {o.delivery} &nbsp;|&nbsp;
                          <strong> Payment:</strong> {o.payment}
                          <br />
                          {o.note && (
                            <>
                              <strong>Note:</strong> {o.note}
                              <br />
                            </>
                          )}
                          <strong>Email:</strong> {o.userEmail}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
