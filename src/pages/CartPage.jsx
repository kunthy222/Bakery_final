import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { items, removeFromCart, updateQty, totalPrice, totalItems } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (!currentUser) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <section className="cart-page">
        <h2>Your Cart {totalItems > 0 && `(${totalItems} item${totalItems > 1 ? "s" : ""})`}</h2>

        {items.length === 0 ? (
          <div className="text-center py-5">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/menu" className="order-btn">
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div>
              {items.map((item) => (
                <div className="cart-row" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-info">
                    <h6 className="mb-1">{item.name}</h6>
                    <span>{item.price.toFixed(2)}$ each</span>
                  </div>

                  <div className="cart-qty-control">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ width: 70, textAlign: "right", fontWeight: 600 }}>
                    {(item.price * item.qty).toFixed(2)}$
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="total-row">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)}$</span>
              </div>

              <button
                className="order-btn w-100 mt-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <Link to="/menu" className="d-block text-center mt-2">
                ← Continue shopping
              </Link>
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
