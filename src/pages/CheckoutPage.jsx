import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../lib/firebaseClient";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { currentUser, profile } = useAuth();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState("delivery");
  const [payment, setPayment] = useState("cash");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [contact, setContact] = useState({
    name: profile?.name || "",
    phone: profile?.phone || "",
    address: "",
  });

  const deliveryFee = delivery === "delivery" ? 2 : 0;
  const total = totalPrice + deliveryFee;

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!contact.name || !contact.phone || !contact.address) {
      alert("Please complete your contact information.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items,
        delivery,
        payment,
        note,
        contact,
        subtotal: totalPrice,
        deliveryFee,
        total,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      clearCart();
      alert("Your order has been placed successfully!");
      navigate("/my-orders");
    } catch (error) {
      console.error("Order Error:", error);
      alert("Could not place your order: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="order-section">
        <div className="container-fluid">
          <div className="row g-4">
            {/* LEFT SIDE */}
            <div className="col-lg-6">
              <div className="order-left">
                <h2 className="menu-title">••• Checkout •••</h2>

                {items.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div className="menu-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="product-info">
                        <h6>{item.name}</h6>
                        <span>
                          {item.price.toFixed(2)}$ x {item.qty}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                <hr />

                {/* DELIVERY */}
                <h5>Delivery Option</h5>

                <div className="option-item">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={delivery === "delivery"}
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                  <label>Home Delivery</label>
                </div>

                <div className="option-item">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={delivery === "pickup"}
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                  <label>Pick Up at Store</label>
                </div>

                <hr />

                {/* PAYMENT */}
                <h5>Payment Method</h5>

                <div className="option-item">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={payment === "cash"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <label>Cash On Delivery</label>
                </div>

                <div className="option-item qr-payment">
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={payment === "qr"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <label>QR code payment</label>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-6">
              <div className="order-right">
                <h3>Order Summary</h3>

                {items.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      {item.name} x {item.qty}
                    </div>
                    <span>{(item.price * item.qty).toFixed(2)}$</span>
                  </div>
                ))}

                <hr />

                <div className="price-row">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)}$</span>
                </div>

                <div className="price-row">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee.toFixed(2)}$</span>
                </div>

                <hr />

                <div className="total-row">
                  <span>Total</span>
                  <span>{total.toFixed(2)}$</span>
                </div>

                <div className="box-card">
                  <h5>Note to Rider</h5>
                  <textarea
                    placeholder="Any special request..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <div className="box-card">
                  <h5>Contact Information</h5>

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contact.name}
                    onChange={handleContactChange}
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={contact.phone}
                    onChange={handleContactChange}
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Your Address"
                    value={contact.address}
                    onChange={handleContactChange}
                  />
                </div>

                <button
                  className="order-btn"
                  onClick={handleSubmit}
                  disabled={submitting || items.length === 0}
                >
                  {submitting ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
