import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../lib/firebaseClient";
import { useAuth } from "../context/AuthContext";

export default function ContactPage() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        userId: currentUser ? currentUser.uid : null,
        read: false,
        createdAt: serverTimestamp(),
      });

      alert("Thank you! Your message has been sent.");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Could not send your message: " + error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/*  NAVBAR  */}
      <Navbar />

      {/*  CONTACT  */}
      <section className="contact-page py-5">
        <div className="container">

          {/* Title */}
          <div className="text-center mb-5">
            <h2 className="contact-title">
              Contact Us
            </h2>
          </div>

          {/* Contact Card */}
          <div className="contact-card mx-auto">

            <div className="row g-0">

              {/*  LEFT SIDE  */}
              <div className="col-md-5">
                <div className="contact-info">

                  <img
                    src={`${import.meta.env.BASE_URL}picture/kk (2).png`}
                    alt="Bakery Logo"
                    className="logo"
                  />

                  <h5>The Neazaa Bakery</h5>

                  <p className="contact-page-item">
                    <img
                      src={`${import.meta.env.BASE_URL}picture/Shape09.png`}
                      alt=""
                    />
                    info@neazaa.com
                  </p>

                  <p className="contact-page-item">
                    <img
                      src={`${import.meta.env.BASE_URL}picture/Shape06.png`}
                      alt=""
                    />
                    +855 963 339 318
                  </p>

                  <p className="contact-page-item">
                    <img
                      src={`${import.meta.env.BASE_URL}picture/Shape03.png`}
                      alt=""
                    />
                    Phnom Penh, Cambodia
                  </p>

                </div>
              </div>

              {/*  RIGHT SIDE  */}
              <div className="col-md-7">
                <div className="contact-form">

                  <h3>
                    Send us a Message
                  </h3>

                  <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="mb-3">
                      <label htmlFor="name">
                        Name
                      </label>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="email">
                        Email
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter a valid email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <label htmlFor="message">
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn submit-btn"
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Submit"}
                    </button>

                  </form>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/*  FOOTER  */}
      <Footer />
    </>
  );
}