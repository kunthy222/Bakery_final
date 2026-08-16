import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const services = [
  {
    image: "/src/assets/photo_2026-08-16_14-53-33.jpg",
    title: "Custom Cakes",
    description:
      "Create a beautiful and delicious custom cake for birthdays, weddings, anniversaries, and special occasions.",
  },
  {
    image: "/src/assets/photo_2026-08-16_14-56-06.jpg",
    title: "Fresh Bakery",
    description:
      "Enjoy freshly baked bread, croissants, pastries, cookies, and cakes prepared every morning.",
  },
  {
    image: "/src/assets/photo_2026-08-16_15-23-22.jpg",
    title: "Event Catering",
    description:
      "Make your special event memorable with our selection of fresh pastries, desserts, and bakery treats.",
  },
  {
    image: "/src/assets/photo_2026-08-16_15-23-15.jpg",
    title: "Delivery Service",
    description:
      "Order your favorite bakery products and have them delivered fresh and safely to your location.",
  },
  {
    image: "/src/assets/photo_2026-08-16_15-23-08.jpg",
    title: "Gift Boxes",
    description:
      "Send happiness to your loved ones with our beautifully prepared bakery gift boxes for every occasion.",
  },
  {
    image: "/src/assets/photo_2026-08-16_15-22-55.jpg",
    title: "Bakery Café",
    description:
      "Relax and enjoy freshly baked treats together with delicious drinks in our cozy bakery café.",
  },
];

const benefits = [
  {
    image: "/public/cute-croissant-sticker-illustration-hand-drawn-doodle-of-a-french-pastry-isolated-graphic-for-bakery-or-breakfast-themed-printable-designs-free-vector-removebg-preview.png",
    title: "Fresh Every Day",
    text: "Our products are freshly baked every morning.",
  },
  {
    image: "/public/7597681cbffdd1bc4bea4099164c680c__1_-removebg-preview.png",
    title: "Made With Love",
    text: "Every product is prepared with care and passion.",
  },
  {
    image: "/public/images-removebg-preview.png",
    title: "Quality Ingredients",
    text: "We carefully select high-quality ingredients.",
  },
  {
    image: "/public/images__2_-removebg-preview.png",
    title: "Happy Customers",
    text: "Your happiness and satisfaction are our priority.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/*  NAVBAR  */}
      <Navbar />

      {/*  HERO */}
      <section className="services-hero">
        <img
          src="/public/picture/photo_2026-08-16_00-49-39.jpg"
          alt="NeaZaa Bakery Services"
        />

        <div className="services-hero-overlay"></div>

        <div className="services-hero-content">
          <span>Our Services</span>

          <h1>
            Sweet Services
            <br />
            Made For You
          </h1>

          <p>
            From freshly baked treats to custom cakes and special events,
            we are here to make every moment sweeter.
          </p>
        </div>
      </section>

      {/* INTRO  */}
      <section className="services-intro">
        <div className="container text-center">
          <h5>What We Offer</h5>

          <h2>Our Bakery Services</h2>

          <p>
            At NeaZaa Bakery, we provide delicious bakery products and
            thoughtful services made especially for you.
          </p>
        </div>
      </section>

      {/*  SERVICES  */}
      <section className="services-section">
        <div className="container">
          <div className="row g-4">
            {services.map((service) => (
              <div className="col-lg-4 col-md-6" key={service.title}>
                <div className="service-card">
                  <div className="service-icon">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-icon-img"
                    />
                  </div>

                  <h4>{service.title}</h4>

                  <p>{service.description}</p>

                  <Link to="/contact" className="service-link">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  CUSTOM CAKE  */}
      <section className="custom-service">
        <div className="container">
          <div className="custom-service-box">
            <div className="custom-service-image">
              <img
                src="https://i.pinimg.com/736x/9d/25/93/9d2593780fe22eba7acf1ea6e9e57110.jpg"
                alt="Custom Cake"
              />
            </div>

            <div className="custom-service-content">
              <span>Special For You</span>

              <h2>
                Make Your
                <br />
                Dream Cake
              </h2>

              <p>
                Have a special celebration coming up? Let us create a
                beautiful custom cake designed especially for your
                special moment.
              </p>

              <Link to="/order" className="service-btn">
                Order Your Cake
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*  WHY CHOOSE US  */}
      <section className="why-services">
        <div className="container">
          <div className="text-center mb-5">
            <h5>Why Choose Us</h5>

            <h2>We Make Every Bite Special</h2>

            <p>
              Quality, freshness, and happiness are at the heart of
              everything we do.
            </p>
          </div>

          <div className="row g-4">
            {benefits.map((benefit) => (
              <div
                className="col-lg-3 col-md-6"
                key={benefit.title}
              >
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="benefit-icon-img"
                    />
                  </div>

                  <h5>{benefit.title}</h5>

                  <p>{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  CTA  */}
      <section className="services-cta">
        <div className="container text-center">
          <h2>Ready To Make Your Moment Sweeter?</h2>

          <p>
            Explore our delicious menu and place your order today.
          </p>

          <Link to="/order" className="cta-btn">
            Order Now
          </Link>
        </div>
      </section>

      {/*  FOOTER */}
      <Footer />
    </>
  );
}