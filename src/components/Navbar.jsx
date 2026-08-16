import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { currentUser, profile, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid px-4">

        {/* Logo */}
        <div className="d-flex align-items-center logo">
          <img
            src="/picture/kk (2).png"
            className="navbar-brand d-flex align-items-center ms-1"
            alt="Logo"
            width="120"
            style={{ marginTop: "-35px" }}
          />

          <div className="logo-text">
            <h2 className="mb-0">NeaZaa</h2>
            <span className="text-muted">Bakery</span>
          </div>
        </div>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="mainNav">

        {/* Center Menu */}
       <ul className="navbar-nav mx-auto align-items-lg-center">

          <li className="nav-item">
            <Link to="/" className="nav-link">
               Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/menu" className="nav-link">
               Menu
            </Link>
           </li>

          <li className="nav-item">
            <Link to="/services" className="nav-link">
               Services
      </Link>
    </li>

          <li className="nav-item">
           <Link to="/about" className="nav-link">
              About Us
      </Link>
    </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link">
                Contact 
      </Link>
    </li>

    {isAdmin && (
      <li className="nav-item">
        <Link to="/admin" className="nav-link">
          Dashboard
        </Link>
      </li>
    )}

  </ul>

  {/* Right Buttons */}
     <div className="d-flex align-items-center gap-2">

          <Link to="/cart" className="btn btn-login position-relative">
            🛒 Cart
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>

          {currentUser ? (
            <div className="dropdown">
              <button
                className="btn btn-login dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                {profile?.name || currentUser.email}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {isAdmin && (
                  <li>
                    <Link className="dropdown-item" to="/admin">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link className="dropdown-item" to="/my-orders">
                    My Orders
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-login">
              Login
            </Link>
          )}

           </div>

       </div>

      </div>
    </nav>
  );
}
