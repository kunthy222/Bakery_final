import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../lib/firebaseClient";

export default function DashboardHome() {
  const [counts, setCounts] = useState({
    users: 0,
    products: 0,
    orders: 0,
    messages: 0,
    pendingOrders: 0,
    unreadMessages: 0,
    revenue: 0,
  });

  useEffect(() => {
    const unsubs = [
      onSnapshot(collection(db, "users"), (snap) =>
        setCounts((c) => ({ ...c, users: snap.size }))
      ),
      onSnapshot(collection(db, "products"), (snap) =>
        setCounts((c) => ({ ...c, products: snap.size }))
      ),
      onSnapshot(collection(db, "orders"), (snap) => {
        let pending = 0;
        let revenue = 0;
        snap.forEach((d) => {
          const data = d.data();
          if ((data.status || "pending") === "pending") pending++;
          if (data.status === "delivered") revenue += Number(data.total) || 0;
        });
        setCounts((c) => ({
          ...c,
          orders: snap.size,
          pendingOrders: pending,
          revenue,
        }));
      }),
      onSnapshot(collection(db, "messages"), (snap) => {
        let unread = 0;
        snap.forEach((d) => {
          if (!d.data().read) unread++;
        });
        setCounts((c) => ({ ...c, messages: snap.size, unreadMessages: unread }));
      }),
    ];

    return () => unsubs.forEach((u) => u());
  }, []);

  const cards = [
    { label: "Total Users", value: counts.users, iconImg: "/public/images__2_-removebg-preview.png", to: "/admin/users" },
    { label: "Products", value: counts.products, iconImg: "/public/cute-croissant-sticker-illustration-hand-drawn-doodle-of-a-french-pastry-isolated-graphic-for-bakery-or-breakfast-themed-printable-designs-free-vector-removebg-preview.png", to: "/admin/products" },
    { label: "Orders", value: counts.orders, sub: `${counts.pendingOrders} pending`, iconImg: "/src/assets/7f249252404646c08d90976505cb6937.jpg", to: "/admin/orders" },
    { label: "Messages", value: counts.messages, sub: `${counts.unreadMessages} unread`, iconImg: "/src/assets/photo_2026-08-16_16-06-05.jpg", to: "/admin/messages" },
    { label: "Revenue (Delivered)", value: `${counts.revenue.toFixed(2)}$`, iconImg: "/src/assets/photo_2026-08-16_16-08-02.jpg", to: "/admin/orders" },
  ];

  return (
    <div className="row g-3">
      {cards.map((card) => (
        <div className="col-md-6 col-lg-4" key={card.label}>
          <Link to={card.to} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="stat-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span>{card.label}</span>
                  <h3>{card.value}</h3>
                  {card.sub && <span>{card.sub}</span>}
                </div>
                <img
                  src={card.iconImg}
                  alt={card.label}
                  style={{ width: "1.8rem", height: "1.8rem", opacity: 0.3, objectFit: "contain" }}
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}