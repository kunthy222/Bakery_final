import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../lib/firebaseClient";
import { useCart } from "../context/CartContext";

// Fallback / seed products, used only if the Firestore "products" collection is empty.
// Admins can manage real products from the Dashboard -> Products tab.
export const seedProducts = [
  {
    id: "chocolate-doughnuts",
    name: "Chocolate Doughnuts",
    description: "Soft and fluffy doughnuts topped with rich chocolate.",
    price: 3.0,
    image: "https://i.pinimg.com/736x/6e/fc/a3/6efca37118d8c59dc83253877e21420a.jpg",
  },
  {
    id: "chocolate-croissant",
    name: "Chocolate Croissant",
    description: "Freshly baked croissant filled with rich chocolate.",
    price: 2.5,
    image: "https://i.pinimg.com/736x/53/69/a4/5369a452b2e9da56bf94011d67e42ed0.jpg",
  },
  {
    id: "chocolate-churros",
    name: "Chocolate Churros",
    description: "Crispy golden churros served with rich melted chocolate.",
    price: 7.5,
    image: "https://i.pinimg.com/1200x/77/2d/40/772d4075de65b3182339ba7c582bc3be.jpg",
  },
  {
    id: "blackberry-pie",
    name: "Blackbery Pie",
    description: "Warm, flaky pastry filled with plump, seasonal wild berries.",
    price: 5.0,
    image: "https://i.pinimg.com/1200x/65/da/56/65da5667249caa72922eae84351f3a5a.jpg",
  },
  {
    id: "opera-cake",
    name: "Opera Cake",
    description: "Traditional French layered cake with rich coffee and chocolate.",
    price: 8.5,
    image: "https://i.pinimg.com/736x/d1/ee/8d/d1ee8d0026b516254187dda792142670.jpg",
  },
  {
    id: "strawberry-cake",
    name: "Strawberry Cake",
    description: "Rich chocolate layers filled with fresh strawberries and cream.",
    price: 5.5,
    image: "https://i.pinimg.com/736x/9d/25/93/9d2593780fe22eba7acf1ea6e9e57110.jpg",
  },
  {
    id: "garlic-butter-bread",
    name: "Garlic Butter Bread",
    description: "Freshly baked soft rolls with rich garlic butter and herbs.",
    price: 3.0,
    image: "https://i.pinimg.com/736x/c4/32/fb/c432fbe807bab969361b73d59e704346.jpg",
  },
  {
    id: "cinnamon-roll",
    name: "Cinnamon Roll",
    description: "Freshly baked cinnamon rolls with a sweet cream glaze.",
    price: 4.5,
    image: "https://i.pinimg.com/736x/0c/cb/b9/0ccbb9dd12ec61ab0654ac358ebe168a.jpg",
  },
  {
    id: "cream-puff-pastry",
    name: "Cream Puff Pastry",
    description: "Crispy layered pastry filled with sweet vanilla cream.",
    price: 4.0,
    image: "https://i.pinimg.com/1200x/9c/ee/62/9cee62052e15208881f1660242a6ae71.jpg",
  },
  {
    id: "chocolate-pancakes",
    name: "Chocolate Pancakes",
    description: "Fluffy stacked pancakes and fresh strawberries.",
    price: 3.5,
    image: "https://i.pinimg.com/736x/42/cd/d6/42cdd667c335e3111256e6ee29ce023d.jpg",
  },
  {
    id: "chocolate-brownies",
    name: "Chocolate Brownies",
    description: "Fudgy chocolate brownies loaded with rich chocolate chips.",
    price: 3.0,
    image: "https://i.pinimg.com/1200x/01/20/47/01204784f7e9fbc37902c293e420d56f.jpg",
  },
  {
    id: "lava-chocolate-cookies",
    name: "Lava Chocolate Cookies",
    description: "Crispy cookies filled with a warm, gooey chocolate lava center.",
    price: 1.5,
    image: "https://i.pinimg.com/736x/bf/2c/2d/bf2c2d2554400e424497f73103b47cda.jpg",
  },
];

const reviews = [
  {
    text: "Amazing  and super fresh! My favorite bakery.",
    name: "Sophia Lee",
    image: "/public/picture/photo_2026-06-12_17-09-01.jpg",
  },
  {
    text: "Every item is delicious and beautifully made.",
    name: "Michael Tan",
    image: "/public/picture/photo_2026-06-12_17-09-10.jpg",
  },
  {
    text: "Best bakery in town! Highly recommended.",
    name: "Emily Carter",
    image: "/picture/photo_2026-06-12_17-09-13.jpg",
  },
];

const features = [
  {
    title: "Daily Fresh",
    text: "We bake fresh every morning for you.",
    image:
      "/cute-croissant-sticker-illustration-hand-drawn-doodle-of-a-french-pastry-isolated-graphic-for-bakery-or-breakfast-themed-printable-designs-free-vector-removebg-preview.png",
    width: 60,
  },
  {
    title: "Quality Ingredients",
    text: "We use only premium ingredients.",
    image: "/images-removebg-preview.png",
    width: 60,
  },
  {
    title: "Made with Love",
    text: "Every recipe is made with care.",
    image: "/7597681cbffdd1bc4bea4099164c680c__1_-removebg-preview.png",
    width: 70,
  },
  {
    title: "Happy Customers",
    text: "Thank you for being part of our journey.",
    image: "/images__2_-removebg-preview.png",
    width: 50,
  },
];

export default function MenuPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState(seedProducts);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Banner Slideshow
 const bannerImages = [
    { src: "/public/picture/photo_2026-08-16_00-49-39.jpg", position: "center 25%" },
    { src: "/public/picture/photo_2026-08-16_02-36-53.jpg", position: "center 25%" },
    { src: "/public/picture/photo_2026-08-16_02-28-56.jpg", position: "center 25%" },
    { src: "/public/picture/photo_2026-08-16_02-36-19.jpg", position: "center 25%" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setProducts(items);
        } else {
          setProducts(seedProducts);
        }
        setLoadingProducts(false);
      },
      () => {
        setProducts(seedProducts);
        setLoadingProducts(false);
      }
    );

    return () => unsub();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleOrder = (product) => {
    addToCart(product, 1);
    navigate("/cart");
  };

  return (
    <>
      {/*  NAVBAR  */}
      <Navbar />

      {/*  MENU BANNER  */}
      <section className="menu-banner">
        {bannerImages.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`Bakery Banner ${index + 1}`}
            className={`banner-slide ${index === currentSlide ? "active" : ""}`}
            style={{ objectPosition: img.position }}
          />
        ))}

        <div className="banner-content">
          <span>Our menu</span>

          <h1>
            Deliciously Baked <br />
            Just For You
          </h1>

          <p>
            Freshly baked every morning with love and premium ingredients.
          </p>
        </div>

        {/* Dots indicator */}
        <div className="banner-dots">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/*  MENU TITLE  */}
      <section className="menu-title text-center">
        <h5>our menu</h5>

        <h2>Explore Our Bestsellers</h2>

        <p className="menu-description">
          From classic favorites to new creations, there's something for
          everyone
        </p>
      </section>

      {/*  PRODUCTS  */}
      <section className="products-section">
        <div className="container">
          <div className="row g-4">
            {products.map((product) => (
              <div className="col-lg-3 col-md-4 col-6" key={product.id}>
                <div className="menu-card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />

                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6>{product.name}</h6>
                        <p>{product.description}</p>
                      </div>

                      <div className="price-circle">
                        {Number(product.price).toFixed(2)}
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="order-btn flex-fill"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>

                      <button
                        className="order-btn flex-fill"
                        onClick={() => handleOrder(product)}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  SPECIAL OFFER  */}
      <section className="offer-section container my-5">
        <div className="offer-box">
          <div className="offer-text">
            <span className="offer-small">Special Offer</span>

            <h2>20% OFF</h2>

            <p>On your first order! Use code WELCOME20</p>

            <Link to="/cart" className="offer-btn">
              Order Now
            </Link>
          </div>

          <div className="offer-image">
            <img
              src="https://i.pinimg.com/736x/48/54/7e/48547eb1ef32d44ba837a83a67713831.jpg"
              alt="Special Offer"
            />
          </div>
        </div>
      </section>

      {/*  REVIEWS  */}
      <section className="testimonial-section container mb-5">
        <h2 className="testimonial-title">What Our Customers Say</h2>

        <div className="row g-4">
          {reviews.map((review) => (
            <div className="col-md-4" key={review.name}>
              <div className="review-card">
                <div className="stars">★★★★★</div>

                <p>{review.text}</p>

                <h6>- {review.name}</h6>

                <img src={review.image} alt={review.name} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*  FEATURES  */}
      <section className="features">
        <div className="container">
          <div className="row text-center text-lg-start">
            {features.map((feature, index) => (
              <div
                className={`col-lg-3 ${
                  index !== features.length - 1 ? "border-right" : ""
                }`}
                key={feature.title}
              >
                <div className="feature-box">
                  <div className="feature-icon">
                    <img
                      src={feature.image}
                      width={feature.width}
                      style={{ marginTop: "-17px" }}
                      alt={feature.title}
                    />
                  </div>

                  <div>
                    <h5>{feature.title}</h5>
                    <p>{feature.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  FOOTER  */}
      <Footer />
    </>
  );
}
