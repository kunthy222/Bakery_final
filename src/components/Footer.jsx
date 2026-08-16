export default function Footer() {
  return (
    <footer className="footer">

      <div className="container-fluid px-3">

        <div className="row">

          {/* Logo */}
          <div className="col-lg-4 footer-divider pe-0">

            <div className="d-flex align-items-center">

              <img
                src="/picture/kk (2).png"
                className="navbar-brand d-flex align-items-center ms-4"
                width="120"
                style={{ marginTop: "-45px" }}
                alt="Logo"
              />

              <div className="ms-2">

               

                <h2 className="mb-0 text-white">
                  NeaZaa
                </h2>

                <span className="footer-bakery">
                  Bakery
                </span>

              </div>

            </div>

            <h4
              style={{
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              Sweet Taste, Sweet Moment
              and Happiness in Every Bite.
            </h4>

          </div>

          {/* Quick Links */}
          <div className="col-lg-4 footer-divider px-5">

            <h2 className="footer-title">
              Quick Links
            </h2>

            <div className="row">

              <div className="col-6">
                <a href="/">Home</a>
                <a href="/about">About</a>
              </div>

              <div className="col-6">
                <a href="/menu">Menu</a>
                <a href="/contact">Contact</a>
              </div>

            </div>

          </div>

          {/* Contact */}
          <div className="col-lg-4 ps-5">

            <h2 className="footer-title">
              Contact Us
            </h2>

            <p className="contact-page-item">
              <img
                src="/picture/Shape09.png"
                alt=""
              />
              info@neazaa.com
            </p>

            <p className="contact-page-item">
              <img
                src="/picture/Shape06.png"
                alt=""
              />
              +855 963 339 318
            </p>

            <p className="contact-page-item">
              <img
                src="/picture/Shape03.png"
                alt=""
              />
              Phnom Penh, Cambodia
            </p>

          </div>

        </div>

      </div>

      <div className="row">
        <div className="col-12">

          <div className="footer-bottom">
            <p>
              © 2026 The Neazaa Bakery. All Rights Reserved
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}