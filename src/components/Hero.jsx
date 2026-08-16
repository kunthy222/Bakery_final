export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content text-start">

        <span className="welcome-text">
          Welcome to
        </span>

        <h1 className="hero-title">
          THE NEAZAA <br />
          BAKERY
        </h1>

        <h3 className="hero-subtitle">
          Sweet Taste, Sweet Moment and
          Happiness in Every Bite
        </h3>

        <p className="hero-desc">
          Freshly baked every morning with love and
          premium ingredients.
        </p>

        <button className="btn btn-custom">
          <a href="/order" className="nav-link">
            Order Now
          </a>
        </button>

      </div>
    </section>
  );
}