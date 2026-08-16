const features = [
  {
    title: "Daily Fresh",
    description: "We bake fresh every morning for you.",
    image:
      `${import.meta.env.BASE_URL}cute-croissant-sticker-illustration-hand-drawn-doodle-of-a-french-pastry-isolated-graphic-for-bakery-or-breakfast-themed-printable-designs-free-vector-removebg-preview.png`,
    width: 60,
  },
  {
    title: "Quality Ingredients",
    description: "We use only premium ingredients.",
    image: `${import.meta.env.BASE_URL}images-removebg-preview.png`,
    width: 60,
  },
  {
    title: "Made with Love",
    description: "Every recipe is made with care.",
    image:
      `${import.meta.env.BASE_URL}7597681cbffdd1bc4bea4099164c680c__1_-removebg-preview.png`,
    width: 70,
  },
  {
    title: "Happy Customers",
    description: "Thank you for being part of our journey.",
    image: `${import.meta.env.BASE_URL}images__2_-removebg-preview.png`,
    width: 50,
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container">

        <div className="row text-center text-lg-start">

          {features.map((feature, index) => (
            <div
              className={`col-lg-3 ${
                index !== features.length - 1
                  ? "border-right"
                  : ""
              }`}
              key={index}
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
                  <p>{feature.description}</p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}