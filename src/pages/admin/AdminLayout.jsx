import React from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin", label: "Overview", iconImg: "/src/assets/photo_2026-08-16_16-24-32-removebg-preview.png", end: true },
  { to: "/admin/orders", label: "Orders", iconImg: "/src/assets/7f249252404646c08d90976505cb6937__1_-removebg-preview.png" },
  { to: "/admin/products", label: "Products", iconImg: "/public/cute-croissant-sticker-illustration-hand-drawn-doodle-of-a-french-pastry-isolated-graphic-for-bakery-or-breakfast-themed-printable-designs-free-vector-removebg-preview.png" },
  { to: "/admin/users", label: "Users", iconImg: "/public/images__2_-removebg-preview.png" },
  { to: "/admin/messages", label: "Messages", iconImg: "/src/assets/photo_2026-08-16_16-27-23-removebg-preview.png" },
];

export default function AdminLayout() {
  const { profile, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="brand">NeaZaa Admin</div>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img
              src={link.iconImg}
              alt={link.label}
              style={{ width: "1.2rem", height: "1.2rem", objectFit: "contain" }}
            />{" "}
            {link.label}
          </NavLink>
        ))}

        <div className="mt-auto">
          <Link to="/" style={{ marginTop: 20 }} className="d-flex align-items-center gap-2">
            <img
              src="/src/assets/503a417cb933bdb0e9ec518eff173281-removebg-preview.png"
              alt="Back to Site"
              style={{ width: "1.2rem", height: "1.2rem", objectFit: "contain" }}
            />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              width: "100%",
              textAlign: "left",
            }}
            className="d-flex align-items-center gap-2"
          >
            <img
              src="/src/assets/e6b4327ebe62b73edcd95dc8477fb55a-removebg-preview.png"
              alt="Logout"
              style={{ width: "1.2rem", height: "1.2rem", objectFit: "contain" }}
            />
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <h4 className="mb-0">Welcome, {profile?.name || currentUser?.email}</h4>
        </div>

        <Outlet />
      </main>
    </div>
  );
}