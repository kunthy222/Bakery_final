import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    title: "QUALITY INGREDIENTS",
    text: "We use only the finest and fresh ingredients.",
    image:
      `${import.meta.env.BASE_URL}assets/photo_2026-08-16_02-50-47-removebg-preview.png`,
  },
  {
    title: "BAKED FRESH DAILY",
    text: "All products are baked fresh every single day.",
    image:
      `${import.meta.env.BASE_URL}assets/53aa1d9c58ade7548d36e0c4ffbeb03b-removebg-preview.png`,
  },
  {
    title: "MADE WITH LOVE",
    text: "Every recipe is crafted with passion and care.",
    image:
      `${import.meta.env.BASE_URL}assets/99730-golden-frame-heart-png-download-free_400x400-removebg-preview.png`,
  },
];

const aboutInfo = [
  {
    title: "OUR STORY",
    text: `Our bakery was founded with a simple belief:
good bread brings people together. From our
humble beginning, we've grown with the Love
and support of our community.`,
  },
  {
    title: "OUR MISSION",
    text: `To provide delicious, high-quality baked goods while
maintaining the highest standards of quality,
hygiene, and customer satisfaction.`,
  },
  {
    title: "OUR VISION",
    text: `To be the most loved bakery in our community
and inspire happy moments through every bite.`,
  },
];

const contactInfo = [
  {
    title: "OPENING HOURS",
    content: (
      <>
        <p>Monday - Sunday</p>
        <p>6:00 AM - 8:00 PM</p>
      </>
    ),
  },
  {
    title: "DELIVERY",
    content: (
      <p>
        We deliver fresh to your door.
        <br />
        Fast and safe delivery.
      </p>
    ),
  },
  {
    title: "LOCATION",
    content: <p>vengsreng, Phnom Penh, Cambodia</p>,
  },
  {
    title: "CONTACT",
    content: (
      <p>
        012 345 678
        <br />
        neazaa111@gmail.com
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/*  NAVBAR  */}
      <Navbar />

      {/*  ABOUT US  */}
      <section className="about-section">
        <div className="about-container">
          
          {/* LEFT CONTENT */}
          <div className="about-content">
            <h1>About Us</h1>

            <p>
              We are a local bakery passionate about creating delicious baked
              goods using high-quality ingredients and traditional recipes.
              Baked fresh every day with love and care, we aim to bring
              warmth and joy to every moment.
            </p>

            <div className="features">
              {features.map((feature) => (
                <div className="feature" key={feature.title}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="feature-img"
                  />

                  <h5>{feature.title}</h5>

                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-7 about-image">
            <img
              src={`${import.meta.env.BASE_URL}assets/photo_2026-08-16_02-45-50.jpg`}
              alt="Bread"
            />
          </div>
        </div>
      </section>

      {/*  ABOUT INFORMATION  */}
      <section className="about-info">
        <div className="container">
          <div className="info-card">
            <div className="row">

              {/* LEFT - STORY / MISSION / VISION */}
              <div className="col-lg-4">
                {aboutInfo.map((item, index) => (
                  <React.Fragment key={item.title}>
                    <div className="info-item">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>

                    {index !== aboutInfo.length - 1 && <hr />}
                  </React.Fragment>
                ))}
              </div>

              {/* CENTER - CONTACT INFORMATION */}
              <div className="col-lg-3">
                {contactInfo.map((item) => (
                  <div className="contact-item" key={item.title}>
                    <h4>{item.title}</h4>
                    {item.content}
                  </div>
                ))}
              </div>

              {/* RIGHT - SHOP IMAGE */}
              <div className="col-lg-5">
                <img
                  src="https://i.pinimg.com/736x/d6/76/04/d676047a4738a91883f279dcd9fbcdaf.jpg"
                  className="shop-img"
                  alt="Shop"
                />
              </div>

            </div>
          </div>
        </div>

        {/* THANK YOU */}
        <div className="text-center py-4">
          <h3
            style={{
              color: "#d4a373",
              fontFamily: "'Pacifico', cursive",
            }}
          >
            Thank you for being a part of our bakery family.
          </h3>
        </div>
      </section>

      {/*  FOOTER  */}
      <Footer />
    </>
  );
}