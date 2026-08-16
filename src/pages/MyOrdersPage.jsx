import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../lib/firebaseClient";
import { useAuth } from "../context/AuthContext";

function formatDate(ts) {
  if (!ts) return "-";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleString();
}

export default function MyOrdersPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [currentUser]);

  return (
    <>
      <Navbar />

      <section className="cart-page">
        <h2>My Orders</h2>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div className="dashboard-table-card mb-3" key={order.id}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>Order #{order.id.slice(-6).toUpperCase()}</strong>
                <span className={`status-badge status-${order.status || "pending"}`}>
                  {order.status || "pending"}
                </span>
              </div>

              <p className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                {formatDate(order.createdAt)}
              </p>

              <ul className="mb-2">
                {(order.items || []).map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.qty} — {(item.price * item.qty).toFixed(2)}$
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between">
                <span>Delivery: {order.delivery}</span>
                <span>Payment: {order.payment}</span>
                <strong>Total: {Number(order.total).toFixed(2)}$</strong>
              </div>
            </div>
          ))
        )}
      </section>

      <Footer />
    </>
  );
}
